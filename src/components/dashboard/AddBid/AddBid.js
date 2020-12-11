import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Container } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import "./AddBids.css";
import { db } from "../../../auth/firebase";

/**
 * @author Tatenda Bako
 * @function Products
 **/

const Products = (props) => {

  const [dets, setDets] = useState({
    phonenumber: '',
    bidder:'',
    amount: 0,
    daystimaturity: 0,
    bankname:'',
    status: 'Available'
  })

  const onChange = (e) =>{
    setDets({ ...dets, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    db.collection("bid").add({
      phonenumber: dets.phonenumber,
      bidder: dets.bidder,
      amount: dets.amount,
      daystimaturity: dets.daystimaturity,
      bankname: dets.bankname,
      status: dets.status 
     
    }).then(()=>{
      alert('Bid Placed Successfully ...')
    }).catch((err)=>{
      alert(err.message)
    })
  }

  return (
    <div className="addbids">
      <div className="addbids__sidebar">
        <Sidebar />
      </div>
      <div className="addbids__body">
        <Container className="py-5 mx-2">
          <form action="submit"onSubmit={onSubmit} >
            <Card>
              <CardHeader>Place Bid</CardHeader>
            </Card>
            <Card>
              <CardBody>
                <Row md="12">
                  <Col>
                    <label>Bidder</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name='bidder'
                      value={dets.bidder}
                      onChange={onChange}  
                    />
                  </Col>
                </Row>
                <Row md="12">
                  <Col>
                    <label>Bank Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="bank name" 
                      name='bankname'
                      value={dets.bankname}
                      onChange={onChange}  
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name='phonenumber'
                      value={dets.phonenumber}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Due Date</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={dets.daystimaturity}
                      name='daystimaturity'
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Amount</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name='amount'
                      value={dets.amount}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <button type="submit" className="btn btn-primary mt-4">
                  Post Bid
                </button>
              </CardBody>
            </Card>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Products;
