'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'

// ═══════════════════════════════════════════
// DAILY STOIC QUOTES
// ═══════════════════════════════════════════

const STOIC_QUOTES: { text: string; author: string }[] = [
  { text: "You could leave life right now. Let that determine what you do and say and think.", author: "Marcus Aurelius" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "Progress is not achieved by luck or accident, but by working on yourself daily.", author: "Epictetus" },
  { text: "How long are you going to wait before you demand the best for yourself?", author: "Epictetus" },
  { text: "If you don't have a consistent goal in life, you can't live it in a consistent way.", author: "Marcus Aurelius" },
  { text: "The obstacle is the way.", author: "Marcus Aurelius" },
  { text: "No man is free who is not master of himself.", author: "Epictetus" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "He who fears death will never do anything worthy of a living man.", author: "Seneca" },
  { text: "Putting things off is the biggest waste of life.", author: "Seneca" },
  { text: "You have power over your mind — not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "We should discipline ourselves in small things, and from these progress to things of greater value.", author: "Epictetus" },
  { text: "Don't explain your philosophy. Embody it.", author: "Epictetus" },
  { text: "The best revenge is to not be like your enemy.", author: "Marcus Aurelius" },
  { text: "It is not that we have a short time to live, but that we waste a great deal of it.", author: "Seneca" },
  { text: "Be tolerant with others and strict with yourself.", author: "Marcus Aurelius" },
  { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus" },
  { text: "No great thing is created suddenly.", author: "Epictetus" },
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
  { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca" },
  { text: "He suffers more than necessary, who suffers before it is necessary.", author: "Seneca" },
  { text: "Difficulties strengthen the mind, as labor does the body.", author: "Seneca" },
  { text: "You must build up your life action by action.", author: "Marcus Aurelius" },
  { text: "It is not because things are difficult that we do not dare, it is because we do not dare that things are difficult.", author: "Seneca" },
  { text: "What we do now echoes in eternity.", author: "Marcus Aurelius" },
  { text: "Attach yourself to what is spiritually superior, regardless of what other people think or do.", author: "Epictetus" },
  { text: "The soul becomes dyed with the color of its thoughts.", author: "Marcus Aurelius" },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca" },
  { text: "If it is not right, do not do it. If it is not true, do not say it.", author: "Marcus Aurelius" },
  { text: "Man conquers the world by conquering himself.", author: "Zeno of Citium" },
  { text: "Curb your desire — don't set your heart on so many things and you will get what you need.", author: "Epictetus" },
  { text: "The key is to keep company only with people who uplift you, whose presence calls forth your best.", author: "Epictetus" },
  { text: "Stop drifting. Sprint to the finish.", author: "Marcus Aurelius" },
  { text: "Whoever is careless with the truth in small matters cannot be trusted with important matters.", author: "Seneca" },
  { text: "Learn to be indifferent to what makes no difference.", author: "Marcus Aurelius" },
  { text: "We must all suffer one of two things: the pain of discipline or the pain of regret.", author: "Jim Rohn" },
  { text: "Remember how long you've been putting this off. The time assigned to you is limited.", author: "Marcus Aurelius" },
  { text: "At dawn, when you have trouble getting out of bed, tell yourself: I have to go to work — as a human being.", author: "Marcus Aurelius" },
  { text: "The whole future lies in uncertainty: live immediately.", author: "Seneca" },
  { text: "Whatever can happen at any time can happen today.", author: "Seneca" },
  { text: "Make the mind tougher by exposing it to adversity.", author: "Seneca" },
  { text: "If you are pained by external things, it is not they that disturb you, but your own judgment of them.", author: "Marcus Aurelius" },
  { text: "Mastering others is strength. Mastering yourself is true power.", author: "Lao Tzu" },
  { text: "The things you think about determine the quality of your mind.", author: "Marcus Aurelius" },
  { text: "We should not, like sheep, follow the herd of creatures in front of us.", author: "Seneca" },
  { text: "When someone is properly grounded in life, they should not have to look outside themselves for approval.", author: "Epictetus" },
  { text: "To be calm is the highest achievement of the self.", author: "Zen Proverb" },
  { text: "The contest is now. You cannot wait any longer.", author: "Epictetus" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "If you are careless and lazy now, you will live and die as someone quite ordinary.", author: "Epictetus" },
  { text: "You will earn the respect of all if you begin by earning the respect of yourself.", author: "Musonius Rufus" },
  { text: "Receive without conceit, release without struggle.", author: "Marcus Aurelius" },
  { text: "True happiness is to enjoy the present, without anxious dependence upon the future.", author: "Seneca" },
  { text: "He who is brave is free.", author: "Seneca" },
  { text: "No person has the power to have everything they want, but it is in their power not to want what they don't have.", author: "Seneca" },
  { text: "The greatest obstacle to living is expectancy, which hangs upon tomorrow and loses today.", author: "Seneca" },
  { text: "Think of yourself as dead. Now take what's left and live it properly.", author: "Marcus Aurelius" },
  { text: "To accuse others for one's own misfortunes is a sign of want of education.", author: "Epictetus" },
  { text: "Never esteem anything as of advantage to you that will make you break your word or lose your self-respect.", author: "Marcus Aurelius" },
  { text: "It does not matter what you bear, but how you bear it.", author: "Seneca" },
]

function getDailyQuote() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  return STOIC_QUOTES[dayOfYear % STOIC_QUOTES.length]
}

// ═══════════════════════════════════════════
// PIXEL PIE DRAWING (RuneScape style)
// ═══════════════════════════════════════════

interface FallingPie {
  x: number
  y: number
  speed: number
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  variant: number
}

function drawPixelPie(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  opacity: number,
  variant: number
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.globalAlpha = opacity
  ctx.imageSmoothingEnabled = false

  const s = size / 12 // pixel scale

  // Pie colors based on variant
  const colors = [
    { crust: '#C8A600', fill: '#CC6600', top: '#FFD700', detail: '#8B4513' },
    { crust: '#B8860B', fill: '#FF8C00', top: '#FFAA33', detail: '#6B4423' },
    { crust: '#DAA520', fill: '#CD853F', top: '#FFE4B5', detail: '#8B7355' },
  ]
  const c = colors[variant % 3]

  // Crust (bottom oval)
  ctx.fillStyle = c.crust
  for (let px = -5; px <= 5; px++) {
    for (let py = -1; py <= 3; py++) {
      if (px * px + (py - 1) * (py - 1) * 2 < 30) {
        ctx.fillRect(px * s, py * s, s, s)
      }
    }
  }

  // Filling
  ctx.fillStyle = c.fill
  for (let px = -4; px <= 4; px++) {
    for (let py = -1; py <= 2; py++) {
      if (px * px + py * py * 2 < 20) {
        ctx.fillRect(px * s, py * s, s, s)
      }
    }
  }

  // Top crust / lattice
  ctx.fillStyle = c.top
  for (let px = -4; px <= 4; px++) {
    if (Math.abs(px) % 2 === 0) {
      ctx.fillRect(px * s, -1 * s, s, s)
    }
  }
  // Cross lattice
  ctx.fillStyle = c.crust
  ctx.fillRect(-2 * s, 0, s, s)
  ctx.fillRect(0, 0, s, s)
  ctx.fillRect(2 * s, 0, s, s)

  // Steam wisps (subtle)
  ctx.fillStyle = `rgba(255,255,255,${opacity * 0.4})`
  ctx.fillRect(-1 * s, -3 * s, s, s)
  ctx.fillRect(1 * s, -4 * s, s, s)
  ctx.fillRect(0, -5 * s, s, s)

  ctx.restore()
}

// ═══════════════════════════════════════════
// FALLING PIES CANVAS COMPONENT
// ═══════════════════════════════════════════

function FallingPiesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const piesRef = useRef<FallingPie[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize pies
    const count = Math.floor(window.innerWidth / 40)
    piesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      speed: 0.3 + Math.random() * 0.8,
      size: 16 + Math.random() * 24,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      opacity: 0.08 + Math.random() * 0.15,
      variant: Math.floor(Math.random() * 3),
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const pie of piesRef.current) {
        pie.y += pie.speed
        pie.rotation += pie.rotationSpeed

        if (pie.y > canvas.height + 40) {
          pie.y = -40
          pie.x = Math.random() * canvas.width
        }

        drawPixelPie(ctx, pie.x, pie.y, pie.size, pie.rotation, pie.opacity, pie.variant)
      }

      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return <canvas id="pie-canvas" ref={canvasRef} />
}

// ═══════════════════════════════════════════
// PIE DESTRUCTION EFFECT
// ═══════════════════════════════════════════

function PieDestruction({ name, onClose }: { name: string; onClose: () => void }) {
  const crumbs = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    tx: (Math.random() - 0.5) * 400,
    ty: (Math.random() - 0.5) * 400,
    color: ['#C8A600', '#CC6600', '#FFD700', '#8B4513', '#FF8C00'][i % 5],
    delay: Math.random() * 0.3,
  }))

  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="pie-destruction-overlay" onClick={onClose}>
      <div className="destruction-content">
        {crumbs.map((c) => (
          <span
            key={c.id}
            className="crumb"
            style={{
              backgroundColor: c.color,
              '--tx': `${c.tx}px`,
              '--ty': `${c.ty}px`,
              animationDelay: `${c.delay}s`,
            } as React.CSSProperties}
          />
        ))}
        <div className="destruction-pie">🥧</div>
        <div className="destruction-text">
          {name} EXECUTED!
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════
// COUNTDOWN TIMER COMPONENT
// ═══════════════════════════════════════════

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

