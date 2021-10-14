import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import Login from "./pages/Account/Login";
import Signup from "./pages/Account/SignUp";

import Main from "./pages/Main";
import Search from "./pages/Search";
import Setting from "./pages/Setting";

import Board from "./pages/Board/Main";
import BoardCategory from "./pages/Board/BoardCategory";
import BoardDetail from "./pages/Board/BoardDetail";
import BoardPost from "./pages/Board/Post";

import Messsage from "@Pages/Message/Main";
import MessageDetail from "@Pages/Message/Detail";

import Mypage from "./pages/Mypage/Main";
import Edit from "./pages/Mypage/Edit";
import Auth from "./pages/Mypage/Auth";
import AuthDetail from "./pages/Mypage/AuthDetail";

import NotFound from "@Pages/NotFound";

import { COLORS } from "@Component/Colors";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogin = async () => {
      const result = await axios("/api/user");

      if (result.data.success) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setIsLoading(false);
    };
    fetchLogin();
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <div className="arrange-center-center" style={{ marginTop: "150px" }}>
          <ClipLoader color={COLORS.red} />
        </div>
      ) : (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          {isLogin ? (
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/setting" component={Setting} />

              <Route exact path="/board" component={Board} />
              <Route
                exact
                path="/board/list/:category"
                component={BoardCategory}
              />
              <Route exact path="/board/detail/:id" component={BoardDetail} />
              <Route exact path="/board/post/:id" component={BoardPost} />

              <Route exact path="/message" component={Messsage} />
              <Route
                exact
                path="/message/detail/:id"
                component={MessageDetail}
              />

              <Route exact path="/mypage" component={Mypage} />
              <Route exact path="/mypage/edit" component={Edit} />
              <Route exact path="/mypage/auth" component={Auth} />
              <Route exact path="/mypage/auth/detail" component={AuthDetail} />

              <Route path="*" component={NotFound} />
            </Switch>
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;
