import React, { useState } from "react";
import css from "./LoginPage.module.css";
import img from "../img/bg.jpg";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogging, setKeepLogging] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const inputs = {
    userid: userId,
    password: password,
    keepLogging: keepLogging,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      toast.success("Loggin Success!");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.container}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={css.left}>
        <img src={img} alt="BackgroundImage" />
      </div>
      <div className={css.right}>
        <div className={css.card}>
          <h3>Welcome to Contact Note,</h3>
          <h3>Sign In to Continue.</h3>
          <div className={css.texts}>
            <p>
              Don't have an account?{" "}
              <Link to={"/register"}>Create a account</Link>
            </p>

            <p>It takes less than a minute.</p>
          </div>
          <form className={css.form} onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <div className={css.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div onClick={toggleShowPassword} className={css.icons}>
                {!showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
              </div>
            </div>
            <div className={css.login}>
              <label htmlFor="keepLoggedIn" className={css.checkbox}>
                Keep Logged In
              </label>{" "}
              <input
                type="checkbox"
                id="keepLoggedIn"
                name="keepLoggedIn"
                onChange={() => setKeepLogging(!keepLogging)}
              />
            </div>

            <button type="submit" className={css.btn}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
