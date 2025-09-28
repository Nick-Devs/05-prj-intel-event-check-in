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
const maxGoal = 50; // was set to 5 for testing
let attendeeCount = 0;
let teamStats = {
  water: 0,
  zero: 0,
  power: 0
};

// Load saved data from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTotal = localStorage.getItem("attendeeCount");
  const savedTeams = localStorage.getItem("teamStats");

  if (savedTotal) {
    attendeeCount = parseInt(savedTotal, 10);
    attendeeCountDisplay.textContent = attendeeCount;
    updateProgressBar();
  }

  if (savedTeams) {
    teamStats = JSON.parse(savedTeams);
    waterCount.textContent = teamStats.water;
    zeroCount.textContent = teamStats.zero;
    powerCount.textContent = teamStats.power;
  }

  // If already at max when page loads → show celebration
  if (attendeeCount >= maxGoal) {
    showCelebration();
  }
});

// Add submit event listener
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop form refresh

  // Prevent further check-ins if max reached
  if (attendeeCount >= maxGoal) {
    showCelebration();
    return;
  }

  // Get values
  const name = attendeeNameInput.value.trim();
  const team = teamSelect.value;

  if (!name || !team) {
    greeting.style.display = "block";
    greeting.textContent = "⚠️ Please enter a name and select a team.";
    return;
  }

  // Update counts
  attendeeCount++;
  teamStats[team]++;

  // Update UI
  attendeeCountDisplay.textContent = attendeeCount;
  waterCount.textContent = teamStats.water;
  zeroCount.textContent = teamStats.zero;
  powerCount.textContent = teamStats.power;
  updateProgressBar();

  // Save to localStorage
  localStorage.setItem("attendeeCount", attendeeCount);
  localStorage.setItem("teamStats", JSON.stringify(teamStats));

  // Personalized greeting
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;
  greeting.style.display = "block";
  greeting.textContent = `✅ Welcome, ${name}! You’ve been checked in to ${teamName}.`;

  // Reset form
  form.reset();

  // 🎉 If goal reached → trigger celebration
  if (attendeeCount >= maxGoal) {
    showCelebration();
  }
});

// Progress bar update helper
function updateProgressBar() {
  const progressPercent = Math.min((attendeeCount / maxGoal) * 100, 100);
  progressBar.style.width = progressPercent + "%";
}

// 🎉 Celebration function
function showCelebration() {
  // Find the winning team (highest count)
  let winningTeamKey = Object.keys(teamStats).reduce((a, b) =>
    teamStats[a] >= teamStats[b] ? a : b
  );

  // Map team key to readable name
  const teamNames = {
    water: "🌊 Team Water Wise",
    zero: "🌿 Team Net Zero",
    power: "⚡ Team Renewables"
  };

  greeting.style.display = "block";
  greeting.innerHTML = `🎉 Goal Reached! <br> The winning team is <strong>${teamNames[winningTeamKey]}</strong>! 🏆`;
}

