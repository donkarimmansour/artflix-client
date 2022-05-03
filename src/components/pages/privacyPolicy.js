import React, { Fragment } from "react"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Breadcrumb from "../stuff/breadcrumb";


const PrivacyPolicy = () => {
    const { t } = useTranslation();


  return (

    <Fragment>
          <Breadcrumb  name={t("Privacy Policy")}/>

 {/* // <!-- Start Privacy & Policy page --> */}
    <section className="ec-page-content section-space-p">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="section-title">
                        <h2 className="ec-bg-title">{t("Privacy Policy")}</h2>
                        <h2 className="ec-title">{t("Privacy Policy")}</h2>
                        <p className="sub-title mb-3">{t("Welcome to the Cheap Shop market")}</p>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="ec-common-wrapper">
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">Welcome to Cheap Shop Market.</h3>
                                <p>This privacy policy sets out how "Cheap shop" uses and protects any information that you give "Cheap shop" when you use this website.<br/>
                                    "Cheap shop" is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.<br/>
                                    "Cheap shop" may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from [Date].</p>
                                </div>
                        </div>
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">What we collect</h3>
                                <p>We may collect the following information: <br/>
                                    name and job title<br/>
                                    contact information including email address<br/>
                                    demographic information such as postcode, preferences and interests<br/>
                                    other information relevant to customer surveys and/or offers</p>
                            </div>
                        </div>
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">What we do with the information we gather</h3>
                                <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:<br/>
                                    Internal record keeping.<br/>
                                    We may use the information to improve our products and services.<br/>
                                    We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.<br/>
                                    From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.<br/>
                                    </p>
                            </div>
                        </div>
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">Security</h3>
                                <p>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</p>
                            </div>
                        </div>

                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">How we use cookies</h3>
                                <p>A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.<br/>
                                    We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.<br/>
                                    Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.<br/>
                                    You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>
                            </div>
                        </div>

                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">Links to other websites</h3>
                                <p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>
                            </div>
                        </div>

                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">Controlling your personal information</h3>
                                <p>You may choose to restrict the collection or use of your personal information in the following ways:<br/>
                                    Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes<br/>
                                    If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at contact@cheap-shop.net<br/>
                                    We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.<br/>
                                    You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please write to "Cheap Shop" Infosolutions Pvt Ltd, B/9, Shivalik, Malviya Nagar, New Delhi-110017<br/>
                                    If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorre</p>
                            </div>
                        </div>

                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">Contacting Us</h3>
                                <p>If there are any questions regarding this privacy policy you may contact us using the information below:<br/>
                                    Cheap Shop <br/>
                                    B/9, Shivalik, Malviya Nagar, New Delhi-110017 <br/>
                                    contact@cheap-shop.net</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

{/* // <!-- End Privacy & Policy page --> */}

    </Fragment>



   
  );
}  

export default PrivacyPolicy;