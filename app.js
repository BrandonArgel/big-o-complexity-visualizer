const log2 = (n) => (Math.log2(n) === -Infinity ? 0 : Math.log2(n));
const getColorFromCSSVariable = (variableName) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

const colors = {
  o1: getColorFromCSSVariable("--chart-o1"),
  ologn: getColorFromCSSVariable("--chart-ologn"),
  on: getColorFromCSSVariable("--chart-on"),
  onlogn: getColorFromCSSVariable("--chart-onlogn"),
  on2: getColorFromCSSVariable("--chart-on2"),
  o2n: getColorFromCSSVariable("--chart-o2n"),
  onfact: getColorFromCSSVariable("--chart-onfact"),
  on3: getColorFromCSSVariable("--chart-on3"),
  onsqrt: getColorFromCSSVariable("--chart-onsqrt"),
};

const slider = document.getElementById("n-slider");
const nValueDisplay = document.getElementById("n-value");
const chartCanvas = document.getElementById("bigOChart");
const chartContext = chartCanvas?.getContext("2d");
const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});
let chart;
let currentN;

const formatNumber = (num) => {
  if (num > 1000000000) return (num / 1000000000).toFixed(1) + "B";
  if (num > 1000000) return (num / 1000000).toFixed(1) + "M";
  return numberFormatter.format(num);
};

const hexToRgba = (hex, alpha = 1) => {
  const normalized = hex.trim().replace("#", "");
  const value = parseInt(
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized,
    16,
  );
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const updateValues = (n) => {
  currentN = n;
  if (!nValueDisplay) return;

  nValueDisplay.textContent = n;

  const vals = {
    o1: 1,
    ologn: Math.max(0, Math.ceil(log2(n))),
    on: n,
    onlogn: Math.max(0, Math.ceil(n * log2(n))),
    on2: Math.pow(n, 2),
    on3: Math.pow(n, 3),
    o2n: Math.pow(2, n),
    onfact: factorial(n),
    onsqrt: Math.sqrt(n),
  };

  document.getElementById("val-o1").textContent = formatNumber(vals.o1);
  document.getElementById("val-ologn").textContent = formatNumber(vals.ologn);
  document.getElementById("val-on").textContent = formatNumber(vals.on);
  document.getElementById("val-onlogn").textContent = formatNumber(vals.onlogn);
  document.getElementById("val-on2").textContent = formatNumber(vals.on2);
  document.getElementById("val-on3").textContent = formatNumber(vals.on3);
  document.getElementById("val-o2n").textContent = formatNumber(vals.o2n);
  document.getElementById("val-onfact").textContent = formatNumber(vals.onfact);
  document.getElementById("val-onsqrt").textContent = formatNumber(vals.onsqrt);

  return vals;
};

const factorial = (n) => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

const generateChartData = (maxN) => {
  const labels = [];
  const datasets = {
    o1: [],
    ologn: [],
    on: [],
    onlogn: [],
    on2: [],
    on3: [],
    o2n: [],
    onfact: [],
    onsqrt: [],
  };

  for (let i = 1; i <= maxN; i++) {
    labels.push(i);
    datasets.o1.push(1);
    datasets.ologn.push(Math.max(0, Math.ceil(log2(i))));
    datasets.on.push(i);
    datasets.onlogn.push(Math.max(0, Math.ceil(i * log2(i))));
    datasets.on2.push(Math.pow(i, 2));
    datasets.on3.push(Math.pow(i, 3));
    datasets.o2n.push(Math.min(Math.pow(2, i), maxN * maxN * 1.5));
    datasets.onfact.push(factorial(i));
    datasets.onsqrt.push(Math.sqrt(i));
  }

  return { labels, datasets };
};

const labelToKey = {
  "O(1)": "o1",
  "O(log n)": "ologn",
  "O(n)": "on",
  "O(n log n)": "onlogn",
  "O(n²)": "on2",
  "O(n³)": "on3",
  "O(2ⁿ)": "o2n",
  "O(n!)": "onfact",
  "O(√n)": "onsqrt",
};

const updateChart = (n) => {
  const data = generateChartData(n);
  const maxY = Math.pow(n, 2) * 1.1;

  if (!chartContext) {
    return;
  }

  if (chart) {
    chart.data.labels = data.labels;
    chart.data.datasets.forEach((dataset) => {
      const key = labelToKey[dataset.label];
      if (key && data.datasets[key]) {
        dataset.data = data.datasets[key];
      }
    });
    chart.options.scales.y.max = maxY;
    chart.update();
    return;
  }

  chart = new Chart(chartContext, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "O(1)",
          data: data.datasets.o1,
          borderColor: colors.o1,
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: "O(log n)",
          data: data.datasets.ologn,
          borderColor: colors.ologn,
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: "O(n)",
          data: data.datasets.on,
          borderColor: colors.on,
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: "O(n log n)",
          data: data.datasets.onlogn,
          borderColor: colors.onlogn,
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: "O(n²)",
          data: data.datasets.on2,
          borderColor: colors.on2,
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: "O(n³)",
          data: data.datasets.on3,
          borderColor: colors.on3,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: "O(2ⁿ)",
          data: data.datasets.o2n,
          borderColor: colors.o2n,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: "O(n!)",
          data: data.datasets.onfact,
          borderColor: colors.onfact,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: "O(√n)",
          data: data.datasets.onsqrt,
          borderColor: colors.onsqrt,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 300,
        easing: "easeOutQuart",
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          beginAtZero: true,
          max: maxY,
          title: {
            display: true,
            text: "Operations (time)",
            color: "#e2e8f0",
          },
          ticks: {
            callback: (value) => Math.round(value).toLocaleString(),
          },
          grid: { color: "rgba(255,255,255,0.08)" },
        },
        x: {
          title: {
            display: true,
            text: "Input Size (N)",
            color: "#e2e8f0",
          },
          ticks: { color: "#cbd5e1" },
          grid: { display: false },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#f8fafc", boxWidth: 12 },
        },
        tooltip: {
          backgroundColor: "#020617",
          titleColor: "#67e8f9",
          bodyColor: "#f8fafc",
          borderColor: "rgba(34, 211, 238, 0.35)",
          borderWidth: 1,
          callbacks: {
            label(context) {
              let label = context.dataset.label || "";
              if (label) label += ": ";
              if (context.parsed.y !== null) {
                if (
                  context.dataset.label === "O(2ⁿ)" &&
                  context.parsed.y >= currentN * currentN * 1.5
                ) {
                  label += "> " + formatNumber(context.parsed.y);
                } else {
                  label += formatNumber(context.parsed.y);
                }
              }
              return label;
            },
            labelColor(context) {
              const color = context.dataset.borderColor || "#ffffff";
              return {
                borderColor: color,
                backgroundColor: hexToRgba(color, 0.8),
                borderWidth: 2,
                borderRadius: 4,
              };
            },
            labelTextColor() {
              return "#f8fafc";
            },
          },
        },
      },
    },
  });
};

const initializeApp = () => {
  if (!slider) return;

  slider.addEventListener("input", (event) => {
    const n = Number.parseInt(event.target.value, 10);
    updateValues(n);
    updateChart(n);
  });

  const initialN = Number.parseInt(slider.value, 10);
  updateValues(initialN);
  updateChart(initialN);
};

document.addEventListener("DOMContentLoaded", initializeApp);
