import React, { useEffect, useState } from "react";
import "./menupage.css";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Logo from "../../Assets/Images/logo.png";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const MenuPage = () => {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  useEffect(() => {
    axios
      .get("https://infoeat2.azurewebsites.net/infovision/homepageview")
      .then((res) => setData(res.data));
  }, []);
  return (

    <div className="back">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img src={Logo} className="logo" />

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex">
              <input
                className="form-control"
                type="search"
                placeholder="Search for Items"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>{" "}
            &nbsp; &nbsp;
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected> All</option>
                <option value={data}>Electronics </option>
                <option value={data}>Lunch</option>
                <option value={data}>snacks</option>
                <option value={data}>Dinner</option>
              </select>
            </ul>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={1} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
            &nbsp;&nbsp;&nbsp;
            <Avatar alt="profile" src="" />
          </div>
        </div>
      </nav>
      <div className="col-lg-12 col-md-4 body">
        <div className="row main">
          {data.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.imageUrl} alt="Image" className="Image" />
              <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={2.5} precision={product.rating} readOnly />
    </Stack>

              <h4 className="title">{product.itemName}</h4>
              <h5 className="price">Price:₹{product.itemprice}</h5>
             
             
              <div
                class="btn-group"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <button type="button" class="btn btn-primary">
                  Add to cart
                </button>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="btn btn-success">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
