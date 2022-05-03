import React, { useRef, useState } from "react"
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import { calculateRating } from "../../shared/funs";
import myClassNames from 'classnames';


const Review = () => {
    const { t } = useTranslation();
   const slider = useRef()
    const [currentSide, setCurrentSide] = useState(0)

    const handleReviews = (index) => {
        setCurrentSide(index)
        slider.current.slickGoTo(index);
    }


    const settings = {
        rows: 1,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        beforeChange: (current, next) => setCurrentSide(next)

    };

    const testimonial = [
        {
            fullname: "John Doe", rule: "General Manager", desc: `Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen` , avatar: "https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/1.jpg"
        },

        {
            fullname: "John Doe", rule: "General Manager", desc: `Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen` , avatar: "https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/2.jpg"
        },

        {
            fullname: "John Doe", rule: "General Manager", desc: `Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen` , avatar: "https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/3.jpg"
        }
    ]



    return (
        // <!-- ec testmonial Start -->

        <section className="section ec-test-section section-space-ptb-100 section-space-m" id="reviews">

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title mb-0">
                                <h2 className="ec-bg-title">{t("Testimonial")}</h2>
                                <h2 className="ec-title">{t("Client Review")}</h2>
                                <p className="sub-title mb-3">{t("What say client about us")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="ec-test-outer">
                            <ul id="ec-testimonial-slider">

                                <Slider {...settings}  ref={slider}>

                                    {  testimonial.map((team, ti) => {

                                        return (
                                            <li key={ti} className="ec-test-item">

                                                <img src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/top-quotes.svg" className="svg_img test_svg top"
                                                    alt="" />
                                                    
                                                <div className="ec-test-inner">

                                                    <div className="ec-test-content">
                                                        <div className="ec-test-desc">{team.desc}</div>
                                                        <div className="ec-test-name">{team.name}</div>
                                                        <div className="ec-test-designation">{team.rule}</div>
                                                        <div className="ec-test-rating">
                                                            {
                                                                calculateRating(5 , false).map((star, i) => {
                                                                    return (
                                                                        <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                    )
                                                                })

                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <img src="https://loopinfosol.in/themeforest/ekka-html-v3/ekka-html/assets/images/testimonial/bottom-quotes.svg" className="svg_img test_svg bottom"
                                                    alt="" />
                                            </li>
                                        )
                                    })}

                                </Slider>


                                <ul className="slick-dots" role="tablist">

                                {testimonial.map((team, ti) => {

                                    return (
                                        <li key={ti} onClick={() => {handleReviews(ti)}} className={myClassNames({"slick-active" : ti == currentSide})} role = "presentation" > 
                                        <img alt="testimonial" title="testimonial" src={team.avatar} /></li>
                                 )
                                  })}
                                
                                </ul>

                            </ul>
                        </div>
                    </div>
                </div>
 
        </section>
        // {/* <!-- ec testmonial end --> */}
        // {/* <!-- ec testmonial end --> */}
    );
}
export default Review;