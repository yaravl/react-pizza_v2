import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentPage } from "./controlsSlice";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.controls);

  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
};

export default Pagination;
