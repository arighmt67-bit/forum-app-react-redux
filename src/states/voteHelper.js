function applyVote(item, userId, voteType) {
  const upVotesBy = item.upVotesBy.filter((id) => id !== userId);
  const downVotesBy = item.downVotesBy.filter((id) => id !== userId);

  if (voteType === 'up-vote') {
    upVotesBy.push(userId);
  }

  if (voteType === 'down-vote') {
    downVotesBy.push(userId);
  }

  return { ...item, upVotesBy, downVotesBy };
}

function nextVoteType(item, userId, direction) {
  const isUpVoted = item.upVotesBy.includes(userId);
  const isDownVoted = item.downVotesBy.includes(userId);

  if (direction === 'up') {
    return isUpVoted ? 'neutral-vote' : 'up-vote';
  }

  return isDownVoted ? 'neutral-vote' : 'down-vote';
}

export { applyVote, nextVoteType };
