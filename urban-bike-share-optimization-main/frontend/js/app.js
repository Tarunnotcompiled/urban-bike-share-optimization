let demandChart = null;
let stationData = [];
let demandData = [];

const $ = (id) => document.getElementById(id);

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function formatNumber(value, decimals = 0) {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function stationStatus(available, total) {
  const ratio = total ? available / total : 0;
  if (ratio >= 0.4) return ["Healthy", "good"];
  if (ratio >= 0.2) return ["Moderate", "medium"];
  return ["Low", "low"];
}

function renderStats() {
  const totalBikes = stationData.reduce((sum, s) => sum + Number(s.total_bikes || 0), 0);
  const availableBikes = stationData.reduce((sum, s) => sum + Number(s.available_bikes || 0), 0);
  const availableDocks = stationData.reduce((sum, s) => sum + Number(s.available_docks || 0), 0);
  const averageDemand = demandData.length
    ? demandData.reduce((sum, s) => sum + Number(s.average_demand || 0), 0) / demandData.length
    : 0;

  $("totalBikes").textContent = formatNumber(totalBikes);
  $("availableBikes").textContent = formatNumber(availableBikes);
  $("availableDocks").textContent = formatNumber(availableDocks);
  $("averageDemand").textContent = formatNumber(averageDemand, 1);

  const utilization = totalBikes ? ((availableBikes / totalBikes) * 100) : 0;
  $("utilizationText").textContent = `${formatNumber(utilization, 1)}% of total bikes currently available`;
  $("stationCountText").textContent = `${stationData.length} active stations in the dataset`;
}

function renderTable() {
  const tbody = $("stationTable");
  tbody.innerHTML = "";

  stationData.forEach((station) => {
    const total = Number(station.total_bikes || 0);
    const available = Number(station.available_bikes || 0);
    const percentage = total ? (available / total) * 100 : 0;
    const [status, statusClass] = stationStatus(available, total);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="station-name">${station.station_name}</td>
      <td>${formatNumber(total)}</td>
      <td>${formatNumber(available)}</td>
      <td>${formatNumber(station.available_docks)}</td>
      <td>
        <div class="progress" title="${formatNumber(percentage, 1)}% available">
          <span style="width:${Math.min(100, percentage)}%"></span>
        </div>
      </td>
      <td><span class="badge ${statusClass}">${status}</span></td>
    `;
    tbody.appendChild(row);
  });
}

function renderDemandChart() {
  const ctx = $("demandChart").getContext("2d");
  const labels = demandData.map((item) => item.station_name);
  const values = demandData.map((item) => Number(item.average_demand || 0));

  if (demandChart) demandChart.destroy();

  demandChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Average Demand",
        data: values,
        borderRadius: 7,
        backgroundColor: "#176b87",
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => ` Demand: ${Number(context.raw).toFixed(1)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#edf0f4" },
          ticks: { color: "#8995a5" }
        },
        x: {
          grid: { display: false },
          ticks: { color: "#687586", maxRotation: 0 }
        }
      }
    }
  });

  if (demandData.length) {
    const top = [...demandData].sort(
      (a, b) => Number(b.average_demand) - Number(a.average_demand)
    )[0];

    $("topDemandInsight").querySelector("p").textContent =
      `${top.station_name} has the highest average demand at ${formatNumber(top.average_demand, 1)}.`;
  }
}

async function loadDashboard() {
  const button = $("refreshBtn");
  button.disabled = true;
  button.textContent = "↻ Loading...";

  try {
    const [stations, demand] = await Promise.all([
      fetchJSON("/stations"),
      fetchJSON("/demand")
    ]);

    stationData = stations;
    demandData = demand;

    renderStats();
    renderTable();
    renderDemandChart();

    $("apiStatus").textContent = "Connected";
    $("lastUpdated").textContent =
      `Last updated: ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

    showToast("Dashboard data refreshed");
  } catch (error) {
    console.error(error);
    $("apiStatus").textContent = "Connection error";
    $("stationTable").innerHTML =
      `<tr><td colspan="6" class="loading">Could not load API data. Start Flask with <strong>python app.py</strong>.</td></tr>`;
    showToast("Could not connect to the Flask API");
  } finally {
    button.disabled = false;
    button.textContent = "↻ Refresh data";
  }
}

$("refreshBtn").addEventListener("click", loadDashboard);
loadDashboard();
