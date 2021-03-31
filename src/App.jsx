import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MainMenu from "./MainMenu";
import ListEditPage from "./ListEditPage";

const addr = "https://shop-app-list.herokuapp.com";

function App() {
  const [currentPage, setCurrentPage] = React.useState("LoginPage");
  const [userName, setUserName] = React.useState("");
  const [refreshToken, setRefreshToken] = React.useState("");
  const [accessToken, setAccessToken] = React.useState("");

  const SignInClick = async (values) => {
    const options = {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.login,
        password: values.password,
      }),
    };

    var apiResponseStatus;
    var apiResponse = await fetch(addr + "/auth/login/", options).then(
      (response) => {
        apiResponseStatus = response.status;
        return response.json();
      }
    );

    if (apiResponseStatus === 200) {
      setUserName(values.login);
      setAccessToken(apiResponse.access);
      setRefreshToken(apiResponse.refresh);
      setCurrentPage("MainMenu");
    }
  };

  const SignUpClick = async (values) => {
    const options = {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.login,
        password: values.password,
        password2: values.passwordConfirmation,
        first_name: "",
        last_name: "",
        email: "",
      }),
    };
    console.log("creating account", options);
    var apiResponseStatus;
    var apiResponse = await fetch(addr + "/auth/register/", options).then(
      (response) => {
        apiResponseStatus = response.status;
        return response.json();
      }
    );

    if (apiResponseStatus === 201) {
      setCurrentPage("LoginPage");
    } else if (apiResponseStatus === 400) {
      alert(Object.values(apiResponse).flat().join("\n"));
    } else {
      console.log(apiResponseStatus);
    }
  };

  const LogoutClick = () => {
    /* eslint-disable no-restricted-globals */
    if (!confirm("Logout?")) return;

    setUserName("");
    setAccessToken("");
    setRefreshToken("");
    setCurrentPage("LoginPage");
  };

  return (
    <div className="App">
      {currentPage === "LoginPage" && (
        <LoginPage
          onSignUpClick={() => setCurrentPage("RegisterPage")}
          onSignInClick={(values) => SignInClick(values)}
        />
      )}
      {currentPage === "RegisterPage" && (
        <RegisterPage
          onBackClick={() => setCurrentPage("LoginPage")}
          onSignUpClick={(values) => SignUpClick(values)}
        />
      )}
      {currentPage === "MainMenu" && (
        <MainMenu username={userName} onLogoutClick={() => LogoutClick()} />
      )}
      {currentPage === "ListEditPage" && (
        <ListEditPage
          username="Matt"
          listName="ListA"
          onBackClick={() => setCurrentPage("MainMenu")}
        />
      )}
    </div>
  );
}

export default App;
