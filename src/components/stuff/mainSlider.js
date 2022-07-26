import React, { Fragment, useEffect, useState } from "react"
import { ImageVIEW } from '../../shared/funs';
import { get_main } from "../../redux/actions/main";
import { useDispatch, useSelector } from "react-redux";
import myClassNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay , Navigation, Pagination } from 'swiper';
import 'swiper/css/pagination';
import { useTranslation } from "react-i18next";


const MainSlider = (props) => {
    const dispatch = useDispatch()
    const [Main, setMain] = useState([])
    const { t } = useTranslation();

    const limit = props.limit
    const skip = props.skip
    const sort = props.sort
    const { main } = useSelector(state => state.main)

    useEffect(() => {
        dispatch(get_main({ limit, skip, sort }))
    }, [dispatch])

    useEffect(() => {
        setMain(main)
    }, [main])



    return (

        <Fragment> {Main && Main.length > 0 &&

            // <!-- Main Slider Start -->

            <div className="sticky-header-next-sec ec-main-slider section section-space-pb">

                <div className="ec-slider swiper-container main-slider-nav main-slider-dot">

                    {/* <!-- Main slider --> */}

                    <Swiper
                        modules={[Navigation, Pagination , Autoplay]}
                        slidesPerView={1}
                        loop={true}
                        speed={2000}
                        effect={"slide"}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }
                        }
                        pagination={{
                            el: '.swiper-pagination',
                            clickable: true,
                        }}

                        navigation={
                            {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }
                        }

                    >

                        {Main.map((main, mi) => { 
                            return (


                                <SwiperSlide key={mi} style={{ backgroundImage: `url(${ImageVIEW(main.image)})` }}
                                    className={myClassNames("ec-slide-item d-flex ec-slide-m", { "ec-slide-1": mi === 0 }, { "ec-slide-2": mi !== 0 })}>

                                    <div className="container align-self-center">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center">
                                                <div className="ec-slide-content slider-animation">
                                                    <h1 className="ec-slide-title">{t(main.name)}</h1>
                                                    <h2 className="ec-slide-stitle">{t(main.description)}</h2>
                                                    <p>{t(main.extra)}</p>
                                                    <a href={main.link} target="_blank" className="btn btn-lg btn-secondary">{t(main.btn)}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </SwiperSlide>

                            )

                        })}
                    </Swiper>

                    <div className="swiper-pagination swiper-pagination-white"></div>
                    <div className="swiper-buttons">
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </div>
                </div>



            </div>



            // // // <!-- Main Slider End --> 

        }
        </Fragment>
    );
}

export default MainSlider;