const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const crypto=require('crypto');

app.use(express.json());
app.use(express.static("."));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./pages/index.html"));
})

app.post("/addtask", (req, res) => {
    // console.log(req.body);
    if (fs.existsSync("taskdata.json")) {
        let data = fs.readFileSync("taskdata.json");
        data = JSON.parse(data);
        data.push(req.body);
        tasks = data;
        fs.writeFileSync("taskdata.json", JSON.stringify(data));
    } else {
        let arr = [];
        arr.push(req.body);
        fs.writeFileSync("taskdata.json", JSON.stringify(arr));
    }
    // console.log(tasks);
    res.send("task added");
})


app.get("/showdata", (req, res) => {
    let tasks = fs.readFileSync("taskdata.json");
    res.send(tasks);
})

app.post("/edittask", (req, res) => {
    // console.log(req.body);
    let taskData = fs.readFileSync("taskdata.json");
    taskData = JSON.parse(taskData);
    taskData = taskData.filter((e) => {
        if (e.id != req.body.id) {
            return true;
        }
    })
    fs.writeFileSync("taskdata.json", JSON.stringify(taskData));
    res.redirect("/showdata");

})

app.listen(3000, () => {
    console.log("Server Started");
})
