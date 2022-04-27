function Pagination({ postsPerPage, totalPosts, currentPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-buttons">
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              type="button"
              onClick={() => paginate(number)}
              className={`page-btn${currentPage === number ? ' focused' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
