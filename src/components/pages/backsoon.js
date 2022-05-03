import { Field, Form, Formik } from "formik";
import React , {Fragment, useEffect} from "react"
import { useTranslation } from 'react-i18next';
import { loader } from "../../shared/elements";
import { ImageLink } from '../../shared/funs';
import { CLEAR_MESSAGE } from "../../redux/constans/message"
import { useDispatch, useSelector } from "react-redux";
import { set_subscribe } from "../../redux/actions/subscribe";
import * as yup from "yup";


const Backsoon = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch() 

    useEffect(() => {
        dispatch({ type: CLEAR_MESSAGE })
    }, [])
    
    const { loading } = useSelector(state => state.loading)
    const { errorMsg , successMsg } = useSelector(state => state.message)

    const onSubmit = values => {
        dispatch(set_subscribe(values.email))
    }

    const initialValues = {
        email: ""
    }

    const  emailValidator = yup.object().shape({
        email: yup.string().required(t("email field is required")).email(t("email must be email"))
    })

    const Done = () => <Fragment>
    <div className="confirmed" style={{ display: "block" }} id="confirmed">
        <h5>{t("Done")}!</h5>
        <p>{t("Thank you for subscribing we will back as soon as possible")}</p>
        <button onClick={() => {

            dispatch({ type: CLEAR_MESSAGE })

        }} >{t("OK")}</button>
    </div></Fragment>

  return (  
    // <!-- Start back soon -->
    <section id="hero-section" className="hero-section particles">
        <div className="container-fluid main-container">

        {loading && loader()}
         {successMsg === "sent" && Done()}


            <div className="row">
                <div className="col-md-12 p-0">
                    <div className="main-block" style={{backgroundImage : "url(/assets/imgs/ws-coming-soon.jpg)"}}>
                   
                        <div className="main-info">
                            <div className="hero-container">
                                <div className="hero-counter">
                                    <div className="hero-detail">
                                        <div className="logo">
                                            <img src="/assets/imgs/ws-dark-logo.png"  alt="logo" />
                                        </div>
                                        <h1 className="title">{t("backsoon text")}</h1>
                                        <p className="hero-counter-desc">{t("backsoon description")}</p>
                                        {/* <!-- Countdown --> */}
                                        <span className="counter">
                                            <span id="timer" data-date="September 30, 2023 19:15:10 PDT"><div className="date-box"> 
                                            <div className="numbers">613</div>
                                            <div className="text">{t("days")}</div></div> 
                                            <div className="date-box"> <div className="numbers">09</div>
                                            <div className="text">{t("hours")}</div></div>
                                             <div className="date-box"> <div className="numbers">59</div>
                                             <div className="text">{t("minutes")}</div></div> 
                                             <div className="date-box"> <div className="numbers">31</div>
                                             <div className="text">{t("seconds")}</div></div></span>
                                        </span>
                                        {/* <!-- END Countdown -->
                                        
                                        <!-- Newsletter --> */}

                                          {
                                              <Formik
                                                  initialValues={initialValues}
                                                  onSubmit={onSubmit}
                                                  validationSchema={emailValidator}>

                                                  {
                                                      ({ touched, errors, isValid, dirty }) => (

                                                          <Form className="subscribe_form" id="subscribe_form" method="post">
                                                             <div className="input-group">
                                                              {errorMsg && <span className="form-error">{typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])}</span>}
                                                              <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>
                                                              <Field type="text"  id="subscribe_email" name="email" placeholder={t("Enter your email")} required="" />
                                                              <button disabled={(!dirty || !isValid || loading)} type="submit" className="btn btn-default button" id="subscribe_btn">{t("Subscribe")}</button>
                                                             </div>
                                                          </Form>


                                                      )

                                                  }</Formik>
                                            }
                                        {/* <!-- End Newsletter --> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    // {/* <!-- End back soon --> */}
  );
}  

export default Backsoon;
