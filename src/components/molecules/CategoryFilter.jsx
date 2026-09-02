import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../atoms/Badge';

function CategoryFilter({ categories, activeCategory, onSelect }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="category-filter">
      <span className="category-filter__label">Kategori populer</span>
      <div className="category-filter__items">
        {categories.map((category) => (
          <Badge
            key={category}
            label={category}
            active={activeCategory === category}
            onClick={() => onSelect(category)}
          />
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
