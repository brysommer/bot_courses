import bot from "./bot.js";

const hello = () => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        switch (msg.text) {
            case '/start': 
                
                bot.sendMessage(chatId, 'Ви зараз знаходитися в боті, який надає доступ до навчальних курсів, будьласка виберіть за яким напрямком ви хочете навчатися:', { 
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Косметологія ', callback_data: 'cosmetology' }],
                            [{ text: 'Візаж', callback_data: 'makeup' }],
                            [{ text: 'Правила користування ботом', url: 'https://telegra.ph/BAZA-KURSOV-06-23' }]
                        ]
                    } 
                });
        }
    });
}

export default hello;