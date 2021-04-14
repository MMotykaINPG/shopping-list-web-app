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
  const [userID, setUserID] = React.useState("");
  const [refreshToken, setRefreshToken] = React.useState("");
  const [accessToken, setAccessToken] = React.useState("");
  const [openedListName, setOpenedListName] = React.useState("");
  const [shoppingLists, setShoppingLists] = React.useState("");


  const GetUserLists = async (ID) => {
    console.log(ID);
    var lists = await fetch(addr+'/shopping-lists/?owner='+ID).then((response) => response.json());

    lists.length === 0 ? setShoppingLists("") : setShoppingLists(lists);

  };

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
      console.log(apiResponse,values)
      setUserName(values.login);
      setAccessToken(apiResponse.access);
      setRefreshToken(apiResponse.refresh);
      setUserID(apiResponse.id);
      GetUserLists(apiResponse.id);
      setCurrentPage("MainMenu");
    }
    else if (apiResponseStatus === 401)
    {
      alert(Object.values(apiResponse).flat().join("\n"));
    } else {
      console.log(apiResponseStatus);
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
    setShoppingLists("");
    setUserID("");
    setAccessToken("");
    setRefreshToken("");
    setCurrentPage("LoginPage");
  }

  const ListLabelClick = async (values) => {
    console.log(values)
    setOpenedListName(shoppingLists[values-1].name);
    setCurrentPage("ListEditPage");
  }

  const AddNewList = async (values) => {
    console.log(values);
    if(values=="")
      return;
    const options = {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values,
        owner: userID
      }),
    };
    console.log("adding list", options);
    var apiResponseStatus;
    var apiResponse = await fetch(addr + "/shopping-lists/", options).then(
      (response) => {
        apiResponseStatus = response.status;
        return response.json();
      }
    );

    if (apiResponseStatus === 201) {
      GetUserLists(userID);
    } 
  }

  const DeleteList = async (values) => {
    console.log(values);
    const options = { 
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      }
    } 

    await fetch(addr+'/shopping-lists/'+values+"/", options)
    GetUserLists(userID);
  }
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
        <MainMenu username={userName} 
          onLogoutClick={() => LogoutClick()} 
          shoppingLists={shoppingLists}
          onLabelClick={(values) => ListLabelClick(values)}
          onAddNewListClick={(values) => AddNewList(values)}
          onListDeleteClick={(values) => DeleteList(values)}/>
      )}
      {currentPage === "ListEditPage" && (
        <ListEditPage
          username={userName}
          listName={openedListName}
          onBackClick={() => setCurrentPage("MainMenu")}
        />
      )}
    </div>
  );
}

export default App;
