'use client'
import { useState, useCallback } from 'react'
import BootScreen from '@/components/BootScreen'
import Taskbar from '@/components/Taskbar'
import OSWindow from '@/components/OSWindow'
import AboutWindow from '@/components/AboutWindow'
import SkillsWindow from '@/components/SkillsWindow'
import ProjectsWindow from '@/components/ProjectsWindow'
import ContactWindow from '@/components/ContactWindow'
import TerminalWindow from '@/components/TerminalWindow'

type WindowId = 'about' | 'skills' | 'projects' | 'contact' | 'terminal'

interface WindowState {
  id: WindowId
  zIndex: number
  pos: { x: number; y: number }
}

const generateRandomPosition = (width: number, height: number) => {
  const minX = 100 // Keep away from left taskbar (80px)
  const maxX = Math.max(100, typeof window !== 'undefined' ? window.innerWidth - width : 1920 - width)
  const minY = 30
  const maxY = Math.max(30, typeof window !== 'undefined' ? window.innerHeight - height - 100 : 1080 - height - 100)
  
  return {
    x: minX + Math.random() * (maxX - minX),
    y: minY + Math.random() * (maxY - minY)
  }
}

const getCascadePosition = (index: number, width: number, height: number) => {
  // Responsive positioning based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  if (isMobile) {
    // Mobile: center windows horizontally, stack vertically with overlap
    const baseX = Math.max(10, (window.innerWidth - (width as any)) / 2)
    const baseY = 50 + index * 40 // More spacing on mobile
    return { x: baseX, y: baseY }
  }
  
  // Desktop: diagonal cascade, offset from left taskbar (80px)
  const baseX = 100
  const baseY = 20
  const cascadeX = 180
  const cascadeY = 35
  
  return {
    x: baseX + index * cascadeX,
    y: baseY + index * cascadeY,
  }
}

const getWindowSize = (id: WindowId) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  const desktopSizes: Record<WindowId, { width: number; height: number }> = {
    about:    { width: 594, height: 513 },
    skills:   { width: 594, height: 486 },
    projects: { width: 648, height: 540 },
    contact:  { width: 540, height: 513 },
    terminal: { width: 648, height: 459 },
  }
  
  const mobileSizes: Record<WindowId, { width: number; height: number }> = {
    about:    { width: 'calc(100vw - 20px)' as any, height: 400 },
    skills:   { width: 'calc(100vw - 20px)' as any, height: 380 },
    projects: { width: 'calc(100vw - 20px)' as any, height: 420 },
    contact:  { width: 'calc(100vw - 20px)' as any, height: 400 },
    terminal: { width: 'calc(100vw - 20px)' as any, height: 360 },
  }
  
  return isMobile ? mobileSizes[id] : desktopSizes[id]
}

const windowConfig: Record<WindowId, {
  title: string; icon: string;
}> = {
  about:    { title: 'About Me',    icon: '👤' },
  skills:   { title: 'Skills',      icon: '⚡' },
  projects: { title: 'Projects',    icon: '🗂️' },
  contact:  { title: 'Contact',     icon: '📬' },
  terminal: { title: 'Terminal',    icon: '💻' },
}

const desktopIcons: { id: WindowId; icon: string; label: string; bg: string }[] = [
  { id: 'about',    icon: '👤', label: 'About Me',  bg: 'linear-gradient(135deg,#1565c0,#2589e8)' },
  { id: 'skills',   icon: '⚡', label: 'Skills',    bg: 'linear-gradient(135deg,#0d47a1,#1976d2)' },
  { id: 'projects', icon: '🗂️', label: 'Projects',  bg: 'linear-gradient(135deg,#1976d2,#42a5f5)' },
  { id: 'contact',  icon: '📬', label: 'Contact',   bg: 'linear-gradient(135deg,#1e88e5,#4fa3f7)' },
  { id: 'terminal', icon: '💻', label: 'Terminal',  bg: 'linear-gradient(135deg,#051525,#0a2a50)' },
]

const windowComponents: Record<WindowId, React.ReactNode> = {
  about:    <AboutWindow />,
  skills:   <SkillsWindow />,
  projects: <ProjectsWindow />,
  contact:  <ContactWindow />,
  terminal: <TerminalWindow />,
}

