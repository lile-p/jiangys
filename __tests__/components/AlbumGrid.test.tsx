import { render, screen } from '@testing-library/react'
import AlbumGrid from '@/components/AlbumGrid'

const tracks = [
  { id: '1', title: 'Track 1', artist: 'Artist 1', cover: '/c1.jpg', src: '/s1.mp3' }
]

describe('AlbumGrid', () => {
  test('renders tracks', () => {
    render(<AlbumGrid tracks={tracks as any} />)
    expect(screen.getByText('Track 1')).toBeInTheDocument()
    expect(screen.getByText('Artist 1')).toBeInTheDocument()
  })
})
