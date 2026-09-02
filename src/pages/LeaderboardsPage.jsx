import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboards-page">
      <h2>Klasemen Pengguna Aktif</h2>
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
    </section>
  );
}

export default LeaderboardsPage;
