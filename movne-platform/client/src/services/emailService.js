// Using mailto: protocol (free)
export const sendEmail = (to, subject, body) => {
  const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

// Email templates (free)
export const generateEmailTemplate = (type, data) => {
  const templates = {
    client: `
      שלום ${data.clientName},
      
      תודה על השיחה שקיימנו היום.
      
      סיכום השיחה:
      ${data.summary}
      
      משימות למעקב:
      ${data.tasks.map(task => `- ${task}`).join('\n')}
      
      בברכה,
      ${data.advisorName}
    `,
    advisor: `
      משימות למעקב:
      ${data.tasks.map(task => `- ${task}`).join('\n')}
      
      נושאים רגולטוריים:
      ${data.regulatoryItems.map(item => `- ${item}`).join('\n')}
    `
  };
  
  return templates[type];
};
