import React, { Fragment } from "react"
import { useTranslation } from 'react-i18next';
import Breadcrumb from "../stuff/breadcrumb";


const FAQ = () => {
    const { t } = useTranslation();

    const handleFaq = (e) => {

        console.log(e.target.parentElement);
        let em = e.target.parentElement

        if (e.target.parentElement.className.includes("ec-faq-title")) {
            em = e.target.parentElement.parentElement
        } else {
            em = e.target.parentElement
        }
        if (em.querySelector(".ec-faq-content.ec-faq-dropdown").style.display == "block")
            em.querySelector(".ec-faq-content.ec-faq-dropdown").style.display = "none"
        else
            em.querySelector(".ec-faq-content.ec-faq-dropdown").style.display = "block"

    }

    return (
        // <!-- Start faq pag -->

        <Fragment>
            <Breadcrumb name={t("FAQ")} />

            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">{t("FAQ")}</h2>
                                <h2 className="ec-title">{t("FAQ")}</h2>
                                <p className="sub-title mb-3">{t("Customer service management")}</p>
                            </div>
                        </div>
                        <div className="ec-faq-wrapper">
                            <div className="ec-faq-container">
                                <h2 className="ec-faq-heading">{t("FAQ text")}</h2>
                                <div id="ec-faq">

                                    <div className="col-sm-12 ec-faq-block" onClick={(e) => { handleFaq(e) }} >
                                        <h4 className="ec-faq-title">Return &amp; Refund Policy </h4>
                                        <div className="ec-faq-content ec-faq-dropdown">
                                            <p>There could be certain circumstances beyond our control where you could receive a damaged / defective product or a product that is not the same as per your original order. We will replace the product to your satisfaction at no extra cost. In such circumstances, before using the product, please get in touch with our Customer Service Team who will guide you on the process for the same at our Customer Service number @ 212694204517 <br />
                                                The return process of the product can be restricted depending on the nature and category of the product.</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 ec-faq-block" onClick={(e) => { handleFaq(e) }} >
                                        <h4 className="ec-faq-title">Refunds: </h4>
                                        <div className="ec-faq-content ec-faq-dropdown">
                                            <p>We will process the refund after receipt of the product by "Cheap Shop" or its business partner. Refund will be processed based on the mode of payment of the order<br />
                                                Orders paid by credit/ debit card will be refunded by credit back to the credit/ debit card within 7- 9 working days and the refund will reflect in the next statement.<br />
                                                Orders paid by net banking accounts will be credited back to bank account.<br />
                                                For all other modes of payment, we will send a refund cheque. The cheque will be made in favor of the name as in the "billing name" provided at the time of placing the order.</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 ec-faq-block" onClick={(e) => { handleFaq(e) }} >
                                        <h4 className="ec-faq-title">Conditions for return: </h4>
                                        <div className="ec-faq-content ec-faq-dropdown">
                                            <p>Please notify us of receipt of a Damaged / Defective product within maximum 24 hours of delivery.<br />
                                                Products/Items should be UNUSED.<br />
                                                Products should be returned in their original packaging along with the original price tags, labels and invoices.<br />
                                                It is advised that the return packets should be strongly and adequately packaged so that there is no further damage of goods in transit.</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 ec-faq-block" onClick={(e) => { handleFaq(e) }} >
                                        <h4 className="ec-faq-title">Cancellation Policy </h4>
                                        <div className="ec-faq-content ec-faq-dropdown">
                                            <p>"Cheap Shop" believes in helping its customers as far as possible and has, therefore, a liberal cancellation policy. Under this policy:<br />
                                                Cancellations will be considered only if the request is made within 24 hours of placing an order.</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 ec-faq-block" onClick={(e) => { handleFaq(e) }} >
                                        <h4 className="ec-faq-title">Shipping &amp; Delivery Policy (Products) </h4>
                                        <div className="ec-faq-content ec-faq-dropdown">
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
                </div>
            </section>

        </Fragment>
        // // <!-- End faq pag -->

    );
}

export default FAQ;
