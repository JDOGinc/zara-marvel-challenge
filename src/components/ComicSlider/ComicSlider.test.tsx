import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ComicSlider from './ComicSlider'
import { vi } from 'vitest'
const mockComicsData = [
  {
    id: '123',
    title: 'Mock Comic 1',
    imageUrl: 'http://example.com/mockcomic1.jpg',
    year: '2024',
  },
  {
    id: '456',
    title: 'Mock Comic 2',
    imageUrl: 'http://example.com/mockcomic2.jpg',
    year: '2024',
  },
]

vi.mock('../../hooks/useFetchCharacters', () => ({
  __esModule: true,
  default: () => ({
    fetchComicsByCharacter: vi.fn(() => Promise.resolve(mockComicsData)),
  }),
}))

describe('ComicSlider Component', () => {
  it('renders comics returned by fetchComicsByCharacter', async () => {
    const setIsLoading = vi.fn()

    render(<ComicSlider id="12345" setIsLoading={setIsLoading} />)

    await waitFor(() => {
      mockComicsData.forEach(comic => {
        expect(screen.getByText(comic.title)).toBeInTheDocument()
      })
    })
  })
})
