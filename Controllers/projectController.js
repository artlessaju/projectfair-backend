

const projects = require('../Models/projectSchema')

//add projects
exports.addUserProject = async (req,res)=>{
    console.log("Inside addUserProject");


    //userId

    const userId = req.payload

    //get projectImage

    const projectImage = req.file.filename

    //get project details

    const {title,language,github,link,overview} = req.body

    console.log(userId,title,language,github,link,overview,projectImage);

    //logic for adding project details

    res.status(200).json("Add user project request recieved")

    try{
// if github is present in mongodb
const existingProject = await projects.findOne({github})
if(existingProject){
    res.status(402).json("Project already exists")
}
else{
    //if github is not present in mongodb then create new project deatils and save then in mongodb

    const newProject = new projects({
        title,language,github,link,overview,projectImage,userId
    })
    await newProject.save() //save new project in mongodb
    res.status(200).json(newProject) //response send to client

}
    }
    catch (err){
        res.status(404).json({message:err.message});
    }
}

//get all user-projects 

exports.getAllUsersProjects = async (req,res)=>{

    //get userId

    const userId = req.payload;

    //get all projects of particular user

    try{
        //api call 
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)//send all projects to frontend

    }
    catch(err){
        res.status(401).json("Internet server Error" + err.message);
    }



} 


//get all projects

exports.getAllProjects = async (req,res)=> {

const searchkey = req.query.search

const query = {

language:{

$regex:searchkey,
$options:"i"

}


}




    try{
const allProjects = await projects.find(query)
res.status(200).json(allProjects)//send all projects to frontend

    }
    catch(err){
        res.status(401).json("Internal server Error" + err.message)

    }
}

//get home project

exports.getHomeProject = async (req,res)=>{

try{
    const homeProject = await projects.find().limit(3)
    res.status(200).json(homeProject)//send all projects to frontend
}
catch(err){
    res.status(401).json("internal server error"+ err.message)

}
}

//update project details

exports.updateProject= async (req,res)=>{

 const {title,language,github,link,overview,projectImage} = req.body
 const uploadImage = req.file?req.file.filename:projectImage
 userId = req.payload
 const {pid} = req.params
 try {
// find the particular project and update the project details then save to mongodb
    const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,github,link,overview,projectImage,userId})
    //to save the project deatils to client
    await updateProject.save()
    //response send back to client
    res.status(200).json(updateProject)



 }
 catch(err){
res.status(401).json("Internal server Error"+err.message);
 }


}

//delete the project

exports.deleteProject = async(req,res)=>{
    const {pid} = req.params;
    try{
const deleteUserProject = await projects.findOneAndDelete({_id:pid})
res.status(200).json(deleteUserProject)
    }
    catch(err){
        res.status(401).json("Internet server Error"+err.message);
    }
}


