import React from "react";
import { requireAuth } from "../../Utils/requireAuth";

export async function profileLoader({ request }) {
  const pathname = new URL(request.url).pathname;
  await requireAuth(pathname);
  return null;
}

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
