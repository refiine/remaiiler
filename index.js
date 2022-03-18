require('dotenv').config();

const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');

async function main() {
  const { EMAIL_TO, EMAIL_SUBJECT, EMAIL_HTML = './email.html', EMAIL_TEXT = '', GMAIL_USERNAME, GMAIL_PASSWORD, GMAIL_PORT = 587 } = process.env;
  const readFile = promisify(fs.readFile);

  const gmail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: GMAIL_PORT,
    secure: (GMAIL_PORT === 465), // true for 465, false for other ports
    auth: {
      user: GMAIL_USERNAME,
      pass: GMAIL_PASSWORD,
    },
  });

  const info = await gmail.sendMail({
    from: '"remaiiler" <digital@refiine.co.uk>',
    to: EMAIL_TO,
    subject: EMAIL_SUBJECT,
    text: EMAIL_TEXT,
    html: await readFile(EMAIL_HTML, 'utf8')
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
