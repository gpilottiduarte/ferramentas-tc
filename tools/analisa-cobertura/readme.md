# Ferramenta de Análise de Cobertura da Documentação

## Visão Geral
Esta aplicação web permite identificar lacunas na documentação técnica de um projeto, utilizando embeddings, Web Workers e integração com a API da OpenAI. O usuário pode analisar textos, escolher o modelo de IA, visualizar e baixar relatórios em Markdown.

## Funcionalidades
- **Análise de Cobertura:** Insira um texto/tópico e obtenha um relatório sobre a cobertura na documentação.
- **Seleção de Modelo:** Escolha entre modelo fine-tuned ou modelo padrão da OpenAI via menu suspenso.
- **Relatório em Markdown:** Visualize o relatório na interface e baixe em formato `.md`.
- **Web Worker:** Processamento assíncrono para não travar a interface.
- **Cache Cliente:** Utiliza IndexedDB para evitar downloads repetidos de embeddings.
- **Progresso Visual:** Barra de progresso e status durante o carregamento dos embeddings.

## Como Usar
1. **Acesse a página `index.html`** em um navegador moderno.
2. **Cole o texto** a ser analisado no campo indicado.
3. **Selecione o modelo** desejado no menu suspenso.
4. Clique em **Analisar** para gerar o relatório.
5. O resultado será exibido na tela. Para salvar, clique em **Baixar Relatório (MD)**.

## Estrutura dos Arquivos
- `index.html`: Interface principal e scripts de interação.
- `style.css`: Estilos visuais responsivos e modernos.
- `worker.js`: Web Worker para processamento de embeddings e análise.
- `embeddings.js`: Funções para obtenção de embeddings via API.
- `chat.js`: Funções para interação com o modelo de chat da OpenAI.
- `processed_docs.json`: Base de documentos e embeddings (carregado via fetch).

## Tecnologias Utilizadas
- **HTML5, CSS3, JavaScript (ES6+)**
- **Web Workers** para processamento paralelo
- **API OpenAI** para embeddings e chat
- **IndexedDB** para cache local
- **Nginx** (opcional) para servir arquivos estáticos com compressão e cache

## Instalação e Execução
1. Clone o repositório ou copie os arquivos para seu servidor/local.
2. (Opcional) Configure um servidor Nginx para servir os arquivos estáticos e otimizar cache/compressão.
3. Abra o `index.html` em seu navegador.

## Configuração do Servidor (Opcional)
Para melhor performance, utilize Nginx com as seguintes opções:
```nginx
http {
    gzip on;
    gzip_types application/json application/javascript text/css text/html text/plain application/xml;
    brotli on;
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

## Próximos Passos
- Suporte a streaming/lazy-loading de grandes bases de documentos
- Métricas de performance e web vitals
- Guia detalhado para usuários finais

---
*Documentação gerada automaticamente em 13 de junho de 2025.*