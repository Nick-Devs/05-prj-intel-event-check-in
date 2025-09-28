// Select elements
const form = document.getElementById("checkInForm");
const attendeeNameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCountDisplay = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

// Team counters
const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");

// Attendance data
let attendeeCount = 0;
const maxGoal = 50;

// Team stats
let teamStats = {
  water: 0,
  zero: 0,
  power: 0
};

// Add submit event listener
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop form refresh

  // Check if max reached
  if (attendeeCount >= maxGoal) {
    greeting.textContent = "🚫 Check-in closed. Maximum capacity of 50 attendees reached.";
    return;
  }

  // Get values
  const name = attendeeNameInput.value.trim();
  const team = teamSelect.value;

  if (!name || !team) {
    greeting.textContent = "⚠️ Please enter a name and select a team.";
    return;
  }

  // Update counts
  attendeeCount++;
  attendeeCountDisplay.textContent = attendeeCount;
  teamStats[team]++;

  if (team === "water") {
    waterCount.textContent = teamStats.water;
  } else if (team === "zero") {
    zeroCount.textContent = teamStats.zero;
  } else if (team === "power") {
    powerCount.textContent = teamStats.power;
  }

  // Progress
  const progressPercent = Math.min((attendeeCount / maxGoal) * 100, 100);
  progressBar.style.width = progressPercent + "%";

  // ✅ Personalized greeting
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;
  greeting.textContent = `✅ Welcome, ${name}! You’ve been checked in to ${teamName}.`;

  // Reset form
  form.reset();
});
