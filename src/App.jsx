import React, { useState } from "react";

const BRAND = "AI Revenue Leak Detector";
const TAGLINE = "Find Where Your Revenue Is Leaking.";
const FOUNDER = "ANIKET MOHITE";
const PHONE = "8698382024";
const EMAIL = "Aniket.Mohite@supportleaklens.com";

const icon = (name) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${name}.svg`;

const systems = [
  {
    id: "salesforce",
    name: "Salesforce",
    short: "SF",
    category: "CRM",
    description: "Leads, opportunities, accounts and pipeline activity.",
    logo: icon("salesforce"),
  },
  {
    id: "genesys",
    name: "Genesys",
    short: "GX",
    category: "Contact Center",
    description: "Calls, queues, agents and customer interactions.",
    logo: icon("genesys"),
  },
  {
    id: "avaya",
    name: "Avaya",
    short: "AV",
    category: "Contact Center",
    description: "Call activity, agents and customer interactions.",
    logo: icon("avaya"),
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    short: "WA",
    category: "Messaging",
    description: "Customer conversations and response activity.",
    logo: icon("whatsapp"),
  },
  {
    id: "hubspot",
    name: "HubSpot",
    short: "HS",
    category: "CRM",
    description: "Contacts, deals and customer lifecycle data.",
    logo: icon("hubspot"),
  },
  {
    id: "gmail",
    name: "Gmail / Google Workspace",
    short: "GM",
    category: "Email",
    description: "Business email and customer communication.",
    logo: icon("gmail"),
  },
  {
    id: "zendesk",
    name: "Zendesk",
    short: "ZD",
    category: "Support",
    description: "Tickets, complaints and support workflows.",
    logo: icon("zendesk"),
  },
  {
    id: "custom",
    name: "Custom CRM / API",
    short: "API",
    category: "Custom",
    description: "Connect another business system through an API.",
    logo: null,
  },
];

const paymentMethods = [
  {
    id: "razorpay",
    name: "Razorpay",
    description: "India payments",
    logo: icon("razorpay"),
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "International payments",
    logo: icon("stripe"),
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "International payments",
    logo: icon("paypal"),
  },
  {
    id: "gpay",
    name: "Google Pay",
    description: "UPI",
    logo: icon("googlepay"),
  },
  {
    id: "phonepe",
    name: "PhonePe",
    description: "UPI",
    logo: icon("phonepe"),
  },
  {
    id: "supermoney",
    name: "super.money",
    description: "UPI",
    logo: null,
  },
  {
    id: "debit",
    name: "Debit Card",
    description: "Card payment",
    logo: null,
  },
  {
    id: "credit",
    name: "Credit Card",
    description: "Card payment",
    logo: null,
  },
];

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    system: "Salesforce",
    severity: "High",
    value: "₹1,48,000",
    status: "Open",
    description:
      "High-value leads received an initial interaction but no follow-up was recorded within the expected window.",
    cause: "Likely sales workflow handoff gap.",
    action: "Automatically assign the lead and trigger a follow-up task.",
  },
  {
    id: 2,
    title: "Missed Inbound Calls",
    system: "Genesys",
    severity: "High",
    value: "₹86,000",
    status: "Open",
    description:
      "Inbound customer calls were abandoned or not followed by a recorded callback.",
    cause: "Potential queue capacity or callback workflow gap.",
    action: "Create callback tasks for abandoned high-value interactions.",
  },
  {
    id: 3,
    title: "Quote-to-Order Drop",
    system: "CRM + Sales",
    severity: "Medium",
    value: "₹2,14,000",
    status: "Investigating",
    description:
      "Several quotations reached customers but did not progress to an order.",
    cause: "Possible pricing, approval or follow-up issue.",
    action: "Review quote aging and trigger sales-owner escalation.",
  },
  {
    id: 4,
    title: "Delayed Response",
    system: "Gmail",
    severity: "Medium",
    value: "₹64,000",
    status: "Open",
    description:
      "Customer enquiries received responses significantly later than the configured response window.",
    cause: "Response workflow delay.",
    action: "Create SLA alerts and route delayed conversations.",
  },
  {
    id: 5,
    title: "Repeated Complaint Loop",
    system: "Zendesk",
    severity: "Low",
    value: "₹39,000",
    status: "Open",
    description:
      "Customers repeatedly contacted support about unresolved issues.",
    cause: "Resolution ownership or escalation gap.",
    action: "Escalate repeated complaints to a designated owner.",
  },
];

const navGroups = [
  {
    title: "Workspace",
    items: [
      ["overview", "Overview"],
      ["leaks", "Revenue Leaks"],
      ["investigation", "Investigation"],
      ["integrations", "Integrations"],
      ["analytics", "Analytics"],
      ["actions", "Actions"],
    ],
  },
  {
    title: "Management",
    items: [
      ["team", "Team"],
      ["billing", "Billing & Payments"],
      ["notifications", "Notifications"],
    ],
  },
  {
    title: "Account",
    items: [["settings", "Settings"]],
  },
];

const rolePermissions = {
  Admin: [
    "Overview",
    "Revenue Leaks",
    "Investigation",
    "Integrations",
    "Analytics",
    "Actions",
    "Team",
    "Billing & Payments",
    "Notifications",
    "Settings",
  ],
  Manager: [
    "Overview",
    "Revenue Leaks",
    "Investigation",
    "Integrations",
    "Analytics",
    "Actions",
    "Team",
    "Notifications",
  ],
  "Project Head": [
    "Overview",
    "Revenue Leaks",
    "Investigation",
    "Integrations",
    "Analytics",
    "Actions",
    "Team",
  ],
  "Team Member": [
    "Overview",
    "Revenue Leaks",
    "Investigation",
    "Actions",
    "Notifications",
  ],
};

function BrandMark() {
  return (
    <div className="brand-mark">
      <span>AI</span>
      <i />
    </div>
  );
}

function Logo({ system, large = false }) {
  const [failed, setFailed] = useState(false);

  if (!system.logo || failed) {
    return (
      <div className={`logo-fallback ${large ? "large" : ""}`}>
        {system.short}
      </div>
    );
  }

  return (
    <div className={`real-logo ${large ? "large" : ""}`}>
      <img
        src={system.logo}
        alt={`${system.name} logo`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function PaymentLogo({ payment }) {
  const [failed, setFailed] = useState(false);

  if (!payment.logo || failed) {
    return (
      <div className="payment-fallback">
        {payment.id === "debit" || payment.id === "credit" ? "▣" : "₹"}
      </div>
    );
  }

  return (
    <div className="payment-logo">
      <img
        src={payment.logo}
        alt={`${payment.name} logo`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function StatusBadge({ children, type = "default" }) {
  return <span className={`status-badge ${type}`}>{children}</span>;
}

function LandingPage({ onStart }) {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="brand-area">
          <BrandMark />
          <div>
            <strong>{BRAND}</strong>
            <span>Revenue Intelligence</span>
          </div>
        </div>

        <div className="founder-mini">
          <b>{FOUNDER}</b>
          <span>Founder, {BRAND}</span>
          <span>{PHONE}</span>
        </div>

        <button className="header-button" onClick={onStart}>
          Open Platform →
        </button>
      </header>

      <main className="hero">
        <div className="hero-badge">
          AI-POWERED REVENUE INTELLIGENCE
        </div>

        <h1>
          Find Where Your
          <br />
          <span>Revenue Is Leaking.</span>
        </h1>

        <p className="hero-text">
          {BRAND} connects with the systems your business already uses,
          detects hidden revenue leakage, explains probable causes and helps
          your team take action.
        </p>

        <div className="hero-actions">
          <button className="primary-button" onClick={onStart}>
            Start Detecting Revenue Leaks →
          </button>
          <button
            className="secondary-button"
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            See How It Works
          </button>
        </div>

        <div className="founder-card">
          <div className="founder-avatar">AM</div>
          <div>
            <small>FOUNDER</small>
            <h3>{FOUNDER}</h3>
            <p>Founder, {BRAND}</p>
          </div>
          <div className="founder-contact">
            <span>📞 {PHONE}</span>
            <span>✉ {EMAIL}</span>
          </div>
        </div>
      </main>

      <section className="integration-strip">
        <div className="section-label">CONNECT YOUR EXISTING SYSTEMS</div>

        <div className="logo-row">
          {systems.slice(0, 7).map((system) => (
            <div className="logo-preview" key={system.id}>
              <Logo system={system} />
              <span>{system.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="how-section">
        <div className="section-heading center">
          <span>THE INTELLIGENCE LAYER</span>
          <h2>From hidden signal to recovered revenue.</h2>
          <p>
            AI Revenue Leak Detector sits above your existing business
            systems. It finds problems that are difficult to see inside one
            system alone.
          </p>
        </div>

        <div className="process-grid">
          {[
            ["01", "Detect", "Find suspicious revenue leakage signals."],
            ["02", "Investigate", "Connect activity across systems."],
            ["03", "Explain", "Identify probable causes and impact."],
            ["04", "Resolve", "Recommend and execute permitted actions."],
          ].map(([number, title, text]) => (
            <div className="process-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-stats">
        <div>
          <strong>8+</strong>
          <span>System integrations</span>
        </div>
        <div>
          <strong>₹5.51L</strong>
          <span>Demo leakage identified</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>Continuous monitoring</span>
        </div>
        <div>
          <strong>AI</strong>
          <span>Cause analysis</span>
        </div>
      </section>

      <footer className="landing-footer">
        <div>
          <BrandMark />
          <div>
            <strong>{BRAND}</strong>
            <p>{TAGLINE}</p>
          </div>
        </div>

        <div className="footer-founder">
          <b>{FOUNDER}</b>
          <span>Founder, {BRAND}</span>
          <span>{PHONE}</span>
          <span>{EMAIL}</span>
        </div>
      </footer>
    </div>
  );
}

function Sidebar({ page, setPage, collapsed, setCollapsed, role }) {
  const allowed = rolePermissions[role];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <BrandMark />
        {!collapsed && (
          <div>
            <strong>AI Revenue</strong>
            <span>Leak Detector</span>
          </div>
        )}
      </div>

      <div className="role-box">
        {!collapsed && (
          <>
            <small>ACCESS LEVEL</small>
            <strong>{role}</strong>
          </>
        )}
        <span>●</span>
      </div>

      <nav>
        {navGroups.map((group) => (
          <div className="nav-group" key={group.title}>
            {!collapsed && <div className="nav-title">{group.title}</div>}

            {group.items.map(([id, label]) => {
              if (!allowed.includes(label)) return null;

              return (
                <button
                  key={id}
                  className={page === id ? "active" : ""}
                  onClick={() => setPage(id)}
                  title={collapsed ? label : ""}
                >
                  <span className="nav-icon">
                    {id === "overview" && "⌂"}
                    {id === "leaks" && "⚠"}
                    {id === "investigation" && "⌕"}
                    {id === "integrations" && "◈"}
                    {id === "analytics" && "▥"}
                    {id === "actions" && "✓"}
                    {id === "team" && "♙"}
                    {id === "billing" && "₹"}
                    {id === "notifications" && "◉"}
                    {id === "settings" && "⚙"}
                  </span>
                  {!collapsed && <span>{label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        {!collapsed && (
          <div className="sidebar-founder">
            <b>{FOUNDER}</b>
            <span>Founder</span>
          </div>
        )}

        <button
          className="collapse-button"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "← Collapse"}
        </button>
      </div>
    </aside>
  );
}

function Topbar({ role, setRole, setPage }) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <span>Revenue Intelligence Platform</span>
        <h2>AI Revenue Leak Detector</h2>
      </div>

      <div className="topbar-right">
        <div className="online">
          <i />
          Monitoring Active
        </div>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Admin</option>
          <option>Manager</option>
          <option>Project Head</option>
          <option>Team Member</option>
        </select>

        <button className="profile" onClick={() => setPage("settings")}>
          <span>AM</span>
          <div>
            <b>{FOUNDER}</b>
            <small>{role}</small>
          </div>
        </button>
      </div>
    </header>
  );
}

function OverviewPage({ setPage, setSelectedLeak }) {
  const total = 551000;

  return (
    <div className="page">
      <div className="welcome">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1>Revenue leakage intelligence</h1>
          <p>
            Your systems are connected. The AI layer is monitoring business
            activity for potential leakage.
          </p>
        </div>

        <button className="primary-button" onClick={() => setPage("leaks")}>
          View All Leaks →
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Potential Leakage</span>
          <strong>₹5.51L</strong>
          <small>Across detected signals</small>
        </div>
        <div className="stat-card">
          <span>Open Signals</span>
          <strong>5</strong>
          <small>Require investigation</small>
        </div>
        <div className="stat-card">
          <span>High Priority</span>
          <strong>2</strong>
          <small>Immediate attention</small>
        </div>
        <div className="stat-card">
          <span>Systems Connected</span>
          <strong>7</strong>
          <small>Data sources monitored</small>
        </div>
      </div>

      <div className="content-grid">
        <section className="panel large-panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">DETECTED SIGNALS</span>
              <h2>Revenue leakage signals</h2>
            </div>
            <button onClick={() => setPage("leaks")}>View all</button>
          </div>

          <div className="leak-list">
            {leaks.slice(0, 4).map((leak) => (
              <button
                className="leak-row"
                key={leak.id}
                onClick={() => {
                  setSelectedLeak(leak);
                  setPage("investigation");
                }}
              >
                <div className="leak-indicator">
                  {leak.severity === "High" ? "!" : "•"}
                </div>

                <div className="leak-main">
                  <b>{leak.title}</b>
                  <span>
                    {leak.system} · {leak.description}
                  </span>
                </div>

                <StatusBadge
                  type={leak.severity.toLowerCase()}
                >
                  {leak.severity}
                </StatusBadge>

                <strong>{leak.value}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">MONITORING</span>
              <h2>System health</h2>
            </div>
          </div>

          <div className="health-list">
            {systems.slice(0, 6).map((system) => (
              <div className="health-row" key={system.id}>
                <Logo system={system} />
                <span>{system.name}</span>
                <i>Connected</i>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="intelligence-banner">
        <div>
          <span className="eyebrow">AI INVESTIGATION</span>
          <h2>Detect → Investigate → Explain → Resolve → Prevent</h2>
          <p>
            The platform looks for gaps between customer activity, sales
            activity, communication and support workflows.
          </p>
        </div>
        <button onClick={() => setPage("investigation")}>
          Investigate Signals →
        </button>
      </section>
    </div>
  );
}

function LeaksPage({ setSelectedLeak, setPage }) {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">REVENUE LEAKS</span>
          <h1>Detected leakage signals</h1>
          <p>Review potential revenue leakage discovered across your systems.</p>
        </div>
      </div>

      <div className="filter-row">
        <button className="filter active">All Signals · 5</button>
        <button className="filter">High · 2</button>
        <button className="filter">Medium · 2</button>
        <button className="filter">Low · 1</button>
      </div>

      <div className="panel table-panel">
        <div className="table-head">
          <span>Signal</span>
          <span>System</span>
          <span>Severity</span>
          <span>Potential Value</span>
          <span>Status</span>
          <span />
        </div>

        {leaks.map((leak) => (
          <button
            className="table-row"
            key={leak.id}
            onClick={() => {
              setSelectedLeak(leak);
              setPage("investigation");
            }}
          >
            <div>
              <b>{leak.title}</b>
              <small>{leak.description}</small>
            </div>
            <span>{leak.system}</span>
            <StatusBadge type={leak.severity.toLowerCase()}>
              {leak.severity}
            </StatusBadge>
            <strong>{leak.value}</strong>
            <StatusBadge>{leak.status}</StatusBadge>
            <span>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function InvestigationPage({ selectedLeak, resolved, setResolved, setPage }) {
  const leak = selectedLeak || leaks[0];

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">AI INVESTIGATION</span>
          <h1>{leak.title}</h1>
          <p>{leak.system} · Signal #{leak.id}</p>
        </div>

        <StatusBadge type={leak.severity.toLowerCase()}>
          {leak.severity} Priority
        </StatusBadge>
      </div>

      <div className="investigation-grid">
        <section className="panel investigation-main">
          <div className="investigation-value">
            <span>Potential revenue at risk</span>
            <strong>{leak.value}</strong>
            <small>AI-estimated business impact</small>
          </div>

          <div className="investigation-section">
            <span className="eyebrow">WHAT WAS DETECTED</span>
            <h3>Leakage signal</h3>
            <p>{leak.description}</p>
          </div>

          <div className="investigation-section">
            <span className="eyebrow">PROBABLE CAUSE</span>
            <h3>{leak.cause}</h3>
            <p>
              The platform has identified a workflow pattern that may require
              operational review.
            </p>
          </div>

          <div className="investigation-section">
            <span className="eyebrow">RECOMMENDED RESOLUTION</span>
            <h3>{leak.action}</h3>
            <p>
              A permitted automation or responsible team member can execute
              this action after approval.
            </p>
          </div>

          {!resolved ? (
            <button
              className="primary-button"
              onClick={() => setResolved(true)}
            >
              Mark Resolution Complete →
            </button>
          ) : (
            <div className="resolved-box">
              ✓ Resolution recorded successfully.
            </div>
          )}
        </section>

        <aside className="panel timeline-panel">
          <span className="eyebrow">SIGNAL TIMELINE</span>
          <h2>Investigation path</h2>

          {[
            ["Detected", "Revenue anomaly identified", "✓"],
            ["Investigating", "Cross-system activity checked", "✓"],
            ["Explained", "Probable cause generated", "✓"],
            ["Resolution", "Recommended action available", "→"],
            ["Prevention", "Monitor after resolution", "○"],
          ].map(([title, text, icon]) => (
            <div className="timeline-item" key={title}>
              <span>{icon}</span>
              <div>
                <b>{title}</b>
                <p>{text}</p>
              </div>
            </div>
          ))}

          <button className="secondary-button" onClick={() => setPage("leaks")}>
            Back to Revenue Leaks
          </button>
        </aside>
      </div>
    </div>
  );
}

function IntegrationsPage({ connected, setConnected, setPage }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">INTEGRATIONS</span>
          <h1>Connect your existing systems</h1>
          <p>
            AI Revenue Leak Detector works as an intelligence layer above your
            existing business platforms.
          </p>
        </div>
      </div>

      <div className="integration-notice">
        <span>◈</span>
        <div>
          <b>Your systems remain your systems.</b>
          <p>
            This platform does not replace Salesforce, Genesys, Avaya, CRM,
            helpdesk or communication platforms. It analyzes signals across
            them.
          </p>
        </div>
      </div>

      <div className="integration-grid">
        {systems.map((system) => (
          <div className="integration-card" key={system.id}>
            <div className="integration-top">
              <Logo system={system} large />
              {connected.includes(system.id) && (
                <StatusBadge type="connected">Connected</StatusBadge>
              )}
            </div>

            <span className="integration-category">{system.category}</span>
            <h3>{system.name}</h3>
            <p>{system.description}</p>

            <button
              className={
                connected.includes(system.id)
                  ? "connected-button"
                  : "connect-button"
              }
              onClick={() => setSelected(system)}
            >
              {connected.includes(system.id)
                ? "Manage Connection"
                : "Connect System →"}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <Logo system={selected} large />
          <span className="eyebrow">CONNECT SYSTEM</span>
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>

          <div className="auth-box">
            <b>Connection method</b>
            <div className="auth-option active">
              <span>●</span>
              <div>
                <strong>Automatic API / OAuth</strong>
                <small>Recommended connection method</small>
              </div>
            </div>
            <div className="auth-option">
              <span>○</span>
              <div>
                <strong>Manual API credentials</strong>
                <small>For custom enterprise environments</small>
              </div>
            </div>
          </div>

          <div className="demo-fields">
            <label>
              Account / Instance
              <input placeholder="Enter account or instance" />
            </label>
            <label>
              Client ID / API Key
              <input placeholder="Enter credentials" />
            </label>
          </div>

          <div className="modal-warning">
            Demo UI only. Production OAuth tokens and secrets should be
            processed securely through the backend.
          </div>

          <button
            className="primary-button full"
            onClick={() => {
              setConnected((prev) =>
                prev.includes(selected.id)
                  ? prev
                  : [...prev, selected.id]
              );
              setSelected(null);
              setPage("integrations");
            }}
          >
            Authorize & Connect →
          </button>
        </Modal>
      )}
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ANALYTICS</span>
          <h1>Revenue leakage analytics</h1>
          <p>Understand where leakage is appearing across your workflows.</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="panel chart-card">
          <span className="eyebrow">POTENTIAL LEAKAGE</span>
          <h2>₹5,51,000</h2>
          <div className="fake-chart">
            {[35, 52, 42, 68, 55, 82, 70, 94, 75, 88].map(
              (height, index) => (
                <i style={{ height: `${height}%` }} key={index} />
              )
            )}
          </div>
        </div>

        <div className="panel">
          <span className="eyebrow">BY SOURCE</span>
          <h2>Leakage signals</h2>

          {[
            ["CRM / Sales", "₹3.62L"],
            ["Contact Center", "₹86K"],
            ["Email", "₹64K"],
            ["Support", "₹39K"],
          ].map(([name, value]) => (
            <div className="metric-line" key={name}>
              <span>{name}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <span className="eyebrow">INTELLIGENCE</span>
        <h2>Cross-system patterns</h2>
        <div className="pattern-grid">
          <div>
            <b>Sales → Communication</b>
            <p>Follow-up gaps detected after customer interactions.</p>
          </div>
          <div>
            <b>Calls → CRM</b>
            <p>Call activity can be compared with lead progression.</p>
          </div>
          <div>
            <b>Support → Revenue</b>
            <p>Repeated complaints can be linked to customer value.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionsPage() {
  const actions = [
    ["Assign Follow-up", "Salesforce", "Recommended"],
    ["Create Callback", "Genesys", "Ready"],
    ["Escalate Complaint", "Zendesk", "Recommended"],
    ["Notify Project Head", "Internal", "Ready"],
  ];

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ACTIONS</span>
          <h1>Revenue recovery actions</h1>
          <p>Recommended actions generated from detected leakage signals.</p>
        </div>
      </div>

      <div className="panel">
        {actions.map(([action, system, status]) => (
          <div className="action-row" key={action}>
            <div>
              <b>{action}</b>
              <span>{system}</span>
            </div>
            <StatusBadge>{status}</StatusBadge>
            <button>Review →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPage() {
  const members = [
    ["AM", "ANIKET MOHITE", "Admin"],
    ["RK", "Rahul Kumar", "Manager"],
    ["PS", "Priya Shah", "Project Head"],
    ["AK", "Amit Kumar", "Team Member"],
  ];

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">TEAM</span>
          <h1>Team & access</h1>
          <p>Different access levels for different responsibilities.</p>
        </div>
        <button className="primary-button">+ Add Member</button>
      </div>

      <div className="role-grid">
        {Object.entries(rolePermissions).map(([role, permissions]) => (
          <div className="role-card" key={role}>
            <span>ACCESS</span>
            <h3>{role}</h3>
            <p>{permissions.length} platform permissions</p>
          </div>
        ))}
      </div>

      <div className="panel team-list">
        {members.map(([initials, name, role]) => (
          <div className="member-row" key={name}>
            <div className="member-avatar">{initials}</div>
            <div>
              <b>{name}</b>
              <span>{role}</span>
            </div>
            <StatusBadge type="connected">Active</StatusBadge>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("business");
  const [payment, setPayment] = useState("razorpay");

  const plans = [
    ["small", "Small", "₹20,999", "For growing businesses"],
    ["business", "Business", "₹69,999", "For revenue teams"],
    ["enterprise", "Enterprise", "₹99,999", "For enterprise operations"],
  ];

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">BILLING & PAYMENTS</span>
          <h1>Plans & payment methods</h1>
          <p>Choose a plan and configure your preferred payment method.</p>
        </div>
      </div>

      <div className="plans-grid">
        {plans.map(([id, name, price, description]) => (
          <button
            className={`plan-card ${selectedPlan === id ? "selected" : ""}`}
            key={id}
            onClick={() => setSelectedPlan(id)}
          >
            <span>{name}</span>
            <strong>{price}</strong>
            <small>/ month</small>
            <p>{description}</p>
            {selectedPlan === id && <b>Selected ✓</b>}
          </button>
        ))}
      </div>

      <div className="panel payment-panel">
        <span className="eyebrow">PAYMENT METHODS</span>
        <h2>Select payment method</h2>

        <div className="payment-grid">
          {paymentMethods.map((method) => (
            <button
              className={`payment-card ${
                payment === method.id ? "selected" : ""
              }`}
              key={method.id}
              onClick={() => setPayment(method.id)}
            >
              <PaymentLogo payment={method} />
              <div>
                <b>{method.name}</b>
                <span>{method.description}</span>
              </div>
              <i>{payment === method.id ? "✓" : "○"}</i>
            </button>
          ))}
        </div>

        <div className="payment-note">
          Razorpay, Stripe, PayPal, Google Pay, super.money, PhonePe, debit
          card and credit card can be presented in the payment layer. Actual
          payment processing requires the respective production backend
          integration.
        </div>
      </div>
    </div>
  );
}

function NotificationsPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">NOTIFICATIONS</span>
          <h1>Notifications</h1>
          <p>Configure how your team receives revenue leakage alerts.</p>
        </div>
      </div>

      <div className="panel settings-list">
        {[
          ["High priority leakage", "Immediate alert when a high-value signal appears."],
          ["Daily revenue summary", "Receive a daily overview of detected signals."],
          ["Integration health", "Get notified when a connected system stops responding."],
          ["Resolution updates", "Notify relevant team members when actions are completed."],
        ].map(([title, text]) => (
          <div className="setting-row" key={title}>
            <div>
              <b>{title}</b>
              <p>{text}</p>
            </div>
            <div className="toggle on">
              <i />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({ role }) {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ACCOUNT</span>
          <h1>Settings</h1>
          <p>Workspace and founder information.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="panel profile-panel">
          <div className="big-avatar">AM</div>
          <span className="eyebrow">FOUNDER</span>
          <h2>{FOUNDER}</h2>
          <p>Founder, {BRAND}</p>

          <div className="contact-box">
            <span>Phone</span>
            <b>{PHONE}</b>
            <span>Email</span>
            <b>{EMAIL}</b>
            <span>Access</span>
            <b>{role}</b>
          </div>
        </div>

        <div className="panel">
          <span className="eyebrow">WORKSPACE</span>
          <h2>{BRAND}</h2>

          <label className="field">
            Workspace name
            <input value={BRAND} readOnly />
          </label>

          <label className="field">
            Tagline
            <input value={TAGLINE} readOnly />
          </label>

          <label className="field">
            Founder
            <input value={FOUNDER} readOnly />
          </label>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [landing, setLanding] = useState(true);
  const [page, setPage] = useState("overview");
  const [role, setRole] = useState("Admin");
  const [collapsed, setCollapsed] = useState(false);
  const [connected, setConnected] = useState([
    "salesforce",
    "genesys",
    "whatsapp",
  ]);
  const [selectedLeak, setSelectedLeak] = useState(leaks[0]);
  const [resolved, setResolved] = useState(false);

  if (landing) {
    return <LandingPage onStart={() => setLanding(false)} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        role={role}
      />

      <div className="main-area">
        <Topbar role={role} setRole={setRole} setPage={setPage} />

        <main className="content">
          {page === "overview" && (
            <OverviewPage
              setPage={setPage}
              setSelectedLeak={setSelectedLeak}
            />
          )}

          {page === "leaks" && (
            <LeaksPage
              setPage={setPage}
              setSelectedLeak={setSelectedLeak}
            />
          )}

          {page === "investigation" && (
            <InvestigationPage
              selectedLeak={selectedLeak}
              resolved={resolved}
              setResolved={setResolved}
              setPage={setPage}
            />
          )}

          {page === "integrations" && (
            <IntegrationsPage
              connected={connected}
              setConnected={setConnected}
              setPage={setPage}
            />
          )}

          {page === "analytics" && <AnalyticsPage />}

          {page === "actions" && <ActionsPage />}

          {page === "team" && <TeamPage />}

          {page === "billing" && <BillingPage />}

          {page === "notifications" && <NotificationsPage />}

          {page === "settings" && <SettingsPage role={role} />}
        </main>

        <footer className="app-footer">
          <div>
            <b>{BRAND}</b>
            <span> · {TAGLINE}</span>
          </div>

          <div>
            <b>{FOUNDER}</b>
            <span> · {PHONE}</span>
            <span> · {EMAIL}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;