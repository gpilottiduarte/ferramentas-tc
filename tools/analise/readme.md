# Explicação Detalhada da Aplicação de Análise de Cobertura de Documentação

Este documento detalha o funcionamento da aplicação de análise de cobertura de documentação, explicando cada parte do código (`index.html`, `worker.js`, chat, embeddings), os conceitos de embeddings e chunks, o processo de criação desses recursos e as vantagens de utilizar um modelo fine-tuned.

---

## 1. Visão Geral da Aplicação

A aplicação permite que a pessoa usuária cole um texto e analise sua cobertura em relação a uma base de documentação, utilizando inteligência artificial (IA) para identificar similaridades, lacunas e sugerir melhorias. O fluxo principal envolve:

- Interface web para entrada de texto e seleção de idioma/modelo.
- Processamento local de embeddings para busca semântica eficiente.
- Consulta a um modelo de linguagem (LLM) via API para geração do relatório.
- Exibição do relatório final de forma amigável e visualmente destacada.

---

## 2. Estrutura dos Arquivos

### `index.html`

- **Interface da Pessoa Usuária:** Formulário para colar o texto, selecionar idioma e modelo, e acionar a análise.
- **Estilos:** CSS moderno e responsivo embutido para visual limpo e destaque ao relatório.
- **Lógica Principal:** 
  - Ao clicar em "Analisar", carrega os embeddings do idioma selecionado.
  - Cria um `Web Worker` (`worker.js`) para processar os embeddings sem travar a interface.
  - O worker realiza a busca semântica e, ao final, aciona a consulta ao modelo de linguagem via proxy.
  - O resultado é exibido no container de relatório, renderizado como Markdown.

### `worker.js`

- **Processamento Paralelo:** Executa operações pesadas (busca de similaridade, manipulação de embeddings) em uma thread separada.
- **Busca Semântica:** Recebe os embeddings e o texto da pessoa usuária, calcula a similaridade entre o texto e os documentos da base.
- **Comunicação:** Envia mensagens de progresso e resultado de volta para o `index.html`.
- **Chamada ao Modelo:** Quando encontra os documentos mais relevantes, faz uma requisição ao backend (proxy) para gerar o relatório com o modelo de linguagem.

### Chat/Proxy Backend

- **Proxy API:** Recebe as requisições do frontend/worker e repassa para a API da OpenAI, incluindo o modelo selecionado (padrão ou fine-tuned).
- **Gerenciamento de Chaves:** Garante que a chave de API correta seja usada para acessar modelos privados ou fine-tuned.
- **Tratamento de Erros:** Retorna mensagens de erro amigáveis caso o modelo não exista ou não haja permissão.

### Embeddings

- **Arquivos JSON:** 
  ```
  embeddings-pt.json
  embeddings-en.json
  ```
  contêm os embeddings dos documentos de referência, pré-calculados.
- **Uso:** Carregados no início da análise para permitir busca semântica eficiente e local.

---

## 3. O que são Embeddings e Chunks?

### Embeddings

- **Definição:** Embeddings são representações numéricas (vetores) de textos, calculadas por modelos de IA. Cada texto/documento é convertido em um vetor de alta dimensão que captura seu significado semântico.
- **Utilidade:** Permitem comparar textos por similaridade semântica, mesmo que usem palavras diferentes.
- **Exemplo:** Dois textos sobre o mesmo assunto terão embeddings próximos no espaço vetorial.

### Chunks

- **Definição:** Chunks são pedaços menores de texto extraídos de documentos maiores (ex: parágrafos, sentenças ou blocos de 200-500 tokens).
- **Motivação:** Dividir documentos em chunks permite granularidade na busca semântica, facilitando encontrar trechos específicos relevantes para a consulta da pessoa usuária.
- **Processo de Criação:**
  1. O documento é dividido em partes menores (chunks), respeitando limites de tamanho.
  2. Cada chunk é convertido em um embedding.
  3. Os embeddings são salvos em um arquivo, por exemplo:
     ```
     embeddings-pt.json
     ```

---

