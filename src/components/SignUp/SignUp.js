import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../auth/firebase";
import firebase from 'firebase'
import Message from "../../Helpers/Message";
var provider = new firebase.auth.GoogleAuthProvider();


function Signup(props) {
    const history = useHistory()
  const [userinfo, setUserinfo] = useState({
      password: '',
      email: '',
      password2:''
  })
  const [errMsg, setErrMSg] = useState(null)

  const onChange = (e) =>{
    setUserinfo({ ...userinfo, [e.target.name]: e.target.value });
  }

  const registerWithGoogle =(e) =>{
    firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      history.push('/userinfo')
   }).catch(error => {
    switch (error.code) {
       case 'auth/email-already-in-use':
         history.push('/dashboard')
         break;
       case 'auth/operation-not-allowed':
         setErrMSg(`Error during sign up.`);
         break;
       default:
         setErrMSg(error.message);
         break;
     }
  })
 }

  const onSubmit = (e) =>{
    e.preventDefault()
    if(userinfo.password !== userinfo.password2){
      setErrMSg('passwords do not match')
    }else{
      auth.createUserWithEmailAndPassword(userinfo.email, userinfo.password).then((auth)=>{
        history.push('/userinfo')
        }).catch(error => {
          switch (error.code) {
             case 'auth/email-already-in-use':
               setErrMSg(`Email address ${userinfo.email} already in use.`);
               break;
             case 'auth/invalid-email':
               setErrMSg(`Email address ${userinfo.email} is invalid.`);
               break;
             case 'auth/operation-not-allowed':
               setErrMSg(`Error during sign up.`);
               break;
             case 'auth/weak-password':
               setErrMSg('Password is not strong enough. Add additional characters including special characters and numbers.');
               break;
             default:
               setErrMSg(error.message);
               break;
           }
       })
    }
       
    }

  return (
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md={{ span: 6, offset: 3 }}>
            {errMsg? <Message err={errMsg} /> : null}
          <button onClick={registerWithGoogle}
              className="btn btn-outline-danger btn-lg w-100">
              Register with Google             
            </button>
            <p style={{textAlign: 'center'}}>or</p>
            <Form onSubmit={onSubmit}>            
              <hr/>
            <small>Email</small>
              <input
                className="form-control mb-3"
                label="Email"
                name='email'
                placeholder="test@test.com"
                value={userinfo.email}
                type="email"
                onChange={onChange}
              />
            <small>Password</small>
              <input
                className="form-control mb-3"
                label="password"
                name='password'
                placeholder="Password"
                value={userinfo.password}
                type="password"
                onChange={onChange}
              />
              <small>Confirm Password</small>
              <input
                className="form-control mb-3"
                label="Confirm Password"
                name='password2'
                placeholder="Confirm Password"
                value={userinfo.password2}
                type="password"
                onChange={onChange}
              />
              <p>
                Already have an account? <Link to="/signin">Login</Link>
              </p>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
}

export default Signup;