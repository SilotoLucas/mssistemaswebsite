import { useEffect, useState } from 'react'

export const useActiveGroup = (slugs: readonly string[]): string => {
  const [active, setActive] = useState(slugs[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -65% 0px' },
    )
    for (const slug of slugs) {
      const section = document.getElementById(slug)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [slugs])

  return active
}
