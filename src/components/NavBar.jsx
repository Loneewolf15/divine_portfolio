import { useState, useEffect } from "react";

import { navLinks } from "../constants";

import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll);

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

    <header className={`navbar ${scrolled ? "scrolled glass-panel-fluid md:mx-20 rounded-2xl w-[90%] md:w-[80%] max-w-7xl top-5" : "top-0 py-10"}`}>
      <div className="inner">
        <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
          Divine Victor
        </Link>
        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => {
              const isHash = link.startsWith("#");
              const isActive = pathname === link;

              return (
                <li key={name} className="group">
                  {isHash ? (
                    <a href={pathname === '/' ? link : `/${link}`}>
                      <span>{name}</span>
                      <span className="underline" />
                    </a>
                  ) : (
                    <Link to={link}>
                      <span className={isActive ? "text-blue-500" : ""}>{name}</span>
                      <span className="underline" />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <a href="#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
}

export default NavBar;
