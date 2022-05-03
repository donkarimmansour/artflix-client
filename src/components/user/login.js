import React, { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import * as yup from 'yup'
import { Field, Formik, Form } from "formik"
import { isAuthentication } from "../../redux/actions/auth"
import { loader } from "../../shared/elements"
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE } from "../../redux/constans/message"
import { get_wishlist_count } from "../../redux/actions/wishlist";
import { Auth } from "../../redux/actions/auth";
import { toast } from "react-toastify";
import { ConfirmEmailAuth } from "../../services/auth";

const Login = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const { t } = useTranslation();

    const [loading , setLoading] = useState(false);

    const { isAuth, token, user } = useSelector((state) => state.auth);
    const { errorMsg } = useSelector((state) => state.message);

    useEffect(() => {
        dispatch(isAuthentication());
    }, [dispatch]);

    useEffect(() => {
        if (isAuth) {
            const authorization = { "Authorization": `bearer ${token}` }
            dispatch(get_wishlist_count({ filter: { userId: user._id } }, authorization))

            navigate("/");
        }
    }, [isAuth]);

    useEffect(() => {

        if (params.id) {
            setLoading(true)

            ConfirmEmailAuth(params.id).then(({ data }) => {

                if (!data.err) {
                    setLoading(false)
                    toast.success(t("Confirmation succeeded, you can login now"))
                } else {

                    setLoading(false)
                    toast.error(typeof data.msg == "string" ? t(data.msg) : t(data.msg[0]))
                }

                //        console.log(data);

            }).catch(err => {
                console.log("get orders api err ", err);
                setLoading(false)
                toast.error(t("something went wrong please try again"))

            })
        }

    }, [])


    useEffect(() => {
        if (errorMsg !== "") {
            toast.error(errorMsg)
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [errorMsg]);



    const initialValues = {
        email: "",
        password: "",
    }

    const onSubmit = values => {
        dispatch(Auth(values))
    }

    const LoginValidator = yup.object().shape({
        email: yup.string().required(t("email field is required")).email("email must be email"),
        password: yup.string().required(t("password field is required")),
    })





    return (
        // <!-- Start login page-->
        <section className="ec-page-content section-space-p">

            <div className="container">

                {loading && loader()}

                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="section-title">
                            <h2 className="ec-bg-title">{t("Log In")}</h2>
                            <h2 className="ec-title">{t("Log In")}</h2>
                            <p className="sub-title mb-3">{t("Best place to buy products")}</p>
                        </div>
                    </div>
                    <div className="ec-login-wrapper">
                        <div className="ec-login-container">
                            <div className="ec-login-form">


                                {
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={onSubmit}
                                        validationSchema={LoginValidator}>

                                        {
                                            ({ touched, errors, isValid, dirty }) => (

                                                <Form action="#" method="post">

                                                    <span className="ec-login-wrap">
                                                        <label>{t("Email Address")}*</label>
                                                        <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>
                                                        <Field type="text" name="email" placeholder={t("Enter your email")} required="" />
                                                    </span>

                                                    <span className="ec-login-wrap">
                                                        <label>{t("Password")}*</label>
                                                        <small className="input-error" style={{ display: errors.password ? "block" : "none" }} >{touched.password && errors.password}</small>
                                                        <Field type="password" name="password" placeholder={t("Enter your password")} required="" />
                                                    </span>


                                                    {/* {errorMsg && <span className="ec-login-wrap form-error">{typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])}</span>} */}

                                                    <span className="ec-login-wrap ec-login-fp">
                                                        <label><Link to="/forgot">{t("Forgot Password?")}</Link></label>
                                                    </span>

                                                    <span className="ec-login-wrap ec-login-btn">
                                                        <button disabled={(loading)} className="btn btn-primary" type="submit">{t("Login")}</button>
                                                        <Link to="/register" className="btn btn-secondary">{t("Register")}</Link>
                                                    </span>

                                                </Form>


                                            )

                                        }</Formik>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // {/* <!-- End login page--> */}
    );
}

export default Login;
