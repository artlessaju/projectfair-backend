const multer = require ('multer')

// to store multer data

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
       callback(null,'./uploads')
    },

    //create a file name

    filename:(req,file,callback)=> {
        const filename = `image-${Date.now()}-${file.originalname}`
        //forgot to add
        callback(null,filename)
    }




})

//filter

const fileFilter = (req,file,callback) => {
    const allowedMimetypes = ['image/png','image/jpeg','image/jpg']
    if (allowedMimetypes.includes(file.mimetype)){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback (new Error ("Invalid file type ... must be includes png or jpeg or jpg"))
    }
}

const multerConfig = multer({
    storage, fileFilter
})

module.exports = multerConfig