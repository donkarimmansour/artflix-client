import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_carts, increase_carts, decrease_carts, delete_carts } from "../../redux/actions/carts";
import { ImageLink } from "../../shared/funs";
import { toast } from "react-toastify";


const CartBox = () => {

    const { t } = useTranslation();
    const [Carts, setCarts] = useState([])

    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.carts)

    useEffect(() => {
        dispatch(get_carts())
    }, [dispatch])

    useEffect(() => {
        setCarts(carts)
    }, [carts])



    const decreaseProduct = (id, price, quantity) => {
        dispatch(decrease_carts(id))
    }

    const increaseProduct = (id, price, quantity) => {
        dispatch(increase_carts(id))
    }

    const removeProduct = (id) => {
        dispatch(delete_carts(id))
        toast.info(t("Removed"))


    }

    const closeCart = () => {
   
        document.querySelector(".ec-side-cart-overlay").style.display =  "none" 
        document.querySelector("#ec-side-cart.ec-side-cart").classList.remove("ec-open") 
     
     }

    return (
        <Fragment>

            {/* <!-- ekka Mobile Menu Start --> */}
            <div className="ec-side-cart-overlay" style={{ display: "none" }}></div>

            <div id="ec-side-cart" className="ec-side-cart">
                <div className="ec-cart-inner">
                    <div className="ec-cart-top">
                        <div className="ec-cart-title">
                            <span className="cart_title">{t("My Cart")}</span>
                            <button className="ec-close" onClick={closeCart}>×</button>
                        </div>
                        {Carts && Carts.length > 0 &&

                            <ul className="eccart-pro-items">
                                {Carts.map((cart, oi) => {
    
                                    let img = ""
                                    if(!cart.product || !cart.product.images || !cart.product.images.imagesUrl[0]){
                                        img = "https://via.placeholder.com/500"
                                    }else {
                                    img = ImageLink(cart.product.images.imagesUrl[0])
                                    }

                                    return (
                                        <li key={oi}>
                                            <Link to={`/product/${cart.product.categoty}/${cart.product._id}`} className="sidekka_pro_img"><img
                                                src={img}
                                                alt="product" /></Link>


                                            <div className="ec-pro-content">
                                                <a href="product-left-sidebar.html" className="cart_pro_title">{cart.product.name}</a>
                                                <span className="cart-price"><span>${cart.price}</span> x {cart.quantity}</span>
                                                <div className="qty-plus-minus">
                                                    <div className="dec ec_qtybtn" disabled={(cart.quantity <= 1)} onClick={(e) => { decreaseProduct(cart.product._id) }}>-</div>
                                                    <input className="qty-input" type="text" name="ec_qtybtn" onChange={() => { }} value={cart.quantity} />
                                                    <div className="inc ec_qtybtn" onClick={() => { increaseProduct(cart.product._id) }}>+</div>
                                                </div>
                                                <a href="javascript:void(0);" className="remove" onClick={() => { removeProduct(cart.product._id) }}>×</a>
                                            </div>
                                        </li>

                                    )
                                })}

                            </ul>


                        }
                    </div>
                    <div className="ec-cart-bottom">
                        <div className="cart-sub-total">
                            {Carts && Carts.length > 0 &&
                                <table className="table cart-table">
                                    <tbody>
                                        <tr>
                                            <td className="text-left">{t("Total")} :</td>
                                            <td className="text-right primary-color">${
                                                Carts.reduce((amount , cart) => amount + cart.amount , 0 )
                                            }</td>
                                        </tr>
                                    </tbody>
                                </table>


                            }
                        </div>
                        <div className="cart_btn">
                            <Link to="/cart" className="btn btn-primary">{t("View Cart")}</Link>
                            <Link to="/checkout" className="btn btn-secondary">{t("Checkout")}</Link>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default CartBox;
