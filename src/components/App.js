import React, { Fragment, Suspense, useEffect, useState, lazy } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getCookie } from "../shared/cookie"
import Header from "./header"
import Footer from "./footer";
import Panel from "./stuff/panel";
import Model from "./stuff/model";
import Aboutus from "./pages/aboutus";
import Contactus from "./pages/contactus";
import Maintenance from "./pages/maintenance";
import Error404 from "./pages/error404";
import Backsoon from "./pages/backsoon";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsCondition from "./pages/termsCondition";
import FAQ from "./pages/FAQ";
import Page from "./pages/page"; 
import Signup from "./user/signup";
import Login from "./user/login";
import Cancellation from "./pages/cancellation"
import Shipping from "./pages/shipping"
import Forgot from "./user/forgot";
import Services from "./stuff/services"; 
import CartBox from "./cart/cartBox";
import IndexPage from "./indexPage";
import Review from "./stuff/review";
import QuerySearch from "../contexts/search";
import ProductsSkeleton from "../skeleton/productsSkeleton";
import CatyOneSkeleton from "../skeleton/CatyOneSkeleton";
import CatyTwoSkeleton from "../skeleton/CatyTwoSkeleton";
import ItemsSkeleton from "../skeleton/ItemsSkeleton";
import SlidersSkeleton from "../skeleton/sliderSkeleton";
import SingleSkeleton from "../skeleton/singleSkeleton";
import { useTranslation } from "react-i18next";
const Products = lazy(() => import("./products/products")) ;
const AreaProducts = lazy(() => import("./products/areaProducts")) ;
const SingleProduct = lazy(() => import("./products/singleProduct")) ;
const MainSlider = lazy(() => import("./stuff/mainSlider")) ;
const FeatureAndLimit = lazy(() => import("./stuff/featureAndLimit")) ;
const CatySlideOne = lazy(() => import("./caty/catySliderOne")) ;
const CatySlideTwo = lazy(() => import("./caty/catySliderTwo")) ;
const Category = lazy(() => import("./caty/category")) ;
const Profile = lazy(() => import("./user/profile")) ;
const Cart = lazy(() => import("./cart/cart")) ;
const Checkout = lazy(() => import("./cart/checkout")) ;
const Wishlist = lazy(() => import("./stuff/wishlist")) ;
const Track = lazy(() => import("./stuff/track")) ;



