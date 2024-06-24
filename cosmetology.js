import bot from "./bot.js";

const cosmetology = () => {    

    bot.on("callback_query", async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;

        if (action === 'cosmetology') {
            bot.sendMessage(chatId, 'Зараз ви знаходитися в розділі Косметологія, тут ви можете вибрати курс.', { 
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Сучасні методи антивікової терапії', callback_data: 'cosmetology_detals' }],
                        [{ text: 'Догляд за шкірою обличчя', callback_data: 'cosmetology_detals' }],
                        [{ text: 'Технології апаратного обличчя та тіла', callback_data: 'cosmetology_detals' }]
                    ]
                } 
            })
        }

        if (action === 'cosmetology_detals') {
            bot.sendMessage(chatId, `
1. Основи антивікової терапії: концепції та підходи
2. Сучасні методи діагностики та моніторингу старіння
3. Гормональна терапія та її роль в уповільненні старіння
4. Інноваційні технології в антивіковій медицині
5. Біологічні та генетичні аспекти антивікових стратегій`, { 
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Оплатити', url: 'https://wayforpay.com/uk' }],
                      
                    ]
                }}
            )
        }



    })

}

export default cosmetology;