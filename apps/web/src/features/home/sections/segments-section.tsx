import { Icon } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { trackPointer } from '../../../shared/ui/spotlight'
import { TextLink } from '../../../shared/ui/text-link'
import { SEGMENTS } from '../home-content'

export const SegmentsSection = () => (
  <section className="ms-section ms-seg-sec" id="solucoes">
    <div className="ms-wrap">
      <Reveal className="ms-intro">
        <p className="ms-eyebrow ms-eyebrow--light">Soluções por segmento</p>
        <h2 className="ms-h2">
          Feito para a <span className="ms-grad ms-grad--deep">sua operação</span>
        </h2>
        <p>Um sistema para cada rotina do setor, todos conversando entre si.</p>
      </Reveal>
      <div className="ms-bento">
        {SEGMENTS.map((segment, index) => (
          <Reveal
            className={`ms-bento__cell ms-bento__cell--${index + 1}`}
            delay={index * 90}
            key={segment.title}
          >
            <article className="ms-seg ms-spot" onPointerMove={trackPointer}>
              <span className="ms-seg__n" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="ms-seg__i">
                <Icon name={segment.icon} size={28} />
              </span>
              <h3 className="ms-h3">{segment.title}</h3>
              <p>{segment.text}</p>
              <ul className="ms-seg__topics">
                {segment.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <TextLink
                label="Saiba mais"
                href={segment.href}
                hiddenContext={`sobre ${segment.title}`}
              />
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
