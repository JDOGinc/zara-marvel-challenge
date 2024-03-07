import { describe, test, expect } from 'vitest'
import { render, screen } from '../../utils/test-utils'
import HeartIcon from './HeartIcon'

describe('HeartIcon component', () => {
  test('renders default heart icon when isDefault is true', () => {
    render(<HeartIcon isDefault={true} />)
    const defaultIcon = screen.getByTestId('default-icon')
    expect(defaultIcon).toBeInTheDocument()
  })

  test('renders unselected heart icon when isDefault is false', () => {
    render(<HeartIcon isDefault={false} />)
    const unselectedIcon = screen.getByTestId('unselected-icon')
    expect(unselectedIcon).toBeInTheDocument()
  })
})
