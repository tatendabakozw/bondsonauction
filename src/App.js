import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './components/SignUp/SignUp';
import Signin from './components/SignIn/SignIn';
import UserInfo from './components/UserInfo/UserInfo';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './auth/firebase';
import PrivateRoute from './auth/PrivateRoute';
import Header from './components/Header/Header';
import dashboard from './components/dashboard/Dashboard/dashboard';
import Bids from './components/dashboard/Bids/Bids';
import AddBids from './components/dashboard/AddBid/AddBid'
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Account from './components/dashboard/Account/Account';
import Home from './components/Home/Home'

function App() {

  const [{user}, dispatch] = useStateValue()

  //to capture state of user
  useEffect(()=>{ 
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //then the user is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        //the user is logged in
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
    return () =>{
      unsubscribe();
    }
  },[])

    // console.log(user)
  return (
    <div className="App">
        <BrowserRouter>
          <Header/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/account' component={Account}/>
            <Route path='/passwordreset' component={ForgotPassword}/>
            <PrivateRoute path='/setbid' component={AddBids} />
            <Route path='/bids' component={Bids}/>
            <PrivateRoute path='/userinfo'component={UserInfo} />
            <Route path='/dashboard' component={dashboard} />
            <Route path='/signin' component={Signin} />
            <Route path='/register'component={Signup} />            
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
