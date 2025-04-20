import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { Link, Route, Switch } from "react-router-dom";
import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";

function App() {
  return (  
  <div>
    <nav>
      <ul>
      <li>
           <Link to="/">HomePage</Link>
         </li>
        <li>
          <Link to="/products">ProductsPag</Link>
        </li>
        <li>
          <Link to="/member-page">UserPage</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
    
    <Switch>
    <Route path="/products">
         <ProductsPage />
       </Route>
       <Route path="/order">
         <OrdersPage />
      </Route>
      <Route path="/member-page">
      <UserPage />
      </Route>
      <Route path="/">
        <HomePage/>
      </Route>
    </Switch>
  </div>
  );
}


export default App;





