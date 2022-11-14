import { render, screen } from '@testing-library/react';

import { ArticleCard, SkeletonCard } from './ArticleCard';

describe('rendering', () => {
  it('should render SongCard', () => {
    render(<ArticleCard image={'https://'} id={0} artist={'katayama'} song={'your song'} memory={'honoka'} />);
    //screen.debug();
    expect(screen.getAllByAltText('katayama')).toBeTruthy();
    expect(screen.getByText('your song')).toBeTruthy;
    screen.debug(screen.getByText('your song'));
  });

  it('should render SkeletonCard', () => {
    render(<SkeletonCard />);
    screen.debug();
  });
});
