import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export const ScrollManager = () => {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef('')

  useEffect(() => {
    const pathnameChanged = previousPathname.current !== pathname
    previousPathname.current = pathname
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      return
    }
    if (pathnameChanged) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
