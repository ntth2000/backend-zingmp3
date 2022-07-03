import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./LoginAndRegister.scss";

import { useDispatch, useSelector } from "react-redux";
import useValidate from "~/hooks/useValidate";
import Button from "~/components/Button";
import { authActions } from "~/stores/authSlice";
const Register = ({ showLogin }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { isFetching } = useSelector((state) => state.auth);
  const validator = useValidate();
  const [value, setValue] = useState({});
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const inputHandler = (e) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    validator({
      form: ".auth-form#register",
      formGroupSelector: ".auth-form-control",
      errorSelector: ".auth-form-msg",
      rules: [
        validator.isRequired("#email", "Vui lòng nhập email."),
        validator.isRequired("#username", "Vui lòng nhập tên người dùng."),
        validator.isEmail("#email"),
        validator.isRequired("#password", "Vui lòng nhập mật khẩu"),
        validator.isRequired("#confirmPassword", "Vui lòng nhập lại mật khẩu"),
        validator.isConfirmed(
          "#confirmPassword",
          function () {
            return document.querySelector(".auth-form #password").value;
          },
          "Mật khẩu nhập lại không chính xác"
        ),
      ],
      onSubmit(data) {
        // register(
        //   {
        //     method: "post",
        //     url: "http://localhost:8800/user/register",
        //     data: {
        //       email: data.formValues.email,
        //       username: data.formValues.username,
        //       password: data.formValues.password,
        //     },
        //   },
        //   logData
        // );
        setError(null);
        dispatch(authActions.setFetching(true));

        axios
          .post("http://localhost:8800/api/user/register", data.formValues)
          .then((res) => {
            setError(null);
            axios
              .post("http://localhost:8800/api/auth/login", {
                email: data.formValues.email,
                password: data.formValues.password,
              })
              .then((res) => {
                dispatch(authActions.setFetching(false));
                setError(null);
                dispatch(authActions.login(res.data));
              })
              .catch((axiosError) => {
                dispatch(authActions.setFetching(false));
                setError(axiosError.response.data.msg);
              });
          })
          .catch((axiosError) => {
            dispatch(authActions.setFetching(false));
            setError(axiosError.response.data.msg);
          });
      },
    });
  }, []);
  return (
    <div className="auth-right">
      <h2 className="auth-title">Đăng ký</h2>
      <form className="auth-form" id="register">
        <div className="row p-28">
          <div className="col p-28 l-6 m-6 c-12">
            <div className="auth-form-control">
              <label htmlFor="email" className="auth-label">
                Email
              </label>
              <input
                spellcheck="false"
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
          </div>
          <div className="col p-28 l-6 m-6 c-12">
            <div className="auth-form-control">
              <label htmlFor="username" className="auth-label">
                Tên người dùng
              </label>
              <input
                spellcheck="false"
                ref={usernameRef}
                onChange={inputHandler}
                type="text"
                className="auth-input"
                placeholder="Nguyễn Văn A"
                id="username"
                name="username"
              />
              <span className="auth-form-msg"></span>
            </div>
          </div>
          <div className="col p-28 l-6 m-6 c-12">
            <div className="auth-form-control">
              <label htmlFor="password" className="auth-label">
                Mật khẩu
              </label>
              <input
                spellcheck="false"
                ref={passwordRef}
                onChange={inputHandler}
                id="password"
                name="password"
                type="password"
                className="auth-input"
              />
              <span className="auth-form-msg"></span>
            </div>
          </div>
          <div className="col p-28 l-6 m-6 c-12">
            <div className="auth-form-control">
              <label htmlFor="password" className="auth-label">
                Nhập lại mật khẩu
              </label>
              <input
                spellcheck="false"
                ref={confirmPasswordRef}
                onChange={inputHandler}
                name="confirmPassword"
                id="confirmPassword"
                className="auth-input"
                type={"password"}
              />
              <span className="auth-form-msg"></span>
            </div>
          </div>
        </div>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-agreement">
          Bằng việc nhấn nút đăng ký, bạn đã đồng ý{" "}
          <span className="auth-agreement-link">các điều khoản sử dụng</span>.
        </p>
        <Button
          type="primary"
          hover="bg-bright"
          size="large"
          className={"auth-btn"}
        >
          Đăng ký
        </Button>
      </form>
      <div className="auth-footer">
        Bạn đã có tài khoản?
        <span className="auth-footer-link" onClick={showLogin}>
          Đăng nhập tại đây.
        </span>
      </div>
    </div>
  );
};
Register.propTypes = {
  showLogin: PropTypes.func,
};
export default Register;
