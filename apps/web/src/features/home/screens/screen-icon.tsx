import type { ReactNode } from 'react'

const SCREEN_ICON_PATHS = {
  person: (
    <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-3.6 0-8.5 1.8-8.5 5.2V21h17v-1.8c0-3.4-4.9-5.2-8.5-5.2Z" />
  ),
  group: (
    <path d="M8 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8.5 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 13.5c-2.9 0-6.5 1.4-6.5 4.2V20h13v-2.3c0-2.8-3.6-4.2-6.5-4.2Zm8.5.5c-.5 0-1 0-1.5.1 1.1.9 1.5 2.1 1.5 3.6V20h6v-2.2c0-2.5-3.3-3.8-6-3.8Z" />
  ),
  money: (
    <path
      fillRule="evenodd"
      d="M2 6h20v12H2V6Zm10 9.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5 8.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm14 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
    />
  ),
  basket: (
    <path d="m7.6 9.5 3.5-6.2 1.7 1-2.9 5.2h4.2l-2.9-5.2 1.7-1 3.5 6.2H22V12h-1.3l-1.5 8.5H4.8L3.3 12H2V9.5h5.6Zm.9 4.5v4.5h2V14h-2Zm5 0v4.5h2V14h-2Z" />
  ),
  paw: (
    <path d="M12 11c-3 0-6 3.4-6 6.3 0 1.7 1.3 2.7 2.8 2.7 1.2 0 2-.6 3.2-.6s2 .6 3.2.6c1.5 0 2.8-1 2.8-2.7C18 14.4 15 11 12 11ZM5 11.5a2.2 2.7 0 1 0 0-5.4 2.2 2.7 0 0 0 0 5.4Zm14 0a2.2 2.7 0 1 0 0-5.4 2.2 2.7 0 0 0 0 5.4ZM9.3 8.5a2.3 2.9 0 1 0 0-5.8 2.3 2.9 0 0 0 0 5.8Zm5.4 0a2.3 2.9 0 1 0 0-5.8 2.3 2.9 0 0 0 0 5.8Z" />
  ),
  shield: (
    <path
      fillRule="evenodd"
      d="m12 2 8 3v6.2c0 5-3.4 9.3-8 10.8-4.6-1.5-8-5.8-8-10.8V5l8-3Zm-1.2 5v3.3H7.5v2.4h3.3V16h2.4v-3.3h3.3v-2.4h-3.3V7h-2.4Z"
    />
  ),
  wallet: (
    <path
      fillRule="evenodd"
      d="M4 5h15v3h2v12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 3h13V7H4v1Zm13 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
    />
  ),
  card: (
    <path
      fillRule="evenodd"
      d="M2 5h20v14H2V5Zm6.5 7a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm-4 4.5h8c0-2-1.8-3.2-4-3.2s-4 1.2-4 3.2ZM14.5 9v1.8h5V9h-5Zm0 4v1.8h5V13h-5Z"
    />
  ),
  nav: <path d="M21.5 2.5 2.5 10.3l7.7 3.5 3.5 7.7 7.8-19Z" />,
  heart: <path d="M12 21.3S3 15.7 3 9.3A5 5 0 0 1 12 6.3a5 5 0 0 1 9 3c0 6.4-9 12-9 12Z" />,
  deal: (
    <path
      fillRule="evenodd"
      d="M4 3h16v18h-6v-4h-4v4H4V3Zm3.5 3v2.5H10V6H7.5Zm6.5 0v2.5h2.5V6H14Zm-6.5 5v2.5H10V11H7.5Zm6.5 0v2.5h2.5V11H14Z"
    />
  ),
  bell: (
    <path d="M12 22a2.5 2.5 0 0 0 2.4-2H9.6A2.5 2.5 0 0 0 12 22Zm7-6v-5a7 7 0 0 0-5.5-6.8V3.5a1.5 1.5 0 0 0-3 0v.7A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z" />
  ),
  calendar: (
    <path fillRule="evenodd" d="M7 2h2v2h6V2h2v2h4v17H3V4h4V2Zm-2 8v9h14v-9H5Zm2 2h3v3H7v-3Z" />
  ),
  chat: (
    <path
      fillRule="evenodd"
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2ZM8.7 7c-.5 0-1.7.9-1.7 2.7 0 3.3 4 7.3 7.3 7.3 1.8 0 2.7-1.2 2.7-1.7v-1l-2.6-1.3-1.2 1.2c-1.4-.5-2.9-2-3.4-3.4l1.2-1.2L9.7 7h-1Z"
    />
  ),
} satisfies Record<string, ReactNode>

export type ScreenIconName = keyof typeof SCREEN_ICON_PATHS

export const ScreenIcon = ({ name }: { readonly name: ScreenIconName }) => (
  <svg className="ms-ui__i" viewBox="0 0 24 24" aria-hidden="true">
    {SCREEN_ICON_PATHS[name]}
  </svg>
)
