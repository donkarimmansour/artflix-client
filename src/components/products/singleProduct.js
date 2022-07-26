import React, { Fragment, useEffect , useState , useRef } from "react"
import { useTranslation } from 'react-i18next';
import { calculateRating, ImageVIEW, countDown , extractDesk, makeId, ImageDOWNLOAD } from '../../shared/funs';
import {  loader } from '../../shared/elements';
import myClassNames from 'classnames';
import { Link, useParams, useNavigate } from "react-router-dom";
import Products from "./products";
import { get_extra_products, get_single_product, set_product_id, set_Views } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { create_wishlist } from "../../redux/actions/wishlist";
import { create_carts } from "../../redux/actions/carts";
import Breadcrumb from "../stuff/breadcrumb";
import Slider from "react-slick";
import { isAuthentication } from "../../redux/actions/auth";
import Image from 'lqip-react'; 
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import * as yup from 'yup'
import { getLocalStorage, setLocalStorage } from "../../shared/localStorage";
import { io } from "socket.io-client";
import { CLEAR_MESSAGE } from "../../redux/constans/message";
import { messageSend , getMessage , seenMessage , ImageMessageSend , delivaredMessage} from "../../redux/actions/chat";
import { Create } from "../../services/file";
import { SOCKET_MESSAGE } from "../../redux/constans/chat";
import { START_LOADING, STOP_LOADING } from "../../redux/constans/loading";


const SingleProduct = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const socket = useRef();
    const dispatch = useDispatch()
    const params = useParams();


    const [Product, setProduct] = useState({})
    const [ExtraProducts, setExtraProducts] = useState([])
    const [progress, setProgress] = useState(0)
    const [countDownDate, setCountDownDate] = useState({ days: "", hr: "", min: "", sec: "" })
    const [visitor, setVisitor] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
     const [newMessage, setNewMessage] = useState('');
     const [socketMessage, setSocketMessage] = useState('');
     const [ChatId, setChatId] = useState({})


     const { singleproduct, extraproducts } = useSelector(state => state.products)//, sort : '{ "uptatedAt": 1 }'
     const { isAuth , token , user } = useSelector((state) => state.auth);
     const { loading } = useSelector((state) => state.loading);
     const {successMsg , errorMsg } = useSelector((state) => state.message);
     const { message } = useSelector(state => state.chat);
     const authorization = { "Authorization": `bearer ${token}` }
 

    const settingsImage = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
    };


    const settingsImages = {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        focusOnSelect: true,
        rows: 1,
    };


     //states
 
 
    useEffect(() => {
        dispatch(isAuthentication());

        dispatch(get_extra_products({ filter: { "category": params.caty , status : "published" }, limit: 4, sort: '{"soldcount" : -1}' }))
    }, [dispatch]);
 

    useEffect(() => {
        dispatch(get_single_product({ filter: { "_id": params.id } }))
        dispatch(set_Views(params.id, "view"))
        window.scrollTo(0, 300);

    }, [dispatch, navigate])

    useEffect(() => {
        setProduct(singleproduct)
        setExtraProducts(extraproducts)
    }, [singleproduct, extraproducts]) 

    useEffect(() => {
        Progress()
        setCountDownDate({ ...countDown(Product.limitedAtt) })
        visitorCounter()
        const clearCountDown = setInterval(() => { setCountDownDate({ ...countDown(Product.limitedAtt) }) }, 1000);
        const clearVisitorCounter = setInterval(() => { visitorCounter() }, ((1000 * 60) * 5));

        return () => {
            clearInterval(clearCountDown)
            clearInterval(clearVisitorCounter)
        }

    }, [Product.limitedAtt])




    const visitorCounter = () => {
        setVisitor((Math.floor(Math.random() * 100) + 20))
    }


    const handleSize = (price, index, e) => {
        const sizes = e.target.parentElement.parentElement.querySelectorAll("li");

        sizes.forEach((em, i) => {
            em.className = ""
            if (i === index) {
                em.className = "active"

                em.parentElement.parentElement
                    .parentElement.parentElement
                    .parentElement.querySelector(".ec-single-price-stoke .new-price").innerText = `$${price}`


            }
        })

    }

    const handleColor = (index, e) => {
        const colors = e.target.parentElement.parentElement.querySelectorAll("li");

        colors.forEach((em, i) => {
            em.className = ""
            if (i === index) {
                em.className = "active"
            }
        })
    }



    const Progress = () => {
        const start = new Date(Product.updatedAt),
            end = new Date(Product.limitedAtt),
            today = new Date()

        const timeBetweenStartAndEnd = (end - start);
        const timeBetweenStartAndToday = (today - start);

        const percentage = Math.round((timeBetweenStartAndToday / timeBetweenStartAndEnd) * 100);

        setProgress(percentage)
    }

    const infos = []

    for (const value in Product.info) {
        infos.push(<li key={value}><span>{value}</span> {Product.info[value]}</li>)
    }

    const handleQuantityInc = () => {
        setQuantity(quantity => quantity + 1)
    }

    const handleQuantityDesk = () => {
        if (quantity !== 1) {
            setQuantity(quantity => quantity - 1)
        }

    }

    const addToCart = (product) => {
        dispatch(create_carts(product))
    }


    const addToWishList = (productId, userId) => {

        if (!isAuth) {
            navigate("/login")
        } else {
            dispatch(create_wishlist(productId, userId, authorization))
        }

    }

    const quickView = (productId) => {
        dispatch(set_product_id(productId))
    }

   


    useEffect(() => {
        socket.current = io('ws://localhost:8080');
        
        //get new message
        socket.current.on('getMessage', (data) => {
            setSocketMessage(data);
        })

        return () => {
            //logout
           socket.current.emit('logout', "myInfo.id")
        }
    }, []);


    useEffect(() => {
        socket.current.emit('addUser', ChatId)
    } , [ChatId])



    useEffect(() => {
        if("productId" in ChatId) {
            dispatch(getMessage(params.id , ChatId.id)) 
        }
    
    }, [ChatId]) 


    // on Success Send message in local
    useEffect(() => {
        if (successMsg === "MessageSendFIRST") {
            socket.current.emit('sendMessage', message[message.length - 1]); //last msg

            setChatId(message[message.length - 1])
            setLocalStorage("chat", message[message.length - 1])// this not good

        } else if (successMsg === "MessageSend") {
            socket.current.emit('sendMessage', message[message.length - 1]); //last msg


        } //get Message 
        else if (successMsg === "getMessage") {
            if (message.length > 0) {

                if (message[message.length - 1].from !== "user" && message[message.length - 1].status !== 'seen') {

                    //see in other
                    socket.current.emit('seen', message[message.length - 1].id);

                    // see all msg
                    dispatch(seenMessage({ _id: message[message.length - 1]._id }))

                }
            }

        }

        dispatch({ type: CLEAR_MESSAGE })

    }, [successMsg, errorMsg])


      
