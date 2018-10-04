// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer, ipcMain, remote} = require('electron');
const helper = remote.require('./src/helper');

document.getElementById('addRecord').addEventListener('click',()=>{
    const inputValue = document.getElementById('todoInput').value;
    ipcRenderer.send('click', inputValue);
});

ipcRenderer.on('task', (event,data)=>{
  const item = JSON.parse(data);
  console.log(item);
  const listWrapper = document.getElementById('listHolder')
  const list = document.createElement('li');
  const AddInput = document.createElement('input');
  AddInput.setAttribute("type", "checkbox")
  list.textContent = `${item.description} : ${item.status ? "Done" : "Not Done"}`;
  list.appendChild(AddInput).setAttribute("class", "list-class");
  listWrapper.append(list);
});


helper.listAll().then((items)=>{
  items.forEach(element => {
    addItem(element);
  });
})

addItem = function(item){
  const listWrapper = document.getElementById('listHolder')
  const list = document.createElement('li');
  const AddInput = document.createElement('input');
  AddInput.setAttribute("type", "checkbox")
  list.textContent = `${item.description} : ${item.status ? "Done" : "Not Done"}`;
  list.appendChild(AddInput).setAttribute("class", "list-class");
  listWrapper.append(list);
};

// const statusChange = document.getElementById