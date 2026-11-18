import { useCallback, useEffect, useRef, useState } from 'react'

export const useHeaderMenus = () => {
  const [accessOpen, setAccessOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const accessRef = useRef<HTMLDivElement>(null)
  const accessButtonRef = useRef<HTMLButtonElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !accessRef.current?.contains(event.target)) {
        setAccessOpen(false)
      }
    }
    document.addEventListener('click', closeOnOutsideClick)
    return () => document.removeEventListener('click', closeOnOutsideClick)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (accessOpen) accessButtonRef.current?.focus()
      if (drawerOpen) burgerRef.current?.focus()
      setAccessOpen(false)
      setDrawerOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [accessOpen, drawerOpen])

  const toggleAccess = useCallback(() => setAccessOpen((open) => !open), [])
  const toggleDrawer = useCallback(() => setDrawerOpen((open) => !open), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return {
    accessOpen,
    drawerOpen,
    accessRef,
    accessButtonRef,
    burgerRef,
    toggleAccess,
    toggleDrawer,
    closeDrawer,
  }
}
