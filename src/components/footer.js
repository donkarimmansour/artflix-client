import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { set_subscribe } from "../redux/actions/subscribe";
import { loader } from "../shared/elements";
import * as yup from "yup";
import { get_count, get_random_product } from "../redux/actions/products";
import { ImageLink } from "../shared/funs";
import myClassname from "classnames";
import { CLEAR_MESSAGE } from "../redux/constans/message"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';

const Footer = () => {
    const { t } = useTranslation();

    toast.configure()

    const [Newletter, setNewletter] = useState(false);
    const [Pupup, setPupup] = useState(false);
    const [Product, setProduct] = useState({});

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.loading)
    const { errorMsg, successMsg } = useSelector(state => state.message)
    const { count, randomproduct } = useSelector(state => state.products)

    useEffect(() => {

        // AOS.init({
        // //    duration: 2000
        // });


        const clearPupup = setInterval(() => {
            setPupup(true)
        }, ((1000 * 60) * 5));

        const clearSubscribe = setTimeout(() => {
            setNewletter(true)
        }, (1000 * 60) * 5);

        return () => {
            clearTimeout(clearSubscribe)
            clearTimeout(clearPupup)
        }

    }, [])



    // whatsapp

    const handleWhatsapp = (e) => {

        if (document.querySelector(".ec-style.ec-right-bottom .ec-panel").style.display == "block")
            document.querySelector(".ec-style.ec-right-bottom .ec-panel").style.display = "none"
        else
            document.querySelector(".ec-style.ec-right-bottom .ec-panel").style.display = "block"
    }




    // random product =>
    useEffect(() => {
        dispatch(get_count({ filter: { "name": { "$ne": "xxxlxxx@gmail.com" } } }))
    }, [dispatch])

    useEffect(() => {
        dispatch(get_random_product({ filter: { "name": { "$ne": "xxxlxxx@gmail.com" } }, skip: Math.floor(Math.random() * count), limit: 1 }))
    }, [count])


    useEffect(() => {
        setProduct(randomproduct)
    }, [randomproduct])

    useEffect(() => {
        if (successMsg === "sent") {
            toast.success("Thank you for subscribing")

            setNewletter(false)
            dispatch({ type: CLEAR_MESSAGE })
        }
    }, [successMsg])

    useEffect(() => {
        if (errorMsg !== "") {
            toast.error(typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0]))
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [errorMsg]);


    //subscribe =>


    const initialValues = {
        email: ""
    }

    const onSubmit = values => {
        dispatch(set_subscribe(values.email))
    }


    const emailValidator = yup.object().shape({
        email: yup.string().required(t("email field is required")).email(t("email must be email"))
    })



         //dropdown

    const handleDropdown = (e) => {
        if (e.target.parentElement.parentElement.parentElement.querySelector(".ec-footer-dropdown").style.display == "block")
            e.target.parentElement.parentElement.parentElement.querySelector(".ec-footer-dropdown").style.display = "none"
        else
            e.target.parentElement.parentElement.parentElement.querySelector(".ec-footer-dropdown").style.display = "block"
    }
 

    return (
        <Fragment>

         {loading && loader()}

            {/* <!-- Recent Purchase Popup  --> */}
            {Product && Product.name &&


                <div className={myClassname("recent-purchase", { "hide": !Pupup })}>

                    <img src={!Product.images || !Product.images.imagesUrl[0] ? "https://via.placeholder.com/500" : ImageLink(Product.images.imagesUrl[0])} 
                    alt="payment image" />

                    <div className="detail">
                        <p>{t("Someone in new just bought")}</p>
                        <h6><Link style={{ all: "unset", cursor: "pointer" }} to={`/product/${Product.category}/${Product._id}`}>{Product.name}</Link></h6>
                    </div>

                    <a href="javascript:void(0)" className="icon-btn recent-close" onClick={() => { setPupup(false) }}>×</a>

                </div>
             }

            {/* <!-- Recent Purchase Popup end --> */}


            {/* <!-- Newsletter Modal Start --> */} 

            <div id="ec-popnews-bg" style={{ display: Newletter ? "block" : "none" }}></div>
            <div id="ec-popnews-box" style={{ display: Newletter ? "block" : "none" }} >

            

                <div id="ec-popnews-close" onClick={() => { setNewletter(false) }}><i className="fas fa-times"></i></div>
                <div className="row">
                    <div className="col-md-6 disp-no-767">
                        <img src="/assets/imgs/ws-newsletter.png"
                            alt="newsletter" />
                    </div>
                    <div className="col-md-6">
                        <div id="ec-popnews-box-content">
                            <h2>{t("Subscribe Newsletter")}</h2>
                            <p>{t("Subscribe the ekka ecommerce to get in touch and get the future update.")} </p>

                            {
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={onSubmit}
                                    validationSchema={emailValidator}>

                                    {
                                        ({ touched, errors, isValid, dirty }) => (

                                            <Form id="ec-popnews-form" action="#" method="post">
                                                {/* {errorMsg && <span className="form-error">{typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])}</span>}*/}
                                                <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small> 
                                                <Field type="text" name="email" placeholder={t("Enter your email")} required="" />
                                                <button disabled={(!dirty || !isValid || loading)} type="submit" className="btn btn-primary" name="subscribe">{t("Subscribe")}</button>

                                            </Form>


                                        )

                                    }</Formik>}


                        </div>
                    </div>
                </div>
            </div>

         
            {/* <!-- Newsletter Modal end --> */}






            {/* <!-- Whatsapp --> */}
            <div className="ec-style ec-right-bottom" >
                {/* <!-- Start Floating Panel Container --> */}
                <div className="ec-panel">

                    {/* <!-- Panel Header --> */}
                    <div className="ec-header">
                        <strong>{t("Need Help?")}</strong>
                        <p>{t("Chat with us on WhatsApp")}</p>
                    </div>

                    {/* <!-- Panel Content --> */}
                    <div className="ec-body">
                        <ul>
                            {/* <!-- Start Single Contact List --> */}

                            <li>
                                <a href="https://wa.me/+212694204517" target="_blank" className="ec-list">
                                    <div className="d-flex bd-highlight">

                                        {/* <!-- Profile Picture --> */}
                                        <div className="ec-img-cont">
                                            <img src="/assets/imgs/ws-profile_01.jpg"
                                                className="ec-user-img" alt="Profile image" />
                                            <span className="ec-status-icon"></span>
                                        </div>

                                        {/* <!-- Display Name & Last Seen --> */}
                                        <div className="ec-user-info">
                                            <span>Mansour Karim</span>
                                            <p>Manour {t("left")} 10 {t("mins ago")}</p>
                                        </div>


                                    </div>
                                </a>
                            </li>

                            <li>
                                <a href="https://wa.me/+212680830141" target="_blank" className="ec-list">
                                    <div className="d-flex bd-highlight">

                                        {/* <!-- Profile Picture --> */}
                                        <div className="ec-img-cont">
                                            <img src="/assets/imgs/ws-profile_01.jpg"
                                                className="ec-user-img" alt="Profile image" />
                                            <span className="ec-status-icon"></span>
                                        </div>

                                        {/* <!-- Display Name & Last Seen --> */}
                                        <div className="ec-user-info">
                                            <span>Fadili Zakariae</span>
                                            <p>Fadili {t("left")} 7 {t("mins ago")}</p>
                                        </div>


                                    </div>
                                </a>
                            </li>




                            {/* <!--/ End Single Contact List --> */}
                        </ul>
                    </div>
                </div>
                {/* <!--/ End Floating Panel Container --> */}




                {/* <!-- Start Right Floating Button--> */}
                <div className="ec-right-bottom" onClick={(e) => { handleWhatsapp(e) }}>
                    <div className="ec-box">
                        <div className="ec-button rotateBackward">
                            <img className="whatsapp" 
                                src="/assets/imgs/ws-whatsapp.png"
                                alt="whatsapp icon" />
                        </div>
                    </div>
                </div>
                {/* <!--/ End Right Floating Button--> */}



            </div>
            {/* <!-- Whatsapp end --> */}




            {/* <!-- Footer Start --> */}
            <footer className="ec-footer section-space-mt">
                <div className="footer-container">
                    {/* <div className="footer-offer">
                <div className="container">
                    <div className="row">
                        <div className="text-center footer-off-msg">
                            <span>Win a contest! Get this limited-editon</span><a href="#" target="_blank">View
                                Detail</a>
                        </div>
                    </div>
                </div>
            </div> */}
                    <div className="footer-top section-space-footer-p">
                        <div className="container">



                            <div className="row">
                                <div className="col-sm-12 col-lg-3 ec-footer-contact">
                                    <div className="ec-footer-widget">

                                        <div className="ec-footer-logo"><img src="/assets/imgs/ws-artflix.png" alt="" /></div>
                                            
                                    
                                        <h4 className="ec-footer-heading">{t("Contact us")} <div className='ec-heading-res' onClick={(e) => {handleDropdown(e)}}><i className='ecicon eci-angle-down'></i></div></h4>

                                        <div className="ec-footer-links ec-footer-dropdown">
                                            <ul className="align-items-center">
                                                <li className="ec-footer-link">71 Pilgrim Avenue Chevy Chase, east california.</li>
                                                <li className="ec-footer-link"><span>Call Us:</span><a href="tel:+440123456789">+44
                                                    0123 456 789</a></li>
                                                <li className="ec-footer-link"><span>{t("Email")}:</span><a
                                                    href="mailto:example@ec-email.com">+example@ec-email.com</a></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-lg-2 ec-footer-info">
                                    <div className="ec-footer-widget">
                                        <h4 className="ec-footer-heading">{t("Information")} <div className='ec-heading-res' onClick={(e) => {handleDropdown(e)}}><i className='ecicon eci-angle-down'></i></div></h4>
                                        <div className="ec-footer-links ec-footer-dropdown">
                                            <ul className="align-items-center">
                                                <li className="ec-footer-link"><Link to="/pages/about-us">{t("About Us")}</Link></li>
                                                <li className="ec-footer-link"><Link to="/pages/faq">{t("FAQ")}</Link></li>
                                                <li className="ec-footer-link"><Link to="/pages/contact-us">{t("Contact Us")}</Link></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-lg-2 ec-footer-account">
                                    <div className="ec-footer-widget">
                                        <h4 className="ec-footer-heading">{t("Account")} <div className='ec-heading-res' onClick={(e) => {handleDropdown(e)}}><i className='ecicon eci-angle-down'></i></div></h4>
                                        <div className="ec-footer-links ec-footer-dropdown">
                                            <ul className="align-items-center">
                                            <li className="ec-footer-link"><Link to="/profile">{t("Account")}</Link></li>
                                            <li className="ec-footer-link"><Link to="/profile">{t("Orders")}</Link></li>
                                            <li className="ec-footer-link"><Link to="/profile">{t("Wishlist")}</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-lg-2 ec-footer-service">
                                    <div className="ec-footer-widget">
                                        <h4 className="ec-footer-heading">{t("Services")} <div className='ec-heading-res' onClick={(e) => {handleDropdown(e)}}><i className='ecicon eci-angle-down'></i></div></h4>
                                        <div className="ec-footer-links ec-footer-dropdown">
                                            <ul className="align-items-center">
                                                <li className="ec-footer-link"><Link to="/pages/privacy">{t("Policy Policy")}</Link></li>
                                                <li className="ec-footer-link"><Link to="/pages/terms">{t("Term Condition")}</Link></li>
                                                <li className="ec-footer-link"><Link to="/pages/cancellation">{t("Cancellation Policy")}</Link></li>
                                                <li className="ec-footer-link"><Link to="/pages/shipping">{t("Shipping Delivery Policy")}</Link></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-lg-3 ec-footer-news">
                                    <div className="ec-footer-widget">
                                        <h4 className="ec-footer-heading">{t("Newsletter")} <div className='ec-heading-res' onClick={(e) => {handleDropdown(e)}}><i className='ecicon eci-angle-down'></i></div></h4>
                                        <div className="ec-footer-link ec-footer-dropdown">
                                            <ul className="align-items-center">
                                                <li className="ec-footer-link">{t("Get instant updates about our new products and special promos!")}</li>
                                            </ul>
                                            <div className="ec-subscribe-form">

                                                {
                                                    <Formik
                                                        initialValues={initialValues}
                                                        onSubmit={onSubmit}
                                                        validationSchema={emailValidator}>

                                                        {
                                                            ({ touched, errors, isValid, dirty }) => (

                                                                <Form id="ec-newsletter-form" name="ec-newsletter-form" method="post">
                                                                    {/* {errorMsg && <span className="form-error">{typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])}</span>} */}
                                                                    <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>
                                                                    <div id="ec_news_signup" className="ec-form">
                                                                        <Field type="text" name="email" placeholder={t("Enter your email")} required="" className="ec-email" />
                                                                        <button disabled={(!dirty || !isValid || loading)} id="ec-news-btn" type="submit" className="btn btn-primary" name="subscribe"><i className="ecicon eci-paper-plane-o" aria-hidden="true"></i></button>
                                                                     </div>
                                                                    

                                                                </Form>


                                                            )

                                                        }</Formik>}
  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row align-items-center">



                                {/* <!-- Footer social Start --> */}
                                <div className="col text-left footer-bottom-left">
                                    <div className="footer-bottom-social">
                                        <span className="social-text text-upper">{t("Follow us on")}:</span>
                                        <ul className="mb-0">
                                            <li className="list-inline-item"><a className="hdr-facebook" target="_blank" href="https://facebook.com/cheapshop2023"><i
                                                className="fab fa-facebook"></i></a></li>
                                            <li className="list-inline-item"><a className="hdr-instagram" target="_blank" href="https://instagram.com/cheapshop2023"><i
                                                className="fab fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- Footer social End -->


                               <!-- Footer Copyright Start --> */}
                                <div className="col text-center footer-copy">
                                    <div className="footer-bottom-copy ">
                                        <div className="ec-copy">{t("Copyright")} © 2021-2022 <a className="site-name text-upper"
                                            href="mailto:contact@cheap-shop.net" target="_blank">Karim<span>.</span></a>. {t("All Rights Reserved")}</div>
                                    </div>
                                </div>

                                {/* <!-- Footer Copyright End -->


                                <!-- Footer payment --> */}
                                <div className="col footer-bottom-right">
                                    <div className="footer-bottom-payment d-flex justify-content-end">
                                        <div className="payment-link">
                                            <img src="/assets/imgs/ws-payment.png" alt="" />
                                        </div>

                                    </div>
                                </div>
                                {/* <!-- Footer payment --> */}


                            </div>
                        </div>
                    </div>

                </div>
            </footer>
            {/* <!-- Footer Area End --> */}





            <a id="scrollUp" href="#top"  style={{position: "fixed" , zIndex: "2147483647"}}><i className="fas fa-arrow-up"></i></a>

        </Fragment>

    );
}

export default Footer;
