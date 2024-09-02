export async function getUser() {
  if ("loginUser" in localStorage) {
    const user = JSON.parse(localStorage.getItem("loginUser"));
    if (
      "access_token" in user &&
      "refresh_token" in user &&
      "expires_at" in user
    ) {
      return user;
    }
  }
  return null;
}
