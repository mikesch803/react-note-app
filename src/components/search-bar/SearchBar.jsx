import React from 'react'
import { CarbonSearch } from '../../assests/icons/icons'
import { useFilterContext, useThemeContext } from '../../context';
import './SearchBar.css'
export function SearchBar() {
    
  const { filterDispatch } = useFilterContext();
  const {theme} = useThemeContext();
  return (
    <div className="navbar-search" data-theme={theme}>
        <input type="text" placeholder="search by title..." className="navbar-input" onChange={(e)=>filterDispatch({type:"SEARCH", payload:e.target.value})}/>
        <CarbonSearch />
      </div>
  )
}

