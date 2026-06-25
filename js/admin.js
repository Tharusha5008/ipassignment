if(localStorage.getItem("admin")!=="true"){
if(window.location.pathname.includes("dashboard.html")
||window.location.pathname.includes("doctors.html")){
window.location="login.html";
}
}


// Dashboard

let appointments=
JSON.parse(localStorage.getItem("appointments")) || [];

if(document.getElementById("totalAppointments")){

document.getElementById("totalAppointments").innerHTML=
appointments.length;

document.getElementById("totalPatients").innerHTML=
appointments.length;

}


// Doctors

let doctors=
JSON.parse(localStorage.getItem("doctors")) || [];

function displayDoctors(){

let table=document.getElementById("doctorTable");

if(!table) return;

table.innerHTML="";

doctors.forEach((d,index)=>{

table.innerHTML+=`

<tr>

<td>${d.name}</td>

<td>${d.specialization}</td>

<td>

<button
class="btn btn-danger"
onclick="deleteDoctor(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

displayDoctors();


function addDoctor(){

let name=document.getElementById("doctorName").value;

let specialization=
document.getElementById("specialization").value;

doctors.push({

name:name,
specialization:specialization

});

localStorage.setItem(
"doctors",
JSON.stringify(doctors)
);

displayDoctors();

doctorName.value="";
specialization.value="";
}


function deleteDoctor(index){

doctors.splice(index,1);

localStorage.setItem(
"doctors",
JSON.stringify(doctors)
);

displayDoctors();

}// Patients

if(document.getElementById("patientTable")){

let table=document.getElementById("patientTable");

appointments.forEach((p)=>{

table.innerHTML+=`

<tr class="patient-row">

<td>${p.name}</td>

<td>${p.age}</td>

<td>${p.phone}</td>

<td>${p.doctor}</td>

</tr>

`;

});

}


// Search Patients

if(document.getElementById("searchPatient")){

document.getElementById("searchPatient")
.addEventListener("keyup",function(){

let filter=this.value.toLowerCase();

let rows=document.querySelectorAll(".patient-row");

rows.forEach(row=>{

row.style.display=
row.innerText.toLowerCase().includes(filter)
? ""
: "none";

});

});

}


// Appointment Table

if(document.getElementById("appointmentTable")){

let table=document.getElementById("appointmentTable");

appointments.forEach((a,index)=>{

if(!a.status){
a.status="Pending";
}

table.innerHTML+=`

<tr>

<td>${a.name}</td>

<td>${a.doctor}</td>

<td>${a.date}</td>

<td>

<select onchange="changeStatus(${index},this.value)"
class="form-select">

<option ${a.status=="Pending"?"selected":""}>
Pending
</option>

<option ${a.status=="Approved"?"selected":""}>
Approved
</option>

<option ${a.status=="Completed"?"selected":""}>
Completed
</option>

</select>

</td>

<td>

<button
class="btn btn-danger"
onclick="deleteAppointment(${index})">

Delete

</button>

</td>

</tr>

`;

});

}
function changeStatus(index,status){

appointments[index].status=status;

localStorage.setItem(
"appointments",
JSON.stringify(appointments)
);

}


function deleteAppointment(index){

appointments.splice(index,1);

localStorage.setItem(
"appointments",
JSON.stringify(appointments)
);

location.reload();

}


function logout(){

localStorage.removeItem("admin");

window.location="login.html";

}


function exportCSV(){

let csv="Name,Doctor,Date,Status\n";

appointments.forEach(a=>{

csv+=`${a.name},${a.doctor},${a.date},${a.status}\n`;

});

let blob=new Blob([csv],{type:"text/csv"});

let link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="appointments.csv";

link.click();

}