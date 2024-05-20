import axios from "axios";
import router from "@/router/.";

export function getToken() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export function logout() {
  document.cookie =
    "token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax";
  console.log("User token is being deleted");
  router.push("/");
}

export async function checkTeam() {
  try {
    const response = await axios.get(
      process.env.VUE_APP_API_USERS_IP + "/user/me/team",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    console.log("User has a team");
    return true;
  } catch (error) {
    console.log(error);
    if (getToken()) {
      console.log("User does not have a team");
    }
    return false;
  }
}

export async function checkAuth() {
  try {
    const response = await axios.get(
      process.env.VUE_APP_API_USERS_IP + "/user/me",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    console.log("User token is valid");
    return true;
  } catch (error) {
    console.log(error);
    if (getToken()) {
      console.log("User token is expired");
      logout();
    }
    return false;
  }
}

export function saveToken(res) {
  const expires = new Date(res.data.exp * 1000); // Convert Unix timestamp to Date
  document.cookie = `token=${res.data.access_token};path=/;expires=${expires};SameSite=Lax`;
}
