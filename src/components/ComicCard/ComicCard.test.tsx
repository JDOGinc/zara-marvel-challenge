import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComicCard from './ComicCard'

const mockComic = {
  id: 1,
  imageUrl: 'https://example.com/comic.jpg',
  title: 'Example Comic',
  year: '2022',
}
describe('ComicCard component', () => {
  it('renders the comic image', () => {
    render(<ComicCard {...mockComic} />)
    const comicImage = screen.getByAltText('comic image: Example Comic')
    expect(comicImage).toBeInTheDocument()
    expect(comicImage).toHaveAttribute('src', mockComic.imageUrl)
  })

  it('renders the comic title', () => {
    render(<ComicCard {...mockComic} />)
    const comicTitle = screen.getByText(mockComic.title)
    expect(comicTitle).toBeInTheDocument()
  })

  it('renders the comic year', () => {
    render(<ComicCard {...mockComic} />)
    const comicYear = screen.getByText(mockComic.year)
    expect(comicYear).toBeInTheDocument()
  })
})
