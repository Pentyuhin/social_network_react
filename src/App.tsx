import React, {ComponentType} from "react";
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
import {UsersPage} from "./components/Users/UsersContainer";
import ProfilesContainer, {withRouter} from "./components/Profiles/ProfilesContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";
import { Login } from "./components/Login/Login";
import Header from "./components/Header/Header";
import ChatPage from "./pages/Chat/Chat";


type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    initializeApp: () => void
}


class App extends React.Component<MapPropsType & DispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized){
            return <Preloader/>
        }
        return (
            <div className="App">
                <div className='wrapper'>
                    <div className='wrapper-container'>
                        <Header/>
                        <NavBar/>
                        <div className='wrapper-container-profile'>
                            {/*<Switch>*/}
                                <Routes>
                                    {/*<Route path="/:userId" render={ () => <ProfilesContainer/>}/>*/}
                                    <Route path="/:userId?" element={<ProfilesContainer/>}/>
                                    <Route path="/messages" element={<MessagesContainer/>}/>
                                    <Route path="/news" element={<News/>}/>
                                    <Route path="/settings" element={<Settings/>}/>
                                    <Route path="/users" element={<UsersPage/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/chat" element={<ChatPage/>}/>
                                </Routes>
                            {/*</Switch>*/}
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
