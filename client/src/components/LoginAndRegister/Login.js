import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./LoginAndRegister.scss";

import images from "~/assets/images";
import useValidate from "~/hooks/useValidate";
import Button from "~/components/Button";

import { authActions } from "~/stores/authSlice";
const Login = ({ showRegister }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { isFetching } = useSelector((state) => state.auth);
  const validator = useValidate();
  const [value, setValue] = useState({});
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const inputHandler = (e) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    validator({
      form: ".auth-form#login",
      formGroupSelector: ".auth-form-control",
      errorSelector: ".auth-form-msg",
      rules: [
        validator.isRequired("#email", "Vui lòng nhập email."),
        validator.isEmail("#email"),
        validator.isRequired("#password", "Vui lòng nhập mật khẩu."),
      ],
      onSubmit(data) {
        setError(null);
        dispatch(authActions.setFetching(true));
        axios
          .post("http://localhost:8800/api/auth/login", data.formValues)
          .then((res) => {
            dispatch(authActions.setFetching(false));
            setError(null);
            const { accessToken, avatar, _id } = res.data;
            dispatch(authActions.login({ accessToken, avatar, _id }));
          })
          .catch((axiosError) => {
            dispatch(authActions.setFetching(false));
            setError(axiosError.response.data.msg);
          });
      },
    });
  }, []);

  return (
    <>
      <div className="auth-left hide-on-mobile">
        <img src={images.logoDark} className="auth-img" />
      </div>
      <div className="auth-right">
        <h2 className="auth-title">Đăng nhập</h2>
        <form className="auth-form" id="login" autoComplete="off">
          <div className="auth-form-control">
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              spellCheck="false"
              ref={emailRef}
              onChange={inputHandler}
              type="text"
              className="auth-input"
              placeholder="abc@gmail.com"
              id="email"
              name="email"
            />
            <span className="auth-form-msg"></span>
          </div>

          <div className="auth-form-control">
            <label htmlFor="password" className="auth-label">
              Mật khẩu
            </label>
            <input
              spellCheck="false"
              ref={passwordRef}
              onChange={inputHandler}
              id="password"
              name="password"
              type="password"
              className="auth-input"
            />
            <span className="auth-form-msg"></span>
          </div>
          {error && <p className="auth-error">{error}</p>}
          <Button
            type="primary"
            hover="bg-bright"
            size="large"
            className={"auth-btn"}
          >
            Đăng nhập
          </Button>
        </form>

        <div className="auth-footer">
          Bạn chưa có tài khoản?
          <span className="auth-footer-link" onClick={showRegister}>
            Đăng ký ngay!
          </span>
        </div>
      </div>
    </>
  );
};
Login.propTypes = {
  showRegister: PropTypes.func,
};
export default Login;
