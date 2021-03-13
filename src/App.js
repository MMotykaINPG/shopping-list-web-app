import React from 'react';
import './App.css';
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage';

function App() {

  const [currentPage, setCurrentPage] = React.useState("LoginPage");

  return (
    <div className="App">
      {currentPage==="LoginPage" && <LoginPage onSignUpClick={() => setCurrentPage("RegisterPage")}/>}
      {currentPage==="RegisterPage" && <RegisterPage onBackClick={() => setCurrentPage("LoginPage")} />}
    </div>
  );
}

export default App;
