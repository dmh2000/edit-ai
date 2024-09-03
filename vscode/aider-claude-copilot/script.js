function updateTime() {
  fetch("http://localhost:8001/time")
    .then((response) => response.json())
    .then((data) => {
      const date = new Date(data.time);
      const options = {
        timeZone: currentTimezone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        fractionalSecondDigits: 1,
        hour12: false,
      };
      const formattedTime = date.toLocaleString("en-US", options);
      document.getElementById("current-time").textContent = formattedTime;
    })
    .catch((error) => {
      console.error("Error fetching time:", error);
      document.getElementById("current-time").textContent =
        "Error fetching time";
    });
}

let currentTimezone = "America/Los_Angeles";

document
  .getElementById("timezone-select")
  .addEventListener("change", function () {
    currentTimezone = this.value;
    updateTime();
  });

// Update time every second
setInterval(updateTime, 100);

// Initial time update
updateTime();
