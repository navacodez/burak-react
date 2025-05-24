import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Pagination,
  Stack,
  Container,
  Badge,
  TextField,
  PaginationItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import { url } from "inspector";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "./../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "./../../../lib/enums/product.enum";
import { serverApi } from "./../../../lib/config";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { CartItem } from "./../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({products,    
  }));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
const { onAdd } = props;
  const {setProducts} = actionDispatch(useDispatch());
  const {products} = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
  search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
  const product = new ProductService();
  product.getProducts(productSearch).then(data => setProducts(data))
  .catch((err) => console.log(err));
 }, [productSearch]);

 useEffect(() => {
  if(searchText === "") {
    productSearch.search = "";
    setProductSearch({ ...productSearch })
  } 
 }, [searchText]);

 /** HANDLERS **/

 const searchCollectionHandler = (collection: ProductCollection) => {
 productSearch.page = 1;
 productSearch.productCollection = collection;
 setProductSearch({ ...productSearch });
 };

 const searchOrderHandler = (order: string) => {
  productSearch.page = 1;
 productSearch.order = order;
 setProductSearch({ ...productSearch });
 }

 const searchProductHandler = () => {
   productSearch.search = searchText;
   setProductSearch({ ...productSearch });
 }

 const paginationHandler = (e: ChangeEvent<any>, value: number) => {
  productSearch.page = value;
  setProductSearch({...productSearch});
 };

const chooseDishHandler = (id: string) => {
 history.push(`/products/${id}`);
}

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
                name={"singleResearch"}
                size="small"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => 
                  setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if(e.key === "Enter") searchProductHandler();
                  }}
              />
              <Button variant="contained" className="icons" color="primary"
                endIcon={<SearchIcon />}
                onClick={searchProductHandler}
                >
                Search 
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
                className="order"
                color={productSearch.order === "createdAt" ?  "primary" : "secondary"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                {" "}
                New
              </Button>
              <Button
                sx={{ marginRight: "18px" }}
                variant="contained"
                className="order"
                color={productSearch.order === "productPrice" ?  "primary" : "secondary"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                {" "}
                Price
              </Button>
              <Button variant="contained"  color={productSearch.order === "productViews" ?  "primary" : "secondary"}
                onClick={() => searchOrderHandler("productViews")}className="order">
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
                color={productSearch.productCollection === ProductCollection.OTHER ?"primary" : "secondary"}
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                className="category-buttons"
              >
                Other
              </Button>
              <Button
                variant="contained"
                color={productSearch.productCollection === ProductCollection.DESSERT ?"primary" : "secondary"}  onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
                className="category-buttons"
              >
                Dessert
              </Button>
              <Button
                variant="contained"
                color={productSearch.productCollection === ProductCollection.DRINK ?"primary" : "secondary"}
                className="category-buttons"
                onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
              >
                Drink
              </Button>
              <Button
                variant="contained"
                color={productSearch.productCollection === ProductCollection.SALAD ?"primary" : "secondary"} onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
                className="category-buttons"
                >
                Salad
              </Button>
              <Button
                variant="contained"
                color={productSearch.productCollection === ProductCollection.DISH ?"primary" : "secondary"} onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                className="category-buttons"
              >
                Dish
              </Button>
            </Stack>

            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume = product.productCollection === ProductCollection.DRINK ? product.productVolume + " litr" : product.productSize + " size";
                  return (
                    <Stack key={product._id} className="product-card" onClick={() => chooseDishHandler(product._id)}>
                      <Stack
                        className="product-img"
                        sx={{
                          display: "block",
                          background: `url(${imagePath})`,
                        }}
                      >
                        
                          <div className="product-sale">{sizeVolume}</div>
                         <Button className="shop-btn"
                        onClick={(e) => {
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          });
                          e.stopPropagation();
                        }}
                        >
                          <img
                            src={"icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                            alt="alternative"
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{ color: product.productViews === 0 ? "gray" : "white", }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">{product.productName}</span>
                        <div className="product-price">
                          <MonetizationIcon
                            style={{
                              background: "gold",
                              color: "white",
                            }}
                          />
                          <div className="price-tag">{product.productPrice}</div>
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
            <Pagination 
            count={products.length !== 0 ? productSearch.page + 1 
              : productSearch.page}
            page={productSearch.page}
            
              
           color={"secondary" }
           
          onChange={paginationHandler}
        />
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
  )
}