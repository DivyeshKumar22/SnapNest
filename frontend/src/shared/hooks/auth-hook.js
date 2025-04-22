import { useState, useCallback, useEffect, useRef } from "react";
export const UseAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const logoutTimerRef = useRef();
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    const tokenExpDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hour fallback
    setTokenExpirationDate(tokenExpDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    // console.log("Logging out due to token expiration");
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      // console.log("Setting logout timer for", remainingTime / 1000, "seconds");
      logoutTimerRef.current = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimerRef.current);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);
  return { token, login, logout, userId };
};
