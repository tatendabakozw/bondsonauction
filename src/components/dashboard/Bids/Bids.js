import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import "./Bids.css";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { db } from "../../../auth/firebase";
import Timer from "../../Timer/Timer";


function Bids() {
  const [bids, setBids] = useState()

  useEffect(() => {
    const data = [];
    db.collection("bid").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      setBids(data);
    });
  }, []);

  return (
    <div className="Bids">
      <div className="bids__sidebar">
        <Sidebar />
      </div>
      <div className="bids__body">
        <Container>
          <Row>
          <div className="countdown m-4">
                <Card>
                  <CardHeader>
                  <h6>Time To Due Date</h6>
                  </CardHeader>
                  <CardBody>
                  {bids? <Timer/>: null}
                  </CardBody>
                </Card>
              </div>
            <Col md="12">
              <Card className="mt-4">
                <CardHeader>
                  <h5 className="title">Available Auctions</h5>
                  <small className="category">List Of new Auctions and their status</small>
                </CardHeader>
                <CardBody>
                  <Table className="table" responsive>
                  <Thead className="text-primary">
                      <Tr>
                        <Th className="text-left">#</Th>
                        <Th>Bank Name</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                        <Th>Due Date</Th>
                        <Th className="text-right"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {bids?.map((bid) => (
                        <Tr key={bid.id}>
                          <Th className="text-left">1</Th>
                          <Td>{bid.bankname}</Td>
                          <Td>{bid.amount}</Td>
                          <Td>
                            {/* <div
                              style={{
                                backgroundColor: "#FFA500",
                                width: "8rem",
                                borderRadius: "5px",
                                height: "2rem",
                                textAlign: "center",
                                border: "1px solid #FF8C00",
                                color: "black",
                              }}
                            >
                              {bid.status}
                            </div> */}
                            {bid?.status === "Available" ? (
                              <div
                                style={{
                                  backgroundColor: "#64FF33",
                                  width: "8rem",
                                  borderRadius: "5px",
                                  height: "2rem",
                                  textAlign: "center",
                                  border: "1px solid #74946A",
                                  color: "black",
                                }}
                              >
                                {bid.status}
                              </div>
                            ) : (<div
                              style={{
                                backgroundColor: "#FFB600",
                                width: "8rem",
                                borderRadius: "5px",
                                height: "2rem",
                                textAlign: "center",
                                border: "1px solid #D17147",
                                color: "black",
                              }}
                            >
                              {bid.status}
                            </div>)}
                          </Td>
                          <Td>{bid.duedate}</Td>
                          <Td className="text-right">
                            <button
                              className="btn btn-outline-primary p-0 mx-1"
                              onClick={()=>db
                                .collection("bid")
                                .doc(bid?.id)
                                .update({
                                  "status": "Bought",
                                })}
                            >
                              Paid 
                            </button>
                            {/* <button className="btn btn-outline-danger p-0 mx-1"> delete</button> */}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Bids;
