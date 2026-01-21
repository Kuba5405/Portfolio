import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

// Empty loader for GET requests (renders component)
export async function loader({ request }: LoaderFunctionArgs) {
  return json({});  // Or return null/undefined if no data needed
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const honeypot = formData.get('name')?.toString().trim();
  const email = String(formData.get('email'));
  const message = String(formData.get('message'));
  const errors: Record<string, string> = {};

  if (honeypot) return json({ success: true });

  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!message) {
    errors.message = 'Please enter a message.';
  }
  if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: [process.env.EMAIL!],
    subject: `Portfolio message from ${email}`,
    text: `From: ${email}\n\n${message}`,
    replyTo: email,
  });

  if (error) {
    console.error('Resend error:', error);
    return json({ errors: { message: 'Failed to send email. Try again.' } }, { status: 500 });
  }

  return json({ success: true });
}
