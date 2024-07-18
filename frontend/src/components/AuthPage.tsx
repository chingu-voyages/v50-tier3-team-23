import React, { useEffect, useState } from "react";

import { UserType } from "../utils/types";
import { signUp, getAllUsers, login } from "../utils/actions";
import { useCookies } from "react-cookie";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState<UserType>();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [error, setError] = useState(null);
  const userEmail = cookie.Email;
  const authToken = cookie.AuthToken;

  useEffect(() => {
    showUsers();
    console.log("cookies: ", cookie);
    console.log("user email: ", userEmail);
  }, []);

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await signUp({ email, password });
    console.log("Response received:", response);
    if (response.status !== 200) {
      setError(response.error);
    } else {
      setCookie("Email", response.user_email);
      setCookie("AuthToken", response.token);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
      setError(null);
      window.location.reload();
    }
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await login({ email, password });
    console.log("Response received:", response);
    if (response.status !== 200) {
      setError(response.error);
    } else {
      console.log("error: ", error);
      setCookie("Email", response.user_email);
      setCookie("AuthToken", response.token);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
      setError(null);
      window.location.reload();
    }
  };

  const showUsers = async () => {
    const response = await getAllUsers();
    setUsers(response);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  return (
    <>
      <div className="">
        {userEmail ? (
          <div className="flex w-full flex-col">Hello, {userEmail}</div>
        ) : (
          <div>Not logged in</div>
        )}
      </div>
      <form className="border-black border-2">
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!cookie.Email && (
          <button onClick={(e) => handleSignUp(e)}>Sign Up</button>
        )}
        {!cookie.Email ? (
          <button onClick={(e) => handleLogin(e)}>Login</button>
        ) : (
          <button onClick={(e) => handleLogout(e)}>Logout</button>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </>
  );
};

export default AuthPage;
