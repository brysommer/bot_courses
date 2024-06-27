import bot from "./bot.js";

const generateMenu = async () => {
    try {
        const { courses } = await import(`./coursesList.js?t=${Date.now()}`);
        const menu = courses.map(course => [
            { text: course.text, callback_data: course.callback }
        ]);
        menu.push([{ text: 'Правила користування ботом', url: 'https://telegra.ph/BAZA-KURSOV-06-23' }]);

        return menu;
    } catch (err) {
        console.error('Помилка при створенні меню:', err);
        return [];
    }
};

const hello = () => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        switch (msg.text) {
            case '/start':
                const menu = await generateMenu();
                
                bot.sendMessage(chatId, 'Ви зараз знаходитися в боті, який надає доступ до навчальних курсів, будьласка виберіть за яким напрямком ви хочете навчатися:', { 
                    reply_markup: {
                        inline_keyboard: menu
                    } 
                });
        }
    });
}

export default hello;