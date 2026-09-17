import React, { useMemo, useState } from "react";
import "./App.css";

/* =========================================================
   LEAKLEANS — REVENUE LEAKAGE INTELLIGENCE
   Fresh Light Blue SaaS UI
========================================================= */

const FOUNDER = {
  name: "ANIKET MOHITE",
  role: "Founder, LeakLeans",
  phone: "8698382024",
  email: "Aniket.Mohite@supportleaklens.com",
};

const integrations = [
  {
    id: "salesforce",
    name: "Salesforce",
    type: "CRM",
    logo: "https://cdn.simpleicons.org/salesforce/00A1E0",
    description: "Detect lead, opportunity and follow-up leakage.",
    fields: ["Instance URL", "Client ID", "Client Secret"],
  },
  {
    id: "genesys",
    name: "Genesys",
    type: "Contact Center",
    logo: "https://cdn.simpleicons.org/genesys/FF4F1F",
    description: "Analyze calls, queues, response time and missed interactions.",
    fields: ["Region", "Client ID", "Client Secret"],
  },
  {
    id: "avaya",
    name: "Avaya",
    type: "Contact Center",
    logo: "https://cdn.simpleicons.org/avaya/E31B23",
    description: "Find missed calls, routing gaps and service leakage.",
    fields: ["Base URL", "Tenant ID", "Client ID", "Client Secret"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    type: "Messaging",
    logo: "https://cdn.simpleicons.org/whatsapp/25D366",
    description: "Identify unanswered conversations and delayed responses.",
    fields: ["Business Account ID", "Phone Number ID", "Access Token"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    type: "CRM",
    logo: "https://cdn.simpleicons.org/hubspot/FF7A59",
    description: "Monitor leads, deals and pipeline movement.",
    fields: ["Portal ID", "Private App Token"],
  },
  {
    id: "gmail",
    name: "Gmail",
    type: "Email",
    logo: "https://cdn.simpleicons.org/gmail/EA4335",
    description: "Detect important enquiries and email follow-up gaps.",
    fields: ["Workspace Email", "OAuth Client ID", "Client Secret"],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    type: "Support",
    logo: "https://cdn.simpleicons.org/zendesk/03363D",
    description: "Connect customer support signals with revenue risk.",
    fields: ["Subdomain", "Admin Email", "API Token"],
  },
  {
    id: "custom",
    name: "Custom CRM",
    type: "API",
    logo: "",
    description: "Connect another business system using a secure API.",
    fields: ["API Base URL", "API Key", "Data Format"],
  },
];

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    source: "Salesforce → Sales Team",
    impact: 148000,
    severity: "High",
    status: "Open",
    cause: "Lead was created but no follow-up activity was recorded within the expected response window.",
    resolution: "Automatically assign the lead to the responsible manager and create a follow-up task.",
    signal: "Lead created → no activity → opportunity at risk",
  },
  {
    id: 2,
    title: "Missed Inbound Calls",
    source: "Genesys / Avaya",
    impact: 86000,
    severity: "High",
    status: "Open",
    cause: "Inbound calls were abandoned or missed during high-volume periods.",
    resolution: "Create callback tasks and route high-value missed callers to the responsible team.",
    signal: "Inbound call → missed → no callback",
  },
  {
    id: 3,
    title: "Quote-to-Order Drop",
    source: "CRM → Orders",
    impact: 214000,
    severity: "Medium",
    status: "Investigating",
    cause: "Quotes were issued but a significant number did not progress to an order.",
    resolution: "Trigger quote follow-up and notify the assigned sales manager.",
    signal: "Quote → no order → customer inactive",
  },
  {
    id: 4,
    title: "Delayed Response",
    source: "WhatsApp / Gmail",
    impact: 64000,
    severity: "Medium",
    status: "Open",
    cause: "Customer enquiries remained unanswered beyond the defined response window.",
    resolution: "Route delayed enquiries to the available response team.",
    signal: "Customer enquiry → delayed response",
  },
  {
    id: 5,
    title: "Repeated Complaint Loop",
    source: "Zendesk",
    impact: 39000,
    severity: "Low",
    status: "Resolved",
    cause: "Customers repeatedly contacted support for the same unresolved issue.",
    resolution: "Escalate repeated complaints to a manager and track closure.",
    signal: "Complaint → repeat complaint → unresolved",
  },
];

