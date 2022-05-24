import React from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ItemsSkeleton = () => {
    return (

        <section className="section ec-fre-spe-section section-space-p">
            <div className="container">
                <div className="row">
                    {/* <!--  Feature Section Start --> */}
                    <div className="ec-fre-section col-lg-6 col-md-6 col-sm-6 margin-b-30" >


                        <div className="col-md-12 text-left">
                            <div className="section-title">
                                   <Skeleton direction={'ltr'} duration={1} height={20} width={150} />
                            </div>
                        </div>



                        <div className="ec-fs-product" style={{ width: "100%", display: "inline-block" }} >
                            <div className="ec-fs-pro-inner">

                                <div className="ec-fs-pro-image-outer col-lg-6 col-md-6 col-sm-6">
                                    <div className="ec-fs-pro-image">
                                        <Skeleton direction={'ltr'} duration={1} height={200} width={200} />

                                    </div>
                                </div>

                                <div className="ec-fs-pro-content col-lg-6 col-md-6 col-sm-6">


                                    <Skeleton direction={'ltr'} duration={1} height={20} width={200} />
                                    <Skeleton direction={'ltr'} duration={1} height={20} width={200} />



                                    <div className="ec-fs-pro-desc">

                                        <Skeleton direction={'ltr'} duration={1} height={20} width={200} />
                                        <Skeleton direction={'ltr'} duration={1} height={20} width={200} />

                                    </div>


                                </div>
                            </div>

                        </div>




                    </div>
                    {/* <!--  Feature Section End -->






        <!--  Special Section Start --> */}
                    <div className="ec-spe-section col-lg-6 col-md-6 col-sm-6" >



                        <div className="col-md-12 text-left">
                            <div className="section-title">
                                <Skeleton direction={'ltr'} duration={1} height={20} width={150} />
                            </div>
                        </div>


                        <div className="ec-fs-product" style={{ width: "100%", display: "inline-block" }} >
                            <div className="ec-fs-pro-inner">

                                <div className="ec-fs-pro-image-outer col-lg-6 col-md-6 col-sm-6">
                                    <div className="ec-fs-pro-image">
                                        <Skeleton direction={'ltr'} duration={1} height={200} width={200} />

                                    </div>
                                </div>

                                <div className="ec-fs-pro-content col-lg-6 col-md-6 col-sm-6">

                                    <Skeleton direction={'ltr'} duration={1} height={20} width={200} />
                                    <Skeleton direction={'ltr'} duration={1} height={20} width={200} />



                                    <div className="ec-fs-pro-desc">

                                        <Skeleton direction={'ltr'} duration={1} height={20} width={200} />
                                        <Skeleton direction={'ltr'} duration={1} height={20} width={200} />

                                    </div>

                                </div>
                            </div>

                        </div>





                    </div>
                </div> </div>
        </section>


    );

}

export default ItemsSkeleton;