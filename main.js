const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
const port = 3000 // "Radiofrekvens"

app.use(bodyParser.json())
app.use(cors())

const employees = [{
    name: "Stefan",
    birthDate:new Date('1972-08-03'),
    id:1,
    hourlySalary:100
},{
    name: "Oliver",
    birthDate:new Date('2008-05-28'),
    id:4,
    hourlySalary:50
},
{
    name: "Josefine",
    birthDate:new Date('2002-03-30'),
    id:3,
    hourlySalary:50
},
{
    name: "Fanny",
    birthDate:new Date('2000-01-02'),
    id:2,
    hourlySalary:60
}]

app.get('/api/employees/:anvId',(req,res)=>{
    console.log(req.params.anvId)
    let p = employees.find(employee=>employee.id == req.params.anvId)
    // 404???
    if(p == undefined){
        res.status(404).send('Finns inte')
    }
    res.json(p)
});

function getNextId(){
    let m = Math.max(...employees.map(employee => employee.id))
    return m + 1
}


app.post('/api/employees',(req,res)=>{
    console.log(req.body)
    var newEmp = {
        name: req.body.name,
        birthDate: req.body.birthDate,
        hourlySalary: req.body.hourlySalary
    }
    newEmp.id = getNextId()
    employees.push(newEmp)
     res.status(201).json(newEmp)
});


app.put('/api/employees/:anvId',(req,res)=>{
    console.log(req.params.anvId)
    let p = employees.find(employee=>employee.id == req.params.anvId)
    // 404???
    if(p == undefined){
        res.status(404).send('Finns inte')
    }
    p.birthDate = req.body.birthDate
    p.hourlySalary = req.body.hourlySalary
    p.name = req.body.name

    res.status(204).send('')
});



app.delete('/api/employees/:anvId',(req,res)=>{
    console.log(req.params.anvId)
    let p = employees.find(employee=>employee.id == req.params.anvId)
    // 404???
    if(p == undefined){
        res.status(404).send('Finns inte')
    }
    employees.splice(employees.indexOf(p),1)
    res.status(204).send('')
});




app.get('/api/employees',(req,res)=>{
    let result = employees.map(p=>({
        id: p.id,
        name: p.name
    }))
     res.json(result)
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  