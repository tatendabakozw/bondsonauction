import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import {db} from '../../auth/firebase'

function Signup(props) {

  const history = useHistory()
    const [{user}] = useStateValue()
    const [userinfo, setUserinfo] = useState({
    username: "",
    phonenumber: "",
    bankname: "",
    accountnumber: "",
    firstname: "",
    lastname: "",
    address: "",
    // role: 'user'

  });

  const onChange = (e) => {
    setUserinfo({ ...userinfo, [e.target.name]: e.target.value });
  };


  const onSubmit = (e) => {
    e.preventDefault();
    db.collection("users").add({
      username: userinfo.username,
      phonenumber: userinfo.phonenumber,
      bankname: userinfo.bankname,
      lastname: userinfo.lastname,
      firstname: userinfo.firstname,
      accountnumber: userinfo.accountnumber,
      // role: userinfo.role
    }).then(()=>{
      alert('User Info Added ...')
      history.push('/dashboard')
    }).catch((err)=>{
      alert(err.message)
    })
  };

  return (
    <Container className="py-3 w-75">
      <Card>
        <CardHeader>
          <h4>Welcome <stron>{user?.email}</stron></h4>
          <hr />
          <p>Enter Information About Your Account</p>
        </CardHeader>
        <CardBody>
          <Row style={{ marginTop: "2rem" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col md={6}>
                    <small>First Name</small>
                    <input
                      className="form-control mb-3"
                      label="first name"
                      placeholder="First Name"
                      value={userinfo.firstname}
                      type="text"
                      name="firstname"
                      onChange={onChange}
                    />
                  </Col>
                  <Col md={6}>
                    <small>Last Name</small>
                    <input
                      className="form-control mb-3"
                      label="last name"
                      placeholder="Last Name"
                      value={userinfo.lastname}
                      type="text"
                      name="lastname"
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <input
                  className="form-control mb-3"
                  label="Phone Number"
                  name="phonenumber"
                  placeholder="+27"
                  value={userinfo.phonenumber}
                  type="text"
                  onChange={onChange}
                />
                <small>Username</small>
                <input
                  className="form-control mb-3"
                  label="username"
                  name="username"
                  placeholder="Username"
                  value={userinfo.username}
                  type="text"
                  onChange={onChange}
                />
                <small>Address</small>

                <input
                  className="form-control mb-3"
                  label="Physical Address"
                  name="address"
                  placeholder="15002 Zengeza 3 Ext"
                  value={userinfo.address}
                  type="text"
                  onChange={onChange}
                />
                <small>Bank Name</small>

                <input
                  className="form-control mb-3"
                  label="Bank Name"
                  name="bankname"
                  placeholder="bancABC"
                  value={userinfo.bankname}
                  type="text"
                  onChange={onChange}
                />
                <small>Account Number</small>

                <input
                  className="form-control mb-3"
                  label="Account Number"
                  name="accountnumber"
                  placeholder="Bank Account Number"
                  value={userinfo.accountnumber}
                  type="text"
                  onChange={onChange}
                />

                {/* <Form.Check
                type="checkbox"
                label={<small>I agree to Claimant Terms and Conditions</small>}
              /> */}
                <Button variant="primary" type="submit">
                  Continue
                </Button>
              </Form>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Signup;
