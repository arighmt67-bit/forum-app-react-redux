/**
 * Test Scenario for Badge Atom Component:
 *
 * - should render as static span with hash prefix when onClick is not provided
 * - should render as clickable button and call onClick when clicked
 * - should apply active modifier class when active prop is true
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Badge from './Badge';

describe('Badge component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render as static span with hash prefix when onClick is not provided', () => {
    // arrange
    const { container } = render(<Badge label="react" />);

    // assert
    expect(container.textContent).toContain('#react');
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should render as clickable button and call onClick when clicked', async () => {
    // arrange
    const mockClick = vi.fn();
    render(<Badge label="redux" onClick={mockClick} />);
    const badgeButton = screen.getByRole('button');

    // act
    await userEvent.click(badgeButton);

    // assert
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should apply active modifier class when active prop is true', () => {
    // arrange
    render(<Badge label="testing" active onClick={() => {}} />);
    const badgeButton = screen.getByRole('button');

    // assert
    expect(badgeButton.className).toContain('badge--active');
  });
});
