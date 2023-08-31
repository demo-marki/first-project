import React, {Component, Suspense, lazy} from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import News from "./components/News/News.tsx";
import Music from "./components/Music/Music.tsx";
import Settings from "./components/Settings/Settings.tsx";
import ProfileContainer from "./components/Profile/ProfileContainer.tsx";
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
import {LoginPage} from "./components/Login/LoginPage.tsx";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer.ts";
import Preloader from "./components/common/Preloader/Preloader.tsx";
import store, {AppStateType} from "./redux/redux-store.ts";
import {UsersPage} from "./components/Users/UsersContainer.tsx";
const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer.tsx"));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

//function App() {
class App extends Component<MapPropsType & DispatchPropsType, any> {
    catchAllUnhandledErrors = () => {
        alert("Some error occurred");
        //console.error(promiseRejectionEvent);
    }
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized)
            return <Preloader />

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/news' element={<News/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/users' element={<UsersPage/>}/>
                            <Route path='/login' element={<LoginPage />}/>
                            <Route path='*' element={<div>404 NOT FOUND</div>} />
                            <Route path='/' element={<Navigate to="/profile" />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps,{initializeApp})(App);

const MainApp: React.FC = () => {
    return <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
}

export default MainApp;
