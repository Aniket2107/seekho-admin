export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  if (localStorage.getItem("jwt")) {
    const jwt = localStorage.getItem("jwt");
    if (typeof jwt === "string") {
      return JSON.parse(jwt);
    }
  }
  return false;
};
