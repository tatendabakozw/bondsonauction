import React from "react";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { useStateValue } from "../../../StateProvider";
import Sidebar from "../Sidebar/Sidebar";
import "./Account.css";
import EditIcon from "@material-ui/icons/Edit";
import Timer from "../../Timer/Timer";

function Account() {
  const [{ user }] = useStateValue();

  return (
    <div className="Account">
      <div className="account__sidebar">
        <Sidebar />
      </div>
      <div className="account__body">
        <Card small className="mb-4 pt-3">
          <CardHeader className="border-bottom text-center">
            <p>Edit Your Info</p>
          </CardHeader>
          <CardBody>
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={user?.photoURL}
                alt={user?.displayName}
                width="110"
              />
              <EditIcon />
            </div>
            <h4 className="mb-0">{user?.displayName ? user?.displayName : user.email}</h4>
            <span className="text-muted d-block mb-2">
              <EditIcon />
            </span>
            <Button pill outline size="sm" className="mb-2">
              <i className="material-icons mr-1">person_add</i> Follow
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Account;
