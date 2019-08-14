import React from 'react';

const Pagination = ({ numPages, currentPage, contextPage }) => {
  if (numPages <= 1) {
    return null;
  }

  return (
    <ul>
      {Array.from({ length: numPages }).map((item, i) => {
        const index = i + 1;

        const baseLink = `/shop/${contextPage ? `${contextPage}/` : ''}`;
        const link = index === 1 ? baseLink : `${baseLink}page/${index}`;
        const isCurrent = () => currentPage === index;

        return (
          <li key={link}>
            {isCurrent() ? <span>{index}</span> : <a href={link}>{index}</a>}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
