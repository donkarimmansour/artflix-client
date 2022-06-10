import React, { Fragment, useContext, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, extractDesk, handleColor, handleSize, ImageLink } from '../../shared/funs';
import myClassNames from 'classnames';
import { Link, useNavigate, useParams  } from "react-router-dom";
import {  get_colors, get_count, get_filter, get_sizes, set_product_id } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { create_wishlist } from "../../redux/actions/wishlist";
import { create_carts } from "../../redux/actions/carts";
import { isAuthentication } from "../../redux/actions/auth"
import { get_catigories } from "../../redux/actions/categories";
import { toast } from "react-toastify";
import AOS from 'aos';
import QuerySearch from "../../contexts/search";
import Image from 'lqip-react';
 
 
const Category = (props) => {  
    const { t } = useTranslation(); 
    const navigate = useNavigate();
    const params = useParams();

    const [Products, setProducts] = useState([])
    const [Colors, setColors] = useState([])
    const [Categories, setCategories] = useState([])
    const [Sizes, setSizes] = useState([])
    const [Pages, setPages] = useState({ pages: ["", "", ""], currentPage: 1 })
    const [Filters, setFilters] = useState({ category: [], size: [], color: [], min: 1, max: 500, order: "1"  , nosize : true , nocolor : true})
    const query = useContext(QuerySearch)

    let caty = params.caty ? params.caty.replace(/ /g , "") : undefined

    const limit = props.limit 
   // const inc = query.get("inc")

    const dispatch = useDispatch()
    const { filters, count, sizes, colors } = useSelector(state => state.products)
    const { catigories } = useSelector(state => state.catigories)
    const { isAuth, token, user } = useSelector((state) => state.auth);
    const authorization = { "Authorization": `bearer ${token}` }

    useEffect(() => { AOS.init({ duration: 800 }); }, []);

    useEffect(() => {
        dispatch(isAuthentication());
    }, [dispatch]);



    useEffect(() => {
        dispatch(get_catigories({}))
        dispatch(get_colors({ distinct : "color" , caty : params.caty }))
        dispatch(get_sizes({ distinct : "size.size" , caty : params.caty }))
    }, [dispatch , caty])



    useEffect(() => {

        setCategories(catigories)

        setColors(colors)
        setSizes(sizes)


        if(caty){
            setFilters({ ...Filters, category: [params.caty], size: sizes, color: colors.filter(c => c !== null) })
        }else{
            if(catigories.length > 0){
                let cats = []
                 catigories.map(pc => pc.categories.map( cc => cats = new Set([...cats , cc.category.name]) ))
                 setFilters({ ...Filters, category: cats, size: sizes, color: colors.filter(c => c !== null) })
            }
        } 


    }, [catigories, sizes, colors , caty])



    useEffect(() => {


        const skip = Pages.currentPage === 1 ? 0 : ((Pages.currentPage - 1) * limit)

        const sort = Filters.order === 1 ? { "_id": 1 } :
            Filters.order === 2 ? { "uptatedAt": 1 } :
                Filters.order === 3 ? { "uptatedAt": -1 } :
                    Filters.order === 4 ? { "name": 1 } :
                        Filters.order === 5 ? { "name": -1 } :
                            Filters.order === 6 ? { "price": 1 } :
                                Filters.order === 7 ? { "price": -1 } : { "_id": 1 }


        let filter = {
            "category": { "$in": [...Filters.category] },
             price: { "$gt": Filters.min, "$lt": Filters.max }, 
             status : "published"
        }

       

        if (query != "***") {
            filter = { ...filter, $or: [{ name: { "$regex": query, "$options": "i" } }, { description: { "$regex": query, "$options": "i" } }] }
        }

        if (!Filters.nocolor && Filters.color.length > 0) {
            filter = { ...filter, color: { "$in": [...Filters.color] } }
        } else if (Filters.nocolor && Filters.color.length > 0) {
            filter = { ...filter, $or: [{ color: { "$in": [...Filters.color] } }, { color: null }] }
        }

        if (!Filters.nosize && Filters.size.length > 0) {
            filter = { ...filter, size: { "$elemMatch": { "size": { "$in": [...Filters.size] } } } }

        } else if (Filters.nosize && Filters.size.length > 0) {
            filter = { ...filter, $or: [{ size: { "$elemMatch": { "size": { "$in": [...Filters.size] } } } }, { size: { $size: 0 } }] }

        }

        filter = { ...filter }
        

        dispatch(get_count({ filter }))
        dispatch(get_filter({ filter, limit, skip, sort }))

    }, [Filters, Pages.currentPage , query])




    useEffect(() => {
        setProducts(filters)
        setPages((Pages) => {
            Pages.pages.length = Math.ceil(count / limit)
            Pages.pages.fill("page")
            return { ...Pages, pages: Pages.pages }
        })
    }, [filters, count])


 


    const handleColorSer = (e) => {

            if (e.target.style.backgroundColor) {

                const Pcolor = e.target.parentElement.parentElement
                const color = e.target.style.backgroundColor

                if (Pcolor.className.includes("active")) {
                    Pcolor.className = ""
                    if (e.target.getAttribute("data-type") === "nocolor") {
                        setFilters({ ...Filters, nocolor: !Filters.nocolor })

                    } else {
                        setFilters({ ...Filters, color: Filters.color.filter((item, pos, self) => item !== color) })
                    }

                } else {
                    Pcolor.className = "active"

                    if (e.target.getAttribute("data-type") === "nocolor") {
                        setFilters({ ...Filters, nocolor: !Filters.nocolor })

                    } else {
                        setFilters({ ...Filters, color: [...new Set([...Filters.color, color])] })
                    }


                }
            }
        

    }


    console.log(Filters);

 

    const handleSizeSearch = (e) => {
        if(e.target.value === "nosize"){
            setFilters({ ...Filters, nosize: e.target.checked })

        }else {
             const size = e.target.parentElement.querySelector("a").innerText;

        if (e.target.checked) {
            setFilters({ ...Filters, size: [...new Set([...Filters.size, size])] })
        } else {
            setFilters({
                ...Filters, size: Filters.size.filter((item, pos, self) => item !== size)
            })
        }
        }
       
    }


    const handleCatySearch = (e) => {
        const newCaty = e.target.parentElement.querySelector("a").innerText.toLowerCase();
        if (e.target.checked) {
            setFilters({ ...Filters, category: [...new Set([...Filters.category, newCaty])] })
        } else {
            setFilters({
                ...Filters, category: Filters.category.filter((item, pos, self) => item !== newCaty)
            })
        }
    }


    const handleRange = (e) => {
        setFilters({ ...Filters, [e.target.name]: parseInt(e.target.value) })

    }


    const handleOrder = (e) => {
        setFilters({ ...Filters, order: e.target.value })
    }

    const paginations = []
    const Pagination = () => {


        const currentPage = Pages.currentPage
        const pagesLength = Pages.pages.length

        if (pagesLength > 0) {

            if (currentPage === 1) {

                for (let pageid = 1; pageid <= pagesLength; pageid++) {
                    paginations.push(<li key={pageid}><a onClick={() => { setCurrentPags(pageid) }} className={myClassNames({ "active": pageid === currentPage })} href="javascript:void(0)">{pageid}</a></li>)
                    if (pageid === 3) {
                        paginations.push(<li key="next"><a onClick={() => { setCurrentPags("next") }} className="next" href="javascript:void(0)">Next <i className="ecicon eci-angle-right"></i></a></li>)
                        return
                    }
                }

            }
            else if (pagesLength > 0 && currentPage === pagesLength || currentPage === (pagesLength - 1) || currentPage === (pagesLength - 2)) {
                paginations.push(<li key="previews"><a onClick={() => { setCurrentPags("prev") }} className="next" href="javascript:void(0)">Previews <i className="ecicon eci-angle-left"></i></a></li>)

                for (let pageid = (pagesLength - 3); pageid <= pagesLength; pageid++) {
                    if (pageid > 0) {
                        paginations.push(<li key={pageid}><a onClick={() => { setCurrentPags(pageid) }} className={myClassNames({ "active": pageid === currentPage })} href="javascript:void(0)">{pageid}</a></li>)
                    }
                }

            }
            else {
                paginations.push(<li key="previews"><a onClick={() => { setCurrentPags("prev") }} className="next" href="javascript:void(0)">Previews <i className="ecicon eci-angle-left"></i></a></li>)

                for (let pageid = (currentPage - 1); pageid <= pagesLength; pageid++) {
                    paginations.push(<li key={pageid}><a onClick={() => { setCurrentPags(pageid) }} className={myClassNames({ "active": pageid === currentPage })} href="javascript:void(0)">{pageid}</a></li>)

                    if (pageid === currentPage + 2) {
                        paginations.push(<li key="next"><a onClick={() => { setCurrentPags("next") }} className="next" href="javascript:void(0)">Next <i className="ecicon eci-angle-right"></i></a></li>)

                        return
                    }
                }
            }
        }//end if


    }//end Pagination

    (() => {
        Pagination()
    })()

    const setCurrentPags = (current) => {
        if (current === "prev") setPages({ ...Pages, currentPage: Pages.currentPage - 1 })
        else if (current === "next") setPages({ ...Pages, currentPage: Pages.currentPage + 1 })
        else setPages({ ...Pages, currentPage: current })
    }


    const handleMore = (e) => {
        e.target.parentElement.classList.toggle("active");

        const liStyle = e.target.parentElement.parentElement.previousSibling.style.display === "none" ? "block" : "none"
        e.target.parentElement.parentElement.previousSibling.style.display = liStyle

        const btnText = e.target.innerText = e.target.innerText === t("More Categories") ? t("Less Categories") : t("More Categories")
        e.target.innerText = btnText
    }

    const addToCart = (product) => {
        dispatch(create_carts(product)) 
        toast.info(t("Added"))

    }


    const addToWishList = (productId, userId) => {

        if (!isAuth) {
            navigate("/login")
        } else {
            dispatch(create_wishlist(productId, userId, authorization))
            toast.info(t("Added"))

        }

    }

    const quickView = (productId) => {
        dispatch(set_product_id(productId))
    }



    const changeView = (e) => {
        let btn = e.target.parentElement.parentElement.querySelectorAll(".btn")
        if (e.target.className.includes("btn"))
            btn = e.target.parentElement.querySelectorAll(".btn")

        btn.forEach(element => {
            element.classList.remove("active")
        });
        if (e.target.className.includes("btn"))
            e.target.classList.add("active")
        else e.target.parentElement.classList.add("active")

        document.querySelector(".shop-pro-content .shop-pro-inner").classList.toggle("list-view-50")

        document.querySelectorAll(".shop-pro-content .shop-pro-inner .pro-gl-content").forEach(element => {
            element.classList.toggle("width-50")
        });


    }


    const openFilter = () => {

        document.querySelector(".filter-sidebar-overlay").style.display = "block";
        document.querySelector(".filter-sidebar").classList.add("toggle-sidebar-swipe");

    }


    const closeFilter = () => {

        document.querySelector(".filter-sidebar-overlay").style.display = "none";
        document.querySelector(".filter-sidebar").classList.remove("toggle-sidebar-swipe");

    }


    return (

        // <!-- Ec Shop page -->
        <section className="ec-page-content section-space-p">
            <div className="container">
                <div className="row">


                    <div className="ec-shop-rightside col-lg-12 col-md-12">
                        {/* <!-- Shop Top Start --> */}
                        <div className="ec-pro-list-top d-flex">
                            <div className="col-md-6 ec-grid-list">
                                <div className="ec-gl-btn">
                                    <button className="btn sidebar-toggle-icon" onClick={openFilter}><i className="fas fa-filter fa-lg"></i></button>
                                    <button className="btn btn-grid active" onClick={(e) => { changeView(e) }}><i className="fas fa-th fa-lg"></i></button>
                                    <button className="btn btn-list" onClick={(e) => { changeView(e) }}><i className="fas fa-th-list fa-lg"></i></button>
                                </div>
                            </div>
                            <div className="col-md-6 ec-sort-select">
                                <span className="sort-by">{t("Sort by")}</span>
                                <div className="ec-select-inner">
                                    <select name="ec-select" id="ec-select" value={Filters.order} onChange={(e) => { handleOrder(e) }}>
                                        <option disabled="" value="1">{t("Position")}</option>
                                        <option value="2">{t('Latest')}</option>
                                        <option value="3">{t('Oldest')}</option>
                                        <option value="4">{t('Name, A to Z')}</option>
                                        <option value="5">{t('Name, Z to A')}</option>
                                        <option value="6">{t('Price, low to high')}</option>
                                        <option value="7">{t('Price, high to low')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Shop Top End -->


<!-- Shop content Start --> */}




                        <div className="shop-pro-content">
                            <div className="shop-pro-inner">

                                <Fragment>
                                    {Products.length > 0 &&


                                        <div className="row">

                                            {Products.map((product, i) => {

                                                let img = ""
                                                if (!product.images || !product.images[0]) {
                                                    img = "https://via.placeholder.com/500"
                                                } else {
                                                    img = ImageLink(product.images[0])
                                                }

                                                return (

                                                    <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content" data-aos="fade-up">

                                                        <div className="ec-product-inner">
                                                            <div className="ec-pro-image-outer">


                                                                <div className="ec-pro-image">
                                                                    <Link to={`/product/${product.category}/${product._id}`} className="image">
                                                                     
                                                                    <Image
                                                                        src={img}
                                                                        thumbnail={"https://via.placeholder.com/500"}
                                                                        aspectRatio={'500x500'}
                                                                        className="main-image"
                                                                        alt="Product"
                                                                    />

                                                                    </Link>

                                                                    <span className="flags">
                                                                        {product.stock == 0 && <span className="sale">{t("Sale")}</span>}
                                                                        {product.condition == "new" && <span className="new">{t("New")}</span>}
                                                                    </span>

                                                                    {product.oldprice && isAuth && <span className="percentage">{Math.floor( Math.floor(product.price * Math.floor(product.oldprice - product.price) ) / 100 )}%</span>}

                                                                    <div className="ec-pro-actions">
                                                                        <button title="Add To Cart" className="ec-btn-group compare" onClick={() => { addToCart(product) }}><i className="fas fa-cart-plus"></i></button>
                                                                        <button className="ec-btn-group wishlist" title="Wishlist" onClick={() => { addToWishList(product._id, user._id) }}><i className="far fa-heart"></i></button >
                                                                    </div>
                                                                    <a href="javascript:void(0);" className="quickview" title="Quick view" onClick={() => { quickView(product._id) }}><i className="far fa-eye"></i></a>


                                                                </div>
                                                            </div>

                                                            <div className="ec-pro-content">
                                                                <h5 className="ec-pro-title"><Link to={`/product/${product.category}/${product._id}`}>{product.name}</Link></h5>

                                                                {product.reviews.length > 0 && <div className="ec-pro-rating">
                                                                    {
                                                                        calculateRating(product.reviews).map((star, i) => {
                                                                            return (
                                                                                <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                            )
                                                                        })

                                                                    }

                                                                </div>}




                                                                {/* <div className="ec-pro-rating">
                                                                        {
                                                                            calculateRating().map((star, i) => {
                                                                                 return (
                                                                                    <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                                )
                                                                            })
                                                                         }

                                                                    </div>  */}


                                                                <div className="ec-pro-list-desc">{extractDesk(product.description, 120)}</div>

                                                               {isAuth && <span className="ec-price">
                                                                    {product.oldprice && <span className="old-price">${product.oldprice}</span>}
                                                                    <span className="new-price">${product.price}</span>
                                                                </span>} 

                                                                <div className="ec-pro-option">

                                                                    {product.color.length > 0 &&
                                                                        <div className="ec-pro-color">
                                                                            <span className="ec-pro-opt-label">{t("Color")}</span>
                                                                            <ul className="ec-opt-swatch ec-change-img">

                                                                                {product.color.map((color, index) => {
                                                                                    return (
                                                                                        <li className={myClassNames({ "active": index == 0 })} onClick={(e) => { handleColor(index, e) }} key={index} >
                                                                                            <a className="ec-opt-clr-img"><span style={{ backgroundColor: color }}></span></a>
                                                                                        </li>
                                                                                    );
                                                                                })}


                                                                            </ul>
                                                                        </div>
                                                                    }

                                                                    {product.size.length > 0 &&
                                                                        <div className="ec-pro-size">
                                                                            <span className="ec-pro-opt-label">{t("Size")}</span>
                                                                            <ul className="ec-opt-size">
                                                                                {product.size.map((size, index) => {
                                                                                    return (
                                                                                        <li className={myClassNames({ "active": index == 0 })} onClick={(e) => { handleSize(size.price, index, e) }} key={index}>
                                                                                            <a className="ec-opt-sz" >{size.size}</a>
                                                                                        </li>
                                                                                    );
                                                                                })}

                                                                            </ul>
                                                                        </div>
                                                                    }


                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>


                                                );
                                            })}

                                        </div>


                                    }

                                </Fragment>

                            </div>
                        </div>

                        {/* <!-- Ec Pagination Start --> */}
                        <div className="ec-pro-pagination">

                            <span>{t('Showing')} {(((limit * Pages.currentPage) - limit) + 1)}-{limit * Pages.currentPage} {t('of')} {count} {t('item(s)')}</span>

                            <ul className="ec-pro-pagination-inner">{paginations}</ul>




                        </div>
                        {/* <!-- Ec Pagination End --> */}


                    </div>
                    {/* <!--Shop content End --> */}



                    {/* <!-- Sidebar Area Start --> */}
                    <div className="filter-sidebar-overlay" onClick={closeFilter}></div>
                    <div className="ec-shop-leftside filter-sidebar">
                        <div className="ec-sidebar-heading">
                            <h1>{t('Filter Products By')}</h1>
                            <a className="filter-cls-btn" href="javascript:void(0)" onClick={closeFilter}>×</a>
                        </div>
                        <div className="ec-sidebar-wrap">
                            {/* <!-- Sidebar Category Block --> */}


                            {Categories && Categories.length > 0 &&

                                Categories.map((pcat, pci) => {
 
                                    return (

                                        <div className="ec-sidebar-block" key={pci}>
                                            <div className="ec-sb-title">
                                                <h3 className="ec-sidebar-title">{t(pcat.name[0])}</h3>
                                            </div>
                                            <div className="ec-sb-block-content">
                                                <ul>


                                                {pcat.categories.map((ccat, cci) => {
        
                                                    if (cci > 1) {
                                                        return
                                                    }
        
                                                    return (
                                                        <li key={cci} onClick={(e) => { handleCatySearch(e) }}>
                                                            <div className="ec-sidebar-block-item">
                                                                <input type="checkbox"  defaultChecked={ caty ? caty === ccat.category.name.replace(/ /g , "") ? true : false : true } /> <a href="javascript:void(0);">{ccat.category.name}</a><span
                                                                    className="checked"></span>
                                                            </div>
                                                        </li>
        
                                                    )
                                                })
        
                                                } 

                                                    {pcat.categories.length > 2 &&
                                                        <li id="ec-more-toggle-content" style={{ padding: "0", display: "none" }}>
                                                            <ul>

                                                                {pcat.categories.slice(2).map((ccat, cci) => {

                                                                    return (
                                                                        <li key={cci} onClick={(e) => { handleCatySearch(e) }}>
                                                                            <div className="ec-sidebar-block-item">
                                                                                <input type="checkbox"  defaultChecked={ caty  ? caty === ccat.category.name.replace(/ /g , "") ? true : false : true } /> <a href="javascript:void(0);">{ccat.category.name}</a><span
                                                                                    className="checked"></span>
                                                                            </div>
                                                                        </li>

                                                                    )
                                                                })


                                                                }
                                                            </ul>
                                                        </li>
                                                    }


                                                    {pcat.categories.length > 2 &&
                                                        <li onClick={(e) => { handleMore(e) }}>
                                                            <div className="ec-sidebar-block-item ec-more-toggle">
                                                                <span className="checked"></span><span id="ec-more-toggle">{t("More Categories")}</span>
                                                            </div>
                                                        </li>
                                                    }

                                                </ul>
                                            </div>
                                        </div>




                                    )
                                })

                            }

                 
             
                        
                            {/* <!-- Sidebar Size Block --> */}

                            {Sizes.length > 0 &&

                                < div className="ec-sidebar-block">
                                    <div className="ec-sb-title">
                                        <h3 className="ec-sidebar-title">{("Size")}<div className="ec-sidebar-res"><i
                                            className="ecicon eci-angle-down"></i></div>
                                        </h3>
                                    </div>
                                    <div className="ec-sb-block-content ec-sidebar-dropdown">
                                        <ul>

                                        <li onClick={(e) => { handleSizeSearch(e) }}>
                                                        <div className="ec-sidebar-block-item">
                                                            <input type="checkbox" defaultChecked defaultValue="nosize"/> <a href="javascript:void(0);">{"no Size"}</a><span
                                                                className="checked"></span>
                                                        </div>
                                        </li>

                                            {Sizes.map((size, si) => {

                                                return (
                                                    <li key={si} onClick={(e) => { handleSizeSearch(e) }}>
                                                        <div className="ec-sidebar-block-item">
                                                            <input type="checkbox" defaultChecked /> <a href="javascript:void(0);">{size}</a><span
                                                                className="checked"></span>
                                                        </div>
                                                    </li>

                                                )
                                            })
                                            }
                                        </ul>
                                    </div>
                                </div>

                            }

                            {/* <!-- Sidebar Color item -->  */}


                            {Colors.length > 0 &&

                                <div className="ec-sidebar-block ec-sidebar-block-clr">
                                    <div className="ec-sb-title">
                                        <h3 className="ec-sidebar-title">{t('Color')}<div className="ec-sidebar-res"><i
                                            className="ecicon eci-angle-down"></i></div>
                                        </h3>
                                    </div>
                                    <div className="ec-sb-block-content ec-sidebar-dropdown ">
                                        <ul>

                                        <li className="active" onClick={(e) => { handleColorSer(e) }} >
                                            <div className="ec-sidebar-block-item"><span
                                                style={{ backgroundColor: "transparent" }} data-type="nocolor" ></span></div>
                                        </li> 

                                            {Colors.map((color, ci) => {

                                                
                                                 return (
                                                    <li className="active" onClick={(e) => { handleColorSer(e) }} key={ci} >
                                                        <div className="ec-sidebar-block-item"><span
                                                            style={{ backgroundColor: color }}></span></div>
                                                    </li>

                                                )
                                            })
                                            }
                                        </ul>
                                    </div>
                                </div>

                            }

                            {/* <!-- Sidebar Price Block --> */}
                            <div className="ec-sidebar-block">
                                <div className="ec-sb-title">
                                    <h3 className="ec-sidebar-title">{t("Price Range")}</h3>
                                </div>
                                <div className="ec-sb-block-content es-price-slider">




                                    <div className="ec-price-filter">


                                        <div className="ec-price-input">
                                            <label className="filter__label"><input type="number"
                                                className="filter__input" onChange={(e) => { handleRange(e) }} name="min" value={Filters.min} max="249" min="1" /></label>
                                            <span className="ec-price-divider"></span>
                                            <label className="filter__label"><input type="number"
                                                className="filter__input" onChange={(e) => { handleRange(e) }} name="max" value={Filters.max} max="500" min="2" /></label>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </section >
        // <!-- Ec Shop page -->


    );
}

export default Category;
