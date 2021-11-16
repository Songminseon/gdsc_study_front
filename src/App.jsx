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
import AuthRoute from "@Hooks/AuthRoute";
import LoginRoute from "@Hooks/PrivateRoute";

import WholeLoading from "@Component/WholeLoading";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isShowLoading, setIsShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowLoading(false);
      // console.log("cut!");
    }, 500);

    const fetchLogin = async () => {
      const result = await axios("/api/user");

      if (result.data.success) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    };
    fetchLogin();
    return clearTimeout(() => timeout);
  }, []);

  return (
    <BrowserRouter>
      {isShowLoading ? (
        <WholeLoading />
      ) : (
        <Switch>
          <LoginRoute authenticated={isLogin} exact path="/login" component={Login} />
          <LoginRoute authenticated={isLogin} exact path="/signup" component={Signup} />

          <AuthRoute authenticated={isLogin} exact path="/" component={Main} />
          <AuthRoute authenticated={isLogin} exact path="/search" component={Search} />
          <AuthRoute authenticated={isLogin} exact path="/setting" component={Setting} />

          <AuthRoute authenticated={isLogin} exact path="/board" component={Board} />
          <AuthRoute
            authenticated={isLogin}
            path="/board/list/:category"
            component={BoardCategory}
          />
          <AuthRoute authenticated={isLogin} path="/board/detail/:id" component={BoardDetail} />
          <AuthRoute authenticated={isLogin} path="/board/post/:id" component={BoardPost} />

          <Route exact path="/message" component={Messsage} />
          <Route exact path="/message/detail/:id" component={MessageDetail} />

          <Route exact path="/mypage" component={Mypage} />
          <Route exact path="/mypage/edit" component={Edit} />
          <Route exact path="/mypage/auth" component={Auth} />
          <Route exact path="/mypage/auth/detail" component={AuthDetail} />

          <Route path="*" component={NotFound} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;
