import React from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SlidersSkeleton = () => {
    return (

        <div className="sticky-header-next-sec ec-main-slider section section-space-pb">

            <div className="ec-slider swiper-container main-slider-nav main-slider-dot">

                {/* <!-- Main slider --> */}
                <Skeleton direction={'ltr'} duration={1} height={"50vh"} width={"100%"} />

            </div>

        </div>

    );

}

export default SlidersSkeleton;