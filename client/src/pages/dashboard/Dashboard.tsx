import React from "react";
import { Slide } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

const Dashboard: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    document.title = "Dashboard - Ecologital";
  }, []);

  return (
    <Slide direction='right' in={true} mountOnEnter unmountOnExit>
      <div>Welcome {user?.user?.username ?? ""}</div>
    </Slide>
  );
};

export default Dashboard;
