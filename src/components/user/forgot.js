import React, {  useEffect, useState } from "react"
import { useNavigate , Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { Field, Formik, Form } from "formik"
import { isAuthentication} from "../../redux/actions/auth"
import { loader } from "../../shared/elements"
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ForgotAuth } from "../../services/auth";


const Forgot = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const { t } = useTranslation(); 
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        dispatch(isAuthentication());
      }, [dispatch]);
    
      const { isAuth } = useSelector((state) => state.auth);

      useEffect(() => {
        if (isAuth) {
          navigate("/");
        }
      }, [isAuth]);


    const initialValues = {
        email: "",
    }

    const onSubmit = values => {

        setLoading(true)
        ForgotAuth(values).then(({ data }) => {

            if (!data.err) {
                setLoading(false)
                toast.success(t("new Sent password"))
    
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

    const  ForgotValidator = yup.object().shape({
        email: yup.string().required(t("email field is required")).email("email must be email"),
    
    })


 
    return (
        // <!-- Start login page-->
        <section className="ec-page-content section-space-p">
            {loading && loader()}


            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="section-title">
                            <h2 className="ec-bg-title">{t("Forgot Password")}</h2>
                            <h2 className="ec-title">{t("Forgot Password")}</h2>
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
                                        validationSchema={ForgotValidator}>

                                        {
                                            ({ touched, errors}) => (

                                                <Form action="#" method="post">

                                                    <span className="ec-login-wrap">
                                                        <label>{t("Email Address")}*</label>
                                                        <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>
                                                        <Field type="text" name="email" placeholder={t("Enter your email")} required="" />
                                                    </span>

                                                    {/* {errorMsg && <span className="ec-login-wrap form-error">{ typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])}</span>} */}

                                                    <span className="ec-login-wrap ec-login-fp">
                                                        <label><Link to="/register">{t("Register")}</Link></label>
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

export default Forgot;
