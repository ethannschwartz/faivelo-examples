'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = Object.fromEntries(new FormData(e.currentTarget))
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setStatus(res.ok ? 'sent' : 'error')
  }

  if (status === 'sent') return <p>Thanks, we will reply by email.</p>
  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      <h1>Contact us</h1>
      <input name="name" placeholder="Your name" />
      <input name="email" type="email" placeholder="you@example.com" required />
      <textarea name="message" rows={5} placeholder="How can we help?" required />
      <button disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send'}</button>
      {status === 'error' && <p>Something went wrong. Please try again.</p>}
    </form>
  )
}
