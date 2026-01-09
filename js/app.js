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
