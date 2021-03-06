const loginKey = 'recosele.userLogin';

/**
 *
 * 通过param进行登陆判定
 * @param {*} userLogin
 * @returns isLogin: boolean
 */
export function checkUserLogin() {
  let isLogin = false;
  const userLogin = getUserInfo();
  try {
    const { expiryDate } = userLogin;
    isLogin = !!expiryDate && expiryDate !== 'null';
    if (!isLogin) {
      console.log('请登录');
    } else if (expiryDate && new Date(expiryDate) <= new Date()) {
      console.log('token已过期');
      isLogin = false;
    }
  } catch (err) {
    console.log(err);
  }
  return isLogin;
}

export function setUserInfo(data: any) {
  localStorage.setItem(loginKey, JSON.stringify(data));
}

export function removeUserInfo() {
  localStorage.removeItem(loginKey);
}

export function getUserInfo(): userLogin {
  return JSON.parse(localStorage.getItem(loginKey) || '{}');
}
