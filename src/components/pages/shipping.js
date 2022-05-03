import React, { Fragment } from "react"
import { useTranslation } from 'react-i18next';
import Breadcrumb from "../stuff/breadcrumb";


const Shipping = () => {
    const { t } = useTranslation();


    return (

        // <!-- Start Terms & Condition page -->

        <Fragment>
            <Breadcrumb name={t("Shipping Delivery Policy")} />

            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">{t("Shipping Delivery Policy")}</h2>
                                <h2 className="ec-title">{t("Shipping Delivery Policy")}</h2>
                                <p className="sub-title mb-3">{t("Welcome to the Cheap Shop market")}</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="ec-common-wrapper">
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Shipping &amp; Delivery Policy (Products)</h3>
                                        <p>"Cheap Shop" is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 15 working days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation. Delivery of all orders will be to registered address of the buyer as per the credit/debit card only at all times (Unless specified at the time of Order).<br />
                                            "Cheap Shop" is in no way responsible for any damage to the order while in transit to the buyer.<br />
                                            While we shall strive to ship all items in your order together, this may not always be possible due to product characteristics, or availability.<br />
                                            Orders are shipped within 15 working days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
                                        </p>
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

export default Shipping;