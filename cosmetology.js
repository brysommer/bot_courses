import bot from "./bot.js";
import { wfp } from "./wfpinit.js";

const cosmetology = () => {    

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
            
            const cousrePrice = 3;

            const session = await wfp.createInvoiceUrl({
                orderReference: (Math.random() * 1e17).toString(),
                productName: [action + ',' + chatId],
                productCount: [1],
                productPrice: [cousrePrice],
            });
            
            console.log(session.value?.invoiceUrl)

            bot.sendMessage(chatId, `
1. Основи антивікової терапії: концепції та підходи
2. Сучасні методи діагностики та моніторингу старіння
3. Гормональна терапія та її роль в уповільненні старіння
4. Інноваційні технології в антивіковій медицині
5. Біологічні та генетичні аспекти антивікових стратегій`, { 
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Оплатити' + cousrePrice + 'грн', url: session.value?.invoiceUrl }],
                      
                    ]
                }}
            );

        };





    })

}

export default cosmetology;