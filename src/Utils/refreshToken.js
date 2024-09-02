import axios from "axios";
import { BASE_URL, REFRESH_TOKEN, SUPABASE_API_KEY } from "../../constants";
import { getUser } from "./getUser";

export default async function refresh_token() {
  const user = await getUser();
  const { data } = await axios.post(
    REFRESH_TOKEN,
    { refresh_token: user?.refresh_token },
    {
      headers: {
        apikey: SUPABASE_API_KEY,
      },
    }
  );
  const {
    access_token,
    expires_at,
    refresh_token,
    user: { id: user_id },
  } = data;
  localStorage.setItem(
    "loginUser",
    JSON.stringify({ access_token, expires_at, refresh_token, user_id })
  );

  return access_token;
}
