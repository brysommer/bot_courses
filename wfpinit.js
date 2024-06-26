import { WFP, WFP_CONFIG } from 'overshom-wayforpay';
import values from './values.js';

WFP_CONFIG.DEFAULT_PAYMENT_CURRENCY = 'UAH';

export const wfp = new WFP({
    MERCHANT_ACCOUNT: 'itgin_online',
    MERCHANT_SECRET_KEY: values.merchant_sercret,
    MERCHANT_DOMAIN_NAME: '51.20.1.118:3000',
    // service URL needed to receive webhooks
    SERVICE_URL: '51.20.1.118:3000/webhook',
});




