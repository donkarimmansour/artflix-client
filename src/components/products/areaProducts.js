import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { handleColor, handleSize, ImageLink } from '../../shared/funs';
import myClassNames from 'classnames';
import { Link , useNavigate} from "react-router-dom";
import { get_products_tab, set_product_id } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { create_wishlist } from "../../redux/actions/wishlist";
import { create_carts } from "../../redux/actions/carts";
import { isAuthentication } from "../../redux/actions/auth";
import { toast } from "react-toastify";


const AreaProducts = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [Products, setProducts] = useState([])
    const limit = props.limit
    const skip = props.skip
    const sort = props.sort
    const catyNames = JSON.parse(props.caty)
    const caty = props.caty ? { "category": { "$in": [...catyNames] } } : {}

    const dispatch = useDispatch()
    const { tabsproducts } = useSelector(state => state.products)

    const { isAuth , token , user } = useSelector((state) => state.auth);
    const authorization = { "Authorization": `bearer ${token}` }


    useEffect(() => {
        dispatch(isAuthentication()); 

        dispatch(get_products_tab({ filter: caty, limit, skip, sort }))
      }, [dispatch]);


        useEffect(() => {
            setProducts(tabsproducts)
        }, [tabsproducts])

    const handleTabArea = (name , index , e) => { 
        const tabs = e.target.parentElement.parentElement.querySelectorAll("li");
        const areas = document.querySelector(`#tab-pro-for-${name}`).parentElement.querySelectorAll(".tab-pane")

        tabs.forEach((em, i) => {
            em.querySelector("a").className = "nav-link"
            if (i === index) {
                em.querySelector("a").className = "nav-link active"
            }
        })

        areas.forEach((em, i) => {
            em.className = "tab-pane fade"
            if (i === index) {
                em.className = "tab-pane fade show active"
            }
        })
    }
   

    const addToCart = (product) => {
        dispatch(create_carts(product))
        toast.info(t("Added"))

    }

    const addToWishList = (productId, userId) => {

        if (!isAuth) {
            navigate("/login")
        } else {
            dispatch(create_wishlist(productId, userId, authorization))
            toast.info(t("Added"))

        }

    }

    const quickView = (productId) => {
        dispatch(set_product_id(productId))
    }

    return (

        <Fragment>
            {Products &&  Products.length > 0 &&

                // <!-- Product tab Area Start -->
                <section className="section ec-product-tab section-space-p">
                    <div className="container">

                        <div className="row">

                            <div className="col-md-12 text-center">
                                <div className="section-title">
                                    <h2 className="ec-bg-title">{t("Our Top Collection")}</h2>
                                    <h2 className="ec-title">{t("Our Top Collection")}</h2>
                                    <p className="sub-title">{t("Browse The Collection of Top Products")}</p>
                                </div>
                            </div>

                            {/* <!-- Tab Start --> */}
                            <div className="col-md-12 text-center">
                                <ul className="ec-pro-tab-nav nav justify-content-center">

                                    {Products.map((c, ci) => <li onClick={(e) => (handleTabArea(c._id.replace(/ /g , "") , ci , e))} key={ci}  className="nav-item">
                                        <a className={myClassNames("nav-link" , {"active" : ci === 0 })} href="javascript:void(0)" >For {c._id}</a></li>)}

                                </ul>
                            </div>
                            {/* <!-- Tab End --> */}

                        </div>


                        <div className="row">
                            <div className="col">
                                <div className="tab-content">
                                    {/* <!-- 1st Product tab start --> */}



                                    {Products.map((product, pi) => {


                                        return (
                                            <div key={pi} className={myClassNames("tab-pane fade", { "show active": pi === 0 })} id={`tab-pro-for-${product._id.replace(/ /g , "")}`}>
                                                <div className="row">
                                                    {/* <!-- Product Content --> */}



                                                    {product.products.length > 0 && product.products.map((prdct, ii) => {
                                                        
                                                          let img = ""
                                                          if(!prdct || !prdct.product.images || !prdct.product.images.imagesUrl[0]){
                                                              img = "https://via.placeholder.com/500"
                                                          }else {
                                                           img = ImageLink(prdct.product.images.imagesUrl[0])
                                                          }

                                                        return (

                                                            <div key={ii} className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content" data-aos="zoom-in">

                                                                <div className="ec-product-inner">
                                                                    <div className="ec-pro-image-outer">


                                                                        <div className="ec-pro-image">
                                                                            <Link to={`/product/${prdct.product.category}/${prdct.product._id}`} className="image">
                                                                                <img className="main-image" src={img} alt="Product" />
                                                                            </Link>

                                                                            <span className="flags">
                                                                                {prdct.product.stock == 0 && <span className="sale">{t("Sale")}</span>}
                                                                                {prdct.product.condition == "new" && <span className="new">{t("New")}</span>}
                                                                            </span>

                                                                            {prdct.product.oldprice && <span className="percentage">{Math.floor( Math.floor(product.price * Math.floor(product.oldprice - product.price) ) / 100 )}%</span>}

                                                                            <div className="ec-pro-actions">
                                                                                <button title="Add To Cart" className="ec-btn-group compare" onClick={() => {addToCart(prdct.product)}}><i className="fas fa-cart-plus"></i></button>
                                                                                <button className="ec-btn-group wishlist" title="Wishlist" onClick={() => {addToWishList(prdct.product._id , user._id)}}><i className="far fa-heart"></i></button >
                                                                            </div>
                                                                            <a href="#" className="quickview" title="Quick view" onClick={() => {quickView(prdct.product._id)}}><i className="far fa-eye"></i></a>

                                                                        </div>
                                                                    </div>

                                                                    <div className="ec-pro-content">
                                                                        <h5 className="ec-pro-title"><Link to={`/product/${prdct.product.category}/${prdct.product._id}`}>{prdct.product.name}</Link></h5>

                                                                        {/* {prdct.product.reviews.length > 0 && <div className="ec-pro-rating">
                                                                            {
                                                                                calculateRating(prdct.product.reviews).map((star, i) => {
                                                                                    return (
                                                                                        <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                                    )
                                                                                })

                                                                            }

                                                                        </div>} */}

                                                                        <span className="ec-price">
                                                                            {prdct.product.oldprice && <span className="old-price">${prdct.product.oldprice}</span>}
                                                                            <span className="new-price">${prdct.product.price}</span>
                                                                        </span>

                                                                        <div className="ec-pro-option">

                                                                            {prdct.product.color.length > 0 &&
                                                                                <div className="ec-pro-color">
                                                                                    <span className="ec-pro-opt-label">{t("Color")}</span>
                                                                                    <ul className="ec-opt-swatch ec-change-img">

                                                                                        {prdct.product.color.map((color, index) => {
                                                                                            return (
                                                                                                <li className={myClassNames({ "active": index == 0 })} onClick={(e) => { handleColor(index, e) }} key={index} >
                                                                                                    <a className="ec-opt-clr-img"><span style={{ backgroundColor: color }}></span></a>
                                                                                                </li>
                                                                                            );
                                                                                        })}


                                                                                    </ul>
                                                                                </div>
                                                                            }

                                                                            {prdct.product.size.length > 0 &&
                                                                                <div className="ec-pro-size">
                                                                                    <span className="ec-pro-opt-label">{t("Size")}</span>
                                                                                    <ul className="ec-opt-size">
                                                                                        {prdct.product.size.map((size, index) => {
                                                                                            return (
                                                                                                <li className={myClassNames({ "active": index == 0 })} onClick={(e) => { handleSize(size.price, index, e) }} key={index}>
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

                                                <div className="col-sm-12 shop-all-btn">
                                                    <Link to={`/category/${product._id}`}>{t("Shop All Collection")}</Link>
                                                </div>
                                            </div>
                                        )
                                    })}



                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                // {/* <!-- Product tab Area end --> */}
            } </Fragment>
    );
}

export default AreaProducts;
