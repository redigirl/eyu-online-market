import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";
const links =[
    {to:"/", label:"Home"},
    {to:"/about", label:"About"},
    {to:"/shop", label:"Shop"},
    {to:"/services", label:"Services"},
    {to:"/contact", label:"Contact"}
    
]
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const isHomePage = useLocation().pathname === "/";

    return (
        <header className={`nav${isHomePage ? " home-nav" : ""}`}>
            <div className="container nav-inner">
                <NavLink to="/" className="logo">
                <img src={logo} alt="eyu" />
                <span>Online Market</span>
                </NavLink>

                {isHomePage && (
                    <button
                        className="menu-toggle"
                        type="button"
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={menuOpen}
                        aria-controls="site-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                )}

                <nav id="site-navigation" className={menuOpen ? "menu-open" : ""} aria-label="Main navigation">
                    {links.map((link) => (
                        <NavLink 
                        key={link.to}
                        to={link.to}
                        end={link.to === "/"}
                        className={({ isActive }) => (isActive ? "active" : "")}
                        onClick={() => setMenuOpen(false)}
                        >
                    {link.label}
                    </NavLink>
                    ))}
                </nav>
                </div>
        </header>
    );
    
}