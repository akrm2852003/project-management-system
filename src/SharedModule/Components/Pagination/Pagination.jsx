const Pagination = ({
  pageSize,
  setPageSize,
  totalNumberOfRecords,
  pageNumber,
  totalPages,
  setPageNumber,
}) => {
  return (
    <div className="d-flex justify-content-end align-items-center p-3 gap-5 bg-body">
      {/* Page Size */}
      <div className="d-flex align-items-center gap-4">
        <span>Showing</span>

        <select
          className="form-select border rounded-4  selectEnhance text-center"
          style={{width: "40px"}}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={""}></option>
          {/* <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={12}>12</option> */}
        </select>

        {/* <span>of {totalNumberOfRecords} Results</span> */}
      </div>

      {/* Page Number */}
      <div className="d-flex align-items-center gap-3">
        <span>Page</span>

        <select
          className="form-select border rounded-4 selectEnhance px-2"
           style={{ width: "55px",
            overflowY: "auto"}}
          value={pageNumber}
          onChange={(e) => setPageNumber(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>

        {/* <span>of {totalPages}</span> */}

        <div className="d-flex gap-3">
          <button
            className="btn btn-white border-0 p-1"
            disabled={pageNumber === 1}
            onClick={() =>
              setPageNumber((prev) => Math.max(prev - 1, 1))
            }
          >
            <i className="bi bi-chevron-left fs-5 text-secondary"></i>
          </button>

          <button
            className="btn btn-white border-0 p-1"
            disabled={pageNumber === totalPages}
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <i className="bi bi-chevron-right fs-5 text-secondary"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;