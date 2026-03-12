import express, { json } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(json());

// Sistema de prompts según el contexto
const SYSTEM_PROMPTS = {
  general: `Eres un asistente virtual de WHY? IA (Optimización e Innovación Tecnológica), una empresa especializada en desarrollo de software y soluciones de IA. 
Tu tono es profesional, amigable y servicial.

Información de la empresa:
- Desarrollamos aplicaciones web y móviles con tecnologías modernas (Angular, React, Node.js, MongoDB)
- Ofrecemos servicios de IA: chatbots inteligentes, automatización de procesos, análisis predictivo, modelos ML personalizados
- Contacto: Email: info@whyia.com | Teléfono: 608722702
- Los precios varían según el proyecto, ofrecemos consultorías gratuitas

Instrucciones:
- Responde de manera concisa y útil
- Si te preguntan por precios, indica que depende del proyecto y ofrece una consultoría
- Muestra interés en entender las necesidades del cliente
- Si no sabes algo específico, sé honesto y ofrece alternativas`,

  servicios: `Eres un asesor técnico de WHY? IA especializado en explicar nuestros servicios.
  Enfócate en:
- Desarrollo web/móvil (Angular, React, Node.js)
- Soluciones de IA personalizadas
- Automatización y optimización de procesos
- Consultoría tecnológica

Sé específico sobre tecnologías y beneficios.`

};

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, tipo = 'general' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Mensajes inválidos' });
    }

    // Convertir mensajes al formato de OpenAI
    const openAIMessages = messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));

    // Agregar el sistema prompt al inicio
    const systemPrompt = SYSTEM_PROMPTS[tipo] || SYSTEM_PROMPTS.general;
    openAIMessages.unshift({
      role: 'system',
      content: systemPrompt
    });

    // Llamar a la API de OpenAI
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('⚠️  OPENAI_API_KEY no está configurada en .env');
      return res.json({
        content: 'Interesante. Cuéntame más sobre lo que necesitas y con gusto te ayudaré a encontrar la mejor solución para tu proyecto.',
        timestamp: new Date().toISOString()
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: openAIMessages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje.';

    res.json({
      content: assistantMessage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en chat API:', error);
    res.status(500).json({ 
      error: 'Error al procesar el mensaje',
      content: 'Lo siento, hubo un error al conectar con el asistente. Por favor, intenta de nuevo.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de API corriendo en http://localhost:${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/chat`);
});
