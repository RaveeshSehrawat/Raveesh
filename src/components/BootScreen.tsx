'use client'
import { useEffect, useState } from 'react'

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)

  const logs = [
    'Initializing Portfolio OS...',
    'Loading user profile: raveesh',
    'Mounting file systems...',
    'Starting window manager...',
    'Loading assets...',
    'Boot complete. Welcome!',
  ]

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    logs.forEach((_, i) => {
      timers.push(setTimeout(() => setPhase(i + 1), 300 + i * 280))
    })
    timers.push(setTimeout(onComplete, 300 + logs.length * 280 + 400))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(160deg, #051525 0%, #0a2040 60%, #0d2d5c 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
    }}>
      {/* Logo */}
      <div style={{
        fontSize: 60, marginBottom: 20,
        filter: 'drop-shadow(0 0 20px rgba(79,163,247,0.5))',
      }} className="animate-float">⬡</div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 32, fontWeight: 800,
        background: 'linear-gradient(90deg, #4fa3f7, #82c4ff)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 8,
      }}>Portfolio OS</h1>

      <p style={{ color: 'rgba(170,205,240,0.6)', fontSize: 13, marginBottom: 40 }}>
        v1.0.0 — Raveesh Edition
      </p>

      {/* Boot logs */}
      <div style={{
        background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(79,163,247,0.2)',
        borderRadius: 10, padding: '20px 28px', width: 400, marginBottom: 32,
        minHeight: 160,
      }}>
        {logs.slice(0, phase).map((log, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            color: i === phase - 1 ? '#4fa3f7' : 'rgba(150,200,240,0.6)',
            fontSize: 13, marginBottom: 6,
            animation: 'fadeSlideIn 0.25s ease forwards',
          }}>
            <span style={{ color: i === phase - 1 ? '#28c840' : 'rgba(100,160,200,0.5)' }}>
              {i === phase - 1 ? '▶' : '✓'}
            </span>
            {log}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ width: 300, height: 3, background: 'rgba(79,163,247,0.2)', borderRadius: 2, overflow: 'hidden' }}>
        <div
          className="boot-progress"
          style={{ height: '100%', background: 'linear-gradient(90deg, #2589e8, #4fa3f7)', borderRadius: 2 }}
        />
      </div>
    </div>
  )
}
