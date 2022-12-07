import React from "react";
import Navbar from "./../../Common/Navbar_Assessor";
import Chart from "./../../Common/Chart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Footer from "../../Common/Footer";
import { useState } from "react";
import { useEffect } from "react";
import getCookie from "../../getCookie";
import axiosInstance from "../../axiosInstance";
import moment from "moment";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Index({ error, setError }) {
  const [open, setOpen] = useState(false);
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };
  const [alltest, setAlltest] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/test/all", config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setAlltest(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function alertfunction()
  {
    alert("Please Make a Meet Link!");
  }
  return (
    <div>
      <Navbar />
      <div style={{ padding: "5%" }}>
        <br />
        <br />
        <br />
        <h4 style={{ textAlign: "left", fontSize: "28px", lineHeight: "1px" }}>
          Welcome!
        </h4>
        <p style={{ lineHeight: "1px" }}>
          Want to View{" "}
          <a onClick={handleOpen} style={{ textDecoration: "none", cursor:"pointer" }}>
            Your Account?
          </a>
        </p>
        <br />
        <br />
        <br />
        {alltest.map((altst) => {
          let momentDate = moment
            .utc(altst.starting_date)
            .format("MM/DD/YY, h:mm:ss a");
          return (
            <div>
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={2}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Box gridColumn="span 12">
                  <Item
                    style={{
                      padding: "1.5%",
                      borderLeft: "2rem solid #7882bd",
                    }}
                  >
                    <h3 style={{ textAlign: "left" }}>{altst.title}</h3>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gap={1}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Box gridColumn="span 3" style={{ textAlign: "left" }}>
                        Duration: {altst.available_window} mins.
                      </Box>
                      <Box gridColumn="span 3">{momentDate}</Box>
                      <Box
                        gridColumn="span 3"
                        style={{ color: "red", cursor: "pointer" }}
                      >
                        View Results
                      </Box>
                      <Box
                        gridColumn="span 3"
                        style={{
                          textAlign: "right",
                          color: "#7882bd",
                          cursor: "pointer",
                          display:
                            altst.type_of_test === "written" ? "none" : "",
                        }}
                      >
                        <a onClick={alertfunction} style={{ textDecoration: "none" }}>
                          Start Viva
                        </a>
                      </Box>
                    </Box>
                  </Item>
                </Box>
              </Box>
              <br />
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?b=1&s=170667a&w=0&k=20&c=Z5bM_O61NdvOVMAV91l_K_xVAsgPxayDrlVxvi19jqE="
            style={{ width: "60%" }}
          />
          </center>
          <p>
            <b>First Name:</b> {user.firstname}
          </p>
          <p>
            <b>Last Name:</b> {user.lastname}
          </p>
          <p>
            <b>Email ID:</b> {user.email}
          </p>
          <p>
            <b>Mobile No:</b> {user.mobile}
          </p>
          <p>
            <b>Username:</b> {user.username}
          </p>
        </Box>
      </Modal>
    </div>
  );
}
