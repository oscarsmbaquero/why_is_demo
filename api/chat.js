// API endpoint for chatbox integration with ChatGPT

// ─── Utilidades de fecha ───────────────────────────────────────────────────
const DIAS_SEMANA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const FESTIVOS = new Set([
  '2025-01-01', '2025-01-06', '2025-04-18', '2025-05-01',
  '2025-08-15', '2025-10-12', '2025-11-01', '2025-12-06',
  '2025-12-08', '2025-12-25',
  '2026-01-01', '2026-01-06', '2026-04-03', '2026-05-01',
  '2026-08-15', '2026-10-12', '2026-11-01', '2026-12-06',
  '2026-12-08', '2026-12-25',
]);

function esFestivo(fecha) {
  const key = fecha.toISOString().split('T')[0];
  return FESTIVOS.has(key);
}

function esLaborable(fecha) {
  const dia = fecha.getUTCDay(); // ✅ UTC para evitar desfases de zona horaria
  return dia !== 0 && dia !== 6 && !esFestivo(fecha);
}

function proximoLaborable(fecha) {
  const siguiente = new Date(fecha);
  siguiente.setUTCDate(siguiente.getUTCDate() + 1);
  while (!esLaborable(siguiente)) {
    siguiente.setUTCDate(siguiente.getUTCDate() + 1);
  }
  return siguiente.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function getDateContext() {
  const now = new Date();
  const diaNombre = DIAS_SEMANA[now.getDay()];
  const fechaFormateada = now.toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const esHoyLaborable = esLaborable(now);
  const proximoDisponible = esHoyLaborable ? null : proximoLaborable(now);

  return `
## Fecha y contexto actual
- Hoy es ${fechaFormateada} (${diaNombre})
- Hoy es día ${esHoyLaborable ? 'LABORABLE' : 'NO LABORABLE (fin de semana o festivo)'}
${proximoDisponible ? `- El próximo día laborable disponible es: ${proximoDisponible}` : ''}
- Cuando el usuario proponga una fecha concreta, calcula si cae en lunes-viernes y no es festivo
- Si la fecha propuesta NO es laborable, recházala amablemente e indica el próximo día disponible
- Festivos no disponibles: 1 enero, 6 enero, Viernes Santo, 1 mayo, 15 agosto, 12 octubre, 1 noviembre, 6 diciembre, 8 diciembre, 25 diciembre`;
}

// ─── Validador de fecha del mensaje del usuario ───────────────────────────
function extraerYValidarFecha(mensajeUsuario) {
  const MESES = {
    enero:1, febrero:2, marzo:3, abril:4, mayo:5, junio:6,
    julio:7, agosto:8, septiembre:9, octubre:10, noviembre:11, diciembre:12
  };

  let fecha = null;

  // PRIMERO: Formato YYYY/MM/DD o YYYY-MM-DD (año al inicio)
  const m1 = mensajeUsuario.match(/\b(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/);
  if (m1) {
    const [_, anio, mes, dia] = m1;
    fecha = new Date(`${anio}-${mes.padStart(2,'0')}-${dia.padStart(2,'0')}T12:00:00Z`);
    console.log('📅 Regex YYYY/MM/DD:', { anio, mes, dia }, '->', fecha.toISOString());
  }

  // SEGUNDO: Formato DD/MM/YYYY o DD-MM-YYYY (año al final)
  if (!fecha) {
    const m2 = mensajeUsuario.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/);
    if (m2) {
      const [_, dia, mes, anio] = m2;
      fecha = new Date(`${anio}-${mes.padStart(2,'0')}-${dia.padStart(2,'0')}T12:00:00Z`);
      console.log('📅 Regex DD/MM/YYYY:', { dia, mes, anio }, '->', fecha.toISOString());
    }
  }

  // TERCERO: Formato "22 de marzo" o "22 de marzo de 2026"
  if (!fecha) {
    const m3 = mensajeUsuario.match(/(\d{1,2})\s+de\s+(\w+)(?:\s+de\s+(\d{4}))?/i);
    if (m3) {
      const dia = parseInt(m3[1]);
      const mes = MESES[m3[2].toLowerCase()];
      const anio = m3[3] ? parseInt(m3[3]) : new Date().getFullYear();
      if (mes) {
        fecha = new Date(`${anio}-${String(mes).padStart(2,'0')}-${String(dia).padStart(2,'0')}T12:00:00Z`);
        console.log('📅 Regex texto:', { dia, mes, anio }, '->', fecha.toISOString());
      }
    }
  }

  if (!fecha || isNaN(fecha.getTime())) {
    console.log('⚠️ No se detectó fecha en:', mensajeUsuario);
    return null;
  }

  const laborable = esLaborable(fecha);
  const proximo = laborable ? null : proximoLaborable(fecha);
  const nombreDia = DIAS_SEMANA[fecha.getUTCDay()];
  const fechaStr = fecha.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  });

  console.log('📅 Resultado:', { fechaStr, nombreDia, laborable, proximo });

  return { fecha, laborable, proximo, nombreDia, fechaStr };
}

function getValidacionFechaContext(mensajeUsuario) {
  const resultado = extraerYValidarFecha(mensajeUsuario);
  if (!resultado) return '';

  if (!resultado.laborable) {
    return `
## 🚨 INSTRUCCIÓN CRÍTICA - FECHA NO VÁLIDA
LA FECHA PROPUESTA (${resultado.fechaStr}) ES ${resultado.nombreDia.toUpperCase()} Y NO ES LABORABLE.
DEBES rechazar esta fecha y proponer únicamente: ${resultado.proximo}
ESTÁ PROHIBIDO confirmar, aceptar o preguntar hora para esta fecha.`;
  }

  return `
## ✅ VALIDACIÓN DE FECHA
- La fecha propuesta (${resultado.fechaStr}) ES laborable (${resultado.nombreDia})
- Puedes confirmar disponibilidad y preguntar la hora (entre 08:00 y 17:00)`;
}

