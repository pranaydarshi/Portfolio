import { useState, useEffect } from 'react'

export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })

    return () => observers.forEach((o) => o?.disconnect())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return active
}
