import Groq from 'groq-sdk';
import { Readable } from 'stream';

export const ContentBlockType = Object.freeze({
  Text: 'text',
  Image: 'image',
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function uploadImagesToPocketBase({ images }) {
  return images.map(f => `data:${f.mimetype};base64,${f.buffer.toString('base64')}`);
}

export async function stream({ userId, systemPrompt, userMessage }) {
  const messages = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: userMessage.filter(b => b.type === 'text').map(b => b.text).join('\n'),
    },
  ];

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
    stream: true,
  });

  const readable = new Readable({ read() {} });

  (async () => {
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        readable.push(`data: ${JSON.stringify({ type: 'content', data: { content } })}\n\n`);
      }
    }
    readable.push(`data: ${JSON.stringify({ type: 'completed' })}\n\n`);
    readable.push(null);
  })();

  return readable;
}