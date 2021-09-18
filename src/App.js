import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./components/auth/Login";
import Quora from "./components/Quora";
import StudentProfile from "./components/StudentProfile"
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/profile";
function App() {
  const user = useSelector(selectUser);
  console.log(user)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photo: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
      localStorage.setItem("sender",user.email)
    });
  }, [dispatch]);
  return (
    <div className="App">
      {user ? (
        <switch>
          <Route path="/" component={Quora} exact />
          <Route path="/profile/:id" component={Profile} exact />
          <Route path="/profile/student/:id" component={StudentProfile} exact />

        </switch>
      ) : (
        <Login />
      )}
    </div>
  );
}

 export const email = ""; 



export default App;
