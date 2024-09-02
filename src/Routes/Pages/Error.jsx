import React from "react";
import styles from "./Error.module.css";
const Error = () => {
  return (
    <div className={styles.ErrorContainer}>
      <dotlottie-player
        src="https://lottie.host/6c481714-41f0-4024-8a40-4c4163932073/3CTznkUboV.json"
        background="transparent"
        speed="1"
        style={{ width: "400px", height: "400px" }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default Error;
