const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

// Create reusable transporter with OAuth2
const createTransporter = async (advisorEmail) => {
  try {
    // If we have OAuth credentials
    if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET) {
      // In a real implementation, get advisor's refresh token from database
      // For now, we'll use a test account for development
      
      const oauth2Client = new OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        process.env.GMAIL_REDIRECT_URI
      );
      
      // In production, get the refresh token from your database
      // const advisor = await getAdvisorByEmail(advisorEmail);
      // oauth2Client.setCredentials({ refresh_token: advisor.gmailRefreshToken });
      
      // For development, use nodemailer's test account
      const testAccount = await nodemailer.createTestAccount();
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      
      console.log('Using test email account:', testAccount.user);
      
      return { transporter, testAccount };
    } else {
      // Fallback to test account if no OAuth credentials
      const testAccount = await nodemailer.createTestAccount();
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      
      console.log('Using test email account:', testAccount.user);
      
      return { transporter, testAccount };
    }
  } catch (error) {
    console.error('Error creating email transporter:', error);
    throw error;
  }
};

// Send meeting summary email
const sendMeetingSummary = async (clientEmail, advisorEmail, meetingData) => {
  try {
    const { transporter, testAccount } = await createTransporter(advisorEmail);
    
    // Prepare email content
    const emailContent = `
      <h2>סיכום פגישת ייעוץ</h2>
      <p><strong>תאריך:</strong> ${new Date(meetingData.date).toLocaleDateString('he-IL')}</p>
      <p><strong>יועץ:</strong> ${meetingData.advisorName}</p>
      
      <h3>נושאים שנדונו</h3>
      <p>${meetingData.summary}</p>
      
      ${meetingData.actionItems && meetingData.actionItems.length > 0 ? `
        <h3>משימות להמשך</h3>
        <ul>
          ${meetingData.actionItems.map(item => `<li>${item}</li>`).join('')}
        </ul>
      ` : ''}
      
      <p>צוות Movne Platform</p>
    `;
    
    // Send email to client
    const clientInfo = await transporter.sendMail({
      from: `"Movne Platform" <${process.env.EMAIL_FROM || advisorEmail}>`,
      to: clientEmail,
      subject: 'סיכום פגישת ייעוץ פיננסי',
      html: emailContent,
      text: emailContent.replace(/<[^>]*>/g, '') // Strip HTML for text version
    });
    
    // Send copy to advisor
    const advisorInfo = await transporter.sendMail({
      from: `"Movne Platform" <${process.env.EMAIL_FROM || 'support@movne.com'}>`,
      to: advisorEmail,
      subject: `סיכום פגישה - ${meetingData.clientName}`,
      html: emailContent,
      text: emailContent.replace(/<[^>]*>/g, '') // Strip HTML for text version
    });
    
    // Log URLs for ethereal email in development
    if (testAccount) {
      console.log('Client email preview URL:', nodemailer.getTestMessageUrl(clientInfo));
      console.log('Advisor email preview URL:', nodemailer.getTestMessageUrl(advisorInfo));
    }
    
    return {
      clientMessageId: clientInfo.messageId,
      advisorMessageId: advisorInfo.messageId
    };
  } catch (error) {
    console.error('Error sending meeting summary email:', error);
    throw error;
  }
};

// Other email functions (quarterly review, product announcements, reminders)
// Follow similar pattern using OAuth2 for production

module.exports = {
  sendMeetingSummary
  // Add other email functions as needed
};
