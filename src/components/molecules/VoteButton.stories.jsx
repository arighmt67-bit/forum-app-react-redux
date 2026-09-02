import VoteButton from './VoteButton';

const meta = {
  title: 'Molecules/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
  argTypes: {
    onUpVote: { action: 'onUpVote clicked' },
    onDownVote: { action: 'onDownVote clicked' },
  },
};

export default meta;

export const Default = {
  args: {
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: ['user-3'],
    authUserId: 'user-1',
    onUpVote: () => {},
    onDownVote: () => {},
  },
};

export const DownVoted = {
  args: {
    upVotesBy: ['user-2'],
    downVotesBy: ['user-1'],
    authUserId: 'user-1',
    onUpVote: () => {},
    onDownVote: () => {},
  },
};

export const Neutral = {
  args: {
    upVotesBy: ['user-2'],
    downVotesBy: ['user-3'],
    authUserId: 'user-1',
    onUpVote: () => {},
    onDownVote: () => {},
  },
};