interface DateRecord {
  current: string
  original: string
  pked?: boolean
}

function CountdownTimer({
  name,
  className,
  onExecuted,
  dateRecord,
  onDateChange,
  pkDeadline,
  onNuked,
}: {
  name: string
  className: string
  onExecuted: () => void
  dateRecord: DateRecord | null
  onDateChange: (project: string, date: string) => void
  pkDeadline: number
  onNuked: (name: string) => void
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [executed, setExecuted] = useState(false)
  const [bombTimeLeft, setBombTimeLeft] = useState<TimeLeft | null>(null)
  const hasTriggered = useRef(false)
  const hasNuked = useRef(false)

  const targetDate = dateRecord?.current || ''
  const originalDate = dateRecord?.original || ''
  const isPked = dateRecord?.pked === true

  // Determine trash talk status
  const getTrashTalk = (): { text: string; type: string } | null => {
    if (!targetDate || !originalDate) return null
    if (targetDate > originalDate) return { text: 'loser', type: 'loser' }
    if (targetDate < originalDate) return { text: 'j0e pl0x3d!', type: 'ploxed' }
    return null
  }

  const trashTalk = getTrashTalk()

  // Bomb countdown — ticks when no date is set
  useEffect(() => {
    if (targetDate || isPked || !pkDeadline) {
      setBombTimeLeft(null)
      return
    }

    const tick = () => {
      const diff = pkDeadline - Date.now()

      if (diff <= 0) {
        setBombTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 })
        if (!hasNuked.current) {
          hasNuked.current = true
          onNuked(name)
        }
        return
      }

      setBombTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        total: diff,
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate, isPked, pkDeadline, name, onNuked])

  // Countdown logic
  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null)
      setExecuted(false)
      hasTriggered.current = false
      return
    }

    const tick = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate + 'T23:59:59').getTime()
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 })
        if (!hasTriggered.current) {
          hasTriggered.current = true
          setExecuted(true)
          onExecuted()
        }
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        total: diff,
      })
      setExecuted(false)
      hasTriggered.current = false
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate, onExecuted])

  const isUrgent = timeLeft && timeLeft.total > 0 && timeLeft.days < 3

  const pad = (n: number) => n.toString().padStart(2, '0')

  // PK'd state — card is destroyed
  if (isPked) {
    return (
      <div className={`timer-card ${className} pked-card`}>
        <div className="pked-skull">💀</div>
        <div className="pked-name">{name}</div>
        <div className="pked-message">was pk&apos;d.</div>
        <div className="pked-lumbridge">Back to Lumbridge.</div>
      </div>
    )
  }

  return (
    <div className={`timer-card ${className}`}>
      <div className="project-name">{name}</div>
      <div className="project-label">Execution Date</div>

      {timeLeft ? (
        <div className="countdown-display">
          {[
            { val: timeLeft.days, label: 'Days' },
            { val: timeLeft.hours, label: 'Hrs' },
            { val: timeLeft.minutes, label: 'Min' },
            { val: timeLeft.seconds, label: 'Sec' },
          ].map((unit) => (
            <div className="time-unit" key={unit.label}>
              <div className={`time-value${isUrgent ? ' urgent' : ''}`}>
                {unit.label === 'Days' ? unit.val : pad(unit.val)}
              </div>
              <div className="time-label">{unit.label}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="countdown-display">
          {['Days', 'Hrs', 'Min', 'Sec'].map((label) => (
            <div className="time-unit" key={label}>
              <div className="time-value">--</div>
              <div className="time-label">{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Bomb countdown warning */}
      {bombTimeLeft && bombTimeLeft.total > 0 && !targetDate && (
        <div className="bomb-warning">
          <span className="bomb-icon">💣</span>
          <span className="bomb-text">
            SET A DATE OR GET PK&apos;D IN {bombTimeLeft.days}d {pad(bombTimeLeft.hours)}h {pad(bombTimeLeft.minutes)}m {pad(bombTimeLeft.seconds)}s
          </span>
        </div>
      )}

      <div className="date-input-wrapper">
        <label>Set Target Date</label>
        <input
          type="date"
          className="date-input"
          value={targetDate}
          onChange={(e) => onDateChange(name.toLowerCase(), e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {trashTalk && (
        <div className={`trash-talk ${trashTalk.type}`}>
          {trashTalk.type === 'loser' ? '👎 ' : '⚡ '}
          {trashTalk.text}
        </div>
      )}

      <div
        className={`status-msg ${
          executed ? 'executed' : timeLeft ? 'counting' : 'waiting'
        }`}
      >
        {executed
          ? '🥧 PIE EXECUTED 🥧'
          : timeLeft
          ? '⚔️ Counting down...'
          : '🎯 Set your execution date'}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════
// PASSWORD GATE
// ═══════════════════════════════════════════

const PASS_HASH = 'yewlongbow'

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = () => {
    if (input.toLowerCase().trim() === PASS_HASH) {
      localStorage.setItem('pie-exec-auth', 'true')
      onAuth()
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <>
      <FallingPiesCanvas />
      <div className="gate-container">
        <div className={`gate-box${shake ? ' gate-shake' : ''}`}>
          <div className="gate-icon">🥧</div>
          <h1 className="gate-title">The Pie Executioner</h1>
          <p className="gate-subtitle">This area is restricted, adventurer.</p>

          <div className="gate-input-group">
            <label className="gate-label">Enter the passcode:</label>
            <input
              ref={inputRef}
              type="password"
              className="gate-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="••••••••"
              spellCheck={false}
              autoComplete="off"
            />
            <button className="gate-btn" onClick={handleSubmit}>
              ⚔️ Enter
            </button>
          </div>

          {error && (
            <div className="gate-error">
              Wrong password. The pie rejects you.
            </div>
          )}

          <div className="gate-hint">Only the worthy may pass.</div>
        </div>
      </div>
    </>
  )
}

// ═══════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════
// DAILY STOIC SCROLL
// ═══════════════════════════════════════════

function DailyStoicScroll() {
  const [open, setOpen] = useState(false)
  const quote = useMemo(() => getDailyQuote(), [])

  return (
    <>
      <div
        className="stoic-scroll-icon"
        onClick={() => setOpen(true)}
        title="Daily wisdom"
      >
        📜
      </div>

      {open && (
        <div className="easter-overlay" onClick={() => setOpen(false)}>
          <div className="easter-modal stoic-modal">
            <div className="easter-modal-pie">📜</div>
            <blockquote className="stoic-modal-quote">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <cite className="stoic-modal-author">— {quote.author}</cite>
            <div className="easter-modal-dismiss">click anywhere to close</div>
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════

// ═══════════════════════════════════════════
// NUKE EXPLOSION
// ═══════════════════════════════════════════

function NukeExplosion({ name, onClose }: { name: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="nuke-overlay" onClick={onClose}>
      <div className="nuke-flash" />
      <div className="nuke-content">
        <div className="nuke-mushroom">☢️</div>
        <div className="nuke-skull">💀</div>
        <div className="nuke-name">{name}</div>
        <div className="nuke-message">was pk&apos;d.</div>
        <div className="nuke-lumbridge">Back to Lumbridge.</div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════

function MainApp() {
  const [destruction, setDestruction] = useState<string | null>(null)
  const [nuked, setNuked] = useState<string | null>(null)
  const [dates, setDates] = useState<{
    shenwow: DateRecord | null
    rhompa: DateRecord | null
    john: DateRecord | null
  }>({ shenwow: null, rhompa: null, john: null })
  const [pkDeadline, setPkDeadline] = useState<number>(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  // Fetch dates from API
  const fetchDates = useCallback(async () => {
    try {
      const res = await fetch('/api/dates')
      const data = await res.json()
      setDates({ shenwow: data.shenwow, rhompa: data.rhompa, john: data.john })
      if (data.pkDeadline) setPkDeadline(data.pkDeadline)
    } catch (e) {
      console.error('Failed to fetch dates:', e)
    }
  }, [])

  // Initial load + poll every 5 seconds so everyone stays in sync
  useEffect(() => {
    fetchDates()
    const interval = setInterval(fetchDates, 5000)
    return () => clearInterval(interval)
  }, [fetchDates])

  // Save date change to API
  const handleDateChange = useCallback(async (project: string, date: string) => {
    try {
      await fetch('/api/dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project, date }),
      })
      await fetchDates()
    } catch (e) {
      console.error('Failed to save date:', e)
    }
  }, [fetchDates])

  const handleExecuted = useCallback(
    (name: string) => {
      setDestruction(name)
    },
    []
  )

  return (
    <>
      <FallingPiesCanvas />
      <DailyStoicScroll />

      <div className="main-container">
        {/* Header */}
        <div className="header">
          <h1 className="title">
            <span className="pie-emoji">🥧</span> The Pie Executioner{' '}
            <span className="pie-emoji">🥧</span>
          </h1>
          <div className="subtitle">Execution is inevitable</div>
        </div>

        {/* High Alchemy GIF */}
        <div className="gif-container">
          <img
            src="/high-alchemy.gif"
            alt="High Level Alchemy"
            width={160}
            height={160}
          />
        </div>

        {/* Timer Grid */}
        <div className="timer-grid">
          <CountdownTimer
            name="SHENWOW"
            className="shenwow"
            onExecuted={() => handleExecuted('SHENWOW')}
            dateRecord={dates.shenwow}
            onDateChange={handleDateChange}
            pkDeadline={pkDeadline}
            onNuked={(n) => setNuked(n)}
          />
          <CountdownTimer
            name="RHOMPA"
            className="rhompa"
            onExecuted={() => handleExecuted('RHOMPA')}
            dateRecord={dates.rhompa}
            onDateChange={handleDateChange}
            pkDeadline={pkDeadline}
            onNuked={(n) => setNuked(n)}
          />
          <CountdownTimer
            name="JOHN"
            className="john"
            onExecuted={() => handleExecuted('JOHN')}
            dateRecord={dates.john}
            onDateChange={handleDateChange}
            pkDeadline={pkDeadline}
            onNuked={(n) => setNuked(n)}
          />
        </div>

        {/* Share Link Button (hidden for now) */}
        {/* <button className="share-btn" onClick={copyLink}>
          {copied ? '✅ Link copied!' : '🔗 Copy share link'}
        </button> */}

        {/* Easter Egg */}
        <div
          className="easter-pie"
          onClick={() => setShowEasterEgg(true)}
          title="Don't click me"
        >
          🥧
          <span className="easter-label">Don&apos;t click me</span>
        </div>

        {/* Footer */}
        <div className="footer">No pies were harmed... yet.</div>
      </div>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="easter-overlay" onClick={() => setShowEasterEgg(false)}>
          <div className="easter-modal">
            <div className="easter-modal-pie">🥧</div>
            <div className="easter-modal-text">
              &quot;you think your fucking father&apos;s someone cunt?&quot;
            </div>
            <div className="easter-modal-author">— Daniel J Hansen</div>
            <div className="easter-modal-dismiss">click anywhere to close</div>
          </div>
        </div>
      )}

      {/* Destruction Overlay */}
      {destruction && (
        <PieDestruction
          name={destruction}
          onClose={() => setDestruction(null)}
        />
      )}

      {/* Nuke Overlay */}
      {nuked && (
        <NukeExplosion
          name={nuked}
          onClose={() => { setNuked(null); fetchDates(); }}
        />
      )}
    </>
  )
}

// ═══════════════════════════════════════════
// ROOT EXPORT WITH AUTH CHECK
// ═══════════════════════════════════════════

export default function PieExecutioner() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('pie-exec-auth')
    if (saved === 'true') setAuthed(true)
    setChecking(false)
  }, [])

  if (checking) return null

  if (!authed) {
    return <PasswordGate onAuth={() => setAuthed(true)} />
  }

  return <MainApp />
}
