import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import {  handleColor, handleSize, ImageLink } from '../../shared/funs';
import { set_product_id } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import myClassNames from 'classnames';
import { Link , useNavigate} from "react-router-dom";import { create_carts } from "../../redux/actions/carts";
import { delete_wishlist, get_wishlist } from "../../redux/actions/wishlist";
import { isAuthentication} from "../../redux/actions/auth"
import { toast } from "react-toastify";
import AOS from 'aos';

const Wishlist = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const [Wishlist, setWishlist] = useState([])
    const limit = props.limit
    const skip = props.skip
    const sort = props.sort 

    const dispatch = useDispatch()
    const { wishlist } = useSelector(state => state.wishlist)

    const { isAuth , token , user } = useSelector((state) => state.auth);
    const authorization = { "Authorization": `bearer ${token}` }

    useEffect(() => { AOS.init({ duration: 800 }); }, []);

      useEffect(() => {
        dispatch(isAuthentication());
      }, [dispatch]);
    
      
      useEffect(() => {
        if (!isAuth) {
          navigate("/login");
        }
      }, [isAuth]);


    useEffect(() => {
        dispatch(get_wishlist({ filter: {userId : user._id}, limit, skip, sort , expend : 'productId' } , authorization))
    }, [dispatch])

    useEffect(() => {
        setWishlist(wishlist)
    }, [wishlist])

    const addToCart = (product) => {
       dispatch(create_carts(product))  
       toast.info(t("Added"))
    }

    const removeFromWishList = (id) => {
        dispatch(delete_wishlist(id , authorization))
        toast.info(t("Removed"))
    }

    const quickView = (productId) => {
       dispatch(set_product_id(productId))
    }
 
    return ( 
        <Fragment>
            { Wishlist && wishlist && Wishlist.length > 0 &&   // <!-- New Wishlist Start -->

                <section className="section ec-new-product section-space-p">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-12 text-center">
                                <div className="section-title">
                                    <h2 className="ec-bg-title">{t("Wishlist")}</h2>
                                    <h2 className="ec-title">{t("Wishlist")}</h2>
                                    <p className="sub-title">{t("Browse The Collection of Top Wishlists")}</p>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            {/* <!-- New Wishlist Content --> */}

                            {Wishlist.map((mwishlist, i) => {

                                    let img = ""
                                    if(!mwishlist.productId || !mwishlist.productId.images || !mwishlist.productId.images.imagesUrl[0]){
                                        img = "https://via.placeholder.com/500"
                                    }else {
                                    img = ImageLink(mwishlist.productId.images.imagesUrl[0])
                                    }

                                return (

                                    <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content" data-aos="fade-up">

                                        <div className="ec-product-inner">
                                            <div className="ec-pro-image-outer">


                                                <div className="ec-pro-image">
                                                    <Link to={`/product/${mwishlist.productId.category}/${mwishlist.productId._id}`} className="image">
                                                        <img className="main-image" src={img} alt="Wishlist" />
                                                    </Link>

                                                    <span className="flags">
                                                        {mwishlist.productId.stock == 0 && <span className="sale">{t("Sale")}</span>}
                                                        {mwishlist.productId.condition == "new" && <span className="new">{t("New")}</span>}
                                                    </span>

                                                    {mwishlist.productId.oldprice && <span className="percentage">{Math.floor( Math.floor(mwishlist.productId.price * Math.floor(mwishlist.productId.oldprice - mwishlist.productId.price) ) / 100 )}%</span>}

                                                    <div className="ec-pro-actions">
                                                        <button title="Add To Cart" className="ec-btn-group compare"  onClick={() => {addToCart(mwishlist.productId)}}><i className="fas fa-cart-plus"></i></button>
                                                        <button className="ec-btn-group wishlist" title="Wishlist" onClick={() => {removeFromWishList(mwishlist._id)}}><i className="fa-solid fa-heart-crack"></i></button >
                                                    </div>
                                                    <a href="javascript:void(0)" className="quickview" title="Quick view"  data-toggle="modal" data-target="#ec_quickview_modal" onClick={() => {quickView(mwishlist.productId._id)}}><i className="far fa-eye"></i></a>

                                                </div>
                                            </div>

                                            <div className="ec-pro-content">
                                                <h5 className="ec-pro-title"><Link to={`/product/${mwishlist.productId.category}/${mwishlist.productId._id}`}>{mwishlist.productId.name}</Link></h5>

                                                {/* {mwishlist.productId.reviews.length > 0 && <div className="ec-pro-rating">
                                                    {
                                                        calculateRating(mwishlist.productId.reviews).map((star, i) => {
                                                            return (
                                                                <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                            )
                                                        })

                                                    }

                                                </div>} */}

                                                <span className="ec-price">
                                                    {mwishlist.productId.oldprice && <span className="old-price">${mwishlist.productId.oldprice}</span>}
                                                    <span className="new-price">${mwishlist.productId.price}</span>
                                                </span>

                                                <div className="ec-pro-option">

                                                    {mwishlist.productId.color.length > 0 &&
                                                        <div className="ec-pro-color">
                                                            <span className="ec-pro-opt-label">{t("Color")}</span>
                                                             <ul className="ec-opt-swatch ec-change-img">

                                                                 {mwishlist.productId.color.map((color, index) => {
                                                                    return (
                                                                        <li className={myClassNames({ "active": index == 0 })} onClick={(e) => { handleColor(index , e) }} key={index} >
                                                                            <a className="ec-opt-clr-img"><span style={{ backgroundColor: color }}></span></a>
                                                                        </li>
                                                                    );
                                                                })}


                                                            </ul>
                                                        </div>
                                                    }

                                                    {mwishlist.productId.size.length > 0 &&
                                                        <div className="ec-pro-size">
                                                            <span className="ec-pro-opt-label">{t("Size")}</span>
                                                            <ul className="ec-opt-size">
                                                                {mwishlist.productId.size.map((size, index) => {
                                                                    return (
                                                                        <li className={myClassNames({ "active": index == 0 })}  onClick={(e) => { handleSize(size.price, index, e) }} key={index}>
                                                                            <a className="ec-opt-sz" >{size.size}</a>
                                                                        </li>
                                                                    );
                                                                })}

                                                            </ul>
                                                        </div>
                                                    }


                                                </div>
                                            </div>


                                        </div>
                                    </div>


                                );
                            })}


                        </div>
                    </div>

                </section>
                // {/* <!-- New Wishlist end--> */}
            }

        </Fragment>


    );
}

export default Wishlist ;
