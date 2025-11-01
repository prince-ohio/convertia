const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/length", (req, res) => {
  const { value, from, to } = req.body;
  const val = parseFloat(value);
  const units = {
    millimeter: 0.001, centimeter: 0.01, meter: 1, kilometer: 1000,
    inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.34,
  };
  const result = (val * units[from]) / units[to];
  res.send(`<link rel="stylesheet" href="/styles.css">
  <div class="container">
    <h1>Length Converter</h1>
    <div class="result">${val} ${from} = ${result.toFixed(4)} ${to}</div>
    <nav>
      <a href="/length.html">↩ Back</a>
      <a href="/">Home</a>
    </nav>
  </div>`);
});

app.post("/weight", (req, res) => {
  const { value, from, to } = req.body;
  const val = parseFloat(value);
  const units = {
    milligram: 0.001, gram: 1, kilogram: 1000, ounce: 28.3495, pound: 453.592,
  };
  const result = (val * units[from]) / units[to];
  res.send(`<link rel="stylesheet" href="/styles.css">
  <div class="container">
    <h1>Weight Converter</h1>
    <div class="result">${val} ${from} = ${result.toFixed(4)} ${to}</div>
    <nav>
      <a href="/weight.html">↩ Back</a>
      <a href="/">Home</a>
    </nav>
  </div>`);
});

app.post("/temperature", (req, res) => {
  const { value, from, to } = req.body;
  const val = parseFloat(value);
  let result = val;
  if (from !== to) {
    if (from === "Celsius" && to === "Fahrenheit") result = val * 9/5 + 32;
    else if (from === "Fahrenheit" && to === "Celsius") result = (val - 32) * 5/9;
    else if (from === "Celsius" && to === "Kelvin") result = val + 273.15;
    else if (from === "Kelvin" && to === "Celsius") result = val - 273.15;
    else if (from === "Fahrenheit" && to === "Kelvin") result = (val - 32) * 5/9 + 273.15;
    else if (from === "Kelvin" && to === "Fahrenheit") result = (val - 273.15) * 9/5 + 32;
  }
  res.send(`<link rel="stylesheet" href="/styles.css">
  <div class="container">
    <h1>Temperature Converter</h1>
    <div class="result">${val}° ${from} = ${result.toFixed(2)}° ${to}</div>
    <nav>
      <a href="/temperature.html">↩ Back</a>
      <a href="/">Home</a>
    </nav>
  </div>`);
});

app.listen(PORT, () => console.log(`✅ Running at http://localhost:${PORT}`));
