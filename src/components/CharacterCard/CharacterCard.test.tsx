import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '../../utils/test-utils'
import CharacterCard from './CharacterCard'
import { Character } from '../../types/character'

describe('CharacterCard component', () => {
  const character: Character = {
    id: 1,
    name: 'Iron Man',
    imageUrl: 'https://example.com/ironman.jpg',
    isFavorite: false,
    description: 'Este es Iron Man.',
  }
  beforeEach(() => {
    render(<CharacterCard character={character} />)
  })

  test('renders the character name', () => {
    const characterName = screen.getByText('Iron Man')
    expect(characterName).toBeInTheDocument()
  })

  test('renders the character image', () => {
    const characterImage = screen.getByAltText('Iron Man')
    expect(characterImage).toBeInTheDocument()
    expect(characterImage).toHaveAttribute(
      'src',
      'https://example.com/ironman.jpg',
    )
  })
})
