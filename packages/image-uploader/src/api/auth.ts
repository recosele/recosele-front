import Api from "../services/Api";

export interface UserLogin {
  tel: String;
  password: String;
  license_no: String;
}
export const userLogin = async (params: UserLogin) => {
  try {
    const data = await Api.post(`/auth-driver/signin`, params);
    return { data };
  } catch (error) {
    return { error };
  }
};

export interface UserLogout {
  truckId: String;
}
export const userLogout = async (params: UserLogout) => {
  try {
    const data = await Api.post(`/auth-driver/logout`, params);
    return { data };
  } catch (error) {
    return { error };
  }
};
