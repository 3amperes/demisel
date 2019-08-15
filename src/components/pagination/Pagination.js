import React from 'react';
import { Link } from 'gatsby';

const Pagination = ({ numPages, currentPage, contextPage }) => {
  if (numPages <= 1) {
    return null;
  }

  return (
    <ul>
      {Array.from({ length: numPages }).map((item, i) => {
        const index = i + 1;

        const baseLink = `/shop/${contextPage ? `${contextPage}/` : ''}`;
        const link = index === 1 ? baseLink : `${baseLink}/${index}`;
        const isCurrent = () => currentPage === index;

        return (
          <li key={link}>
            {isCurrent() ? (
              <span>page {index}</span>
            ) : (
              <Link to={link}>page {index}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
