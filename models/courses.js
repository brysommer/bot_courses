import { Model, DataTypes, Op } from "sequelize";
import { sequelize } from './sequelize.js';
import { logger } from '../logger/index.js';


class Courses extends Model {}
Courses.init({
    course: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: false
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    part: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sub_part: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },


}, {
    freezeTableName: false,
    timestamps: true,
    modelName: 'course',
    sequelize
});


const createCourse = async (courseData) => {
    let res;
    try {
        res = await Courses.create({ ...courseData });
        res = res.dataValues;
        logger.info(`Created course: ${res.course}`);
    } catch (err) {
        logger.error(`Impossible to create course: ${err}`);
    }
    return res;
};



const findCourseByCourse = async (course) => {
    const res = await Courses.findOne({ where: { course } });
    if (res) return res.dataValues;
    return res;
};

const findCourseBySubPart = async (value) => {

    const res = await Courses.findAll({ where: 
        { 
            sub_part: 
                {
                    [Op.like]: `%${value}%`
                } 
        }
    });

    if (res.length > 0) return res.map(el => el.dataValues);
    return;    
};

const deleteCourseByCourse = async (course) => {
    const res = await Courses.destroy({ where: { course } });
    if (res) logger.info(`Deleted status: ${res}. Course id ${course}`);
    return res ? true : false;
};

const editPriceByCourse = async (course, price) => {
    const res = await Courses.update({ price } , { where: { course } });
    if (res[0]) {
        return res[0];
    } 
    return undefined;
}

const findAllCourses = async () => {

    const res = await Courses.findAll({ where: { } });

    if (res.length > 0) return res.map(el => el.dataValues);
    return;

};

export {
    Courses,
    createCourse,
    findCourseByCourse,
    deleteCourseByCourse,
    findCourseBySubPart,
    editPriceByCourse,
    findAllCourses
};   