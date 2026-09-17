import React, { useState } from "react";
import "./App.css";

const leaks = [
  {
    type: "Follow-up Gap",
    icon: "💬",
    severity: "High",
    description:
      "18 customer enquiries received a response but had no follow-up within the expected time.",
    cause: "Lead handoff and follow-up process gap",
    impact: "₹36,000 potential revenue at risk",
    resolution:
      "Automatically assign unanswered enquiries to an available sales representative and create a follow-up task.",
  },
  {
    type: "Missed Call Opportunity",
    icon: "📞",
    severity: "Medium",
    description:
      "12 incoming customer calls were not followed by a callback.",
    cause: "Missed-call recovery process is not active",
    impact: "₹18,500 potential revenue at risk",
    resolution:
      "Create automatic callback tasks and notify the responsible sales representative.",
  },
  {
    type: "Response Delay",
    icon: "⏱️",
    severity: "Medium",
    description:
      "Several customer conversations received their first response after a long delay.",
    cause: "High workload during peak hours",
    impact: "₹12,800 potential opportunity impact",
    resolution:
      "Route high-intent enquiries to available team members during peak periods.",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [resolved, setResolved] = useState([]);

  const startApp = () => {
    setPage("dashboard");
  };

  const openLeak = (leak) => {
    setSelectedLeak(leak);
    setPage("leak");
  };

  const resolveLeak = (leak) => {
    if (!resolved.includes(leak.type)) {
      setResolved([...resolved, leak.type]);
    }

    setSelectedLeak(null);
    setPage("dashboard");
  };

  if (page === "home") {
    return (
      <main className="app landing">
        <div className="landingContent">
          <div className="brand">LeakLeans</div>

          <div className="badge">REVENUE LEAKAGE INTELLIGENCE</div>

          <h1>
            Find Where Your
            <br />
            <span>Revenue Is Leaking.</span>
          </h1>

          <p>
            LeakLeans connects business signals, finds hidden revenue
            leakage, explains why it is happening and helps your team fix it.
          </p>

          <button type="button" onClick={startApp}>
            Start Detecting →
          </button>

          <div className="landingFeatures">
            <div>📞 Calls</div>
            <div>💬 Chats</div>
            <div>✉️ Messages</div>
            <div>👥 Workflows</div>
            <div>⏱️ Activity</div>
            <div>🛒 Sales</div>
          </div>
        </div>
      </main>
    );
  }

  if (page === "leak" && selectedLeak) {
    return (
      <main className="app">
        <header className="topbar">
          <div className="brand">LeakLeans</div>

          <button
            type="button"
            className="secondaryButton"
            onClick={() => setPage("dashboard")}
          >
            ← Dashboard
          </button>
        </header>

        <section className="container">
          <div className="pageLabel">LEAK INVESTIGATION</div>

          <h1>{selectedLeak.icon} {selectedLeak.type}</h1>

          <div className="investigationGrid">
            <div className="mainCard">
              <div className="severity">
                {selectedLeak.severity} Priority
              </div>

              <h2>What LeakLeans found</h2>

              <p>{selectedLeak.description}</p>

              <div className="detailBlock">
                <span>PROBABLE CAUSE</span>
                <strong>{selectedLeak.cause}</strong>
              </div>

              <div className="detailBlock">
                <span>BUSINESS IMPACT</span>
                <strong>{selectedLeak.impact}</strong>
              </div>

              <div className="detailBlock">
                <span>RECOMMENDED RESOLUTION</span>
                <strong>{selectedLeak.resolution}</strong>
              </div>

              <button
                type="button"
                onClick={() => resolveLeak(selectedLeak)}
              >
                Resolve This Leak →
              </button>
            </div>

            <div className="agentCard">
              <div className="agentIcon">✦</div>

              <h2>LeakLeans Intelligence</h2>

              <p>
                The system connected activity signals and identified a
                pattern that may be affecting revenue.
              </p>

              <div className="signal">
                <span>Signal</span>
                <strong>Detected</strong>
              </div>

              <div className="signal">
                <span>Cause</span>
                <strong>Identified</strong>
              </div>

              <div className="signal">
                <span>Resolution</span>
                <strong>Ready</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">LeakLeans</div>

        <div className="status">
          <span></span> System Monitoring
        </div>
      </header>

      <section className="container">
        <div className="dashboardHeading">
          <div>
            <div className="pageLabel">REVENUE INTELLIGENCE</div>
            <h1>Good morning 👋</h1>
            <p>
              LeakLeans is monitoring your business signals for potential
              revenue leakage.
            </p>
          </div>

          <button
            type="button"
            className="secondaryButton"
            onClick={() => setPage("home")}
          >
            ← Home
          </button>
        </div>

        <div className="metrics">
          <div className="metricCard">
            <span>ACTIVE LEAKS</span>
            <strong>{leaks.length - resolved.length}</strong>
            <small>Requires attention</small>
          </div>

          <div className="metricCard">
            <span>REVENUE AT RISK</span>
            <strong>₹67.3K</strong>
            <small>Estimated opportunity</small>
          </div>

          <div className="metricCard">
            <span>RESOLVED</span>
            <strong>{resolved.length}</strong>
            <small>Leaks addressed</small>
          </div>

          <div className="metricCard">
            <span>SIGNALS MONITORED</span>
            <strong>6</strong>
            <small>Business sources</small>
          </div>
        </div>

        <div className="sectionHeader">
          <div>
            <h2>Detected Revenue Leaks</h2>
            <p>Patterns that may be affecting your revenue.</p>
          </div>
        </div>

        <div className="leakList">
          {leaks.map((leak) => {
            const isResolved = resolved.includes(leak.type);

            return (
              <div className="leakCard" key={leak.type}>
                <div className="leakIcon">{leak.icon}</div>

                <div className="leakInfo">
                  <div className="leakTitle">
                    <h3>{leak.type}</h3>

                    {isResolved ? (
                      <span className="resolved">Resolved</span>
                    ) : (
                      <span className="active">Active</span>
                    )}
                  </div>

                  <p>{leak.description}</p>

                  <div className="leakImpact">
                    {leak.impact}
                  </div>
                </div>

                <button
                  type="button"
                  className="viewButton"
                  onClick={() => openLeak(leak)}
                >
                  {isResolved ? "View" : "Investigate"} →
                </button>
              </div>
            );
          })}
        </div>

        <div className="bottomCard">
          <div>
            <div className="agentIcon small">✦</div>
            <h2>More signals can be connected</h2>
            <p>
              Connect calls, chats, CRM, sales and workflow data to give
              LeakLeans more context when detecting revenue leakage.
            </p>
          </div>

          <button type="button" className="secondaryButton">
            Connect Sources
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;