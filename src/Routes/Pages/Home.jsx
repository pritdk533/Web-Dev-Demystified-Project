import { Link, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BASE_URL,
  GET_ALL_COURSES,
  SUPABASE_API_KEY,
} from "../../../constants";

// SVG
import rupee from "../../assets/rupee.svg";
import heroImage from "../../assets/hero.svg";
import thumbnail from "../../assets/thumbnail.svg";
import reactLogo from "../../assets/react.svg";
import jsLogo from "../../assets/javascript.svg";
import cssLogo from "../../assets/css3.svg";
// UTILS
import { getUser } from "../../Utils/getUser";
import { isTokenExpired } from "../../Utils/isTokenExpired";
import refresh_token from "../../Utils/refreshToken";
// CSS
import styles from "./Home.module.css";
import { useEffect } from "react";

export async function homeLoader({ request }) {
  let user = await getUser();
  let subscriptionData = [];
  try {
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
    // fetching all the courses in homepage
    const { data } = await axios.get(GET_ALL_COURSES, {
      headers: {
        apikey: SUPABASE_API_KEY,
      },
    });
    return { allAvailableCourse: data, subscriptions: subscriptionData };
  } catch (error) {
    return { error: error };
  }
}

const Home = () => {
  const { allAvailableCourse, subscriptions } = useLoaderData();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className="container">
        <section className={styles.hero}>
          <div className="heroContent">
            <h1 className={styles.heroHeading}>
              We Demystify Development{" "}
              <span className={styles.fromScratch}>from Scratch. </span>
            </h1>
            <p className={styles.heroSubHeading}>
              And make sure you understand everything
            </p>
            <a href="#startLearning" className={styles.heroButton}>
              Start Learning {` `} &nbsp;
              <i
                class="fa-solid fa-arrow-down"
                style={{ textAlign: "center" }}
              ></i>
            </a>
          </div>

          <div className={styles.headerSvg}>
            <dotlottie-player
              src="https://lottie.host/5d7f55d3-4270-4cb6-af87-aaf09f2264f3/9de5BXwBJj.json"
              background="transparent"
              speed="1"
              style={{ height: "350px" }}
              loop
              autoplay
            ></dotlottie-player>
          </div>
        </section>
        <section className={styles.courseSection}>
          <h1 className={styles.courseSectionHeading}>
            Our Most Popular Courses
          </h1>
          <div className={styles.courseCards}>
            {allAvailableCourse.map((course) => {
              const { name, amount, description, id } = course;
              let isSubscribed = false;
              if (subscriptions) {
                isSubscribed = subscriptions.some((course) => {
                  return course.course_id === id;
                });
              }

              return (
                <div key={id} className={styles.courseCard} id="startLearning">
                  <img
                    src={`${
                      name.includes("React")
                        ? reactLogo
                        : name.includes("JavaScript")
                        ? jsLogo
                        : name.includes("CSS")
                        ? cssLogo
                        : thumbnail
                    }`}
                    alt="Course generic thumbnail"
                    className={
                      name.includes("React")
                        ? `${styles.thumbnail} ${styles.logo}`
                        : `${styles.thumbnail}`
                    }
                  />
                  <p className={styles.courseNameHeading}>{name}</p>
                  <p className={styles.courseDescription}>{description}</p>
                  <div>
                    <p className={styles.courseDuration}>
                      <span>
                        <dotlottie-player
                          src="https://lottie.host/23ae1f2f-1438-4d2e-b8fe-fb7f7586ca54/9gMYtNZCOY.json"
                          background="transparent"
                          speed="1"
                          style={{ width: "50px", height: "50px" }}
                          loop
                          autoplay
                        ></dotlottie-player>
                      </span>{" "}
                      <span>{`${
                        name.includes("React")
                          ? `22hr 40mins`
                          : name.includes("JavaScript")
                          ? `28hr 10mins`
                          : name.includes("CSS")
                          ? `16hr 30mins`
                          : null
                      }`}</span>
                    </p>
                    <p className={styles.courseProjects}>
                      <span>
                        <dotlottie-player
                          src="https://lottie.host/ea25a41a-66be-420d-84f8-d56d635f7468/9T8YXzOcYM.json"
                          background="transparent"
                          speed="1"
                          style={{ width: "50px", height: "50px" }}
                          loop
                          autoplay
                        ></dotlottie-player>
                      </span>{" "}
                      <span>{`4 Projects`}</span>
                    </p>
                    <p className={styles.coursePrice}>
                      <span>
                        <dotlottie-player
                          src="https://lottie.host/95b75fb2-ec6f-41ac-87d5-538746bbbc17/X5QVrm09bm.json"
                          background="transparent"
                          speed="1"
                          style={{ width: "50px", height: "50px" }}
                          loop
                          autoplay
                        ></dotlottie-player>
                      </span>
                      <span>
                        <img src={rupee} alt="Rupee Symbol" />{" "}
                        {amount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className={styles.linkBtn}>
                    <Link
                      to={
                        isSubscribed
                          ? `/myCourse/${id}`
                          : `/course-detail/${id}?name=${name}`
                      }
                      className={styles.moreInfoBtn}
                    >
                      {subscriptions && isSubscribed
                        ? "Go to Course"
                        : "View Course"}
                    </Link>
                    <Link
                      to={`/course-detail/${id}?name=${name}`}
                      className={styles.moreInfoBtn}
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
