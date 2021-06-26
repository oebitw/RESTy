////////////////////
//// Imports //////
//////////////////

// NavLink
import { NavLink } from 'react-router-dom';

//Styles
import './header.scss';



//////////////////////////
////Header Component ////
////////////////////////

function Header() {
    return (

        <header>

            <NavLink className='logo' exact to="/">

                <h1>RESTy</h1>

            </NavLink>
            <nav>
                <span>
                    <NavLink className="link" exact to="/">
                        Home
                    </NavLink>
                </span>
                <span>
                    <NavLink className="link" to="/history">History</NavLink>
                </span>
                <span>
                    <NavLink className="link" to="/help">Help</NavLink>
                </span>
            </nav>
        </header>

    )
}

export default Header
