import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
            Nashik Explorer
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/places">Explore Places</Link>
                <Link to="map">Map</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
}

export default Navbar;