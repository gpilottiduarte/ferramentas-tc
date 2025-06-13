// worker.js
import { getEmbeddings } from './embeddings.js';
import { sendChat }      from './chat.js';

let docs = [];
let CHAT_MODEL = '';
let EMBED_MODEL = '';

onmessage = async (e) => {
  const { type, text, model, embedModel } = e.data;

  if (type === 'init') {
    CHAT_MODEL  = model;
    EMBED_MODEL = embedModel;

    try {
      const res = await fetch('processed_docs.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      docs = await res.json();
      if (!Array.isArray(docs) || docs.length === 0) throw new Error('JSON inválido');

      const total = docs.length;
      for (let i = 0; i < total; i++) {
        postMessage({ type: 'progress', loaded: i + 1, total });
      }
      postMessage({ type: 'ready' });
    } catch (error) {
      postMessage({ type: 'error', error: error.message });
    }
  }

  if (type === 'analyze') {
    try {
      // 1. Gera embedding da consulta
      const embedRes = await getEmbeddings({
        model: EMBED_MODEL,
        input: text
      });
      const queryEmbedding = embedRes.data[0].embedding;

      // 2. Calcula similaridades e obtém os 5 documentos mais próximos
      const sims = docs.map(doc => {
        const dot  = doc.embedding.reduce((sum, v, i) => sum + v * queryEmbedding[i], 0);
        const magA = Math.hypot(...queryEmbedding);
        const magB = Math.hypot(...doc.embedding);
        return { doc, score: dot / (magA * magB) };
      });
      sims.sort((a, b) => b.score - a.score);
      const topDocs = sims.slice(0, 5).map(item => item.doc);

      // 3. Prepara lista em Markdown
      const header = `| Tópico Principal | Arquivo de Origem |\n| :--- | :--- |`;
      const rows = topDocs.map(doc => {
        const topic    = doc.chunk_title === 'Título Desconhecido'
          ? '*(Título Principal do Documento)*'
          : doc.chunk_title;
        const filename = doc.document_filepath.split('\\').pop();
        return `| ${topic} | \`${filename}\` |`;
      }).join('\n');
      const docsListMd = `${header}\n${rows}`;

      postMessage({ type: 'progress', stage: 'calling chat' });

      // 4. Monta mensagens para o chat
      const systemMsg = {
        role: 'system',
        content: 'Você é um assistente que analisa cobertura de documentação técnica e segue estritamente as instruções do usuário para formatar a resposta.'
      };
      const userMsg = {
        role: 'user',
        content: `
Você é um especialista em análise de documentação técnica. Sua tarefa é avaliar se um tópico solicitado pelo usuário já está coberto pela documentação existente.

**Tópico:** "${text}"

**Documentos Mais Relevantes:**
${docsListMd}

**INSTRUÇÕES:**
1. Analise se o tópico possui Cobertura Total, Parcial ou Sem Cobertura.
2. Formate a resposta em Markdown estritamente conforme o template correspondente.
`
      };

      // 5. Chama o chat com o modelo fine-tuned
      const chatRes = await sendChat({
        model:      CHAT_MODEL,
        messages:   [systemMsg, userMsg],
        max_tokens: 800,
        temperature: 0.7
      });

      postMessage({ type: 'result', result: chatRes });
    } catch (error) {
      postMessage({ type: 'error', error: error.message });
    }
  }
};
