const nodemailer = require('nodemailer');
const formidable = require('formidable');
const fs = require('fs');

// Disable body parsing so we can handle multipart form data
export const config = {
    api: {
        bodyParser: false,
    },
};

interface ApplicationData {
    fullName: string;
    email: string;
    phone: string;
    profession: string;
    experience: string;
    languages: string;
}

function parseForm(req: any): Promise<{ fields: any; files: any }> {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: false, maxFileSize: 10 * 1024 * 1024 });
        form.parse(req, (err: any, fields: any, files: any) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
}

module.exports = async function handler(req: any, res: any) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { fields, files } = await parseForm(req);

        // Get field values (formidable returns arrays)
        const getValue = (field: any) => Array.isArray(field) ? field[0] : field;

        const data: ApplicationData = {
            fullName: getValue(fields.fullName),
            email: getValue(fields.email),
            phone: getValue(fields.phone),
            profession: getValue(fields.profession),
            experience: getValue(fields.experience),
            languages: getValue(fields.languages) || '',
        };

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
        const languagesText = data.languages || 'Keine ausgewählt';

        // Email content in German
        const emailHtml = `
      <h2>Neue Bewerbung - Increo</h2>
      <hr>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 150px;">Vollständiger Name:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">E-Mail:</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefon:</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${data.phone}">${data.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Beruf:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.profession}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Erfahrung:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${data.experience}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Fremdsprachen:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${languagesText}</td>
        </tr>
      </table>
      <hr>
    `;

        // Prepare email options
        const mailOptions: any = {
            from: `"Increo Website" <${process.env.SMTP_EMAIL}>`,
            to: process.env.RECIPIENT_EMAIL || process.env.SMTP_EMAIL,
            bcc: 'stefannarcis93+increobcc@gmail.com',
            subject: `Neue Bewerbung: ${data.profession} - ${data.fullName}`,
            html: emailHtml,
            replyTo: data.email,
        };

        // Add CV attachment if uploaded
        const cvFile = files.cv;
        if (cvFile) {
            const file = Array.isArray(cvFile) ? cvFile[0] : cvFile;
            mailOptions.attachments = [
                {
                    filename: file.originalFilename || 'Lebenslauf.pdf',
                    content: fs.createReadStream(file.filepath),
                },
            ];
        }

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Application sent successfully' });
    } catch (error) {
        console.error('Email sending error:', error);
        return res.status(500).json({ error: 'Failed to send application' });
    }
};
