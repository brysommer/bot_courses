import { Model, DataTypes } from "sequelize";
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

export {
    Courses,
    createCourse,
    findCourseByCourse,
};   