import React, { useState } from "react";

const systems = [
  { name: "Salesforce", type: "salesforce", description: "CRM & customer activity" },
  { name: "Genesys", type: "genesys", description: "Calls & customer interactions" },
  { name: "Avaya", type: "avaya", description: "Voice & contact center" },
  { name: "WhatsApp", type: "whatsapp", description: "Customer conversations" },
  { name: "Email", type: "email", description: "Email communication" },
  { name: "Helpdesk", type: "helpdesk", description: "Support tickets" },
  { name: "Other CRM", type: "crm", description: "CRM & customer data" },
  { name: "Sales & Orders", type: "orders", description: "Sales and order activity" },
];

const leaks = [
  {
    title: "Follow-up Failure",
    severity: "High",
    value: "₹1.84L",
    sources: "Salesforce + Genesys",
    cause: "Lead was contacted but no follow-up happened within the expected window.",
    impact: "Potential customer conversion was lost because the lead remained unattended.",
    resolution: "Automatically assign the follow-up to the responsible sales representative and notify the team.",
  },
  {
    title: "Response Delay",
    severity: "Medium",
    value: "₹72K",
    sources: "WhatsApp + CRM",
    cause: "Customer enquiry remained unanswered for several hours.",
    impact: "Delayed response increased the chance of the customer moving to another provider.",
    resolution: "Trigger an immediate notification and create a follow-up task.",
  },
  {
    title: "Missed Call Opportunity",
    severity: "High",
    value: "₹1.21L",
    sources: "Genesys + CRM",
    cause: "Incoming customer call was not followed by a sales action.",
    impact: "A high-value customer opportunity may have been lost.",
    resolution: "Create an automatic callback task and alert the assigned sales team.",
  },
];

