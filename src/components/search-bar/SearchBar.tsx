import { SearchIcon } from "../../assests/icons";
import { useFilterContext } from "../../context";
import "./SearchBar.css";
export function SearchBar() {
  const { filterDispatch } = useFilterContext();
  return (
    <div className="navbar-search">
      <input
        type="text"
        placeholder="search by title..."
        className="navbar-input"
        onChange={(e) =>
          filterDispatch({ type: "SEARCH", payload: e.target.value })
        }
      />
      <SearchIcon />
    </div>
  );
}
