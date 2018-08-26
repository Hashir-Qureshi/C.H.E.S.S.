// Will move to different file or have seperate configuration later
const AUTH_TOKEN = "";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
