import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ThankYou.module.css";
import { ToastContainer, toast } from "react-toastify";

function Thankyou() {
  useEffect(() => {
    window.scroll(0, 0);
    toast.info("Now Course Available in My Course Page", {
      className: "toastNotification",
    });
  }, []);
  return (
    <div>
      <div className={styles.successSvg}>
        <dotlottie-player
          src="https://lottie.host/65b625f5-f991-461a-9245-6e2cc58d4324/NvReobIfxh.json"
          background="transparent"
          speed="1"
          style={{ width: "400px", height: "400px", fontSize: "32rem" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
      <div>
        <h1 className={styles.successMsg_h1}>
          Thank you for purchasing the course.
        </h1>
        <p className={styles.successMsg_p}>
          You can see the course in{" "}
          <Link className={styles.linkTag} to={"/mycourse"}>
            {" "}
            My courses page
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Thankyou;
