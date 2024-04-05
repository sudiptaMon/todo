const task = document.querySelector("#task");
const container = document.querySelector(".task_container");
const add = document.querySelector("#btn");
const show = document.querySelector("#show");

function generateRandomId() {
    return 'element_' + Math.random().toString(36).substr(2, 9);
}
const addTask = () => {
    let obj = {
        id: generateRandomId(),
        taskName: task.value
    }
    fetch('/addtask', { method: 'POST', headers: { "content-type": "application/json" }, body: JSON.stringify(obj) })
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err)
        })

    task.value = "";
}



const getdata = async () => {
    let allTasks;
    await fetch("/showdata", { method: 'GET' }).then((data) => {
        return data.json();
    }).then((tasks) => {
        // console.log(tasks);
        allTasks = [...tasks];
    }).catch((err) => {
        console.log(err);
    })
    return allTasks;
}

const editElement = (e) => {
    let taskName = document.querySelector(".taskname");
    taskName.disabled = false;
    let div = e.target.parentNode;

    let ok = document.createElement("button");
    let cancel = document.createElement("button");

    ok.innerText = "OK";
    cancel.innerText = "Cancel";

    div.appendChild(ok);
    div.appendChild(cancel);

}

const createElement = (tasks) => {
    // console.log(container.childNodes.length);
    let len = container.childNodes.length;
    for (let i = len - 1; i < tasks.length; i++) {
        let div = document.createElement("div");
        let taskName = document.createElement("input");
        let edit = document.createElement("button");
        let del = document.createElement("button");

        div.setAttribute("id", tasks[i].id);
        div.setAttribute("class", "singleTask");
        taskName.setAttribute('class', 'taskname')
        edit.innerText = "Edit";
        del.innerText = "Delete";

        del.onclick = deleteElement;
        edit.onclick = editElement;
        taskName.value = tasks[i].taskName;
        taskName.disabled = true;
        taskName.style.border = 'none';
        taskName.style.textTransform = 'uppercase';


        div.appendChild(taskName);
        div.appendChild(edit);
        div.appendChild(del);
        container.appendChild(div);

    }

}


const showdata = () => {
    fetch("/showdata", { method: 'GET' }).then((data) => {
        return data.json();
    }).then((tasks) => {
        // console.log(tasks);
        createElement(tasks);
    }).catch((err) => {
        console.log(err);
    })
}



const deleteElement = async (e) => {
    // debugger
    let div = e.target.parentNode;
    console.log(JSON.stringify({ id: div.id }));
    await fetch("/edittask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: div.id }) })
        .then((e) => {
            console.log(e);
        }).catch((err) => {
            console.log(err);
        })
}


window.onload = showdata;
add.onclick = addTask;
show.onclick = showdata;