import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import "./dashboard.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import profile from "../../images/customer-service.png";
import notify from "../../images/packing-list.png";
import { db } from "../../../auth/firebase";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useStateValue } from "../../../StateProvider";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [{user}] = useStateValue()
  const [bids, setBids] = useState();

  useEffect(() => {
    const data = [];
    db.collection("bid").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      setBids(data);
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <Sidebar />
      </div>
      <div className="dashboard__body">
        <Container fluid>
          <Row className="mt-3 mb-3">
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-cart-simple text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <img style={{ width: "5rem" }} src={bids} alt="" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Link>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-time-alarm text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <img style={{ width: "4rem" }} src={notify} alt="" />
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="far fa-calendar" />
                    Notifications
                  </div>
                </CardFooter>
              </Card>
              </Link>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Link>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers d-flex">
                        <div className="divider">
                          <img style={{ width: "5rem" }} src={profile} alt="" />
                        </div>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="far fa-clock" /> Edit Info
                  </div>
                </CardFooter>
              </Card>
              </Link>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-settings text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Logout</p>
                        <CardTitle tag="p">
                          <ExitToAppIcon />
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Logout
                    <ArrowForwardIcon />
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="mb-3">
                <CardHeader>
                  <CardTitle tag="h5">Pending Activity</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="table" responsive>
                    <Thead className="text-primary">
                      {bids?.length > 0? 
                        <div 
                        style={{height: '2rem', 
                                width: '90%', 
                                backgroundColor: 'lightgreen',
                                marginLeft:'auto', 
                                marginRight: 'auto', 
                                borderRadius: '5px', 
                                textAlign: 'center', 
                                border:'1px solid red'
                              }}>
                          <p style={{color: 'Black'}}>Auction Offline, Goto Bids Tab</p>
                          </div> : <div 
                        style={{height: '2rem',
                                 width: '90%', 
                                 backgroundColor: 'orange',
                                 marginLeft:'auto', 
                                 marginRight: 'auto', 
                                 borderRadius: '5px', 
                                 textAlign: 'center', 
                                 border:'1px solid red'
                                }}>
                          <p style={{color: 'Black'}}>Auction Offline</p>
                          </div>
                       }
                    </Thead>
                   
                  </Table>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="fa fa-history" />{" "}
                    {bids?.length > 0 ? (
                      <small>Activity Log</small>
                    ) : (
                      <small>No Available Activities</small>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
