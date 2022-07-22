import { useFilterContext } from "../../context";
import { priorityData, tagsData } from "../../data/filter-data";
import "./Filter.css";
export function Filter() {
  const { state, filterDispatch } = useFilterContext();
  return (
    <aside className="aside-filter">
      <div className="filter-container m-b-1">
        <h2 className="filter-title">
          Filters
          <button onClick={() => filterDispatch({ type: "CLEAR" })}>
            CLEAR
          </button>
        </h2>
        <h3>Sort by Date</h3>
        <ul>
          <label htmlFor="latest-date">
            <input
              name="filter-date"
              id="latest-date"
              type="radio"
              checked={state.sortByDate === "Latest"}
              onChange={() =>
                filterDispatch({ type: "SORT_BY_DATE", payload: "Latest" })
              }
            />
            Latest
          </label>
          <label htmlFor="oldest-date">
            <input
              name="filter-date"
              id="oldest-date"
              type="radio"
              checked={state.sortByDate === "Oldest"}
              onChange={() =>
                filterDispatch({ type: "SORT_BY_DATE", payload: "Oldest" })
              }
            />
            Oldest
          </label>
        </ul>
        <h3>Sort by Priority</h3>
        <ul>
          {priorityData.map((item) => (
            <label htmlFor={`priority-${item}`} key={item}>
              <input
                id={`priority-${item}`}
                name="priority"
                type="radio"
                checked={state.sortByPriority === item}
                onChange={() =>
                  filterDispatch({ type: "SORT_BY_PRIORITY", payload: item })
                }
              />
              {item}
            </label>
          ))}
        </ul>
        <h3>Sort by Tags</h3>
        <ul>
          {tagsData.map((item) => (
            <label htmlFor={`tags-${item}`} key={item}>
              <input
                id={`tags-${item}`}
                type="checkbox"
                checked={state.sortByTags.includes(item)}
                onChange={() =>
                  filterDispatch({ type: "SORT_BY_TAGS", payload: item })
                }
              />
              {item}
            </label>
          ))}
        </ul>
      </div>
    </aside>
  );
}
