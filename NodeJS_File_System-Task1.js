const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const port = 3000;
const folderpath = path.join(__dirname,"public")

// console.log("folderpath",folderpath)

//check for existing folder and create public folder to save files
if(!fs.existsSync(folderpath)){
    console.log("Creating new folder public")
    fs.mkdirSync(folderpath)
}

//POST method to create new files in public folder
app.post("/create_file", (req,res) => {
    const timeStamp = new Date()
    const fileName = `${timeStamp.toISOString().replace(/:/g,"-")}.txt`
    const filePath = path.join(folderpath,fileName)

    fs.writeFile(filePath,timeStamp.toISOString(), (error)=>{
        if(error){
            return res.status(500).json({message:`Error Writing File ${error}`})
        }
        res.json({message:`File created sucessfully - ${fileName}`})
    })
})

//GET method to receive all files in public folder
app.get("/get_files",(req,res)=>{
    fs.readdir(folderpath,(error,files)=>{
        if(error){
            return res.status(500).json({message:`Error reading file ${error}`})
        }
        res.json({message:"Files received successfully",files})
    })
})

app.listen(port,()=>{
    console.log(`Node JS Running in localhost:${port}`)
})

// const timestamp = new Date();
// console.log(timestamp)
// console.log(timestamp.toISOString())
// console.log(timestamp.toISOString().replace(/:/g,"-"))