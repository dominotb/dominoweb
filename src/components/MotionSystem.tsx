'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function setProgress(element: HTMLElement, property: string, progress: number) {
  element.style.setProperty(property, progress.toFixed(3))
}

export default function MotionSystem() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    // 1. Initialize Lenis Smooth Momentum Scroll Engine
    let lenis: Lenis | null = null
    let lenisRafId: number | null = null

    if (!reduceMotion.matches) {
      lenis = new Lenis({
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.5,
      })

      const raf = (time: number) => {
        lenis?.raf(time)
        lenisRafId = requestAnimationFrame(raf)
      }
      lenisRafId = requestAnimationFrame(raf)
    }

    // Shared IntersectionObserver for reveals and single-time count-up
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const target = entry.target as HTMLElement

        // Reveal transition
        if (target.hasAttribute('data-motion-reveal')) {
          target.classList.add('motion-visible')
        }

        // Count-up animation for numbers (run once)
        if (target.hasAttribute('data-motion-count')) {
          const rawTarget = target.getAttribute('data-motion-count') || ''
          const match = rawTarget.match(/(\d+(?:\.\d+)?)/)
          if (match && !reduceMotion.matches) {
            const rawNumStr = match[1]
            const numVal = parseInt(rawNumStr.replace(/\./g, ''), 10)
            const prefix = rawTarget.substring(0, rawTarget.indexOf(rawNumStr))
            const suffix = rawTarget.substring(rawTarget.indexOf(rawNumStr) + rawNumStr.length)

            let startTimestamp: number | null = null
            const duration = 1200

            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp
              const progress = Math.min((timestamp - startTimestamp) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = Math.floor(eased * numVal)

              const formatted = current >= 1000 ? current.toLocaleString('vi-VN') : current.toString()
              target.textContent = `${prefix}${formatted}${suffix}`

              if (progress < 1) {
                window.requestAnimationFrame(step)
              } else {
                target.textContent = rawTarget
              }
            }
            window.requestAnimationFrame(step)
          }
          // Stop observing so it counts ONLY ONCE
          observer.unobserve(target)
        }
      })
    }

    const revealObserver = new IntersectionObserver(observerCallback, {
      threshold: 0.02,
      rootMargin: '0px 0px 150px 0px',
    })

    const observeAllElements = () => {
      const viewportH = window.innerHeight
      document
        .querySelectorAll<HTMLElement>('[data-motion-reveal], [data-motion-count]')
        .forEach((element) => {
          if (!element.classList.contains('motion-visible')) {
            const rect = element.getBoundingClientRect()
            if (rect.top < viewportH + 100) {
              element.classList.add('motion-visible')
            } else {
              revealObserver.observe(element)
            }
          }
        })
    }

    observeAllElements()

    const mutationObserver = new MutationObserver(() => {
      observeAllElements()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    let lastScrollY = window.scrollY

    const updateScrollMetrics = (currentScrollY: number) => {
      const scrollY = currentScrollY
      const viewportHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight - viewportHeight

      // Header state & scroll direction
      const direction = scrollY > lastScrollY && scrollY > 40 ? 'down' : 'up'
      root.dataset.scrollDirection = direction
      root.dataset.scrolled = scrollY > 20 ? 'true' : 'false'
      lastScrollY = scrollY

      // Global scroll progress
      const pageProgress = docHeight > 0 ? clamp(scrollY / docHeight) : 0
      root.style.setProperty('--page-progress', pageProgress.toFixed(4))

      observeAllElements()

      if (!reduceMotion.matches) {
        // 1. Hero scroll progress (0 to 1 over hero height)
        const hero = document.querySelector<HTMLElement>('[data-motion-hero]')
        if (hero) {
          const rect = hero.getBoundingClientRect()
          const heroHeight = rect.height
          const progress = clamp(-rect.top / Math.max(heroHeight, 1))
          setProgress(hero, '--hero-progress', progress)
        }

        // 2. Section Image Parallax progress (-1 to 1)
        document.querySelectorAll<HTMLElement>('[data-motion-parallax]').forEach((element) => {
          const rect = element.getBoundingClientRect()
          const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height))
          setProgress(element, '--parallax-progress', progress * 2 - 1)
        })

        // 3. Line progress (0 to 1)
        document.querySelectorAll<HTMLElement>('[data-motion-line]').forEach((element) => {
          const rect = element.getBoundingClientRect()
          const progress = clamp((viewportHeight - rect.top) / (viewportHeight * 0.85))
          setProgress(element, '--line-progress', progress)
        })

        // 4. Sticky storytelling sections (--sticky-progress from 0 to 1)
        document.querySelectorAll<HTMLElement>('[data-motion-sticky]').forEach((element) => {
          const rect = element.getBoundingClientRect()
          const totalScrollable = rect.height - viewportHeight
          if (totalScrollable > 0) {
            const progress = clamp(-rect.top / totalScrollable)
            setProgress(element, '--sticky-progress', progress)
          }
        })

        // 5. Typography scroll drift
        document.querySelectorAll<HTMLElement>('[data-motion-drift]').forEach((element) => {
          const rect = element.getBoundingClientRect()
          const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height))
          setProgress(element, '--drift-progress', progress)
        })
      }
    }

    if (lenis) {
      lenis.on('scroll', (e: any) => updateScrollMetrics(e.scroll))
    } else {
      window.addEventListener('scroll', () => updateScrollMetrics(window.scrollY), { passive: true })
    }

    const handleResize = () => updateScrollMetrics(window.scrollY)
    window.addEventListener('resize', handleResize, { passive: true })
    updateScrollMetrics(window.scrollY)

    return () => {
      if (lenisRafId) cancelAnimationFrame(lenisRafId)
      window.removeEventListener('resize', handleResize)
      lenis?.destroy()
      revealObserver.disconnect()
    }
  }, [])

  return null
}
