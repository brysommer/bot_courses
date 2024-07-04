import bot from "./bot.js";
import { sessionCreate } from "./wfpinit.js";
import { findCourseByCourse } from "./models/courses.js";

const sport = () => {
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

        if (action === 'psy') {
            bot.sendMessage(chatId, 'Зараз ви знаходитися в розділі Курси смм, тут ви можете вибрати підрозділ.', { 
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '«Соколовська . Шлях до ярду»', callback_data: 'psy 1' }],
                    ]
                } 
            })
        }

        const courseNumber = action.split(' ')

        if (courseNumber[0] === 'psy') {

            const course = await findCourseByCourse(action);

            const url = await sessionCreate(course.price, course.course, chatId);
            sendPaymantButton(course.course_name, url, course.price, chatId);
            
        };
    })

}

export default sport;