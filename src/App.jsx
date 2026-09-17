import React, { useState } from "react";
import "./App.css";

const systems = [
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Leads, opportunities, accounts and sales activity",
    icon: "S",
  },
  {
    id: "genesys",
    name: "Genesys",
    category: "Contact Center",
    description: "Calls, interactions, queues and agent activity",
    icon: "G",
  },
  {
    id: "avaya",
    name: "Avaya",
    category: "Contact Center",
    description: "Customer calls, agent activity and interactions",
    icon: "A",
  },
  {
    id: "crm",
    name: "Other CRM",
    category: "CRM",
    description: "Connect your existing CRM system",
    icon: "C",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "Communication",
    description: "Customer messages and conversations",
    icon: "W",
  },
  {
    id: "email",
    name: "Email",
    category: "Communication",
    description: "Customer emails and response activity",
    icon: "E",
  },
  {
    id: "helpdesk",
    name: "Helpdesk",
    category: "Support",
    description: "Tickets, complaints and support activity",
    icon: "H",
  },
  {
    id: "orders",
    name: "Sales & Orders",
    category: "Business Data",
    description: "Orders, quotes and transaction activity",
    icon: "O",
  },
];

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    severity: "High",
    value: "₹1.84L",
    source: "Salesforce + Genesys",
    description:
      "A customer enquiry was followed by a sales call and quote, but no follow-up activity was detected.",
    cause: "Possible workflow handoff gap",
    action: "Automatically assign the follow-up and notify the responsible team.",
  },
  {
    id: 2,
    title: "Response Delay",
    severity: "Medium",
    value: "₹72K",
    source: "WhatsApp + CRM",
    description:
      "Multiple customer messages remained unanswered beyond the expected response window.",
    cause: "Possible response ownership gap",
    action: "Route unanswered conversations to the available sales team.",
  },
  {
    id: 3,
    title: "Missed Call Opportunity",
    severity: "High",
    value: "₹1.21L",
    source: "Genesys + CRM",
    description:
      "A high-value customer call was missed and no subsequent callback was detected.",
    cause: "Possible callback process failure",
    action: "Create a callback task and notify the assigned agent.",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [connected, setConnected] = useState([]);
  const [monitoring, setMonitoring] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [resolved, setResolved] = useState(false);

  const connectSystem = (id) => {
    if (!connected.includes(id)) {
      setConnected([...connected, id]);
    }
  };

  const startMonitoring = () => {
    if (connected.length > 0) {
      setMonitoring(true);
      setPage("dashboard");
    }
  };

  const openLeak = (leak) => {
    setSelectedLeak(leak);
    setResolved(false);
    setPage("leak");
  };

  if (page === "home") {
    return (
      <div className="app">
        <header className="topbar">
          <div className="logo">
            <span className="logo-mark">L</span>
            <span>LeakLeans</span>
          </div>

          <button className="nav-button" onClick={() => setPage("connect")}>
            Connect Systems
          </button>
        </header>

        <main className="hero">
          <div className="hero-badge">REVENUE LEAKAGE INTELLIGENCE</div>

          <h1>
            Find Where Your
            <span> Revenue Is Leaking.</span>
          </h1>

          <p className="hero-text">
            LeakLeans connects to the systems your business already uses,
            analyzes activity across them, and finds revenue leakage hiding
            between workflows.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => setPage("connect")}
            >
              Connect Your Systems
              <span>→</span>
            </button>

            <button
              className="secondary-button"
              onClick={() => setPage("dashboard")}
            >
              View Demo
            </button>
          </div>

          <div className="hero-flow">
            <div className="flow-card">
              <strong>Your Systems</strong>
              <small>CRM • Calls • Chats • Sales</small>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-card highlight">
              <strong>LeakLeans</strong>
              <small>Detect • Explain • Resolve</small>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-card">
              <strong>Business Impact</strong>
              <small>Recover • Prevent • Measure</small>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (page === "connect") {
    return (
      <div className="app">
        <header className="topbar">
          <div className="logo" onClick={() => setPage("home")}>
            <span className="logo-mark">L</span>
            <span>LeakLeans</span>
          </div>

          <button className="nav-button" onClick={() => setPage("home")}>
            ← Home
          </button>
        </header>

        <main className="connect-page">
          <div className="page-heading">
            <div className="hero-badge">STEP 1</div>
            <h2>Connect Your Existing Systems</h2>
            <p>
              LeakLeans works as an intelligence layer on top of your existing
              business systems. Select the systems you want to monitor.
            </p>
          </div>

          <div className="connection-status">
            <div>
              <span className="status-dot"></span>
              {connected.length} system{connected.length !== 1 ? "s" : ""}{" "}
              connected
            </div>

            {monitoring && <span className="monitoring-label">Monitoring</span>}
          </div>

          <div className="systems-grid">
            {systems.map((system) => {
              const isConnected = connected.includes(system.id);

              return (
                <div
                  className={`system-card ${
                    isConnected ? "system-connected" : ""
                  }`}
                  key={system.id}
                >
                  <div className="system-top">
                    <div className="system-icon">{system.icon}</div>

                    <div>
                      <h3>{system.name}</h3>
                      <span>{system.category}</span>
                    </div>
                  </div>

                  <p>{system.description}</p>

                  <button
                    className={
                      isConnected
                        ? "connected-button"
                        : "connect-button"
                    }
                    onClick={() => connectSystem(system.id)}
                  >
                    {isConnected ? "✓ Connected" : "Connect"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="monitor-card">
            <div>
              <span className="monitor-label">NEXT STEP</span>
              <h3>Start Revenue Leakage Monitoring</h3>
              <p>
                Once your systems are connected, LeakLeans can begin analyzing
                cross-system signals.
              </p>
            </div>

            <button
              className="primary-button"
              disabled={connected.length === 0}
              onClick={startMonitoring}
            >
              Start Monitoring →
            </button>
          </div>

          <div className="demo-note">
            <strong>MVP demo:</strong> Connections are currently simulated.
            Real Salesforce, Genesys, Avaya and other API/OAuth integrations
            will be added during the integration phase.
          </div>
        </main>
      </div>
    );
  }

  if (page === "dashboard") {
    return (
      <div className="app">
        <header className="topbar">
          <div className="logo" onClick={() => setPage("home")}>
            <span className="logo-mark">L</span>
            <span>LeakLeans</span>
          </div>

          <button
            className="nav-button"
            onClick={() => setPage("connect")}
          >
            Manage Connections
          </button>
        </header>

        <main className="dashboard">
          <div className="dashboard-heading">
            <div>
              <div className="hero-badge">REVENUE INTELLIGENCE</div>
              <h2>Leak Detection Center</h2>
              <p>
                LeakLeans is analyzing signals across your connected systems.
              </p>
            </div>

            <div className="live-status">
              <span className="status-dot"></span>
              Live Monitoring
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span>ACTIVE LEAKS</span>
              <strong>3</strong>
              <small>Potential issues detected</small>
            </div>

            <div className="metric-card">
              <span>REVENUE AT RISK</span>
              <strong>₹3.77L</strong>
              <small>Estimated opportunity value</small>
            </div>

            <div className="metric-card">
              <span>SIGNALS ANALYZED</span>
              <strong>18,492</strong>
              <small>Across connected systems</small>
            </div>

            <div className="metric-card">
              <span>CONNECTED SYSTEMS</span>
              <strong>{connected.length || 4}</strong>
              <small>Data sources monitored</small>
            </div>
          </div>

          <section className="section">
            <div className="section-heading">
              <div>
                <span className="section-label">DETECTED</span>
                <h3>Potential Revenue Leaks</h3>
              </div>

              <span className="count-badge">{leaks.length} detected</span>
            </div>

            <div className="leaks-list">
              {leaks.map((leak) => (
                <div className="leak-card" key={leak.id}>
                  <div className="leak-main">
                    <div className="severity">
                      <span className={`severity-dot ${leak.severity.toLowerCase()}`}></span>
                      {leak.severity}
                    </div>

                    <h3>{leak.title}</h3>
                    <p>{leak.description}</p>

                    <div className="source-tag">
                      Data: {leak.source}
                    </div>
                  </div>

                  <div className="leak-side">
                    <strong>{leak.value}</strong>
                    <span>Potential impact</span>

                    <button
                      className="view-button"
                      onClick={() => openLeak(leak)}
                    >
                      Investigate →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="signal-panel">
            <div>
              <span className="section-label">CROSS-SYSTEM ANALYSIS</span>
              <h3>LeakLeans is connecting the dots.</h3>
              <p>
                Instead of looking at one system alone, LeakLeans compares
                customer activity across CRM, calls, messages, sales and
                support workflows.
              </p>
            </div>

            <div className="signal-chain">
              <span>Lead</span>
              <b>→</b>
              <span>Call</span>
              <b>→</b>
              <span>Quote</span>
              <b>→</b>
              <span className="missing">No Follow-up</span>
              <b>→</b>
              <span className="leak-result">Potential Leak</span>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (page === "leak" && selectedLeak) {
    return (
      <div className="app">
        <header className="topbar">
          <div className="logo" onClick={() => setPage("home")}>
            <span className="logo-mark">L</span>
            <span>LeakLeans</span>
          </div>

          <button
            className="nav-button"
            onClick={() => setPage("dashboard")}
          >
            ← Dashboard
          </button>
        </header>

        <main className="investigation">
          <button
            className="back-link"
            onClick={() => setPage("dashboard")}
          >
            ← Back to detected leaks
          </button>

          <div className="investigation-header">
            <div>
              <div className="severity large">
                <span
                  className={`severity-dot ${selectedLeak.severity.toLowerCase()}`}
                ></span>
                {selectedLeak.severity} Priority
              </div>

              <h2>{selectedLeak.title}</h2>

              <p>{selectedLeak.description}</p>
            </div>

            <div className="impact-box">
              <span>Potential Revenue Impact</span>
              <strong>{selectedLeak.value}</strong>
            </div>
          </div>

          <div className="evidence-section">
            <span className="section-label">EVIDENCE CHAIN</span>
            <h3>What LeakLeans found</h3>

            <div className="evidence-chain">
              <div className="evidence-item">
                <span>01</span>
                <div>
                  <strong>Customer enquiry detected</strong>
                  <small>CRM activity</small>
                </div>
              </div>

              <div className="chain-line"></div>

              <div className="evidence-item">
                <span>02</span>
                <div>
                  <strong>Customer interaction detected</strong>
                  <small>{selectedLeak.source}</small>
                </div>
              </div>

              <div className="chain-line"></div>

              <div className="evidence-item warning">
                <span>03</span>
                <div>
                  <strong>Expected next action missing</strong>
                  <small>Workflow signal</small>
                </div>
              </div>
            </div>
          </div>

          <div className="analysis-grid">
            <div className="analysis-card">
              <span>PROBABLE CAUSE</span>
              <h3>{selectedLeak.cause}</h3>
              <p>
                LeakLeans detected a pattern where the expected business
                process did not continue after the customer interaction.
              </p>
            </div>

            <div className="analysis-card">
              <span>RECOMMENDED RESOLUTION</span>
              <h3>{selectedLeak.action}</h3>
              <p>
                The recommended action can later be executed through an
                integration, workflow or AI agent.
              </p>
            </div>
          </div>

          <div className="resolve-panel">
            {resolved ? (
              <>
                <div className="resolved-icon">✓</div>
                <div>
                  <strong>Leak marked as resolved</strong>
                  <p>
                    LeakLeans will continue monitoring this workflow for
                    similar patterns.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="section-label">ACTION</span>
                  <h3>Resolve this revenue leak</h3>
                  <p>
                    This is a demo action. In production, LeakLeans can
                    trigger approved workflows or notify the responsible team.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setResolved(true)}
                >
                  Resolve Leak →
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  return null;
}

export default App;