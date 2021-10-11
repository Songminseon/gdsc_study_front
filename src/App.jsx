import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Account/Login";
import Signup from "./pages/Account/SignUp";

import Main from "./pages/Main";
import Search from "./pages/Search";
import Setting from "./pages/Setting";

import Board from "./pages/Board/Main";
import BoardCategory from "./pages/Board/BoardCategory";
import BoardDetail from "./pages/Board/BoardDetail";
import BoardPost from "./pages/Board/Post";

import Messsage from "./pages/Message";
import MessageDetail from "./pages/MessageDetail";

import Mypage from "./pages/Mypage/Main";
import Edit from "./pages/Mypage/Edit";
import Auth from "./pages/Mypage/Auth";
import AuthDetail from "./pages/Mypage/AuthDetail";

import NotFound from "@Pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        <Route exact path="/" component={Main} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/setting" component={Setting} />

        <Route exact path="/board" component={Board} />
        <Route exact path="/board/list/:category" component={BoardCategory} />
        <Route exact path="/board/detail/:id" component={BoardDetail} />
        <Route exact path="/board/post/:id" component={BoardPost} />

        <Route exact path="/message" component={Messsage} />
        <Route exact path="/message/:pk" component={MessageDetail} />

        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/mypage/edit" component={Edit} />
        <Route exact path="/mypage/auth" component={Auth} />
        <Route exact path="/mypage/auth/detail" component={AuthDetail} />

        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