function BrandLogo({ type }) {
  if (type === "salesforce") {
    return (
      <div className="brand-logo salesforce-logo">
        <span>☁</span>
      </div>
    );
  }

  if (type === "whatsapp") {
    return (
      <div className="brand-logo whatsapp-logo">
        <span>◉</span>
      </div>
    );
  }

  if (type === "genesys") {
    return (
      <div className="brand-logo genesys-logo">
        <span>G</span>
      </div>
    );
  }

  if (type === "avaya") {
    return (
      <div className="brand-logo avaya-logo">
        <span>A</span>
      </div>
    );
  }

  if (type === "email") {
    return (
      <div className="brand-logo email-logo">
        <span>✉</span>
      </div>
    );
  }

  if (type === "helpdesk") {
    return (
      <div className="brand-logo helpdesk-logo">
        <span>?</span>
      </div>
    );
  }

  if (type === "crm") {
    return (
      <div className="brand-logo generic-logo">
        <span>CRM</span>
      </div>
    );
  }

  return (
    <div className="brand-logo generic-logo">
      <span>SO</span>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [connected, setConnected] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [connectionStep, setConnectionStep] = useState("intro");
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [resolved, setResolved] = useState(false);

  const openConnection = (system) => {
    setSelectedSystem(system);
    setConnectionStep("intro");
  };

  const closeConnection = () => {
    setSelectedSystem(null);
    setConnectionStep("intro");
  };

  const completeConnection = () => {
    if (!connected.includes(selectedSystem.name)) {
      setConnected([...connected, selectedSystem.name]);
    }

    setConnectionStep("success");
  };

  if (page === "home") {
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
            Connect Systems
          </button>
        </header>

        <main className="hero">
          <div className="hero-badge">
            REVENUE LEAKAGE INTELLIGENCE
          </div>

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
              Connect Your Systems →
            </button>

            <button
              className="secondary-button"
              onClick={() => setPage("dashboard")}
            >
              View Demo
            </button>
          </div>

          <div className="hero-flow">
            <div className="flow-box">
              <small>YOUR SYSTEMS</small>
              <strong>CRM · Calls · Chats · Sales</strong>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-box active-flow">
              <small>LEAKLEANS</small>
              <strong>Detect Revenue Leakage</strong>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-box">
              <small>BUSINESS IMPACT</small>
              <strong>Recover Lost Revenue</strong>
            </div>
          </div>

          <footer className="landing-footer">
            <div className="footer-brand">
              <span className="logo-mark">L</span>
              <strong>LeakLeans</strong>
            </div>

            <div className="footer-details">
              <div>
                <span>FOUNDER</span>
                <strong>ANIKET MOHITE</strong>
              </div>

              <div>
                <span>CONTACT US</span>
                <a href="tel:8698382024">8698382024</a>
              </div>

              <div>
                <span>EMAIL</span>
                <a href="mailto:Aniket.Mohite@supportleaklens.com">
                  Aniket.Mohite@supportleaklens.com
                </a>
              </div>
            </div>

            <div className="footer-bottom">
              © 2026 LeakLeans. Revenue Leakage Intelligence.
            </div>
          </footer>
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

          <button
            className="nav-button"
            onClick={() => setPage("home")}
          >
            ← Home
          </button>
        </header>

        <main className="page-container">
          <div className="page-heading">
            <div className="hero-badge">
              STEP 1 · CONNECT YOUR DATA
            </div>

            <h2>Connect Your Existing Systems</h2>

            <p>
              LeakLeans works on top of the systems your business
              already uses. Connect your systems so LeakLeans can
              identify revenue leakage across workflows.
            </p>
          </div>

          <div className="system-grid">
            {systems.map((system) => {
              const isConnected = connected.includes(system.name);

              return (
                <div className="system-card" key={system.name}>
                  <BrandLogo type={system.type} />

                  <div className="system-info">
                    <h3>{system.name}</h3>
                    <p>{system.description}</p>
                  </div>

                  <button
                    className={
                      isConnected
                        ? "connected-button"
                        : "connect-button"
                    }
                    onClick={() =>
                      !isConnected && openConnection(system)
                    }
                  >
                    {isConnected ? "Connected ✓" : "Connect"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="bottom-actions">
            <button
              className="secondary-button"
              onClick={() => setPage("home")}
            >
              Back
            </button>

            <button
              className="primary-button"
              onClick={() => setPage("dashboard")}
            >
              Continue to Leak Detection →
            </button>
          </div>
        </main>

        {selectedSystem && (
          <div className="modal-overlay">
            <div className="connection-modal">
              {connectionStep === "intro" && (
                <>
                  <BrandLogo type={selectedSystem.type} />

                  <h2>Connect {selectedSystem.name}</h2>

                  <p>
                    LeakLeans needs permission to access relevant
                    business activity from {selectedSystem.name}.
                  </p>

                  <div className="permission-box">
                    <div>✓ Read customer activity</div>
                    <div>✓ Read interaction history</div>
                    <div>✓ Analyze workflow signals</div>
                  </div>

                  <button
                    className="primary-button full-button"
                    onClick={() => setConnectionStep("authorization")}
                  >
                    Continue to Authorization →
                  </button>

                  <button
                    className="text-button"
                    onClick={closeConnection}
                  >
                    Cancel
                  </button>
                </>
              )}

              {connectionStep === "authorization" && (
                <>
                  <div className="modal-step">AUTHORIZATION</div>

                  <h2>Authorize LeakLeans</h2>

                  <p>
                    Review the permissions LeakLeans will use to
                    analyze your business workflows.
                  </p>

                  <div className="authorization-list">
                    <div>
                      <span>Customer activity</span>
                      <strong>Read</strong>
                    </div>

                    <div>
                      <span>Interaction history</span>
                      <strong>Read</strong>
                    </div>

                    <div>
                      <span>Workflow signals</span>
                      <strong>Analyze</strong>
                    </div>
                  </div>

                  <button
                    className="primary-button full-button"
                    onClick={completeConnection}
                  >
                    Connect & Continue
                  </button>

                  <button
                    className="text-button"
                    onClick={() => setConnectionStep("intro")}
                  >
                    ← Back
                  </button>
                </>
              )}

              {connectionStep === "success" && (
                <>
                  <div className="success-icon">✓</div>

                  <h2>{selectedSystem.name} Connected</h2>

                  <p>
                    Connection established successfully.
                  </p>

                  <div className="success-message">
                    LeakLeans can now use this source as part of
                    revenue leakage analysis.
                  </div>

                  <button
                    className="primary-button full-button"
                    onClick={closeConnection}
                  >
                    Done
                  </button>

                  <small className="demo-note">
                    Demo environment: actual OAuth/API integration
                    will be added in the production integration phase.
                  </small>
                </>
              )}
            </div>
          </div>
        )}
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
            Systems
          </button>
        </header>

        <main className="page-container">
          <div className="dashboard-heading">
            <div>
              <div className="hero-badge">
                REVENUE LEAKAGE INTELLIGENCE
              </div>

              <h2>Leak Detection Overview</h2>

              <p>
                Signals detected across your connected business systems.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setPage("connect")}
            >
              + Connect System
            </button>
          </div>

          <div className="metric-grid">
            <div className="metric-card">
              <span>Potential Leakage</span>
              <strong>₹3.77L</strong>
              <small>Detected this period</small>
            </div>

            <div className="metric-card">
              <span>Active Leaks</span>
              <strong>3</strong>
              <small>Require investigation</small>
            </div>

            <div className="metric-card">
              <span>Connected Sources</span>
              <strong>{connected.length || 4}</strong>
              <small>Business systems</small>
            </div>

            <div className="metric-card">
              <span>Signals Analyzed</span>
              <strong>12,482</strong>
              <small>Across workflows</small>
            </div>
          </div>

          <div className="section-header">
            <div>
              <h3>Potential Revenue Leaks</h3>
              <p>
                Issues identified from activity patterns across systems.
              </p>
            </div>
          </div>

          <div className="leak-list">
            {leaks.map((leak, index) => (
              <div className="leak-card" key={leak.title}>
                <div className="leak-number">
                  0{index + 1}
                </div>

                <div className="leak-main">
                  <div className="leak-title-row">
                    <h3>{leak.title}</h3>

                    <span
                      className={`severity ${leak.severity.toLowerCase()}`}
                    >
                      {leak.severity}
                    </span>
                  </div>

                  <p>{leak.sources}</p>
                </div>

                <div className="leak-value">
                  <strong>{leak.value}</strong>
                  <small>potential impact</small>
                </div>

                <button
                  className="investigate-button"
                  onClick={() => {
                    setSelectedLeak(leak);
                    setResolved(false);
                    setPage("investigate");
                  }}
                >
                  Investigate →
                </button>
              </div>
            ))}
          </div>

          <div className="monitoring-card">
            <div>
              <div className="status-dot"></div>
              <div>
                <strong>LeakLeans monitoring is active</strong>
                <p>
                  Continuously analyzing signals across connected
                  workflows.
                </p>
              </div>
            </div>

            <span className="live-label">LIVE</span>
          </div>
        </main>
      </div>
    );
  }

  if (page === "investigate" && selectedLeak) {
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

        <main className="page-container investigation-page">
          <div className="investigation-top">
            <div>
              <div className="hero-badge">
                INVESTIGATION
              </div>

              <h2>{selectedLeak.title}</h2>

              <p>
                LeakLeans identified a possible revenue leakage
                pattern across connected systems.
              </p>
            </div>

            <span
              className={`severity large ${selectedLeak.severity.toLowerCase()}`}
            >
              {selectedLeak.severity} Priority
            </span>
          </div>

          <div className="investigation-value">
            <span>Potential Business Impact</span>
            <strong>{selectedLeak.value}</strong>
          </div>

          <div className="investigation-grid">
            <div className="investigation-card">
              <span>PROBABLE CAUSE</span>
              <h3>Why did this happen?</h3>
              <p>{selectedLeak.cause}</p>
            </div>

            <div className="investigation-card">
              <span>BUSINESS IMPACT</span>
              <h3>What could be lost?</h3>
              <p>{selectedLeak.impact}</p>
            </div>

            <div className="investigation-card">
              <span>RECOMMENDED RESOLUTION</span>
              <h3>What should happen next?</h3>
              <p>{selectedLeak.resolution}</p>
            </div>
          </div>

          <div className="action-card">
            <div>
              <span>ACTION</span>
              <h3>Resolve this revenue leak</h3>
              <p>
                Create the required workflow action and notify the
                responsible team.
              </p>
            </div>

            {resolved ? (
              <div className="resolved-status">
                ✓ Leak Resolution Initiated
              </div>
            ) : (
              <button
                className="primary-button"
                onClick={() => setResolved(true)}
              >
                Resolve Leak →
              </button>
            )}
          </div>

          <div className="process-flow">
            <div className="process-step active">
              <strong>1</strong>
              <span>Detect</span>
            </div>

            <div className="process-line"></div>

            <div className="process-step active">
              <strong>2</strong>
              <span>Investigate</span>
            </div>

            <div className="process-line"></div>

            <div className="process-step active">
              <strong>3</strong>
              <span>Explain</span>
            </div>

            <div className="process-line"></div>

            <div className="process-step">
              <strong>4</strong>
              <span>Resolve</span>
            </div>

            <div className="process-line"></div>

            <div className="process-step">
              <strong>5</strong>
              <span>Prevent</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}

export default App;