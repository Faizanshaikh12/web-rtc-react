import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {Navigation} from "./components/shared/Navigation/Navigation";
import {Authenticate} from "./pages/Authenticate/Authenticate";
import {Activate} from "./pages/Activate/Activate";
import {Rooms} from "./pages/Rooms/Rooms";
import {useSelector} from "react-redux";
import {useLoadingWithRefresh} from "./hooks/useLoadingWithRefresh";
import {Loader} from "./components/shared/Loader/Loader";
import Room from "./pages/Room/Room";

// const isAuth = false;
// const user = {
//     activated: false
// }

function App() {
    const {loading} = useLoadingWithRefresh();

    return loading ? (<Loader message="Loading, please wait..."/>) : (
        <BrowserRouter>
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
                <ProtectedRoute path="/room/:id">
                    <Room/>
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    )
}

const GeustRoute = ({children, ...rest}) => {
    const {isAuth} = useSelector((state) => state.auth)
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
    const {isAuth, user} = useSelector((state) => state.auth)
    return (
        <Route {...rest}
               render={({location}) => {
                   return !isAuth ? (
                       <Redirect to={{
                           pathname: '/',
                           state: {from: location}
                       }}/>
                   ) : isAuth && !user.activated ? (children) : (
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
    const {isAuth, user} = useSelector((state) => state.auth)
    return (
        <Route {...rest}
               render={({location}) => {
                   return !isAuth ? (
                       <Redirect to={{
                           pathname: '/',
                           state: {from: location}
                       }}/>
                   ) : isAuth && !user.activated ? (
                           <Redirect to={{
                               pathname: '/activate',
                               state: {from: location}
                           }}/>
                       ) : (children);
               }}>
        </Route>
    )
}

export default App;
