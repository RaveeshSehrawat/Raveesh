'use client'
import { useState } from 'react'

export default function ContactWindow() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const contacts = [
    { icon: '📧', label: 'Email', value: 'ravseh88@gmail.com', action: () => copy('ravseh88@gmail.com', 'Email') },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/raveeshsehrawat', action: () => window.open('https://www.linkedin.com/in/raveeshsehrawat', '_blank') },
    { icon: '🐙', label: 'GitHub', value: 'github.com/raveeshsehrawat', action: () => window.open('https://github.com/raveeshsehrawat', '_blank') },
    { icon: '🔗', label: 'Portfolio', value: 'https://raveesh.vercel.app/', action: () => window.open('https://raveesh.dev', '_blank') },
  ]

  return (
    <div style={{ padding: '40px 48px', fontFamily: 'var(--font-body)', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--os-text)', marginBottom: 12 }}>
        Get in Touch
      </h2>
      <p style={{ fontSize: 15, color: 'var(--os-text-muted)', marginBottom: 28, lineHeight: 1.6 }}>
        Open to AI/ML engineering roles, collaborations, and interesting conversations. Always excited to discuss data science, machine learning, and building intelligent systems!
      </p>

      <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
        {contacts.map(c => (
          <button
            key={c.label}
            onClick={c.action}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 18px', borderRadius: 10, border: '1.5px solid rgba(21,101,192,0.15)',
              background: 'rgba(255,255,255,0.6)', cursor: 'pointer',
              transition: 'all 0.15s', textAlign: 'left', width: '100%',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(21,101,192,0.4)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.6)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(21,101,192,0.15)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
            }}
          >
            <span style={{ fontSize: 24 }}>{c.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text)' }}>{c.label}</div>
              <div style={{ fontSize: 12.5, color: 'var(--os-text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{c.value}</div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--os-accent)', fontWeight: 500 }}>
              {copied === c.label ? '✓ Copied!' : '↗'}
            </span>
          </button>
        ))}
      </div>

      {/* Status */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 18px', borderRadius: 10,
        background: 'rgba(40,200,64,0.08)', border: '1px solid rgba(40,200,64,0.25)'
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%', background: '#28c840',
          boxShadow: '0 0 8px rgba(40,200,64,0.6)'
        }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--os-text)' }}>Open to Opportunities</div>
          <div style={{ fontSize: 13.5, color: 'var(--os-text-muted)', marginTop: 3 }}>
            Seeking AI/ML Engineering roles · Delhi, India (Remote friendly)
          </div>
        </div>
      </div>
    </div>
  )
}
