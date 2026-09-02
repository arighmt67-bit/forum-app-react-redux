import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import CategoryFilter from '../components/CategoryFilter';
import { asyncToggleVoteThread } from '../states/threads/action';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import { setCategoryFilterActionCreator } from '../states/categoryFilter/action';
import { nextVoteType } from '../states/voteHelper';

function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);
  const categoryFilter = useSelector((states) => states.categoryFilter);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = useMemo(() => threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId) || { name: 'Pengguna', avatar: '' },
  })), [threads, users]);

  const categories = useMemo(
    () => [...new Set(threads.map((thread) => thread.category))],
    [threads],
  );

  const filteredThreads = categoryFilter === ''
    ? threadList
    : threadList.filter((thread) => thread.category === categoryFilter);

  const onVote = (threadId, direction) => {
    if (authUser === null) {
      navigate('/login');
      return;
    }

    const thread = threads.find((item) => item.id === threadId);
    const voteType = nextVoteType(thread, authUser.id, direction);
    dispatch(asyncToggleVoteThread({ threadId, voteType }));
  };

  const onCategorySelect = (category) => {
    dispatch(setCategoryFilterActionCreator(categoryFilter === category ? '' : category));
  };

  return (
    <section className="home-page">
      <div className="home-page__header">
        <h1>Diskusi Terbaru</h1>
        <p>Ikuti percakapan hangat dari komunitas Dicoding.</p>
      </div>
      <CategoryFilter
        categories={categories}
        activeCategory={categoryFilter}
        onSelect={onCategorySelect}
      />
      <ThreadList
        threads={filteredThreads}
        authUserId={authUser ? authUser.id : null}
        onUpVote={(id) => onVote(id, 'up')}
        onDownVote={(id) => onVote(id, 'down')}
        onCategoryClick={onCategorySelect}
      />
      <button
        type="button"
        className="fab"
        aria-label="buat thread baru"
        onClick={() => navigate(authUser ? '/new' : '/login')}
      >
        +
      </button>
    </section>
  );
}

export default HomePage;
