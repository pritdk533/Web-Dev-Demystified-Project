import React from "react";
import { requireAuth } from "../../Utils/requireAuth";
import refresh_token from "../../Utils/refreshToken";
import { isTokenExpired } from "../../Utils/isTokenExpired";
import { getUser } from "../../Utils/getUser";
import { BASE_URL, SUPABASE_API_KEY } from "../../../constants";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import thumbnail from "../../assets/thumbnail.svg";
import styles from "./MyCourses.module.css";

import reactLogo from "../../assets/react.svg";
import jsLogo from "../../assets/javascript.svg";
import cssLogo from "../../assets/css3.svg";

export const myCourseLoader = async ({ request, params }) => {
  const pathname = new URL(request.url).pathname;
  await requireAuth(pathname);
  let { access_token, expires_at, user_id } = await getUser();
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
  const courseNumber = subscriptions
    .map((course) => {
      return `"${course.course_id}"`;
    })
    .join(",");

  const myCoursesEndPoint = `${BASE_URL}/rest/v1/courses?id=in.%28${courseNumber}%29`;

  const { data: myCourses } = await axios.get(myCoursesEndPoint, {
    headers: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${access_token}`,
    },
  });

  return myCourses;

  // This is for handling single route for protected route
  // const searchParams = new URL(request.url)
  // const user = await getUser();
  // if (user === null) {
  //   return redirect(`/login?redirectTo=${searchParams.pathname}`);
  // } else {
  //   return null;
  // }
};

const MyCourse = () => {
  const myCourses = useLoaderData();
  console.log(myCourses);
  return (
    <>
      {myCourses.length !== 0 ? (
        <div className={`${styles.myCoursesPage}`}>
          <h1>My courses</h1>

          <div className={styles.myCourses}>
            {myCourses.map((course) => {
              const { name, id } = course;

              return (
                <div key={id} className={styles.courseCard}>
                  <img
                    src={
                      name && name.includes("React")
                        ? reactLogo
                        : name.includes("JavaScript")
                        ? jsLogo
                        : cssLogo
                    }
                    alt="Course generic thumbnail"
                    className={
                      name.includes("React")
                        ? `${styles.thumbnail} ${styles.logo}`
                        : `${styles.thumbnail}`
                    }
                  />
                  <h2 className={styles.courseName}>{name}</h2>

                  <Link
                    key={course.id}
                    to={`${course.id}`}
                    className={styles.watchNowBtn}
                  >
                    <i class="fa-regular fa-circle-play"></i> {` `}Watch Now
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.notPurchased}>
            <dotlottie-player
              src="https://lottie.host/49b06ce8-d015-478e-9f0f-6730ceef57d4/hPKRBMXHnz.json"
              background="transparent"
              speed="1"
              style={{ width: "500px", height: "500px" }}
              loop
              autoplay
            ></dotlottie-player>
            <h1>No Course Available </h1>
            <p>You have not Purchased any course yet</p>
          </div>
        </>
      )}
    </>
  );
};

export default MyCourse;
