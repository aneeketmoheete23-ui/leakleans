import React, { useState } from "react";
import "./App.css";
export default function App() {
  const [page, setPage] = useState("home");
  const [business, setBusiness] = useState("");
  const [revenue, setRevenue] = useState("");
  const [orders, setOrders] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  function startApp() {
    setPage("dashboard");
  }
  function goBack() {
    setPage("home");
    setAnalyzed(false);
  }
  function analyze() {
    if (!business || !revenue || !orders) {
      alert("Please fill in all three fields.");
      return;
    }
    setAnalyzed(true);
  }
  if (page === "home") {
    return (
      <main className="app landing">
        <section className="hero">
          <div className="logo">LeakLeans</div>
          <h1>Find Where Your Revenue Is Leaking.</h1>
          <p>
            Discover hidden revenue leaks and understand where your business
            may be losing money.
          </p>
          <button type="button" onClick={startApp}>
            Get Started →
          </button>
        </section>
      </main>
    );
  }
  return (
    <main className="app dashboard">
      <header className="topbar">
        <div className="logo">LeakLeans</div>
        <button type="button" className="backButton" onClick={goBack}>
          ← Back
        </button>
      </header>
      <section className="container">
        <h1>Revenue Leak Detector</h1>
        <p className="subtitle">
          Enter your business numbers to start your LeakLeans analysis.
        </p>
        <div className="card">
          <label htmlFor="business">Business Name</label>
          <input
            id="business"
            type="text"
            placeholder="Example: ABC Store"
            value={business}
            onChange={(event) => setBusiness(event.target.value)}
          />
          <label htmlFor="revenue">Monthly Revenue (₹)</label>
          <input
            id="revenue"
            type="number"
            placeholder="Example: 500000"
            value={revenue}
            onChange={(event) => setRevenue(event.target.value)}
          />
          <label htmlFor="orders">Monthly Orders</label>
          <input
            id="orders"
            type="number"
            placeholder="Example: 1000"
            value={orders}
            onChange={(event) => setOrders(event.target.value)}
          />
          <button type="button" onClick={analyze}>
            Detect Revenue Leaks
          </button>
        </div>
        {analyzed && (
          <div className="results">
            <h2>Analysis</h2>
            <div className="resultCard">
              <span>Business</span>
              <strong>{business}</strong>
            </div>
            <div className="resultCard">
              <span>Monthly Revenue</span>
              <strong>
                ₹{Number(revenue).toLocaleString("en-IN")}
              </strong>
            </div>
            <div className="resultCard">
              <span>Monthly Orders</span>
              <strong>{Number(orders).toLocaleString("en-IN")}</strong>
            </div>
            <div className="resultCard">
              <span>Average Revenue per Order</span>
              <strong>
                ₹
                {Math.round(
                  Number(revenue) / Number(orders)
                ).toLocaleString("en-IN")}
              </strong>
            </div>
            <div className="warning">
              <h3>⚠️ Potential Leak Areas</h3>
              <p>
                LeakLeans can investigate discounts, refunds, unpaid orders,
                pricing gaps and other patterns that may reduce revenue.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}