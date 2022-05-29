import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_carts } from "../../redux/actions/carts";
import { ImageLink } from "../../shared/funs";
import myClassname from "classnames";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
import { create_orders } from "../../redux/actions/orders";
import { loader } from "../../shared/elements";
import { isAuthentication} from "../../redux/actions/auth"
import { toast } from "react-toastify";
import { CLEAR_MESSAGE } from "../../redux/constans/message";
import { removeLocalStorage } from "../../shared/localStorage";
import { DELETE_CART } from "../../redux/constans/carts";
 
const Checkout = () => {
    const navigate = useNavigate()
    const formiRef = useRef()
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const { isAuth , token , user } = useSelector((state) => state.auth);
    const authorization = { "Authorization": `bearer ${token}` }

    useEffect(() => {
        dispatch(isAuthentication());
    }, [dispatch]);

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth]);



    const [Carts, setCarts] = useState([])
    const [DonationCost, setDonationCost] = useState(0)
    const [Comment, setComment] = useState("...")
    const [Amount, setAmount] = useState(0)

    const { carts } = useSelector(state => state.carts)
    const { loading } = useSelector(state => state.loading)
    const { errorMsg } = useSelector(state => state.message)


    useEffect(() => {
        dispatch(get_carts())
    }, [dispatch])

    useEffect(() => {
        setCarts(carts)
    }, [carts])

    useEffect(() => {
        if (Carts && Carts.length > 0)
        setAmount(Carts.reduce((amount, cart) => amount + cart.amount, 0))
    }, [Carts])

    useEffect(() => {
        if (errorMsg !== "") {
            toast.error(t(typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])))
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [errorMsg]);




    const [initial, setInitial] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        country: "",
        city: "",
        state: "",
        phone: "",
        postcode: "",
    })

    

    const onSubmit = values => {}


    const changeAddress = (type) => {
        if (type === "new") {
            setInitial({
                firstname: "",
                lastname: "",
                email: "",
                address: "",
                country: "",
                city: "",
                state: "",
                phone: "",
                postcode: "",
            })
        } else {

            setInitial({
                firstname: user.shippingaddress ? user.shippingaddress.firstname ? user.shippingaddress.firstname : "" : "",
                lastname: user.shippingaddress ? user.shippingaddress.lastname ? user.shippingaddress.lastname : "" : "",
                email: user.shippingaddress ? user.shippingaddress.email ? user.shippingaddress.email : "" : "",
                address: user.shippingaddress ? user.shippingaddress.address ? user.shippingaddress.address : "" : "",
                country: user.shippingaddress ? user.shippingaddress.country ? user.shippingaddress.country : "" : "",
                city: user.shippingaddress ? user.shippingaddress.city ? user.shippingaddress.city : "" : "",
                state: user.shippingaddress ? user.shippingaddress.state ? user.shippingaddress.state : "" : "",
                phone: user.shippingaddress ? user.shippingaddress.phone ? user.shippingaddress.phone : "" : "",
                postcode: user.shippingaddress ? user.shippingaddress.postcode ? user.shippingaddress.postcode : "" : "",
            })
        }
    }
 
    const Validator = yup.object().shape({
        firstname: yup.string().required(t("firstname field is required")),
        lastname: yup.string().required(t("lastname field is required")),
        email: yup.string().required(t("email field is required")).email("email must be email"),
        address: yup.string().required(t("address field is required")),
        country: yup.string().required(t("country field is required")),
        city: yup.string().required(t("city field is required")),

    })


    // useEffect(() => {
    //     if (Carts && Carts.length > 0) {

    //         const shipping = ShippingCost;
    //         const products = Carts;

    //         if (window.myPaypal) { window.myPaypal.close() }

    //         window.myPaypal = window.paypal.Buttons({

    //             // Sets up the transaction when a payment button is clicked
    //             createOrder: function (d , a) {

    //                 if (formiRef.current.isValid) {

    //                     return Calculate({ shipping, products }, authorization).then(({ data }) => {
    //                         if (!data.err) {
    //                             return data.msg.result.id
    //                         } else {
    //                             console.log("set orders api err ", data.msg);
    //                         }

    //                     }).catch(err => {
    //                         console.log("set orders api err ", err);
    //                     })


    //                 }


    //             },

    //             // Finalize the transaction after payer approval
    //             onApprove: function (data, actions) {
    //                 return actions.order.capture().then(function (orderData) {

    //                     if (formiRef.current.isValid) {
    //                         const transaction = orderData.purchase_units[0].payments.captures[0];

    //                         const { firstname, lastname, email, phone, address, country, city, postcode, state } = formiRef.current.values;
    //                         const comment = Comment;
    //                         const transactionId = transaction.id;
    //                         const transactionState = transaction.status;

    //                         dispatch(create_orders(user._id, firstname, lastname, email, phone, address,
    //                             country, city, postcode, state, comment, shipping, products, 
    //                             transactionId , transactionState , authorization))
    //                          alert("your payment was successful please check your orders")
    //                    }else{
    //                          alert("your payment was not successful please try again")

    //                    }

    //                 });
    //             }
    //         })

    //         window.myPaypal.render('#paypal-button-container');
    //     }

    // }, [Carts, ShippingCost])

    const orderOrder = () => {
        if (Carts && Carts.length > 0 && formiRef.current.isValid) {

            const donation = DonationCost;
            const products = Carts;

            const transaction = {id : "123" , status : "none"}

            const { firstname, lastname, email, phone, address, country, city, postcode, state } = formiRef.current.values;
            const comment = Comment;
            const transactionId = transaction.id;
            const transactionState = transaction.status;

            dispatch(create_orders(user._id, firstname, lastname, email, phone, address,
                country, city, postcode, state, comment, donation, products, 
                transactionId , transactionState , authorization))

                toast.success(t("your payment was successful please check your orders"))
                removeLocalStorage("cart")
                dispatch({type : DELETE_CART})
                navigate("/profile")

        }
    }

    return (
        // <!-- Start checkout page -->
        <section className="ec-page-content section-space-p checkout_page">
            {loading && loader()}

            <div className="container"> 
                <div className="row">



                    <div className="ec-checkout-leftside col-lg-8 col-md-12 ">
                        {/* <!-- checkout content Start --> */}
                        <div className="ec-checkout-content">
                            <div className="ec-checkout-inner">

                                <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
                                    
                                    <div className="ec-checkout-block ec-check-bill">
                                        <h3 className="ec-checkout-title">{t("Billing Details")}</h3>
                                        <div className="ec-bl-block-content">
                                            <div className="ec-check-subtitle">{t("Checkout Options")}</div>
                                            <span className="ec-bill-option">
                                                <span>
                                                    <input type="radio" id="bill1" name="radio-group" onClick={() => { changeAddress("exist") }} />
                                                    <label htmlFor="bill1">{t("I want to use an existing address")}</label>
                                                </span>
                                                <span>
                                                    <input type="radio" id="bill2" name="radio-group" onClick={() => { changeAddress("new") }} defaultChecked="" />
                                                    <label htmlFor="bill2">{t("I want to use new address")}</label>
                                                </span>
                                            </span>
                                            <div className="ec-check-bill-form">


                                                {
                                                    <Formik innerRef={formiRef}
                                                        initialValues={initial}
                                                        onSubmit={onSubmit}
                                                        validationSchema={Validator}
                                                        enableReinitialize
                                                        validateOnMount>

                                                        {({ touched, errors }) => (

                                                            <Form id="addressform">

                                                                <div className="ec-bill-wrap ec-bill-half">
                                                                    <label  >{t("First Name")}*</label>
                                                                    <Field className="form-control" type="text" name="firstname" placeholder={t("Enter your first name")} required="" />
                                                                    <small className="input-error" style={{ display: errors.firstname ? "block" : "none" }} >{touched.firstname && errors.firstname}</small>
                                                                </div>

                                                                <div className="ec-bill-wrap ec-bill-half">
                                                                    <label  >{t("Last Name")}*</label>

                                                                    <Field className="form-control" type="text" name="lastname" placeholder={t("Enter your last name")} required="" />
                                                                    <small className="input-error" style={{ display: errors.lastname ? "block" : "none" }} >{touched.lastname && errors.lastname}</small> </div>

                                                                <div className="ec-bill-wrap ec-bill-half">
                                                                    <label  >{t("Email")}*</label>
                                                                    <Field className="form-control" type="email" name="email" placeholder={t("Enter your email")} required="" />
                                                                    <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>
                                                                </div>


                                                                <div className="ec-bill-wrap ec-bill-half">
                                                                    <label  >{t("Phone Number")}</label>
                                                                    <Field className="form-control" type="text" name="phone" placeholder={t("Enter your phone number")} />
                                                                </div>

                                                                <div className="ec-bill-wrap">
                                                                    <label  >{t("Address")}*</label>
                                                                    <small className="input-error" style={{ display: errors.address ? "block" : "none" }} >{touched.address && errors.address}</small>
                                                                    <Field className="form-control" type="text" name="address" placeholder={t("Enter your Address")} required="" />
                                                                </div>


                                                                <div className="ec-bill-wrap ec-bill-half">
                                                                    <label  >{t("Country")}*</label>
                                                                    <Field className="form-control" type="text" name="country" placeholder={t("Enter your Country")} />
                                                                    <small className="input-error" style={{ display: errors.country ? "block" : "none" }} >{touched.country && errors.country}</small>
                                                                </div>

                                                                <div className="ec-bill-wrap ec-bill-half">
                                                                    <label  >{t("City")}*</label>
                                                                    <Field className="form-control" type="text" name="city" placeholder={t("Enter your City")} required="" />
                                                                    <small className="input-error" style={{ display: errors.city ? "block" : "none" }} >{touched.city && errors.city}</small>
                                                                </div>

                                                                <div className="ec-bill-wrap ec-bill-half">
                                                                    <label  >{t("Post Code")}</label>
                                                                    <Field className="form-control" type="text" name="postcode" placeholder="Post Code" placeholder={t("Enter your Post Code")} />
                                                                </div>

                                                                <div className="ec-bill-wrap ec-bill-half">
                                                                    <label  >{t("Region State")}</label>
                                                                    <Field className="form-control" type="text" name="state" placeholder={t("Enter your state")} required="" />
                                                                </div>

                                                                {/* <div className="ec-bill-wrap text-center">
                                                                    {errorMsg !== "" && <span className=" form-error">{t(errorMsg)}</span>}
                                                                </div> */}



                                                            </Form>

                                                        )

                                                        }
                                                    </Formik>}




                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <span className="ec-check-order-btn">
                                    <button className="btn btn-primary" type="button" form="addressform" onClick={orderOrder}>{t("Place Order")}</button>
                                    {/* <div id="paypal-button-container" style={{width : "100%"}}></div> */}
                                </span>
                            </div>
                        </div>
                        {/* <!--cart content End --> */}
                    </div>
                    {/* <!-- Sidebar Area Start --> */}
                    <div className="ec-checkout-rightside col-lg-4 col-md-12">
                        <div className="ec-sidebar-wrap">
                            {/* <!-- Sidebar Summary Block --> */}
                            <div className="ec-sidebar-block">
                                <div className="ec-sb-title">
                                    <h3 className="ec-sidebar-title">{t("Summary")}<div className="ec-sidebar-res"><i className="ecicon eci-angle-down"></i></div></h3>
                                </div>
                                <div className="ec-sb-block-content ec-sidebar-dropdown">
                                    <div className="ec-checkout-summary">

                                        <div>
                                            <span className="text-left">{t("Sub-Total")}</span>
                                            <span className="text-right">${Amount}</span>
                                        </div>
                                        <div>
                                            <span className="text-left">{t("Delivery Chargesr")}</span>
                                            <span className="text-right">${DonationCost}</span>
                                        </div>

                                        <div className="ec-checkout-summary-total">
                                            <span className="text-left">{t("Total Amount")}</span>
                                            <span className="text-right">${DonationCost + Amount}</span>
                                        </div>
                                    </div>
                                    <div className="ec-checkout-pro">

                                        {Carts && Carts.length > 0 &&
                                            Carts.map((cart, oi) => {

                                                let img = ""
                                                if(!cart.product || !cart.product.images || !cart.product.images[0]){
                                                    img = "https://via.placeholder.com/500"
                                                }else {
                                                img = ImageLink(cart.product.images[0])
                                                }

                                                return (

                                                    <div key={oi} className="col-sm-12 mb-2">
                                                        <div className="ec-product-inner">
                                                            <div className="ec-pro-image-outer">
                                                                <div className="ec-pro-image">
                                                                    <Link to={`/product/${cart.product.categoty}/${cart.product._id}`} className="image">
                                                                        <img className="main-image" src={img} alt="Product" />
                                                                    </Link>
                                                                    <div className="ec-pro-loader"></div></div>
                                                            </div>
                                                            <div className="ec-pro-content">
                                                                <h5 className="ec-pro-title"><Link to={`/product/${cart.product.categoty}/${cart.product._id}`}>{cart.product.name}</Link></h5>

                                                                {/* <div className="ec-pro-rating">
                                                    <i className="ecicon eci-star fill"></i>
                                                    <i className="ecicon eci-star fill"></i>
                                                    <i className="ecicon eci-star fill"></i>
                                                    <i className="ecicon eci-star fill"></i>
                                                    <i className="ecicon eci-star"></i>
                                                </div> */}

                                                                <span className="ec-price">
                                                                    {cart.product.oldprice && <span className="old-price">${cart.product.oldprice}</span>}
                                                                    <span className="new-price">${cart.amount}</span>
                                                                </span>
                                                                <div className="ec-pro-option">
                                                                    <div className="ec-pro-color">
                                                                        <span className="ec-pro-opt-label">{t("Color")}</span>
                                                                        <ul className="ec-opt-swatch ec-change-img">

                                                                            {cart.product.color.map((color, ci) => {
                                                                                return (
                                                                                    <li key={ci} className={myClassname({ "active": color == cart.color })}><a href="javascript:void(0);" className="ec-opt-clr-img" ><span style={{ backgroundColor: color }}></span></a>
                                                                                    </li>)
                                                                            })}


                                                                        </ul>
                                                                    </div>
                                                                    <div className="ec-pro-size">
                                                                        <span className="ec-pro-opt-label">{t("Size")}</span>
                                                                        <ul className="ec-opt-size">

                                                                            {cart.product.size.map((size, si) => {
                                                                                return (
                                                                                    <li key={si} className={myClassname({ "active": size.size == cart.size })}><a href="javascript:void(0);" className="ec-opt-sz" >{size.size}</a></li>
                                                                                )
                                                                            })}

                                                                        </ul>
                                                                    </div>

                                                                    <div className="ec-pro-size">
                                                                        <span className="ec-pro-opt-label">{t("Size")}</span>
                                                                        <ul className="ec-opt-size">

                                                                            {cart.product.shipping.map((shipping, si) => {
                                                                                return (
                                                                                    <li key={si} className={myClassname({ "active": shipping.name === cart.shipping })}><a href="javascript:void(0);" className="ec-opt-sz" >{shipping.name}</a></li>
                                                                                )
                                                                            })}

                                                                        </ul>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })

                                        }


                                    </div>
                                </div>
                            </div>
                            {/* <!-- Sidebar Summary Block --> */}
                        </div>
                        <div className="ec-sidebar-wrap ec-checkout-del-wrap">
                            {/* <!-- Sidebar Summary Block --> */}
                            <div className="ec-sidebar-block">
                                <div className="ec-sb-title">
                                    <h3 className="ec-sidebar-title">{t("Delivery Method")}<div className="ec-sidebar-res"><i className="ecicon eci-angle-down"></i></div></h3>
                                </div>
                                <div className="ec-sb-block-content ec-sidebar-dropdown">
                                    <div className="ec-checkout-del">
                                        <div className="ec-del-desc">{t("Donation")}.</div>
                                        <span className="ec-del-option">

                                            <span>
                                                <span className="ec-del-opt-head">{t("I will not donate")}</span>
                                                <input type="radio" id="del1" name="radio-group" onClick={() => { setDonationCost(0) }} />
                                                <label htmlFor="del1">$0 .00</label>
                                            </span>
                                            <span>
                                                <span className="ec-del-opt-head">{t("I will donate")}</span>
                                                <input type="radio" id="del2" name="radio-group" onClick={() => { setDonationCost(5) }} />
                                                <label htmlFor="del2">$5.00</label>
                                            </span>
                                        </span>

                                    </div>
                                </div>
                            </div>
                            {/* <!-- Sidebar Summary Block --> */}
                        </div>
                        <div className="ec-sidebar-wrap ec-checkout-pay-wrap">
                            {/* <!-- Sidebar Payment Block --> */}
                            <div className="ec-sidebar-block">
                                <div className="ec-sb-title">
                                    <h3 className="ec-sidebar-title">{t("Payment Method")}<div className="ec-sidebar-res"><i className="ecicon eci-angle-down"></i></div></h3>
                                </div>
                                <div className="ec-sb-block-content ec-sidebar-dropdown">
                                    <div className="ec-checkout-pay">
                                        <div className="ec-pay-desc">{t("Please select the preferred payment method to use on this order.")}</div>
                                        <form action="#">

                                            <span className="ec-pay-commemt">
                                                <span className="ec-pay-opt-head">{t("Add Comments About Your Order")}</span>
                                                <textarea onChange={(e) => { setComment(e.target.value) }} name="your-commemt" placeholder="Comments" value={Comment}></textarea>
                                            </span>
                                            <span className="ec-pay-agree"><input type="checkbox" /><a href="javascript:void(0);">{t("I have read and agree")}</a><span className="checked"></span></span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Sidebar Payment Block --> */}
                        </div>
                        <div className="ec-sidebar-wrap ec-check-pay-img-wrap">
                            {/* <!-- Sidebar Payment Block --> */}
                            <div className="ec-sidebar-block">
                                <div className="ec-sb-title">
                                    <h3 className="ec-sidebar-title">{t("Payment Method")}<div className="ec-sidebar-res"><i className="ecicon eci-angle-down"></i></div></h3>
                                </div>
                                <div className="ec-sb-block-content ec-sidebar-dropdown">
                                    <div className="ec-check-pay-img-inner">
                                        <div className="ec-check-pay-img">
                                            <img src="/assets/imgs/ws-payment1.png" alt="" />
                                        </div>
                                        <div className="ec-check-pay-img">
                                            <img src="/assets/imgs/ws-payment2.png" alt="" />
                                        </div>
                                        <div className="ec-check-pay-img">
                                            <img src="/assets/imgs/ws-payment3.png" alt="" />
                                        </div>
                                        <div className="ec-check-pay-img">
                                            <img src="/assets/imgs/ws-payment4.png" alt="" />
                                        </div>
                                        <div className="ec-check-pay-img">
                                            <img src="/assets/imgs/ws-payment5.png" alt="" />
                                        </div>
                                        <div className="ec-check-pay-img">
                                            <img src="/assets/imgs/ws-payment6.png" alt="" />
                                        </div>
                                        <div className="ec-check-pay-img">
                                            <img src="/assets/imgs/ws-payment7.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Sidebar Payment Block --> */}
                        </div>
                    </div>
                </div>
            </div>
        </section >
        // {/* <!-- End checkout page --> */}
    );
}

export default Checkout;