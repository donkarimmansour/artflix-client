import { t } from "i18next"
import React from "react"
import { useTranslation } from 'react-i18next';
import { ImageLink } from '../../shared/funs';




const Maintenance = () => {
    const { t } = useTranslation();

    return (
        // <!-- Start maintenance -->
        <section className="ec-under-maintenance">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="under-maintenance">
                            <div className="logo">
                                <img src="/assets/imgs/ws-logo.png" alt="logo" />
                            </div>
                            <h1>{t("Maintenance text")}</h1>
                            <p>{t("Maintenance description")}</p>
                                <span className= "mainte-counter" >
                                <span id="timer" data-date="September 30, 2023 19:15:10 PDT">
                                 <div className="date-box"><div className="numbers">613</div>
                                 <div className="text">{t("days")}</div></div> <div className="date-box"> 
                                <div className="numbers">09</div><div className="text">{t("hours")}</div></div> 	
                                <div className="date-box"><div className="numbers">59</div><div className="text">{t("minutes")}</div></div> 	
                                <div className="date-box"><div className="numbers">43</div><div className="text">{t("seconds")}</div></div></span>
                        </span>
                        </div>
                    </div>
                    <div className="col-md-6 disp-768">
                        <div className="under-maintenance">
                            <img className="maintenance-img" src="/assets/imgs/ws-maintenance2.gif"  alt="maintenance" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // <!-- End maintenance -->
    );
}

export default Maintenance;
