// chat.js
const PROXY_URL = 'https://proxy-api-black-xi.vercel.app/api';
const DEFAULT_CHAT_MODEL = 'gpt-4o';

export async function sendChat({ model = DEFAULT_CHAT_MODEL, messages, ...options }) {
  // garante campo obrigatório
  if (!model) throw new Error('Parâmetro "model" é obrigatório em sendChat');
  const payload = { model, messages, ...options };

  const res = await fetch(`${PROXY_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Erro proxy chat (${res.status}): ${err}`);
  }
  return await res.json();
}
