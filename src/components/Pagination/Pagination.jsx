import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default function Pagination({ pageCount, onPageChange }) {
  const handlePageChange = (selectedPage) => {
    onPageChange(selectedPage.selected);
  };
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={1000} // Assume a large number for pageCount
      marginPagesDisplayed={0}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"previous"}
      nextClassName={"next"}
      previousLinkClassName={"previous-link"}
      nextLinkClassName={"next-link"}
    />
  );
}
