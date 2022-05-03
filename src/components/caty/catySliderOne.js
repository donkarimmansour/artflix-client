import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import {  ImageLink } from '../../shared/funs';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_catyone } from "../../redux/actions/products";
import Slider from "react-slick";


const CatySlideOne = (props) => {
    const { t } = useTranslation();
    const [Products, setProducts] = useState([])
    const caty = props.caty ? { "category": props.caty } : {}
    const limit = props.limit
    const skip = props.skip
    const sort = props.sort

    const dispatch = useDispatch()
    const { catyone } = useSelector(state => state.products)


    useEffect(() => {
        dispatch(get_catyone({ filter: caty, limit, skip, sort, catyName: props.caty }))
      }, [dispatch]);
    
  

    useEffect(() => {
        setProducts(catyone[props.caty])
    }, [catyone[props.caty]])

    const settings = {
        rows: 1,
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear" ,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 425,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 1,
            }
        }
        ]
      };

    return (

        <Fragment>
            {Products && Products.length > 0 &&

                // <!--  category Section Start -->
                <section className="section ec-category-section ec-category-wrapper-1 section-space-p">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="section-title">
                                    <h2 className="ec-bg-title">{t(props.caty)}</h2>
                                    <h2 className="ec-title">{t(props.caty)}</h2>
                                    <p className="sub-title">{t("Browse The Collection of Top Categories")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row margin-minus-tb-15">

 
                                         <Slider {...settings}>
                                        {Products.map((product, i) => {

                                            let img = ""
                                            if(!product.images || !product.images.imagesUrl[0]){
                                                img = "https://via.placeholder.com/500"
                                            }else {
                                            img = ImageLink(product.images.imagesUrl[0])
                                            }
                                            return (
                                             
                                                    <div key={i} className="ec_cat_slider" data-aos="flip-left">
                                                        <div className="ec_cat_content" style={{ width: "100%", display: "inline-block" }}>
                                                            <div className="ec_cat_inner">
                                                                <div className="ec-cat-image">
                                                                    <img src={img}
                                                                        alt={product.name} />
                                                                </div>
                                                                <div className="ec-cat-desc">
                                                                    <span className="ec-section-btn"><Link to={`/product/${product.category}/${product._id}`} className="btn-primary"
                                                                        tabIndex="0">{("lighting")}</Link></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                            );
                                        })}


                            </Slider>
                        </div>
                    </div>
                </section>

                // {/* <!--  category Section end --> */}

            }

        </Fragment>





    );
}

export default CatySlideOne;
