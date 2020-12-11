import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'

function Home(props) {

    const register = () =>{
        props.history.push('/register')
    }

    
    return (
      <div className="home">
        <div className="home_buttons">
          <div className="home__banner">
            <h1>Your Online Bond Auction</h1>
          </div>
          <div className="home__btn">
            <Link to="/signin">
              <button className="btn btn-lg btn-primary" >
                Login
              </button>
            </Link>
            <Link to='/register'>
                <button className="btn btn-lg btn-secondary">
                Register
                </button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default Home