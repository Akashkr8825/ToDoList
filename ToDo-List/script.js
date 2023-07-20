const addTaskBtn =document.getElementById('addtask')
const addBtn=addTaskBtn.innerText;
const userTextField=document.getElementById('taskfield')
const records=document.getElementById('displayRecord')
let userArray=[];
let edit_id=null;
let objstr=localStorage.getItem('users')
if(objstr!=null){
    userArray=JSON.parse(objstr)
}

DisplyInfo();
addTaskBtn.onclick=()=>{
    const name=userTextField.value;
    if(edit_id!=null){
        //edit
        userArray.splice(edit_id,1,{'task':name})
        edit_id=null;
    }else{
        //insert
    userArray.push({'task': name})
    }
    SaveInfo(userArray)
    userTextField.value=''
    // DisplyInfo();
    addTaskBtn.innerHTML=addBtn
}

function SaveInfo(){
 let str=JSON.stringify(userArray)
 localStorage.setItem('users',str)
 DisplyInfo();
}

function DisplyInfo(){
    let statement='';
    userArray.forEach((user,i)=>{
        statement +=`<tr>
        <th scope="row">${i+1}</th>
        <td>${user.task}</td>
        <td><i class="btn text-white fa fa-edit btn-info max-3" onClick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onClick='DeleteInfo(${i})'></i></td>
      </tr>`;
    });
    records.innerHTML=statement
}

function EditInfo(id){
    edit_id=id;
    userTextField.value=userArray[id].task;
    addTaskBtn.innerText='Save Changes'
}

function DeleteInfo(id){
 userArray.splice(id,1);
 SaveInfo(userArray);
}