function updateTime() {
  fetch("http://localhost:3000/time")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const date = new Date(data.time);
      const options = {
        timeZone: currentTimezone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
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
setInterval(updateTime, 1000);

// Initial time update
updateTime();
