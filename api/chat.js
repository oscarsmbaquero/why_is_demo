// API endpoint for chatbox integration with ChatGPT

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

module.exports = async function handler(req, res) {
  // Configurar CORS para producción
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

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

    // Verificar API key
    const apiKey = process.env['OPENAI_API_KEY'];
    if (!apiKey) {
      console.error('⚠️ OPENAI_API_KEY no configurada');
      return res.status(500).json({ 
        error: 'Configuración incompleta',
        content: 'Lo siento, el servicio no está disponible. Contacta con nosotros.'
      });
    }

    // Llamar a la API de OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: openAIMessages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', response.status, errorData);
      
      return res.status(500).json({ 
        error: 'Error de OpenAI',
        content: 'Lo siento, hubo un problema al conectar con el servicio. Por favor, intenta de nuevo.'
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje.';

    return res.status(200).json({
      content: assistantMessage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en chat API:', error);
    console.error('Stack trace:', error?.stack);
    return res.status(500).json({ 
      error: 'Error al procesar el mensaje',
      content: 'Lo siento, hubo un error al conectar con el asistente. Por favor, intenta de nuevo.',
      details: process.env['NODE_ENV'] === 'development' ? error?.message : undefined
    });
  }
}
