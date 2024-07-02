import bot from "./bot.js";
import { sessionCreate } from "./wfpinit.js";
import { findCourseByCourse } from "./models/courses.js";

const cosmetology = () => {
    const sendPaymantButton = (courseName, url, coursePrice, chatId) => {
        bot.sendMessage(chatId, `Ви купуєте курс ${courseName}`, { 
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Оплатити ' + coursePrice + ' грн', url: url }],
                ]
            }}
        );
    }

    bot.on("callback_query", async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;

        if (action === 'cosmetology') {
            bot.sendMessage(chatId, 'Зараз ви знаходитися в розділі Косметологія, тут ви можете вибрати підрозділ.', { 
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Апаратні методики', callback_data: 'devicecosm' }],
                        [{ text: 'Інʼєкційна косметологія. Філери.  Контурна пластика', callback_data: 'injections' }],
                        [{ text: 'Естетична косметологія', callback_data: 'ethteticcosm' }]
                    ]
                } 
            })
        }

        switch (action) {
            case 'devicecosm':
                bot.sendMessage(chatId, 'Зараз ви знаходитися в підрозділі Апаратні методики, тут ви можете вибрати курс.', { 
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Апаратні методики коррекції вікових змін. Розацеа. Гіперпігментація. Видалення тату. Лазерне шліфування. IPL', callback_data: 'cosm 1' }],
                        ]
                    } 
                })
            break;
            case 'injections':
                bot.sendMessage(chatId, 'Зараз ви знаходитися в підрозділі Інʼєкційна косметологія. Філери.  Контурна пластика, тут ви можете вибрати курс.', { 
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Назва: "Lips for kiss" . Збільшення губ в авторській методиці', callback_data: 'cosm 2' }],
                            [{ text: 'Вардугіна. Збільшення губ в авторській методиці.', callback_data: 'cosm 3' }],
                            [{ text: 'Корекція філерами носослізної борозди', callback_data: 'cosm 4' }]
                        ]
                    } 
                })
            break;
            case 'ethteticcosm':
                bot.sendMessage(chatId, 'Зараз ви знаходитися в підрозділі Естетична косметологія, тут ви можете вибрати курс.', { 
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Авторська школа пілінгів', callback_data: 'cosm 5' }],
                        ]
                    } 
                })
            break;
        }

        const courseNumber = action.split(' ')

        if (courseNumber[0] === 'cosm') {

            const course = await findCourseByCourse(action);

            const url = await sessionCreate(course.price/100, course.course, chatId);
            sendPaymantButton(course.course_name, url, course.price, chatId);
            
        };
    })

}

export default cosmetology;