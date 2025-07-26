import express from 'express'

const app = express()
const port =3000
app.use(express.json())

let myData = []
let nextId = 1

//add a new data
app.post('/data', (req, res)=>{

    const{name, price} = req.body
    const newData = {id: nextId++, name, price}
    myData.push(newData)
    res.status(201).send(newData)
})

//route all data
app.get('/data', (req, res)=>{
    res.status(200).send(myData)
})

//get data with id
app.get('/data/:id', (req, res)=>{
    const data = myData.find(t => t.id === parseInt(req.params.id)) // anything which coomes from the url is in string format
    if(!data){
        return res.status(404).send("Data not found")
    }
    res.status(200).send(data)
})

//update data
app.put('/data/:id', (req, res)=>{
    const dataId = req.params.id
    const data = myData.find(t => t.id === parseInt(req.params.id))
    if(!data){
        return res.status(404).send("Data not found")
    }
    const {name, price} = req.body
    data.name = name
    data.price = price
    res.send(200).send(data)
})

//delete tea
app.delete('/data/:id', (req,res)=>{
    const index = myData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("not found")
    }
    myData.splice(index, 1)
    return res.status(204).send('deleted')
})

// app.get("/", (req, res)=>{
//     res.send("hello from krish!")
// })

// app.get("/about", (req, res)=>{
//     res.send("this is about section")
// })

// app.get("/insta", (req,res)=>{
//     res.send("ohnookrish")
// })

app.listen(port, ()=> {
    console.log(`Server is running at port: ${port}...`)
})