import { Link, withRouter } from 'react-router-dom';
import React from 'react'

const NavigationBar = () => {
    return (
        <div className="navigationBar">
            <div class="container">
                <Link class="navBarBrand" to="/"> Stacked Over </Link>
            </div>

            <div>
                <Link className="navLink" to="/"> Home </Link>
                <Link className="navLink" to="/question"> Ask Question Page </Link>
            </div>

        </div>
    )
}

export default withRouter(NavigationBar)