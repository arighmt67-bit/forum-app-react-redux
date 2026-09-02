/**
 * Test Scenario for VoteButton Component:
 *
 * - should render vote count correctly
 * - should call onUpVote when upvote button clicked
 * - should call onDownVote when downvote button clicked
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from './VoteButton';

describe('VoteButton component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render vote count correctly', () => {
    // arrange
    render(
      <VoteButton
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={() => {}}
      />,
    );

    // assert
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should call onUpVote when upvote button clicked', async () => {
    // arrange
    const mockUpVote = vi.fn();
    render(
      <VoteButton
        upVotesBy={['user-1']}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={mockUpVote}
        onDownVote={() => {}}
      />,
    );
    const upVoteButton = screen.getByRole('button', { name: 'up vote' });

    // act
    await userEvent.click(upVoteButton);

    // assert
    expect(mockUpVote).toHaveBeenCalledTimes(1);
  });

  it('should call onDownVote when downvote button clicked', async () => {
    // arrange
    const mockDownVote = vi.fn();
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={['user-1']}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={mockDownVote}
      />,
    );
    const downVoteButton = screen.getByRole('button', { name: 'down vote' });

    // act
    await userEvent.click(downVoteButton);

    // assert
    expect(mockDownVote).toHaveBeenCalledTimes(1);
  });
});
