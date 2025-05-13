import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LearnDashPagination = ({ 
  initialPage = 1, 
  totalPages = 20,
  onPageChange 
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    onPageChange && onPageChange(page);
  };

  return (
    <div className="pagination-box w-full flex justify-end">
      <div className="pagination-content w-28 rounded-lg gap-2 h-[2.2em] bg-transparent border border-gray-500 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`nav-arrow ${currentPage===1?'text-black/20 cursor-not-allowed':'text-black/80'}`}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        
        <div className="page-indicator flex gap-1">
          <span className='text-black/90'>{currentPage}</span>
          <span className="divider">of</span>
          <span className='text-black'>{totalPages}</span>
        </div>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`nav-arrow ${currentPage === totalPages?'text-black/20 cursor-not-allowed':'text-black/80'}`}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default LearnDashPagination;