import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {Navigation} from "./components/shared/Navigation/Navigation";
import {Register} from "./pages/Register/Register";
import {Login} from "./pages/Login/Login";
import {Authenticate} from "./pages/Authenticate/Authenticate";
import {Activate} from "./pages/Activate/Activate";
import {Rooms} from "./pages/Rooms/Rooms";

const isAuth = false;
const user = {
    activated: false
}

function App() {
    return <BrowserRouter>
        <Navigation/>
        <Switch>
            <GeustRoute path="/" exact>
                <Home/>
            </GeustRoute>
            <GeustRoute path="/authenticate">
                <Authenticate/>
            </GeustRoute>
            <SamiProtectedRoute path="/activate">
                <Activate/>
            </SamiProtectedRoute>
            <ProtectedRoute path="/rooms">
                <Rooms/>
            </ProtectedRoute>

            {/*<Route path="/register">*/}
            {/*    <Register/>*/}
            {/*</Route>*/}
            {/*<Route path="/login">*/}
            {/*    <Login/>*/}
            {/*</Route>*/}
        </Switch>
    </BrowserRouter>
}

const GeustRoute = ({children, ...rest}) => {

    return (
        <Route {...rest}
               render={({location}) => {
                   return isAuth ?
                       <Redirect to={{
                           pathname: '/rooms',
                           state: {from: location}
                       }}/>
                       : (
                           children
                       )
               }}>
        </Route>
    )
}

const SamiProtectedRoute = ({children, ...rest}) => {
    return (
        <Route {...rest}
               render={({location}) => {
                   return !isAuth ? (
                       <Redirect to={{
                           pathname: '/',
                           state: {from: location}
                       }}/>
                   ) : (isAuth && !user.activated ? (children) :
                           <Redirect to={{
                               pathname: '/rooms',
                               state: {from: location}
                           }}/>
                   )
               }}>
        </Route>
    )
}

const ProtectedRoute = ({children, ...rest}) => {
    return (
        <Route {...rest}
               render={({location}) => {
                   return !isAuth ? (
                       <Redirect to={{
                           pathname: '/',
                           state: {from: location}
                       }}/>
                   ) : (isAuth && !user.activated ? (
                           <Redirect to={{
                               pathname: '/activate',
                               state: {from: location}
                           }}/>
                       ) : (
                           children
                       )

                   )
               }}>
        </Route>
    )
}

export default App;
