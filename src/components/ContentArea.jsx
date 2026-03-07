import { useParams, useNavigate } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { Sparkles, TerminalSquare, ArrowRight, ArrowLeft, BookOpen, MessageCircle, Lightbulb, ChevronRight } from 'lucide-react'

/* ────────── Sub-components for rich content ────────── */

function IntroBlock({ content }) {
    return (
        <div style={{
            padding: '24px 28px',
            background: 'var(--intro-bg)',
            borderRadius: 14,
            borderLeft: '4px solid var(--accent-primary)',
            marginBottom: 28,
            fontSize: '1.08rem',
            lineHeight: 1.85,
            color: 'var(--text-content-strong)',
        }}>
            {content}
        </div>
    )
}

function ConceptBlock({ section }) {
    return (
        <div style={{ marginBottom: 36 }}>
            <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: 14,
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 8
            }}>
                <ChevronRight size={18} style={{ opacity: 0.7 }} />
                {section.title}
            </h3>

            <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.85,
                color: 'var(--text-content)',
                marginBottom: section.image || section.highlight ? 18 : 0
            }}>
                {section.content}
            </p>

            {section.image && (
                <div style={{
                    margin: '20px 0',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid var(--img-border)',
                    background: 'var(--qa-bg)',
                }}>
                    <img
                        src={section.image}
                        alt={section.imageCaption || section.title}
                        style={{
                            width: '100%',
                            display: 'block',
                            maxHeight: 400,
                            objectFit: 'contain',
                            background: 'var(--img-bg)',
                        }}
                    />
                    {section.imageCaption && (
                        <div style={{
                            padding: '10px 16px',
                            fontSize: '0.88rem',
                            color: 'var(--text-muted)',
                            textAlign: 'center',
                            borderTop: '1px solid var(--img-caption-border)',
                            fontStyle: 'italic',
                        }}>
                            {section.imageCaption}
                        </div>
                    )}
                </div>
            )}

            {section.highlight && (
                <div style={{
                    padding: '16px 20px',
                    background: 'var(--highlight-secondary-bg)',
                    borderRadius: 10,
                    borderLeft: '3px solid var(--highlight-secondary-border)',
                    marginTop: 12,
                    fontSize: '0.98rem',
                    lineHeight: 1.75,
                    color: 'var(--text-content-strong)',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                }}>
                    <Lightbulb size={20} style={{ color: 'var(--highlight-secondary-border)', flexShrink: 0, marginTop: 3 }} />
                    <span>{section.highlight}</span>
                </div>
            )}
        </div>
    )
}

function FormulaCard({ section }) {
    return (
        <div className="glass" style={{ padding: 28, marginBottom: 28 }}>
            <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                marginBottom: 18,
                color: 'var(--accent-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
            }}>
                <BookOpen size={18} />
                {section.title}
            </h3>
            <div style={{ display: 'grid', gap: 12 }}>
                {section.items.map((item, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 12,
                        padding: '10px 14px',
                        background: 'var(--formula-item-bg)',
                        borderRadius: 8,
                        border: '1px solid var(--formula-item-border)',
                    }}>
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            minWidth: 150,
                            flexShrink: 0,
                        }}>{item.label}</span>
                        <code style={{
                            fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
                            fontSize: '0.95rem',
                            color: 'var(--code-color)',
                            letterSpacing: '0.02em',
                        }}>{item.formula}</code>
                    </div>
                ))}
            </div>
        </div>
    )
}

