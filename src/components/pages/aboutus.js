import React, { Fragment } from "react"
import { useTranslation } from 'react-i18next';
import Breadcrumb from "../stuff/breadcrumb";


const Aboutus = () => {
    const { t } = useTranslation();

    return (

        // <!-- Start about page -->

        <Fragment>
            <Breadcrumb name={t("About Us")} />

            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">{t("About Us")}</h2>
                                <h2 className="ec-title">{t("About Us")}</h2>
                                <p className="sub-title mb-3">{t("About our business Firm")}</p>
                            </div>
                        </div>
                        <div className="ec-common-wrapper">
                            <div className="row">
                                <div className="col-md-6 ec-cms-block ec-abcms-block text-center">
                                    <div className="ec-cms-block-inner">
                                        <img className="a-img" src="/assets/imgs/ws-contactus.jpg" alt="about" />
                                    </div>
                                </div>
                                <div className="col-md-6 ec-cms-block ec-abcms-block text-center">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">{t("About Us text")}</h3>
                                        <p>{t("About Us description")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Fragment>
        // {/* <!-- End about page --> */}
    );
}

export default Aboutus;
