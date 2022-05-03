import React, {  useEffect, useState } from "react"
import { useNavigate , Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { Field, Formik, Form } from "formik"
import { isAuthentication} from "../../redux/actions/auth"
import { loader } from "../../shared/elements"
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { SignupAuth } from "../../services/auth";
import { toast } from "react-toastify";


const Signup = () => {

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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
        address: "", 
        country: "",
        city: "",
        state: "",
        phone: "",
        postcode: "",
    }

    const onSubmit = values => {

        setLoading(true)
        SignupAuth(values).then(({ data }) => {

            if (!data.err) {
                setLoading(false)
                toast.success(t("please confirm your email"))
    
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

    
    const  SginupValidator = yup.object().shape({
        firstname: yup.string().required(t("firstname field is required")),
        lastname: yup.string().required(t("lastname field is required")),
        email: yup.string().required(t("email field is required")).email("email must be email"),
        address: yup.string().required(t("address field is required")),
        country: yup.string().required(t("country field is required")),
        city: yup.string().required(t("city field is required")),
        password: yup.string().required(t("password field is required")),
        confirmpassword: yup.string().required(t("confirm password field is required"))
            .test("confirmpassword", t("confirm password must be the same as password")
                , function (value) {
                    return this.parent.password === value
                }), 
    })

    



    return (
        // <!-- Start Start Register -->
        <section className="ec-page-content section-space-p">
            
            <div className="container">

            {loading && loader()}

                <div className="row">

                    <div className="col-md-12 text-center">
                        <div className="section-title">
                            <h2 className="ec-bg-title">{t("Register")}</h2>
                            <h2 className="ec-title">{t("Register")}</h2>
                            <p className="sub-title mb-3">{t("Best place to buy products")}</p>
                        </div>
                    </div>
                
                    

                    <div className="ec-register-wrapper">
                        <div className="ec-register-container">
                            <div className="ec-register-form">

                                {
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={onSubmit}
                                        validationSchema={SginupValidator}>

                                        {
                                            ({ touched, errors, isValid, dirty }) => (

                                                <Form action="#" method="post">

                                                    <span className="ec-register-wrap ec-register-half ">
                                                        <label>{t("First Name")}*</label>
                                                        <small className="input-error" style={{ display: errors.firstname ? "block" : "none" }} >{touched.firstname && errors.firstname}</small>
                                                        <Field type="text" name="firstname" placeholder={t("Enter your first name")} required="" />
                                                    </span>


                                                    <span className="ec-register-wrap ec-register-half">
                                                        <label>{t("Last Name")}*</label>
                                                        <small className="input-error" style={{ display: errors.lastname ? "block" : "none" }} >{touched.lastname && errors.lastname}</small>
                                                        <Field type="text" name="lastname" placeholder={t("Enter your last name")} required="" />
                                                    </span>

                                                    <span className="ec-register-wrap ec-register-half">
                                                        <label>{t("Email")}*</label>
                                                        <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>
                                                        <Field type="email" name="email" placeholder={t("Enter your email")} required="" />
                                                    </span>

                                                    <span className="ec-register-wrap ec-register-half">
                                                        <label>{t("Phone Number")}</label>
                                                        <Field type="text" name="phone" placeholder={t("Enter your phone number")} />
                                                    </span>

                                                    <span className="ec-register-wrap ec-register-half">
                                                        <label>{t("Password")}*</label>
                                                        <small className="input-error" style={{ display: errors.password ? "block" : "none" }} >{touched.password && errors.password}</small>
                                                        <Field type="password" name="password" placeholder={t("Enter your password")} required="" />
                                                    </span>

                                                    <span className="ec-register-wrap ec-register-half">
                                                        <label>{t("Confirm Password")}*</label>
                                                        <small className="input-error" style={{ display: errors.confirmpassword ? "block" : "none" }} >{touched.confirmpassword && errors.confirmpassword}</small>
                                                        <Field type="password" name="confirmpassword" placeholder={t("Enter your confirm password")} />
                                                    </span>

                                                    <span className="ec-register-wrap">
                                                        <label>{t("Address")}*</label>
                                                        <small className="input-error" style={{ display: errors.address ? "block" : "none" }} >{touched.address && errors.address}</small>
                                                        <Field type="text" name="address" placeholder={t("Enter your Address")} required="" />
                                                    </span>

                                                    <span className="ec-register-wrap ec-register-half">
                                                        <label>{t("Country")}*</label>
                                                        <small className="input-error" style={{ display: errors.country ? "block" : "none" }} >{touched.country && errors.country}</small>
                                                        <Field type="text" name="country" placeholder={t("Enter your Country")} />
                                                    </span>

                                                    <span className="ec-register-wrap ec-register-half">
                                                        <label>{t("City")}*</label>
                                                        <small className="input-error" style={{ display: errors.city ? "block" : "none" }} >{touched.city && errors.city}</small>
                                                        <Field type="text" name="city" placeholder={t("Enter your City")} required="" />
                                                    </span>



                                                    <span className="ec-register-wrap ec-register-half">
                                                        <label>{t("Post Code")}</label>
                                                        <Field type="text" name="postcode" placeholder="Post Code" placeholder={t("Enter your Post Code")} />
                                                    </span>

                                                    <span className="ec-register-wrap ec-register-half">
                                                        <label>{t("Region State")}</label>
                                                        <Field type="text" name="state" placeholder={t("Enter your state")} required="" />
                                                    </span>


                                                     {/* {errorMsg && <span className="ec-register-wrap form-error">{ typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])}</span>} */}

                                                    <span className="ec-register-wrap ec-register-btn">
                                                         <button disabled={(loading )} className="btn btn-primary" type="submit">{t("Register")}</button> 
                                                    </span>
                                                    
                                                    <span className="ec-register-wrap ec-register-btn">
                                                       <Link className="btn btn-secondary" to="/login">{t("Login")}</Link>
                                                    </span>
                                                    
                                                </Form>


                                            )

                                        }</Formik>
                                 }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        // {/* <!-- End Start Register --> */}

    );
}

export default Signup;
