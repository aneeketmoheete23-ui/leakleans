import React, { useState } from "react";
import "./App.css";

const integrations = [
  {
    id: "salesforce",
    name: "Salesforce",
    type: "CRM",
    description: "Leads, opportunities, customers and sales activity",
    logo: "https://cdn.simpleicons.org/salesforce",
  },
  {
    id: "genesys",
    name: "Genesys",
    type: "Contact Center",
    description: "Calls, interactions and customer journeys",
    logo: "https://cdn.simpleicons.org/genesys",
  },
  {
    id: "avaya",
    name: "Avaya",
    type: "Voice",
    description: "Voice and contact-center activity",
    logo: "https://cdn.simpleicons.org/avaya",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    type: "Messaging",
    description: "Customer conversations and enquiries",
    logo: "https://cdn.simpleicons.org/whatsapp",
  },
  {
    id: "gmail",
    name: "Gmail",
    type: "Email",
    description: "Customer and sales email activity",
    logo: "https://cdn.simpleicons.org/gmail",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    type: "Support",
    description: "Tickets, conversations and support activity",
    logo: "https://cdn.simpleicons.org/zendesk",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    type: "CRM",
    description: "Contacts, deals and customer activity",
    logo: "https://cdn.simpleicons.org/hubspot",
  },
];

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    severity: "HIGH",
    value: "₹1,84,000",
    source: "Salesforce + Genesys",
    cause: "Sales handoff gap",
    description:
      "A high-value customer enquiry was completed through the contact center but no follow-up activity was detected in the CRM.",
    impact:
      "The opportunity may be lost because the customer did not receive the expected follow-up.",
    action:
      "Assign the opportunity automatically and create a follow-up task for the responsible representative.",
  },
  {
    id: 2,
    title: "Missed Call Opportunity",
    severity: "HIGH",
    value: "₹1,21,000",
    source: "Genesys + CRM",
    cause: "Missed-call workflow gap",
    description:
      "Customer calls were detected without a corresponding sales action.",
    impact:
      "High-intent customers may leave before entering the sales process.",
    action:
      "Create a CRM task and notify the responsible sales representative.",
  },
  {
    id: 3,
    title: "Response Delay",
    severity: "MEDIUM",
    value: "₹72,000",
    source: "WhatsApp + CRM",
    cause: "Unassigned enquiry",
    description:
      "Several customer messages remained without an appropriate response.",
    impact:
      "Delayed responses can reduce conversion opportunities.",
    action:
      "Route unattended conversations to the next available representative.",
  },
  {
    id: 4,
    title: "Unresolved Support Pattern",
    severity: "MEDIUM",
    value: "₹48,000",
    source: "Zendesk + CRM",
    cause: "Support-to-revenue visibility gap",
    description:
      "Repeated support issues were detected for customers with active commercial relationships.",
    impact:
      "Unresolved issues can affect retention and expansion opportunities.",
    action:
      "Create a customer-risk signal and notify the account owner.",
  },
];

