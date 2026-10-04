import { Faivelo, FaiveloError } from 'faivelo'

const faivelo = new Faivelo(process.env.FAIVELO_API_KEY!)

export async function POST(req: Request) {
  const { name, email, message } = await req.json().catch(() => ({}))
  if (typeof email !== 'string' || !email.includes('@') || typeof message !== 'string' || !message.trim()) {
    return Response.json({ error: 'email and message are required' }, { status: 400 })
  }

  try {
    const sent = await faivelo.emails.send({
      from: `Website <${process.env.CONTACT_FROM}>`,
      to: process.env.CONTACT_TO!,
      replyTo: email,
      subject: `New message from ${name || email}`,
      text: `${message}\n\nFrom: ${name || 'unknown'} <${email}>`
    })
    return Response.json({ ok: true, id: sent.id })
  } catch (err) {
    // FaiveloError carries the HTTP status and a plain-English message.
    const status = err instanceof FaiveloError ? err.statusCode : 500
    return Response.json({ error: err instanceof Error ? err.message : 'send failed' }, { status })
  }
}
