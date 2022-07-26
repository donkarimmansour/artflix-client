import React, { useEffect } from "react"
import { useTranslation } from 'react-i18next';
import AOS from 'aos';


const Services = () => { 
    const { t } = useTranslation();

    useEffect(() => { AOS.init({ duration: 800 }); }, []);


    const Services = [
        {
            title: "Free Shipping",  desc: `Free shipping on all US order or order above $200` , icon: "/assets/imgs/ws-service_1.svg"
        },

        {
            title: "Support",  desc: `Contact us 24 hours a day, 7 days a week` , icon: "/assets/imgs/ws-service_2.svg"
        },

        {
            title: "30 Days Return",  desc: `Simply return it within 30 days for an exchange` , icon: "/assets/imgs/ws-service_3.svg"
        },

        {
            title: "Payment Secure",  desc: `Contact us 24 hours a day, 7 days a week` , icon: "/assets/imgs/ws-service_4.svg"
        },
    ]




  return (
    // <!--  services Section Start -->
    <section className="section ec-services-section section-space-p">
        <h2 className="d-none">{t("Services")}</h2>
        <div className="container">
            <div className="row">

                  {Services.map((serv, ti) => {

                      return (
                          <div key={ti} className="ec_ser_content ec_ser_content_3 col-sm-12 col-md-6 col-lg-3" data-aos="zoom-in"  >
                              <div className="ec_ser_inner">
                                  <div className="ec-service-image">
                                      <img src={serv.icon} className="svg_img" alt="" />
                                  </div>
                                  <div className="ec-service-desc">
                                      <h2>{t(serv.title)}</h2>
                                      <p>{t(serv.desc)}</p>
                                  </div>
                              </div>
                          </div>
                      )
                  })}
                
                     
            </div>
        </div>
    </section>
    // <!--  services Section end -->
  );
}  

export default Services;