import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { ImageLink } from '../../shared/funs';
import { Link } from "react-router-dom";
import { get_catytwo } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";


const CatySlideTwo = (props) => {
    const { t } = useTranslation();
    const [Products, setProducts] = useState([])
    const caty = props.caty ? { "category": props.caty } : {}
    const limit = props.limit
    const skip = props.skip
    const sort = props.sort

    const dispatch = useDispatch()
    const { catytwo } = useSelector(state => state.products)


    useEffect(() => {
        dispatch(get_catytwo({ filter: caty, limit, skip, sort, catyName: props.caty }))
    }, [dispatch])

    useEffect(() => {
        setProducts(catytwo[props.caty])
    }, [catytwo[props.caty]])

    const settings = {
        rows: 1,
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        cssEase: "linear" ,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 425,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 2,
            }
        }
        ]
      };


    return (


        <Fragment>
            {Products && Products.length > 0 &&


                // <!--  Category Section Start -->
                <section className="section ec-category-section ec-category-wrapper-4 section-space-p">
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

                            <div className="row cat-space-3 cat-auto margin-minus-tb-15">

                            <Slider {...settings}>
                                {Products.map((product, i) => {

                                        let img = ""
                                        if(!product.images || !product.images.imagesUrl[0]){
                                            img = "https://via.placeholder.com/500"
                                        }else {
                                        img = ImageLink(product.images.imagesUrl[0])
                                        }


                                    return (
                                        <div key={i} className="col-lg-2 col-md-4 col-sm-12" data-aos="flip-left">
                                            <div className="cat-card">
                                                <div className="card-img">
                                                    <img className="cat-icon"
                                                        src={img}
                                                        alt="cat-icon" />
                                                </div>
                                                <div className="cat-detail">
                                                    <h4>{product.name}</h4>
                                                    <h5>${product.price}</h5>
                                                    <Link className="btn-primary" to={`/product/${product.category}/${product._id}`}>{("shop now")}</Link>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })}

</Slider>

                            </div>
                        </div>
                </section>
                // {/* <!--  Category Section end --> */}

            }

        </Fragment>

    );
}

export default CatySlideTwo;
