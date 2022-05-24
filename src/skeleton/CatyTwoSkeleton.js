import React from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const CatyTwoSkeleton = () => {
  return (

    // <!--  Category Section Start -->
    <section className="section ec-category-section ec-category-wrapper-4 section-space-p">
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

        <div className="row cat-space-3 cat-auto margin-minus-tb-15">


          <div className="col-lg-2 col-md-4 col-sm-12" >
            <div className="cat-card">
              <div className="card-img">
                <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
              </div>
              <div className="cat-detail">
                <Skeleton direction={'ltr'} duration={1} height={20} width={150} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={120} />
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-12" >
            <div className="cat-card">
              <div className="card-img">
                <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
              </div>
              <div className="cat-detail">
                <Skeleton direction={'ltr'} duration={1} height={20} width={150} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={120} />
              </div>
            </div>
          </div>



          <div className="col-lg-2 col-md-4 col-sm-12" >
            <div className="cat-card">
              <div className="card-img">
                <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
              </div>
              <div className="cat-detail">
                <Skeleton direction={'ltr'} duration={1} height={20} width={150} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={120} />
              </div>
            </div>
          </div>


          <div className="col-lg-2 col-md-4 col-sm-12" >
            <div className="cat-card">
              <div className="card-img">
                <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
              </div>
              <div className="cat-detail">
                <Skeleton direction={'ltr'} duration={1} height={20} width={150} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={120} />
              </div>
            </div>
          </div>


          <div className="col-lg-2 col-md-4 col-sm-12" >
            <div className="cat-card">
              <div className="card-img">
                <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
              </div>
              <div className="cat-detail">
                <Skeleton direction={'ltr'} duration={1} height={20} width={150} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={120} />
              </div>
            </div>
          </div>


          <div className="col-lg-2 col-md-4 col-sm-12" >
            <div className="cat-card">
              <div className="card-img">
                <Skeleton direction={'ltr'} duration={1} height={200} width={300} />
              </div>
              <div className="cat-detail">
                <Skeleton direction={'ltr'} duration={1} height={20} width={150} />
                <Skeleton direction={'ltr'} duration={1} height={20} width={120} />
              </div>
            </div>
          </div>



        </div>
      </div>
    </section>


  );

}

export default CatyTwoSkeleton;