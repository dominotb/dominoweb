'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export default function TypewriterText({
  text,
  delay = 750,
  speed = 28,
  className = '',
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        currentIndex++
        setDisplayedText(text.slice(0, currentIndex))
        if (currentIndex >= text.length) {
          clearInterval(interval)
          setIsDone(true)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [text, delay, speed])

  return (
    <div className={`relative max-w-xl ${className}`}>
      {/* Invisible placeholder to lock container height & prevent layout shifts */}
      <p className="opacity-0 select-none pointer-events-none text-base leading-8 md:text-lg" aria-hidden="true">
        {text}
      </p>
      {/* Active typewriter text overlay */}
      <p className="absolute inset-0 text-base leading-8 text-slate-200 md:text-lg">
        {displayedText}
        <span
          className={`ml-1 inline-block h-[1.1em] w-0.5 bg-[#e2c9a0] align-middle transition-opacity duration-300 ${
            isDone ? 'opacity-0' : 'animate-pulse opacity-100'
          }`}
          aria-hidden="true"
        />
      </p>
    </div>
  )
}
