import bot from "./bot.js";
import { sessionCreate } from "./wfpinit.js";
import { findCourseByCourse } from "./models/courses.js";
import generateMenu from "./generateMenu.js";

const gpt = () => {
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

        if (action === 'gpt') {
            bot.sendMessage(chatId, 'Зараз ви знаходитися в розділі "Нейромережі та Штучний інтелект"', { 
                reply_markup: {
                    inline_keyboard: await generateMenu('Нейромережі та Штучний інтелект')
                } 
            })
            return;
        }

        const courseNumber = action.split(' ')

        if (courseNumber[0] === 'gpt') {

            const course = await findCourseByCourse(action);

            const url = await sessionCreate(course?.price, course?.course, chatId);
            sendPaymantButton(course?.course_name, url, course?.price, chatId);
            
        };
    })

}

export default gpt;