useEffect(() => {
    // on Success Send from user to me
     if (socketMessage) {

        if (socketMessage.productId === params.id && socketMessage.from === "admin") {

            // insert new msg
            dispatch({type: SOCKET_MESSAGE, payload: socketMessage})

           // see this msg
           dispatch(seenMessage({_id: socketMessage._id}));

           socket.current.emit('messageSeen', socketMessage.id);


            setSocketMessage('')

        } // on Success Send from user to me in outside 
        else if (socketMessage.productId !== params.id && socketMessage.from === "admin") {
            //    notificationSPlay();

          toast.info(t(`admin send a new message`));

           dispatch(delivaredMessage({_id: socketMessage._id}));

           socket.current.emit('delivaredMessage', socketMessage.id);


        }

    }

}, [socketMessage])

 



  



useEffect(() => {

    try {
       const existChatId = getLocalStorage("chat") ? getLocalStorage("chat") : {}


        if("id" in existChatId){
            setInitial({
                message: "",
            })
            setInitialValidator(yup.object().shape({
                message: yup.string().required(t("message field is required")),
            }))

            setChatId(existChatId)

       
        }else{
            setInitial({
                fullname: "",
                message: "",
            })
            setInitialValidator(yup.object().shape({
                fullname: yup.string().required(t("fullname field is required")), 
                message: yup.string().required(t("message field is required")),
            })) 

            setChatId({})
        }
    } catch (error) {  
        console.log(error);
    }

} ,  [params ])





      //input Hendle
      const inputHendle = (e) => {
        setNewMessage(e.target.value);

        socket.current.emit('typingMessage', {
            id : ChatId?.id,
            msg: e.target.value
        })
    }


    //form
    const [initial, setInitial] = useState({ 
        fullname: "", 
    }) 

    const [initialValidator, setInitialValidator] = useState(yup.object().shape({
        fullname: yup.string().required(t("fullname field is required")),
    }))

    

    const onSubmit = values => {

        let existChatId = {}
        let data = {}

        try {
            existChatId = getLocalStorage("chat") ? getLocalStorage("chat") : {}
        } catch (error) { }

        if ("id" in existChatId) {
                data = {...existChatId , message: values.message , productId: params.id}
                 dispatch(messageSend(data , ''))
        } else {
            if ("_id" in user) {
                data = {
                    senderName: `${user.firstname} ${user.lastname}`,
                    productId: params.id,
                    userId: user._id,
                    id: makeId(20),
                    message: values.message,
                    image: user.image ,
                }
            } else {
                data = {
                    senderName: values.fullname,
                    productId: params.id,
                    id: makeId(20),
                    message: values.message ,
                    image: "62d85c889baf3cc9640f7904" ,
                    userId: null,

            }

            
                dispatch(messageSend(data , 'first'))
                setNewMessage("")
            }
        }
    }




     //Image Send
     const ImageSend = (e , type) => {    
    
        if (e.target.files.length !== 0) {
             //    sendingSPlay();

            const formData = new FormData();
            formData.append('image', e.target.files[0]);
           
            dispatch({ type: START_LOADING })

            Create(formData).then(({ data }) => {

                if (!data.err) {
                    dispatch({ type: STOP_LOADING })

                          dispatch(ImageMessageSend({...ChatId , message: data.msg , productId: params.id , type}));

                } else {
                    dispatch({ type: STOP_LOADING })
                    toast.warning(t(`There was an error while uploading your file`));

                }
                //  console.log(data);

            }).catch(err => {
                console.log("get orders api err ", err);
                dispatch({ type: STOP_LOADING })
            })
        }

    }


   

    return (

        <Fragment>

            <Breadcrumb name={params.caty} />

            {loading && loader()}


            {Product && Product.name &&
                // <!-- Sart Single product -->
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

                                                        <Slider {...settingsImage} asNavFor={ slider2 } className="single-product-cover"  ref={(slider) => setSlider1(slider)}>
                                                            {(Product.images && Product.images.length > 0) &&
                                                                Product.images.map((image, i) => {

                                                                    return (

                                                                        <div key={i} className="single-slide zoom-image-hover" >
                                                                            <Image className="img-responsive" src={ImageVIEW(image)} alt={Product.name} thumbnail={"https://via.placeholder.com/500"} aspectRatio={'500x500'}/>
                                                                        </div>


                                                                    )
                                                                })
                                                            }

                                                        </Slider>



                                                        <Slider {...settingsImages} asNavFor={ slider1 } className="single-nav-thumb"  ref={(slider) => setSlider2(slider)}>

                                                            {(Product.images && Product.images.length > 0) &&
                                                                Product.images.map((image, i) => {

                                                                    return (
                                                                        
                                                                        <div key={i} className="single-slide" >
                                                                            <Image className="img-responsive" src={ImageVIEW(image)} alt={Product.name} thumbnail={"https://via.placeholder.com/500"} aspectRatio={'500x500'}/>
                                                                        </div>


                                                                    )
                                                                })
                                                            }

                                                        </Slider>

                                                            {/* {(!Product.images || !Product.images.imagesUrl || Product.images.imagesUrl.length == 0) &&

                                                                <div className="single-slide">
                                                                    <img className="img-responsive" src={"https://via.placeholder.com/500"} alt={Product.name} />
                                                                </div>


                                                            } */}

                                                    </div>
                                                </div>



                                                <div className="single-pro-desc">
                                                    <div className="single-pro-content">
                                                        <h5 className="ec-single-title">{Product.name}</h5>
                                                        <div className="ec-single-rating-wrap">
                                                            <div className="ec-single-rating">

                                                                {
                                                                    calculateRating().map((star, i) => {
                                                                        return (
                                                                            <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                        )
                                                                    })


                                                                }

                                                            </div>
                                                            {/* <span className="ec-read-review"><a href="#ec-spt-nav-review">{t("Be the first to review this product")}</a></span> */}
                                                        </div>


                                                        <div className="ec-single-desc">{extractDesk(Product.description, 100)}</div>


                                                        <div className="ec-single-sales">

                                                            <div className="ec-single-sales-inner">

                                                                <div className="ec-single-sales-title">{t("sales accelerators")}</div>
                                                                <div className="ec-single-sales-visitor">{t("real time")} <span>{visitor}</span> {t("visitor right now!")}</div>

                                                                <div className="ec-single-sales-progress">
                                                                    <span className="ec-single-progress-desc">{t("Hurry up")}!{t("left")} {Product.stock} {t("in stock")}</span>

                                                                    {Product.limitedAtt != null && new Date(Product.limitedAtt).getTime() > Date.now() &&
                                                                        <span className="ec-single-progressbar" style={{ "--progress": `${progress}%` }} ></span>}

                                                                </div>

                                                                {Product.limitedAtt != null && new Date(Product.limitedAtt).getTime() > Date.now() &&

                                                                    <div className="ec-single-sales-countdown">

                                                                        <div className="ec-single-countdown">
                                                                            <span id="ec-single-countdown" className="style colorDefinition labelformat">
                                                                                <span className="timerDisplay label4" style={{ display: "flex" }}>

                                                                                    <span className="displaySection">
                                                                                        <span className="numberDisplay">{countDownDate.days}</span>
                                                                                        <span className="periodDisplay">{t("Days")}</span>
                                                                                    </span>
                                                                                    <span className="displaySection">
                                                                                        <span className="numberDisplay">{countDownDate.hr}</span>
                                                                                        <span className="periodDisplay">{t("Hours")}</span>
                                                                                    </span>
                                                                                    <span className="displaySection">
                                                                                        <span className="numberDisplay">{countDownDate.min}</span>
                                                                                        <span className="periodDisplay">{t("Min")}</span>
                                                                                    </span>
                                                                                    <span className="displaySection">
                                                                                        <span className="numberDisplay">{countDownDate.sec}</span>
                                                                                        <span className="periodDisplay">{t("Sec")}</span>
                                                                                    </span>

                                                                                </span>
                                                                            </span>

                                                                        </div>
                                                                        <div className="ec-single-count-desc">{t("Time is Running Out!")}</div>
                                                                    </div>

                                                                }

                                                            </div>
                                                        </div>



                                                        <div className="ec-single-price-stoke">
                                                        {(isAuth || !isAuth) &&
                                                            <div className="ec-single-price">
                                                                <span className="ec-single-ps-title">{t("As low as")}</span>
                                                                <span className="new-price">${Product.price}</span>
                                                            </div>
                                                        }

                                                            <div className="ec-single-stoke">
                                                                <span className="ec-single-ps-title">{t("IN STOCK")}</span>
                                                                <span className="ec-single-sku">{Product.stock}</span>
                                                            </div>
                                                        </div>

                                                        <div className="ec-pro-variation">

                                                            {Product.size.length > 0 &&
                                                                <div className="ec-pro-variation-inner ec-pro-variation-size">
                                                                    <span>{t("SIZE")}</span>
                                                                    <div className="ec-pro-variation-content">
                                                                        <ul>
                                                                            {
                                                                                Product.size.map((size, index) => {
                                                                                    return (
                                                                                        <li key={index}
                                                                                            className={myClassNames({ "active": index == 0 })}
                                                                                            onClick={(e) => { handleSize(size.price, index, e) }}>
                                                                                            <span className="ec-opt-sz" >{size.size}</span>
                                                                                        </li>
                                                                                    );
                                                                                })}

                                                                        </ul>
                                                                    </div>
                                                                </div>}

                                                            {Product.color.length > 0 &&
                                                                <div className="ec-pro-variation-inner ec-pro-variation-color">
                                                                    <span>{t("Color")}</span>
                                                                    <div className="ec-pro-variation-content">
                                                                        <ul>
                                                                            {
                                                                                Product.color.map((color, index) => {
                                                                                    return (
                                                                                        <li key={index} className={myClassNames({ "active": index == 0 })} >
                                                                                            <span style={{ backgroundColor: color }} onClick={(e) => { handleColor(index, e) }}></span></li>
                                                                                    );
                                                                                })}

                                                                        </ul>
                                                                    </div>
                                                                </div>}


                                                                {Product.shipping.length > 0 &&
                                                                <div className="ec-pro-variation-inner ec-pro-variation-size">
                                                                    <span>{t("Delivery Method")}</span>
                                                                    <div className="ec-pro-variation-content">
                                                                        <ul>
                                                                            {
                                                                                Product.shipping.map((shipping, index) => {
                                                                                    return (
                                                                                        <li key={index}>
                                                                                            <span className="ec-opt-sz" >{shipping.name}</span>
                                                                                        </li>
                                                                                    );
                                                                                })}

                                                                        </ul>
                                                                    </div>
                                                                </div>}

                                                        </div>


                                                        <div className="ec-single-qty">


                                                            {Product.stock > 0 &&

                                                                <div className="qty-plus-minus">
                                                                    <div className="dec ec_qtybtn" disabled={(quantity <= 1)} onClick={handleQuantityDesk}>-</div>
                                                                    <input className="qty-input" type="text" name="ec_qtybtn" onChange={() => { }} value={quantity} />
                                                                    <div className="inc ec_qtybtn" onClick={handleQuantityInc}>+</div>
                                                                </div>}


                                                            <div className="ec-single-cart ">
                                                                <button className="btn btn-primary" onClick={() => { addToCart(Product) }}>{t("Add To Cart")}</button>
                                                            </div>

                                                            <div className="ec-single-wishlist">
                                                                <a className="ec-btn-group wishlist" title="Wishlist" onClick={() => { addToWishList(Product._id, user._id) }}><i className="far fa-heart"></i></a>
                                                            </div>
                                                            <div className="ec-single-quickview">
                                                                <a href="#" className="ec-btn-group quickview" title="Quick view" onClick={() => { quickView(Product._id) }}><i className="far fa-eye"></i></a>
                                                            </div>
                                                        </div>
                                                        <div className="ec-single-social">
                                                            <ul className="mb-0">
                                                                <li className="list-inline-item"><a className="hdr-facebook" target="_blank" href="https://facebook.com/cheapshop2023"><i
                                                                    className="fab fa-facebook"></i></a></li>
                                                                <li className="list-inline-item"><a className="hdr-instagram" target="_blank" href="https://instagram.com/cheapshop2023"><i
                                                                    className="fab fa-instagram"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!--Single product content End -->

                                    <!-- Single product tab start --> */}
                                    <div className="ec-single-pro-tab">
                                        <div className="ec-single-pro-tab-wrapper">

                                            <div className="ec-single-pro-tab-nav">
                                                <ul className="nav nav-tabs">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" data-bs-toggle="tab"
                                                            data-bs-target="#ec-spt-nav-details" role="tablist">{t("Detail")}</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-info"
                                                            role="tablist">{t("More Information")}</a>
                                                    </li>
                                                     <li className="nav-item">
                                                        <a className="nav-link" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-contact"
                                                            role="tablist">Contact</a>
                                                    </li>
                                                    {/* <li className="nav-item">
                                                        <a className="nav-link" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-review"
                                                            role="tablist">Reviews</a>
                                                    </li> */}
                                                </ul>
                                            </div>

                                            <div className="tab-content  ec-single-pro-tab-content">

                                                <div id="ec-spt-nav-details" className="tab-pane fade show active">
                                                    <div className="ec-single-pro-tab-desc">{Product.description} </div>
                                                </div>


                                                <div id="ec-spt-nav-info" className="tab-pane fade">
                                                    <div className="ec-single-pro-tab-moreinfo">
                                                        <ul>
                                                            {infos}
                                                        </ul>
                                                    </div>
                                                </div>






                                          <div id="ec-spt-nav-contact" className="tab-pane fade">
                                                    <div className="row">
                                                        <div className="ec-t-review-wrapper">
 
                                                           
                                                             {message && message.length > 0 && message.map((ct, ci) => {
                                                                    return (
                                                                        <div key={ci} className={myClassNames("ec-t-review-item" , {"from-me" : ct.from === "user"})}>
                                                                            <div className="ec-t-review-avtar">
                                                                                <img src={ImageVIEW(ct.image)} alt="" />
                                                                            </div>
                                                                            <div className="ec-t-review-content">

 
                                                                                <div className="ec-t-review-top ">
                                                                                    <div className="ec-t-review-name">{ct.from === "user" ? ct.senderName : "admin"}</div>
                                                                                    <div className="ec-t-review-rating">
                                                                                        {
                                                                                            // calculateRating(review.rate, false).map((star, i) => {
                                                                                            //     return (
                                                                                            //         <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                                            //     )
                                                                                            // })
                                                                                        }
                                                                                    </div>
                                                                                </div>

                                                                                <div className="ec-t-review-bottom">

                                                                                    {ct.message.type === 'img' ?
                                                                                        <div className="message-image">
                                                                                            <img src={ImageVIEW(ct.message.image)} alt='image' />
                                                                                        </div>

                                                                                     : ct.message.type === 'file' ?
                                                                                        <div className="ec-border-anim">
                                                                                            <button className="corner-button" onClick={() => {{ImageDOWNLOAD(ct.message.image)}}}>
                                                                                                <span>File..</span>
                                                                                            </button>
                                                                                        </div>
                                                                                     
                                                                                    :  ct.message.text}

                                                                                

                                                                                </div>

                                                                            </div>
                                                                        </div>

                                                                    )
                                                                })
                                                            }  


                                                        </div>
                                                        <div className="ec-ratting-content">
                                                            <h3>Contacts Us</h3>
                                                            <div className="ec-ratting-form">


                                                            {
                                                                <Formik
                                                                    initialValues={initial}
                                                                    onSubmit={onSubmit}
                                                                    validationSchema={initialValidator}
                                                                    enableReinitialize >

                                                                    {
                                                                        ({ touched, errors , setFieldValue}) => (

                                                                            <Form>
                                                                                { !("_id" in user ) && !("id" in ChatId ) && 
                                                                                
                                                                                    <div className="ec-ratting-input">
                                                                                        <Field name="fullname" placeholder={t("Enter your Fullname")} type="text" />
                                                                                        <small className="input-error" style={{ display: errors.fullname ? "block" : "none" }} >{touched.fullname && errors.fullname}</small>
                                                                                    </div>

                                                                                }

                                                                                

                                                                                <div className="ec-ratting-input form-submit">
                                                                                    <Field as="textarea" name="message" placeholder="Enter Your Comment"  value={newMessage} onChange={ e => { setFieldValue("message" , e.target.value) ; inputHendle(e) } } />
                                                                                    <small className="input-error" style={{ display: errors.message ? "block" : "none" }} >{touched.message && errors.message}</small>

                                                                                        <div className="row">

                                                                                            <div className=" col-sm-12 col-md-3">
                                                                                            <button className="btn btn-primary" type="submit" defaultValue="Submit" disabled={(loading)}>Submit</button>
                                                                                            </div>

                                                                                        {( ("_id" in user || "id" in ChatId) && (message && message.length > 0)) &&

                                                                                            <div className=" col-sm-12 col-md-9" style={{ display: "flex", alignItems: "flex-end" }}>
                                                                                                <div className="ec-btn-bw">

                                                                                                    <input onChange={(e) => {ImageSend(e , "img")}} type="file" id='pic' style={{display : "none"}} accept="image/*"/>
                                                                                                    <input onChange={(e) => {ImageSend(e , "file")}} type="file" id='att' style={{display : "none"}}  accept=".pdf , .xlsx , .xls , .csv"/>
                                                                                                    <button type="button" className="custom-btn btn-4" onClick={() => {document.getElementById('att').click()}}>File</button>
                                                                                                    <button type="button" className="custom-btn btn-5" onClick={() => {document.getElementById('pic').click()}}>Image</button>

                                                                                                </div>
                                                                                            </div>

                                                                                        }

 
                                                                                        </div>

                                                                                        
                                                                                        </div>



 
                                                                            </Form>

                                                                        )

                                                                    }</Formik>
                                                            }


                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            







                                                {/* <div id="ec-spt-nav-review" className="tab-pane fade">
                                                    <div className="row">
                                                        <div className="ec-t-review-wrapper">

                                                            {/* {
                                                                Product.peviews.map((review, ii) => {
                                                                    return (
                                                                        <div key={ii} className="ec-t-review-item">
                                                                            <div className="ec-t-review-avtar">
                                                                                <img src={review.avatar} alt="" />
                                                                            </div>
                                                                            <div className="ec-t-review-content">


                                                                                <div className="ec-t-review-top">
                                                                                    <div className="ec-t-review-name">{review.name}</div>
                                                                                    <div className="ec-t-review-rating">
                                                                                        {
                                                                                            // calculateRating(review.rate, false).map((star, i) => {
                                                                                            //     return (
                                                                                            //         <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                                            //     )
                                                                                            // })
                                                                                        }
                                                                                    </div>
                                                                                </div>

                                                                                <div className="ec-t-review-bottom">
                                                                                    <p>{review.feedback}</p>
                                                                                </div>

                                                                            </div>
                                                                        </div>

                                                                    )
                                                                })
                                                            } 


                                                        </div>
                                                        <div className="ec-ratting-content">
                                                            <h3>Add a Review</h3>
                                                            <div className="ec-ratting-form">
                                                                <form action="#">
                                                                    <div className="ec-ratting-star">
                                                                        <span>Your rating:</span>
                                                                        <div className="ec-t-review-rating">
                                                                            <i className="ecicon eci-star fill"></i>
                                                                            <i className="ecicon eci-star fill"></i>
                                                                            <i className="ecicon eci-star-o"></i>
                                                                            <i className="ecicon eci-star-o"></i>
                                                                            <i className="ecicon eci-star-o"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div className="ec-ratting-input">
                                                                        <input name="your-name" placeholder="Name" type="text" />
                                                                    </div>
                                                                    <div className="ec-ratting-input">
                                                                        <input name="your-email" placeholder="Email*" type="email"
                                                                            required="" />
                                                                    </div>
                                                                    <div className="ec-ratting-input form-submit">
                                                                        <textarea name="your-commemt"
                                                                            placeholder="Enter Your Comment"></textarea>
                                                                        <button className="btn btn-primary" type="submit"
                                                                            defaultValue="Submit">Submit</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                             */}

                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- product details description area end --> */}
                                </div>
                                {/* <!-- Sidebar Area Start --> */}













                                <div className="ec-pro-leftside ec-common-leftside col-lg-3 order-lg-first col-md-12 order-md-last">

                                    <div className="ec-sidebar-slider">
                                        <div className="ec-sb-slider-title">{t("Best Sellers")}</div>
                                        <div className="ec-sb-pro-sl">

                                                    {ExtraProducts && ExtraProducts.length > 0 &&
                                                        <div className="row" style={{ display: "flex" }} >

                                                            {
                                                                ExtraProducts.map((products, pi) => {

                                                                    let img = ""
                                                                    if (!products.images || !products.images[0]) {
                                                                        img = "https://via.placeholder.com/500"
                                                                    } else {
                                                                        img = ImageVIEW(products.images[0])
                                                                    }

                                                                    return (

                                                                        <div key={pi} className="col-lg-12 col-md-6 col-sm-6">
                                                                            <div style={{ width: "100%", display: "inline-block" }}>
                                                                                <div className="ec-sb-pro-sl-item">
                                                                                    <Link to={`/product/${products.category}/${products._id}`} className="sidekka_pro_img" >

                                                                                    <Image src={img} alt="product" thumbnail={"https://via.placeholder.com/500"} aspectRatio={'500x500'}/>

                                                                                    </Link>
                                                                                    <div className="ec-pro-content">
                                                                                        <h5 className="ec-pro-title">  <Link to={`/product/${products.category}/${products._id}`}>{products.name}</Link></h5>
                                                                                        {/* {product.reviews.length > 0 && <div className="ec-pro-rating">
                                                                                                        {
                                                                                                            calculateRating(product.reviews).map((star, i) => {
                                                                                                                return (
                                                                                                                    <i key={i} className={star} style={{ color: "#eec317" }}></i>
                                                                                                                )
                                                                                                            })

                                                                                                        }

                                                                                                    </div>} */}
                                                                                        {(isAuth || !isAuth) && <span className="ec-price">
                                                                                            {products.oldprice && <span className="old-price">${products.oldprice}</span>}
                                                                                            <span className="new-price">${products.price}</span>
                                                                                        </span>}

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>



                                                                    )
                                                                })
                                                            } </div>}

                                                </div>
                                            </div>
                                        </div>
                                  
                                {/* <!-- Sidebar Area Start --> */}


                            </div>

                            <Products caty={params.caty} skip="0" limit="4" sort='{"viewcount" : -1}' ></Products>

                        </div>
                    </section>


                </div>
            } </Fragment>
        // {/* <!-- end Single product  --> */}


    );
}

export default SingleProduct;
