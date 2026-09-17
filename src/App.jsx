mimport React, { useState } from "react";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [business, setBusiness] = useState("");
  const [revenue, setRevenue] = useState("");
  const [orders, setOrders] = useState("");
  const [showResults, setShowResults] = useState(false);

  const detectLeaks = () => {
    if (!business || !revenue || !orders) {
      alert("Please enter all details.");
      return;
    }

    setShowResults(true);
  };

  if (!started) {
    return (
      <div className="app landing">
        <div className="hero">
          <div className="logo">LeakLeans</div>

          <h1>Find Where Your Revenue Is Leaking.</h1>

          <p>
            Detect missed revenue, unusual losses and hidden business leaks
            before they become bigger problems.
          </p>

          <button onClick={() => setStarted(true)}>
            Get Started →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app dashboard">
      <header>
        <div className="logo">LeakLeans</div>
        <button className="back" onClick={() => setStarted(false)}>
          ← Back
        </button>
      </header>

      <div className="container">
        <h1>Revenue Leak Detector</h1>

        <p className="subtitle">
          Enter your basic business numbers to start detecting possible leaks.
        </p>

        <div className="card">
          <label>Business Name</label>
          <input
            type="text"
            placeholder="Example: ABC Store"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
          />

          <label>Monthly Revenue (₹)</label>
          <input
            type="number"
            placeholder="Example: 500000"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />

          <label>Monthly Orders</label>
          <input
            type="number"
            placeholder="Example: 1000"
            value={orders}
            onChange={(e) => setOrders(e.target.value)}
          />

          <button onClick={detectLeaks}>
            Detect Revenue Leaks
          </button>
        </div>

        {showResults && (
          <div className="results">
            <h2>LeakLeans Analysis</h2>

            <div className="result-card">
              <span>Business</span>
              <strong>{business}</strong>
            </div>

            <div className="result-card">
              <span>Monthly Revenue</span>
              <strong>₹{Number(revenue).toLocaleString("en-IN")}</strong>
            </div>

            <div className="result-card">
              <span>Average Revenue / Order</span>
              <strong>
                ₹
                {Math.round(
                  Number(revenue) / Number(orders)
                ).toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="warning">
              ⚠️ Potential leak areas detected
              <p>
                LeakLeans can investigate discounts, refunds, unpaid orders,
                pricing gaps and other revenue-loss patterns.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;