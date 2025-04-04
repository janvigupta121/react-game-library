

import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

const Sidebar = ({ onFilter, activeFilter }) => {

  const filterOptions = [
    { 
      id: 'category', 
      label: 'Categories',
      items: ['Action', 'Adventure', 'Sports', 'Strategy']
    },
    { 
      id: 'tags', 
      label: 'Tags',
      items: ['Singleplayer', 'Multiplayer', 'Open World', 'Horror', 'Sci-Fi']
    },
    { 
      id: 'year', 
      label: 'Release Year',
      items: ['2023', '2022', '2021', '2020', '2019']
    },
    { 
      id: 'popularity', 
      label: 'Popularity',
      items: ['Most Popular', 'Top Rated', 'Trending']
    }
  ];

  const handleFilterClick = (filterType, item) => {
    console.log(`Filter selected: ${filterType} - ${item}`);
    onFilter({ type: filterType, value: item });
  };

  return (
    <div className="sidebar-container">
      {filterOptions.map((option) => (
        <div key={option.id} className="sidebar-section">
          <div className="sidebar-title">{option.label}</div>
          <div className="sidebar-items">
            {option.items.map(item => (
              <div
                key={item}
                onClick={() => handleFilterClick(option.id, item)}
                className={`sidebar-item ${
                  activeFilter.type === option.id && activeFilter.value === item ? 'active' : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  onFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.object.isRequired
};

export default Sidebar;
