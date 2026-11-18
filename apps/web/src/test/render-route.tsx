import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { App } from '../app/app'

export const renderRoute = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
