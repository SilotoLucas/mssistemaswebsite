import type { CSSProperties, ReactNode } from 'react'
import './carousel.css'
import { SlideNav } from './slide-nav'
import { useCarousel } from './use-carousel'

export type CarouselSlide = {
  readonly key: string
  readonly label: string
  readonly content: ReactNode
}

type CarouselProps = {
  readonly label: string
  readonly slides: readonly CarouselSlide[]
  readonly className?: string
  readonly barClassName?: string
  readonly intervalMs?: number
}

const DEFAULT_INTERVAL_MS = 6000

export const Carousel = ({
  label,
  slides,
  className = '',
  barClassName = '',
  intervalMs = DEFAULT_INTERVAL_MS,
}: CarouselProps) => {
  const carousel = useCarousel(slides.length, intervalMs)

  return (
    <section
      className={`ms-car ${carousel.held ? 'is-held' : ''} ${className}`}
      style={{ '--car-interval': `${intervalMs}ms` } as CSSProperties}
      aria-roledescription="carrossel"
      aria-label={label}
      ref={carousel.rootRef}
    >
      <div className="ms-car__track" aria-live="off">
        {slides.map((slide, index) => (
          <article
            className={`ms-car__slide${index === carousel.index ? ' is-on' : ''}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${slides.length}: ${slide.label}`}
            aria-hidden={index !== carousel.index}
            inert={index !== carousel.index}
            key={slide.key}
          >
            {slide.content}
          </article>
        ))}
      </div>
      <div className="ms-car__bar">
        <div className={`ms-car__in ${barClassName}`} aria-hidden="true">
          {slides.map((slide, index) => (
            <span
              className={`ms-car__line${index === carousel.index ? ' is-on' : ''}`}
              key={slide.key}
            >
              <span className="ms-car__fill" />
            </span>
          ))}
        </div>
        {slides.length > 1 ? <SlideNav onMove={carousel.go} /> : null}
      </div>
    </section>
  )
}
