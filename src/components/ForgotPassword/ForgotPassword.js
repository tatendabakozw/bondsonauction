import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import { CardBody, CardHeader } from "reactstrap";
import { auth } from "../../auth/firebase";
import firebase from 'firebase'
import Message from "../../Helpers/Message";

function ForgotPassword(props) {

    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState(null)

    const onSubmit = (e) =>{
        auth.sendPasswordResetEmail(email).then((so)=>{
            setErrMsg('Open Email for Further Instructions')
        },(err)=>{
            setErrMsg('Failed To Reset Password')
        }) 
    }
  return (
    <Container>
      <Row style={{ marginTop: "2rem" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
              {errMsg ? <Message/> : null}
            <CardHeader>
              <h3>Reset Password</h3>
            </CardHeader>
            <CardBody>             
              <Form onSubmit={onSubmit}>
                <small>Email</small>
                <input
                  className="form-control mb-3 fas fa-user"
                  label="Email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  type="email"
                  onChange={e=>setEmail(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Reset Password
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
