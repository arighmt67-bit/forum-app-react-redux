import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score, rank }) {
  return (
    <li className="leaderboard-item">
      <span className="leaderboard-item__rank">{rank}</span>
      <img src={user.avatar} alt={user.name} className="avatar avatar--small" />
      <span className="leaderboard-item__name">{user.name}</span>
      <span className="leaderboard-item__score">{score}</span>
    </li>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
