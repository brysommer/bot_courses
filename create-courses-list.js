import fs from 'fs';
import bot from './bot.js';

const processCourses = (text, chatId) => {
    try {
        const lines = text.split(';');
        const courses = [];
        const courseNames = [];
        const courseKeys = [];

        lines.forEach(line => {
            if (line.trim()) {
                const [courseText, callback] = line.split(':');
                if (courseText && callback) {
                    courses.push({text: courseText.trim(), callback: callback.trim()});
                    courseNames.push(courseText.trim());
                    courseKeys.push(callback.trim());
                }
            }
        });

        const output = `export const courses = ${JSON.stringify(courses, null, 2)};`;
        fs.writeFile('coursesList.js', output, (err) => {
            if (err) {
                bot.sendMessage(chatId, 'Помилка при записі файлу.');
                console.error(err);
                return;
            }

            bot.sendMessage(chatId, `Курси: ${courseNames.join(', ')}\nКлючі: ${courseKeys.join(', ')}`);
        });
    } catch (err) {
        bot.sendMessage(chatId, 'Помилка при обробці тексту.');
        console.error(err);
    }
};


export const createCoursesList = () =>{
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
    
        if (text.startsWith('_courses')) {
            const coursesText = text.replace('_courses', '').trim();
            processCourses(coursesText, chatId);
        }
    });
    
}
