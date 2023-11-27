const router = require('express').Router();

const {check, param} = require("express-validator");

const { addTask, list, getTaskById, deleteTask, updateTask, moveTask } = require('../controllers/task.controller');
const validateToken = require('../middleware/validateToken');

router.route('/add').post(validateToken, [
    check('title').trim().not().isEmpty().withMessage(`Please Task Title`),
    check('description').trim().not().isEmpty().withMessage(`Please add task description`),
    check('dueDate').trim().not().isEmpty().withMessage(`Please add task due date`),
], addTask );

router.route('/list').get(validateToken, list);

router.route('/getTaskById').post(validateToken, [
    check('taskId').not().isEmpty().withMessage('Please provide task id')
], getTaskById);

router.route('/delete/:taskId')
    .delete(validateToken, [
        param('taskId').not().isEmpty().withMessage('Please provide task id')
    ], deleteTask);

router.route('/update').put(validateToken, [
    check('title').trim().not().isEmpty().withMessage(`Please add task title`),
    check('_id').not().isEmpty().withMessage('Please add task id'),
    check('description').trim().not().isEmpty().withMessage(`Please add task description`),
    check('dueDate').trim().not().isEmpty().withMessage(`Please add task due date`),
], updateTask);

router.route('/moveTask').post(validateToken, moveTask);


module.exports = router;