# Ferramenta de Análise de Cobertura da Documentação

Este repositório contém uma aplicação web para análise de lacunas na documentação técnica, utilizando embeddings e integração com a API OpenAI.

## Visão Geral
- Carrega uma coleção de documentos processados com embeddings.
- Exibe um indicador de progresso durante o carregamento inicial.
- Permite consultas via embeddings e gera relatórios em Markdown.
- Integração com servidor Nginx para servir JSON compactado e cache HTTP.
- Cache cliente em IndexedDB para evitar re-downloads recorrentes.

## Funcionalidades
1. **Indicador de Progresso**  
   - Barra `<progress>` e texto percentual no HTML.
   - Atualização em tempo real via `postMessage({ type: 'progress', loaded, total })` no `worker.js`.

2. **Worker.js**
   - Carregamento de `processed_docs.json` com tentativas de cache IndexedDB.
   - Envio de mensagens de progresso e sinalização de pronto.
   - Cálculo de similaridade (`cosineSimilarity`) e geração de embeddings.
   - Consulta à API OpenAI (`chat.completions`) para análise e sugestão em Markdown.

3. **Cache Cliente (IndexedDB)**
   - Armazenamento dos documentos processados em IndexedDB.
   - Leitura do cache antes de realizar `fetch`, garantindo “cold start” apenas na primeira vez.

4. **Configuração Nginx**
   - **Gzip / Brotli**: compressão de `processed_docs.json` para acelerar transferência.
   - **Cache-Control**: `public, max-age=86400, immutable` para cache HTTP de 24h.
   - **gzip_static** e **brotli_static** opcionais para pré-compressão.

## Pré-requisitos
- Servidor Nginx (≥1.22) com módulos `ngx_brotli` opcionais.
- Navegador moderno com suporte a Web Workers e IndexedDB.
- Conta e API Key da OpenAI.

## Instalação e Configuração

1. **Servidor Nginx**  
   ```nginx
   http {
       gzip on;
       gzip_comp_level 5;
       gzip_types application/json application/javascript text/css text/html text/plain application/xml;
       brotli on;
       brotli_comp_level 5;
       brotli_types application/json application/javascript text/css text/html text/plain application/xml;
       gzip_static on;
       brotli_static on;
   }

   server {
       listen 80;
       server_name exemplo.local;
       root /var/www/html;

       location /ferramentas/lacunas/processed_docs.json {
           add_header Cache-Control "public, max-age=86400, immutable";
       }

       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

2. **Worker.js**  
   - Implemente cache IndexedDB, progresso e busca de embeddings conforme o exemplo.

3. **HTML (index.html)**  
   - Inclua o container do progresso:
     ```html
     <div id="embeddingProgressContainer" style="display:none; margin-top:16px;">
       <label for="embeddingProgress">Carregando embeddings:</label>
       <progress id="embeddingProgress" max="100" value="0" style="width:100%;"></progress>
       <span id="embeddingProgressText">0%</span>
     </div>
     ```
   - Configure o script único de `worker.onmessage` para lidar com tipos `progress`, `ready`, `result` e `error`.

4. **Cache Cliente**  
   - No `worker.js`, use IndexedDB para armazenar e recuperar `processed_docs.json`.

## Uso
- Acesse `index.html` via browser.
- Aguarde o carregamento inicial dos embeddings (barra de progresso).
- Insira sua OpenAI API Key quando solicitado.
- Digite o tópico ou texto para análise.
- Clique em "Analisar" para gerar a cobertura da documentação.

## Próximos Passos
- Monitorar métricas de performance (tempo de carregamento, parse JSON).
- Ajustar nível de compressão e estratégias de cache conforme uso.
- Implementar lazy-loading ou streaming JSON para escalabilidade.

---

*README gerado automaticamente com base nas modificações realizadas em 11 de junho de 2025.*
