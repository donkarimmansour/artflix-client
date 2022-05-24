import React from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const CatyOneSkeleton = () => {
  return (

    <section className="section ec-category-section ec-category-wrapper-1 section-space-p">
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
        <div className="row margin-minus-tb-15">



          <div className="ec_cat_slider" >
            <div className="ec_cat_content" style={{ width: "100%", display: "inline-block" }}>
              <div className="ec_cat_inner">
                <div className="ec-cat-image">
                  <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
                </div>
                <div className="ec-cat-desc">
                  <span className="ec-section-btn"><Skeleton direction={'ltr'} duration={1} height={20} width={100} /></span>
                </div>
              </div>
            </div>
          </div>


          
      
        </div>
      </div>
    </section>

  );

}

export default CatyOneSkeleton;