import bot from "./bot.js";
import values from "./values.js";

const returnVideoId = () => {
    bot.on('video', async (video) => {
        const fileId = video.video.file_id;
        const chatId = video.chat.id;

        await bot.sendMessage(chatId, fileId)
    });

    bot.on('channel_post', (msg) => {
        console.log(msg)
        console.log(msg.video.file_id)
        if (msg.video) {
            const videoId = msg.video.file_id;
            bot.sendMessage(values.logger_id, `Video ID: ${videoId}`);
        }
    })
}

export default returnVideoId;