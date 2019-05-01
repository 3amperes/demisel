export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {};

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user));

export const handleLogin = ({ username, password }) => {
  console.log("heyy", { username, password });
  if (username === `demisel` && password === `bijoux`) {
    return setUser({
      username: `demisel`,
      name: `demiselbijoux`,
      email: `demiselbijoux@gmail.com`,
    });
  }

  return false;
};

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.username;
};

export const logout = callback => {
  setUser({});
  callback();
};
