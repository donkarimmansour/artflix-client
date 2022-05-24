import React from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ProductsSkeleton = () => {
  return (

    <section className="section ec-new-product section-space-p">

      <div className="container">
        <div className="row">

          <div className="col-md-12 text-center">
            <div className="section-title">
              <h2 className="ec-bg-title"><Skeleton direction={'ltr'} duration={1} height={20} width={50} /></h2>
              <h2 className="ec-title"><Skeleton direction={'ltr'} duration={1} height={20} width={50} /></h2>
              <p className="sub-title"><Skeleton direction={'ltr'} duration={1} height={20} width={150} /></p>
            </div>
          </div>

        </div>

        <div className="row">
          {/* <!-- New Product Content --> */}


          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content" >

            <div className="ec-product-inner">
              <div className="ec-pro-image-outer">


                <div className="ec-pro-image">
                    <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
                </div>
              </div>

                <Skeleton direction={'ltr'} duration={1} height={20} width={30} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={200} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={200} />

      
            </div>


          </div>
        
        
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content" >

            <div className="ec-product-inner">
              <div className="ec-pro-image-outer">


                <div className="ec-pro-image">
                    <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
                </div>
              </div>

                <Skeleton direction={'ltr'} duration={1} height={20} width={30} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={200} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={200} />

      
            </div>


          </div>
        
        

        
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content" >

            <div className="ec-product-inner">
              <div className="ec-pro-image-outer">


                <div className="ec-pro-image">
                    <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
                </div>
              </div>

                <Skeleton direction={'ltr'} duration={1} height={20} width={30} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={200} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={200} />

      
            </div>


          </div>
        
        

        
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content" >

            <div className="ec-product-inner">
              <div className="ec-pro-image-outer">


                <div className="ec-pro-image">
                    <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
                </div>
              </div>

                <Skeleton direction={'ltr'} duration={1} height={20} width={30} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={200} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={200} />

      
            </div>


          </div>
        
        
        
          </div>



        <div className="col-sm-12 shop-all-btn">
          <Skeleton direction={'ltr'} duration={1} height={"20"} width={"70"} />
        </div>


      </div>

    </section>



  );

}

export default ProductsSkeleton;