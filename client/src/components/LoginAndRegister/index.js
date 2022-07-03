import clsx from "clsx";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const LoginAndRegister = () => {
  const [type, setType] = useState("login");
  const showLogin = () => setType("login");
  const showRegister = () => setType("register");
  return (
    <div className={clsx("auth", type)}>
      <div className="auth-wrapper">
        {type === "login" && <Login showRegister={showRegister} />}
        {type === "register" && <Register showLogin={showLogin} />}
      </div>
    </div>
  );
};

export default LoginAndRegister;
