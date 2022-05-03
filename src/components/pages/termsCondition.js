import React, { Fragment } from "react"
import { useTranslation } from 'react-i18next';
import Breadcrumb from "../stuff/breadcrumb";


const TermsCondition = () => {
    const { t } = useTranslation();


  return (

    // <!-- Start Terms & Condition page -->

    <Fragment>
        <Breadcrumb  name={t("Privacy Policy")}/>

    <section className="ec-page-content section-space-p">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="section-title">
                        <h2 className="ec-bg-title">{t("Terms Condition")}</h2>
                        <h2 className="ec-title">{t("Terms Condition")}</h2>
                        <p className="sub-title mb-3">{t("Welcome to the Cheap Shop market")}</p>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="ec-common-wrapper">
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">{t("Terms Condition")}</h3>
                                <p>Welcome to our website. If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern ' Chap Shop's' relationship with you in relation to this website.<br/>
                                   The term ' Chap Shop' or 'us' or 'we' refers to the owner of the website whose registered office is B/9, Shivalik, Malviya Nagar, New Delhi-110017. Our company registration number is U52392DL2003PTC121350 , NEW DELHI. The term 'you' refers to the user or viewer of our website.</p>
                            </div>
                        </div>
                        <div className="col-sm-12 ec-cms-block">
                            <div className="ec-cms-block-inner">
                                <h3 className="ec-cms-block-title">The use of this website is subject to the following terms of use</h3>
                                <p>The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                                    Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.<br/>
                                    Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products or information available through this website meet your specific requirements.<br/>
                                    This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.<br/>
                                    All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.<br/>
                                    Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.<br/>
                                    From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).<br/>
                                    You may not create a link to this website from another website or document without ' Chap Shop's' prior written consent.<br/>
                                    Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.</p>
                                 </div>
                        </div>
                 </div>
                </div>
            </div>
        </div>
    </section>

{/* // <!-- End Terms & Condition page --> */}

</Fragment>



  );
}  

export default TermsCondition;