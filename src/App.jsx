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
  const [userID, setUserID] = React.useState("4");
  const [refreshToken, setRefreshToken] = React.useState("");
  const [accessToken, setAccessToken] = React.useState("");
  const [openedListId, setOpenedListId] = React.useState(null);
  const [shoppingLists, setShoppingLists] = React.useState([]);
  const [editedListId, setEditedListId] = React.useState(null);

  const GetUserLists = async (ID) => {
    var lists = await fetch(
      addr + "/shopping-lists/?owner=" + ID
    ).then((response) => response.json());

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
      setUserName(values.login);
      setAccessToken(apiResponse.access);
      setRefreshToken(apiResponse.refresh);
      setUserID(apiResponse.id);
      GetUserLists(apiResponse.id);
      setTimeout(() => {  setCurrentPage("MainMenu"); }, 1000);
      
    } else if (apiResponseStatus === 401) {
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
  };

  const ListLabelClick = (listId) => {
    setCurrentPage("ListEditPage");
    setOpenedListId(listId);
  };

  const AddNewList = async (values) => {
    console.log(values);
    if (values == "") return;
    const options = {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values,
        owner: userID,
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
  };

  const EditListName = async (listId, newName) => {
    const options = {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        owner: userID,
      }),
    };
    console.log("adding list", options);
    var apiResponseStatus;
    var apiResponse = await fetch(
      addr + `/shopping-lists/edit/${listId}`,
      options
    ).then((response) => {
      apiResponseStatus = response.status;
      return response.json();
    });

    if (apiResponseStatus === 200) {
      GetUserLists(userID);
    }
  };

  const DeleteList = async (values) => {
    console.log(values);
    const options = {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    };

    await fetch(addr + "/shopping-lists/" + values + "/", options);
    GetUserLists(userID);
  };

const DeleteAccount = async () =>{
  console.log('del');

  const options = {
    method: "delete",
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  };

  await fetch(addr + "/auth/delete/" + userID, options);
  setCurrentPage("LoginPage");
  setUserName("");
  setShoppingLists("");
  setUserID("");
  setAccessToken("");
  setRefreshToken("");
    
}

const AddNewItem = async (values) => {
  console.log(values);

    if (values == "") return;

    const options = {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values,
        content: values,
        shopping_list: openedListId,
        is_bought: false
      }),
    };
    console.log("addding item", options);
    var apiResponseStatus;
    var apiResponse = await fetch(addr + "/items/", options).then(
      (response) => {
        apiResponseStatus = response.status;
        return response.json();
      }
    );

    if (apiResponseStatus === 201) {
      setOpenedListId("");
      setOpenedListId(openedListId);
    }
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
        <MainMenu
          username={userName}
          editedListId={editedListId}
          onLogoutClick={() => LogoutClick()}
          shoppingLists={shoppingLists}
          onLabelClick={ListLabelClick}
          onAddNewListClick={(values) => AddNewList(values)}
          onListDeleteClick={(values) => DeleteList(values)}
          onListNameEdited={EditListName}
          onAccountDeleteClick={DeleteAccount}
        />
      )}
      {currentPage === "ListEditPage" && (
        <ListEditPage
          username={userName}
          listId={openedListId}
          onBackClick={() => {setCurrentPage("MainMenu"); setOpenedListId("");}}
          userId={userID}
          listName={shoppingLists.find(({ id }) => openedListId === id)?.name}
          onAddNewItemClick={(values) => AddNewItem(values)}
        />
      )}
    </div>
  );
}

export default App;
