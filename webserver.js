import e from "express";
import values from "./values.js";
import * as crypto from 'crypto';
import { createNewPurchaseByChatId } from "./models/purchases.js";


const server = () => {

    const app = e();
    const port = 3000;

    app.use(e.json()) // for parsing application/json
    app.use(e.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    app.post('/webhook', async (req, res) => {


        const {body} = await req.body;  
        
        const data = JSON.parse(body);
        console.log(data);
        console.log(data.merchantAccount, data.merchantSignature, data.amount, data.transactionStatus)

        const forHash = [
            data.merchantAccount,
            data.orderReference,
            data.amount,
            data.currency,
            data.authCode,
            data.cardPan,
            data.transactionStatus,
            data.reasonCode,
        ].join(';');

        const expectedMerchantSignature = crypto
            .createHmac('md5', values.merchant_sercret)
            .update(forHash)
            .digest('hex');

        console.log(expectedMerchantSignature);
        

        if (expectedMerchantSignature !== data.merchantSignature) {
            throw new Error('Corrupted webhook received. Webhook signature is not authentic.');
        }

        const metadata = data?.products[0].name.split(',');
        const chatId = metadata[1];
        const courseName = metadata[0];

        if (data.transactionStatus === 'Approved') {
            
            if (!chatId || !courseName) {
                res.status(400).json(`Webhook Error: Missing metadata`);
            }
            //create purchase
            console.log(chatId, courseName);
            
            await createNewPurchaseByChatId(chatId, courseName);
            
  } else {
    res.status(200).json(`Webhook Error: Unhandled event type`)
  }

  const answer = {
    orderReference: data.orderReference,
    status: 'accept',
    time: Date.now(),
    signature: '',
  };
  const forHashString = [answer.orderReference, answer.status, answer.time].join(';');
  const hash = crypto.createHmac('md5', values.merchant_sercret).update(forHashString).digest('hex');
  answer.signature = hash;
  
  res.status(200).send(JSON.stringify(answer));

});

    
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });

}

export default server;


  