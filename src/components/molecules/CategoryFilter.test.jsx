/**
 * Test Scenario for CategoryFilter Component:
 *
 * - should render nothing when categories list is empty
 * - should render one badge for each category
 * - should call onSelect with the category name when a badge is clicked
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render nothing when categories list is empty', () => {
    // arrange
    const { container } = render(
      <CategoryFilter categories={[]} activeCategory="" onSelect={() => {}} />,
    );

    // assert
    expect(container).toBeEmptyDOMElement();
  });

  it('should render one badge for each category', () => {
    // arrange
    render(
      <CategoryFilter
        categories={['react', 'redux', 'testing']}
        activeCategory=""
        onSelect={() => {}}
      />,
    );

    // assert
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('should call onSelect with the category name when a badge is clicked', async () => {
    // arrange
    const mockSelect = vi.fn();
    render(
      <CategoryFilter
        categories={['react', 'redux']}
        activeCategory=""
        onSelect={mockSelect}
      />,
    );
    const reduxBadge = screen.getByRole('button', { name: '#redux' });

    // act
    await userEvent.click(reduxBadge);

    // assert
    expect(mockSelect).toHaveBeenCalledWith('redux');
  });
});
