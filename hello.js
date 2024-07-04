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
    bot.setMyCommands([
        {command: '/start', description: 'Почати спочатку'},
        {command: '/rules', description: 'Регламент надання товару після покупки, правила повернення'},
        {command: '/support', description: 'Звязок з підтримкою'},
      ]);
    
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
            break;

            case '/rules':
                bot.sendMessage(chatId, `### Регламент надання навчальних курсів після придбання та повернення

#### 1. Загальні положення
1.1. Цей регламент визначає порядок надання доступу до навчальних курсів після їх придбання та умови повернення коштів у разі невдоволення якістю курсів або інших причин.
1.2. Регламент є обов'язковим для виконання всіма користувачами, які придбали навчальні курси.
1.3. Придбання курсів підтверджує ознайомлення та згоду користувача з умовами цього регламенту.

#### 2. Надання доступу до навчальних курсів
2.1. Після успішного придбання курсу користувач отримує доступ до матеріалів курсу через особистий кабінет на платформі.
2.2. Доступ до курсу надається протягом 24 годин після підтвердження оплати.
2.3. У разі виникнення технічних проблем з доступом до курсу, користувач має звернутися до служби підтримки, яка зобов'язується вирішити проблему протягом 48 годин.
2.4. Користувач отримує необмежений доступ до матеріалів курсу на період 12 місяців з моменту надання доступу, якщо інше не зазначено в описі курсу.

#### 3. Умови повернення коштів
3.1. Недоступно

#### 4. Зміни та доповнення
4.1. Адміністрація залишає за собою право вносити зміни до цього регламенту. Усі зміни набирають чинності з моменту їх публікації на офіційному сайті.
4.2. Користувачі будуть проінформовані про зміни шляхом розсилки повідомлень на електронну пошту, вказану при реєстрації.

#### 5. Контактна інформація
5.1. У разі виникнення питань або необхідності отримання додаткової інформації користувач може звернутися до служби підтримки через контактну форму на сайті або за електронною адресою: support@example.com.
5.2. Робочі години служби підтримки: з понеділка по п’ятницю з 9:00 до 18:00 за місцевим часом.

#### 6.`);
            break;

            case '/support':
                bot.sendContact(chatId, '+380732401997', 'Марина');
        }
    });
}

export default hello;