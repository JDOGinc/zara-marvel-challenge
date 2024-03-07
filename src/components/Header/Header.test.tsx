import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../utils/test-utils'
import Header from './Header'

describe('Header component', () => {
  beforeEach(() => {
    render(<Header />)
  })

  test('renders the logo', () => {
    const logo = screen.getByAltText('Marvel logo')
    expect(logo).toBeInTheDocument()
  })

  test('renders the favorite container', () => {
    const favContainer = screen.getByTestId('fav-container')
    expect(favContainer).toBeInTheDocument()
  })

  test('renders the default heart icon', () => {
    const defaultIcon = screen.getByTestId('default-icon')
    expect(defaultIcon).toBeInTheDocument()
  })

  test('renders the number of favorite characters', () => {
    const favCharacters = screen.getByText('0')
    expect(favCharacters).toBeInTheDocument()
  })

  test('navigates to the home page when clicking on the logo', () => {
    const logo = screen.getByAltText('Marvel logo')
    fireEvent.click(logo)
    expect(window.location.pathname).toBe('/')
  })
})
