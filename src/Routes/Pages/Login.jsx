import axios from "axios";
import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { LOGIN_URL, SUPABASE_API_KEY } from "../../../constants";
import { getUser } from "../../Utils/getUser";
import styles from "./LoginAndSignup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loginLoader = async ({ request, params }) => {
  // loader function always run before component render, So checking for for user if present or not
  // if user present then redirect it to Home or else remain in the same login page
  const user = await getUser();
  if (user !== null) {
    return redirect("/");
  }
  return null;
};

export const loginActionHandler = async (args) => {
  // Destructuring args recived when action Handler invoked and web API provide args
  const { request, params } = args;

  // Way 1
  // const url = new URL(request.url);
  // const redirectPath = url.searchParams.get("redirectTo") || "/";

  // Short Syntax for above code
  const redirectTo = new URL(request.url).searchParams.get("redirectTo") || "/";

  // Collecting formData input values from request.formData()
  const data = await request.formData();
  const credentials = {
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    const loginResponse = await axios.post(LOGIN_URL, credentials, {
      headers: {
        apiKey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      },
    });

    // Destructuring Login Response Data
    const {
      access_token,
      refresh_token,
      expires_at,
      user: { id: user_id },
    } = loginResponse.data;

    // Creating Login User Details to store in Local Storage or Session Storgae
    const loginUser = { access_token, refresh_token, expires_at, user_id };

    // Local Storage : LoggedIn user details stored access_token, refresh_token, expires_at, user_id
    localStorage.setItem("loginUser", JSON.stringify(loginUser));

    // Once User LoggedIn then redirecting it to Home Page
    return redirect(redirectTo);
  } catch (error) {
    // If any Error Occured then Removing Login User Data from Local Storage
    localStorage.removeItem("loginUser");

    // Error When Login Creds Are Wrong
    if (error.response.status === 400) {
      // return { error: "Invalid Login Creds" };
      return toast.error("Invalid User Credentials !");
    }
    // Error when 401 unauthorized access
    if (error.response.status > 400) {
      return { error: error?.response?.data?.message || error.message };
    }
  }
};

const Login = () => {
  const data = useActionData();
  const location = useLocation();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const loginUrlAction = location.pathname + location.search;
  return (
    <>
      <h1 className={styles.pageHeading}>Welcome Back!</h1>
      <p className={styles.loginPagePara}>Login to continue learning</p>
      <div className={styles.loginConatinerAndSVG}>
        <dotlottie-player
          src="https://lottie.host/dc3b3c0b-cc64-4d25-b9fa-d67687cbffe3/ux51N09Etq.json"
          background="transparent"
          speed="1"
          style={{ width: "500px", height: "500px" }}
          loop
          autoplay
        ></dotlottie-player>
        <div>
          <Form
            method="POST"
            action={loginUrlAction}
            className={styles.form}
            replace
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                // placeholder="email"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                // placeholder="password"
                autoComplete="off"
              />
            </div>
            <div>
              <input
                type="submit"
                value={`${isSubmitting ? "submitting..." : "Login"}`}
                disabled={isSubmitting}
              />
            </div>

            {/* {data && data.error && <p>{data.error}</p>} */}
          </Form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
