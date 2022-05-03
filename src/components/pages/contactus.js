import React, { useEffect, Fragment } from "react"
import { useTranslation } from 'react-i18next';
import { Field, Formik, Form } from "formik"
import { loader } from "../../shared/elements"
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { set_contact } from "../../redux/actions/contact";
import { CLEAR_MESSAGE } from "../../redux/constans/message"
import Breadcrumb from "../stuff/breadcrumb";
import { toast } from "react-toastify";

const Contactus = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: CLEAR_MESSAGE })
    }, [])

    const { loading } = useSelector(state => state.loading)
    const { errorMsg, successMsg } = useSelector(state => state.message)

    useEffect(() => {
        if (errorMsg !== "") {
            toast.error(errorMsg)
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [errorMsg]);

    useEffect(() => {
        if (successMsg === "sent") {
            toast.success(t("thank you for contacting us we will reply as soon as possible"))
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [successMsg]);



    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        comment: ""
    }

    const onSubmit = values => {

        const { firstname, lastname, email, phone, comment } = values
        dispatch(set_contact(firstname, lastname, email, phone, comment))

    }


    const ContactValidator = yup.object().shape({
        firstname: yup.string().required(t("firstname field is required")),
        lastname: yup.string().required(t("lastname field is required")),
        comment: yup.string().required(t("comment field is required")),
        email: yup.string().required(t("email field is required")).email("email must be email"),
    })




    return (
        // // <!-- Start contact page -->

        <Fragment>
            <Breadcrumb name={t("Contact Us")} />


            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="ec-common-wrapper">
                            <div className="ec-contact-leftside">
                                <div className="ec-contact-container">

                                    {loading && loader()}

                                    <div className="ec-contact-form">


                                        {
                                            <Formik
                                                initialValues={initialValues}
                                                onSubmit={onSubmit}
                                                validationSchema={ContactValidator}>

                                                {
                                                    ({ touched, errors }) => (

                                                        <Form action="#" method="post">
                                                            <span className="ec-contact-wrap">
                                                                <label>{t("First Name")}*</label>
                                                                <small className="input-error" style={{ display: errors.firstname ? "block" : "none" }} >{touched.firstname && errors.firstname}</small>
                                                                <Field type="text" name="firstname" placeholder={t("Enter your first name")} required="" />
                                                            </span>
                                                            <span className="ec-contact-wrap">
                                                                <label>{t("Last Name")}*</label>
                                                                <small className="input-error" style={{ display: errors.lastname ? "block" : "none" }} >{touched.lastname && errors.lastname}</small>
                                                                <Field type="text" name="lastname" placeholder={t("Enter your last name")} required="" />
                                                            </span>
                                                            <span className="ec-contact-wrap">
                                                                <label>{t("Email")}*</label>
                                                                <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>
                                                                <Field type="email" name="email" placeholder={t("Enter your email")} required="" />
                                                            </span>
                                                            <span className="ec-contact-wrap">
                                                                <label>{t("Phone Number")}</label>
                                                                <Field type="text" name="phone" placeholder={t("Enter your phone number")} />
                                                            </span>
                                                            <span className="ec-contact-wrap">
                                                                <label>{t("Comments/Questions")}*</label>
                                                                <small className="input-error" style={{ display: errors.comment ? "block" : "none" }} >{touched.comment && errors.comment}</small>
                                                                <Field as="textarea" name="comment" placeholder={t("Please leave your comments here.")}></Field>
                                                            </span>


                                                            {/* <span className="ec-contact-wrap" style={{textAlign : "center" , marginBottom : "20px"}}> 
                                                            {errorMsg && <span className="form-error">{typeof errorMsg == "string" ? t(errorMsg) : t(errorMsg[0])}</span>}
                                                        </span> */}


                                                            <span className="ec-contact-wrap ec-contact-btn">
                                                                <button disabled={(loading)} className="btn btn-primary" type="submit">{t("Submit")}</button>
                                                            </span>

                                                        </Form>


                                                    )

                                                }</Formik>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="ec-contact-rightside">
                                <div className="ec_contact_map">
                                    <div className="ec_map_canvas">
                                        <iframe id="ec_map_canvas" src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d71263.65594328841!2d144.93151478652146!3d-37.8734290780509!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1615963387757!5m2!1sen!2sus"></iframe>
                                        <a target="_blank" href="https://sites.google.com/view/maps-api-v2/mapv2"></a>
                                    </div>
                                </div>
                                <div className="ec_contact_info">
                                    <h1 className="ec_contact_info_head">{t("Contact Us")}</h1>
                                    <ul className="align-items-center">
                                        <li className="ec-contact-item"><i className="ecicon eci-map-marker" aria-hidden="true"></i><span>{t("Address")} :</span>71 Pilgrim Avenue Chevy Chase, east california. east california. MD
                                            20815, USA</li>
                                        <li className="ec-contact-item align-items-center"><i className="ecicon eci-phone" aria-hidden="true"></i><span>{t("Call Us")} :</span><a target="_blank" href="tel:+440123456789">+44 0123
                                            456 789</a></li>
                                        <li className="ec-contact-item align-items-center"><i className="ecicon eci-envelope" aria-hidden="true"></i><span>{t("Email")} :</span><a target="_blank" href="mailto:example@ec-email.com">example@ec-email.com</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Fragment>


        //  {/* <!-- End contact page --> */}
    );
}

export default Contactus;
