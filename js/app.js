function animateValue(id, end) {

let start = 0;

let duration = 2000;

let increment = end / (duration / 20);

let counter = setInterval(() => {

start += increment;

document.getElementById(id).innerText = Math.floor(start);

if(start >= end){
document.getElementById(id).innerText = end;
clearInterval(counter);
}

},20);

}

animateValue("doctorCount",25);
animateValue("patientCount",500);
animateValue("appointmentCount",120);
const doctorSearch = document.getElementById("doctorSearch");

if(doctorSearch){

doctorSearch.addEventListener("keyup", function(){

let value = this.value.toLowerCase();

document.querySelectorAll(".doctor-card").forEach(card=>{

card.style.display = card.innerText.toLowerCase().includes(value)
? "block"
: "none";

});

});

}
