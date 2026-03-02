import React from 'react'
import NavSearch from '../components/Search'
import "../css/homepage.css"
import "../css/search.css"


const Homepage = () => {

    return(
        <div className='app'>
            <div className="search-section">
                <NavSearch/>
            </div>
        </div>
    )
}

export default Homepage