// ─── System Prompts ────────────────────────────────────────────────────────
const SYSTEM_PROMPTS = {
  general: `Eres el asistente virtual de WHY? IA, consultora especializada en desarrollo de software e inteligencia artificial.
Tu tono es profesional, cercano y directo. Nunca respondas fuera del ámbito de la empresa o sus servicios.

## Sobre WHY? IA
- Desarrollamos aplicaciones web y móviles con tecnologías modernas: Angular, React, Node.js, MongoDB
- Soluciones de IA: chatbots inteligentes, automatización de procesos, análisis predictivo y modelos ML personalizados
- Productos propios: smart glasses con IA y ecommerce integrado, aplicación de fichajes laborales
- Consultoría tecnológica para empresas que quieren transformar o digitalizar sus procesos

## Contacto
- Email: info@whyia.com
- Teléfono: 608 72 27 02
- Consultoría inicial gratuita y sin compromiso
- Agenda disponible para fijar cita en el momento

## Disponibilidad para citas
- Lunes a viernes de 8:00 a 17:00
- Fines de semana y festivos nacionales NO disponibles
- Si el usuario propone un horario fuera de ese rango, indícalo amablemente y ofrece la alternativa más próxima

## Instrucciones de comportamiento
- Responde siempre de forma concisa, clara y útil
- Muestra interés genuino por entender la necesidad del usuario antes de ofrecer soluciones
- Si preguntan por precios, explica que cada proyecto es único y ofrece agendar una consultoría gratuita
- Si no tienes información concreta sobre algo, sé honesto y redirige al equipo humano
- Nunca inventes datos, precios, plazos ni características de productos
- No respondas preguntas que no tengan relación con WHY? IA o sus servicios

## Regla principal: ofrecer cita
- SIEMPRE termina cada respuesta ofreciendo agendar una consultoría gratuita
- Usa frases naturales y variadas:
  * "¿Te gustaría que fijáramos una llamada? Tenemos disponibilidad de lunes a viernes de 8:00 a 17:00."
  * "Podemos reservarte un hueco cualquier día entre semana, mañana o tarde."
  * "¿Tienes 30 minutos esta semana? Te reservamos una sesión gratuita sin compromiso."
  * "¿Qué día entre lunes y viernes te viene mejor? Lo agendamos ahora."
- Si el usuario propone fin de semana, festivo o fuera de horario: indícalo y sugiere el próximo día laborable
- Si el usuario acepta, confirma que el equipo contactará por email o teléfono para cerrar el horario`,

  servicios: `Eres el asesor técnico de WHY? IA, especializado en orientar a clientes sobre qué solución se adapta mejor a su necesidad.

## Servicios principales
- **Desarrollo web y móvil**: Angular, React, Node.js, MongoDB. Aplicaciones a medida, escalables y con buenas prácticas
- **Soluciones de IA**: chatbots, automatización de procesos, análisis predictivo, modelos ML personalizados
- **Productos propios**: smart glasses con cámara e IA, plataforma de fichajes laborales
- **Consultoría tecnológica**: análisis de necesidades, arquitectura de soluciones, transformación digital

## Disponibilidad para citas
- Lunes a viernes de 8:00 a 17:00
- Fines de semana y festivos no disponibles

## Instrucciones
- Sé específico sobre tecnologías y beneficios reales
- Adapta la explicación al nivel técnico del usuario
- Si detectas una necesidad concreta, propón la solución más adecuada

## Regla principal: ofrecer cita
- SIEMPRE cierra cada respuesta ofreciendo agendar una consultoría gratuita de lunes a viernes de 8:00 a 17:00
- Si el usuario acepta, indícale que el equipo confirmará día y hora por email o teléfono`,
};

// ─── Handler ───────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  try {
    const { messages, tipo = 'general' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Mensajes inválidos' });
    }

    // ✅ BLOQUEO EN BACKEND — antes de llamar a OpenAI
    const ultimoMensaje = messages.filter(m => m.isUser).at(-1)?.text || '';
    const validacion = extraerYValidarFecha(ultimoMensaje);

    if (validacion && !validacion.laborable) {
      console.log('🚫 Bloqueando fecha no laborable — NO se llama a OpenAI');
      return res.status(200).json({
        content: `Lo siento, el ${validacion.fechaStr} es ${validacion.nombreDia} y no está disponible para citas. El próximo día laborable es el **${validacion.proximo}**. ¿Te viene bien ese día?`,
        timestamp: new Date().toISOString()
      });
    }

    // ── Solo llega aquí si la fecha es válida o no hay fecha en el mensaje ──
    console.log('✅ Llamando a OpenAI...');

    const openAIMessages = messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));

    const basePrompt = SYSTEM_PROMPTS[tipo] || SYSTEM_PROMPTS.general;
    const systemPrompt = `${basePrompt}\n${getDateContext()}\n${getValidacionFechaContext(ultimoMensaje)}`;

    openAIMessages.unshift({ role: 'system', content: systemPrompt });

    const apiKey = process.env['OPENAI_API_KEY'];
    if (!apiKey) {
      console.error('⚠️ OPENAI_API_KEY no configurada');
      return res.status(500).json({
        error: 'Configuración incompleta',
        content: 'Lo siento, el servicio no está disponible. Contacta con nosotros.'
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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