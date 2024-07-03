import bot from './bot.js';
import { createContent } from './models/content.js';

const processCreateContent = async (coursesText, chatId) => {
    try {
        const lines = coursesText.split(';');
        const media = lines[0];
        const text = lines[1];
        const course = lines[2];
        const serial = lines[3];
        const type = lines[4];

        console.log(lines)
                
        const result = await createContent({media, text, course, serial, type});

        bot.sendMessage(chatId, JSON.stringify(result))
        
    } catch (err) {
        bot.sendMessage(chatId, 'Помилка при обробці тексту.');
        console.error(err);
    }
};


export const createContentByTG = () =>{
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
    
        if (text.startsWith('_ccontent')) {
            const coursesText = text.replace('_ccontent', '').trim();
            processCreateContent(coursesText, chatId);
        }
    });
    
}

export default createContentByTG;
