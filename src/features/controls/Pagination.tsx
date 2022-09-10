import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "./controlsSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
};

export default Pagination;
