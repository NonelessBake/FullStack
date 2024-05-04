import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

export default function SearchModal(newProps) {
  const { searchModalActive, handleCloseSearchModal } = newProps;
  const [searchInput, setSearchInput] = useState(undefined);
  const [isNavigate, setIsNavigate] = useState(false);
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);
  const newQuery = { ...queryParams, search: searchInput };
  const newQueryString = queryString.stringify(newQuery);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const onSearching = () => {
    navigate(`/shop/?${newQueryString}`);

    handleCloseSearchModal();
  };
  return (
    <div className="search-modal" style={searchModalActive}>
      <input type="text" value={searchInput} onChange={handleChange} />
      <button onClick={onSearching}>search</button>
      <button onClick={handleCloseSearchModal}>X</button>
    </div>
  );
}
