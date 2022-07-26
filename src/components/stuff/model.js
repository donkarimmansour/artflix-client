import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, ImageVIEW, extractDesk } from '../../shared/funs';
import myClassNames from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { get_single_product, set_product_id } from "../../redux/actions/products";
import { create_carts } from "../../redux/actions/carts";
import Slider from "react-slick";
import Image from 'lqip-react';
import { isAuthentication } from "../../redux/actions/auth";

  
const Model = () => {
    const { t } = useTranslation();

    const [Product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()
    const { singleproduct, productid } = useSelector(state => state.products)
    const { isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(isAuthentication());

    }, [dispatch])

    useEffect(() => {

        if (productid !== "")
            dispatch(get_single_product({ filter: { "_id": productid } }))
    }, [dispatch, productid])

    useEffect(() => {
        setProduct(singleproduct)
    }, [singleproduct])


    const handleSize = (price, index, e) => {
        const sizes = e.target.parentElement.parentElement.querySelectorAll("li");

        sizes.forEach((em, i) => {
            em.className = ""
            if (i === index) {
                em.className = "active"

                em.parentElement.parentElement
                    .parentElement.parentElement
                    .parentElement.querySelector(".quickview-pro-content .new-price").innerText = `$${price}`

            }
        })

    }


    const handleColor = (index, e) => {
        const colors = e.target.parentElement.parentElement.querySelectorAll("li");

        colors.forEach((em, i) => {
            em.className = ""
            if (i === index) {
                em.className = "active"
            }
        })
    }





    const handleQuantityInc = () => {
        setQuantity(quantity => quantity + 1)
    }

    const handleQuantityDesk = () => {
        if (quantity !== 1) {
            setQuantity(quantity => quantity - 1)
        }

    }

    const addToCart = (product) => {
        dispatch(create_carts(product))
        dispatch(set_product_id(""))
    }

    const close = (e) => {
        dispatch(set_product_id(""))
    }

    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    const settingsImage = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
    };


    const settingsImages = {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        focusOnSelect: true,
        responsive: [
        {
            breakpoint: 479,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 2,
            }
        }
        ]
    };


    return (
        <Fragment>

            {productid !== "" && Product && Product.name &&
                //  {/* <!-- Modal --> */}


                <div className="modal-open">
                    <div className={myClassNames("modal fade", { "show": productid != "" })} id="ec_quickview_modal" tabIndex="-1" role="dialog" aria-modal="true" >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <button type="button" className="btn-close qty_close" onClick={(e) => { close(e) }}></button>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-5 col-sm-12 col-xs-12">

                                            <Slider {...settingsImage} asNavFor={slider2} className="qty-product-cover" ref={(slider) => setSlider1(slider)}>
                                                {( Product.images && Product.images.length > 0) &&
                                                    Product.images.map((image, i) => {

                                                        return (

                                                            <div key={i} className="qty-slide ">
                                                                <Image className="img-responsive" src={ImageVIEW(image)} alt={Product.name} thumbnail={"https://via.placeholder.com/500"} aspectRatio={'500x500'}/>
                                                            </div>


                                                        )
                                                    })
                                                }

                                            </Slider>


                                            <Slider {...settingsImages} asNavFor={slider1} className="qty-nav-thumb" ref={(slider) => setSlider2(slider)}>

                                                {(Product.images && Product.images.length > 0) &&
                                                    Product.images.map((image, i) => {

                                                        return (

                                                            <div key={i} className="qty-slide" >
                                                                <Image className="img-responsive" src={ImageVIEW(image)} alt={Product.name} thumbnail={"https://via.placeholder.com/500"} aspectRatio={'500x500'}/>
                                                            </div>


                                                        )
                                                    })
                                                } 

                                            {/* {(!Product.images || !Product.images.imagesUrl || Product.images.imagesUrl.length == 0) &&

                                                                <div className="qty-slide">
                                                                    <img className="img-responsive" src={"https://via.placeholder.com/500"} alt={Product.name} />
                                                                </div>


                                                            } */}

                                            </Slider>



                                        

                                        </div>

                             

                                        <div className="col-md-7 col-sm-12 col-xs-12">
                                <div className="quickview-pro-content">
                                    <h5 className="ec-quick-title"><a href="product-left-sidebar.html">{Product.name}</a>
                                    </h5>
                                    <div className="ec-quickview-rating">
                                        {
                                            calculateRating().map((star, i) => {
                                                return (
                                                    <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                )
                                            })


                                        }
                                    </div>

                                     <div className="ec-quickview-desc">{extractDesk(Product.description, 100)}</div>
                                    {(isAuth || !isAuth) && <div className="ec-quickview-price">
                                        {Product.oldprice && <span className="old-price">${Product.oldprice}</span>}
                                        <span className="new-price">${Product.price}</span>
                                    </div>}
                                    

                                    <div className="ec-pro-variation">

                                        {Product.color.length > 0 &&

                                            <div className="ec-pro-variation-inner ec-pro-variation-color">
                                                <span>Color</span>
                                                <div className="ec-pro-color">
                                                    <ul className="ec-opt-swatch">
                                                        {
                                                            Product.color.map((color, index) => {
                                                                return (
                                                                    <li key={index} className={myClassNames({ "active": index == 0 })} >
                                                                        <span style={{ backgroundColor: color }} onClick={(e) => { handleColor(index, e) }}></span></li>
                                                                );
                                                            })}
                                                    </ul>
                                                </div>
                                            </div>
                                        }

                                        {Product.size.length > 0 &&

                                            <div className="ec-pro-variation-inner ec-pro-variation-size ec-pro-size">
                                                <span>Size</span>
                                                <div className="ec-pro-variation-content">
                                                    <ul className="ec-opt-size">
                                                        {
                                                            Product.size.map((size, index) => {
                                                                return (
                                                                    <li key={index}
                                                                        className={myClassNames({ "active": index == 0 })}
                                                                        onClick={(e) => { handleSize(size.price, index, e) }}>
                                                                        <a href="javascript:void(0);" className="ec-opt-sz" >{size.size}</a>
                                                                    </li>
                                                                );
                                                            })}
                                                    </ul>
                                                </div>
                                            </div>
                                        }

                            {Product.shipping.length > 0 &&

                            <div className="ec-pro-variation-inner ec-pro-variation-size ec-pro-size">
                                <span>{t("Please select the preferred shipping method to use on this order")}</span>
                                <div className="ec-pro-variation-content">
                                    <ul className="ec-opt-size">
                                        {
                                            Product.shipping.map((shipping, index) => {
                                                return (
                                                    <li key={index}>
                                                        <a href="javascript:void(0);" className="ec-opt-sz" >{shipping.name}</a>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                            }


                                    </div>

                                    <div className="ec-quickview-qty">
                                        <div className="qty-plus-minus">
                                            <div className="dec ec_qtybtn" disabled={(quantity <= 1)} onClick={handleQuantityDesk}>-</div>
                                            <input className="qty-input" type="text" name="ec_qtybtn" onChange={() => { }} value={quantity} />
                                            <div className="inc ec_qtybtn" onClick={handleQuantityInc}>+</div>
                                        </div>
                                        <div className="ec-quickview-cart" onClick={() => { addToCart(Product) }}>
                                            <button className="btn btn-primary">Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

                  

                //  {/* <!-- Modal end --> */}
            }
        </Fragment >

    );
}

export default Model;
