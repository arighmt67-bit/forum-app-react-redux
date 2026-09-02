import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardList from '../components/organisms/LeaderboardList';
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
      <LeaderboardList leaderboards={leaderboards} />
    </section>
  );
}

export default LeaderboardsPage;
