import React, { Fragment } from "react"
import { useTranslation } from 'react-i18next';
import Breadcrumb from "../stuff/breadcrumb";


const Cancellation = () => {
    const { t } = useTranslation();


    return (

        // <!-- Start Terms & Condition page -->

        <Fragment>
            <Breadcrumb name={t("Cancellation Policy")} />
            
            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">{t("Cancellation Policy")}</h2>
                                <h2 className="ec-title">{t("Cancellation Policy")}</h2>
                                <p className="sub-title mb-3">{t("Welcome to the Cheap Shop market")}</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="ec-common-wrapper">
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Cancellation Policy</h3>
                                        <p>"Cheap Shop" believes in helping its customers as far as possible and has, therefore, a liberal cancellation policy. Under this policy:<br />
                                            Cancellations will be considered only if the request is made within 24 hours of placing an order.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Return &amp; Refund Policy</h3>
                                        <p>There could be certain circumstances beyond our control where you could receive a damaged / defective product or a product that is not the same as per your original order. We will replace the product to your satisfaction at no extra cost. In such circumstances, before using the product, please get in touch with our Customer Service Team who will guide you on the process for the same at our Customer Service number @ 212694204517 <br />
                                            The return process of the product can be restricted depending on the nature and category of the product.</p>
                                    </div>
                                </div>

                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Conditions for return:</h3>
                                        <p>Please notify us of receipt of a Damaged / Defective product within maximum 24 hours of delivery.<br />
                                            Products/Items should be UNUSED.<br />
                                            Products should be returned in their original packaging along with the original price tags, labels and invoices.<br />
                                            It is advised that the return packets should be strongly and adequately packaged so that there is no further damage of goods in transit.</p>
                                    </div>
                                </div>

                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Refunds:</h3>
                                        <p>We will process the refund after receipt of the product by "Cheap Shop" or its business partner. Refund will be processed based on the mode of payment of the order<br />
                                            Orders paid by credit/ debit card will be refunded by credit back to the credit/ debit card within 7- 9 working days and the refund will reflect in the next statement.<br />
                                            Orders paid by net banking accounts will be credited back to bank account.<br />
                                            For all other modes of payment, we will send a refund cheque. The cheque will be made in favor of the name as in the "billing name" provided at the time of placing the order.</p>
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

export default Cancellation;