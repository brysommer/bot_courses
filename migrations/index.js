import { Purchase } from '../models/purchases.js';
import { logger } from '../logger/index.js';

const DEBUG = true;

const main = async () => {
    try {
        const syncState = await Promise.all([
            Purchase.sync(),
        ]);
        
        
        
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
};

main();
