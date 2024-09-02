import React from "react";
import styles from "./RootLayout.module.css";
import logoutSvg from "../../assets/logout.svg";
import {
  Form,
  NavLink,
  Outlet,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
// import { BallTriangle, MutatingDots, Triangle } from "react-loader-spinner";
import GridLoader from "react-spinners/GridLoader";
import { FidgetSpinner, ThreeCircles } from "react-loader-spinner";

const RootLayout = () => {
  const userData = useRouteLoaderData("parentRoute");
  const navigation = useNavigation();
  return (
    <>
      <header>
        <nav className={`${styles.nav} container`}>
          <h1>
            <NavLink to="/">
              <span className={styles.cod}>Web Dev</span>{" "}
              <span className={styles.prog}>Demystified</span>
            </NavLink>
          </h1>

          <ul className={styles.navItems}>
            <li>
              <NavLink to={"about"}>About</NavLink>
            </li>
            {userData && (
              <li>
                <NavLink to={"profile"}>Profile</NavLink>
              </li>
            )}
            {userData && (
              <li>
                <NavLink to={"mycourse"}>My Courses</NavLink>
              </li>
            )}
            {!userData && (
              <li>
                <NavLink to={"login"}>Login</NavLink>
              </li>
            )}
            {!userData && (
              <li>
                <NavLink to={"signup"}>SignUp</NavLink>
              </li>
            )}
          </ul>
          {userData && (
            <Form method="POST" action="/logout">
              <button className={styles.logoutButton}>
                Logout{" "}
                <img
                  src={logoutSvg}
                  alt="Logout SVG"
                  className={styles.logoutSvg}
                />
              </button>
            </Form>
          )}
        </nav>
      </header>

      <main className={styles.mainTag}>
        {navigation.state === "loading" ? (
          <>
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
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </>
        ) : (
          <Outlet />
        )}
        {/* <Outlet /> */}
      </main>
      <footer>
        <div className={styles.footer}>
          <p className={styles.footer_para}>
            Contact us{" "}
            <a
              className={styles.footer_anchor}
              href="mailto:pritdk533@gmail.com"
              class="myEmail"
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
            with{` `}
            <svg
              className={styles.footer_builtBy_svg}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              // class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
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
