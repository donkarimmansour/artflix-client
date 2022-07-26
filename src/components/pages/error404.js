import React from "react"
import { useTranslation } from 'react-i18next';
import {  Link } from 'react-router-dom';




const Error404 = () => {
    const { t } = useTranslation();

  return (  
    // // <!-- Start error 404 -->
    <section className="ec-under-maintenance">
    
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="under-maintenance">
                        <h1>{t("Error 404")}</h1>
                        <h4>{t("Error 404 text")}</h4>
                        <p>{t("Error 404 description")}</p>
                        <Link to="/" className="btn btn-lg btn-primary" tabIndex="0">{t("Back to Home")}</Link>
                    </div>
                </div>
                <div className="col-md-6 disp-768">
                    <div className="under-maintenance">
                        <img className="maintenance-img"  src="/assets/imgs/ws-404.png" alt="maintenance" />
                    </div>
                </div>
            </div>
        </div>
    </section>    
    //  {/* <!-- End error 404 --> */}
  );
}  

export default Error404;
