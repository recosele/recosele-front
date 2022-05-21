import { userLogin, UserLogin, userLogout, UserLogout } from "../api/auth";
import { getLocalToday } from "./useTime";

const authKey = "recosele";

interface AUTH {}

export function getAuth(): AUTH {
  const auth = JSON.parse(window.localStorage.getItem(authKey));
  return auth;
}

export async function setAuth(params: UserLogin) {
  try {
    const res = await userLogin(params);
    if (res.error) throw "error";
    const user = {
      // Todo: add login info
      loginTime: getLocalToday(),
    };
    window.localStorage.setItem(authKey, JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

export async function removeAuth(params: UserLogout) {
  try {
    window.localStorage.removeItem(authKey);
  } catch (error) {
    console.log(error);
  }
}
