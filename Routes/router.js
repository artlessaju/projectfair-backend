const express= require('express');


const userController = require('../Controllers/userController')

const projectController = require ('../Controllers/projectController')

const jwtMiddleware = require ('../Middlewares/jwtMiddleware')

const multerConfig = require('../Middlewares/multerMiddleware')

//create router object of express to define path

const router = new express.Router()

//using router object to define path

//Register API path - http://localhost:4000/register - frontend ->
router.post('/register',userController.register)

//login API path - http://localhost:4000/login - frontend ->
router.post('/login',userController.login)

//add user project API path - htttp://localhost:4000/project/add

router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)


//get all user projects path - http://localhost:4000/project/all-user-projects
 
router.get('/project/all-user-projects',jwtMiddleware,projectController.getAllUsersProjects)

//get all user projects path - http://localhost:4000/project/all-project
 
router.get('/project/all-project',jwtMiddleware,projectController.getAllProjects)

//get all user projects path - http://localhost:4000/project/home-project
 
router.get('/project/home-project',projectController.getHomeProject)

//update project - http://localhost:4000/project/update-project/853930580

router.put('/project/update-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateProject)

//delete-project -- http://localhost:4000/project/delete-project

router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)



module.exports = router