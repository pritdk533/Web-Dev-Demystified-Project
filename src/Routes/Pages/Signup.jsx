import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Form, redirect, useActionData } from "react-router-dom";
import { SUPABASE_API_KEY, SIGN_UP_URL } from "../../../constants";
import { getUser } from "../../Utils/getUser";
import styles from "./LoginAndSignup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const signupLoader = async () => {
  const user = await getUser();
  if (user === null) {
    return null;
  } else {
    return redirect("/");
  }
};

export async function signupAction({ request }) {
  let formData = await request.formData();
  const newUser = {
    email: formData?.get("email"),
    password: formData?.get("password"),
  };

  const cnfPassword = formData?.get("confirm-password");

  if (cnfPassword !== newUser.password) {
    toast.error("Password Must be matched", {
      className: "toastNotification",
    });
    return { passwordError: true };
  }

  if (!(newUser.password.length >= 6)) {
    toast.error("Password should me more than or equal to 6 Characters", {
      className: "toastNotification",
    });
    return { passwordError: true };
  }

  try {
    const response = await axios.post(SIGN_UP_URL, newUser, {
      headers: {
        apiKey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (response?.data?.identities && response?.data?.identities.length === 0) {
      return toast.error("user already exist", {
        className: "toastNotification",
      });
    }

    toast.info("Verification Email Sent Please check your inbox!", {
      className: "toastNotification",
    });
    return { message: "success" };
  } catch (error) {
    toast.warning(error.response.data.msg, {
      className: "toastNotification",
    });
    return { error: error.response.data.msg };
  }
}

const Signup = () => {
  const data = useActionData();
  console.log("ddaaaaata", data);
  const formRef = useRef(null);

  useEffect(() => {
    if (data?.passwordError) {
      return;
    }
    if (data) {
      formRef.current.reset();
    }
  }, [data]);
  return (
    <div className="container">
      <h2 className={styles.pageHeading}>
        Create your Account and <span>Start Learning!</span>
      </h2>
      <div className={`${styles.signupSvgAndFormContainer}`}>
        <div>
          <dotlottie-player
            src="https://lottie.host/8d348ed1-1a21-4e97-a893-dc5c40dc223d/vKPSkGqmAb.json"
            background="transparent"
            speed="1"
            style={{ height: "500px" }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div>
          <Form
            method="POST"
            action="/signup"
            className={`${styles.form} container`}
            ref={formRef}
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                // placeholder="enter your email id"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                // placeholder="enter your password"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="confirm password">Confirm Password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                // placeholder="enter your confirm password"
                autoComplete="off"
                // ref={cnfPassword}
              />
            </div>
            <div>
              <input type="submit" value="SignUp" />
            </div>
          </Form>
        </div>
      </div>

      <ToastContainer autoClose={10000} />
    </div>
  );
};

export default Signup;
