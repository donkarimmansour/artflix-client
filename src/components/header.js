import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import myClassName from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { get_catigories } from "../redux/actions/categories";
import { get_wishlist_count } from "../redux/actions/wishlist";
import { COUNT_WISHLIST } from "../redux/constans/wishlist";
import  'aos/dist/aos.css';
import { isAuthentication, Logout } from "../redux/actions/auth"

const Header = (props) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
   // const [query] = useSearchParams();

    const topMessage = t("Welcome")
    const setQuery = props.setQuery
    const location = useLocation()
    const pathname = location.pathname
   // const inc = query.get("inc")

    const [cartCount, setcartCount] = useState(0)
    const [watchlistCount, setwatchlistCount] = useState(0)
    const [Categories, setCategories] = useState([])
    const [queryVal, setqueryVal] = useState("")
 
    const { carts } = useSelector(state => state.carts)
    const { count } = useSelector(state => state.wishlist)
    const { catigories } = useSelector(state => state.catigories)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isAuthentication());
    }, [dispatch]);


    useEffect(() => {
        dispatch(get_catigories({}))
    }, [dispatch])

    // useEffect(() => {
    //     if (inc && inc != "") { 
    //         setqueryVal(inc)
    //     }
    // }, [inc])

    useEffect(() => {
        setcartCount(carts.length)
    }, [carts])


    useEffect(() => {
        setCategories(catigories) 
    }, [catigories])



     const { isAuth , token , user } = useSelector((state) => state.auth);
    const authorization = { "Authorization": `bearer ${token}` }

    useEffect(() => {
        if (isAuth) {
            dispatch(get_wishlist_count({ filter: { userId: user._id } }, authorization))
        }
    }, [dispatch])

    useEffect(() => {
        //  if (isAuth) {
        setwatchlistCount(count)
        // }

    }, [count])


    const openSlider = () => {

        document.querySelector(".ec-side-cart-overlay").style.display = "block"
        document.querySelector("#ec-mobile-menu.ec-side-cart").classList.add("ec-open")

    }


    const closeSlider = () => {

        document.querySelector(".ec-side-cart-overlay").style.display = "none"
        document.querySelector("#ec-mobile-menu.ec-side-cart").classList.remove("ec-open")

    }

    const openCart = () => {
        document.querySelector(".ec-side-cart-overlay").style.display = "block"
        document.querySelector("#ec-side-cart.ec-side-cart").classList.add("ec-open")
    }

    const handleQueryVal = (e) => {
        let val = e.target.value
        setqueryVal(val)

        if(val === ""){
            setQuery("***")
            return
        } setQuery(val)

    }

    //not necessary
    const querySubmit = (e) => {
        e.preventDefault()
         
        navigate("/category")
        
        if(queryVal === ""){
            setQuery("***")
            return
        } setQuery(queryVal)
    }

    const menuToggle = (e) => {
        e.target.parentElement.className.includes("active") ? e.target.parentElement.classList.remove("active") : e.target.parentElement.classList.add("active")
        e.target.parentElement.querySelector("ul").style.display === "block" ? e.target.parentElement.querySelector("ul").style.display = "none" : e.target.parentElement.querySelector("ul").style.display = "block"
  
     }

     const menuToggleClick = (e) => {
        e.target.parentElement.click()
     }
   
    return (

        <Fragment>


            {/* <!-- Header start  --> */} 

            <header className="ec-header">
 
                {/* <!--Ec Header Top Start --> */}
                <div className="header-top">
                    <div className="container">
                        <div className="row align-items-center">


                            {/* <!-- Header Top social Start --> */}
                            <div className="col text-left header-top-left d-none d-lg-block">
                                <div className="header-top-social">
                                    <span className="social-text text-upper">{t("Follow us on:")}</span>
                                    <ul className="mb-0">
                                        <li className="list-inline-item"><a className="hdr-facebook" target="_blank" href="https://facebook.com/cheapshop2023"><i
                                            className="fab fa-facebook"></i></a></li>
                                        <li className="list-inline-item"><a className="hdr-instagram" target="_blank" href="https://instagram.com/cheapshop2023"><i
                                            className="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- Header Top social End -->


   <!-- Header Top Message Start --> */}
                            <div className="col text-center header-top-center">
                                <div className="header-top-message text-upper">
                                    <span>{topMessage}</span>
                                </div>
                            </div>


                            {

   /* <!-- Header Top Message End -->

    
   <!-- Header Top Language Currency --> */}
                            <div className="col header-top-right d-none d-lg-block">
                                <div className="header-top-lan-curr d-flex justify-content-end">

                                    {/*<!-- Language Start --> */}
                                    <div className="header-top-lan dropdown">
                                        <button className="dropdown-toggle text-upper" data-bs-toggle="dropdown">{t("Language")} <i className="fas fa-caret-down"></i></button>
                                        <ul className="dropdown-menu">
                                            <li className={i18n.language === "en" ? "active" : ""}><button className="dropdown-item" onClick={() => { i18n.changeLanguage("en") }}>{t("English")}</button></li>
                                            <li className={i18n.language === "ar" ? "active" : ""}><button className="dropdown-item" onClick={() => { i18n.changeLanguage("ar") }}>{t("Arabic")}</button></li>
                                        </ul>
                                    </div>
                                    {/* <!-- Language End --> */}

                                </div>
                            </div>
                            {/* <!-- Header Top Language Currency --> 


   <!-- Header Top responsive Action --> */}
                            <div className="col d-lg-none ">
                                <div className="ec-header-bottons">


                                    {/* <!-- Header User Start --> */}
                                    <div className="ec-header-user dropdown">
                                        <button className="dropdown-toggle ec-header-btn" data-bs-toggle="dropdown">
                                            <i className="far fa-user"></i>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-right">

                                            {isAuth &&
                                                <Fragment>

                                                    <li><Link className="dropdown-item" to="/profile">{t("Profile")}</Link></li>

                                                    <li><button className="dropdown-item" onClick={() => {
                                                        Logout(() => {
                                                            dispatch(Logout(() => {
                                                                dispatch({
                                                                    type: COUNT_WISHLIST,
                                                                    payload: 0

                                                                });
                                                                navigate("/")
                                                            }))  
                                                        })
                                                    }}>{t("Logout")}</button></li>
                                                </Fragment>


                                            }

                                            {!isAuth &&
                                                <Fragment>
                                                    <li><Link className="dropdown-item" to="/register">{t("Register")}</Link></li>
                                                    <li><Link className="dropdown-item" to="/login">{t("Login")}</Link></li>

                                                </Fragment>

                                            }



                                        </ul>
                                    </div>
                                    {/* <!-- Header User End -->


         <!-- Header Cart Start --> */}
                                    <Link to={isAuth ? "/wishlist" : "/login"} className="ec-header-btn ec-header-wishlist">
                                        <div className="header-icon">
                                            <i className="far fa-heart"></i>
                                        </div>
                                        <span className="ec-header-count">{watchlistCount}</span>
                                    </Link>
                                    {/* <!-- Header Cart End -->


         <!-- Header Cart Start --> */}
                                    <button className="ec-header-btn ec-side-toggle" onClick={openCart}>
                                        <div className="header-icon" >
                                            <i className="fas fa-cart-plus"></i>

                                        </div>
                                        <span className="ec-header-count cart-count-lable">{cartCount}</span>
                                    </button>
                                    {/* <!-- Header Cart End -->


         <!-- Header menu Start --> */}
                                    <button className="ec-header-btn ec-side-toggle d-lg-none" onClick={openSlider}>
                                        <i className="fas fa-bars"></i>
                                    </button>
                                    {/* <!-- Header menu End --> */}


                                </div>
                            </div>
                            {/* <!-- Header Top responsive Action --> */}
                        </div>
                    </div>
                </div>
                {/* <!-- Ec Header Top  End --> */}





                {/* <!-- Ec Header Bottom  Start --> */}
                <div className="ec-header-bottom d-none d-lg-block">
                    <div className="container position-relative">
                        <div className="row">
                            <div className="ec-flex">
                                {/* <!-- Ec Header Logo Start --> */}
                                <div className="align-self-center">
                                    <div className="header-logo">
                                        <Link to="/">
                                            <img src="/assets/imgs/ws-artflix.png" alt="Site Logo" />
                                            <img className="dark-logo" src="/assets/imgs/ws-artflix.png" alt="Site Logo" style={{ display: "none" }} /></Link>
                                    </div>
                                </div>
                                {/* <!-- Ec Header Logo End -->

      <!-- Ec Header Search Start --> */}
                                <div className="align-self-center">
                                    <div className="header-search">
                                        <form className="ec-btn-group-form" onSubmit={querySubmit}>
                                            <input className="form-control" value={queryVal} onChange={(e) => { handleQueryVal(e) }} placeholder={t("Enter Your Product Name...")} type="text" />
                                            <button className="submit" type="submit">
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                {/* <!-- Ec Header Search End -->


      <!-- Ec Header Button Start --> */}
                                <div className="align-self-center">
                                    <div className="ec-header-bottons">
                                        {/* <!-- Header User Start --> */}
                                        <div className="ec-header-user dropdown">
                                            <button className="dropdown-toggle ec-header-btn" data-bs-toggle="dropdown">
                                                <i className="far fa-user"></i>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-right">
                                                {isAuth &&
                                                    <Fragment>

                                                        <li><Link className="dropdown-item" to="/profile">{t("Profile")}</Link></li>

                                                        <li><button className="dropdown-item" onClick={() => {
                                                          dispatch(Logout(() => {
                                                                dispatch({
                                                                    type: COUNT_WISHLIST,
                                                                    payload: 0

                                                                });
                                                                navigate("/")
                                                            }))  
                                                        }}>{t("Logout")}</button></li>
                                                    </Fragment>


                                                }

                                                {!isAuth &&
                                                    <Fragment>
                                                        <li><Link className="dropdown-item" to="/register">{t("Register")}</Link></li>
                                                        <li><Link className="dropdown-item" to="/login">{t("Login")}</Link></li>

                                                    </Fragment>

                                                }
                                            </ul>
                                        </div>
                                        {/* <!-- Header User End -->

            <!-- Header wishlist Start --> */}
                                        <Link to={isAuth ? "/wishlist" : "/login"} className="ec-header-btn ec-header-wishlist">
                                            <div className="header-icon">
                                                <i className="far fa-heart"></i>

                                            </div>
                                            <span className="ec-header-count">{watchlistCount}</span>
                                        </Link>
                                        {/* <!-- Header wishlist End -->
            <!-- Header Cart Start --> */}
                                        <button className="ec-header-btn ec-side-toggle" onClick={openCart}>
                                            <div className="header-icon">
                                                <i className="fas fa-shopping-bag"></i>

                                            </div>
                                            <span className="ec-header-count cart-count-lable">{cartCount}</span>
                                        </button>
                                        {/* <!-- Header Cart End --> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Ec Header Button End --> */}









                {/* <!-- Header responsive Bottom  Start --> */}
                <div className="ec-header-bottom d-lg-none">
                    <div className="container position-relative">
                        <div className="row ">
                            {/* <!-- Ec Header Logo Start --> */}
                            <div className="col">
                                <div className="header-logo">
                                    <Link to="/">
                                        <img
                                            src="/assets/imgs/ws-artflix.png"
                                            alt="Site Logo" />
                                        <img className="dark-logo"
                                            src="/assets/imgs/ws-artflix.png"
                                            alt="Site Logo" style={{ display: "none" }} />
                                    </Link>
                                </div>
                            </div>
                            {/* <!-- Ec Header Logo End -->
   <!-- Ec Header Search Start --> */}
                            <div className="col">
                                <div className="header-search">
                                    <form className="ec-btn-group-form"  onSubmit={querySubmit}>
                                        <input className="form-control" value={queryVal} onChange={(e) => { handleQueryVal(e) }} placeholder={t("Enter Your Product Name...")} type="text" />
                                        <button className="submit" type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            {/* <!-- Ec Header Search End --> */}
                        </div>
                    </div>
                </div>
                {/* <!-- Header responsive Bottom  End -->




             <!-- EC Main Menu Start --> */}
                <div id="ec-main-menu-desk" className="d-none d-lg-block sticky-nav">
                    <div className="container position-relative">
                        <div className="row">
                            <div className="col-md-12 align-self-center">
                                <div className="ec-main-menu">


                                    <ul>
                                        <li className={myClassName("", { "active": pathname === "/" })}><Link to="/">{t("Home")}</Link></li>
                                        <li className={myClassName("", { "active": pathname === "/category" })}><Link to="/category">{t("All Categories")}</Link></li>

                                        {Categories && Categories.length > 0 && Categories.map((cats, csi) => {

                                            return (
                                                <li key={csi} className={myClassName("dropdown", { "active": pathname.includes("/" + cats.name[0]) })}><Link to="#">{t(cats.name[0])}</Link>
                            
                                                    <ul className="sub-menu">

                                                        {cats.categories.map((cat, ci) => {

                                                            return (
                                                                <li key={ci} className={myClassName("", { "active": pathname.replace("%20" , "").includes(cat.category.name.replace(/ /g , "")) })}><Link to={`/category/${cat.category.name}`}>{cat.category.name}</Link></li>
                                                            )
                                                        })

                                                        }


                                                    </ul>

                                                </li>
                                            )
                                        })

                                        }

                                     
                            
                                        <li className={myClassName("dropdown scroll-to", { "active": pathname.includes("/pages") })}><a href="javascript:void(0)"><img
                                            src="/assets/imgs/ws-scroll.svg" className="svg_img header_svg scroll" alt="" /></a>
                                            <ul className="sub-menu">
                                                <li className="menu_title">{t('pages')}</li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/about-us") })}><Link to="/pages/about-us">{t('About Us')}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/contact-us") })}><Link to="/pages/contact-us">{t("Contact Us")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/maintenance") })}><Link to="/pages/maintenance">{t("Maintenance")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/faq") })}><Link to="/pages/faq">{t("FAQ")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/error404") })}><Link to="/pages/error404">{t("Error 404")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/backsoon") })}><Link to="/pages/backsoon">{t("Backsoon")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/privacy") })}><Link to="/pages/privacy">{t("Privacy Policy")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/terms") })}><Link to="/pages/terms">{t("Terms Condition")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/cancellation") })}><Link to="/pages/cancellation">{t("Cancellation Policy")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/shipping") })}><Link to="/pages/shipping">{t("Shipping Delivery Policy")}</Link></li>
                                            </ul>
                                        </li>

                                    </ul>




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Ec Main Menu End -->




