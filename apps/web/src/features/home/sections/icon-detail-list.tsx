import { Icon, type IconName } from '../../../shared/ui/icon'

export type IconDetail = {
  readonly icon: IconName
  readonly title: string
  readonly text: string
}

type IconDetailListProps = {
  readonly items: readonly IconDetail[]
  readonly listClassName: string
  readonly itemClassName: string
}

export const IconDetailList = ({ items, listClassName, itemClassName }: IconDetailListProps) => (
  <div className={listClassName}>
    {items.map((item) => (
      <div className={itemClassName} key={item.title}>
        <Icon name={item.icon} size={26} />
        <h3 className="ms-h3">{item.title}</h3>
        <p>{item.text}</p>
      </div>
    ))}
  </div>
)
