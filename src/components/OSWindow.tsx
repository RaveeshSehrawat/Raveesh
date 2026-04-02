'use client'
import { useRef, useState, useEffect, ReactNode } from 'react'

interface WindowProps {
  id: string
  title: string
  icon: string
  children: ReactNode
  initialPosition: { x: number; y: number }
  initialSize: { width: number; height: number }
  zIndex: number
  onFocus: () => void
  onClose: () => void
}

export default function OSWindow({
  title, icon, children, initialPosition, initialSize, zIndex, onFocus, onClose
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(initialPosition)
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return // Disable dragging on mobile
    onFocus()
    setDragging(true)
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    e.preventDefault()
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => {
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 200,  e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.current.y)),
      })
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [dragging])

  return (
    <div
      ref={windowRef}
      className="os-window animate-fade-in"
      style={{
        position: isMobile ? 'relative' : 'fixed',
        left: isMobile ? 'auto' : pos.x,
        top: isMobile ? 'auto' : pos.y,
        width: initialSize.width,
        height: initialSize.height,
        zIndex,
        cursor: dragging ? 'grabbing' : 'default',
        margin: isMobile ? '10px auto 10px auto' : 0,
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div className="os-titlebar" onMouseDown={handleMouseDown} style={{ cursor: dragging ? 'grabbing' : 'grab' }}>
        <div className="os-titlebar-dots">
          <div className="os-dot os-dot-close" onClick={(e) => { e.stopPropagation(); onClose() }} style={{ cursor: 'pointer' }} />
          <div className="os-dot os-dot-min" />
          <div className="os-dot os-dot-max" />
        </div>
        <div className="os-titlebar-title">{icon} {title}</div>
      </div>

      {/* Content */}
      <div className="window-content" style={{ height: 'calc(100% - 42px)', overflowY: 'auto', padding: 0 }}>
        {children}
      </div>
    </div>
  )
}
