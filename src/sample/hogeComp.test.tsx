import { render, screen } from '@testing-library/react';
import { HogeComp } from 'src/sample/hogeComp';

describe('Home', () => {
  it('renders a heading', () => {
    render(<HogeComp />);

    screen.debug(screen.getByRole('heading'));
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeTruthy();
    expect(screen.getAllByRole('button')[0]).toBeTruthy();
    expect(screen.getAllByRole('button')[1]).toBeTruthy();
    expect(screen.getByText('Udemy')).toBeTruthy();
    expect(screen.queryByText('Udemyyy')).toBeNull();
    expect(screen.getByTestId('copyright')).toBeTruthy();
  });
});
