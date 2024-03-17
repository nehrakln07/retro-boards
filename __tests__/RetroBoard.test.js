import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RetroBoard from '../app/componets/RetroBoard';

describe('RetroBoard', () => {
  it('renders RetroBoard component', () => {
    const { getByText } = render(<RetroBoard />);
    expect(getByText('Went Well')).toBeInTheDocument();
    expect(getByText('To Improve')).toBeInTheDocument();
    expect(getByText('Action Items')).toBeInTheDocument();
  });
});
