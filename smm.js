import bot from "./bot.js";
import { sessionCreate } from "./wfpinit.js";
import { findCourseByCourse } from "./models/courses.js";

const smm = () => {
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

        if (action === 'makeup') {
            bot.sendMessage(chatId, 'Зараз ви знаходитися в розділі Курси смм, тут ви можете вибрати підрозділ.', { 
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '«Как набрать 10000 подписчиков в блог»', callback_data: 'smm 1' }],
                        [{ text: 'Остров SMM. Самый денежный курс от Ханум. Тариф ВИП (2023)', callback_data: 'smm 2' }],
                    ]
                } 
            })
        }

        const courseNumber = action.split(' ')

        if (courseNumber[0] === 'smm') {

            const course = await findCourseByCourse(action);

            const url = await sessionCreate(course.price, course.course, chatId);
            sendPaymantButton(course.course_name, url, course.price, chatId);
            
        };
    })

}

export default smm;