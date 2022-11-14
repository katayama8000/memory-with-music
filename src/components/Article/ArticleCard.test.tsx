import { render, screen } from '@testing-library/react';

import { ArticleCard, SkeletonCard } from './ArticleCard';

describe('rendering', () => {
  it('should render SongCard', () => {
    const ArticleMock = {
      id: 1,
      artist: 'katayama',
      image: 'https://twitter.com/',
      memory: 'honoka',
      song: 'your song',
    };
    render(
      <ArticleCard
        image={'https://'}
        id={ArticleMock.id}
        artist={ArticleMock.artist}
        song={ArticleMock.song}
        memory={ArticleMock.memory}
      />
    );
    expect(screen.getAllByAltText('katayama')).toBeTruthy();
    expect(screen.getByText('your song')).toBeTruthy;
    expect(screen.getByText('katayama')).toBeTruthy;
    expect(screen.getByText('honoka')).toBeTruthy;
    screen.debug(screen.getByText('your song'));
  });

  it('should render SkeletonCard', () => {
    render(<SkeletonCard />);
    screen.debug();
  });
});