function BrandLogo({ item }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="logo-fallback">
        {item.name.substring(0, 1)}
      </div>
    );
  }

  return (
    <div className="integration-logo">
      <img
        src={item.logo}
        alt={item.name}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [connected, setConnected] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [resolved, setResolved] = useState([]);

  const connect = () => {
    if (!selectedIntegration) return;

    if (!connected.includes(selectedIntegration.id)) {
      setConnected([...connected, selectedIntegration.id]);
    }

    setSelectedIntegration(null);
  };

  const resolveLeak = (id) => {
    if (!resolved.includes(id)) {
      setResolved([...resolved, id]);
    }

    setSelectedLeak(null);
  };

  if (page === "home") {
    return (
      <div className="landing">
        <header className="landing-header">
          <div
            className="brand"
            onClick={() => setPage("home")}
          >
            <div className="brand-symbol">L</div>

            <div>
              <strong>LeakLeans</strong>
              <span>Revenue Intelligence</span>
            </div>
          </div>

          <div className="founder-details">
            <div className="founder-item">
              <small>FOUNDER</small>
              <strong>ANIKET MOHITE</strong>
            </div>

            <div className="founder-item">
              <small>CONTACT US</small>
              <a href="tel:8698382024">
                8698382024
              </a>
            </div>

            <div className="founder-item">
              <small>EMAIL</small>
              <a href="mailto:Aniket.Mohite@supportleaklens.com">
                Aniket.Mohite@supportleaklens.com
              </a>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="login-button"
              onClick={() => setPage("login")}
            >
              Login
            </button>

            <button
              className="start-button"
              onClick={() => setPage("dashboard")}
            >
              Start Free
            </button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-badge">
            <span></span>
            REVENUE LEAKAGE INTELLIGENCE
          </div>

          <h1>
            Find where your
            <br />
            <em>revenue is leaking.</em>
          </h1>

          <p>
            LeakLeans connects with the systems your business
            already uses and identifies hidden revenue leakage
            across sales, calls, conversations and support.
          </p>

          <div className="hero-actions">
            <button
              className="hero-main-button"
              onClick={() => setPage("dashboard")}
            >
              Start Detecting
              <span>→</span>
            </button>

            <button
              className="hero-outline-button"
              onClick={() => setPage("integrations")}
            >
              Explore Integrations
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>8+</strong>
              <span>Data sources</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Leak monitoring</span>
            </div>

            <div>
              <strong>₹4.25L</strong>
              <span>Demo value detected</span>
            </div>
          </div>
        </section>

        <section className="integration-preview">
          <div className="section-kicker">
            WORKS WITH YOUR EXISTING SYSTEMS
          </div>

          <div className="preview-logos">
            {integrations.map((item) => (
              <div className="preview-logo" key={item.id}>
                <BrandLogo item={item} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="how-section">
          <div className="section-kicker">
            HOW LEAKLEANS WORKS
          </div>

          <h2>
            From disconnected signals
            <br />
            to revenue intelligence.
          </h2>

          <div className="process-grid">
            <div>
              <span>01</span>
              <h3>Connect</h3>
              <p>
                Connect CRM, calls, messaging, email,
                support and sales systems.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Detect</h3>
              <p>
                LeakLeans identifies unusual gaps,
                delays and missed opportunities.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Investigate</h3>
              <p>
                Understand what happened and why the
                revenue opportunity is at risk.
              </p>
            </div>

            <div>
              <span>04</span>
              <h3>Resolve</h3>
              <p>
                Recommend or execute the next action
                and measure the result.
              </p>
            </div>
          </div>
        </section>

        <footer className="landing-footer">
          <div>
            <strong>LeakLeans</strong>
            <span>Revenue Intelligence System</span>
          </div>

          <div>
            <strong>ANIKET MOHITE</strong>
            <span>Founder</span>
          </div>

          <div>
            <a href="tel:8698382024">
              8698382024
            </a>
            <a href="mailto:Aniket.Mohite@supportleaklens.com">
              Aniket.Mohite@supportleaklens.com
            </a>
          </div>
        </footer>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <button
            className="back-link"
            onClick={() => setPage("home")}
          >
            ← Back to LeakLeans
          </button>

          <div className="auth-brand">
            <div className="brand-symbol">L</div>
            <strong>LeakLeans</strong>
          </div>

          <h1>Welcome back</h1>

          <p>
            Sign in to your revenue intelligence workspace.
          </p>

          <input
            type="email"
            placeholder="Work email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button
            className="auth-button"
            onClick={() => setPage("dashboard")}
          >
            Login →
          </button>

          <small>
            Demo authentication is currently enabled.
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div
          className="sidebar-brand"
          onClick={() => setPage("dashboard")}
        >
          <div className="brand-symbol small">L</div>

          <div>
            <strong>LeakLeans</strong>
            <span>Revenue Intelligence</span>
          </div>
        </div>

        <div className="workspace">
          <small>WORKSPACE</small>
          <strong>Demo Company</strong>
        </div>

        <nav>
          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            <span>⌂</span>
            Overview
          </button>

          <button
            className={page === "leaks" ? "active" : ""}
            onClick={() => setPage("leaks")}
          >
            <span>◈</span>
            Revenue Leaks
            <b>{leaks.length - resolved.length}</b>
          </button>

          <button
            className={page === "integrations" ? "active" : ""}
            onClick={() => setPage("integrations")}
          >
            <span>◎</span>
            Integrations
            <b>{connected.length}</b>
          </button>

          <button
            className={page === "analytics" ? "active" : ""}
            onClick={() => setPage("analytics")}
          >
            <span>◒</span>
            Analytics
          </button>

          <button
            className={page === "actions" ? "active" : ""}
            onClick={() => setPage("actions")}
          >
            <span>↗</span>
            Actions
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button onClick={() => setPage("team")}>
            <span>◉</span>
            Team
          </button>

          <button onClick={() => setPage("settings")}>
            <span>⚙</span>
            Settings
          </button>

          <div className="account">
            <div className="avatar">AM</div>

            <div>
              <strong>Aniket Mohite</strong>
              <span>Founder</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="dashboard-header">
          <div>
            <small>LEAKLEANS WORKSPACE</small>
            <h2>
              {page === "dashboard" && "Revenue Overview"}
              {page === "leaks" && "Revenue Leaks"}
              {page === "integrations" && "Integrations"}
              {page === "analytics" && "Analytics"}
              {page === "actions" && "Actions"}
              {page === "team" && "Team"}
              {page === "settings" && "Settings"}
            </h2>
          </div>

          <div className="header-user">
            <div>
              <strong>ANIKET MOHITE</strong>
              <span>Founder</span>
            </div>

            <div className="avatar">
              AM
            </div>
          </div>
        </header>

        {page === "dashboard" && (
          <>
            <section className="welcome-card">
              <div>
                <span className="green-label">
                  INTELLIGENCE STATUS
                </span>

                <h1>
                  Your revenue signals
                  <br />
                  are being monitored.
                </h1>

                <p>
                  LeakLeans is continuously looking for
                  gaps between your connected systems.
                </p>
              </div>

              <div className="monitor">
                <div className="monitor-ring">
                  ✓
                </div>

                <span>MONITORING</span>
              </div>
            </section>

            <section className="metric-grid">
              <div className="metric">
                <span>REVENUE AT RISK</span>
                <strong>₹4,25,000</strong>
                <small>Across detected opportunities</small>
              </div>

              <div className="metric">
                <span>ACTIVE LEAKS</span>
                <strong>{leaks.length - resolved.length}</strong>
                <small>Require investigation</small>
              </div>

              <div className="metric">
                <span>CONNECTED SYSTEMS</span>
                <strong>{connected.length}</strong>
                <small>Data sources connected</small>
              </div>

              <div className="metric">
                <span>RECOVERED</span>
                <strong>₹0</strong>
                <small>Demo environment</small>
              </div>
            </section>

            <section className="dashboard-section">
              <div className="section-heading">
                <div>
                  <span>DETECTED SIGNALS</span>
                  <h2>Potential revenue leaks</h2>
                </div>

                <button
                  onClick={() => setPage("leaks")}
                >
                  View all →
                </button>
              </div>

              <div className="leak-table">
                {leaks.slice(0, 4).map((leak) => (
                  <div
                    className="leak-row"
                    key={leak.id}
                    onClick={() => setSelectedLeak(leak)}
                  >
                    <div className="leak-title">
                      <span
                        className={
                          leak.severity === "HIGH"
                            ? "severity high"
                            : "severity medium"
                        }
                      >
                        {leak.severity}
                      </span>

                      <div>
                        <strong>{leak.title}</strong>
                        <small>{leak.source}</small>
                      </div>
                    </div>

                    <div className="leak-cause">
                      <span>PROBABLE CAUSE</span>
                      <strong>{leak.cause}</strong>
                    </div>

                    <div className="leak-value">
                      <span>VALUE AT RISK</span>
                      <strong>{leak.value}</strong>
                    </div>

                    <div className="arrow">→</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {page === "leaks" && (
          <section className="content-section">
            <div className="section-heading">
              <div>
                <span>REVENUE INTELLIGENCE</span>
                <h2>Detected leakage</h2>
              </div>
            </div>

            <div className="large-leak-list">
              {leaks.map((leak) => (
                <div
                  className="large-leak"
                  key={leak.id}
                  onClick={() => setSelectedLeak(leak)}
                >
                  <div className="large-leak-top">
                    <span
                      className={
                        leak.severity === "HIGH"
                          ? "severity high"
                          : "severity medium"
                      }
                    >
                      {leak.severity}
                    </span>

                    {resolved.includes(leak.id) && (
                      <span className="resolved">
                        ✓ RESOLVED
                      </span>
                    )}
                  </div>

                  <h3>{leak.title}</h3>

                  <p>{leak.description}</p>

                  <div className="large-leak-bottom">
                    <span>{leak.source}</span>
                    <strong>{leak.value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === "integrations" && (
          <section className="content-section">
            <div className="integration-intro">
              <span>DATA CONNECTIONS</span>

              <h1>
                Connect the systems
                <br />
                you already use.
              </h1>

              <p>
                LeakLeans does not replace your CRM,
                contact center or support tools. It sits
                above them and finds revenue leakage
                between them.
              </p>
            </div>

            <div className="integration-grid">
              {integrations.map((item) => {
                const isConnected =
                  connected.includes(item.id);

                return (
                  <div
                    className="integration-card"
                    key={item.id}
                  >
                    <div className="integration-top">
                      <BrandLogo item={item} />

                      <span>{item.type}</span>
                    </div>

                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                    <div className="integration-bottom">
                      {isConnected ? (
                        <div className="connected">
                          <i></i>
                          Connected
                        </div>
                      ) : (
                        <div className="not-connected">
                          Not connected
                        </div>
                      )}

                      <button
                        onClick={() =>
                          setSelectedIntegration(item)
                        }
                      >
                        {isConnected
                          ? "Manage"
                          : "Connect"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="integration-note">
              <strong>Demo integration environment</strong>
              <p>
                Authorization is simulated in this MVP.
                Production OAuth/API connections will be
                connected during the integration phase.
              </p>
            </div>
          </section>
        )}

        {page === "analytics" && (
          <section className="content-section">
            <div className="analytics-hero">
              <span>REVENUE ANALYTICS</span>
              <h1>Understand where leakage happens.</h1>
              <p>
                Track revenue at risk, recurring leakage
                patterns and recovered value.
              </p>
            </div>

            <div className="metric-grid">
              <div className="metric">
                <span>TOTAL DETECTED</span>
                <strong>₹4,25,000</strong>
              </div>

              <div className="metric">
                <span>HIGH PRIORITY</span>
                <strong>2</strong>
              </div>

              <div className="metric">
                <span>MEDIUM PRIORITY</span>
                <strong>2</strong>
              </div>

              <div className="metric">
                <span>RESOLVED</span>
                <strong>{resolved.length}</strong>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title">
                <span>LEAKAGE BY SOURCE</span>
                <strong>Potential value</strong>
              </div>

              <div className="bars">
                <div>
                  <span>Salesforce</span>
                  <i style={{ width: "90%" }}></i>
                  <strong>₹1.84L</strong>
                </div>

                <div>
                  <span>Genesys</span>
                  <i style={{ width: "70%" }}></i>
                  <strong>₹1.21L</strong>
                </div>

                <div>
                  <span>WhatsApp</span>
                  <i style={{ width: "45%" }}></i>
                  <strong>₹72K</strong>
                </div>

                <div>
                  <span>Zendesk</span>
                  <i style={{ width: "30%" }}></i>
                  <strong>₹48K</strong>
                </div>
              </div>
            </div>
          </section>
        )}

        {(page === "actions" ||
          page === "team" ||
          page === "settings") && (
          <section className="simple-page">
            <div className="simple-card">
              <span>
                {page.toUpperCase()}
              </span>

              <h1>
                {page === "actions" &&
                  "Revenue recovery actions"}
                {page === "team" &&
                  "Your LeakLeans team"}
                {page === "settings" &&
                  "Workspace settings"}
              </h1>

              <p>
                This area is part of the LeakLeans
                product workspace and will be expanded
                as production functionality is added.
              </p>

              <button
                onClick={() => setPage("dashboard")}
              >
                Back to Overview →
              </button>
            </div>
          </section>
        )}
      </main>

      {selectedIntegration && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedIntegration(null)}
        >
          <div
            className="connect-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() =>
                setSelectedIntegration(null)
              }
            >
              ×
            </button>

            <BrandLogo item={selectedIntegration} />

            <span className="modal-type">
              {selectedIntegration.type}
            </span>

            <h2>
              Connect {selectedIntegration.name}
            </h2>

            <p>
              LeakLeans will use this connection to
              analyze relevant business signals and
              identify potential revenue leakage.
            </p>

            <div className="permission-box">
              <span>✓</span>
              <div>
                <strong>Demo permissions</strong>
                <small>
                  Read customer activity and business
                  signals
                </small>
              </div>
            </div>

            <button
              className="connect-button"
              onClick={connect}
            >
              Authorize & Connect →
            </button>

            <small className="modal-note">
              Demo authorization only. No external
              account is actually modified.
            </small>
          </div>
        </div>
      )}

      {selectedLeak && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedLeak(null)}
        >
          <div
            className="investigation-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedLeak(null)}
            >
              ×
            </button>

            <div className="investigation-header">
              <div>
                <span
                  className={
                    selectedLeak.severity === "HIGH"
                      ? "severity high"
                      : "severity medium"
                  }
                >
                  {selectedLeak.severity}
                </span>

                <h2>{selectedLeak.title}</h2>

                <p>{selectedLeak.source}</p>
              </div>

              <strong>
                {selectedLeak.value}
              </strong>
            </div>

            <div className="investigation-grid">
              <div>
                <span>WHAT HAPPENED</span>
                <p>{selectedLeak.description}</p>
              </div>

              <div>
                <span>PROBABLE CAUSE</span>
                <p>{selectedLeak.cause}</p>
              </div>

              <div>
                <span>BUSINESS IMPACT</span>
                <p>{selectedLeak.impact}</p>
              </div>

              <div>
                <span>RECOMMENDED RESOLUTION</span>
                <p>{selectedLeak.action}</p>
              </div>
            </div>

            <button
              className="resolve-button"
              onClick={() =>
                resolveLeak(selectedLeak.id)
              }
            >
              Mark as Resolved →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;