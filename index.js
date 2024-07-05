const express = require('express')
const fs = require('fs')
const path = require ('path')
const app = express()
const post = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine' , 'ejs')
app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        // console.log('files');
        res.render("index",{files:files})
    })
})

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.titel.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect('/')
    })
})

app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,fileData)=>{
        res.render('show',{filename: req.params.filename, fileData:fileData})
    })
})



app.listen(post,()=>{
    console.log(`Your server is start in this port ${post}`)
})