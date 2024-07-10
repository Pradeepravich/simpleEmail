import express from 'express';
import { json } from 'body-parser';
import { sendEmail } from '../configurations/emailSetting';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.EMAIL_API_PORT;

app.use(json());

app.post('/send-email', async (req, res) => {
  // const { to, subject, text, html } = req.body; sendEmail({ to, subject, text, html });
  const { name,email,message } = req.body;

  const to = process.env.EMAIL_TO;
  const subject = `New Contact Form from ${name}`;
  const html = `<p><b>Name:</b> ${name}</p>
                   <p><b>Email:</b> ${email}</p>
                   <p><b>Message:</b> ${message}</p>`;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendEmail({ to , subject, html });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
