import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilter({ categories, activeCategory, onSelect }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="category-filter">
      <span className="category-filter__label">Kategori populer</span>
      <div className="category-filter__items">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`badge ${activeCategory === category ? 'badge--active' : ''}`}
            onClick={() => onSelect(category)}
          >
            #
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryFilter;
