import bot from './bot.js';
import { createCourse } from './models/courses.js';

const processCreateCourse = async (text, chatId) => {
    try {
        const lines = text.split(';');
        const course = lines[0];
        const course_name = lines[1];
        const part = lines[2];
        const sub_part = lines[3];
        const price = lines[4];

        console.log(lines)
                
        const result = await createCourse({course, course_name, part, sub_part, price});

        bot.sendMessage(chatId, JSON.stringify(result))
        
    } catch (err) {
        bot.sendMessage(chatId, 'Помилка при обробці тексту.');
        console.error(err);
    }
};


export const createCourses = () =>{
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
    
        if (text.startsWith('_ccourse')) {
            const coursesText = text.replace('_ccourse', '').trim();
            processCreateCourse(coursesText, chatId);
        }
    });
    
}

export default createCourses;
