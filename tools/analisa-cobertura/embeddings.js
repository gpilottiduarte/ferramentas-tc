// embeddings.js
const PROXY_URL = 'https://proxy-api-black-xi.vercel.app/api';
const DEFAULT_EMBED_MODEL = 'text-embedding-ada-002';

export async function getEmbeddings({ model = DEFAULT_EMBED_MODEL, input, ...options }) {
  if (!model) {
    model = DEFAULT_EMBED_MODEL;
  }
  if (!input) {
    throw new Error('O parâmetro "input" é obrigatório para getEmbeddings');
  }

  const payload = { model, input, ...options };
  const res = await fetch(`${PROXY_URL}/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Erro proxy embeddings (${res.status}): ${errBody}`);
  }

  const data = await res.json();
  return data;
}
