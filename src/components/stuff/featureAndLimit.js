import React, { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { countDown, extractDesk, ImageLink } from '../../shared/funs';
import { get_feature_products, get_limited_products, set_product_id } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; import { create_carts } from "../../redux/actions/carts";
import { create_wishlist } from "../../redux/actions/wishlist";
import Slider from "react-slick";
import { isAuthentication } from "../../redux/actions/auth"
import { toast } from "react-toastify";
import AOS from 'aos';
import Image from 'lqip-react';
 
const FeatureAndLimit = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [LimitedProducts, setLimitedProducts] = useState([])
    const [FeatureProducts, setFeatureProducts] = useState([])
    const [countDownDateL, setCountDownDateL] = useState({ days: "", hr: "", min: "", sec: "" })
    const [countDownDateF, setCountDownDateF] = useState({ days: "", hr: "", min: "", sec: "" })
    const [currentFeature, setCurrentFeature] = useState(0)
    const [currentLimited, setCurrentLimited] = useState(0)

    const limit = props.limit
    const skip = props.skip
    // const sort = props.sort

    const dispatch = useDispatch()
    const { featureproducts, limitedproducts } = useSelector(state => state.products)
    const { isAuth, token, user } = useSelector((state) => state.auth);
    const authorization = { "Authorization": `bearer ${token}` }


    useEffect(() => { AOS.init({ duration: 800 }); }, []);

    useEffect(() => {
        dispatch(isAuthentication());
    }, [dispatch]);



    useEffect(() => {
        dispatch(get_feature_products({ filter: {status : "published"}, limit, skip, sort: '{"viewcount" : -1}' }))
        dispatch(get_limited_products({ filter: {status : "published"}, limit, skip, sort: '{"limitedAtt" : -1}' }))
    }, [dispatch])

    useEffect(() => {
        setFeatureProducts(featureproducts)
        setLimitedProducts(limitedproducts)
    }, [featureproducts, limitedproducts])


    const settingsFeature = {
        rows: 1,
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        beforeChange: (current, next) => setCurrentFeature(next)

    };

    const settingsLimited = {
        rows: 1,
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        beforeChange: (current, next) => setCurrentLimited(next)
    };


    useEffect(() => {

        if (FeatureProducts && FeatureProducts[currentFeature] && FeatureProducts[currentFeature].limitedAtt
            && LimitedProducts && LimitedProducts[currentLimited] && LimitedProducts[currentLimited].limitedAtt) {

            setCountDownDateF({ ...countDown(FeatureProducts[currentFeature].limitedAtt) })
            setCountDownDateL({ ...countDown(LimitedProducts[currentLimited].limitedAtt) })
            const clearCountDown = setInterval(() => {
                setCountDownDateL({ ...countDown(LimitedProducts[currentLimited].limitedAtt) })
                setCountDownDateF({ ...countDown(FeatureProducts[currentFeature].limitedAtt) })
            }, 1000);
            return () => {
                clearInterval(clearCountDown)
            }

        }


    }, [currentLimited, currentFeature, FeatureProducts, LimitedProducts])


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
        // <!--  Feature & Special Section Start -->
        <section className="section ec-fre-spe-section section-space-p">
            <div className="container">
                <div className="row">
                    {/* <!--  Feature Section Start --> */}
                    <div className="ec-fre-section col-lg-6 col-md-6 col-sm-6 margin-b-30" data-aos="fade-left" >

                        {FeatureProducts && FeatureProducts.length > 0 &&

                            <>

                                <div className="col-md-12 text-left">
                                    <div className="section-title">
                                        <h2 className="ec-bg-title">{t("Feature Items")}</h2>
                                        <h2 className="ec-title">{t("Feature Items")}</h2>
                                    </div>
                                </div>

                                <Slider {...settingsFeature} className="ec-fre-products">

                                    {FeatureProducts.map((product, pi) => {
                                        return (

                                            <div key={pi} className="ec-fs-product" style={{ width: "100%", display: "inline-block" }} >
                                                <div className="ec-fs-pro-inner">

                                                    <div className="ec-fs-pro-image-outer col-lg-6 col-md-6 col-sm-6">
                                                        <div className="ec-fs-pro-image">

                                                            <Link to={`/product/${product.category}/${product._id}`} className="image"
                                                                tabIndex="0"><Image className="main-image"
                                                                    thumbnail={"https://via.placeholder.com/500"}
                                                                    aspectRatio={'500x500'}
                                                                    src={ImageLink(product.images[0])}
                                                                    alt="Product" />
                                                            </Link>
                                                            
                                                            <a href="javascript:void(0);" className="quickview" title="Quick view" onClick={() => { quickView(product._id) }}><i style={{ color: "black" }} className="far fa-eye"></i></a>

                                                        </div>
                                                    </div>

                                                    <div className="ec-fs-pro-content col-lg-6 col-md-6 col-sm-6">
                                                        <h5 className="ec-fs-pro-title"><Link to={`/product/${product.category}/${product._id}`}
                                                            tabIndex="0">{product.name}</Link>
                                                        </h5>


                                                        {isAuth && <div className="ec-fs-price">
                                                            {product.oldprice && <span className="old-price">${product.oldprice}</span>}
                                                            <span className="new-price">${product.price}</span>
                                                        </div>}
                                                        

                                                        {product.limitedAtt != null && new Date(product.limitedAtt).getTime() > Date.now() &&
                                                            <div className="countdowntimer">
                                                                <span id="ec-fs-count-1" className="style colorDefinition labelformat">
                                                                    <span className="timerDisplay label4" style={{ display: "flex" }}>

                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateF.days}</span>
                                                                            <span className="periodDisplay">{t("Days")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateF.hr}</span>
                                                                            <span className="periodDisplay">{t("Hours")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateF.min}</span>
                                                                            <span className="periodDisplay">{t("Min")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateF.sec}</span>
                                                                            <span className="periodDisplay">{t("Sec")}</span>
                                                                        </span>

                                                                    </span>

                                                                </span>
                                                            </div>

                                                        }



                                                        <div className="ec-fs-pro-desc">{extractDesk(product.description, 60)}</div>
                                                        <div className="ec-fs-pro-btn">
                                                            <a href="javascript:void(0);" className="btn btn-lg btn-secondary" onClick={() => { addToCart(product) }} >{t('Add To Cart')}</a>
                                                            <a href="javascript:void(0);" className="btn btn-lg btn-primary" onClick={() => { addToWishList(product._id, user._id) }}>{t('Wishlist')}</a>
                                                        </div>


                                                    </div>
                                                </div>

                                            </div>

                                        )
                                    })
                                    }

                                </Slider>

                            </>

                        }

                    </div>
                    {/* <!--  Feature Section End -->






                <!--  Special Section Start --> */}
                    <div className="ec-spe-section col-lg-6 col-md-6 col-sm-6" data-aos="fade-right">

                        {FeatureProducts && FeatureProducts.length > 0 &&
                            <>

                                <div className="col-md-12 text-left">
                                    <div className="section-title">
                                        <h2 className="ec-bg-title">{t("Limited Time Offer")}</h2>
                                        <h2 className="ec-title">{t("Limited Time Offer")}</h2>
                                    </div>
                                </div>


                                <Slider {...settingsLimited} className="ec-spe-products">


                                    {FeatureProducts.map((product, pi) => {
                                        return (


                                            <div key={pi} className="ec-fs-product" style={{ width: "100%", display: "inline-block" }} >
                                                <div className="ec-fs-pro-inner">

                                                    <div className="ec-fs-pro-image-outer col-lg-6 col-md-6 col-sm-6">
                                                        <div className="ec-fs-pro-image">

                                                            <Link to={`/product/${product.category}/${product._id}`} className="image"
                                                                tabIndex="0">
                                                                    
                                                                    <Image className="main-image"
                                                                    thumbnail={"https://via.placeholder.com/500"}
                                                                    aspectRatio={'500x500'}
                                                                    src={ImageLink(product.images[0])}
                                                                    alt="Product" />
                                                                    
                                                                    </Link>

                                                            <a href="javascript:void(0);" className="quickview" title="Quick view" onClick={() => { quickView(product._id) }}><i style={{ color: "black" }} className="far fa-eye"></i></a>

                                                        </div>
                                                    </div>

                                                    <div className="ec-fs-pro-content col-lg-6 col-md-6 col-sm-6">
                                                        <h5 className="ec-fs-pro-title"><Link to={`/product/${product.category}/${product._id}`}
                                                            tabIndex="0">{product.name}</Link>
                                                        </h5>


                                                        {isAuth && <div className="ec-fs-price">
                                                            {product.oldprice && <span className="old-price">${product.oldprice}</span>}
                                                            <span className="new-price">${product.price}</span>
                                                        </div>}
                                                        

                                                        {product.limitedAtt != null && new Date(product.limitedAtt).getTime() > Date.now() &&
                                                            <div className="countdowntimer">
                                                                <span id="ec-fs-count-1" className="style colorDefinition labelformat">
                                                                    <span className="timerDisplay label4" style={{ display: "flex" }}>

                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateL.days}</span>
                                                                            <span className="periodDisplay">{t("Days")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateL.hr}</span>
                                                                            <span className="periodDisplay">{t("Hours")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateL.min}</span>
                                                                            <span className="periodDisplay">{t("Min")}</span>
                                                                        </span>
                                                                        <span className="displaySection">
                                                                            <span className="numberDisplay">{countDownDateL.sec}</span>
                                                                            <span className="periodDisplay">{t("Sec")}</span>
                                                                        </span>

                                                                    </span>

                                                                </span>
                                                            </div>

                                                        }

                                                        <div className="ec-fs-pro-desc">{extractDesk(product.description, 60)}</div>
                                                        <div className="ec-fs-pro-btn">
                                                            <a href="javascript:void(0);" className="btn btn-lg btn-secondary" onClick={() => { addToCart(product) }} >{t('Add To Cart')}</a>
                                                            <a href="javascript:void(0);" className="btn btn-lg btn-primary" onClick={() => { addToWishList(product._id, user._id) }}>{t('Wishlist')}</a>
                                                        </div>


                                                    </div>
                                                </div>

                                            </div>


                                        )
                                    })
                                    }

                                </Slider>
                            </>}


                    </div>
                </div> </div>
        </section>
        // {/* <!--  Feature & Special Section end --> */}
    );
}

export default FeatureAndLimit;