## 4. Como funciona o processo de criação de embeddings e chunks?

1. **Divisão dos Documentos:** Os documentos de referência são divididos em chunks, geralmente de 200 a 500 tokens cada.
2. **Geração dos Embeddings:** Cada chunk é enviado para a API de embeddings da OpenAI (exemplo de modelo: 
   ```
   text-embedding-ada-002
   ```
   ), que retorna o vetor correspondente.
3. **Armazenamento:** Os embeddings de todos os chunks são salvos em um arquivo JSON, junto com metadados (ex: texto original, posição no documento).
4. **Uso na Aplicação:** Durante a análise, o texto da pessoa usuária também é convertido em embedding e comparado com os embeddings dos chunks para encontrar os mais similares.

---

## 5. Por que utilizar um modelo Fine-Tuned?

- **Personalização:** Um modelo fine-tuned é treinado adicionalmente com exemplos específicos do seu domínio, tornando-o mais preciso para tarefas especializadas.
- **Melhor Compreensão do Contexto:** O modelo aprende padrões, termos e estruturas recorrentes nos seus dados, gerando respostas mais alinhadas com a realidade da sua documentação.
- **Resultados Superiores:** Para tarefas como avaliação de cobertura, sugestão de melhorias ou identificação de lacunas, o fine-tuning permite que o modelo vá além do conhecimento genérico, entregando análises mais relevantes e confiáveis.
- **Exemplo:** Um modelo fine-tuned com exemplos de boas e más documentações técnicas será mais criterioso ao avaliar novos textos, apontando pontos de melhoria com maior assertividade.

---

## 6. Fluxo Resumido da Aplicação

1. **Pessoa usuária cola o texto e seleciona idioma/modelo.**
2. **Embeddings da base são carregados e processados no worker.**
3. **Busca semântica identifica os chunks mais relevantes.**
4. **O worker envia a consulta ao modelo (padrão ou fine-tuned) via proxy.**
5. **O relatório gerado é exibido de forma visualmente destacada na interface.**

---

## 7. Benefícios da Arquitetura

- **Responsividade:** O uso de Web Worker garante que a interface permaneça fluida mesmo durante operações pesadas.
- **Privacidade:** Os embeddings são processados localmente, evitando envio desnecessário de dados sensíveis.
- **Flexibilidade:** Suporte a múltiplos idiomas e modelos, incluindo fine-tuned.
- **Escalabilidade:** Novos documentos podem ser adicionados facilmente ao processo de embeddings/chunks.

---

## 8. Referências

