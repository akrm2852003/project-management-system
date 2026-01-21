import React from "react";


const Search = ({ 
  // darkMode, 
   searchTitle, setSearchTitle }) => {
  return (
    <div className="d-flex justify-content-between align-items-center search">
      <div className="input-group m-4 w-50 p-1 bg-white rounded-5">
        <span
          // className={`input-group-text ${
          //   darkMode ? "bg-dark text" : "bg-white"
          // } `}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="text"
          className="form-control border-0 px-2 text-dark"
          placeholder="Search "
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;