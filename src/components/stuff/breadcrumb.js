import React from "react"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const Breadcrumb = (props) => {
    const { t } = useTranslation();


  return (
    // <!-- Start breadcrumb start -->

    
    <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="row ec_breadcrumb_inner">
                        <div className="col-md-6 col-sm-12">
                            <h2 className="ec-breadcrumb-title"><Link to="/">{t("Home")}</Link></h2>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            {/* <!-- ec-breadcrumb-list start --> */}
                            <ul className="ec-breadcrumb-list">
                                <li className="ec-breadcrumb-item"><Link to="/">{t("Home")}</Link></li>
                                <li className="ec-breadcrumb-item active"> {t(props.name)}</li>
                            </ul>
                            {/* <!-- ec-breadcrumb-list end --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    // <!-- End breadcrumb start -->
  );
}  

export default Breadcrumb;