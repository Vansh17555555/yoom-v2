// pages/api/send.ts or app/api/send/route.ts
import EmailTemplate from '@/components/email';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { emailAddress, transcriptionText } = req.body;

    if (!emailAddress || !transcriptionText) {
      return res.status(400).json({ error: 'Missing email address or transcription text' });
    }

    try {
      await resend.emails.send({
        from: 'vvansh739@gmail.com', // Replace with your verified sender email
        to: emailAddress,
        subject: 'Your Transcription',
        react: EmailTemplate({ 'firstName':transcriptionText }),
      });
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Failed to send email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
