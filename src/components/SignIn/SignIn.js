import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { CardBody, CardHeader } from "reactstrap";
import { auth } from "../../auth/firebase";
import firebase from 'firebase'
import Cookies from 'js-cookies'
var provider = new firebase.auth.GoogleAuthProvider();

function Signin(props) {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };


  const registerWithGoogle =(e) =>{
    firebase.auth()
   
   .signInWithPopup(provider).then( async function(result) {
    var isNewUser = result.additionalUserInfo.isNewUser;
      const token = await auth?.currentUser?.getIdToken(true);
    if(token){
        localStorage.setItem("@token", token);
        Cookies.setItem('access_token', token)
         history.push('/dashboard')
    }else{
      history.push('/')
    }
   }).catch(function(error) {	
      console.log(error.code)
      console.log(error.message)
   });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then((auth) => {
        //login and redirect to homepage
        history.push('/dashboard')
      })
      .catch((e) => alert(e.message));
  };


  return (
    <Container>
      <Row style={{ marginTop: "2rem" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <h3>Welcome Back !</h3>
            </CardHeader>
            <CardBody>
              <h3 style={{ textAlign: "center" }}>Sign In</h3>
                <button className="btn btn-outline-danger btn-lg w-100"  onClick={registerWithGoogle}>
                Sign in with Google
              </button>
              <p style={{ textAlign: "center" }}>or</p>
              <Form onSubmit={onSubmit}>
                <small>Email</small>
                <input
                  className="form-control mb-3 fas fa-user"
                  label="Email"
                  name="email"
                  placeholder="Email"
                  value={creds.email}
                  type="email"
                  onChange={onChange}
                />
                <small>Password</small>
                <input
                  className="form-control mb-3"
                  label="Password"
                  name="password"
                  placeholder="Password"
                  value={creds.password}
                  type="password"
                  onChange={onChange}
                />
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">Create An Account</Link>
                </p>
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </Form>
              <small><Link to="/passwordreset">Forget Password?</Link></small>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signin;
