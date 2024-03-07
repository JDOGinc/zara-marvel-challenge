import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '../../utils/test-utils'
import DetailsInfoCard from './DetailsInfoCard'

describe('DetailsInfoCard component', () => {
  const character = {
    id: 1,
    name: 'Iron Man',
    imageUrl: 'https://example.com/ironman.jpg',
    description: 'Genius, billionaire, playboy, philanthropist',
    isFavorite: false,
  }

  beforeEach(() => {
    render(<DetailsInfoCard character={character} />)
  })

  test('renders the character name', () => {
    const name = screen.getByText('Iron Man')
    expect(name).toBeInTheDocument()
  })
  test('renders the character image', () => {
    const image = screen.getByAltText('Iron Man')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/ironman.jpg')
  })

  test('renders the character description', () => {
    const description = screen.getByText(
      'Genius, billionaire, playboy, philanthropist',
    )
    expect(description).toBeInTheDocument()
  })

  test('renders the heart icon', () => {
    const heartIcon = screen.getByTestId('fav-button')
    expect(heartIcon).toBeInTheDocument()
  })
})
