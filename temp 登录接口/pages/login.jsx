import { login, whoAmI } from "../services/loginService";

export default () => {
  login("11111111111", "123123").then((resp) => {
    console.log("> Login info : ", resp);
  });

  whoAmI().then((resp) => {
    console.log("> WhoAmI : ");
  });
  return <h1>Login Page</h1>;
};
