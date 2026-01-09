let responses = [];
let chart;

function addResponse() {
  const gender = document.getElementById("gender").value;
  const score = parseInt(document.getElementById("score").value);
  if (isNaN(score)) return;

  responses.push({ gender, score });
  updateStats();
  drawChart();
}

function updateStats() {
  const avg = responses.reduce((a,b)=>a+b.score,0)/responses.length;
  document.getElementById("stats").innerText =
    "Total Responses: " + responses.length + 
    " | Average Score: " + avg.toFixed(2);
}

function drawChart() {
  const males = responses.filter(r=>r.gender==="Male").length;
  const females = responses.filter(r=>r.gender==="Female").length;

  if(chart) chart.destroy();
  chart = new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: ["Male", "Female"],
      datasets: [{
        data: [males, females]
      }]
    }
  });
}
// Load saved data on startup
window.onload = function () {
  const saved = localStorage.getItem("responses");
  if (saved) {
    responses = JSON.parse(saved);
    updateStats();
    drawChart();
  }
};

// Save data to localStorage
function saveData() {
  localStorage.setItem("responses", JSON.stringify(responses));
}

// Modify addResponse()
function addResponse() {
  const gender = document.getElementById("gender").value;
  const score = parseInt(document.getElementById("score").value);
  if (isNaN(score)) return;

  responses.push({ gender, score });
  saveData();
  updateStats();
  drawChart();
}

// Export CSV
function exportCSV() {
  let csv = "Gender,Score\n";
  responses.forEach(r => {
    csv += `${r.gender},${r.score}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "survey_data.csv";
  a.click();
}

// Clear data
function clearData() {
  if (!confirm("Clear all survey data?")) return;
  responses = [];
  localStorage.removeItem("responses");
  updateStats();
  drawChart();
}
