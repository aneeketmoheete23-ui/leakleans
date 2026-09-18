import React, { useMemo, useState } from "react";

/* =========================================================
   AI REVENUE LEAK DETECTOR
   Founder: ANIKET MOHITE
   ========================================================= */

const BRAND = "AI Revenue Leak Detector";
const TAGLINE = "Find Where Your Revenue Is Leaking.";
const FOUNDER = "ANIKET MOHITE";
const PHONE = "8698382024";
const EMAIL = "Aniket.Mohite@supportleaklens.com";

/* =========================================================
   LOGO COMPONENT
   ========================================================= */

function BrandMark({ small = false }) {
  return (
    <div className={`brand-mark ${small ? "small" : ""}`}>
      <span className="brand-mark-main">AI</span>
      <span className="brand-mark-signal" />
    </div>
  );
}

function IntegrationLogo({ system, large = false }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`integration-fallback ${large ? "large" : ""}`}>
        {system.short}
      </div>
    );
  }

  return (
    <div className={`integration-logo ${large ? "large" : ""}`}>
      <img
        src={system.logo}
        alt={`${system.name} logo`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/* =========================================================
   DATA
   ========================================================= */

const systems = [
  {
    id: "salesforce",
    name: "Salesforce",
    short: "SF",
    category: "CRM",
    description: "Leads, opportunities, accounts, activities and pipeline data.",
    logo: "https://cdn.simpleicons.org/salesforce",
    colorClass: "salesforce",
    fields: [
      ["Instance URL", "text", "https://yourcompany.my.salesforce.com"],
      ["Client ID", "text", "Enter Salesforce client ID"],
      ["Client Secret", "password", "Enter Salesforce client secret"],
    ],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    short: "WA",
    category: "Messaging",
    description: "Business conversations, customer messages and response activity.",
    logo: "https://cdn.simpleicons.org/whatsapp",
    colorClass: "whatsapp",
    fields: [
      ["Business Account ID", "text", "Enter WhatsApp Business Account ID"],
      ["Phone Number ID", "text", "Enter phone number ID"],
      ["Access Token", "password", "Enter secure access token"],
    ],
  },
  {
    id: "genesys",
    name: "Genesys",
    short: "GX",
    category: "Contact Center",
    description: "Calls, queues, agents, interactions and customer journeys.",
    logo: "https://cdn.simpleicons.org/genesys",
    colorClass: "genesys",
    fields: [
      ["Region", "text", "e.g. mypurecloud.com"],
      ["Client ID", "text", "Enter Genesys client ID"],
      ["Client Secret", "password", "Enter Genesys client secret"],
    ],
  },
  {
    id: "avaya",
    name: "Avaya",
    short: "AV",
    category: "Contact Center",
    description: "Call activity, agent performance and customer interactions.",
    logo: "https://cdn.simpleicons.org/avaya",
    colorClass: "avaya",
    fields: [
      ["Base URL", "text", "https://your-avaya-instance"],
      ["Tenant ID", "text", "Enter tenant ID"],
      ["Client ID", "text", "Enter client ID"],
      ["Client Secret", "password", "Enter client secret"],
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    short: "HS",
    category: "CRM",
    description: "Contacts, deals, sales activities and customer lifecycle data.",
    logo: "https://cdn.simpleicons.org/hubspot",
    colorClass: "hubspot",
    fields: [
      ["Portal ID", "text", "Enter HubSpot portal ID"],
      ["Private App Token", "password", "Enter private app token"],
    ],
  },
  {
    id: "gmail",
    name: "Gmail / Google Workspace",
    short: "GM",
    category: "Email",
    description: "Business email activity, response times and customer conversations.",
    logo: "https://cdn.simpleicons.org/gmail",
    colorClass: "gmail",
    fields: [
      ["Workspace Email", "email", "name@company.com"],
      ["OAuth Client ID", "text", "Enter Google OAuth client ID"],
      ["Client Secret", "password", "Enter Google client secret"],
    ],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    short: "ZD",
    category: "Support",
    description: "Tickets, customer complaints, response times and support workflows.",
    logo: "https://cdn.simpleicons.org/zendesk",
    colorClass: "zendesk",
    fields: [
      ["Subdomain", "text", "yourcompany.zendesk.com"],
      ["Admin Email", "email", "admin@company.com"],
      ["API Token", "password", "Enter Zendesk API token"],
    ],
  },
  {
    id: "custom",
    name: "Custom CRM",
    short: "CRM",
    category: "Custom",
    description: "Connect another business system through a secure API.",
    logo: "",
    colorClass: "custom",
    fields: [
      ["API Base URL", "text", "https://api.yourcompany.com"],
      ["API Key", "password", "Enter API key"],
      ["Data Format", "text", "JSON / REST"],
    ],
  },
];

const plans = [
  {
    id: "small",
    name: "Small",
    price: "₹20,999",
    period: "/month",
    description: "For smaller teams starting revenue-leak monitoring.",
    features: [
      "Revenue leak detection",
      "Basic investigations",
      "Core integrations",
      "Leak alerts",
      "Monthly intelligence report",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "₹69,999",
    period: "/month",
    description: "For growing organizations with multiple teams and systems.",
    features: [
      "Everything in Small",
      "Advanced investigations",
      "Multi-system intelligence",
      "Team workflows",
      "Advanced analytics",
      "Action recommendations",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹99,999",
    period: "/month",
    description: "For organizations requiring deeper intelligence and control.",
    features: [
      "Everything in Business",
      "Enterprise integrations",
      "Advanced access controls",
      "Project Head controls",
      "Priority support",
      "Custom intelligence workflows",
    ],
  },
];

const paymentMethods = [
  {
    id: "razorpay",
    name: "Razorpay",
    description: "India payments",
    logo: "https://cdn.simpleicons.org/razorpay",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "International payments",
    logo: "https://cdn.simpleicons.org/stripe",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "International payments",
    logo: "https://cdn.simpleicons.org/paypal",
  },
  {
    id: "gpay",
    name: "GPay",
    description: "UPI",
    logo: "https://cdn.simpleicons.org/googlepay",
  },
  {
    id: "supermoney",
    name: "super.money",
    description: "UPI",
    logo: "",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    description: "UPI",
    logo: "https://cdn.simpleicons.org/phonepe",
  },
  {
    id: "debit",
    name: "Debit Card",
    description: "Card payment",
    logo: "",
  },
  {
    id: "credit",
    name: "Credit Card",
    description: "Card payment",
    logo: "",
  },
];

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    source: "Salesforce",
    status: "High",
    amount: "₹1,48,000",
    amountNumber: 148000,
    age: "2 hours ago",
    description:
      "A qualified customer enquiry reached sales but no follow-up activity was recorded.",
    cause: "Possible workflow handoff gap between lead assignment and sales follow-up.",
    resolution:
      "Assign the lead to the responsible sales representative and trigger a follow-up reminder.",
  },
  {
    id: 2,
    title: "Missed Inbound Calls",
    source: "Genesys",
    status: "High",
    amount: "₹86,000",
    amountNumber: 86000,
    age: "4 hours ago",
    description:
      "Multiple inbound customer calls were not connected to an available agent.",
    cause: "Possible queue capacity or staffing gap during the identified time window.",
    resolution:
      "Review queue coverage and route missed callers into a priority callback workflow.",
  },
  {
    id: 3,
    title: "Quote-to-Order Drop",
    source: "CRM + Sales",
    status: "Medium",
    amount: "₹2,14,000",
    amountNumber: 214000,
    age: "Today",
    description:
      "Several quotations were created but did not progress toward an order.",
    cause: "Potential pricing, follow-up or approval delay after quotation creation.",
    resolution:
      "Review affected quotes and create targeted follow-up tasks for the responsible team.",
  },
  {
    id: 4,
    title: "Delayed Response",
    source: "Gmail",
    status: "Medium",
    amount: "₹64,000",
    amountNumber: 64000,
    age: "Today",
    description:
      "Customer enquiries exceeded the configured response-time threshold.",
    cause: "Potential response workflow delay.",
    resolution:
      "Route delayed conversations to the responsible team and create response alerts.",
  },
  {
    id: 5,
    title: "Repeated Complaint Loop",
    source: "Zendesk",
    status: "Low",
    amount: "₹39,000",
    amountNumber: 39000,
    age: "Yesterday",
    description:
      "A customer has contacted support repeatedly without a clear resolution event.",
    cause: "Possible escalation or ownership gap.",
    resolution:
      "Escalate the case to a senior owner and monitor the resolution journey.",
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
  Admin: {
    label: "Full workspace access",
    permissions: [
      "View all revenue leaks",
      "Investigate all records",
      "Manage integrations",
      "Manage team and roles",
      "Manage billing and payments",
      "Configure workspace settings",
      "Execute approved actions",
    ],
  },
  Manager: {
    label: "Team and operational access",
    permissions: [
      "View team revenue leaks",
      "Investigate assigned leaks",
      "View integrations",
      "Manage operational actions",
      "View analytics",
      "Manage team workflows",
    ],
  },
  "Project Head": {
    label: "Project-level access",
    permissions: [
      "View project revenue leaks",
      "Investigate project issues",
      "View analytics",
      "Approve project actions",
      "View connected systems",
      "Monitor project performance",
    ],
  },
  "Team Member": {
    label: "Assigned work access",
    permissions: [
      "View assigned leaks",
      "Investigate assigned records",
      "Complete assigned actions",
      "Receive notifications",
      "View limited analytics",
    ],
  },
};

/* =========================================================
   GENERIC UI
   ========================================================= */

function Modal({ title, subtitle, children, onClose, wide = false }) {
  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className={`modal-card ${wide ? "modal-wide" : ""}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="icon-close" onClick={onClose}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, helper, trend, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-icon">{icon}</span>
        {trend && <span className="stat-trend">{trend}</span>}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {helper && <div className="stat-helper">{helper}</div>}
    </div>
  );
}

function StatusBadge({ status }) {
  const cls =
    status === "High"
      ? "danger"
      : status === "Medium"
      ? "warning"
      : status === "Resolved"
      ? "success"
      : "neutral";

  return <span className={`status-badge ${cls}`}>{status}</span>;
}

/* =========================================================
   LANDING PAGE
   ========================================================= */

function LandingPage({ onStart }) {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-brand">
          <BrandMark />
          <div>
            <div className="brand-name">{BRAND}</div>
            <div className="brand-mini">Revenue Intelligence Platform</div>
          </div>
        </div>

        <div className="founder-header-card">
          <div className="founder-header-name">{FOUNDER}</div>
          <div className="founder-header-role">Founder, AI Revenue Leak Detector</div>
          <div className="founder-header-contact">
            <span>{PHONE}</span>
            <span>{EMAIL}</span>
          </div>
        </div>

        <button className="header-cta" onClick={onStart}>
          Open Platform
        </button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="hero-pill">
              <span className="pulse-dot" />
              AI-powered revenue intelligence
            </div>

            <h1>
              Find Where Your
              <span> Revenue Is Leaking.</span>
            </h1>

            <p className="hero-description">
              AI Revenue Leak Detector connects to the systems your business
              already uses, detects revenue leakage hiding between them,
              explains why it happened, and helps your team resolve it.
            </p>

            <div className="hero-actions">
              <button className="primary-button large-button" onClick={onStart}>
                Start Leak Detection
                <span>→</span>
              </button>

              <button
                className="secondary-button large-button"
                onClick={() =>
                  document
                    .getElementById("integrations-preview")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Integrations
              </button>
            </div>

            <div className="hero-trust">
              <div>
                <strong>8+</strong>
                <span>Business systems</span>
              </div>
              <div>
                <strong>6</strong>
                <span>Intelligence stages</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Monitoring concept</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />

            <div className="hero-dashboard-card">
              <div className="mini-dashboard-top">
                <div>
                  <span className="mini-label">Revenue intelligence</span>
                  <strong>Live Leak Monitor</strong>
                </div>
                <span className="live-chip">
                  <i /> Monitoring
                </span>
              </div>

              <div className="hero-money">
                <span>Potential revenue at risk</span>
                <strong>₹5,51,000</strong>
              </div>

              <div className="hero-bars">
                <div>
                  <span>Follow-up</span>
                  <b style={{ width: "82%" }} />
                  <strong>₹1.48L</strong>
                </div>
                <div>
                  <span>Quote drop</span>
                  <b style={{ width: "68%" }} />
                  <strong>₹2.14L</strong>
                </div>
                <div>
                  <span>Missed calls</span>
                  <b style={{ width: "48%" }} />
                  <strong>₹86K</strong>
                </div>
              </div>

              <div className="hero-detection">
                <div className="detection-icon">AI</div>
                <div>
                  <strong>Leak detected</strong>
                  <span>Follow-up failure across CRM workflow</span>
                </div>
                <span className="arrow-small">→</span>
              </div>
            </div>
          </div>
        </section>

        <section className="founder-showcase">
          <div className="founder-avatar">AM</div>
          <div className="founder-showcase-text">
            <span className="eyebrow">FOUNDER & CONTACT</span>
            <h2>{FOUNDER}</h2>
            <p>Founder, AI Revenue Leak Detector</p>
          </div>
          <div className="founder-contact-large">
            <div>
              <span>Phone</span>
              <strong>{PHONE}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{EMAIL}</strong>
            </div>
          </div>
        </section>

        <section className="problem-section">
          <div className="center-heading">
            <div className="eyebrow">THE PROBLEM</div>
            <h2>Your revenue can leak between systems.</h2>
            <p>
              A customer can enquire in one system, call through another,
              receive a quote somewhere else, and then disappear because no
              single system sees the complete journey.
            </p>
          </div>

          <div className="system-flow">
            <div className="flow-system">
              <span>CRM</span>
              <strong>Customer enquiry</strong>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-system">
              <span>CALLS</span>
              <strong>Sales conversation</strong>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-system">
              <span>SALES</span>
              <strong>Quote created</strong>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-system leak-flow">
              <span>LEAK</span>
              <strong>No follow-up</strong>
            </div>
          </div>
        </section>

        <section className="process-section">
          <div className="center-heading">
            <div className="eyebrow">HOW IT WORKS</div>
            <h2>From signal to resolution.</h2>
          </div>

          <div className="process-grid">
            {[
              ["01", "Detect", "Find unusual patterns, gaps and missed opportunities."],
              ["02", "Investigate", "Trace the customer journey across connected systems."],
              ["03", "Explain", "Show probable cause and business impact."],
              ["04", "Resolve", "Recommend the next operational action."],
              ["05", "Prevent", "Create workflows that reduce repeat leakage."],
              ["06", "Measure", "Track recovered value and improvement."],
            ].map(([number, title, text]) => (
              <div className="process-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="integrations-preview" className="integrations-preview">
          <div className="center-heading">
            <div className="eyebrow">CONNECT YOUR BUSINESS</div>
            <h2>Works with the systems you already use.</h2>
            <p>
              Connect automatically where supported or enter secure connection
              details manually.
            </p>
          </div>

          <div className="logo-preview-grid">
            {systems.map((system) => (
              <div className="logo-preview-card" key={system.id}>
                {system.logo ? (
                  <IntegrationLogo system={system} large />
                ) : (
                  <div className="integration-fallback large">{system.short}</div>
                )}
                <span>{system.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pricing-preview">
          <div className="center-heading">
            <div className="eyebrow">PLANS</div>
            <h2>Choose the intelligence layer your business needs.</h2>
          </div>

          <div className="landing-pricing-grid">
            {plans.map((plan) => (
              <div
                className={`landing-price-card ${
                  plan.popular ? "featured" : ""
                }`}
                key={plan.id}
              >
                {plan.popular && <span className="popular-ribbon">POPULAR</span>}
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div className="landing-price">
                  {plan.price}
                  <small>{plan.period}</small>
                </div>
                <ul>
                  {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature}>
                      <span>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-final-cta">
          <div>
            <span className="eyebrow">AI REVENUE LEAK DETECTOR</span>
            <h2>Stop looking only at reports. Find the leakage.</h2>
            <p>
              Bring your existing systems together and turn disconnected
              signals into actionable revenue intelligence.
            </p>
          </div>
          <button className="primary-button large-button" onClick={onStart}>
            Enter Platform →
          </button>
        </section>
      </main>

      <footer className="landing-footer">
        <div>
          <BrandMark small />
          <strong>{BRAND}</strong>
        </div>
        <div className="footer-founder">
          <strong>{FOUNDER}</strong>
          <span>Founder</span>
        </div>
        <div className="footer-contact">
          <span>{PHONE}</span>
          <span>{EMAIL}</span>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function Sidebar({ page, setPage, collapsed, setCollapsed, role }) {
  const canSee = (id) => {
    if (role === "Team Member") {
      return [
        "overview",
        "leaks",
        "investigation",
        "analytics",
        "actions",
        "notifications",
      ].includes(id);
    }

    if (role === "Project Head") {
      return [
        "overview",
        "leaks",
        "investigation",
        "integrations",
        "analytics",
        "actions",
        "team",
        "notifications",
        "settings",
      ].includes(id);
    }

    return true;
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <BrandMark small />
        {!collapsed && (
          <div>
            <strong>AI Revenue</strong>
            <span>Leak Detector</span>
          </div>
        )}
      </div>

      <button
        className="sidebar-collapse"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand menu" : "Collapse menu"}
      >
        {collapsed ? "→" : "←"}
      </button>

      <div className="role-mini-card">
        <div className="role-avatar">{role.charAt(0)}</div>
        {!collapsed && (
          <div>
            <span>Current access</span>
            <strong>{role}</strong>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div className="nav-group" key={group.title}>
            {!collapsed && <div className="nav-group-title">{group.title}</div>}

            {group.items
              .filter(([id]) => canSee(id))
              .map(([id, label]) => (
                <button
                  key={id}
                  className={`nav-item ${page === id ? "active" : ""}`}
                  onClick={() => setPage(id)}
                  title={label}
                >
                  <span className={`nav-symbol symbol-${id}`}>
                    {id === "overview" && "⌂"}
                    {id === "leaks" && "◉"}
                    {id === "investigation" && "⌕"}
                    {id === "integrations" && "⌘"}
                    {id === "analytics" && "▥"}
                    {id === "actions" && "✓"}
                    {id === "team" && "♙"}
                    {id === "billing" && "₹"}
                    {id === "notifications" && "◌"}
                    {id === "settings" && "⚙"}
                  </span>
                  {!collapsed && <span>{label}</span>}
                </button>
              ))}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-founder">
          <div className="sidebar-founder-label">FOUNDER</div>
          <strong>{FOUNDER}</strong>
          <span>{PHONE}</span>
          <span>{EMAIL}</span>
        </div>
      )}
    </aside>
  );
}

/* =========================================================
   TOPBAR
   ========================================================= */

function Topbar({ role, setRole, setPage }) {
  return (
    <header className="app-topbar">
      <div className="breadcrumb">
        <span>AI Revenue Leak Detector</span>
        <b>/</b>
        <strong>Intelligence Workspace</strong>
      </div>

      <div className="topbar-actions">
        <button
          className="topbar-icon-button"
          onClick={() => setPage("notifications")}
          title="Notifications"
        >
          ◌
          <i />
        </button>

        <div className="role-switcher">
          <span>Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {Object.keys(rolePermissions).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="topbar-user">
          <div className="topbar-avatar">AM</div>
          <div>
            <strong>{FOUNDER}</strong>
            <span>{role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   OVERVIEW
   ========================================================= */

function OverviewPage({ setPage, setSelectedLeak }) {
  const total = leaks.reduce((sum, item) => sum + item.amountNumber, 0);

  return (
    <div className="page">
      <SectionHeading
        eyebrow="OVERVIEW"
        title="Revenue Intelligence"
        description="Monitor revenue leakage signals across your connected business systems."
        action={
          <button
            className="primary-button"
            onClick={() => setPage("integrations")}
          >
            + Connect System
          </button>
        }
      />

      <div className="welcome-banner">
        <div>
          <span className="eyebrow">AI REVENUE LEAK DETECTOR</span>
          <h2>Your intelligence layer is ready.</h2>
          <p>
            Detect signals across CRM, calls, messages, support and sales
            workflows.
          </p>
        </div>
        <div className="welcome-stat">
          <span>Potential value identified</span>
          <strong>₹{total.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Potential Revenue at Risk"
          value="₹5,51,000"
          helper="Across detected leakage signals"
          trend="+18.4%"
          icon="₹"
        />
        <StatCard
          label="Active Revenue Leaks"
          value="12"
          helper="Requires investigation"
          trend="+3 today"
          icon="◉"
        />
        <StatCard
          label="Connected Systems"
          value="6"
          helper="Data sources monitored"
          trend="Healthy"
          icon="⌘"
        />
        <StatCard
          label="Resolved This Month"
          value="₹2,84,000"
          helper="Potential value recovered"
          trend="+24.7%"
          icon="✓"
        />
      </div>

      <div className="content-grid two-thirds">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Revenue leak signals</h3>
              <p>Latest high-impact detections.</p>
            </div>
            <button className="text-button" onClick={() => setPage("leaks")}>
              View all →
            </button>
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
                <div className="leak-row-icon">
                  {leak.status === "High" ? "!" : "◉"}
                </div>
                <div className="leak-row-main">
                  <strong>{leak.title}</strong>
                  <span>
                    {leak.source} · {leak.age}
                  </span>
                </div>
                <div className="leak-row-value">
                  <strong>{leak.amount}</strong>
                  <StatusBadge status={leak.status} />
                </div>
                <span className="row-arrow">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Leak categories</h3>
              <p>Current signal distribution.</p>
            </div>
          </div>

          <div className="category-bars">
            <div className="category-bar">
              <div>
                <span>Follow-up</span>
                <strong>34%</strong>
              </div>
              <b style={{ width: "84%" }} />
            </div>
            <div className="category-bar">
              <div>
                <span>Sales conversion</span>
                <strong>27%</strong>
              </div>
              <b style={{ width: "67%" }} />
            </div>
            <div className="category-bar">
              <div>
                <span>Customer response</span>
                <strong>21%</strong>
              </div>
              <b style={{ width: "52%" }} />
            </div>
            <div className="category-bar">
              <div>
                <span>Support workflow</span>
                <strong>18%</strong>
              </div>
              <b style={{ width: "44%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="content-grid three">
        <div className="mini-info-card">
          <span className="mini-card-icon">01</span>
          <strong>Detect</strong>
          <p>AI identifies unusual revenue signals.</p>
        </div>
        <div className="mini-info-card">
          <span className="mini-card-icon">02</span>
          <strong>Investigate</strong>
          <p>Trace the journey across connected systems.</p>
        </div>
        <div className="mini-info-card">
          <span className="mini-card-icon">03</span>
          <strong>Resolve</strong>
          <p>Turn findings into operational actions.</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LEAKS PAGE
   ========================================================= */

function LeaksPage({ setSelectedLeak, setPage }) {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? leaks : leaks.filter((item) => item.status === filter);

  return (
    <div className="page">
      <SectionHeading
        eyebrow="REVENUE LEAKS"
        title="Detected Revenue Leakage"
        description="Signals identified across your business workflows."
        action={
          <div className="filter-group">
            {["All", "High", "Medium", "Low"].map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        }
      />

      <div className="leak-table-panel panel">
        <div className="table-header">
          <span>Revenue leak</span>
          <span>Source</span>
          <span>Potential value</span>
          <span>Priority</span>
          <span>Detected</span>
          <span />
        </div>

        {filtered.map((leak) => (
          <div className="table-row" key={leak.id}>
            <div>
              <strong>{leak.title}</strong>
              <span>{leak.description}</span>
            </div>
            <span>{leak.source}</span>
            <strong>{leak.amount}</strong>
            <StatusBadge status={leak.status} />
            <span>{leak.age}</span>
            <button
              className="small-action"
              onClick={() => {
                setSelectedLeak(leak);
                setPage("investigation");
              }}
            >
              Investigate →
            </button>
          </div>
        ))}
      </div>

      <div className="info-strip">
        <div className="info-strip-icon">AI</div>
        <div>
          <strong>Why these are called “potential” leaks</strong>
          <p>
            AI Revenue Leak Detector identifies patterns and signals that may
            represent lost revenue. Your team should validate the underlying
            business event before taking action.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INVESTIGATION PAGE
   ========================================================= */

function InvestigationPage({
  selectedLeak,
  setSelectedLeak,
  resolved,
  setResolved,
}) {
  const leak = selectedLeak || leaks[0];

  return (
    <div className="page">
      <SectionHeading
        eyebrow="INVESTIGATION"
        title="Investigate a Revenue Leak"
        description="Understand what happened, why it may have happened and what can be done next."
        action={
          <button
            className="secondary-button"
            onClick={() => setSelectedLeak(null)}
          >
            Reset Selection
          </button>
        }
      />

      <div className="investigation-hero panel">
        <div className="investigation-title-area">
          <div className="large-leak-icon">
            {resolved ? "✓" : "!"}
          </div>
          <div>
            <div className="investigation-label">
              {resolved ? "RESOLVED" : "POTENTIAL REVENUE LEAK"}
            </div>
            <h2>{leak.title}</h2>
            <p>
              {leak.source} · Detected {leak.age}
            </p>
          </div>
        </div>

        <div className="investigation-value">
          <span>Potential impact</span>
          <strong>{leak.amount}</strong>
          <StatusBadge status={resolved ? "Resolved" : leak.status} />
        </div>
      </div>

      <div className="investigation-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Customer journey signal</h3>
              <p>How the event appears across systems.</p>
            </div>
          </div>

          <div className="journey">
            <div className="journey-item complete">
              <span>1</span>
              <div>
                <strong>Customer enquiry</strong>
                <small>Lead/customer signal detected</small>
              </div>
            </div>
            <div className="journey-line" />
            <div className="journey-item complete">
              <span>2</span>
              <div>
                <strong>Business interaction</strong>
                <small>Activity recorded in {leak.source}</small>
              </div>
            </div>
            <div className="journey-line" />
            <div className={`journey-item ${resolved ? "complete" : "warning"}`}>
              <span>3</span>
              <div>
                <strong>Workflow gap</strong>
                <small>{leak.cause}</small>
              </div>
            </div>
            <div className="journey-line" />
            <div className="journey-item">
              <span>4</span>
              <div>
                <strong>Resolution</strong>
                <small>Recommended action below</small>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>AI investigation</h3>
              <p>Evidence-based interpretation.</p>
            </div>
          </div>

          <div className="explanation-block">
            <span>PROBABLE CAUSE</span>
            <strong>{leak.cause}</strong>
          </div>

          <div className="explanation-block">
            <span>BUSINESS IMPACT</span>
            <strong>
              {leak.amount} is currently identified as potential value at risk.
            </strong>
          </div>

          <div className="explanation-block">
            <span>RECOMMENDED RESOLUTION</span>
            <strong>{leak.resolution}</strong>
          </div>

          <div className="action-box">
            <div>
              <span>Next recommended action</span>
              <strong>
                {resolved ? "Resolution recorded" : "Start resolution workflow"}
              </strong>
            </div>

            <button
              className={resolved ? "success-button" : "primary-button"}
              onClick={() => setResolved(!resolved)}
            >
              {resolved ? "Resolved ✓" : "Resolve Leak"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INTEGRATIONS
   ========================================================= */

function IntegrationsPage({
  connected,
  setConnected,
  setSelectedSystem,
  setConnectionMode,
}) {
  return (
    <div className="page">
      <SectionHeading
        eyebrow="INTEGRATIONS"
        title="Connect Your Existing Systems"
        description="AI Revenue Leak Detector sits on top of your existing CRM, contact-center, messaging and support systems."
      />

      <div className="security-banner">
        <div className="security-icon">🔐</div>
        <div>
          <strong>Secure connection model</strong>
          <p>
            In production, customers should authorize supported systems through
            OAuth or approved API credentials. CRM passwords should not be
            collected by this application.
          </p>
        </div>
      </div>

      <div className="integration-grid">
        {systems.map((system) => (
          <IntegrationCard
            key={system.id}
            system={system}
            isConnected={connected.includes(system.id)}
            onConnect={(mode) => {
              setSelectedSystem(system);
              setConnectionMode(mode);
            }}
            onDisconnect={() =>
              setConnected((items) => items.filter((id) => id !== system.id))
            }
          />
        ))}
      </div>
    </div>
  );
}

function IntegrationCard({
  system,
  isConnected,
  onConnect,
  onDisconnect,
}) {
  return (
    <div className={`integration-card ${isConnected ? "connected" : ""}`}>
      <div className="integration-card-top">
        {system.logo ? (
          <IntegrationLogo system={system} large />
        ) : (
          <div className="integration-fallback large">{system.short}</div>
        )}

        <div className="integration-title">
          <h3>{system.name}</h3>
          <span>{system.category}</span>
        </div>

        {isConnected && <span className="connected-pill">Connected</span>}
      </div>

      <p>{system.description}</p>

      <div className="integration-actions">
        {isConnected ? (
          <button className="disconnect-button" onClick={onDisconnect}>
            Disconnect
          </button>
        ) : (
          <>
            <button
              className="primary-button"
              onClick={() => onConnect("automatic")}
            >
              ⚡ Connect Automatically
            </button>
            <button
              className="manual-button"
              onClick={() => onConnect("manual")}
            >
              🔑 Enter Manually
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   ANALYTICS
   ========================================================= */

function AnalyticsPage() {
  return (
    <div className="page">
      <SectionHeading
        eyebrow="ANALYTICS"
        title="Revenue Leakage Analytics"
        description="Understand where leakage is occurring and how the pattern changes over time."
      />

      <div className="stats-grid">
        <StatCard
          label="Potential Value Detected"
          value="₹12.8L"
          helper="Last 30 days"
          trend="+12.6%"
          icon="₹"
        />
        <StatCard
          label="Potential Value Resolved"
          value="₹6.4L"
          helper="Last 30 days"
          trend="+19.2%"
          icon="✓"
        />
        <StatCard
          label="Average Resolution Time"
          value="6.8h"
          helper="Across tracked leaks"
          trend="-14.2%"
          icon="◷"
        />
        <StatCard
          label="Detection Coverage"
          value="78%"
          helper="Connected system activity"
          trend="+8.1%"
          icon="◎"
        />
      </div>

      <div className="analytics-grid">
        <div className="panel large-panel">
          <div className="panel-heading">
            <div>
              <h3>Potential leakage trend</h3>
              <p>Illustrative intelligence data.</p>
            </div>
            <span className="period-chip">Last 30 days</span>
          </div>

          <div className="chart-area">
            <div className="chart-y">
              <span>₹5L</span>
              <span>₹4L</span>
              <span>₹3L</span>
              <span>₹2L</span>
              <span>₹1L</span>
              <span>₹0</span>
            </div>
            <div className="chart-main">
              <div className="chart-lines">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <span key={item} />
                ))}
              </div>
              <div className="chart-bars">
                {[34, 48, 42, 64, 57, 76, 69, 82, 62, 88, 73, 94].map(
                  (height, index) => (
                    <div key={index} style={{ height: `${height}%` }}>
                      <b />
                    </div>
                  )
                )}
              </div>
              <div className="chart-x">
                <span>W1</span>
                <span>W2</span>
                <span>W3</span>
                <span>W4</span>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Leak source mix</h3>
              <p>Where signals originate.</p>
            </div>
          </div>

          <div className="source-list">
            {[
              ["CRM", "36%", "blue"],
              ["Contact Center", "24%", "dark"],
              ["Messaging", "18%", "mid"],
              ["Support", "13%", "light"],
              ["Email", "9%", "pale"],
            ].map(([name, percentage, type]) => (
              <div className="source-item" key={name}>
                <div>
                  <span className={`source-dot ${type}`} />
                  <strong>{name}</strong>
                </div>
                <span>{percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ACTIONS
   ========================================================= */

function ActionsPage() {
  const [actions, setActions] = useState([
    {
      id: 1,
      title: "Assign follow-up to Sales Team",
      leak: "Follow-up Failure",
      owner: "Sales Team",
      status: "Pending approval",
    },
    {
      id: 2,
      title: "Create callback workflow",
      leak: "Missed Inbound Calls",
      owner: "Contact Center",
      status: "Recommended",
    },
    {
      id: 3,
      title: "Escalate repeated complaint",
      leak: "Repeated Complaint Loop",
      owner: "Support Lead",
      status: "In progress",
    },
  ]);

  const approve = (id) => {
    setActions((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  return (
    <div className="page">
      <SectionHeading
        eyebrow="ACTIONS"
        title="Resolution Actions"
        description="Recommended and approved actions generated from revenue-leak investigations."
      />

      <div className="action-list-panel panel">
        {actions.map((action) => (
          <div className="action-row" key={action.id}>
            <div className="action-number">{String(action.id).padStart(2, "0")}</div>
            <div className="action-main">
              <strong>{action.title}</strong>
              <span>
                {action.leak} · Owner: {action.owner}
              </span>
            </div>
            <span
              className={`action-status ${
                action.status === "Approved" ? "approved" : ""
              }`}
            >
              {action.status}
            </span>
            <button
              className="small-action"
              onClick={() => approve(action.id)}
              disabled={action.status === "Approved"}
            >
              {action.status === "Approved" ? "Approved ✓" : "Approve"}
            </button>
          </div>
        ))}
      </div>

      <div className="automation-note">
        <div className="automation-note-icon">AI</div>
        <div>
          <h3>Agents can execute permitted actions</h3>
          <p>
            In a production version, approved AI agents can perform configured
            actions through connected APIs. Every action should have permission,
            audit and rollback controls.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TEAM
   ========================================================= */

function TeamPage({ role }) {
  const members = [
    ["AM", "ANIKET MOHITE", "Admin", "All workspace"],
    ["RS", "Rahul Sharma", "Manager", "Sales"],
    ["PK", "Priya Kulkarni", "Project Head", "Project Alpha"],
    ["VK", "Vikas Patil", "Team Member", "Sales Operations"],
    ["NS", "Neha Shah", "Team Member", "Customer Support"],
  ];

  return (
    <div className="page">
      <SectionHeading
        eyebrow="TEAM & ACCESS"
        title="People and Permissions"
        description="Different roles can have different access to revenue intelligence, actions and workspace controls."
        action={
          role === "Admin" ? (
            <button className="primary-button">+ Invite Member</button>
          ) : null
        }
      />

      <div className="role-access-grid">
        {Object.entries(rolePermissions).map(([name, details]) => (
          <div className="role-card" key={name}>
            <div className="role-card-top">
              <div className="role-large-avatar">{name.charAt(0)}</div>
              <div>
                <h3>{name}</h3>
                <span>{details.label}</span>
              </div>
            </div>

            <ul>
              {details.permissions.slice(0, 4).map((permission) => (
                <li key={permission}>✓ {permission}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="panel team-table">
        <div className="table-header">
          <span>Member</span>
          <span>Role</span>
          <span>Workspace access</span>
          <span>Status</span>
          <span />
        </div>

        {members.map(([initials, name, memberRole, access]) => (
          <div className="table-row" key={name}>
            <div className="member-cell">
              <div className="member-avatar">{initials}</div>
              <strong>{name}</strong>
            </div>
            <span>{memberRole}</span>
            <span>{access}</span>
            <span className="member-online">Active</span>
            <button className="small-action">View access</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   BILLING
   ========================================================= */

function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("business");
  const [selectedPayment, setSelectedPayment] = useState("razorpay");
  const [showPayment, setShowPayment] = useState(false);

  const plan = plans.find((item) => item.id === selectedPlan);
  const payment = paymentMethods.find((item) => item.id === selectedPayment);

  return (
    <div className="page">
      <SectionHeading
        eyebrow="BILLING & PAYMENTS"
        title="Subscription & Payments"
        description="Select a plan and configure your preferred payment method."
      />

      <div className="billing-status">
        <div className="billing-status-left">
          <span className="status-dot" />
          <div>
            <span>Current subscription</span>
            <strong>Business Plan</strong>
          </div>
        </div>
        <div>
          <span>Next billing</span>
          <strong>Monthly</strong>
        </div>
        <div>
          <span>Status</span>
          <strong className="active-text">Active</strong>
        </div>
      </div>

      <div className="billing-section">
        <div className="billing-section-heading">
          <h3>Choose your plan</h3>
          <p>Plans shown are the current product pricing configuration.</p>
        </div>

        <div className="plan-grid">
          {plans.map((item) => (
            <button
              key={item.id}
              className={`plan-card ${
                selectedPlan === item.id ? "selected" : ""
              }`}
              onClick={() => setSelectedPlan(item.id)}
            >
              {item.popular && <span className="plan-popular">Recommended</span>}
              <span className="plan-radio">
                {selectedPlan === item.id ? "✓" : ""}
              </span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <strong>
                {item.price}
                <small>{item.period}</small>
              </strong>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>

      <div className="billing-section">
        <div className="billing-section-heading">
          <h3>Payment methods</h3>
          <p>
            India and international payment options can be enabled according to
            gateway and merchant availability.
          </p>
        </div>

        <div className="payment-grid">
          {paymentMethods.map((method) => (
            <button
              className={`payment-card ${
                selectedPayment === method.id ? "selected" : ""
              }`}
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
            >
              <div className="payment-logo">
                {method.logo ? (
                  <img
                    src={method.logo}
                    alt={`${method.name} logo`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.classList.add("text-logo");
                    }}
                  />
                ) : (
                  <span>
                    {method.id === "debit"
                      ? "DB"
                      : method.id === "credit"
                      ? "CR"
                      : "UPI"}
                  </span>
                )}
              </div>
              <div>
                <strong>{method.name}</strong>
                <span>{method.description}</span>
              </div>
              <span className="payment-check">
                {selectedPayment === method.id ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="checkout-summary">
        <div>
          <span>Selected plan</span>
          <strong>
            {plan.name} · {plan.price}/month
          </strong>
        </div>
        <div>
          <span>Payment method</span>
          <strong>{payment.name}</strong>
        </div>
        <button className="primary-button large-button" onClick={() => setShowPayment(true)}>
          Continue to Payment →
        </button>
      </div>

      {showPayment && (
        <Modal
          title="Payment Setup"
          subtitle="This is a product UI demo. Live payment processing requires merchant and backend configuration."
          onClose={() => setShowPayment(false)}
        >
          <div className="payment-modal">
            <div className="payment-selected">
              <div className="payment-logo">
                {payment.logo ? (
                  <img src={payment.logo} alt={payment.name} />
                ) : (
                  <span>{payment.name.slice(0, 2)}</span>
                )}
              </div>
              <div>
                <span>Selected payment method</span>
                <strong>{payment.name}</strong>
              </div>
            </div>

            <div className="payment-summary">
              <span>{plan.name} Plan</span>
              <strong>
                {plan.price}
                <small>/month</small>
              </strong>
            </div>

            <div className="demo-notice">
              <strong>Demo mode</strong>
              <p>
                Connect Razorpay, Stripe or PayPal through a secure backend
                before accepting real customer payments.
              </p>
            </div>

            <button
              className="primary-button full-width"
              onClick={() => setShowPayment(false)}
            >
              Confirm Selection
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function NotificationsPage() {
  const notifications = [
    ["High", "New follow-up failure detected", "₹1,48,000 potential value", "2 hours ago"],
    ["High", "Missed inbound call pattern detected", "₹86,000 potential value", "4 hours ago"],
    ["Medium", "Quote-to-order drop identified", "₹2,14,000 potential value", "Today"],
    ["Info", "Salesforce connection healthy", "Data sync completed", "Today"],
    ["Info", "Weekly intelligence report ready", "Review workspace performance", "Yesterday"],
  ];

  return (
    <div className="page">
      <SectionHeading
        eyebrow="NOTIFICATIONS"
        title="Intelligence Alerts"
        description="Stay informed about new revenue-leak signals and workspace events."
      />

      <div className="notification-list panel">
        {notifications.map(([type, title, description, time], index) => (
          <div className="notification-row" key={`${title}-${index}`}>
            <div className={`notification-icon ${type.toLowerCase()}`}>
              {type === "High" ? "!" : type === "Medium" ? "◉" : "i"}
            </div>
            <div>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
            <time>{time}</time>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */

function SettingsPage({ role }) {
  const [settings, setSettings] = useState({
    monitoring: true,
    alerts: true,
    email: true,
    autoActions: false,
  });

  const toggle = (key) =>
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));

  return (
    <div className="page">
      <SectionHeading
        eyebrow="SETTINGS"
        title="Workspace Settings"
        description="Configure monitoring, alerts and operational behavior."
      />

      <div className="settings-grid">
        <div className="panel settings-panel">
          <div className="panel-heading">
            <div>
              <h3>Monitoring</h3>
              <p>Control intelligence monitoring behavior.</p>
            </div>
          </div>

          {[
            ["monitoring", "Revenue leak monitoring", "Continuously evaluate connected system signals."],
            ["alerts", "High-priority alerts", "Notify the responsible team when high-impact signals appear."],
            ["email", "Email notifications", "Send important intelligence alerts to workspace members."],
            ["autoActions", "Automated actions", "Allow configured workflows to execute approved actions."],
          ].map(([key, title, description]) => (
            <div className="setting-row" key={key}>
              <div>
                <strong>{title}</strong>
                <span>{description}</span>
              </div>
              <button
                className={`toggle ${settings[key] ? "on" : ""}`}
                onClick={() => toggle(key)}
              >
                <i />
              </button>
            </div>
          ))}
        </div>

        <div className="panel settings-panel">
          <div className="panel-heading">
            <div>
              <h3>Workspace information</h3>
              <p>Current product and owner details.</p>
            </div>
          </div>

          <div className="settings-detail">
            <span>Product</span>
            <strong>{BRAND}</strong>
          </div>
          <div className="settings-detail">
            <span>Founder</span>
            <strong>{FOUNDER}</strong>
          </div>
          <div className="settings-detail">
            <span>Phone</span>
            <strong>{PHONE}</strong>
          </div>
          <div className="settings-detail">
            <span>Email</span>
            <strong>{EMAIL}</strong>
          </div>
          <div className="settings-detail">
            <span>Your current role</span>
            <strong>{role}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [page, setPage] = useState("overview");
  const [role, setRole] = useState("Admin");
  const [collapsed, setCollapsed] = useState(false);

  const [connected, setConnected] = useState([
    "salesforce",
    "genesys",
    "whatsapp",
  ]);

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [connectionMode, setConnectionMode] = useState(null);
  const [manualData, setManualData] = useState({});
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [notice, setNotice] = useState("");

  const currentSystem = useMemo(
    () => systems.find((item) => item.id === selectedSystem?.id),
    [selectedSystem]
  );

  const openConnection = (system, mode) => {
    setSelectedSystem(system);
    setConnectionMode(mode);
    setManualData({});
  };

  const closeConnection = () => {
    setSelectedSystem(null);
    setConnectionMode(null);
    setManualData({});
  };

  const automaticConnect = () => {
    if (!currentSystem) return;

    setConnected((items) =>
      items.includes(currentSystem.id) ? items : [...items, currentSystem.id]
    );

    setNotice(`${currentSystem.name} connected in demo mode.`);
    closeConnection();
  };

  const manualConnect = () => {
    if (!currentSystem) return;

    setConnected((items) =>
      items.includes(currentSystem.id) ? items : [...items, currentSystem.id]
    );

    setNotice(`${currentSystem.name} manual connection saved in demo mode.`);
    closeConnection();
  };

  const selectPage = (nextPage) => {
    setPage(nextPage);

    if (nextPage === "investigation" && !selectedLeak) {
      setSelectedLeak(leaks[0]);
    }
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={selectPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        role={role}
      />

      <div className={`app-main ${collapsed ? "sidebar-collapsed" : ""}`}>
        <Topbar role={role} setRole={setRole} setPage={selectPage} />

        <main className="app-content">
          {page === "overview" && (
            <OverviewPage
              setPage={selectPage}
              setSelectedLeak={setSelectedLeak}
            />
          )}

          {page === "leaks" && (
            <LeaksPage
              setSelectedLeak={setSelectedLeak}
              setPage={selectPage}
            />
          )}

          {page === "investigation" && (
            <InvestigationPage
              selectedLeak={selectedLeak}
              setSelectedLeak={setSelectedLeak}
              resolved={resolved}
              setResolved={setResolved}
            />
          )}

          {page === "integrations" && (
            <IntegrationsPage
              connected={connected}
              setConnected={setConnected}
              setSelectedSystem={setSelectedSystem}
              setConnectionMode={setConnectionMode}
            />
          )}

          {page === "analytics" && <AnalyticsPage />}

          {page === "actions" && <ActionsPage />}

          {page === "team" && <TeamPage role={role} />}

          {page === "billing" && <BillingPage />}

          {page === "notifications" && <NotificationsPage />}

          {page === "settings" && <SettingsPage role={role} />}
        </main>

        <footer className="app-footer">
          <span>© 2026 {BRAND}</span>
          <span>Founder: {FOUNDER}</span>
          <span>{PHONE}</span>
          <span>{EMAIL}</span>
          <span>Demo intelligence workspace</span>
        </footer>
      </div>

      {notice && (
        <div className="toast">
          <span>✓</span>
          {notice}
          <button onClick={() => setNotice("")}>×</button>
        </div>
      )}

      {selectedSystem && connectionMode && (
        <Modal
          title={`Connect ${selectedSystem.name}`}
          subtitle={
            connectionMode === "automatic"
              ? "Authorize the system through its supported authorization flow."
              : "Enter the connection details required by this platform."
          }
          onClose={closeConnection}
          wide={connectionMode === "manual"}
        >
          {connectionMode === "automatic" ? (
            <div className="connection-modal">
              <div className="connection-brand">
                {selectedSystem.logo ? (
                  <IntegrationLogo system={selectedSystem} large />
                ) : (
                  <div className="integration-fallback large">
                    {selectedSystem.short}
                  </div>
                )}
              </div>

              <div className="connection-steps">
                <div className="connection-step active">
                  <span>1</span>
                  <div>
                    <strong>Start authorization</strong>
                    <p>Open the platform's secure authorization screen.</p>
                  </div>
                </div>

                <div className="connection-step">
                  <span>2</span>
                  <div>
                    <strong>Approve permissions</strong>
                    <p>The customer or administrator approves requested access.</p>
                  </div>
                </div>

                <div className="connection-step">
                  <span>3</span>
                  <div>
                    <strong>Connect securely</strong>
                    <p>Leak Detector receives the authorized API connection.</p>
                  </div>
                </div>
              </div>

              <div className="security-note">
                <strong>Production note</strong>
                <p>
                  OAuth tokens and secrets should be handled by the secure
                  backend, never exposed in the React frontend.
                </p>
              </div>

              <button
                className="primary-button full-width large-button"
                onClick={automaticConnect}
              >
                Authorize & Connect
              </button>

              <button
                className="secondary-button full-width"
                onClick={() => setConnectionMode("manual")}
              >
                Enter Manually Instead
              </button>
            </div>
          ) : (
            <div className="manual-connection-modal">
              <div className="manual-header">
                <div className="connection-brand">
                  {selectedSystem.logo ? (
                    <IntegrationLogo system={selectedSystem} large />
                  ) : (
                    <div className="integration-fallback large">
                      {selectedSystem.short}
                    </div>
                  )}
                </div>
                <div>
                  <h3>{selectedSystem.name}</h3>
                  <p>{selectedSystem.category} connection</p>
                </div>
              </div>

              <div className="manual-form">
                {selectedSystem.fields.map(([label, type, placeholder]) => (
                  <label key={label}>
                    <span>{label}</span>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={manualData[label] || ""}
                      onChange={(event) =>
                        setManualData((current) => ({
                          ...current,
                          [label]: event.target.value,
                        }))
                      }
                    />
                  </label>
                ))}
              </div>

              <div className="security-note">
                <strong>Secure credentials</strong>
                <p>
                  This UI is a demo. In production, credentials must be sent
                  directly to your secure backend and encrypted at rest.
                </p>
              </div>

              <div className="modal-actions">
                <button className="secondary-button" onClick={closeConnection}>
                  Cancel
                </button>
                <button className="primary-button" onClick={manualConnect}>
                  Save & Connect
                </button>
              </div>

              <button
                className="switch-mode-button"
                onClick={() => setConnectionMode("automatic")}
              >
                ← Use automatic connection
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}