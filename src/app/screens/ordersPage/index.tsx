import React, { SyntheticEvent, useState } from "react";
import { Container, Stack, Box, TextField } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PauseOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOreders";
import "./../../../css/order.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order } from "./../../../lib/types/order";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch( setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)) 
});
 
 export default function OrdersPage() {
  const {setPausedOrders, setProcessOrders,  setFinishedOrders} = actionDispatch(useDispatch());
  const [value, setValue] = useState("1");

/** HANDLERS **/

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list"
                >
                  <Tab label="PAUSED ORDERS" value={"1"}></Tab>
                  <Tab label="PROCESS ORDERS" value={"2"}></Tab>
                  <Tab label="FINISHED ORDERS" value={"3"}></Tab>
                </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={"/icons/default-user.svg"}
                  className={"order-user-avatar"}
                  alt=""
                />

                <div className={"order-user-icon-box"}>
                  <img
                    src={"/icons/user-badge.svg"}
                    className={"order-user-prof-img"}
                    alt=""
                  />
                </div>
              </div>
              <span className={"order-user-name"}>Martin</span>
              <span className={"order-user-prof"}>User</span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
              </div>
              <div className={"spec-address-txt"}>Seoul, Korea</div>
            </Box>
          </Box>
          <Box className={"order-info-box"} sx={{ mt: "15px" }}>
            <TextField
              type={"text"}
              name={"cardNumber"}
              placeholder={"Card number: **** 2019 4003 5655"}
              className={"card-input"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                type={"text"}
                name={"cardPeriod"}
                placeholder={"07/24"}
                className={"card-half-input"}
              />
              <TextField
                type={"text"}
                name={"cardCVV"}
                placeholder={"CVV : 010"}
                className={"card-half-input"}
              />
            </div>
            <TextField
              type={"text"}
              name={"cardCreator"}
              placeholder={"Gerrard Dominenguez"}
              className={"card-input"}
            />
            <div className={"cards-box"}>
              <img src={"/icons/western-card.svg"} alt="" />
              <img src={"/icons/master-card.svg"} alt="" />
              <img src={"/icons/paypal-card.svg"} alt="" />
              <img src={"/icons/visa-card.svg"} alt="" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
 }