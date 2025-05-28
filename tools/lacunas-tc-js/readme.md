# Lacunas TC - Versão JavaScript
Esta é a versão JavaScript da ferramenta Lacunas TC, projetada para ser leve, rápida e fácil de usar. Ela substitui a versão anterior em Flask, oferecendo uma experiência mais fluida e sem a necessidade de um servidor backend.

## **Funcionalidades Implementadas:**

### **1. Estrutura de Dados**
- Carregamento do `processed_docs.json` via localStorage ou input manual
- Manutenção da estrutura de embeddings e metadados dos documentos
- Compatibilidade total com os dados gerados pelos seus scripts Python

### **2. API Integration**
- Integração direta com Google Gemini API (embedding-001 e gemini-1.5-pro-latest)
- Geração de embeddings em tempo real no frontend
- Tratamento de erros e rate limiting

### **3. Algoritmos de Similaridade**
- Implementação própria da similaridade de cosseno
- Busca de documentos relevantes baseada em embeddings
- Ranking por relevância percentual

### **4. Interface Aprimorada**
- Design moderno com gradientes e animações
- Indicadores visuais de status (carregamento, pronto, erro)
- Configuração de API Key integrada na interface
- Responsivo para diferentes dispositivos

## **Vantagens desta abordagem:**

| **Aspecto** | **Flask (anterior)** | **JavaScript (novo)** |
|-------------|---------------------|----------------------|
| **Deploy** | Requer servidor Python + Gunicorn | Funciona em qualquer servidor web estático |
| **Dependências** | Flask, dotenv, scipy, numpy | Apenas navegador moderno |
| **Configuração** | Arquivo .env, variáveis de ambiente | Interface visual para API Key |
| **Portabilidade** | Limitada ao ambiente Python | Qualquer hosting estático (GitHub Pages, Netlify, etc.) |
| **Manutenção** | Servidor sempre rodando | Zero manutenção de servidor |

## **Para começar a usar:**

1. **Salve o arquivo como `index.html`**
2. **Obtenha uma API Key do Google AI Studio**
3. **Carregue seu arquivo `processed_docs.json` existente**
4. **Hospede em qualquer servidor web estático**

A ferramenta mantém a mesma qualidade de análise que a versão Flask, mas com muito mais simplicidade operacional. Perfeita para ambientes onde você precisa de portabilidade e facilidade de deploy, especialmente considerando seu background em documentação técnica e APIs.