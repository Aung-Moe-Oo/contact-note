import React, { useState } from "react";
import css from "./RegisterPage.module.css";
import img from "../img/bg.jpg";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../requestMethod";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Your passwords do not match.");
    } else {
      request
        .post("/auth/register", {
          userid: userId,
          password: password,
        })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.container}>
      <div className={css.left}>
        <img src={img} alt="BackgroundImage" />
      </div>
      <div className={css.right}>
        <div className={css.card}>
          <h3>Welcome to Contact Note,</h3>
          <h3>Sign In to Continue.</h3>
          <div className={css.texts}>
            <p>
              Already have an account? <Link to={"/login"}>Login account</Link>
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

            <label htmlFor="password2">Confirm Password</label>
            <div className={css.passwordWrapper}>
              <input
                id="password2"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div onClick={toggleShowPassword} className={css.icons}>
                {!showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
              </div>
            </div>
            <button type="submit" className={css.btn}>
              Register
            </button>
          </form>
          {error && <div className={css.error}>{error.message}</div>}
          {passwordError.length > 0 && (
            <div className={css.error}>{passwordError}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
