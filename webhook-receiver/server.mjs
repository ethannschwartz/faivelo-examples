import { createServer } from 'node:http'
import { Faivelo, FaiveloWebhookError } from 'faivelo'

const secret = process.env.FAIVELO_WEBHOOK_SECRET
const seen = new Set() // use your database in production: retries reuse the same event id

createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/faivelo') {
    res.writeHead(404).end()
    return
  }

  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const rawBody = Buffer.concat(chunks).toString('utf8')

  let event
  try {
    event = await Faivelo.webhooks.verify(rawBody, req.headers['x-faivelo-signature'], secret)
  } catch (err) {
    const status = err instanceof FaiveloWebhookError ? 400 : 500
    res.writeHead(status).end(err.message)
    return
  }

  // Answer fast; do slow work after acknowledging.
  res.writeHead(200).end('ok')
  if (seen.has(event.id)) return
  seen.add(event.id)

  switch (event.type) {
    case 'message.received': {
      const { mailbox, from, subject, snippet, message_id } = event.data
      console.log(`New mail in ${mailbox} from ${from.address}: ${subject}\n  ${snippet}`)
      // Full body: GET /api/v1/mailboxes/{mailbox}/messages/{message_id}
      if (process.env.FAIVELO_API_KEY) {
        const r = await fetch(`https://faivelo.com/api/v1/mailboxes/${encodeURIComponent(mailbox)}/messages/${message_id}`, {
          headers: { Authorization: `Bearer ${process.env.FAIVELO_API_KEY}` }
        })
        const body = await r.json()
        console.log(body.data?.text?.slice(0, 500))
      }
      break
    }
    case 'email.bounced':
      console.log(`Bounce for ${event.data.to?.join(', ')}: ${event.data.bounce?.reason}`)
      break
    default:
      console.log(`Unhandled event ${event.type}`)
  }
}).listen(8787, () => console.log('Listening on http://localhost:8787/faivelo'))
