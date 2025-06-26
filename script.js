const date = new Date();
const events = {}; // For storing events by date

const renderCalendar = () => {
  date.setDate(1);
  const monthDays = document.querySelector(".days");

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];
  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    const today = new Date();
    const thisDate = `${date.getFullYear()}-${date.getMonth()}-${i}`;
    const hasEvent = events[thisDate] ? "has-event" : "";
    const isToday = i === today.getDate() && date.getMonth() === today.getMonth() ? "today" : "";

    days += `<div class="${isToday} ${hasEvent}" data-date="${thisDate}">${i}</div>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }

  monthDays.innerHTML = days;

  // Event click listener
  document.querySelectorAll(".days div").forEach(day => {
    day.addEventListener("click", () => {
      const dateClicked = day.dataset.date;
      if (!dateClicked) return;
      showEventPopup(dateClicked);
    });
  });
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});
document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

// Event popup
const popup = document.querySelector(".event-popup");
const input = document.getElementById("event-input");
let currentDate = "";

function showEventPopup(dateStr) {
  currentDate = dateStr;
  popup.classList.remove("hidden");
  input.value = events[dateStr] || "";
}

document.getElementById("save-event").addEventListener("click", () => {
  const val = input.value.trim();
  if (val !== "") {
    events[currentDate] = val;
  } else {
    delete events[currentDate];
  }
  popup.classList.add("hidden");
  renderCalendar();
});

document.getElementById("cancel-event").addEventListener("click", () => {
  popup.classList.add("hidden");
});

// Toggle theme
document.querySelector(".toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

renderCalendar();
