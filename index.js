const express = require('express')
const body_Parser = require('body-parser')
const multer = require('multer')
const crud = require("./crud.js")
const { response, request } = require('express')
const port = 8080
const db_name = 't_one'
const app = express()
app.use(body_Parser.json())
app.use(body_Parser.urlencoded({ extended: true }))
const upload = multer()
try{
    app.get('/', (request, response)=>{
        response.send('hello')
    })
    app.get('/videos/:pref', (request, response)=>{
        const preferences = request.params.pref
        crud.find_videos_by_prefernces(db_name, preferences).toArray((err, res)=>{
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.json(res)
            if(err)
                console.error(err)
        })
    })
    app.get('/videos', (request, response)=>{
        crud.find_videos_by_prefernces(db_name).toArray((err, res)=>{
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.json(res)
            if(err)
                console.error(err)
        })
    })
    app.get('/preference/:id',(request, response) =>{
        crud.find_preference(db_name, request.params.id).toArray((err,res)=>{
            response.json(res)
        })
    })

    app.get('/user/:id',(request, response) =>{
        crud.find_user_byId(db_name, request.params.id).then(res=>{
            response.json(res)
        })
    })
    app.post('/save-preference', upload.array(),(request, response)=>{
        const preference = request.body
        if(preference != {} || preference != undefined){
            crud.insert_preference(db_name, preference)
            response.json(preference)
        }
    })
    app.post('/save-video', (request, response)=>{
        const data = request.body
        if(data != {} || data != undefined){
            response.json(crud.insertion_video(db_name, data))
        }
    })
    app.get('/likes/:title', (request, response)=>{
        crud.update_like(db_name, request.params.title).then(res=>{
            response.json('ok')
        })
    })
}catch(err){
    console.error(err)
}
app.listen(port, ()=>console.log(`server started localhost:${port}`))