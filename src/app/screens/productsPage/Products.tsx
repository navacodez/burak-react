import React from "react";
import {
   Box,
   Button,
   Pagination,
   Stack,
   Container,
   Badge,
   TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import { url } from "inspector";


import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({products,    
  }));
 
const products = [
   {
     name: "Cutlet",
     price: 15,
     img: "./img/kebab-fresh.webp",
     large: true,
   },
   {
     name: "Kebab",
     price: 15,
     img: "./img/kebab.webp",
     large: true,
   },
   {
     name: "Kebab",
     price: 15,
     img: "./img/lavash.webp",
     large: true,
   },
   {
     name: "Lavash",
     price: 15,
     img: "./img/kebab.webp",
     large: true,
   },
   {
     name: "Lavash",
     price: 15,
     img: "./img/lavash.webp",
     large: false,
   },
   {
     name: "Cutlet",
     price: 15,
     img: "./img/fresh.webp",
     large: false,
   },
   {
     name: "Kebab",
     price: 15,
     img: "./img/cutlet.webp",
     large: true,
   },
   {
     name: "Kebab",
     price: 15,
     img: "./img/food-city.webp",
     large: true,
   },
];

export default function Products() {
  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Box className="top-text">
              <span className="title"> Burak Restaurant </span>
            </Box>
            <Box className="search">
              <TextField
                className="input"
                size="small"
                placeholder="Type here"
              />
              <Button variant="contained" className="icons" color="primary">
                Search <SearchIcon />
              </Button>
            </Box>
          </Stack>

          <Stack
            className="dishes-filer-section"
            alignItems={"flex-end"}
            width={"100%"}
          >
            <Stack
              direction="row"
              spacing={2}
              justifyContent="end"
              mb={4}
              className="dishes-filter-box"
            >
              <Button
                sx={{ marginRight: "18px" }}
                variant="contained"
                color="primary"
                className="order"
              >
                {" "}
                New
              </Button>
              <Button
                sx={{ marginRight: "18px" }}
                variant="contained"
                color="secondary"
                className="order"
              >
                {" "}
                Price
              </Button>
              <Button variant="contained" color="secondary" className="order">
                {" "}
                Views
              </Button>
            </Stack>
          </Stack>

          <Box
            display="flex"
            flexDirection={"row"}
            className="list-category-section"
          >
            <Stack>
              <Button
                variant="contained"
                color="secondary"
                className="category-buttons"
              >
                Other
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="category-buttons"
              >
                Dessert
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="category-buttons"
              >
                Drink
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="category-buttons"
                >
                Salad
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="category-buttons"
              >
                Dish
              </Button>
            </Stack>

            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product, index) => {
                  return (
                    <Stack key={index} className="product-card">
                      <Stack
                        className="product-img"
                        sx={{
                          display: "block",
                          background: `url(${product.img})`,
                        }}
                      >
                        {product.large ? (
                          <div className="product-sale">Large-size</div>
                        ) : (
                          <div className="product-sale">Normal-Size</div>
                        )}

                        <Button className="shop-btn">
                          <img
                            src={"icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                            alt="alternative"
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge badgeContent={20} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{ color: product.large ? "gray" : "white" }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">{product.name}</span>
                        <div className="product-price">
                          <MonetizationIcon
                            style={{
                              background: "gold",
                              color: "white",
                            }}
                          />
                          <div className="price-tag">{12}</div>
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Box>
          <Stack spacing={2} mt={4} alignItems="center">
            <Pagination count={3} color="secondary" />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <Container>
          <Stack className="brand-frame">
            <Box className="brand-title">Our Family Brands</Box>
            <Stack className="brand-boxs">
              <Box className="brand-box">
                <img src="img/sweets.webp" className="brand-img" alt="" />
              </Box>
              <Box className="brand-box">
                <img src="img/sweets.webp" className="brand-img" alt="" />
              </Box>
              <Box className="brand-box">
                <img src="img/sweets.webp" className="brand-img" alt="" />
              </Box>
              <Box className="brand-box">
                <img src="img/sweets.webp" className="brand-img" alt="" />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5079585.605847458!2d46.79765948485375!3d27.12717371824114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6959a6cf613f%3A0xa197b631f23b1f4a!2sChef%20Burak%20Gurme!5e0!3m2!1sru!2skr!4v1728498436401!5m2!1sru!2skr"
              width={"1320px"}
              height={"500px"}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}