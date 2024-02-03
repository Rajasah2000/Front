import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
//import LibraryIllustration from "../..//Assets/Images/Library_Illustration_1.jpg"
import "./Home.css";
import jwt_decode from "jwt-decode";
import {
  GenreCard,
  NewArrivals,
  Footer,
  useWishlist,
  useCart,
} from "../../index.js";
import { useProductAvailable } from "../../Context/product-context";
import { useGenre } from "../../Context/genre-context";
import Banner from "../Banner/Banner";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner2 from "../Banner/Banner2";
const LibraryIllustration = require("../../Assets/Images/bookstore5.jpg");

function Home() {
  const { dispatchProductFilterOptions } = useProductAvailable();
  const { dispatchUserWishlist } = useWishlist();
  const { dispatchUserCart } = useCart();
  const {
    setFictionCategoryCheckbox,
    setThrillerCategoryCheckbox,
    setTechCategoryCheckbox,
    setPhilosophyCategoryCheckbox,
    setRomanceCategoryCheckbox,
    setMangaCategoryCheckbox,
  } = useGenre();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
      } else {
        (async function getUpdatedWishlistAndCart() {
          let updatedUserInfo = await axios.get(
            "https://bookztron-server.vercel.app/api/user",
            {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            }
          );

          if (updatedUserInfo.data.status === "ok") {
            dispatchUserWishlist({
              type: "UPDATE_USER_WISHLIST",
              payload: updatedUserInfo.data.user.wishlist,
            });
            dispatchUserCart({
              type: "UPDATE_USER_CART",
              payload: updatedUserInfo.data.user.cart,
            });
          }
        })();
      }
    }
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 695,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="home-component-container">
      {/* <div className="home-page-img-container">
        <img
          className="home-page-background-img"
          src={LibraryIllustration}
          alt="Library Illustration"
        />
      </div> */}
      <Banner />
      <div style={{ margin:"2.4rem"}}>
        <img
          className="home-page-background-img"
          src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1706772589_Home_and_Lifestyle_1240x209.jpg?im=Resize=(1240,150)"
          alt="Library Illustration"
        />
      </div>
      {/* <Banner2 /> */}
      {/* https://www.j,,iomart.com/images/cms/aw_rbslider/slides/1706772589_Home_and_Lifestyle_1240x209.jpg?im=Resize=(1240,150) */}
      <h1 className="homepage-headings" >Shop From Top Categories</h1>
      <div className="genre-cards-container">
        {/* <Slider  {...settings} className="myOwnSlickSlide">
        <Link to={"/shop"}>
          <GenreCard genretype="Fiction" />
        </Link>
        <Link to={"/shop"}>
          <GenreCard genretype="Thriller" />
        </Link>
        <Link to={"/shop"}>
          <GenreCard genretype="Tech" />
        </Link>
        <Link to={"/shop"}>
          <GenreCard genretype="Philosophy" />
        </Link>
        <Link to={"/shop"}>
          <GenreCard genretype="Romance" />
        </Link>
        <Link to={"/shop"} state={{ navigate: true }}>
          <GenreCard genretype="Manga" />
        </Link>
        </Slider> */}
        <Link to={"/shop"}>
          <GenreCard genretype="Fiction" />
        </Link>
        <Link to={"/shop"}>
          <GenreCard genretype="Thriller" />
        </Link>
        <Link to={"/shop"}>
          <GenreCard genretype="Tech" />
        </Link>
        <Link to={"/shop"}>
          <GenreCard genretype="Philosophy" />
        </Link>
        <Link to={"/shop"}>
          <GenreCard genretype="Romance" />
        </Link>
        <Link to={"/shop"} state={{ navigate: true }}>
          <GenreCard genretype="Manga" />
        </Link>
        
      </div>

      <Link to={"/shop"}>
        <button
          onClick={() => {
            setFictionCategoryCheckbox(true);
            setThrillerCategoryCheckbox(true);
            setTechCategoryCheckbox(true);
            setPhilosophyCategoryCheckbox(true);
            setRomanceCategoryCheckbox(true);
            setMangaCategoryCheckbox(true);
            dispatchProductFilterOptions({ type: "RESET_DEFAULT_FILTERS" });
          }}
          className="solid-secondary-btn homepage-explore-all-btn"
        >
          Explore All
        </button>
      </Link>

      <h1 className="homepage-headings">New Arrivals</h1>
      <NewArrivals />
      <h1 className="homepage-headings">Trending Smartphones</h1>
      <NewArrivals />
      <h1 className="homepage-headings">Footwear and Accessories</h1>
      <NewArrivals />
      <h1 className="homepage-headings">Fresh Arrival Bedsheets</h1>
      <NewArrivals />
      
      <Footer />
    </div>
  );
}

export { Home };
