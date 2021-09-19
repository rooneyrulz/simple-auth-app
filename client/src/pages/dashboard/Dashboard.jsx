import React from "react";
import { Slide } from "@material-ui/core";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Slide direction='right' in={true} mountOnEnter unmountOnExit>
      <div>Welcome {auth?.authUser?.username ?? ""}</div>
    </Slide>
  );
};

export default Dashboard;
