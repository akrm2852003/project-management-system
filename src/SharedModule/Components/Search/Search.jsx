

const Search = ({ darkMode, searchTitle, setSearchTitle }) => {
  return (
    <div className="d-flex justify-content-between align-items-center search">
      <div className="input-group m-4 w-25">
        <span
          className={`input-group-text border-end-0 ${
            darkMode ? "bg-dark" : "bg-white"
          } rounded-start-pill`}
        >
          {/* <FiSearch size={18} className="icon" /> */}
        </span>

        <input
          type="text"
          className="form-control border-start-0 rounded-end-pill"
          placeholder="Search By Title"
          aria-label="Search"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
