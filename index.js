let Adddata = document.getElementById("addUser");
let UserName = document.getElementById("username");
let RecordData = document.getElementById("records");
let btnText=Adddata.innerText;

let UseArray = [];
let edit_id = null;
let objstr = localStorage.getItem("user"); 

if (objstr != null) {
    UseArray = JSON.parse(objstr);
}
DisplayInfo();
Adddata.addEventListener("click", function () {
    let name = UserName.value;
    console.log(name);

    if (edit_id != null) {
        UseArray.splice(edit_id, 1, {
            name: name,
            id: edit_id
        });
        edit_id = null;
    } else {
        UseArray.push({
            name: name,

        });
    }
    Saveinfo(UseArray);
    UserName.value="";
    Adddata.innerText=btnText;
});
function Saveinfo(UseArray) {
    let str = JSON.stringify(UseArray);
    localStorage.setItem("user", str);
    DisplayInfo()
}
function DisplayInfo() {
    let statement = '';
    UseArray.forEach((user, i) => {
        statement    += `<tr>
        <td scope="row"> ${i + 1}</td>
        <td>${user.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick="editUser(${i})"></i> <i class="btn btn-warning text-white fa fa-trash" onclick="deleteUser(${i})"></i></td>
       </tr>`;
    });
    RecordData.innerHTML = statement;
}
function editUser(id) {
    edit_id = id;
    UserName.value = UseArray[id].name;
    Adddata.innerHTML = "save changes";
}
function deleteUser(id){
    UseArray.splice(id,1);
    Saveinfo(UseArray);
}