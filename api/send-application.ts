const nodemailer = require('nodemailer');

interface ApplicationData {
    fullName: string;
    email: string;
    phone: string;
    profession: string;
    experience: string;
    languages: string[];
}

module.exports = async function handler(req: any, res: any) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const data: ApplicationData = req.body;

        // Validate required fields
        if (!data.fullName || !data.email || !data.phone || !data.profession || !data.experience) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create SMTP transporter with Google
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Format languages
        const languagesText = data.languages && data.languages.length > 0
            ? data.languages.join(', ')
            : 'Niciuna selectată';

        // Email content
        const emailHtml = `
      <h2>Aplicație Nouă - Increo</h2>
      <hr>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 150px;">Nume Complet:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefon:</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${data.phone}">${data.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Meserie:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.profession}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Experiență:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.experience}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Limbi străine:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${languagesText}</td>
        </tr>
      </table>
      <hr>
      <p style="color: #666; font-size: 12px;">Aplicație trimisă de pe increo.swiss</p>
    `;

        // Send email
        await transporter.sendMail({
            from: `"Increo Website" <${process.env.SMTP_EMAIL}>`,
            to: process.env.RECIPIENT_EMAIL || process.env.SMTP_EMAIL,
            subject: `Aplicație nouă: ${data.profession} - ${data.fullName}`,
            html: emailHtml,
            replyTo: data.email,
        });

        return res.status(200).json({ success: true, message: 'Application sent successfully' });
    } catch (error) {
        console.error('Email sending error:', error);
        return res.status(500).json({ error: 'Failed to send application' });
    }
};
