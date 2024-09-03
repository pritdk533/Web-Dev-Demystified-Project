import React, { useEffect } from "react";
import axios from "axios";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { BASE_URL, SUPABASE_API_KEY } from "../../../constants";
import styles from "./CourseDetail.module.css";
import { getUser } from "../../Utils/getUser";
import refresh_token from "../../Utils/refreshToken";
import { isTokenExpired } from "../../Utils/isTokenExpired";

import reactLogo from "../../assets/react.svg";
import jsLogo from "../../assets/javascript.svg";
import cssLogo from "../../assets/css3.svg";
import thumbnail from "../../assets/thumbnail.svg";
export const courseDetailLoader = async ({ params }) => {
  const { id: Course_ID } = params;
  let user = await getUser();
  let subscriptionData = [];
  if (user !== null) {
    let { access_token, expires_at, user_id } = user;
    if (isTokenExpired(expires_at)) {
      access_token = await refresh_token();
    }
    const SubscriptionEndPoint = `${BASE_URL}/rest/v1/subscriptions?user_id=eq.${user_id}&select=*`;

    const { data: subscriptions } = await axios.get(SubscriptionEndPoint, {
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    });
    subscriptionData = [...subscriptions];
  }

  const URL = `${BASE_URL}/rest/v1/modules?course_id=eq.${Course_ID}&select=*`;
  const { data: modules } = await axios.get(URL, {
    headers: {
      apikey: SUPABASE_API_KEY,
    },
  });
  return { modules, Course_ID, subscriptionData };
};
const CourseDetail = () => {
  const { modules, Course_ID, subscriptionData } = useLoaderData();
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get("name");
  const isSubscribed = subscriptionData.some((subsCourse) => {
    console.log("inside", subsCourse.course_id, Course_ID);
    return subsCourse.course_id === parseInt(Course_ID);
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className="container">
        {/* <div className={styles.content}> */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.courseName}>{courseName} Course</h1>
            {courseName && courseName.includes("React") ? (
              <p className={styles.courseDetailsPara}>
                Unleash Your React Potential: Master the Art of Building
                Powerful, Scalable Web Applications!
              </p>
            ) : courseName.includes("JavaScript") ? (
              <p className={styles.courseDetailsPara}>
                Unleash Your JavaScript Potential: Master the Art of Building
                Dynamic, Scalable Web Applications with ES6+, Async Programming,
                and More!
              </p>
            ) : (
              <p className={styles.courseDetailsPara}>
                Start with the basics and advance to expert techniques,
                mastering layouts, responsive design, animations, and the latest
                CSS frameworks!
              </p>
            )}
            <div className={styles.headerButtonContainer}>
              <Link
                to={
                  subscriptionData && isSubscribed
                    ? `/myCourse/${Course_ID}`
                    : `/payment/${Course_ID}?name=${courseName}`
                }
                className={
                  modules.length !== 0
                    ? `${styles.btn}`
                    : `${styles.btn} ${styles.btnDisabled}`
                }
              >
                {subscriptionData && isSubscribed ? "Go to Course" : "Buy Now"}
              </Link>

              <a className={styles.btn} href="#curriculum">
                View More{" "}
                <i
                  class="fa-solid fa-arrow-down"
                  style={{ textAlign: "center" }}
                ></i>
              </a>
            </div>
          </div>

          <img
            src={`${
              courseName?.includes("React")
                ? reactLogo
                : courseName?.includes("JavaScript")
                ? jsLogo
                : courseName?.includes("CSS")
                ? cssLogo
                : thumbnail
            }`}
            alt="Course Thumbnails"
            className={
              courseName?.includes("React")
                ? `${styles.thumbnail} ${styles.logo} ${styles.headerImg}`
                : `${styles.thumbnail}`
            }
          />
        </header>
        {modules.length !== 0 ? (
          <section id="curriculum" className={styles.curriculumSection}>
            <h2 className={styles.curriculumHeading}>Curriculum</h2>
            {modules
              .sort((a, b) => a.number - b.number)
              .map((module) => {
                const { id, number, name, description } = module;
                return (
                  <div key={id} className={styles.module}>
                    <h3 className={styles.chapterNumber}>Chapter {number}</h3>
                    <h2 className={styles.courseDetailColor}>{name}</h2>
                    <p className={styles.courseDetailColor}>{description}</p>
                  </div>
                );
              })}
            <br />
          </section>
        ) : (
          <div className={styles.lottiePlayer}>
            <dotlottie-player
              src="https://lottie.host/2189256f-6c6e-478f-a97c-913792849155/Mim2w3XyQ5.json"
              background="transparent"
              speed="1"
              style={{ width: "700px", height: "700px" }}
              loop
              autoplay
            ></dotlottie-player>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseDetail;
