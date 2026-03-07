import { NavLink } from 'react-router-dom'
import { getCategoryData } from '../data/chapters'
import { BookOpen, ChevronRight, BrainCircuit, Sun, Moon } from 'lucide-react'
import { useTheme } from '../App'

export default function Sidebar({ width }) {
    const categories = getCategoryData()
    const { theme, toggleTheme } = useTheme()

    return (
        <aside className="glass-panel" style={{ width: width, flexShrink: 0, display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 0' }}>
            <div style={{ padding: '0 24px', marginBottom: 24 }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                    <BrainCircuit className="text-accent icon-glow" size={28} />
                    <span className="text-accent">AI Interview Prep</span>
                </h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.4 }}>
                    ML / DL 考研复试知识体系
                </p>
            </div>

            {/* Theme Toggle */}
            <div style={{ padding: '0 16px', marginBottom: 20 }}>
                <button className="theme-toggle" onClick={toggleTheme} style={{ width: '100%', justifyContent: 'center' }}>
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    {theme === 'dark' ? '切换亮色主题' : '切换暗色主题'}
                </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
                {categories.map(function (cat, idx) {
                    return (
                        <div key={idx} style={{ marginBottom: 28 }}>
                            <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 12, paddingLeft: 8, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                                <BookOpen size={14} /> {cat.title}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {cat.items.map(function (chapter) {
                                    return (
                                        <NavLink
                                            key={chapter.id}
                                            to={'/chapter/' + chapter.id}
                                            style={function (props) {
                                                var isActive = props.isActive
                                                return {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '8px 12px',
                                                    borderRadius: 8,
                                                    textDecoration: 'none',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.2s',
                                                    color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                                                    background: isActive ? 'var(--nav-active-bg)' : 'transparent',
                                                    boxShadow: isActive ? 'var(--nav-active-shadow)' : 'none',
                                                    fontWeight: isActive ? 600 : 400,
                                                }
                                            }}
                                        >
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {chapter.title}
                                            </span>
                                            <ChevronRight size={14} style={{ opacity: 0.3, transition: 'all 0.2s', flexShrink: 0 }} />
                                        </NavLink>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </aside>
    )
}
