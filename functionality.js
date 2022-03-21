//////////////////////// setup  ////////////////////////
//create appointment
function appt(type, time, location, date, month) {
    this.type = type
    this.time = time
    this.location = location
    this.date = date
    this.month = month
}

var myAppts = [];
// initialize calendat
var selectedDay = 1
//create the currently selected appointment 
var currAppointment = new appt('TEST','none selected','any',selectedDay, 'February') 

//////////////////////// appointment booking page ////////////////////////
//go through calander days, update style when clicked, and update the current day
var calendar = document.querySelectorAll('th')
for (var i = 7; i < calendar.length; i++) {
    var day = calendar[i]
    //display current date selection
    if (day.innerText == selectedDay) {
        day.style.color ="#BB0000"
        day.style.fontWeight ="bold"
        day.style.backgroundColor ="white"
    }
    //funcion to isolate i as local variable
    function click(index) {
        var currDay = calendar[index]
        currDay.addEventListener('click', function () { //////////////////////////////////////////////// calendar
            //reset calander formatting
            for (var i = 7; i < calendar.length; i++) {
                var day = calendar[i]
                day.style.color ="gray"
                day.style.fontWeight ="normal"
                day.style.backgroundColor ="#F0F0F0"
            }
            //update style and selected day
            selectedDay = currDay.innerText
            currDay.style.color ="#BB0000"
            currDay.style.fontWeight ="bold"
            currDay.style.backgroundColor ="white"
            //update current selected date
            currAppointment.date = selectedDay
            //update the appointment display and book button 
            resetBookButton()
            updateDisplay()
        })}
    click(i)
}
//update current appointment info
var apptBttn = document.getElementsByClassName('timeButton')
for (var i = 0; i < apptBttn.length; i++) {
    var button = apptBttn[i]
    //funcion to isolate i as local variable
    function click(index) {
        button.addEventListener('click', function () { 
            //update current selected time
            //clear selection formatting
            for (var i = 0; i < apptBttn.length; i++) {
                apptBttn[i].style.backgroundColor = "white"
                apptBttn[i].style.color = "black" 
            }
            //update formating to show current selection
            apptBttn[index].style.backgroundColor = "#BB0000"
            apptBttn[index].style.color = "white"
            
            //update currTime
            var currTime = apptBttn[index].innerText
            currAppointment.time = currTime

            
            //update the appointment display and book button 
            resetBookButton()
            updateDisplay()

        })  
    }
    click(i)
}  

//update current selected location based on pulldown menu
if (window.location.pathname == '/C:/Users/jason/Documents/1classwork/PUI/A6/getTest.html') { 
    var selection = document.querySelector('select')
    var currLocation = selection.options[selection.selectedIndex].text
    selection.addEventListener('change', function() {
        currLocation = selection.options[selection.selectedIndex].text
        currAppointment.location = currLocation
        
        //update the appointment display and book button 
        resetBookButton()
        updateDisplay()
        })
}

//check if add to my appointments button is clicked
var addAppointmentButton = document.getElementsByClassName('bookButton')
for (var i = 0; i < addAppointmentButton.length; i++) {
    var button = addAppointmentButton[i]
    button.addEventListener('click', addAppointmentClick)     
    }

//add the appointment when clicked
function addAppointmentClick(event) {
    //update add button with feedback
    var bookButton = document.getElementsByClassName('bookButton')[0]
    if (bookButton.innerText == "Add to my appointments") {
        bookButton.innerText = "Added"
        bookButton.style.backgroundColor = "green"
        
        //add appointment to list (this is part of the next assignment), for now just log
        console.log(currAppointment)

    }
}

//////////////////////// myAppointments page ////////////////////////
//check if remove button is clicked
var removeAppointmentButton = document.getElementsByClassName('buttonRed2')
for (var i = 0; i < removeAppointmentButton.length; i++) {
    var button = removeAppointmentButton[i]
    button.addEventListener('click', removeAppointment)        
    }
//remove appointment on button click
function removeAppointment(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    }

//////////////////////// helper functions ////////////////////////
function resetBookButton() {
    //only reset if all appt info is selected
    if (currAppointment.time !== 'none selected' && currAppointment.location !== 'any') {
        var bookButton = document.getElementsByClassName('bookButton')[0]
        bookButton.innerText = "Add to my appointments"
        bookButton.style.backgroundColor = '#BB0000'
        bookButton.style.color = 'white'
        bookButton.style.fontWeight = 'bolder'
        bookButton.style.filter = 'drop-shadow(2px 4px 2px gray)'
    }
}
function updateDisplay() {
    if (currAppointment.time !== 'none selected' && currAppointment.location !== 'any') {
        //edit html div to show selection and add book button
        selectedAppt = document.getElementsByClassName("selectedAppointment")[0]
        selectedAppt.innerHTML = '<br><br><b>COVID '+currAppointment.type+'</b><br>'+currAppointment.month+' '+currAppointment.date+', '+currAppointment.time+' '+currAppointment.location
    }
}

/* function graveyard (will be removed/implemented for final)

 //update cancel button to go back to appointments
    var cancelButton = document.getElementsByClassName('noButton')[0]
    cancelButton.innerText = "See more appointments"
    console.log(cancelButton)

//add appointment to my appointment page
function addAppointmentLog(appointment) {
    var newAppt = document.createElement('div')
    var upcomingAppointments = document.getElementByClassName('upcomingAppointments')[0]
    upcomingAppointments.append(newAppt)
}

//create appointment times in html
function makeAppt {
    for (var i = 9; i < 17; i++) {
        if (i < 12) {
            var timeDisplay = i + ":00" + "a"
            var currLocation = "University Garage"
        }
        else {
            var time = i-12
            var timeDisplay = time + ":00" + "p"
            var currLocation = "University Gym"
        }
        appt('test', timeDisplay, location, date)
} 
*/