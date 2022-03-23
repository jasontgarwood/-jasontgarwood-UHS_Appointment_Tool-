//////////////////////// setup  ////////////////////////
//create appointment
function appt(type, time, location, date, month) {
    this.type = type
    this.time = time
    this.location = location
    this.date = date
    this.month = month
}
//array of appointments
var myAppts = []
// initialize calendat
var selectedDay = 1
//create the currently selected appointment 
var currAppointment = new appt('none selected','none selected','any',selectedDay, 'February') 
//update cart///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var cartButton = document.getElementById('cart')
cartCountSave_json = localStorage.getItem("cartCountSave")
if (cartCountSave_json == null) {
    cartButton.innerText = '0'
}
else {
    cartButton.innerText = JSON.parse(cartCountSave_json)
}


//getAppointment()
//////////////////////// update current appointment information ////////////////////////
//update current appointment day
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
        currDay.addEventListener('click', function () { //////////////////////// calendar
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
//update current appointment time
var apptBttn = document.getElementsByClassName('timeButton')
for (var i = 0; i < apptBttn.length; i++) {
    var button = apptBttn[i]
    //funcion to isolate i as local variable
    function click(index) {
        button.addEventListener('click', function () { ///////////////////////// time
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
if (document.getElementsByClassName('pullDown')[0] !== undefined) { 
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
//update current appointment type
var apptTypeBttn = document.getElementsByClassName('typeButton')
for (var i = 0; i < apptTypeBttn.length; i++) {
    var button = apptTypeBttn[i]
    //funcion to isolate i as local variable
    function click(index) {
        button.addEventListener('click', function () { ///////////////////////// type
            //update current selected time
            //clear selection formatting
            for (var i = 0; i < apptTypeBttn.length; i++) {
                apptTypeBttn[i].style.backgroundColor = "#F0F0F0"
                apptTypeBttn[i].style.color = "black" 
            }
            //update formating to show current selection
            apptTypeBttn[index].style.backgroundColor = "#BB0000"
            apptTypeBttn[index].style.color = "white"
            //update currTime
            var currType = apptTypeBttn[index].innerText
            currAppointment.type = currType
            //update the appointment display and book button 
            resetBookButton()
            updateDisplay()
        })  
    }
    click(i)
}  

//////////////////////// selectand book current appointment ////////////////////////
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
        //add appointment to array and save in local storage 
        myAppts.push(currAppointment)
        
        
        saveAppointment()//////////////////////////////////////////////////////////allow only one type of appointment each
            
        saveCartCount()
        //save cart count
        
        //localStorage.getItem("savedAppts").length
        
    }
}

/*** Document Load ****/
function onLoad() {

    /////all pages
        //update cart number as length of savedAppts
    
    ////my appointments
        //load savedAppts and add html elements as appropriate
        //in order of date somehow 

}

function onLoadDisplayAppts() {
    getAppointment()
    
    for (var i = 0; i < myApts.length; i++) {
        console.log('yes')
        
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
    //remove said appointment from the savedAppts
    }



//////////////////////// helper functions ////////////////////////
//restore book button to clickable state
function resetBookButton() {
    //only reset if all appt info is selected
    if (currAppointment.time !== 'none selected' && currAppointment.location !== 'any' && currAppointment.type !== 'none selected') {
        var bookButton = document.getElementsByClassName('bookButton')[0]
        bookButton.innerText = "Add to my appointments"
        bookButton.style.backgroundColor = '#BB0000'
        bookButton.style.color = 'white'
        bookButton.style.fontWeight = 'bolder'
        bookButton.style.filter = 'drop-shadow(2px 4px 2px gray)'
    }
}
//edit div to show appointment selection
function updateDisplay() {
    if (currAppointment.time !== 'none selected' && currAppointment.location !== 'any' && currAppointment.type !== 'none selected') {
        selectedAppt = document.getElementsByClassName("selectedAppointment")[0]
        selectedAppt.innerHTML = '<br><br><b>COVID '+currAppointment.type+'</b><br>'+currAppointment.month+' '+currAppointment.date+', '+currAppointment.time+' '+currAppointment.location
    }
}

//save appointment to local storage
function saveAppointment() {
    myAppt_json =  JSON.stringify(myAppts)
    localStorage.setItem("savedApptArray", myAppt_json)

}
//update the myAppt array
function getAppointment() {
    myAppt_json =  localStorage.getItem("savedApptArray")
    myAppts = JSON.parse(myAppt_json)
}
//save the cart count to local storage
function saveCartCount() {
    cartButton.innerText = myAppts.length
    localStorage.setItem("cartCountSave", JSON.stringify(cartButton.innerText))
}