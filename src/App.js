import React from 'react';
import './App.css';
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage';
import MainMenu from './MainMenu';
function App() {

  const [currentPage, setCurrentPage] = React.useState("LoginPage");

  return (
    <div className="App">
      {/* {currentPage==="LoginPage" && <LoginPage onSignUpClick={() => setCurrentPage("RegisterPage")}/>} */}
      {/* {currentPage==="RegisterPage" && <RegisterPage onBackClick={() => setCurrentPage("LoginPage")} />} */}
      <MainMenu username="Matt"/>
    </div>
  );
}

export default App;
