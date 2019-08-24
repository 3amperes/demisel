import React from 'react';
import { Link } from 'gatsby';

const titles = {
  model: 'Modèles',
  category: 'Catégories',
};

const Filters = ({ filters }) => {
  const keys = Object.keys(filters);
  return (
    <nav>
      <strong>Filtres :</strong>
      {keys.map((key, index) => {
        return (
          <div key={index}>
            <span>{titles[key]}</span>
            <ul>
              {filters[key].map(({ node: { id, title } }) => {
                return (
                  <li key={id}>
                    <Link to={`/shop?${key}=${id}`}>{title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
};

export default Filters;
