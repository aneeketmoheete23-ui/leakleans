import React, { useState } from "react";
import "./App.css";

const integrations = [
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Leads, customers, opportunities and sales activity",
    logo: "/logos/salesforce.svg",
  },
  {
    id: "genesys",
    name: "Genesys",
    category: "Contact Center",
    description: "Calls, interactions and customer journeys",
    logo: "/logos/genesys.svg",
  },
  {
    id: "avaya",
    name: "Avaya",
    category: "Voice",
    description: "Voice and contact-center activity",
    logo: "/logos/avaya.svg",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "Messaging",
    description: "Customer conversations and enquiries",
    logo: "/logos/whatsapp.svg",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "Email",
    description: "Customer and sales email activity",
    logo: "/logos/gmail.svg",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "Support",
    description: "Tickets, conversations and support activity",
    logo: "/logos/zendesk.svg",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    description: "Contacts, deals and customer activity",
    logo: "/logos/hubspot.svg",
  },
  {
    id: "orders",
    name: "Sales & Orders",
    category: "Business Data",
    description: "Orders, sales and transaction signals",
    logo: "/logos/orders.svg",
  },
];

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    severity: "High",
    value: "₹1,84,000",
    source: "Salesforce + Genesys",
    status: "Open",
    cause:
      "Customer interaction was completed, but no follow-up activity was recorded within the expected time.",
    impact:
      "The customer may have moved to another provider before the sales team contacted them again.",
    recommendation:
      "Create a follow-up task, assign the responsible salesperson and notify the team.",
  },
  {
    id: 2,
    title: "Missed Call Opportunity",
    severity: "High",
    value: "₹1,21,000",
    source: "Genesys + CRM",
    status: "Open",
    cause:
      "An incoming customer call was not followed by a recorded sales action.",
    impact:
      "A potentially valuable sales opportunity may have been lost.",
    recommendation:
      "Create a callback task and notify the assigned representative.",
  },
  {
    id: 3,
    title: "Response Delay",
    severity: "Medium",
    value: "₹72,000",
    source: "WhatsApp + CRM",
    status: "Investigating",
    cause:
      "A customer enquiry remained unanswered beyond the configured response window.",
    impact:
      "Slow response can reduce the chance of conversion.",
    recommendation:
      "Trigger an immediate response workflow and assign the enquiry.",
  },
  {
    id: 4,
    title: "Unresolved Support Pattern",
    severity: "Medium",
    value: "₹48,000",
    source: "Zendesk + CRM",
    status: "Open",
    cause:
      "Repeated customer complaints were detected without a corresponding retention action.",
    impact:
      "Repeated unresolved problems can increase customer churn risk.",
    recommendation:
      "Escalate the account and create a customer-retention action.",
  },
];

function IntegrationLogo({ integration }) {
  return (
    <div className="integration-logo">
      <img
        src={integration.logo}
        alt={`${integration.name} logo`}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.innerHTML =
            integration.name.charAt(0);
        }}
      />
    </div>
  );
}

