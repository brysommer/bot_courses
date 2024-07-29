
import { findCourseBySubPart } from "./models/courses.js";

const generateMenu = async (sub_part) => {
    try {
        const courses = await findCourseBySubPart(sub_part);
        console.log(courses)
        const menu = courses.map(course => [
            { text: course.course_name, callback_data: course.course }
        ]);

        return menu;
    } catch (err) {
        console.error('Помилка при створенні меню:', err);
        return [];
    }
};

export default generateMenu