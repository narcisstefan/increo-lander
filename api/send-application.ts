const nodemailer = require('nodemailer');
const { IncomingForm } = require('formidable');
const fs = require('fs');

// Translation mappings RO -> DE
const professionMap: Record<string, string> = {
    // Romanian to German
    'Zidar': 'Maurer',
    'Dulgher': 'Zimmermann',
    'Fierar Betonist': 'Eisenflechter',
    'Electrician': 'Elektriker',
    'Faianțar': 'Fliesenleger',
    'Montator Rigips': 'Trockenbauer',
    'Tâmplar': 'Schreiner',
    'Zugrav': 'Maler',
    'Instalator': 'Installateur',
    'Șef de Șantier': 'Bauleiter',
    'Altă Meserie': 'Anderer Beruf',
    // German (passthrough)
    'Maurer': 'Maurer',
    'Zimmermann': 'Zimmermann',
    'Eisenflechter': 'Eisenflechter',
    'Elektriker': 'Elektriker',
    'Fliesenleger': 'Fliesenleger',
    'Trockenbauer': 'Trockenbauer',
    'Schreiner': 'Schreiner',
    'Maler': 'Maler',
    'Installateur': 'Installateur',
    'Bauleiter': 'Bauleiter',
    'Anderer Beruf': 'Anderer Beruf',
};

const experienceMap: Record<string, string> = {
    // Romanian to German
    '1-2 ani': '1-2 Jahre',
    '3-5 ani': '3-5 Jahre',
    '5-10 ani': '5-10 Jahre',
    '10+ ani': '10+ Jahre',
    // German (passthrough)
    '1-2 Jahre': '1-2 Jahre',
    '3-5 Jahre': '3-5 Jahre',
    '5-10 Jahre': '5-10 Jahre',
    '10+ Jahre': '10+ Jahre',
};

const languageMap: Record<string, string> = {
    // Romanian to German
    'Germană': 'Deutsch',
    'Italiană': 'Italienisch',
    'Franceză': 'Französisch',
    'Portugheză': 'Portugiesisch',
    'Engleză': 'Englisch',
    // German (passthrough)
    'Deutsch': 'Deutsch',
    'Italienisch': 'Italienisch',
    'Französisch': 'Französisch',
    'Portugiesisch': 'Portugiesisch',
    'Englisch': 'Englisch',
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
        const form = new IncomingForm({ maxFileSize: 10 * 1024 * 1024 });
        form.parse(req, (err: any, fields: any, files: any) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
}

function translateToGerman(value: string, map: Record<string, string>): string {
    return map[value] || value;
}

function translateLanguages(languages: string): string {
    if (!languages) return 'Keine ausgewählt';
    const langArray = languages.split(', ').map(lang => translateToGerman(lang.trim(), languageMap));
    return langArray.join(', ');
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

        // Translate to German
        const professionDE = translateToGerman(data.profession, professionMap);
        const experienceDE = translateToGerman(data.experience, experienceMap);
        const languagesDE = translateLanguages(data.languages);

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
          <td style="padding: 10px; border: 1px solid #ddd;">${professionDE}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Erfahrung:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${experienceDE}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Fremdsprachen:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${languagesDE}</td>
        </tr>
      </table>
      <hr>
    `;

        // Prepare email options
        const mailOptions: any = {
            from: `"Increo Website" <${process.env.SMTP_EMAIL}>`,
            to: process.env.RECIPIENT_EMAIL || process.env.SMTP_EMAIL,
            subject: `Neue Bewerbung: ${professionDE} - ${data.fullName}`,
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

// Config for Vercel to disable body parsing
module.exports.config = {
    api: {
        bodyParser: false,
    },
};
