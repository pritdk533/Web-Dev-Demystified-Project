import axios from "axios";
import { redirect } from "react-router-dom";
import { LOGOUT_URL, SUPABASE_API_KEY } from "../../../constants";
import { getUser } from "../../Utils/getUser";
import { isTokenExpired } from "../../Utils/isTokenExpired";
import refresh_token from "../../Utils/refreshToken";

export const logoutAction = async () => {
  let { access_token, expires_at } = await getUser();
  // STEPS neeed to COMPLETE when performing logout
  // Logout
  // Logout API
  // Clear Local Storage

  try {
    if (isTokenExpired(expires_at)) {
      access_token = await refresh_token();
    }
    await axios.post(LOGOUT_URL, null, {
      headers: {
        apikey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    console.log("Logout Error", error);
  } finally {
    localStorage.removeItem("loginUser");
    return redirect("/");
  }
};
