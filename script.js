const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function isLeapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
}

let today = new Date()
let currMonth = today.getMonth()
let currYear = today.getFullYear()
let currDate = today.getDate()
let currSelected = null

let calendar = document.getElementsByClassName("calendar")[0]


// Calendar title
let title = document.getElementsByClassName("title-date")[0]
title.innerText = `${monthNames[currMonth]}, ${currYear}`

// Buttons
let prevbtn = document.getElementsByClassName("btn-prev")[0]
let nextbtn = document.getElementsByClassName("btn-next")[0]
let todaybtn = document.getElementsByClassName("btn-today")[0]

function newSelectionColor(bgc) {
    if(bgc === "rgb(255, 245, 214)")  // today
        return "#c0e7dc"
    else if (bgc === "rgb(192, 231, 220)")  // today + selected
        return "#fff5d6"
    else if (bgc === "")
        return "#01bbef25"
    else
        return ""
}

function updateCalendar() {
    currSelected = null

    title.innerText = `${monthNames[currMonth]}, ${currYear}`

    // Generate calender days
    while (calendar.lastChild) {
        calendar.lastChild.remove()
    }

    // # days in the month
    days = daysInMonth[currMonth]

    if (days == 28) {
        days = isLeapYear(currYear) ? 29: 28
    }
    
    // Day of the week starting
    paddingDates = new Date(currYear, currMonth, 1).getDay()
    for (let i = 0; i < paddingDates; i++) {
        let dayDiv = document.createElement("div")
        calendar.appendChild(dayDiv)
    }

    let todayDiv
    for (let i = 1; i <= days; i++) {
        let dayDiv = document.createElement("div")
        if (i == currDate) {
            todayDiv = dayDiv
        }
        dayDiv.classList.add("day-div")
        dayDiv.innerHTML = `<span class="day-text">${i}</span>`
        
        calendar.appendChild(dayDiv)
    }

    calendar.addEventListener('click', (e) => {
        if (e.target.classList.contains("day-div")) {
            if (currSelected != null) {
                currSelected.style["background-color"] = newSelectionColor(currSelected.style["background-color"])
            }

            e.target.style["background-color"] = newSelectionColor(e.target.style["background-color"])
            currSelected = e.target
        }
    })

    if (currMonth == today.getMonth() && currYear == today.getFullYear()) {
        todayDiv.style["background-color"] = "#fff5d6"
    }

}

prevbtn.addEventListener("click", () => {
    if (currMonth == 0) {
        currMonth = 11
        currYear--
    } else {
        currMonth--
    }

    updateCalendar()
})

nextbtn.addEventListener("click", () => {
    if (currMonth == 11) {
        currMonth = 0
        currYear++
    } else {
        currMonth++
    }

    updateCalendar()
})

todaybtn.addEventListener("click", () => {
    currMonth = today.getMonth()
    currYear = today.getFullYear()

    updateCalendar()
})

// Days of the week
let dow = document.getElementsByClassName("week-day")[0]
for (let i = 0; i < 7; i++) {
    let dayDiv = document.createElement("div")
        dayDiv.classList.add("week-day-div")
        dayDiv.innerHTML = `<span class="week-day-text">${daysOfWeek[i]}</span>`
        dow.appendChild(dayDiv)
}

// Calendar body
updateCalendar()


// Overlay & Modal
let overlay = document.getElementById("overlay")
let addEventModal = document.getElementsByClassName("modal")[0]
let addEventBtn = document.getElementsByClassName("btn-add-event")[0]
let modalCancelBtn = document.getElementsByClassName("modal-btn-cancel")[0]

addEventBtn.addEventListener('click', () => {
    overlay.classList.add("active")
    addEventModal.classList.add("active")
})

modalCancelBtn.addEventListener('click', () => {
    overlay.classList.remove("active")
    addEventModal.classList.remove("active")
})