function QABlock({ qa }) {
    return (
        <div className="glass" style={{ padding: 36 }}>
            <h2 style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
            }}>
                <div style={{ padding: 8, background: 'var(--tag-required-bg)', borderRadius: 8 }}>
                    <MessageCircle size={22} style={{ color: 'var(--accent-secondary)' }} />
                </div>
                {'模拟面试提问 (Q&A)'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {qa.map((qaItem, idx) => (
                    <div key={idx} style={{
                        padding: '18px 20px',
                        background: 'var(--qa-bg)',
                        borderRadius: 10,
                        border: '1px solid var(--qa-border)',
                        transition: 'border-color 0.2s',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 10,
                        }}>
                            <p style={{
                                color: 'var(--accent-secondary)',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                flex: 1,
                            }}>{qaItem.q}</p>
                            {qaItem.tag && (
                                <span style={{
                                    fontSize: '0.72rem',
                                    padding: '3px 10px',
                                    borderRadius: 20,
                                    background: qaItem.tag === '必问题'
                                        ? 'var(--tag-required-bg)'
                                        : qaItem.tag === '高频考点'
                                            ? 'var(--tag-frequent-bg)'
                                            : 'var(--tag-bonus-bg)',
                                    color: qaItem.tag === '必问题'
                                        ? 'var(--tag-required-color)'
                                        : qaItem.tag === '高频考点'
                                            ? 'var(--tag-frequent-color)'
                                            : 'var(--tag-bonus-color)',
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap',
                                    border: `1px solid ${qaItem.tag === '必问题'
                                        ? 'var(--tag-required-border)'
                                        : qaItem.tag === '高频考点'
                                            ? 'var(--tag-frequent-border)'
                                            : 'var(--tag-bonus-border)'}`,
                                }}>{qaItem.tag}</span>
                            )}
                        </div>
                        <p style={{
                            color: 'var(--text-content)',
                            fontSize: '0.95rem',
                            lineHeight: 1.75,
                        }}>{qaItem.a}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ────────── Fallback for chapters without rich content ────────── */

function DefaultContent({ chapter }) {
    return (
        <>
            <div className="glass" style={{ padding: 36 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ padding: 8, background: 'var(--highlight-bg)', borderRadius: 8 }}>
                        <Sparkles className="text-accent" size={24} />
                    </div>
                    核心概念解读
                </h2>
                <div style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-content)' }}>
                    <p style={{ marginBottom: 20 }}>
                        {'在考研复试中，导师非常看重你对底层逻辑的理解。关于 '}
                        <strong>{chapter.title.split(' ').slice(1).join(' ')}</strong>
                        {'，不要背诵干瘪的公式，试着用直观的语言向面试官阐述：'}
                    </p>
                    <div style={{ padding: '20px 24px', background: 'var(--qa-bg)', borderRadius: 12, borderLeft: '4px solid var(--accent-primary)' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                            {'"' + chapter.desc + '"'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass" style={{ padding: 36 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 20 }}>{'模拟面试提问 (Q&A)'}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ padding: 16, background: 'var(--qa-bg)', borderRadius: 8, border: '1px solid var(--qa-border)' }}>
                        <p style={{ color: 'var(--accent-secondary)', fontWeight: 600, marginBottom: 8 }}>Q1: 能不能通俗地解释一下这个概念？</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>提示：结合实际生活中的例子，例如用找朋友或者下山来比喻算法行为。</p>
                    </div>
                    <div style={{ padding: 16, background: 'var(--qa-bg)', borderRadius: 8, border: '1px solid var(--qa-border)' }}>
                        <p style={{ color: 'var(--accent-secondary)', fontWeight: 600, marginBottom: 8 }}>Q2: 这个算法在实际工程或论文复现中会遇到什么坑？</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>提示：思考诸如过拟合、计算复杂度高、对离群点敏感等常见痛点。</p>
                    </div>
                </div>
            </div>
        </>
    )
}

/* ────────── Rich Content Renderer ────────── */

function RichContent({ chapter }) {
    return (
        <>
            <div className="glass" style={{ padding: 36 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ padding: 8, background: 'var(--highlight-bg)', borderRadius: 8 }}>
                        <Sparkles className="text-accent" size={24} />
                    </div>
                    核心概念解读
                </h2>

                {chapter.sections.map((section, idx) => {
                    switch (section.type) {
                        case 'intro':
                            return <IntroBlock key={idx} content={section.content} />
                        case 'concept':
                            return <ConceptBlock key={idx} section={section} />
                        case 'formula':
                            return <FormulaCard key={idx} section={section} />
                        default:
                            return null
                    }
                })}
            </div>

            <QABlock qa={chapter.qa} />
        </>
    )
}

/* ────────── Main Component ────────── */

export default function ContentArea() {
    const { id } = useParams()
    const navigate = useNavigate()

    const currentIndex = chapters.findIndex(c => c.id === id)
    const chapter = chapters[currentIndex]

    if (!chapter) {
        return (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2>Chapter not found</h2>
            </div>
        )
    }

    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null
    const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null
    const hasRichContent = chapter.sections && chapter.qa

    return (
        <main style={{ flex: 1, padding: '48px 64px', overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>

            {/* Decorative background blurs */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 400, height: 400, background: `radial-gradient(circle, var(--blur-1) 0%, transparent 70%)`, filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: 300, height: 300, background: `radial-gradient(circle, var(--blur-2) 0%, transparent 70%)`, filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />

            <div style={{ maxWidth: 850, width: '100%', margin: '0 auto', zIndex: 1 }}>

                {/* Header */}
                <header style={{ marginBottom: 48, animation: 'fadeInDown 0.5s ease-out' }}>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <TerminalSquare size={16} /> {chapter.category}
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 20, textShadow: 'var(--shadow-header)' }}>
                        {chapter.title}
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300 }}>
                        {chapter.desc}
                    </p>
                </header>

                {/* Content Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28, animation: 'fadeInUp 0.6s ease-out' }}>

                    {hasRichContent ? (
                        <RichContent chapter={chapter} />
                    ) : (
                        <DefaultContent chapter={chapter} />
                    )}

                    {/* Nav Buttons */}
                    <div style={{ marginTop: 32, marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {prevChapter ? (
                            <button onClick={() => navigate('/chapter/' + prevChapter.id)} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <ArrowLeft size={18} /> {'上一章: ' + prevChapter.title.slice(4)}
                            </button>
                        ) : <div />}

                        {nextChapter && (
                            <button onClick={() => navigate('/chapter/' + nextChapter.id)} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--highlight-bg)', borderColor: 'var(--accent-primary)', color: 'var(--text-main)' }}>
                                {'下一章: ' + nextChapter.title.slice(4)} <ArrowRight size={18} />
                            </button>
                        )}
                    </div>
                </div>

            </div>

            <style>{'@keyframes fadeInUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } } @keyframes fadeInDown { from { opacity:0; transform:translateY(-20px) } to { opacity:1; transform:translateY(0) } }'}</style>
        </main>
    )
}
