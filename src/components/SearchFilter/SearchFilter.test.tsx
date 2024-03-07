import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '../../utils/test-utils'
import SearchFilter from './SearchFilter'

describe('SearchFilter component', () => {
  beforeEach(() => {
    render(<SearchFilter />)
    screen.debug()
  })

  test('renders the search input', () => {
    const searchInput = screen.getByPlaceholderText('SEARCH CHARACTER...')
    expect(searchInput).toBeInTheDocument()
  })

  test('renders the items result count', () => {
    const itemsResult = screen.getByTestId('items-result')
    expect(itemsResult).toBeInTheDocument()
  })
})