function Metric({ title, value, note }) {
  return (
    <div className="metric-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function LeakRow({ leak, onClick }) {
  return (
    <div className="leak-row" onClick={onClick}>
      <div>
        <strong>{leak.title}</strong>
        <small>{leak.source}</small>
      </div>

      <span className={`severity ${leak.severity.toLowerCase()}`}>
        {leak.severity}
      </span>

      <strong className="leak-money">{leak.value}</strong>

      <span className="leak-status">{leak.status}</span>

      <button
        className="row-button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Investigate →
      </button>
    </div>
  );
}

function InvestigationCard({ label, title, text }) {
  return (
    <div className="investigation-card">
      <span>{label}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Sidebar({ page, setPage, notifications }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand" onClick={() => setPage("dashboard")}>
        <div className="brand-icon">L</div>
        <strong>LeakLeans</strong>
      </div>

      <div className="workspace">
        <small>WORKSPACE</small>
        <strong>Demo Company</strong>
        <span>Business Workspace</span>
      </div>

      <nav>
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Overview
        </button>

        <button
          className={page === "leaks" ? "active" : ""}
          onClick={() => setPage("leaks")}
        >
          Revenue Leaks
          <b>4</b>
        </button>

        <button onClick={() => setPage("analytics")}>
          Analytics
        </button>

        <button onClick={() => setPage("integrations")}>
          Connected Systems
        </button>

        <button onClick={() => setPage("actions")}>
          Actions
        </button>

        <button onClick={() => setPage("notifications")}>
          Notifications
          <b>{notifications}</b>
        </button>

        <button onClick={() => setPage("team")}>
          Team
        </button>

        <button onClick={() => setPage("billing")}>
          Billing
        </button>

        <button onClick={() => setPage("settings")}>
          Settings
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="monitor-status">
          <span></span>
          Monitoring Active
        </div>

        <button onClick={() => setPage("home")}>← Exit Demo</button>
      </div>
    </aside>
  );
}

function TimelineStep({ number, title, active }) {
  return (
    <div className={`timeline-step ${active ? "active" : ""}`}>
      <div>{number}</div>
      <span>{title}</span>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [connected, setConnected] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [resolvedLeaks, setResolvedLeaks] = useState([]);
  const [notifications, setNotifications] = useState(3);

  const activeLeaks = leaks.filter(
    (leak) => !resolvedLeaks.includes(leak.id)
  );

  const connectSystem = () => {
    if (!connected.includes(selectedIntegration.id)) {
      setConnected([...connected, selectedIntegration.id]);
    }

    setSelectedIntegration(null);
  };

  const resolveLeak = (id) => {
    if (!resolvedLeaks.includes(id)) {
      setResolvedLeaks([...resolvedLeaks, id]);
    }
  };

  const openLeak = (leak) => {
    setSelectedLeak(leak);
    setPage("investigate");
  };

  /* LANDING */

  if (page === "home") {
    return (
      <div className="app">
        <header className="landing-topbar">
          <div
            className="brand"
            onClick={() => setPage("home")}
          >
            <div className="brand-icon">L</div>
            <span>LeakLeans</span>
          </div>

          <div className="founder-contact">
            <div>
              <small>FOUNDER</small>
              <strong>ANIKET MOHITE</strong>
            </div>

            <div>
              <small>CONTACT US</small>
              <a href="tel:8698382024">8698382024</a>
            </div>

            <div>
              <small>EMAIL</small>
              <a href="mailto:Aniket.Mohite@supportleaklens.com">
                Aniket.Mohite@supportleaklens.com
              </a>
            </div>
          </div>

          <div className="top-actions">
            <button
              className="ghost-button"
              onClick={() => setPage("login")}
            >
              Login
            </button>

            <button
              className="primary-button"
              onClick={() => setPage("signup")}
            >
              Start Free
            </button>
          </div>
        </header>

        <main className="landing">
          <div className="hero-badge">
            REVENUE LEAKAGE INTELLIGENCE PLATFORM
          </div>

          <h1>
            Find Where Your
            <span>Revenue Is Leaking.</span>
          </h1>

          <p className="hero-description">
            LeakLeans connects to the systems your business already
            uses, analyzes activity across workflows, finds hidden
            revenue leakage and helps your team take action.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button large-button"
              onClick={() => setPage("signup")}
            >
              Start Detecting →
            </button>

            <button
              className="secondary-button large-button"
              onClick={() => setPage("dashboard")}
            >
              View Demo
            </button>
          </div>

          <div className="hero-flow">
            <div className="flow-card">
              <small>EXISTING SYSTEMS</small>
              <strong>CRM · Calls · Chats · Sales</strong>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-card highlighted">
              <small>LEAKLEANS</small>
              <strong>Revenue Intelligence</strong>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-card">
              <small>BUSINESS OUTCOME</small>
              <strong>Detect · Resolve · Recover</strong>
            </div>
          </div>

          <div className="landing-features">
            <div>
              <span>01</span>
              <h3>Detect</h3>
              <p>Find revenue leakage hidden across workflows.</p>
            </div>

            <div>
              <span>02</span>
              <h3>Investigate</h3>
              <p>Understand what happened and why.</p>
            </div>

            <div>
              <span>03</span>
              <h3>Resolve</h3>
              <p>Recommend the next business action.</p>
            </div>

            <div>
              <span>04</span>
              <h3>Measure</h3>
              <p>Track potential and recovered revenue.</p>
            </div>
          </div>

          <div className="landing-disclaimer">
            Demo environment · Integrations and AI actions are simulated.
          </div>
        </main>
      </div>
    );
  }

  /* LOGIN / SIGNUP */

  if (page === "login" || page === "signup") {
    const signup = page === "signup";

    return (
      <div className="auth-page">
        <div className="auth-card">
          <div
            className="brand auth-brand"
            onClick={() => setPage("home")}
          >
            <div className="brand-icon">L</div>
            <span>LeakLeans</span>
          </div>

          <span className="eyebrow">
            {signup ? "CREATE WORKSPACE" : "WELCOME BACK"}
          </span>

          <h2>
            {signup
              ? "Start with LeakLeans"
              : "Sign in to LeakLeans"}
          </h2>

          <p>
            {signup
              ? "Create your business workspace and start detecting revenue leakage."
              : "Access your revenue intelligence workspace."}
          </p>

          {signup && (
            <input
              className="input"
              placeholder="Company name"
            />
          )}

          <input
            className="input"
            placeholder="Email address"
            type="email"
          />

          <input
            className="input"
            placeholder="Password"
            type="password"
          />

          <button
            className="primary-button full-button"
            onClick={() => setPage("dashboard")}
          >
            {signup ? "Create Workspace →" : "Login →"}
          </button>

          <button
            className="text-button"
            onClick={() =>
              setPage(signup ? "login" : "signup")
            }
          >
            {signup
              ? "Already have an account? Login"
              : "Don't have an account? Start free"}
          </button>

          <button
            className="text-button"
            onClick={() => setPage("home")}
          >
            ← Back to LeakLeans
          </button>
        </div>
      </div>
    );
  }

  /* DASHBOARD */

  if (page === "dashboard") {
    return (
      <div className="app">
        <Sidebar
          page={page}
          setPage={setPage}
          notifications={notifications}
        />

        <main className="main-content">
          <div className="dashboard-top">
            <div>
              <span className="eyebrow">OVERVIEW</span>
              <h2>Revenue Intelligence</h2>
              <p>
                Monitor potential revenue leakage across your
                business.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setPage("integrations")}
            >
              + Connect System
            </button>
          </div>

          <div className="metric-grid">
            <Metric
              title="Potential Leakage"
              value="₹4.25L"
              note="+12.4% detected"
            />

            <Metric
              title="Recovered Revenue"
              value="₹1.84L"
              note="This month"
            />

            <Metric
              title="Active Leaks"
              value={activeLeaks.length}
              note="Require attention"
            />

            <Metric
              title="Signals Analyzed"
              value="12,482"
              note="Across connected systems"
            />
          </div>

          <div className="dashboard-section">
            <div className="section-title">
              <div>
                <span className="eyebrow">DETECTED SIGNALS</span>
                <h3>Potential Revenue Leaks</h3>
              </div>

              <button
                className="ghost-button"
                onClick={() => setPage("leaks")}
              >
                View All →
              </button>
            </div>

            <div className="leak-table">
              {activeLeaks.slice(0, 4).map((leak) => (
                <LeakRow
                  key={leak.id}
                  leak={leak}
                  onClick={() => openLeak(leak)}
                />
              ))}
            </div>
          </div>

          <div className="bottom-dashboard-grid">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">SYSTEM HEALTH</span>
                  <h3>Connected Sources</h3>
                </div>

                <span className="live-status">● LIVE</span>
              </div>

              {integrations.slice(0, 4).map((integration) => (
                <div
                  className="source-row"
                  key={integration.id}
                >
                  <IntegrationLogo integration={integration} />

                  <div>
                    <strong>{integration.name}</strong>
                    <small>Data sync active</small>
                  </div>

                  <span className="source-ok">Connected</span>
                </div>
              ))}
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">RECOVERY</span>
                  <h3>Leak Recovery</h3>
                </div>
              </div>

              <div className="recovery-number">43%</div>

              <div className="progress">
                <div style={{ width: "43%" }}></div>
              </div>

              <p className="panel-note">
                Estimated recovery progress from detected leakage.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* INTEGRATIONS */

  if (page === "integrations") {
    return (
      <div className="app">
        <Sidebar
          page={page}
          setPage={setPage}
          notifications={notifications}
        />

        <main className="main-content">
          <div className="dashboard-top">
            <div>
              <span className="eyebrow">INTEGRATIONS</span>
              <h2>Connect Your Existing Systems</h2>
              <p>
                LeakLeans sits on top of your existing business
                systems.
              </p>
            </div>
          </div>

          <div className="integration-grid">
            {integrations.map((integration) => {
              const isConnected = connected.includes(
                integration.id
              );

              return (
                <div
                  className="integration-card"
                  key={integration.id}
                >
                  <IntegrationLogo integration={integration} />

                  <span className="integration-category">
                    {integration.category}
                  </span>

                  <h3>{integration.name}</h3>

                  <p>{integration.description}</p>

                  <button
                    className={
                      isConnected
                        ? "connected-button"
                        : "connect-button"
                    }
                    onClick={() => {
                      if (!isConnected) {
                        setSelectedIntegration(integration);
                      }
                    }}
                  >
                    {isConnected
                      ? "✓ Connected"
                      : "Connect"}
                  </button>
                </div>
              );
            })}
          </div>
        </main>

        {selectedIntegration && (
          <div className="modal-overlay">
            <div className="modal-card">
              <IntegrationLogo
                integration={selectedIntegration}
              />

              <span className="eyebrow">DEMO CONNECTION</span>

              <h2>
                Connect {selectedIntegration.name}
              </h2>

              <p>
                LeakLeans will request the business activity needed
                for revenue leakage analysis.
              </p>

              <div className="permission-list">
                <div>✓ Customer activity</div>
                <div>✓ Interaction history</div>
                <div>✓ Workflow signals</div>
                <div>✓ Revenue-related events</div>
              </div>

              <button
                className="primary-button full-button"
                onClick={connectSystem}
              >
                Authorize & Connect
              </button>

              <button
                className="text-button"
                onClick={() => setSelectedIntegration(null)}
              >
                Cancel
              </button>

              <small className="demo-note">
                Demo mode: this simulates the connection. Real
                OAuth/API credentials will be required for production.
              </small>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* LEAKS */

  if (page === "leaks") {
    return (
      <div className="app">
        <Sidebar
          page={page}
          setPage={setPage}
          notifications={notifications}
        />

        <main className="main-content">
          <div className="dashboard-top">
            <div>
              <span className="eyebrow">REVENUE LEAKS</span>
              <h2>All Detected Leaks</h2>
              <p>
                Investigate revenue leakage signals across your
                systems.
              </p>
            </div>

            <div className="filter-pill">
              All Leaks ▾
            </div>
          </div>

          <div className="leak-table large-table">
            {leaks.map((leak) => (
              <LeakRow
                key={leak.id}
                leak={{
                  ...leak,
                  status: resolvedLeaks.includes(leak.id)
                    ? "Resolved"
                    : leak.status,
                }}
                onClick={() => openLeak(leak)}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  /* INVESTIGATION */

  if (page === "investigate" && selectedLeak) {
    const resolved = resolvedLeaks.includes(
      selectedLeak.id
    );

    return (
      <div className="app">
        <Sidebar
          page={page}
          setPage={setPage}
          notifications={notifications}
        />

        <main className="main-content">
          <button
            className="back-button"
            onClick={() => setPage("leaks")}
          >
            ← Back to leaks
          </button>

          <div className="investigation-header">
            <div>
              <span className="eyebrow">
                AI INVESTIGATION
              </span>

              <h2>{selectedLeak.title}</h2>

              <p>{selectedLeak.source}</p>
            </div>

            <span
              className={`severity ${selectedLeak.severity.toLowerCase()}`}
            >
              {selectedLeak.severity}
            </span>
          </div>

          <div className="impact-banner">
            <div>
              <span>ESTIMATED POTENTIAL IMPACT</span>
              <strong>{selectedLeak.value}</strong>
            </div>

            <div className="impact-status">
              {resolved ? "RESOLVED" : "REQUIRES ACTION"}
            </div>
          </div>

          <div className="investigation-grid">
            <InvestigationCard
              label="PROBABLE CAUSE"
              title="Why did this happen?"
              text={selectedLeak.cause}
            />

            <InvestigationCard
              label="BUSINESS IMPACT"
              title="What could be lost?"
              text={selectedLeak.impact}
            />

            <InvestigationCard
              label="RECOMMENDED RESOLUTION"
              title="What should happen next?"
              text={selectedLeak.recommendation}
            />
          </div>

          <div className="action-panel">
            <div>
              <span className="eyebrow">RESOLUTION</span>
              <h3>Take Action</h3>
              <p>
                LeakLeans can recommend the next workflow action.
              </p>
            </div>

            {resolved ? (
              <div className="resolved-label">
                ✓ Resolution Initiated
              </div>
            ) : (
              <button
                className="primary-button"
                onClick={() =>
                  resolveLeak(selectedLeak.id)
                }
              >
                Resolve Leak →
              </button>
            )}
          </div>

          <div className="timeline">
            <TimelineStep
              number="01"
              title="Signal Detected"
              active
            />

            <TimelineStep
              number="02"
              title="Pattern Investigated"
              active
            />

            <TimelineStep
              number="03"
              title="Cause Explained"
              active
            />

            <TimelineStep
              number="04"
              title="Resolution"
              active={resolved}
            />

            <TimelineStep
              number="05"
              title="Recovery Measured"
              active={resolved}
            />
          </div>
        </main>
      </div>
    );
  }

  /* ANALYTICS */

  if (page === "analytics") {
    return (
      <div className="app">
        <Sidebar
          page={page}
          setPage={setPage}
          notifications={notifications}
        />

        <main className="main-content">
          <span className="eyebrow">ANALYTICS</span>
          <h2>Revenue Leakage Analytics</h2>
          <p className="page-description">
            Understand where leakage is happening across your
            business.
          </p>

          <div className="metric-grid">
            <Metric
              title="Potential Leakage"
              value="₹4.25L"
              note="Current period"
            />

            <Metric
              title="Recovered"
              value="₹1.84L"
              note="Resolved leaks"
            />

            <Metric
              title="Recovery Rate"
              value="43%"
              note="Estimated"
            />

            <Metric
              title="Signals"
              value="12,482"
              note="Analyzed"
            />
          </div>

          <div className="analytics-chart">
            <div className="panel-header">
              <div>
                <span className="eyebrow">LEAKAGE TREND</span>
                <h3>Potential Leakage by Period</h3>
              </div>
            </div>

            <div className="bars">
              <div style={{ height: "45%" }}><span>Jan</span></div>
              <div style={{ height: "65%" }}><span>Feb</span></div>
              <div style={{ height: "52%" }}><span>Mar</span></div>
              <div style={{ height: "78%" }}><span>Apr</span></div>
              <div style={{ height: "60%" }}><span>May</span></div>
              <div style={{ height: "88%" }}><span>Jun</span></div>
              <div style={{ height: "72%" }}><span>Jul</span></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ACTIONS */

  if (page === "actions") {
    return (
      <SimplePage
        title="Actions"
        eyebrow="AUTOMATION"
        description="Recommended and completed actions generated from detected revenue leaks."
        setPage={setPage}
      >
        <div className="action-list">
          <div className="action-item">
            <span>FOLLOW-UP</span>
            <strong>Create Salesforce follow-up</strong>
            <small>Ready to execute · Demo</small>
          </div>

          <div className="action-item">
            <span>CALLBACK</span>
            <strong>Create callback task</strong>
            <small>Assigned to Sales Team · Demo</small>
          </div>

          <div className="action-item">
            <span>NOTIFICATION</span>
            <strong>Notify account owner</strong>
            <small>Pending approval · Demo</small>
          </div>
        </div>
      </SimplePage>
    );
  }

  /* NOTIFICATIONS */

  if (page === "notifications") {
    return (
      <SimplePage
        title="Notifications"
        eyebrow="ACTIVITY"
        description="Important revenue leakage events and system activity."
        setPage={setPage}
      >
        <div className="notification-list">
          <div className="notification-item">
            <b>High-value leak detected</b>
            <span>Follow-up Failure · ₹1.84L</span>
          </div>

          <div className="notification-item">
            <b>New system signal analyzed</b>
            <span>Genesys · 342 interactions</span>
          </div>

          <div className="notification-item">
            <b>Resolution recommended</b>
            <span>Missed Call Opportunity · ₹1.21L</span>
          </div>

          <button
            className="secondary-button"
            onClick={() => setNotifications(0)}
          >
            Mark all as read
          </button>
        </div>
      </SimplePage>
    );
  }

  /* TEAM */

  if (page === "team") {
    return (
      <SimplePage
        title="Team & Users"
        eyebrow="WORKSPACE"
        description="Manage users and responsibilities inside your LeakLeans workspace."
        setPage={setPage}
      >
        <div className="team-list">
          <div>
            <strong>Aniket Mohite</strong>
            <span>Founder · Admin</span>
          </div>

          <div>
            <strong>Sales Manager</strong>
            <span>Revenue Operations</span>
          </div>

          <div>
            <strong>Support Manager</strong>
            <span>Customer Operations</span>
          </div>
        </div>

        <button className="primary-button">
          + Invite Team Member
        </button>
      </SimplePage>
    );
  }

  /* BILLING */

  if (page === "billing") {
    return (
      <SimplePage
        title="Billing"
        eyebrow="SUBSCRIPTION"
        description="Manage your LeakLeans plan and workspace usage."
        setPage={setPage}
      >
        <div className="billing-card">
          <span className="eyebrow">CURRENT PLAN</span>
          <h3>Demo / Free</h3>
          <strong>₹0</strong>
          <p>
            Demo workspace with simulated integrations and data.
          </p>

          <button className="primary-button">
            Upgrade Plan
          </button>
        </div>
      </SimplePage>
    );
  }

  /* SETTINGS */

  if (page === "settings") {
    return (
      <SimplePage
        title="Settings"
        eyebrow="WORKSPACE SETTINGS"
        description="Configure your LeakLeans workspace."
        setPage={setPage}
      >
        <div className="settings-list">
          <div>
            <strong>Workspace Name</strong>
            <input
              className="input"
              value="Demo Company"
              readOnly
            />
          </div>

          <div>
            <strong>Leak Detection</strong>
            <span>Enabled</span>
          </div>

          <div>
            <strong>AI Investigation</strong>
            <span>Enabled · Demo Mode</span>
          </div>

          <div>
            <strong>Notifications</strong>
            <span>Enabled</span>
          </div>
        </div>
      </SimplePage>
    );
  }

  return null;
}

function SimplePage({
  title,
  eyebrow,
  description,
  children,
}) {
  return (
    <div className="app">
      <Sidebar
        page=""
        setPage={() => {}}
        notifications={3}
      />

      <main className="main-content">
        <span className="eyebrow">{eyebrow}</span>

        <h2>{title}</h2>

        <p className="page-description">
          {description}
        </p>

        <div className="simple-page-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default App;