<!-- ekka Mobile Menu Start --> */}
                <div id="ec-mobile-menu" className="ec-side-cart ec-mobile-menu">
                    <div className="ec-menu-title">
                        <span className="menu_title">{t("My Menu")}</span>
                        <button className="ec-close" onClick={closeSlider}>×</button>
                    </div>
                    <div className="ec-menu-inner">
                        <div className="ec-menu-content">
                            <ul>


                                <li className={myClassName("", { "active": pathname === "" })}><Link to="/">{t("Home")}</Link></li>
                                <li className={myClassName("", { "active": pathname === "/category" })}><Link to="/category">{t("All Categories")}</Link></li>

                                {Categories && Categories.length > 0 && Categories.map((cats, csi) => {

                                    return (
                                        <li key={csi} className={myClassName("dropdown", { "active": pathname.includes("/" + cats.name[0]) })}>
                                            <span className="menu-toggle" onClick={(e) => { menuToggle(e) }}></span><Link to="#">{t(cats.name[0])}</Link>
                                            <ul className="sub-menu">
      
      
                                          {cats.categories.map((cat, ci) => {

                                                    return (
                                                        <li key={ci} className={myClassName("", { "active": pathname.replace("%20" , "").includes(cat.category.name.replace(/ /g , "")) })}><Link to={`/category/${cat.category.name}`}>{cat.category.name}</Link></li>
                                                    )
                                                })

                                                } 


                                            </ul>

                                        </li>
                                    )
                                })

                                } 

                                        <li className={myClassName("dropdown scroll-to", { "active": pathname.includes("/pages") })}>
                                            <a href="javascript:void(0)" onClick={(e) => { menuToggle(e) }} ><img onClick={(e) => { menuToggleClick(e) }} src="/assets/imgs/ws-scroll.svg" className="svg_img header_svg scroll" alt="" /></a>
                                            <ul className="sub-menu">
                                                <li className="menu_title">{t('pages')}</li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/about-us") })}><Link to="/pages/about-us">{t('About Us')}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/contact-us") })}><Link to="/pages/contact-us">{t("Contact Us")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/maintenance") })}><Link to="/pages/maintenance">{t("Maintenance")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/faq") })}><Link to="/pages/faq">{t("FAQ")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/error404") })}><Link to="/pages/error404">{t("Error 404")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/backsoon") })}><Link to="/pages/backsoon">{t("Backsoon")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/privacy") })}><Link to="/pages/privacy">{t("Privacy Policy")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/terms") })}><Link to="/pages/terms">{t("Terms Condition")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/cancellation") })}><Link to="/pages/cancellation">{t("Cancellation Policy")}</Link></li>
                                                <li className={myClassName("", { "active": pathname.includes("/pages/shipping") })}><Link to="/pages/shipping">{t("Shipping Delivery Policy")}</Link></li>
                                            </ul>
                                        </li>

                               
                            </ul>
                        </div>



                        <div className="header-res-lan-curr">
                            <div className="header-top-lan-curr">


                                {/* <!-- Language Start --> */}
                                <div className="header-top-lan dropdown">
                                    <button className="dropdown-toggle text-upper" data-bs-toggle="dropdown">{t("Language")} <i className="fas fa-caret-down"></i></button>
                                    <ul className="dropdown-menu">
                                        <li className={i18n.language == "en" ? "active" : ""}><button className="dropdown-item" onClick={() => { i18n.changeLanguage("en") }}>{t("English")}</button></li>
                                        <li className={i18n.language == "ar" ? "active" : ""}><button className="dropdown-item" onClick={() => { i18n.changeLanguage("ar") }}>{t("Arabic")}</button></li>
                                    </ul>
                                </div>
                                {/* <!-- Language End -*/}

                            </div>

                            <div className="header-res-social">
                                <div className="header-top-social">
                                    <ul className="mb-0">
                                        <li className="list-inline-item"><a className="hdr-facebook" target="_blank" href="https://facebook.com/cheapshop2023"><i
                                            className="fab fa-facebook"></i></a></li>
                                        <li className="list-inline-item"><a className="hdr-instagram" target="_blank" href="https://instagram.com/cheapshop2023"><i
                                            className="fab fa-instagram"></i></a></li>

                                    </ul>
                                </div>
                            </div>
                            {/* <!-- Social End --> */}


                        </div>
                    </div>
                </div>
                {/* <!-- ekka mobile Menu End --> */}
            </header>



            {/* <!-- Header End  --> */}









            {/* <!-- Footer navigation panel for responsive display -->  */}
            <div className="ec-nav-toolbar">
                <div className="container">
                    <div className="ec-nav-panel">
                        <div className="ec-nav-panel-icons">
                            <a href="javascript:void(0);" className="navbar-toggler-btn ec-header-btn ec-side-toggle" onClick={openSlider}>
                                <i className="fas fa-bars"></i>

                            </a>
                        </div>
                        <div className="ec-nav-panel-icons">
                            <a href="javascript:void(0);" onClick={openCart} className="toggle-cart ec-header-btn ec-side-toggle">
                                <i className="fas fa-cart-plus"></i>
                                <span className="ec-cart-noti ec-header-count cart-count-lable">{cartCount}</span>
                            </a>
                        </div>
                        <div className="ec-nav-panel-icons">
                            <Link to="/" className="ec-header-btn">
                                <i className="fas fa-home"></i>
                            </Link>
                        </div>
                        <div className="ec-nav-panel-icons">
                            <Link to={isAuth ? "/profile" : "/login"} className="ec-header-btn">

                                <i className="far fa-heart"></i>
                                <span className="ec-cart-noti">{watchlistCount}</span>
                            </Link>
                        </div>
                        <div className="ec-nav-panel-icons">
                            <Link to={isAuth ? "/profile" : "/login"} className="ec-header-btn"><i className="fas fa-user"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer navigation panel for responsive display end --> */}



        </Fragment>
    );
}
export default Header;