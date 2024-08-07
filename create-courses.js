import bot from './bot.js';
import { createCourse, deleteCourseByCourse, editPriceByCourse } from './models/courses.js';
import { findContentByCourse } from './models/content.js'; 
import { findAllCourses } from './models/courses.js';


const processCreateCourse = async (text, chatId) => {
    try {
        const lines = text.split(';');
        const course = lines[0];
        const course_name = lines[1];
        const part = lines[2];
        const sub_part = lines[3];
        const price = lines[4];

        console.log(lines)
                
        const result = await createCourse({course, course_name, part, sub_part, price});

        bot.sendMessage(chatId, JSON.stringify(result))
        
    } catch (err) {
        bot.sendMessage(chatId, 'Помилка при обробці тексту.');
        console.error(err);
    }
};

const processDeleteCourse = async (text, chatId) => {
    try {
                             
        const result = await deleteCourseByCourse(text);

        bot.sendMessage(chatId, JSON.stringify(result))
        
    } catch (err) {
        bot.sendMessage(chatId, 'Помилка при обробці тексту.');
        console.error(err);
    }
};

const processEditPriceCourse = async (text, chatId) => {
    try {
        const lines = text.split(';');
                             
        const result = await editPriceByCourse(lines[0], lines[1]);

        bot.sendMessage(chatId, JSON.stringify(result))
        
    } catch (err) {

        bot.sendMessage(chatId, 'Помилка при обробці тексту.');

        console.error(err);

    }
}

const processContentList = async (text, chatId) => {
    try {
                             
        const result = await findContentByCourse(text);

        bot.sendMessage(chatId, JSON.stringify(result))
        
    } catch (err) {
        bot.sendMessage(chatId, 'Помилка при обробці тексту.');
        console.error(err);
    }
};

const processCoursesList = async (chatId) => {
    try {
                             
        const result = await findAllCourses();

        bot.sendMessage(chatId, JSON.stringify(result))
        
    } catch (err) {
        bot.sendMessage(chatId, 'Помилка при обробці тексту.');
        console.error(err);
    }
};


export const createCourses = () =>{
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
    
        if (text.startsWith('_ccourse')) {
            const coursesText = text.replace('_ccourse', '').trim();
            processCreateCourse(coursesText, chatId);
        } else if (text.startsWith('_dcourse')) {
            const coursesText = text.replace('_dcourse', '').trim();
            processDeleteCourse(coursesText, chatId);
        } else if (text.startsWith('_editPricecourse')) {
            const coursesText = text.replace('_editPricecourse', '').trim();
            processEditPriceCourse(coursesText, chatId);
        } else if (text.startsWith('_contentList')) {
            const coursesText = text.replace('_contentList', '').trim();
            processContentList(coursesText, chatId);
        } else if (text.startsWith('_listCourses')) {
            processCoursesList(chatId);
        }
    });    
}

export default createCourses;
