import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
afterEach(() => {
  cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => <Router>{children}</Router>,
    ...options,
  })
}
export * from '@testing-library/react'

export { customRender as render }
