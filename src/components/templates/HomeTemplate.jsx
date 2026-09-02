import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../molecules/PageHeader';
import CategoryFilter from '../molecules/CategoryFilter';
import ThreadList from '../organisms/ThreadList';
import Button from '../atoms/Button';

function HomeTemplate({
  threads, categories, activeCategory, authUserId = null,
  onCategorySelect, onUpVote, onDownVote, onCreateThread,
}) {
  return (
    <section className="home-page">
      <PageHeader
        title="Diskusi Terbaru"
        description="Ikuti percakapan hangat dari komunitas Dicoding."
      />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelect={onCategorySelect}
      />
      <ThreadList
        threads={threads}
        authUserId={authUserId}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onCategoryClick={onCategorySelect}
      />
      <Button className="fab" ariaLabel="buat thread baru" onClick={onCreateThread}>
        +
      </Button>
    </section>
  );
}

HomeTemplate.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  authUserId: PropTypes.string,
  onCategorySelect: PropTypes.func.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onCreateThread: PropTypes.func.isRequired,
};

export default HomeTemplate;
