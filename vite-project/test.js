

/* document.addEventListener("DOMContentLoaded",() =>
  setInterval(()=>{
    let currentDate = new Date();

  // Format date parts using toLocaleString
  let day = currentDate.toLocaleString('sv-SE', { day: 'numeric' });
  let hrs = currentDate.toLocaleString('sv-SE', { hour: '2-digit' });
  let min = currentDate.toLocaleString('sv-SE', { minute: '2-digit' });
  let month = currentDate.toLocaleString('sv-SE', { month: 'long' });
  let year = currentDate.toLocaleString('sv-SE', { year: 'numeric' });

  // Concatenate hours and minutes with a colon
  let time = `${hrs}:${min}`;

  // Get the HTML elements where you want to display the formatted date parts
  let dayElement = document.getElementById('day');
  let hrsElement = document.getElementById('hrs');
  let minElement = document.getElementById('min');
  let monthElement = document.getElementById('month');
  let yearElement = document.getElementById('year');

  // Update the content of the HTML elements with the date parts
  dayElement.textContent = day;
  hrsElement.textContent = time; // Use the concatenated time variable
  minElement.textContent = ''; // Clear the content, as it's already included in the hrsElement
  monthElement.textContent = month;
  yearElement.textContent = year;

  }, 1000)

);
 */







/* 
let formatted = Intl.DateTimeFormat("sv-SE",{
  year:"numeric",
  month:"numeric",
  weekday:"long",
  day:"numeric",
  hour:"numeric",
  minute:"numeric",
  second:"numeric",
}).format(currentDate);
console.log(formatted);

 */


























/* 
    // Format the day, hours, minutes, seconds, and year separately
    let formattedDay = Intl.DateTimeFormat("sv-SE", { weekday: "long" }).format(currentDate);
    let formattedHours = Intl.DateTimeFormat("sv-SE", { hour: "numeric" }).format(currentDate);
    let formattedMinutes = Intl.DateTimeFormat("sv-SE", { minute: "numeric" }).format(currentDate);
    let formattedSeconds = Intl.DateTimeFormat("sv-SE", { second: "numeric" }).format(currentDate);
    let formattedYear = Intl.DateTimeFormat("sv-SE", { year: "numeric" }).format(currentDate);

    // Display the formatted values in the corresponding HTML spans
    document.getElementById("day").innerHTML = "Day: " + formattedDay;
    document.getElementById("hrs").innerHTML = "Hours: " + formattedHours;
    document.getElementById("min").innerHTML = "Minutes: " + formattedMinutes;
    document.getElementById("sec").innerHTML = "Seconds: " + formattedSeconds;
    document.getElementById("year").innerHTML = "Year: " + formattedYear;

 */
/* 
let hrs =document.getElementById("hrs")
let min =document.getElementById("min")
let sec =document.getElementById("sec")

setInterval(()=>{
  let currentDate = new Date();
console.log(currentDate);
hrs.innerHTML = currentDate.getHours();
min.innerHTML = currentDate.getMinutes();
sec.innerHTML = currentDate.getSeconds();

},1000);

 */

/* function formatDate(dateobject){
  let parts = {    date: dateObject.getDate(),
    month: dateObject.getMonth() + 1,
    year: dataObject.getFullYear()
}

  
};

 */

