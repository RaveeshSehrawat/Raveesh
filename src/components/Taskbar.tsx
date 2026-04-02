'use client'
import { useState, useEffect } from 'react'

interface TaskbarProps {
  openWindows: string[]
  activeWindow: string | null
  onWindowClick: (id: string) => void
}

export default function Taskbar({ openWindows, activeWindow, onWindowClick }: TaskbarProps) {
  const [time, setTime] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const windowLabels: Record<string, { icon: string; label: string }> = {
    about:    { icon: '👤', label: 'About Me' },
    skills:   { icon: '⚡', label: 'Skills' },
    projects: { icon: '🗂️', label: 'Projects' },
    contact:  { icon: '📬', label: 'Contact' },
    terminal: { icon: '💻', label: 'Terminal' },
  }

  return (
    <div className="os-taskbar">
      {/* Start button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 14px',
        borderRadius: 8,
        background: 'linear-gradient(135deg,#1a6fc4,#2589e8)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'white',
        fontSize: isMobile ? 13 : 20,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(21,101,192,0.4)',
        minWidth: 50,
        minHeight: 50,
        flexDirection: isMobile ? 'row' : 'column'
      }}>
        <span>⬡</span>
        {isMobile && <span style={{ fontSize: 13, marginLeft: 6 }}>Portfolio</span>}
      </div>

      <div style={{ width: 1, height: 1, background: 'transparent' }} />

      {/* All available windows */}
      {Object.entries(windowLabels).map(([id, label]) => (
        <button
          key={id}
          className={`taskbar-btn ${activeWindow === id ? 'active' : ''}`}
          onClick={() => onWindowClick(id)}
          title={label.label}
        >
          <span>{label.icon}</span>
          {isMobile && <span>{label.label}</span>}
        </button>
      ))}

      {/* Clock - at bottom */}
      <div style={{ marginTop: 'auto' }}>
        <div className="taskbar-clock">{time}</div>
      </div>
    </div>
  )
}
