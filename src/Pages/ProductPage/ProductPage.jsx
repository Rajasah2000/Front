import { useEffect } from "react";
import "./ProductPage.css"
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useToast, useWishlist, useCart } from "../../index"
import ReactImageMagnify from "react-image-magnify";

function ProductPage()
{
    const navigate = useNavigate()

    const { dispatchUserWishlist } = useWishlist()
    const { dispatchUserCart }     = useCart()
    const { showToast } = useToast()
    const { id } = useParams()
    const productDetailsOnStorage = localStorage.getItem(`${id}`)
    const productdetails = JSON.parse(productDetailsOnStorage)
    const {
        _id,
        bookName,
        author,
        originalPrice,
        discountedPrice,
        discountPercent,
        imgSrc, 
        imgAlt,
        badgeText, 
        outOfStock,
        rating, 
        description
    } = productdetails

    useEffect(()=>{
        const token=localStorage.getItem('token')

        if(token)
        {
            const user = jwt_decode(token)
            if(!user)
            {
                localStorage.removeItem('token')
            }
            else
            {
                (async function getUpdatedWishlistAndCart()
                {
                    let updatedUserInfo = await axios.get(
                    "https://bookztron-server.vercel.app/api/user",
                    {
                        headers:
                        {
                        'x-access-token': localStorage.getItem('token'),
                        }
                    })

                    if(updatedUserInfo.data.status==="ok")
                    {
                        dispatchUserWishlist({type: "UPDATE_USER_WISHLIST",payload: updatedUserInfo.data.user.wishlist})
                        dispatchUserCart({type: "UPDATE_USER_CART",payload: updatedUserInfo.data.user.cart})
                    }
                })()
            }
        }   
    },[])

    async function addItemToWishlist()
    {
        const token=localStorage.getItem('token')

        if(token)
        {
            const user = jwt_decode(token)
            
            if(!user)
            {
                localStorage.removeItem('token')
                showToast("warning","","Kindly Login")
                navigate('/login')
            }
            else
            {
                let wishlistUpdateResponse = await axios.patch(
                    "https://bookztron-server.vercel.app/api/wishlist",
                    {
                        productdetails
                    },
                    {
                        headers:
                        {
                            'x-access-token': localStorage.getItem('token'),
                        }
                    }
                )
        
                if(wishlistUpdateResponse.data.status==="ok")
                {
                    dispatchUserWishlist({type: "UPDATE_USER_WISHLIST",payload: wishlistUpdateResponse.data.user.wishlist})
                    showToast("success","","Item successfully added to wishlist")
                }
            }
        }
        else
        {
            showToast("warning","","Kindly Login")
        } 
    }

    async function addItemToCart()
    {
        const token=localStorage.getItem('token')

        if(token)
        {
            const user = jwt_decode(token)
            
            if(!user)
            {
                localStorage.removeItem('token')
                showToast("warning","","Kindly Login")
                navigate('/login')
            }
            else
            {
                let cartUpdateResponse = await axios.patch(
                    "https://bookztron-server.vercel.app/api/cart",
                    {
                        productdetails
                    },
                    {
                        headers:
                        {
                            'x-access-token': localStorage.getItem('token'),
                        }
                    }
                )
                if(cartUpdateResponse.data.status==="ok")
                {
                    dispatchUserCart({type: "UPDATE_USER_CART",payload: cartUpdateResponse.data.user.cart})
                    showToast("success","","Item successfully added to cart")
                }
            }
        }
        else
        {
            showToast("warning","","Kindly Login")
        } 
    }

    return (
      <>
        <div className="product-page-container">
          <div className="product-page-item">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: imgAlt,
                  // src: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1690206497/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/272562_1_pkexam.png?tr=w-360',
                  src: imgSrc,
                  width: 250,
                  height: 360,
                },
                largeImage: {
                  // src: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1690206497/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/272562_1_pkexam.png?tr=w-360',
                  src: imgSrc,
                  width: 1200,
                  height: 1200,
                },
                imageClassName: 'bookcover-image',
                enlargedImagePosition: 'beside',
                enlargedImageContainerDimensions: {
                  width: '315%',
                  height: '100%',
                },
                enlargedImageContainerClassName: 'enlarged-image-container',
                enlargedImageStyle: {
                  filter: 'blur(0px) brightness(1)',
                },
              }}
            />
            <div className="item-details">
              <h2>{bookName}</h2>
              <hr />
              <p>
                <b>Author:</b>&nbsp;&nbsp;<span>{author}</span>
              </p>
              <p className="item-description">
                <b>Description:</b>&nbsp;&nbsp;<span>{description}</span>
              </p>
              <p className="item-rating">
                <b>Rating:</b>&nbsp;&nbsp;<span>{rating}</span>
              </p>
              <h3 className="item-price-details">
                Rs. {discountedPrice}&nbsp;&nbsp;<del>Rs. {originalPrice}</del>&nbsp;&nbsp;
                <span className="discount-on-item">({discountPercent}% off)</span>
              </h3>
              {outOfStock ? (
                <p className="out-of-stock-text">Item is currently out of stock</p>
              ) : (
                <div className="item-buttons">
                  <button onClick={addItemToWishlist} className="solid-primary-btn">
                    Add to wishlist
                  </button>
                  <button onClick={addItemToCart} className="solid-warning-btn">
                    Add to cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
}

export { ProductPage }