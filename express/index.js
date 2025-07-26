import express from 'express'

const app = express()

const port =3000

app.get("/", (req, res)=>{
    res.send("hello from krish!")
})

app.get("/about", (req, res)=>{
    res.send("this is about section")
})

app.listen(port, ()=> {
    console.log(`Server is running at port: ${port}...`)
})