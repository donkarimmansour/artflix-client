import React from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductsSkeleton from "./productsSkeleton";


const SingleSkeleton = () => {
    return (

        <div className="product_page">

            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="ec-pro-rightside ec-common-rightside col-lg-9 order-lg-last col-md-12 order-md-first">

                            {/* <!-- Single product content Start --> */}
                            <div className="single-pro-block">
                                <div className="single-pro-inner">

                                    <div className="row">

                                        <div className="single-pro-img">
                                            <div className="single-product-scroll">
                                                <Skeleton direction={'ltr'} duration={1} height={200} width={200} />
                                            </div>
                                        </div>



                                        <div className="single-pro-desc">
                                            <div className="single-pro-content">

                                                <Skeleton direction={'ltr'} duration={1} height={20} width={200} /><br/>
                                                <Skeleton direction={'ltr'} duration={1} height={20} width={200} /><br/>
                                                <Skeleton direction={'ltr'} duration={1} height={20} width={200} /><br/>
                                                <Skeleton direction={'ltr'} duration={1} height={20} width={200} /><br/>
                                                <Skeleton direction={'ltr'} duration={1} height={20} width={200} /><br/>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            {/* <!--Single product content End -->

                  
                    {/* <!-- product details description area end --> */}
                        </div>
                        {/* <!-- Sidebar Area Start --> */}













                        <div className="ec-pro-leftside ec-common-leftside col-lg-3 order-lg-first col-md-12 order-md-last">

                            <div className="ec-sidebar-slider">
                                <div className="ec-sb-slider-title"><Skeleton direction={'ltr'} duration={1} height={20} width={150} /> </div>


                                <div className="slick-slide row" style={{ display: "flex" }} >
                                    <div className="col-lg-12 col-md-6 col-sm-6"><Skeleton direction={'ltr'} duration={1} height={100} width={200} /></div>
                                    <div className="col-lg-12 col-md-6 col-sm-6"><Skeleton direction={'ltr'} duration={1} height={100} width={200} /></div>
                                    <div className="col-lg-12 col-md-6 col-sm-6"><Skeleton direction={'ltr'} duration={1} height={100} width={200} /></div>
                                    <div className="col-lg-12 col-md-6 col-sm-6"><Skeleton direction={'ltr'} duration={1} height={100} width={200} /></div>
                                </div>

                            </div>
                        </div>


                    </div>

                </div>


                <ProductsSkeleton />

            </section>


        </div>



    );

}

export default SingleSkeleton;