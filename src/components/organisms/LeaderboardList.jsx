import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from '../molecules/LeaderboardItem';
import EmptyState from '../atoms/EmptyState';

const leaderboardShape = PropTypes.shape({
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
});

function LeaderboardList({ leaderboards }) {
  if (leaderboards.length === 0) {
    return <EmptyState message="Klasemen belum tersedia." />;
  }

  return (
    <ol className="leaderboard-list">
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          user={leaderboard.user}
          score={leaderboard.score}
          rank={index + 1}
        />
      ))}
    </ol>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(leaderboardShape).isRequired,
};

export default LeaderboardList;
