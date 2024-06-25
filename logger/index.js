import bot from "../bot.js";
import { DateTime } from "luxon";
import values from "../values.js";

const DEBUG = true;

// 🗽✨🎈🌞⛵🎃🚸

const logger = {
    now: DateTime.now().toFormat('yy-MM-dd HH:mm:ss'),

    async createNewLog(channelId, description) {
        let res;
        try {
            res = await bot.sendMessage(channelId, description);
        } catch (err) {
            console.log(`🚩 ${this.now} Impossible to create log: ${err}`);
        }
        if (res) {
            return res;
        }
        return;
    },

    async info(desc) {
        const channel = values.logger_id || -1;
        const log = `🏂 ${this.now} ${desc}`;
        const res = await this.createNewLog(channel, log);
        if (res && DEBUG) {
            console.log(`🏂 ${this.now} ${desc}`);
        }
    },

    async warn(desc) {
        const channel = values.logger_id || -1;
        const log = `🎈 ${this.now} ${desc}`;
        const res = await this.createNewLog(channel, log);
        if (res && DEBUG) {
            console.log(log);
        }
    },

    async error(desc) {
        const channel = values.logger_id || -1;
        const log = `🚩 ${this.now} ${desc}`;
        const res = await this.createNewLog(channel, log);
        if (res) {
            console.log(log);
        }
    },
}

export { logger };