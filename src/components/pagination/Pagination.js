import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

const Pagination = props => {
  const { currentPage, countPages } = props.paginationData;
  const isFirst = currentPage === 1 || !currentPage;
  const isLast = currentPage === countPages;
  const prevPage =
    props.pathPrefix + '/' + (currentPage - 1 > 1 ? currentPage - 1 : '');
  const nextPage = props.pathPrefix + '/' + (currentPage + 1);
  const verticalAlignment = { paddingTop: '0.25em' };

  const visiblePageNumbers = selectRelevantPageLinks(currentPage, countPages);

  return (
    <React.Fragment>
      <div className="pagination">
        {/* "Prev" arrow */}
        {!isFirst && (
          <Link to={prevPage} rel="prev" style={verticalAlignment}>
            <span className="prev-arrow">prev</span>
          </Link>
        )}

        {/* Numbered page links. */}
        {countPages > 1 && (
          <React.Fragment>
            {visiblePageNumbers.map(num => {
              if (isNaN(num)) {
                return <span key={`dots-${num}`}>.....</span>;
              }
              return (
                <span className="pagination-numbers" key={`page-${num}`}>
                  <Link
                    to={props.pathPrefix + `/${num === 1 ? '' : num}`}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      color: num === currentPage ? '#ffffff' : '#555',
                      background: num === currentPage ? '#eee' : '',
                      lineHeight: '30px',
                      verticalAlign: 'middle',
                    }}
                    className="pagination-numbers"
                  >
                    {num}
                  </Link>
                </span>
              );
            })}
          </React.Fragment>
        )}

        {/* "Next" arrow */}
        {!isLast && (
          <Link to={nextPage} rel="next" style={verticalAlignment}>
            <span className="next-arrow">next</span>
          </Link>
        )}
      </div>
    </React.Fragment>
  );
};

function selectRelevantPageLinks(currentPage, countPages) {
  var visiblePageNumbers = [];
  if (countPages <= 10) {
    /* If there are not too much, show everything. */
    for (let i = 1; i <= countPages; i++) {
      visiblePageNumbers.push(i);
    }
  } else {
    /* Always show beginning, end, current, and around current. */
    if (currentPage <= 5) {
      /* If beginning and current are not too far, we don't want to "dot dot" between them. */
      for (let i = 1; i < currentPage; i++) {
        visiblePageNumbers.push(i);
      }
    } else {
      visiblePageNumbers.push(1);
      visiblePageNumbers.push('dots-left-half');
      visiblePageNumbers.push(currentPage - 2);
      visiblePageNumbers.push(currentPage - 1);
    }
    visiblePageNumbers.push(currentPage);
    if (currentPage >= countPages - 4) {
      /* If current and end are not too far, we don't want to "dot dot" between them. */
      for (let i = currentPage + 1; i < countPages; i++) {
        visiblePageNumbers.push(i);
      }
    } else {
      visiblePageNumbers.push(currentPage + 1);
      visiblePageNumbers.push(currentPage + 2);
      visiblePageNumbers.push('dots-right-half');
    }
    if (currentPage !== countPages) {
      visiblePageNumbers.push(countPages);
    }
  }
  return visiblePageNumbers;
}

Pagination.propTypes = {
  paginationData: PropTypes.object.isRequired,
  pathPrefix: PropTypes.string,
};
Pagination.defaultProps = {
  pathPrefix: '',
};

export default Pagination;