export default function Desktop() {
  const [booted, setBooted] = useState(false)
  const [windows, setWindows] = useState<WindowState[]>(() => {
    const windowIds: WindowId[] = ['about', 'skills', 'projects', 'contact']
    return windowIds.map((id, index) => {
      const size = getWindowSize(id)
      return {
        id,
        zIndex: 10 + index,
        pos: getCascadePosition(index, size.width as number, size.height as number)
      }
    })
  })
  const [zCounter, setZCounter] = useState(14)

  const openWindow = useCallback((id: WindowId) => {
    setWindows(prev => {
      const exists = prev.find(w => w.id === id)
      if (exists) {
        setZCounter(z => z + 1)
        return prev.map(w => w.id === id ? { ...w, zIndex: zCounter + 1 } : w)
      }
      setZCounter(z => z + 1)
      const size = getWindowSize(id)
      const pos = generateRandomPosition(size.width as number, size.height as number)
      return [...prev, { id, pos, zIndex: zCounter + 1 }]
    })
  }, [zCounter])

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }, [])

  const focusWindow = useCallback((id: WindowId) => {
    setZCounter(z => z + 1)
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zCounter + 1 } : w))
  }, [zCounter])

  if (!booted) return <BootScreen onComplete={() => setBooted(true)} />

  // Mobile blocker screen
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#c8e0f8',
          fontFamily: 'var(--font-display)',
          maxWidth: '90%',
          padding: '20px'
        }}>
          <div style={{ fontSize: 80, marginBottom: 20, animation: 'pulse 2s infinite' }}>
            😴
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
            I'm too lazy to make this
          </h1>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, background: 'linear-gradient(135deg, #4fa3f7, #81c3f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            website mobile responsive
          </h2>
          <p style={{ fontSize: 14, color: '#a8c8e8', marginTop: 20, lineHeight: 1.6 }}>
            View this portfolio on a desktop or tablet for the full experience
          </p>
          <p style={{ fontSize: 12, color: '#6b8fb8', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
            Desktop optimal width: 1024px+
          </p>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      display: 'flex'
    }}>
      {/* Desktop Background */}
      <div className="desktop-bg" />

      {/* Subtle grid texture */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(21,101,192,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(21,101,192,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />

      {/* Desktop icons - HIDDEN */}
      <div style={{
        position: 'fixed',
        display: 'none',
      }}>
        {desktopIcons.map(ic => (
          <div
            key={ic.id}
            className="desktop-icon"
            onDoubleClick={() => openWindow(ic.id)}
            onClick={() => openWindow(ic.id)}
          >
            <div className="desktop-icon-img" style={{ background: ic.bg }}>
              {ic.icon}
            </div>
            <span className="desktop-icon-label">{ic.label}</span>
          </div>
        ))}
      </div>

      {/* Welcome text when no windows open */}
      {windows.length === 0 && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', zIndex: 2, pointerEvents: 'none',
          animation: 'fadeSlideIn 0.6s ease forwards',
        }}>
          <div style={{ fontSize: 64, marginBottom: 16, filter: 'drop-shadow(0 4px 16px rgba(21,101,192,0.3))' }}>
            ⬡
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 800,
            background: 'linear-gradient(135deg, #0d2340, #1565c0)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 10,
          }}>
            Hey, I'm Raveesh
          </h1>
          <p style={{ fontSize: 16, color: 'var(--os-text-muted)', fontWeight: 400 }}>
            Click any icon on the left to explore my portfolio
          </p>
          <p style={{ fontSize: 13, color: 'rgba(74,106,138,0.6)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
            Double-click to open · Drag to move · Click ✕ to close
          </p>
        </div>
      )}

      {/* Render open windows */}
      {windows.map(w => {
        const cfg = windowConfig[w.id]
        const size = getWindowSize(w.id)
        return (
          <OSWindow
            key={w.id}
            id={w.id}
            title={cfg.title}
            icon={cfg.icon}
            initialPosition={w.pos}
            initialSize={size}
            zIndex={w.zIndex}
            onFocus={() => focusWindow(w.id)}
            onClose={() => closeWindow(w.id)}
          >
            {windowComponents[w.id]}
          </OSWindow>
        )
      })}

      {/* Taskbar */}
      <Taskbar
        openWindows={windows.map(w => w.id)}
        activeWindow={windows.length > 0 ? windows.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id : null}
        onWindowClick={id => openWindow(id as WindowId)}
      />
    </div>
  )
}
