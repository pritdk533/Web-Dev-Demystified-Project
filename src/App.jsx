import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  Home,
  About,
  MyCourse,
  Login,
  Signup,
  Error,
  Profile,
  Payment,
  MyCourseVideos,
} from "./Routes/Pages";
import RootLayout from "./Routes/Root-Layout/RootLayout";
import { loginActionHandler, loginLoader } from "./Routes/Pages/Login";
import { myCourseLoader } from "./Routes/Pages/MyCourse";
import { profileLoader } from "./Routes/Pages/Profile";
import { signupAction, signupLoader } from "./Routes/Pages/Signup";
import { logoutAction } from "./Routes/Pages/Logout";
import { getUser } from "./Utils/getUser";
import { homeLoader } from "./Routes/Pages/Home";
import CourseDetail, { courseDetailLoader } from "./Routes/Pages/CourseDetail";
import { paymentLoader } from "./Routes/Pages/Payment";
// import MyCourseVideos from "./Routes/Pages/MyCourseVideos";
import Thankyou from "./Routes/Pages/Thankyou";
import { myCourseVideosLoader } from "./Routes/Pages/MyCourseVideos";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      loader={getUser}
      id="parentRoute"
      errorElement={<Error />}
    >
      <Route
        index
        element={<Home />}
        loader={homeLoader}
        errorElement={<Error />}
      />

      {/* ABOUT OUR COURSE */}
      <Route path="/about" element={<About />} errorElement={<Error />} />

      {/* MY PROFILE AFTER LOGIN */}
      <Route
        path="/profile"
        element={<Profile />}
        loader={profileLoader}
        errorElement={<Error />}
      />

      {/* MY Course Details After Login */}
      <Route
        path="/mycourse"
        element={<MyCourse />}
        loader={myCourseLoader}
        errorElement={<Error />}
      />

      {/* COURSE DETAIL */}
      <Route
        path="/course-detail/:id"
        element={<CourseDetail />}
        loader={courseDetailLoader}
        errorElement={<Error />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
        action={loginActionHandler}
        loader={(args) => {
          return loginLoader(args);
        }}
        errorElement={<Error />}
      />

      {/* LOGOUT */}
      <Route path="/logout" action={logoutAction} />
      <Route
        path="/signup"
        element={<Signup />}
        action={signupAction}
        loader={signupLoader}
        errorElement={<Error />}
      />
      <Route
        path="/payment/:course_id"
        element={<Payment />}
        loader={paymentLoader}
        errorElement={<Error />}
      />
      <Route
        path="/myCourse/:course_id"
        element={<MyCourseVideos />}
        loader={myCourseVideosLoader}
        errorElement={<Error />}
      />
      <Route path="/thankyou" element={<Thankyou />} errorElement={<Error />} />

      {/* ERROR */}
      <Route path="*" element={<Error />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
