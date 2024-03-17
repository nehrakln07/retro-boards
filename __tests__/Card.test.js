import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './../app/componets/Card';

describe('Card', () => {
  // Mock function
  const mockUpdateCard = jest.fn();

  // Define sample data
  const cardProps = {
    cardId: 1,
    categoryId: 1,
    value: 'Sample Card',
    likes: 0,
    color: '#22c55e',
    updateCard: mockUpdateCard,
  };

  // Render Card component before each test
  let component;
  beforeEach(() => {
    component = render(<Card {...cardProps} />);
  });

  it('renders Card component', () => {
    const { getByText } = component;
    expect(getByText('Sample Card')).toBeInTheDocument();
  });

  it('calls updateCard function when like button is clicked', () => {
    const { getByText } = component;
    fireEvent.click(getByText('▲'));
    expect(mockUpdateCard).toHaveBeenCalledWith({
      c_id: 1,
      id: 1,
      action: 'UPDATE_LIKE',
    });
  });

  it('calls updateCard function when delete button is clicked', () => {
    const { getByTestId } = component;
    fireEvent.click(getByTestId('delete-button'));
    expect(mockUpdateCard).toHaveBeenCalledWith({
      c_id: 1,
      id: 1,
      action: 'DELETE',
    });
  });

  it('calls updateCard function when move left button is clicked', () => {
    const { getByText } = component;
    fireEvent.click(getByText('◀'));
    expect(mockUpdateCard).toHaveBeenCalledWith({
      c_id: 1,
      id: 1,
      action: 'MOVE_LEFT',
    });
  });

  it('calls updateCard function when move right button is clicked', () => {
    const { getByText } = component;
    fireEvent.click(getByText('▶'));
    expect(mockUpdateCard).toHaveBeenCalledWith({
      c_id: 1,
      id: 1,
      action: 'MOVE_RIGHT',
    });
  });

  it('enters editing mode when card content is clicked', () => {
    const { getByText, getByPlaceholderText } = component;
    fireEvent.click(getByText('Sample Card'));
    expect(getByPlaceholderText('Enter text ...')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('calls updateCard function with edited value when content is edited and saved', () => {
    const { getByText, getByPlaceholderText } = component;
    fireEvent.click(getByText('Sample Card'));
    const input = getByPlaceholderText('Enter text ...');
    fireEvent.change(input, { target: { value: 'Edited Card' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockUpdateCard).toHaveBeenCalledWith({
      c_id: 1,
      id: 1,
      action: 'UPDATE_VALUE',
      value: 'Edited Card',
    });
  });
});
