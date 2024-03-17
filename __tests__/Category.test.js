import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Category from './../app/componets/Category';

describe('Category', () => {
  // Mock functions
  const mockAddCard = jest.fn();
  const mockUpdateCard = jest.fn();

  // Define sample data
  const categoryProps = {
    id: 1,
    title: 'Went Well',
    color: '#22c55e',
    cardsArray: [
      { id: 1, value: 'Card 1', likes: 2 },
      { id: 2, value: 'Card 2', likes: 5 },
    ],
    addCard: mockAddCard,
    updateCard: mockUpdateCard,
  };

  // Render Category component before each test
  let component;
  beforeEach(() => {
    component = render(<Category {...categoryProps} />);
  });

  it('renders Category component', () => {
    const { getByText } = component;
    expect(getByText('Went Well')).toBeInTheDocument();
  });

  it('renders cards correctly', () => {
    const { getByText } = component;
    expect(getByText('Card 1')).toBeInTheDocument();
    expect(getByText('Card 2')).toBeInTheDocument();
  });

  it('calls addCard function when "+" button is clicked', () => {
    const { getByText } = component;
    fireEvent.click(getByText('+'));
    expect(mockAddCard).toHaveBeenCalledWith(1);
  });

  it('calls updateCard function when card is liked', () => {
    const { getByText } = component;
    fireEvent.click(getByText('5'));
    expect(mockUpdateCard).toHaveBeenCalledWith({
      c_id: 1,
      id: 2,
      action: 'UPDATE_LIKE',
    });
  });

  it('calls updateCard function when card is edited and saved', () => {
    const { getByText, getByPlaceholderText } = component;
    fireEvent.click(getByText('Card 1'));
    const input = getByPlaceholderText('Enter text ...');
    fireEvent.change(input, { target: { value: 'Edited Card 1' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockUpdateCard).toHaveBeenCalledWith({
      c_id: 1,
      id: 1,
      action: 'UPDATE_VALUE',
      value: 'Edited Card 1',
    });
  });

  it('renders editing mode when clicking on card', () => {
    const { getByText, getByPlaceholderText } = component;
    fireEvent.click(getByText('Card 1'));
    expect(getByPlaceholderText('Enter text ...')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('calls updateCard function when card is moved to the left', () => {
    const { getByText } = component;
    fireEvent.click(getByText('◀'));
    expect(mockUpdateCard).toHaveBeenCalledWith({
      c_id: 1,
      id: 2,
      action: 'MOVE_LEFT',
    });
  });

  it('calls updateCard function when card is moved to the right', () => {
    const { getByText } = component;
    fireEvent.click(getByText('▶'));
    expect(mockUpdateCard).toHaveBeenCalledWith({
      c_id: 1,
      id: 1,
      action: 'MOVE_RIGHT',
    });
  });

});
