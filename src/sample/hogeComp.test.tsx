import { render, screen } from '@testing-library/react';
import { HogeComp } from 'src/sample/hogeComp';

describe('Home', () => {
  it('renders a heading', () => {
    render(<HogeComp />);

    const heading1 = screen.getByRole('heading', {
      name: /This is h1/i,
    });

    const heading2 = screen.getByRole('heading', {
      name: /This is h2/i,
    });

    expect(heading1).toBeInTheDocument;
    expect(heading2).toBeInTheDocument;
  });
});
