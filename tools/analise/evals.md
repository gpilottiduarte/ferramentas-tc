# Como Escrever Evals para Modelos Fine-Tuned de Análise de Cobertura de Documentação

## O que são evals?

Evals (avaliações automatizadas) são conjuntos de testes que permitem medir, de forma objetiva e repetível, a performance de um modelo de linguagem em tarefas específicas. Eles são essenciais para:
- Comparar modelos base vs. fine-tuned.
- Medir progresso após ajustes no dataset ou no fine-tuning.
- Garantir que o modelo responde conforme esperado em cenários reais.

No contexto desta aplicação, evals ajudam a garantir que o modelo realmente entende e avalia corretamente a cobertura de tópicos na documentação.

---

## Por que usar evals neste projeto?

- **Validação objetiva:** Você pode medir se o modelo fine-tuned realmente melhorou em relação ao modelo base.
- **Detecção de regressões:** Mudanças no dataset ou no fine-tuning podem piorar o desempenho em alguns casos; evals ajudam a detectar isso rapidamente.
- **Ajuste fino:** Permite identificar quais tipos de perguntas ou tópicos o modelo ainda erra, guiando novos exemplos para o fine-tuning.

---

## Como criar evals para análise de cobertura de documentação

### 1. Defina os cenários de teste

Monte um conjunto de prompts reais, representando dúvidas ou tópicos que pessoas usuárias podem consultar. Para cada prompt, defina a resposta ideal (esperada) do modelo, de preferência no mesmo formato Markdown que o modelo deve gerar.

**Exemplo de prompt e resposta esperada:**

```jsonl
{"input": "Como configurar autenticação SAML?", "ideal": "Cobertura Parcial\n\nO tópico de autenticação SAML é mencionado nos documentos X e Y, mas falta um passo a passo detalhado para integração com provedores externos. Recomenda-se adicionar exemplos práticos."}
{"input": "Existe documentação sobre backup automático?", "ideal": "Cobertura Total\n\nO processo de backup automático está completamente documentado no arquivo `backup.md`, incluindo agendamento, restauração e troubleshooting."}
{"input": "Como integrar com API externa?", "ideal": "Sem Cobertura\n\nNão há documentação sobre integração com APIs externas. Sugere-se criar um novo tópico abordando autenticação, exemplos de uso e tratamento de erros."}
```

- O campo `input` é o prompt que será enviado ao modelo.
- O campo `ideal` é a resposta que você espera do modelo.

### 2. Formato do arquivo de eval

O formato recomendado é JSONL (um JSON por linha), com os campos `input` e `ideal`. Você pode criar esse arquivo manualmente ou exportar exemplos reais do uso da ferramenta.

Salve como, por exemplo, `evals-cobertura.jsonl`.

---

## Como rodar evals na OpenAI

1. **Prepare o arquivo JSONL** com seus exemplos de prompt e resposta ideal.
2. **Acesse a documentação oficial:**  
   [OpenAI Evals Guide](https://platform.openai.com/docs/guides/evals)
3. **Instale a CLI de evals da OpenAI (se necessário):**
   ```bash
   pip install openai
   pip install openai-evals
   ```
4. **Rode o eval usando a CLI ou API:**
   ```bash
   openai evals create \
     -f evals-cobertura.jsonl \
     --model ft:gpt-4.1-nano-2025-04-14:personal:docs-ft:BhiBDwSd
   ```
   Ou use a interface web da OpenAI para subir o arquivo e rodar o eval.

5. **Analise os resultados:**  
   A ferramenta irá comparar as respostas do modelo com as respostas ideais e gerar métricas de acurácia, recall, etc.

---

## Dicas para criar bons evals

- Use exemplos reais e variados, cobrindo casos fáceis, médios e difíceis.
- Inclua prompts que testem limites do modelo (ex: tópicos ambíguos, perguntas fora do escopo).
- Atualize o arquivo de evals sempre que mudar o escopo da documentação ou do modelo.
- Use o mesmo formato de resposta que o modelo deve gerar na aplicação (ex: Markdown, estrutura de cobertura).

---

## Evals são úteis?

**Sim, são fundamentais!**  
- Permitem medir de forma objetiva se o fine-tuning trouxe ganhos reais.
- Ajudam a identificar pontos fracos do modelo.
- Facilitam a comunicação de resultados para stakeholders (ex: "nosso modelo cobre 90% dos casos críticos").
- São exigidos pelas melhores práticas de IA antes de colocar modelos em produção.

---

## Exemplo de arquivo de eval para este projeto

```jsonl
{"input": "Como configurar autenticação SAML?", "ideal": "Cobertura Parcial\n\nO tópico de autenticação SAML é mencionado nos documentos X e Y, mas falta um passo a passo detalhado para integração com provedores externos. Recomenda-se adicionar exemplos práticos."}
{"input": "Existe documentação sobre backup automático?", "ideal": "Cobertura Total\n\nO processo de backup automático está completamente documentado no arquivo `backup.md`, incluindo agendamento, restauração e troubleshooting."}
{"input": "Como integrar com API externa?", "ideal": "Sem Cobertura\n\nNão há documentação sobre integração com APIs externas. Sugere-se criar um novo tópico abordando autenticação, exemplos de uso e tratamento de erros."}
```

---

## Referências

- [OpenAI Evals Guide](https://platform.openai.com/docs/guides/evals)
- [Fine-tuning OpenAI Models](https://platform.openai.com/docs/guides/fine-tuning)
- [Avaliação de Modelos LLM na Prática (OpenAI Cookbook)](https://cookbook.openai.com/examples/question_answering_using_embeddings)

---
