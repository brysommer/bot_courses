import bot from "./bot.js";
import { sessionCreate } from "./wfpinit.js";
import { findCourseByCourse } from "./models/courses.js";
import generateMenu from "./generateMenu.js";

const photo = () => {
    const sendPaymantButton = (courseName, url, coursePrice, chatId) => {
        bot.sendMessage(chatId, `Ви купуєте курс ${courseName}`, { 
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Оплатити ' + coursePrice + ' грн', url: url }],
                ]
            }}
        );
    };

    bot.on("callback_query", async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;

        if (action === 'photo') {
            bot.sendMessage(chatId, 'Зараз ви знаходитися в розділі "Відеозйомка. Обробка фото"', { 
                reply_markup: {
                    inline_keyboard: generateMenu('Відеозйомка. Обробка фото')
                } 
            })
            return;
        }

        const courseNumber = action.split(' ')

        if (courseNumber[0] === 'photo') {

            const course = await findCourseByCourse(action);

            const url = await sessionCreate(course?.price, course?.course, chatId);
            sendPaymantButton(course?.course_name, url, course?.price, chatId);
            
        };
    })

}

export default photo;