const plans = [
  {
    id: "small",
    name: "Small",
    price: "₹20,999",
    description: "For smaller teams starting revenue leakage intelligence.",
    features: [
      "Revenue leak detection",
      "Up to 3 integrations",
      "Manager access",
      "Leak investigation",
      "Basic analytics",
      "Email notifications",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "₹69,999",
    description: "For growing businesses with multiple teams and systems.",
    features: [
      "Everything in Small",
      "Up to 8 integrations",
      "Project Head access",
      "Advanced analytics",
      "AI investigation",
      "Automated actions",
      "Team monitoring",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹99,999",
    description: "For larger organizations with complex operations.",
    features: [
      "Everything in Business",
      "Custom integrations",
      "Unlimited teams",
      "Enterprise controls",
      "Advanced workflow automation",
      "Priority support",
      "Custom security configuration",
    ],
  },
];

const paymentMethods = [
  {
    id: "razorpay",
    name: "Razorpay",
    region: "India",
    logo: "https://cdn.simpleicons.org/razorpay/3395FF",
    description: "UPI, cards and Indian payment methods",
  },
  {
    id: "gpay",
    name: "Google Pay",
    region: "India",
    logo: "https://cdn.simpleicons.org/googlepay/4285F4",
    description: "Pay using Google Pay",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    region: "India",
    logo: "https://cdn.simpleicons.org/phonepe/5F259F",
    description: "Pay using PhonePe",
  },
  {
    id: "supermoney",
    name: "super.money",
    region: "India",
    logo: "",
    description: "UPI payment option",
  },
  {
    id: "debit",
    name: "Debit Card",
    region: "India",
    logo: "https://cdn.simpleicons.org/visa/1A1F71",
    description: "Visa / Mastercard debit card",
  },
  {
    id: "credit",
    name: "Credit Card",
    region: "India",
    logo: "https://cdn.simpleicons.org/mastercard/EB001B",
    description: "Credit card payment",
  },
  {
    id: "stripe",
    name: "Stripe",
    region: "International",
    logo: "https://cdn.simpleicons.org/stripe/635BFF",
    description: "International card and payment processing",
  },
  {
    id: "paypal",
    name: "PayPal",
    region: "International",
    logo: "https://cdn.simpleicons.org/paypal/003087",
    description: "International PayPal payments",
  },
];

const navigation = [
  { id: "overview", icon: "⌂", label: "Overview" },
  { id: "leaks", icon: "◈", label: "Revenue Leaks", badge: "5" },
  { id: "integrations", icon: "⊞", label: "Integrations" },
  { id: "analytics", icon: "▥", label: "Analytics" },
  { id: "actions", icon: "✓", label: "Actions" },
  { id: "team", icon: "♙", label: "Team & Roles" },
  { id: "billing", icon: "₹", label: "Billing" },
  { id: "settings", icon: "⚙", label: "Settings" },
];

function formatMoney(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function BrandLogo({ large = false }) {
  return (
    <div className={`ll-logo ${large ? "large" : ""}`}>
      <span>LL</span>
    </div>
  );
}

function ImageLogo({ src, name, large = false }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`image-fallback ${large ? "large" : ""}`}>
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      className={`real-logo ${large ? "large" : ""}`}
      src={src}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
    />
  );
}

function Button({ children, variant = "primary", onClick, full = false }) {
  return (
    <button
      className={`ll-btn ${variant} ${full ? "full" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Modal({ children, onClose, wide = false }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className={`ll-modal ${wide ? "wide" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

function LandingPage({ onStart }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-brand">
          <BrandLogo />
          <div>
            <strong>LEAKLEANS</strong>
            <span>Revenue Intelligence</span>
          </div>
        </div>

        <div className="founder-top">
          <div>
            <span>FOUNDER</span>
            <strong>{FOUNDER.name}</strong>
          </div>
          <div>
            <span>CONTACT</span>
            <a href={`tel:${FOUNDER.phone}`}>{FOUNDER.phone}</a>
          </div>
          <div className="email-contact">
            <span>EMAIL</span>
            <a href={`mailto:${FOUNDER.email}`}>{FOUNDER.email}</a>
          </div>
        </div>

        <Button onClick={onStart}>Open LeakLeans</Button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow">
              REVENUE LEAKAGE INTELLIGENCE SYSTEM
            </div>

            <h1>
              Find where your
              <span>revenue is leaking.</span>
            </h1>

            <p>
              LeakLeans connects to the business systems you already use,
              detects revenue leakage hiding between them, explains what
              happened, and helps your team resolve it.
            </p>

            <div className="hero-actions">
              <Button onClick={onStart}>Start Leak Detection →</Button>
              <Button variant="secondary" onClick={() => scrollTo("integrations")}>
                Explore Integrations
              </Button>
            </div>

            <div className="hero-contact">
              <span>Built by</span>
              <strong>{FOUNDER.name}</strong>
              <span>·</span>
              <a href={`tel:${FOUNDER.phone}`}>{FOUNDER.phone}</a>
              <span>·</span>
              <a href={`mailto:${FOUNDER.email}`}>{FOUNDER.email}</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-window">
              <div className="window-bar">
                <span />
                <span />
                <span />
                <b>LeakLeans Intelligence</b>
              </div>

              <div className="visual-content">
                <div className="visual-title">
                  <span>LIVE REVENUE SIGNALS</span>
                  <b>● Monitoring</b>
                </div>

                <div className="visual-number">
                  ₹5.51L
                  <small>potential revenue at risk</small>
                </div>

                <div className="signal-line">
                  <span>Follow-up failure</span>
                  <strong>₹1.48L</strong>
                  <i>HIGH</i>
                </div>

                <div className="signal-line">
                  <span>Missed inbound calls</span>
                  <strong>₹86K</strong>
                  <i>HIGH</i>
                </div>

                <div className="signal-line">
                  <span>Quote-to-order drop</span>
                  <strong>₹2.14L</strong>
                  <i className="yellow">MEDIUM</i>
                </div>

                <div className="visual-footer">
                  <span>Salesforce</span>
                  <span>Genesys</span>
                  <span>WhatsApp</span>
                  <span>Zendesk</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <span>CONNECT YOUR EXISTING SYSTEMS</span>
          {integrations.slice(0, 6).map((item) => (
            <div className="trust-logo" key={item.id}>
              <ImageLogo src={item.logo} name={item.name} />
              <b>{item.name}</b>
            </div>
          ))}
        </section>

        <section className="landing-section" id="how">
          <div className="section-kicker">01 / HOW IT WORKS</div>
          <h2>
            Your systems keep running.
            <br />
            <span>LeakLeans watches between them.</span>
          </h2>

          <div className="flow-grid">
            {[
              ["01", "Connect", "Connect CRM, contact center, messaging, support and business systems."],
              ["02", "Detect", "LeakLeans looks for signals that indicate potential revenue leakage."],
              ["03", "Investigate", "Understand the probable cause, affected workflow and business impact."],
              ["04", "Resolve", "Assign, notify, automate or escalate the action and measure the result."],
            ].map(([number, title, text]) => (
              <div className="flow-card" key={number}>
                <span>{number}</span>
                <div className="flow-icon">→</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section blue-section" id="integrations">
          <div className="section-kicker">02 / INTEGRATIONS</div>
          <h2>
            One intelligence layer.
            <br />
            <span>Multiple business systems.</span>
          </h2>

          <p className="section-lead">
            LeakLeans does not replace your CRM or contact center. It sits
            above the systems you already use and connects signals across
            them.
          </p>

          <div className="landing-integrations">
            {integrations.map((item) => (
              <div className="landing-integration" key={item.id}>
                <div className="integration-logo-box">
                  <ImageLogo src={item.logo} name={item.name} large />
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="architecture-section">
          <div className="architecture-card-new">
            <div className="section-kicker">03 / INTELLIGENCE LAYER</div>
            <h2>
              Detect → Investigate → Explain
              <span>→ Resolve → Prevent → Measure</span>
            </h2>

            <div className="architecture-flow">
              <div className="arch-source">
                <b>YOUR EXISTING SYSTEMS</b>
                <span>CRM · Calls · Messages · Email · Support · Orders</span>
              </div>

              <div className="arch-arrow">↓</div>

              <div className="arch-core">
                <BrandLogo large />
                <div>
                  <strong>LEAKLEANS</strong>
                  <span>Revenue Intelligence Layer</span>
                </div>
              </div>

              <div className="arch-arrow">↓</div>

              <div className="arch-actions">
                {["Detect", "Investigate", "Explain", "Resolve", "Prevent", "Measure"].map(
                  (item) => (
                    <span key={item}>{item}</span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section" id="pricing">
          <div className="section-kicker">04 / PLANS</div>
          <h2>
            Choose the operating
            <br />
            <span>scale for your business.</span>
          </h2>

          <div className="landing-pricing">
            {plans.map((plan) => (
              <div className={`landing-plan ${plan.popular ? "featured" : ""}`} key={plan.id}>
                {plan.popular && <div className="plan-tag">POPULAR</div>}
                <span>{plan.name.toUpperCase()}</span>
                <strong>{plan.price}</strong>
                <small>/ month</small>
                <p>{plan.description}</p>
                <div className="plan-features">
                  {plan.features.slice(0, 5).map((feature) => (
                    <span key={feature}>✓ {feature}</span>
                  ))}
                </div>
                <Button variant={plan.popular ? "primary" : "secondary"} onClick={onStart}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div>
          <BrandLogo />
          <strong>LEAKLEANS</strong>
          <span>Find Where Your Revenue Is Leaking.</span>
        </div>

        <div>
          <small>FOUNDER</small>
          <strong>{FOUNDER.name}</strong>
          <span>{FOUNDER.role}</span>
        </div>

        <div>
          <small>CONTACT</small>
          <a href={`tel:${FOUNDER.phone}`}>{FOUNDER.phone}</a>
          <a href={`mailto:${FOUNDER.email}`}>{FOUNDER.email}</a>
        </div>

        <div>
          <small>PRODUCT</small>
          <span>Revenue Intelligence</span>
          <span>Integrations</span>
          <span>Leak Detection</span>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ page, setPage, role, onLogout }) {
  const allowed = useMemo(() => {
    if (role === "Founder / Admin") return navigation;

    if (role === "Project Head") {
      return navigation.filter((x) =>
        ["overview", "leaks", "integrations", "analytics", "actions", "team", "settings"].includes(x.id)
      );
    }

    if (role === "Manager") {
      return navigation.filter((x) =>
        ["overview", "leaks", "analytics", "actions", "team"].includes(x.id)
      );
    }

    return navigation.filter((x) =>
      ["overview", "leaks", "actions"].includes(x.id)
    );
  }, [role]);

  return (
    <aside className="sidebar-new">
      <div>
        <div className="side-logo">
          <BrandLogo />
          <div>
            <strong>LEAKLEANS</strong>
            <span>Revenue Intelligence</span>
          </div>
        </div>

        <div className="side-section-title">WORKSPACE</div>

        <nav className="side-nav">
          {allowed.map((item) => (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => setPage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <em>{item.badge}</em>}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="role-card">
          <div className="avatar-blue">
            {role === "Founder / Admin"
              ? "AM"
              : role === "Project Head"
              ? "PH"
              : role === "Manager"
              ? "MG"
              : "TM"}
          </div>
          <div>
            <strong>{role}</strong>
            <span>Access level</span>
          </div>
        </div>

        <button className="back-home" onClick={onLogout}>
          ← Back to landing
        </button>
      </div>
    </aside>
  );
}

/* =========================================================
   TOPBAR
========================================================= */

function DashboardTop({ title, role, onRoleChange }) {
  return (
    <header className="dashboard-header-new">
      <div>
        <div className="header-kicker">LEAKLEANS WORKSPACE</div>
        <h1>{title}</h1>
      </div>

      <div className="header-right">
        <div className="live-status">
          <i />
          Intelligence monitoring
        </div>

        <select value={role} onChange={(e) => onRoleChange(e.target.value)}>
          <option>Founder / Admin</option>
          <option>Project Head</option>
          <option>Manager</option>
          <option>Team Member</option>
        </select>

        <div className="header-user">
          <div className="avatar-blue">AM</div>
          <div>
            <strong>{FOUNDER.name}</strong>
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

function OverviewPage({ setPage, openLeak }) {
  return (
    <>
      <div className="welcome-panel">
        <div>
          <span className="page-kicker">REVENUE INTELLIGENCE</span>
          <h2>Good morning, Aniket.</h2>
          <p>
            LeakLeans is monitoring connected systems for signals that may
            indicate revenue leakage.
          </p>
        </div>
        <Button onClick={() => setPage("integrations")}>
          Connect a system
        </Button>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <span>Potential revenue at risk</span>
          <strong>₹5.51L</strong>
          <small>Across detected signals</small>
        </div>
        <div className="metric-card">
          <span>Open leaks</span>
          <strong>4</strong>
          <small>Require investigation</small>
        </div>
        <div className="metric-card">
          <span>Connected systems</span>
          <strong>4</strong>
          <small>8 available integrations</small>
        </div>
        <div className="metric-card">
          <span>Recovered / protected</span>
          <strong>₹2.18L</strong>
          <small>This month</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="content-card large-card">
          <div className="card-header">
            <div>
              <span className="page-kicker">PRIORITY SIGNALS</span>
              <h3>Revenue leaks requiring attention</h3>
            </div>
            <button onClick={() => setPage("leaks")}>View all →</button>
          </div>

          <div className="leak-list">
            {leaks.slice(0, 4).map((leak) => (
              <button
                className="leak-item"
                key={leak.id}
                onClick={() => openLeak(leak)}
              >
                <div className="leak-icon">!</div>
                <div className="leak-main">
                  <strong>{leak.title}</strong>
                  <span>{leak.source}</span>
                </div>
                <div className="leak-money">{formatMoney(leak.impact)}</div>
                <div className={`severity-pill ${leak.severity.toLowerCase()}`}>
                  {leak.severity}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="content-card">
          <div className="card-header">
            <div>
              <span className="page-kicker">SYSTEM STATUS</span>
              <h3>Connected systems</h3>
            </div>
          </div>

          <div className="system-status-list">
            {integrations.slice(0, 5).map((item, index) => (
              <div className="system-status" key={item.id}>
                <ImageLogo src={item.logo} name={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{index < 4 ? "Connected" : "Not connected"}</span>
                </div>
                <i className={index < 4 ? "online" : ""} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="content-card">
        <div className="card-header">
          <div>
            <span className="page-kicker">INTELLIGENCE FLOW</span>
            <h3>How LeakLeans handles a signal</h3>
          </div>
        </div>

        <div className="intelligence-flow">
          {["Detect", "Investigate", "Explain", "Resolve", "Prevent", "Measure"].map(
            (item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
                {index < 5 && <b>→</b>}
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}

/* =========================================================
   LEAKS
========================================================= */

function LeaksPage({ openLeak }) {
  const [filter, setFilter] = useState("All");

  const filtered = leaks.filter((item) => {
    if (filter === "All") return true;
    return item.severity === filter || item.status === filter;
  });

  return (
    <>
      <PageIntro
        kicker="REVENUE LEAKS"
        title="Revenue leakage"
        description="Review signals detected across your connected systems and investigate the probable causes."
      />

      <div className="filter-row">
        {["All", "High", "Medium", "Open", "Resolved"].map((item) => (
          <button
            key={item}
            className={filter === item ? "selected" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="leak-table-new">
        <div className="table-head-new">
          <span>Leak</span>
          <span>Source</span>
          <span>Impact</span>
          <span>Severity</span>
          <span>Status</span>
          <span />
        </div>

        {filtered.map((leak) => (
          <button
            className="table-row-new"
            key={leak.id}
            onClick={() => openLeak(leak)}
          >
            <div>
              <strong>{leak.title}</strong>
              <span>{leak.signal}</span>
            </div>
            <span>{leak.source}</span>
            <strong className="blue-money">{formatMoney(leak.impact)}</strong>
            <span className={`severity-pill ${leak.severity.toLowerCase()}`}>
              {leak.severity}
            </span>
            <span className={`status-pill ${leak.status === "Resolved" ? "resolved" : ""}`}>
              {leak.status}
            </span>
            <b>→</b>
          </button>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   INTEGRATIONS
========================================================= */

function IntegrationsPage({ connected, setConnected, openSystem }) {
  return (
    <>
      <PageIntro
        kicker="INTEGRATIONS"
        title="Connect your existing systems"
        description="LeakLeans works as an intelligence layer on top of your existing CRM, contact center, messaging, email and support platforms."
      />

      <div className="connection-banner">
        <div className="banner-icon">⌁</div>
        <div>
          <strong>Secure connection architecture</strong>
          <span>
            Use OAuth where supported or configure platform-specific API
            credentials through the secure LeakLeans backend.
          </span>
        </div>
        <span className="secure-badge">SECURE</span>
      </div>

      <div className="integration-grid-new">
        {integrations.map((item) => {
          const isConnected = connected.includes(item.id);

          return (
            <div className="integration-card-new" key={item.id}>
              <div className="integration-card-head">
                <div className="integration-logo-large">
                  <ImageLogo src={item.logo} name={item.name} large />
                </div>
                <span>{item.type}</span>
              </div>

              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className={`connection-status ${isConnected ? "connected" : ""}`}>
                <i />
                {isConnected ? "Connected" : "Not connected"}
              </div>

              <button
                className="integration-connect"
                onClick={() => openSystem(item)}
              >
                {isConnected ? "Manage connection" : "Connect system"}
                <span>→</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="security-panel">
        <strong>Security note</strong>
        <p>
          Demo mode: credentials entered in this interface are not transmitted
          or stored. Production connections should be handled by the LeakLeans
          backend with encrypted secret storage and OAuth where supported.
        </p>
      </div>
    </>
  );
}

/* =========================================================
   ANALYTICS
========================================================= */

function AnalyticsPage() {
  const categories = [
    ["Follow-up leakage", 82, "₹1.48L"],
    ["Call leakage", 68, "₹86K"],
    ["Quote leakage", 91, "₹2.14L"],
    ["Response leakage", 43, "₹64K"],
    ["Support leakage", 28, "₹39K"],
  ];

  return (
    <>
      <PageIntro
        kicker="ANALYTICS"
        title="Revenue leakage analytics"
        description="Understand where leakage is occurring, which workflows are affected and how much value is at risk."
      />

      <div className="analytics-top">
        <div className="analytics-number-card">
          <span>TOTAL VALUE IDENTIFIED</span>
          <strong>₹5.51L</strong>
          <small>Potential revenue at risk</small>
        </div>
        <div className="analytics-number-card">
          <span>RECOVERED / PROTECTED</span>
          <strong>₹2.18L</strong>
          <small>Actions completed this month</small>
        </div>
        <div className="analytics-number-card">
          <span>DETECTION RATE</span>
          <strong>94%</strong>
          <small>Signal processing coverage</small>
        </div>
      </div>

      <div className="analytics-layout">
        <div className="content-card">
          <div className="card-header">
            <div>
              <span className="page-kicker">LEAKAGE SOURCES</span>
              <h3>Value by leakage category</h3>
            </div>
          </div>

          <div className="bars">
            {categories.map(([name, width, amount]) => (
              <div className="bar-item" key={name}>
                <div>
                  <span>{name}</span>
                  <strong>{amount}</strong>
                </div>
                <div className="bar-track">
                  <i style={{ width: `${width}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card recovery-card">
          <span className="page-kicker">RECOVERY</span>
          <strong>₹2.18L</strong>
          <h3>Value recovered or protected</h3>
          <p>
            Based on resolved signals and completed actions recorded in the
            LeakLeans workspace.
          </p>
          <div className="recovery-circle">39%</div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   ACTIONS
========================================================= */

function ActionsPage() {
  const actions = [
    ["01", "Assign missed follow-up", "Salesforce", "Manager"],
    ["02", "Create callback task", "Genesys", "Sales Team"],
    ["03", "Escalate delayed enquiry", "WhatsApp", "Support"],
    ["04", "Review quote drop", "CRM / Orders", "Project Head"],
  ];

  return (
    <>
      <PageIntro
        kicker="ACTIONS"
        title="Resolution actions"
        description="Track what your teams and automated workflows are doing about detected revenue leakage."
      />

      <div className="action-list-new">
        {actions.map(([number, title, source, owner]) => (
          <div className="action-card-new" key={number}>
            <div className="action-number-new">{number}</div>
            <div>
              <strong>{title}</strong>
              <span>{source} · Owner: {owner}</span>
            </div>
            <div className="action-state">Pending</div>
            <button>Review →</button>
          </div>
        ))}
      </div>

      <div className="automation-panel">
        <div>
          <span className="page-kicker">AUTOMATION</span>
          <h3>AI and human resolution</h3>
          <p>
            LeakLeans can recommend actions and, when authorized, trigger
            permitted workflows through connected systems.
          </p>
        </div>
        <div className="automation-steps">
          <span>Detect</span>
          <b>→</b>
          <span>Recommend</span>
          <b>→</b>
          <span>Approve</span>
          <b>→</b>
          <span>Execute</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   TEAM & ROLES
========================================================= */

function TeamPage({ role }) {
  const members = [
    {
      initials: "AM",
      name: "Aniket Mohite",
      email: FOUNDER.email,
      role: "Founder / Admin",
      access: "Full access",
    },
    {
      initials: "PH",
      name: "Project Head",
      email: "project.head@company.com",
      role: "Project Head",
      access: "Project access",
    },
    {
      initials: "MG",
      name: "Sales Manager",
      email: "manager@company.com",
      role: "Manager",
      access: "Team access",
    },
    {
      initials: "TM",
      name: "Team Member",
      email: "member@company.com",
      role: "Team Member",
      access: "Assigned access",
    },
  ];

  return (
    <>
      <PageIntro
        kicker="TEAM & ROLES"
        title="Access management"
        description="Different roles see different parts of LeakLeans. Sensitive owner controls remain restricted."
      />

      <div className="current-role">
        <div className="avatar-blue large-avatar">
          {role === "Founder / Admin" ? "AM" : role === "Project Head" ? "PH" : role === "Manager" ? "MG" : "TM"}
        </div>
        <div>
          <span>YOU ARE VIEWING AS</span>
          <strong>{role}</strong>
        </div>
      </div>

      <div className="roles-grid">
        {members.map((member) => (
          <div className="role-member-card" key={member.role}>
            <div className="member-head">
              <div className="avatar-blue">{member.initials}</div>
              <div>
                <strong>{member.name}</strong>
                <span>{member.email}</span>
              </div>
            </div>

            <div className="member-role">
              <span>ROLE</span>
              <strong>{member.role}</strong>
            </div>

            <div className="member-role">
              <span>ACCESS</span>
              <strong>{member.access}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="permission-table">
        <div className="permission-row header">
          <span>Capability</span>
          <span>Founder</span>
          <span>Project Head</span>
          <span>Manager</span>
          <span>Member</span>
        </div>

        {[
          ["Overview", "✓", "✓", "✓", "✓"],
          ["Revenue leaks", "✓", "✓", "✓", "Assigned"],
          ["Integrations", "✓", "✓", "—", "—"],
          ["Analytics", "✓", "✓", "✓", "—"],
          ["Actions", "✓", "✓", "✓", "Assigned"],
          ["Team management", "✓", "✓", "Limited", "—"],
          ["Billing", "✓", "—", "—", "—"],
          ["Settings", "✓", "Limited", "—", "—"],
        ].map((row) => (
          <div className="permission-row" key={row[0]}>
            {row.map((cell, index) => (
              <span key={index} className={index === 0 ? "permission-name" : ""}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   BILLING
========================================================= */

function BillingPage({ selectedPlan, setSelectedPlan, openPayment }) {
  const plan = plans.find((item) => item.id === selectedPlan) || plans[1];

  return (
    <>
      <PageIntro
        kicker="BILLING"
        title="Plans & payments"
        description="Manage your LeakLeans subscription and choose an available payment method."
      />

      <div className="billing-status">
        <div>
          <span>CURRENT PLAN</span>
          <strong>{plan.name}</strong>
        </div>
        <div>
          <span>MONTHLY PRICE</span>
          <strong>{plan.price}</strong>
        </div>
        <div>
          <span>STATUS</span>
          <strong className="active-text">Demo subscription</strong>
        </div>
      </div>

      <div className="plans-grid-new">
        {plans.map((item) => (
          <div
            className={`plan-card-new ${
              item.id === selectedPlan ? "selected" : ""
            }`}
            key={item.id}
          >
            {item.popular && <span className="popular-new">MOST SELECTED</span>}
            <span className="plan-label">{item.name}</span>
            <strong>{item.price}</strong>
            <small>/ month</small>
            <p>{item.description}</p>

            <div className="plan-checks">
              {item.features.map((feature) => (
                <span key={feature}>✓ {feature}</span>
              ))}
            </div>

            <Button
              variant={item.id === selectedPlan ? "primary" : "secondary"}
              full
              onClick={() => setSelectedPlan(item.id)}
            >
              {item.id === selectedPlan ? "Selected plan" : "Select plan"}
            </Button>
          </div>
        ))}
      </div>

      <div className="checkout-new">
        <div className="checkout-title">
          <div>
            <span className="page-kicker">CHECKOUT</span>
            <h3>{plan.name} plan</h3>
          </div>
          <strong>{plan.price}<small>/month</small></strong>
        </div>

        <div className="payment-section">
          <div className="payment-group">
            <span className="payment-group-title">INDIA — UPI & CARDS</span>

            {paymentMethods
              .filter((item) => item.region === "India")
              .map((method) => (
                <button
                  className="payment-option"
                  key={method.id}
                  onClick={() => openPayment(method, plan)}
                >
                  <div className="payment-logo-new">
                    <ImageLogo src={method.logo} name={method.name} />
                  </div>
                  <div>
                    <strong>{method.name}</strong>
                    <span>{method.description}</span>
                  </div>
                  <b>→</b>
                </button>
              ))}
          </div>

          <div className="payment-group">
            <span className="payment-group-title">INTERNATIONAL</span>

            {paymentMethods
              .filter((item) => item.region === "International")
              .map((method) => (
                <button
                  className="payment-option"
                  key={method.id}
                  onClick={() => openPayment(method, plan)}
                >
                  <div className="payment-logo-new">
                    <ImageLogo src={method.logo} name={method.name} />
                  </div>
                  <div>
                    <strong>{method.name}</strong>
                    <span>{method.description}</span>
                  </div>
                  <b>→</b>
                </button>
              ))}
          </div>
        </div>

        <div className="payment-security-new">
          🔒 Payment processing will be handled through the configured payment
          provider. This current interface is a product/demo UI and does not
          process real payments by itself.
        </div>
      </div>

      <div className="invoice-card">
        <div>
          <span className="page-kicker">INVOICES</span>
          <h3>Billing history</h3>
        </div>
        <div className="invoice-empty">
          <strong>No invoices yet</strong>
          <span>Invoices will appear here after live billing is connected.</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsPage() {
  return (
    <>
      <PageIntro
        kicker="SETTINGS"
        title="Workspace settings"
        description="Configure your LeakLeans workspace and review account information."
      />

      <div className="settings-new-grid">
        <div>
          <span>WORKSPACE</span>
          <strong>LeakLeans</strong>
          <p>Revenue Leakage Intelligence System</p>
        </div>

        <div>
          <span>FOUNDER</span>
          <strong>{FOUNDER.name}</strong>
          <p>{FOUNDER.role}</p>
        </div>

        <div>
          <span>CONTACT NUMBER</span>
          <strong>{FOUNDER.phone}</strong>
          <p>Primary workspace contact</p>
        </div>

        <div>
          <span>CONTACT EMAIL</span>
          <strong>{FOUNDER.email}</strong>
          <p>Primary workspace email</p>
        </div>

        <div>
          <span>DATA PROCESSING</span>
          <strong>Connected-system intelligence</strong>
          <p>Signals are analyzed across authorized business systems.</p>
        </div>

        <div>
          <span>SECURITY</span>
          <strong>OAuth + encrypted backend</strong>
          <p>Production credentials should never be stored in the frontend.</p>
        </div>
      </div>

      <div className="settings-description-new">
        <span className="page-kicker">PRODUCT POSITIONING</span>
        <h3>LeakLeans is not an accounting dashboard.</h3>
        <p>
          LeakLeans is an intelligence layer on top of existing enterprise
          systems. It identifies revenue leakage hidden between customer
          enquiries, sales activity, calls, messages, quotes, orders and
          support workflows.
        </p>
      </div>
    </>
  );
}

/* =========================================================
   PAGE INTRO
========================================================= */

function PageIntro({ kicker, title, description }) {
  return (
    <div className="page-intro-new">
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

/* =========================================================
   CONNECTION MODAL
========================================================= */

function ConnectionModal({ system, onClose, onConnected }) {
  const [mode, setMode] = useState(null);
  const [values, setValues] = useState({});

  if (!system) return null;

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  return (
    <Modal onClose={onClose} wide>
      <div className="modal-system-head">
        <div className="modal-logo-new">
          <ImageLogo src={system.logo} name={system.name} large />
        </div>
        <div>
          <span>{system.type}</span>
          <h2>{system.name}</h2>
        </div>
      </div>

      {!mode && (
        <>
          <p className="modal-description">
            Choose how you want to connect {system.name} to LeakLeans.
          </p>

          <div className="connection-choice-grid">
            <button onClick={() => setMode("automatic")}>
              <div className="choice-icon">⚡</div>
              <div>
                <strong>Connect Automatically</strong>
                <span>Use OAuth or the platform's authorization flow.</span>
              </div>
              <b>→</b>
            </button>

            <button onClick={() => setMode("manual")}>
              <div className="choice-icon">⌘</div>
              <div>
                <strong>Enter Manually</strong>
                <span>Enter the connection details required by the platform.</span>
              </div>
              <b>→</b>
            </button>
          </div>

          <div className="modal-security-new">
            <strong>Security</strong>
            <span>
              Real credentials should be sent to the LeakLeans backend and
              securely encrypted in production.
            </span>
          </div>
        </>
      )}

      {mode === "automatic" && (
        <div className="connection-method-new">
          <button className="modal-back" onClick={() => setMode(null)}>
            ← Back
          </button>

          <h3>Automatic connection</h3>
          <p>
            LeakLeans will open the authorization process for {system.name}.
            The customer logs in to the existing platform and approves the
            requested access.
          </p>

          <div className="oauth-flow">
            {[
              "Customer selects Connect",
              "Platform authorization opens",
              "Customer approves access",
              "LeakLeans receives authorization",
              "Secure backend establishes connection",
            ].map((step, index) => (
              <div key={step}>
                <b>{index + 1}</b>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <Button
            full
            onClick={() => {
              onConnected(system.id);
              onClose();
            }}
          >
            Authorize & Connect
          </Button>

          <small className="demo-label">
            Demo mode — real OAuth requires backend configuration.
          </small>
        </div>
      )}

      {mode === "manual" && (
        <div className="connection-method-new">
          <button className="modal-back" onClick={() => setMode(null)}>
            ← Back
          </button>

          <h3>Manual connection</h3>
          <p>
            Enter the platform-specific details below. In production these
            values should be transmitted directly to the secure backend.
          </p>

          <div className="manual-form">
            {system.fields.map((field) => {
              const key = field.toLowerCase().replace(/[^a-z0-9]+/g, "_");

              return (
                <label key={field}>
                  <span>{field}</span>
                  <input
                    type={
                      field.toLowerCase().includes("secret") ||
                      field.toLowerCase().includes("token") ||
                      field.toLowerCase().includes("key")
                        ? "password"
                        : "text"
                    }
                    placeholder={`Enter ${field}`}
                    value={values[key] || ""}
                    onChange={(e) => update(key, e.target.value)}
                  />
                </label>
              );
            })}
          </div>

          <Button
            full
            onClick={() => {
              onConnected(system.id);
              onClose();
            }}
          >
            Save & Connect
          </Button>

          <div className="manual-warning">
            Demo mode: information entered here is not transmitted or stored.
          </div>
        </div>
      )}
    </Modal>
  );
}

/* =========================================================
   LEAK INVESTIGATION MODAL
========================================================= */

function LeakModal({ leak, onClose, onResolve }) {
  if (!leak) return null;

  return (
    <Modal onClose={onClose} wide>
      <div className="investigation-title-new">
        <div>
          <span className="page-kicker">LEAK INVESTIGATION</span>
          <h2>{leak.title}</h2>
          <p>{leak.source}</p>
        </div>
        <strong>{formatMoney(leak.impact)}</strong>
      </div>

      <div className="investigation-meta-new">
        <div>
          <span>SEVERITY</span>
          <b>{leak.severity}</b>
        </div>
        <div>
          <span>STATUS</span>
          <b>{leak.status}</b>
        </div>
        <div>
          <span>SIGNAL</span>
          <b>{leak.signal}</b>
        </div>
      </div>

      <div className="investigation-block-new">
        <span>PROBABLE CAUSE</span>
        <p>{leak.cause}</p>
      </div>

      <div className="investigation-block-new">
        <span>BUSINESS IMPACT</span>
        <p>
          LeakLeans estimates <strong>{formatMoney(leak.impact)}</strong> of
          potential revenue is associated with this detected workflow gap.
        </p>
      </div>

      <div className="investigation-block-new">
        <span>RECOMMENDED RESOLUTION</span>
        <p>{leak.resolution}</p>
      </div>

      <div className="investigation-actions">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {leak.status !== "Resolved" && (
          <Button onClick={() => onResolve(leak)}>
            Mark as Resolved
          </Button>
        )}
      </div>
    </Modal>
  );
}

/* =========================================================
   PAYMENT MODAL
========================================================= */

function PaymentModal({ payment, plan, onClose }) {
  if (!payment) return null;

  return (
    <Modal onClose={onClose}>
      <div className="payment-modal-head">
        <div className="payment-logo-modal">
          <ImageLogo src={payment.logo} name={payment.name} large />
        </div>
        <div>
          <span>{payment.region}</span>
          <h2>{payment.name}</h2>
        </div>
      </div>

      <div className="payment-summary-new">
        <span>Selected plan</span>
        <strong>{plan?.name}</strong>
        <b>{plan?.price}/month</b>
      </div>

      <p className="modal-description">
        This is the payment selection screen for the LeakLeans product.
        Live payment processing will require the relevant merchant account,
        gateway configuration and backend integration.
      </p>

      <Button full onClick={onClose}>
        Continue with {payment.name}
      </Button>
    </Modal>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState("overview");
  const [role, setRole] = useState("Founder / Admin");

  const [connected, setConnected] = useState([
    "salesforce",
    "genesys",
    "whatsapp",
    "zendesk",
  ]);

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("business");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [notice, setNotice] = useState("");

  const openSystem = (system) => setSelectedSystem(system);
  const openLeak = (leak) => setSelectedLeak(leak);

  const markConnected = (id) => {
    if (!connected.includes(id)) {
      setConnected((current) => [...current, id]);
    }
    setNotice("System connected successfully in demo mode.");
    setTimeout(() => setNotice(""), 3000);
  };

  const resolveLeak = (leak) => {
    setSelectedLeak(null);
    setNotice(`${leak.title} marked as resolved in demo mode.`);
    setTimeout(() => setNotice(""), 3000);
  };

  const start = () => {
    setStarted(true);
    setPage("overview");
  };

  if (!started) {
    return <LandingPage onStart={start} />;
  }

  const titles = {
    overview: "Overview",
    leaks: "Revenue Leaks",
    integrations: "Integrations",
    analytics: "Analytics",
    actions: "Actions",
    team: "Team & Roles",
    billing: "Billing",
    settings: "Settings",
  };

  return (
    <div className="app-new">
      <Sidebar
        page={page}
        setPage={setPage}
        role={role}
        onLogout={() => setStarted(false)}
      />

      <main className="workspace-new">
        <DashboardTop
          title={titles[page]}
          role={role}
          onRoleChange={setRole}
        />

        <div className="workspace-content">
          {page === "overview" && (
            <OverviewPage setPage={setPage} openLeak={openLeak} />
          )}

          {page === "leaks" && <LeaksPage openLeak={openLeak} />}

          {page === "integrations" && (
            <IntegrationsPage
              connected={connected}
              setConnected={setConnected}
              openSystem={openSystem}
            />
          )}

          {page === "analytics" && <AnalyticsPage />}

          {page === "actions" && <ActionsPage />}

          {page === "team" && <TeamPage role={role} />}

          {page === "billing" && (
            <BillingPage
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              openPayment={(payment, plan) =>
                setSelectedPayment({ payment, plan })
              }
            />
          )}

          {page === "settings" && <SettingsPage />}
        </div>

        <footer className="workspace-footer">
          <span>LEAKLEANS · Revenue Leakage Intelligence</span>
          <span>
            {FOUNDER.name} · {FOUNDER.phone} · {FOUNDER.email}
          </span>
        </footer>
      </main>

      {selectedSystem && (
        <ConnectionModal
          system={selectedSystem}
          onClose={() => setSelectedSystem(null)}
          onConnected={markConnected}
        />
      )}

      {selectedLeak && (
        <LeakModal
          leak={selectedLeak}
          onClose={() => setSelectedLeak(null)}
          onResolve={resolveLeak}
        />
      )}

      {selectedPayment && (
        <PaymentModal
          payment={selectedPayment.payment}
          plan={selectedPayment.plan}
          onClose={() => setSelectedPayment(null)}
        />
      )}

      {notice && <div className="toast-new">{notice}</div>}
    </div>
  );
}