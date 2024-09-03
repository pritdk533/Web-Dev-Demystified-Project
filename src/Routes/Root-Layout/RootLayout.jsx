import React, { useState } from "react";
import styles from "./RootLayout.module.css";
import logoutSvg from "../../assets/logout.svg";
import {
  Form,
  NavLink,
  Outlet,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

const RootLayout = () => {
  const userData = useRouteLoaderData("parentRoute");
  const navigation = useNavigation();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          <h1>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              <span className={styles.webDev}>Web Dev</span>{" "}
              <span className={styles.demystified}>Demystified</span>
            </NavLink>
          </h1>

          {/* Hamburger Menu Icon */}
          <div
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Navigation Items */}
          <ul className={`${styles.navItems} ${menuOpen ? styles.active : ""}`}>
            {/* <li>
              <NavLink to={"about"} onClick={toggleMenu}>
                About
              </NavLink>
            </li> */}
            {userData && (
              <li>
                <NavLink to={"mycourse"} onClick={toggleMenu}>
                  My Courses
                </NavLink>
              </li>
            )}
            {!userData && (
              <>
                <li>
                  <NavLink to={"login"} onClick={toggleMenu}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"signup"} onClick={toggleMenu}>
                    SignUp
                  </NavLink>
                </li>
              </>
            )}

            {/* Logout Button inside Hamburger Menu */}
            {userData && (
              <li>
                <Form method="POST" action="/logout" onClick={toggleMenu}>
                  <button className={styles.logoutButton}>
                    Logout
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    {/* <img
                      src={logoutSvg}
                      alt="Logout SVG"
                      className={styles.logoutSvg}
                    /> */}
                  </button>
                </Form>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <main className={styles.mainTag}>
        {navigation.state === "loading" ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "1000",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <ThreeCircles
              visible={true}
              height="300"
              width="300"
              color="#08beff"
              ariaLabel="three-circles-loading"
            />
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      <footer>
        <div className={styles.footer}>
          <p className={styles.footer_para}>
            Contact us{" "}
            <a
              className={styles.footer_anchor}
              href="mailto:pritdk533@gmail.com"
            >
              Pritdk533@gmail.com
            </a>
          </p>
          <div className={styles.svgFooter}>
            <dotlottie-player
              src="https://lottie.host/4ec9b8ff-9108-464a-947e-14bbcd822aeb/05QX2MY0bC.json"
              background="transparent"
              speed="2"
              style={{ width: "200px", height: "200px" }}
              loop
              autoplay
            ></dotlottie-player>
          </div>
          <p className={styles.footer_endPara}>
            Built by <span className={styles.footer_builtBy}>Pritam Kumar</span>{" "}
            with{" "}
            <svg
              className={styles.footer_builtBy_svg}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </p>
        </div>
      </footer>
    </>
  );
};

export default RootLayout;
