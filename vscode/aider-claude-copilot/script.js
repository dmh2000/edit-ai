import NTPClient from './node_modules/ntp-time/src/ntp-time.js';

let currentTimezone = "America/Los_Angeles";
const ntpClient = new NTPClient('pool.ntp.org', 123, { timeout: 5000 });

function updateTime() {
  ntpClient.getNetworkTime()
    .then(date => {
      const options = {
        timeZone: currentTimezone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedTime = date.toLocaleString("en-US", options);
      console.log(formattedTime);
      document.getElementById("current-time").textContent = formattedTime;
    })
    .catch((error) => {
      console.error("Error fetching time:", error);
      document.getElementById("current-time").textContent = "Error fetching time";
    });
}

document.getElementById("timezone-select").addEventListener("change", function () {
  currentTimezone = this.value;
  updateTime();
});

// Update time every second
setInterval(updateTime, 1000);

// Initial time update
updateTime();
