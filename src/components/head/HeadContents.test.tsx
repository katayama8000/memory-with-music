import { render, screen } from '@testing-library/react';

import { HeadContents } from './HeadContents';

describe('rendering', () => {
  it('should render SongCard', () => {
    render(<HeadContents />);
    screen.debug();
  });
});
