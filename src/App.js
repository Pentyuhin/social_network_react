import React from "react";
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Footer from "./components/Footer/Footer";
import {
    Routes,
    Route,
} from 'react-router-dom';
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfilesContainer from "./components/Profiles/ProfilesContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";


function App(props) {
  return (
    <div className="App">

            <div className='wrapper'>
                <div className='wrapper-container'>
                    <HeaderContainer/>
                    <NavBar/>
                    <div className='wrapper-container-profile'>
                        <Routes>
                            <Route path="/:userId" element={<ProfilesContainer/>}/>
                            <Route path="/messages" element={<MessagesContainer/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<Login/>}/>

                        </Routes>
                    </div>
                    <Footer/>
                </div>
            </div>

    </div>
  );
}

export default App;
