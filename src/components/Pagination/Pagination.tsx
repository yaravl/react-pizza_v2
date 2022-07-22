import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  onChangePage: (num: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
};

export default Pagination;
