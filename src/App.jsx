import { useState, useCallback, useEffect, createContext, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ContentArea from './components/ContentArea'

// Theme context
export const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

function App() {
  // Theme state — default is light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light'
  })

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('app-theme', next)
      return next
    })
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Resizable sidebar
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('sidebar-width')
    return saved ? parseInt(saved, 10) : 300
  })
  const [isResizing, setIsResizing] = useState(false)

  const startResize = useCallback((e) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e) => {
      const newWidth = Math.min(Math.max(e.clientX, 220), 600)
      setSidebarWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      localStorage.setItem('sidebar-width', sidebarWidth.toString())
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing, sidebarWidth])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Sidebar width={sidebarWidth} />
      <div
        className={`resize-handle${isResizing ? ' active' : ''}`}
        onMouseDown={startResize}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/chapter/0.1" replace />} />
        <Route path="/chapter/:id" element={<ContentArea />} />
      </Routes>
    </ThemeContext.Provider>
  )
}

export default App