- [OpenAI Embeddings Documentation](https://platform.openai.com/docs/guides/embeddings)
- [Fine-tuning OpenAI Models](https://platform.openai.com/docs/guides/fine-tuning)
- [Web Workers MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Question Answering using Embeddings](https://cookbook.openai.com/examples/question_answering_using_embeddings)

---

Supervised fine-tuning
======================

Fine-tune models with example inputs and known good outputs for better results and efficiency.

Supervised fine-tuning (SFT) lets you train an OpenAI model with examples for your specific use case. The result is a customized model that more reliably produces your desired style and content.

  

||
|Provide examples of correct responses to prompts to guide the model's behavior.Often uses human-generated "ground truth" responses to show the model how it should respond.|ClassificationNuanced translationGenerating content in a specific formatCorrecting instruction-following failures|gpt-4.1-2025-04-14 gpt-4.1-mini-2025-04-14 gpt-4.1-nano-2025-04-14|

Overview
--------

Supervised fine-tuning has four major parts:

1.  Build your training dataset to determine what "good" looks like
2.  Upload a training dataset containing example prompts and desired model output
3.  Create a fine-tuning job for a base model using your training data
4.  Evaluate your results using the fine-tuned model

**Good evals first!** Only invest in fine-tuning after setting up evals. You need a reliable way to determine whether your fine-tuned model is performing better than a base model.

  

[Set up evals →](/docs/guides/evals)

Build your dataset
------------------

Build a robust, representative dataset to get useful results from a fine-tuned model. Use the following techniques and considerations.

### Right number of examples

*   The minimum number of examples you can provide for fine-tuning is 10
*   We see improvements from fine-tuning on 50–100 examples, but the right number for you varies greatly and depends on the use case
*   We recommend starting with 50 well-crafted demonstrations and [evaluating the results](/docs/guides/evals)

If performance improves with 50 good examples, try adding examples to see further results. If 50 examples have no impact, rethink your task or prompt before adding training data.

### What makes a good example

*   Whatever prompts and outputs you expect in your application, as realistic as possible
*   Specific, clear questions and answers
*   Use historical data, expert data, logged data, or [other types of collected data](/docs/guides/evals)

### Formatting your data

*   Use [JSONL format](https://jsonlines.org/), with one complete JSON structure on every line of the training data file
*   Use the [chat completions format](/docs/api-reference/fine-tuning/chat-input)
*   Your file must have at least 10 lines

JSONL format example file

An example of JSONL training data, where the model calls a `get_weather` function:

```text
{"messages":[{"role":"user","content":"What is the weather in San Francisco?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"San Francisco, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. San Francisco, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
{"messages":[{"role":"user","content":"What is the weather in Minneapolis?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"Minneapolis, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. Minneapolis, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
{"messages":[{"role":"user","content":"What is the weather in San Diego?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"San Diego, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. San Diego, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
{"messages":[{"role":"user","content":"What is the weather in Memphis?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"Memphis, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. Memphis, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
{"messages":[{"role":"user","content":"What is the weather in Atlanta?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"Atlanta, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. Atlanta, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
{"messages":[{"role":"user","content":"What is the weather in Sunnyvale?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"Sunnyvale, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. Sunnyvale, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
{"messages":[{"role":"user","content":"What is the weather in Chicago?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"Chicago, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. Chicago, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
{"messages":[{"role":"user","content":"What is the weather in Boston?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"Boston, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. Boston, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
{"messages":[{"role":"user","content":"What is the weather in Honolulu?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"Honolulu, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. Honolulu, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
{"messages":[{"role":"user","content":"What is the weather in San Antonio?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"San Antonio, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. San Antonio, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
```

Corresponding JSON data

Each line of the training data file contains a JSON structure like the following, containing both an example user prompt and a correct response from the model as an `assistant` message.

```json
{
  "messages": [
    { "role": "user", "content": "What is the weather in San Francisco?" },
    {
      "role": "assistant",
      "tool_calls": [
        {
          "id": "call_id",
          "type": "function",
          "function": {
            "name": "get_current_weather",
            "arguments": "{\"location\": \"San Francisco, USA\", \"format\": \"celsius\"}"
          }
        }
      ]
    }
  ],
  "parallel_tool_calls": false,
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_current_weather",
        "description": "Get the current weather",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
                "type": "string",
                "description": "The city and country, eg. San Francisco, USA"
            },
            "format": { "type": "string", "enum": ["celsius", "fahrenheit"] }
          },
          "required": ["location", "format"]
        }
      }
    }
  ]
}
```

### Distilling from a larger model

One way to build a training data set for a smaller model is to distill the results of a large model to create training data for supervised fine tuning. The general flow of this technique is:

*   Tune a prompt for a larger model (like `gpt-4.1`) until you get great performance against your eval criteria.
*   Capture results generated from your model using whatever technique is convenient - note that the [Responses API](/docs/api-reference/responses) stores model responses for 30 days by default.
*   Use the captured responses from the large model that fit your criteria to generate a dataset using the tools and techniques described above.
*   Tune a smaller model (like `gpt-4.1-mini`) using the dataset you created from the large model.

This technique can enable you to train a small model to perform similarly on a specific task to a larger, more costly model.

Upload training data
--------------------

Upload your dataset of examples to OpenAI. We use it to update the model's weights and produce outputs like the ones included in your data.

In addition to text completions, you can train the model to more effectively generate [structured JSON output](/docs/guides/structured-outputs) or [function calls](/docs/guides/function-calling).

Upload your data with button clicks

1.  Navigate to the dashboard > **[fine-tuning](https://platform.openai.com/finetune)**.
2.  Click **\+ Create**.
3.  Under **Training data**, upload your JSONL file.

Call the API to upload your data

Assuming the data above is saved to a file called `mydata.jsonl`, you can upload it to the OpenAI platform using the code below. Note that the `purpose` of the uploaded file is set to `fine-tune`:

```bash
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@mydata.jsonl"
```

Note the `id` of the file that is uploaded in the data returned from the API - you'll need that file identifier in subsequent API requests.

```json
{
  "object": "file",
  "id": "file-RCnFCYRhFDcq1aHxiYkBHw",
  "purpose": "fine-tune",
  "filename": "mydata.jsonl",
  "bytes": 1058,
  "created_at": 1746484901,
  "expires_at": null,
  "status": "processed",
  "status_details": null
}
```

Create a fine-tuning job
------------------------

With your test data uploaded, [create a fine-tuning job](/docs/api-reference/fine-tuning/create) to customize a base model using the training data you provide. When creating a fine-tuning job, you must specify:

*   A base model (`model`) to use for fine-tuning. This can be either an OpenAI model ID or the ID of a previously fine-tuned model. See which models support fine-tuning in the [model docs](/docs/models).
*   A training file (`training_file`) ID. This is the file you uploaded in the previous step.
*   A fine-tuning method (`method`). This specifies which fine-tuning method you want to use to customize the model. Supervised fine-tuning is the default.

Upload your data with button clicks

1.  In the same **\+ Create** modal as above, complete the required fields.
2.  Select supervised fine-tuning as the method and whichever model you want to train.
3.  When you're ready, click **Create** to start the job.

Call the API to upload your data

Create a supervised fine-tuning job by calling the [fine-tuning API](/docs/api-reference/fine-tuning):

```bash
curl https://api.openai.com/v1/fine_tuning/jobs \                               
  -H "Content-Type: application/json" \     
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "training_file": "file-RCnFCYRhFDcq1aHxiYkBHw",
    "model": "gpt-4.1-nano-2025-04-14"
  }'
```

The API responds with information about the fine-tuning job in progress. Depending on the size of your training data, the training process may take several minutes or hours. You can [poll the API](/docs/api-reference/fine-tuning/retrieve) for updates on a specific job.

When the fine-tuning job finishes, your fine-tuned model is ready to use. A completed fine-tune job returns data like this:

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-uL1VKpwx7maorHNbOiDwFIn6",
  "model": "gpt-4.1-nano-2025-04-14",
  "created_at": 1746484925,
  "finished_at": 1746485841,
  "fine_tuned_model": "ft:gpt-4.1-nano-2025-04-14:openai::BTz2REMH",
  "organization_id": "org-abc123",
  "result_files": [
    "file-9TLxKY2A8tC5YE1RULYxf6"
  ],
  "status": "succeeded",
  "validation_file": null,
  "training_file": "file-RCnFCYRhFDcq1aHxiYkBHw",
  "hyperparameters": {
    "n_epochs": 10,
    "batch_size": 1,
    "learning_rate_multiplier": 1
  },
  "trained_tokens": 1700,
  "error": {},
  "user_provided_suffix": null,
  "seed": 1935755117,
  "estimated_finish": null,
  "integrations": [],
  "metadata": null,
  "usage_metrics": null,
  "shared_with_openai": false,
  "method": {
    "type": "supervised",
    "supervised": {
      "hyperparameters": {
        "n_epochs": 10,
        "batch_size": 1,
        "learning_rate_multiplier": 1.0
      }
    }
  }
}
```

Note the `fine_tuned_model` property. This is the model ID to use in [Responses](/docs/api-reference/responses) or [Chat Completions](/docs/api-reference/chat) to make API requests using your fine-tuned model.

Here's an example of calling the Responses API with your fine-tuned model ID:

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "ft:gpt-4.1-nano-2025-04-14:openai::BTz2REMH",
    "input": "What is the weather like in Boston today?",
    "tools": [
      {
        "name": "get_current_weather",
        "description": "Get the current weather",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
                "type": "string",
                "description": "The city and country, eg. San Francisco, USA"
            },
            "format": { "type": "string", "enum": ["celsius", "fahrenheit"] }
          },
          "required": ["location", "format"]
        }
      }
    ],
    "tool_choice": "auto"
  }'
```

Evaluate the result
-------------------

Use the approaches below to check how your fine-tuned model performs. Adjust your prompts, data, and fine-tuning job as needed until you get the results you want. The best way to fine-tune is to continue iterating.

### Compare to evals

To see if your fine-tuned model performs better than the original base model, [use evals](/docs/guides/evals). Before running your fine-tuning job, carve out data from the same training dataset you collected in step 1. This holdout data acts as a control group when you use it for evals. Make sure the training and holdout data have roughly the same diversity of user input types and model responses.

[Learn more about running evals](/docs/guides/evals).

### Monitor the status

Check the status of a fine-tuning job in the dashboard or by polling the job ID in the API.

Monitor in the UI

1.  Navigate to the [fine-tuning dashboard](https://platform.openai.com/finetune).
2.  Select the job you want to monitor.
3.  Review the status, checkpoints, message, and metrics.

Monitor with API calls

Use this curl command to get information about your fine-tuning job:

```bash
curl https://api.openai.com/v1/fine_tuning/jobs/ftjob-uL1VKpwx7maorHNbOiDwFIn6 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

The job contains a `fine_tuned_model` property, which is your new fine-tuned model's unique ID.

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-uL1VKpwx7maorHNbOiDwFIn6",
  "model": "gpt-4.1-nano-2025-04-14",
  "created_at": 1746484925,
  "finished_at": 1746485841,
  "fine_tuned_model": "ft:gpt-4.1-nano-2025-04-14:openai::BTz2REMH",
  "organization_id": "org-abc123",
  "result_files": [
    "file-9TLxKY2A8tC5YE1RULYxf6"
  ],
  "status": "succeeded",
  "validation_file": null,
  "training_file": "file-RCnFCYRhFDcq1aHxiYkBHw",
  "hyperparameters": {
    "n_epochs": 10,
    "batch_size": 1,
    "learning_rate_multiplier": 1
  },
  "trained_tokens": 1700,
  "error": {},
  "user_provided_suffix": null,
  "seed": 1935755117,
  "estimated_finish": null,
  "integrations": [],
  "metadata": null,
  "usage_metrics": null,
  "shared_with_openai": false,
  "method": {
    "type": "supervised",
    "supervised": {
      "hyperparameters": {
        "n_epochs": 10,
        "batch_size": 1,
        "learning_rate_multiplier": 1.0
      }
    }
  }
}
```

### Try using your fine-tuned model

Evaluate your newly optimized model by using it! When the fine-tuned model finishes training, use its ID in either the [Responses](/docs/api-reference/responses) or [Chat Completions](/docs/api-reference/chat) API, just as you would an OpenAI base model.

Use your model in the Playground

1.  Navigate to your fine-tuning job in [the dashboard](https://platform.openai.com/finetune).
2.  In the right pane, navigate to **Output model** and copy the model ID. It should start with `ft:…`
3.  Open the [Playground](https://platform.openai.com/playground).
4.  In the **Model** dropdown menu, paste the model ID. Here, you should also see other fine-tuned models you've created.
5.  Run some prompts and see how your fine-tuned performs!

Use your model with an API call

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "ft:gpt-4.1-nano-2025-04-14:openai::BTz2REMH",
    "input": "What is 4+4?"
  }'
```

### Use checkpoints if needed

Checkpoints are models you can use. We create a full model checkpoint for you at the end of each training epoch. They're useful in cases where your fine-tuned model improves early on but then memorizes the dataset instead of learning generalizable knowledge—called \_overfitting. Checkpoints provide versions of your customized model from various moments in the process.

Find checkpoints in the dashboard

1.  Navigate to the [fine-tuning dashboard](https://platform.openai.com/finetune).
2.  In the left panel, select the job you want to investigate. Wait until it succeeds.
3.  In the right panel, scroll to the list of checkpoints.
4.  Hover over any checkpoint to see a link to launch in the Playground.
5.  Test the checkpoint model's behavior by prompting it in the Playground.

Query the API for checkpoints

1.  Wait until a job succeeds, which you can verify by [querying the status of a job](/docs/api-reference/fine-tuning/retrieve).
2.  [Query the checkpoints endpoint](/docs/api-reference/fine-tuning/list-checkpoints) with your fine-tuning job ID to access a list of model checkpoints for the fine-tuning job.
3.  Find the `fine_tuned_model_checkpoint` field for the name of the model checkpoint.
4.  Use this model just like you would the final fine-tuned model.

The checkpoint object contains `metrics` data to help you determine the usefulness of this model. As an example, the response looks like this:

```json
{
  "object": "fine_tuning.job.checkpoint",
  "id": "ftckpt_zc4Q7MP6XxulcVzj4MZdwsAB",
  "created_at": 1519129973,
  "fine_tuned_model_checkpoint": "ft:gpt-3.5-turbo-0125:my-org:custom-suffix:96olL566:ckpt-step-2000",
  "metrics": {
    "full_valid_loss": 0.134,
    "full_valid_mean_token_accuracy": 0.874
  },
  "fine_tuning_job_id": "ftjob-abc123",
  "step_number": 2000
}
```

Each checkpoint specifies:

*   `step_number`: The step at which the checkpoint was created (where each epoch is number of steps in the training set divided by the batch size)
*   `metrics`: An object containing the metrics for your fine-tuning job at the step when the checkpoint was created

Currently, only the checkpoints for the last three epochs of the job are saved and available for use.

Safety checks
-------------

Before launching in production, review and follow the following safety information.

How we assess for safety

Once a fine-tuning job is completed, we assess the resulting model’s behavior across 13 distinct safety categories. Each category represents a critical area where AI outputs could potentially cause harm if not properly controlled.

|Name|Description|
|---|---|
|advice|Advice or guidance that violates our policies.|
|harassment/threatening|Harassment content that also includes violence or serious harm towards any target.|
|hate|Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste. Hateful content aimed at non-protected groups (e.g., chess players) is harassment.|
|hate/threatening|Hateful content that also includes violence or serious harm towards the targeted group based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste.|
|highly-sensitive|Highly sensitive data that violates our policies.|
|illicit|Content that gives advice or instruction on how to commit illicit acts. A phrase like "how to shoplift" would fit this category.|
|propaganda|Praise or assistance for ideology that violates our policies.|
|self-harm/instructions|Content that encourages performing acts of self-harm, such as suicide, cutting, and eating disorders, or that gives instructions or advice on how to commit such acts.|
|self-harm/intent|Content where the speaker expresses that they are engaging or intend to engage in acts of self-harm, such as suicide, cutting, and eating disorders.|
|sensitive|Sensitive data that violates our policies.|
|sexual/minors|Sexual content that includes an individual who is under 18 years old.|
|sexual|Content meant to arouse sexual excitement, such as the description of sexual activity, or that promotes sexual services (excluding sex education and wellness).|
|violence|Content that depicts death, violence, or physical injury.|

Each category has a predefined pass threshold; if too many evaluated examples in a given category fail, OpenAI blocks the fine-tuned model from deployment. If your fine-tuned model does not pass the safety checks, OpenAI sends a message in the fine-tuning job explaining which categories don't meet the required thresholds. You can view the results in the moderation checks section of the fine-tuning job.

How to pass safety checks

In addition to reviewing any failed safety checks in the fine-tuning job object, you can retrieve details about which categories failed by querying the [fine-tuning API events endpoint](https://platform.openai.com/docs/api-reference/fine-tuning/list-events). Look for events of type `moderation_checks` for details about category results and enforcement. This information can help you narrow down which categories to target for retraining and improvement. The [model spec](https://cdn.openai.com/spec/model-spec-2024-05-08.html#overview) has rules and examples that can help identify areas for additional training data.

While these evaluations cover a broad range of safety categories, conduct your own evaluations of the fine-tuned model to ensure it's appropriate for your use case.