const App = () => {
  const [style, setStyle] = useState(0);
 const [query, setQuery] = useState("***");
 const { i18n } = useTranslation();

  useEffect(() => {

    const dark = getCookie("dark") ? getCookie("dark") : "false"
    const rtl = getCookie("rtl") ? getCookie("rtl") : "false"
    const cbg = getCookie("cbg") ? getCookie("cbg") : false
    const cskin = getCookie("cskin") ? getCookie("cskin") : false
    const lang = getCookie("lang") ? getCookie("lang") : "en"

    if (lang) {
        i18n.changeLanguage(lang) 
    }

    if (dark) {
      const head = document.head;
      const link = document.createElement("link");

      if (dark !== "false") {
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = `/assets/css/dark.css`;

        head.appendChild(link);
      } else {
        if (head.querySelector('link[href="/assets/css/dark.css"]'))
          head.querySelector('link[href="/assets/css/dark.css"]').remove()
      }

    }

    if (rtl) {
      const head = document.head;
      const link = document.createElement("link");

      if (rtl !== "false") {
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = `/assets/css/rtl.css`;

        head.appendChild(link);
      } else {
        if (head.querySelector('link[href="/assets/css/rtl.css"]'))
          head.querySelector('link[href="/assets/css/rtl.css"]').remove()
      }

    }


    if (cbg) {
      const head = document.head;
      const link = document.createElement("link");

      if (!head.querySelector(`link[href="/assets/css/${cbg}.css"]`)) {
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = `/assets/css/${cbg}.css`

        head.appendChild(link);
        document.querySelector("body").classList.add("body-" + cbg);
      }

    }


    if (cskin) {
      const head = document.head;
      const link = document.createElement("link");

      if (!head.querySelector(`link[href="/assets/css/skin-${cskin}.css"]`)) {
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = `/assets/css/skin-${cskin}.css`

        head.appendChild(link);
      }

    }

    return () => {
    //  setCookie("fullscreen", "false")
    }

  }, [style]);



  return (

    <div className="app">
      <BrowserRouter>

        <Header setQuery={setQuery}  style={style} setStyle={setStyle}/>

        <Routes>
 

          <Route path="/" element={
            <Fragment>

             <Suspense fallback={<SlidersSkeleton />}>
                 <MainSlider skip="0" limit="10" sort={'{"updatedAt" : -1}'}/> 
              </Suspense> 

                <Suspense fallback={<ProductsSkeleton />}>
                 <Products skip="0" limit="12" sort={'{"updatedAt" : -1}'}/>
               </Suspense> 

      {/*           <Suspense fallback={<ProductsSkeleton />}>
                <AreaProducts caty='["Cameras"]' skip="0" limit="4" sort={'{"updatedAt" : -1}'}/>
               </Suspense>
               
                <Suspense fallback={<CatyOneSkeleton />}> 
                 <CatySlideOne caty="Cameras" skip="0" limit="10" sort={'{"updatedAt" : -1}'} /> 
               </Suspense>

              <Suspense fallback={<CatyTwoSkeleton />}> 
                 <CatySlideTwo  caty="Cameras" skip="0" limit="10" sort={'{"updatedAt" : -1}'}/> 
               </Suspense>  */}

              <Suspense fallback={<ItemsSkeleton />}> 
               <FeatureAndLimit skip="0" limit="4" sort='{"updatedAt" : 1}' />   
               </Suspense>  


               
                <Review /> 

                 <Services /> 


            </Fragment>
          } />



         <Route path="/track/:orderid/:productid" element={
            <Suspense fallback={<IndexPage />}>
              <Track />
            </Suspense>
          } />

          <Route path="/product/:caty/:id" element={
            <Suspense fallback={<SingleSkeleton />}>
              <SingleProduct />
            </Suspense>
          } />

          <Route path="/cart" element={
            <Suspense fallback={<IndexPage />}>
              <Cart />            
            </Suspense>
          } />

          <Route path="/checkout" element={
            <Suspense fallback={<IndexPage />}>
              <Checkout />         
            </Suspense>
          } />

          <Route path="/wishlist" element={
            <Suspense fallback={<IndexPage />}>
              <Wishlist />           
             </Suspense>
          } />

          <Route path="/Category" element={
            <Suspense fallback={<ProductsSkeleton />}>

              <QuerySearch.Provider value={query}>
                <Category limit="12" />
              </QuerySearch.Provider>

            </Suspense>
          } />

          <Route path="/Category/:caty" element={
            <Suspense fallback={<ProductsSkeleton />}>

              <QuerySearch.Provider value={query}>
                <Category limit="12" />
              </QuerySearch.Provider>

            </Suspense>
          } />
          <Route path="/Category/ser" element={
            <Suspense fallback={<ProductsSkeleton />}>

              <QuerySearch.Provider value={query}>
                <Category limit="12" />
              </QuerySearch.Provider>

            </Suspense>
          } />

  
          {/* <Route path="/catigory/ser/:caty/:inc" element={<Category limit="3" />} />  */}

          {/* start user */}
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:id" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/profile/*" element={
            <Suspense fallback={<IndexPage />}>
              <Profile />
           </Suspense>
          } />
          {/* end user */}


          {/* start pages */}
          <Route path="/pages/*" element={<Page />}>
            <Route path="about-us" element={<Aboutus />} />
            <Route path="contact-us" element={<Contactus />} />
            <Route path="faq" element={<FAQ />} />
            {/* <Route path="backsoon" element={<Backsoon />} />
            <Route path="maintenance" element={<Maintenance />} /> */}
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsCondition />} />
            <Route path="cancellation" element={<Cancellation />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="*" element={<Error404 />} />
            {/* end pages */}


          </Route>

          <Route path="/*" element={<Error404 />} />

        </Routes>


        <CartBox />
        <Model />

        <Panel style={style} setStyle={setStyle} />

        <Footer />  


      </BrowserRouter>
    </div>

  );
}

export default App;
