import React, { useState } from "react";
import "./App.css";

/* =========================================================
   LEAKLEANS — BUSINESS SYSTEMS
========================================================= */

const integrations = [
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    logo: "https://cdn.simpleicons.org/salesforce",
    description:
      "Connect leads, opportunities, activities and customer records.",
    fields: [
      ["instanceUrl", "Salesforce Instance URL", "https://company.my.salesforce.com"],
      ["clientId", "Client ID", "Enter Client ID"],
      ["clientSecret", "Client Secret", "Enter Client Secret"],
      ["accessToken", "Access Token", "Enter Access Token"],
    ],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "Messaging",
    logo: "https://cdn.simpleicons.org/whatsapp",
    description:
      "Analyze customer conversations, response times and missed opportunities.",
    fields: [
      ["businessId", "Business Account ID", "Enter Business Account ID"],
      ["phoneId", "Phone Number ID", "Enter Phone Number ID"],
      ["accessToken", "Access Token", "Enter Access Token"],
    ],
  },
  {
    id: "genesys",
    name: "Genesys",
    category: "Contact Center",
    logo: "https://cdn.simpleicons.org/genesys",
    description:
      "Connect calls, queues, agents and customer interaction signals.",
    fields: [
      ["region", "Genesys Region", "Enter Genesys Region"],
      ["clientId", "Client ID", "Enter Client ID"],
      ["clientSecret", "Client Secret", "Enter Client Secret"],
    ],
  },
  {
    id: "avaya",
    name: "Avaya",
    category: "Contact Center",
    logo: "https://cdn.simpleicons.org/avaya",
    description:
      "Connect customer calls and operational contact-center signals.",
    fields: [
      ["baseUrl", "API Base URL", "https://your-avaya-api.com"],
      ["clientId", "Client ID", "Enter Client ID"],
      ["clientSecret", "Client Secret", "Enter Client Secret"],
      ["apiKey", "API Key / Token", "Enter API Key or Token"],
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    logo: "https://cdn.simpleicons.org/hubspot",
    description:
      "Connect contacts, deals, activities and pipeline information.",
    fields: [
      ["portalId", "Portal ID", "Enter Portal ID"],
      ["accessToken", "Access Token", "Enter Access Token"],
    ],
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "Email",
    logo: "https://cdn.simpleicons.org/gmail",
    description:
      "Analyze customer emails, response delays and follow-up gaps.",
    fields: [
      ["clientId", "Google Client ID", "Enter Client ID"],
      ["clientSecret", "Google Client Secret", "Enter Client Secret"],
      ["refreshToken", "Refresh Token", "Enter Refresh Token"],
    ],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "Support",
    logo: "https://cdn.simpleicons.org/zendesk",
    description:
      "Connect tickets, support conversations and unresolved issues.",
    fields: [
      ["subdomain", "Zendesk Subdomain", "yourcompany"],
      ["email", "Admin Email", "admin@company.com"],
      ["apiToken", "API Token", "Enter API Token"],
    ],
  },
  {
    id: "custom",
    name: "Custom CRM / API",
    category: "Custom",
    logo: "https://cdn.simpleicons.org/api",
    description:
      "Connect your own CRM or business platform through an API.",
    fields: [
      ["baseUrl", "API Base URL", "https://api.company.com"],
      ["apiKey", "API Key", "Enter API Key"],
      ["apiSecret", "API Secret", "Enter API Secret"],
    ],
  },
];

/* =========================================================
   PAYMENT PROVIDERS
========================================================= */

const paymentProviders = [
  {
    id: "razorpay",
    name: "Razorpay",
    category: "India",
    logo: "https://cdn.simpleicons.org/razorpay",
    description: "UPI, cards, net banking and Indian subscriptions.",
    methods: "UPI • Cards • Net Banking",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "International",
    logo: "https://cdn.simpleicons.org/stripe",
    description: "International cards, subscriptions and currencies.",
    methods: "Cards • International • Multi-currency",
  },
  {
    id: "paypal",
    name: "PayPal",
    category: "International",
    logo: "https://cdn.simpleicons.org/paypal",
    description: "International customer payments.",
    methods: "PayPal • International",
  },
];

/* =========================================================
   PRICING
========================================================= */

const plans = [
  {
    id: "small",
    name: "Small",
    price: "₹20,999",
    period: "/ month",
    description:
      "For smaller businesses starting with revenue leakage intelligence.",
    features: [
      "Up to 3 connected systems",
      "Revenue leakage detection",
      "Leak investigation",
      "Basic analytics",
      "Recommended actions",
      "Email support",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "₹69,999",
    period: "/ month",
    description:
      "For growing companies with multiple teams and business systems.",
    features: [
      "Up to 10 connected systems",
      "Cross-system intelligence",
      "Advanced leakage detection",
      "Advanced analytics",
      "Recommended actions",
      "Team access",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹99,999",
    period: "/ month",
    description:
      "For large organizations with complex workflows and integrations.",
    features: [
      "Large-scale integrations",
      "Custom CRM/API integrations",
      "Advanced security",
      "Custom workflows",
      "Enterprise reporting",
      "Dedicated support",
      "Custom implementation",
    ],
  },
];

/* =========================================================
   DEMO LEAKS
========================================================= */

const demoLeaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    customer: "Enterprise Lead #1042",
    source: "Salesforce",
    amount: "₹2,40,000",
    severity: "High",
    status: "Open",
    signal: "Lead → Sales",
    cause:
      "Customer interaction was recorded but no follow-up activity was detected.",
    resolution:
      "Automatically assign the opportunity to the responsible sales representative and trigger a follow-up task.",
  },
  {
    id: 2,
    title: "Missed Call",
    customer: "Customer #8821",
    source: "Genesys",
    amount: "₹86,000",
    severity: "High",
    status: "Open",
    signal: "Call → Sales",
    cause:
      "An inbound customer call was not followed by an appropriate sales or service action.",
    resolution:
      "Create a callback task and notify the responsible team immediately.",
  },
  {
    id: 3,
    title: "Response Delay",
    customer: "Lead #6724",
    source: "WhatsApp",
    amount: "₹48,500",
    severity: "Medium",
    status: "Investigating",
    signal: "Message → Response",
    cause:
      "The customer waited beyond the configured response window.",
    resolution:
      "Escalate delayed conversations and assign an owner automatically.",
  },
  {
    id: 4,
    title: "Workflow Gap",
    customer: "Opportunity #3328",
    source: "CRM",
    amount: "₹1,15,000",
    severity: "Medium",
    status: "Open",
    signal: "Team → Team",
    cause:
      "The opportunity moved between teams without a clearly detected owner.",
    resolution:
      "Assign ownership and monitor the opportunity until the next customer action.",
  },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Logo({ item, large = false }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`logo-fallback ${large ? "large" : ""}`}>
        {item.name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      className={`brand-logo ${large ? "large" : ""}`}
      src={item.logo}
      alt={`${item.name} logo`}
      onError={() => setFailed(true)}
    />
  );
}

function Modal({ children, onClose, wide = false }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-box ${wide ? "modal-wide" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function StatusBadge({ connected }) {
  return (
    <span className={`status-badge ${connected ? "connected" : "offline"}`}>
      <i />
      {connected ? "Connected" : "Not connected"}
    </span>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [page, setPage] = useState("home");

  const [connected, setConnected] = useState([]);

  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [connectionMode, setConnectionMode] = useState("");

  const [manualData, setManualData] = useState({});

  const [selectedLeak, setSelectedLeak] = useState(null);
  const [resolvedLeaks, setResolvedLeaks] = useState([]);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const isConnected = (id) => connected.includes(id);

  const openIntegration = (integration) => {
    setSelectedIntegration(integration);
    setConnectionMode("");
    setManualData({});
  };

  const closeIntegration = () => {
    setSelectedIntegration(null);
    setConnectionMode("");
    setManualData({});
  };

  const markConnected = (id) => {
    setConnected((old) =>
      old.includes(id) ? old : [...old, id]
    );
  };

  const automaticConnection = () => {
    markConnected(selectedIntegration.id);

    alert(
      `${selectedIntegration.name}\n\nAutomatic authorization started.\n\nDemo mode: real OAuth/API authorization will be handled by the LeakLeans backend.`
    );

    closeIntegration();
  };

  const manualConnection = () => {
    const missing = selectedIntegration.fields.some(
      ([key]) => !manualData[key]?.trim()
    );

    if (missing) {
      alert("Please complete all required fields.");
      return;
    }

    markConnected(selectedIntegration.id);

    alert(
      `${selectedIntegration.name}\n\nManual connection saved in demo mode.\n\nNo credentials were sent to any external service.`
    );

    closeIntegration();
  };

  const resolveLeak = (id) => {
    setResolvedLeaks((old) =>
      old.includes(id) ? old : [...old, id]
    );
    setSelectedLeak(null);
  };

  const choosePlan = (plan) => {
    setSelectedPlan(plan);
    setPage("billing");
  };

  const startPayment = (provider) => {
    if (!selectedPlan) {
      alert("Please select a LeakLeans plan first.");
      return;
    }

    setSelectedPayment(provider);

    alert(
      `${provider.name} selected for ${selectedPlan.name} — ${selectedPlan.price}/month.\n\nReal payment processing requires merchant onboarding and backend integration.`
    );
  };

  /* =======================================================
     LANDING PAGE
  ======================================================= */

  if (page === "home") {
    return (
      <div className="app">
        <header className="site-header">
          <div
            className="brand clickable"
            onClick={() => setPage("home")}
          >
            <div className="brand-symbol">L</div>

            <div className="brand-copy">
              <strong>LEAKLEANS</strong>
              <span>Revenue Leakage Intelligence</span>
            </div>
          </div>

          <div className="founder-details">
            <div>
              <small>FOUNDER</small>
              <strong>ANIKET MOHITE</strong>
            </div>

            <div>
              <small>CONTACT</small>
              <a href="tel:8698382024">8698382024</a>
            </div>

            <div>
              <small>EMAIL</small>
              <a href="mailto:Aniket.Mohite@supportleaklens.com">
                Aniket.Mohite@supportleaklens.com
              </a>
            </div>
          </div>

          <button
            className="button primary"
            onClick={() => setPage("dashboard")}
          >
            Open Dashboard
          </button>
        </header>

        <main className="landing">
          <section className="hero">
            <div className="eyebrow">
              REVENUE LEAKAGE INTELLIGENCE SYSTEM
            </div>

            <h1>
              Find Where Your
              <span> Revenue Is Leaking.</span>
            </h1>

            <p>
              LeakLeans connects with the business systems you already use
              and finds revenue leakage hiding between them.
            </p>

            <div className="hero-actions">
              <button
                className="button primary large-button"
                onClick={() => setPage("dashboard")}
              >
                Start Detecting →
              </button>

              <button
                className="button secondary large-button"
                onClick={() => setPage("integrations")}
              >
                Connect Systems
              </button>
            </div>

            <div className="hero-numbers">
              <div>
                <strong>₹4.8Cr</strong>
                <span>Potential leakage detected</span>
              </div>

              <div>
                <strong>12,840</strong>
                <span>Signals analyzed</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Continuous monitoring</span>
              </div>
            </div>
          </section>

          <section className="landing-section">
            <div className="section-heading">
              <span>01</span>
              <div>
                <h2>Connect Existing Business Systems</h2>
                <p>
                  LeakLeans sits above the systems your business already uses.
                </p>
              </div>
            </div>

            <div className="logo-preview-grid">
              {integrations.slice(0, 6).map((item) => (
                <div className="logo-preview-card" key={item.id}>
                  <div className="logo-card-image">
                    <Logo item={item} />
                  </div>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="landing-section">
            <div className="section-heading">
              <span>02</span>
              <div>
                <h2>Detect → Investigate → Explain → Resolve</h2>
                <p>
                  Turn disconnected business signals into measurable action.
                </p>
              </div>
            </div>

            <div className="process-grid">
              <div className="process-card">
                <b>01</b>
                <h3>Detect</h3>
                <p>
                  Identify missed opportunities, delays, unusual activity
                  and workflow gaps.
                </p>
              </div>

              <div className="process-card">
                <b>02</b>
                <h3>Investigate</h3>
                <p>
                  Connect signals across CRM, calls, messaging and other
                  business systems.
                </p>
              </div>

              <div className="process-card">
                <b>03</b>
                <h3>Explain</h3>
                <p>
                  Show probable cause, affected workflow and potential
                  business impact.
                </p>
              </div>

              <div className="process-card">
                <b>04</b>
                <h3>Resolve</h3>
                <p>
                  Recommend or automate an action and measure recovered value.
                </p>
              </div>
            </div>
          </section>

          <section className="landing-section product-position">
            <div className="position-card">
              <span className="eyebrow">THE LEAKLEANS LAYER</span>
              <h2>
                Your CRM records what happened.
                <br />
                <span>LeakLeans looks for what was missed.</span>
              </h2>

              <div className="architecture">
                <div>Salesforce</div>
                <div>Genesys</div>
                <div>WhatsApp</div>
                <div>Avaya</div>
                <div>CRM</div>
                <div className="architecture-main">
                  LEAKLEANS
                </div>
                <div>Detect</div>
                <div>Investigate</div>
                <div>Explain</div>
                <div>Resolve</div>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-brand">
            <strong>LEAKLEANS</strong>
            <span>Find Where Your Revenue Is Leaking.</span>
          </div>

          <div>
            <small>FOUNDER</small>
            <strong>ANIKET MOHITE</strong>
          </div>

          <div>
            <small>CONTACT</small>
            <a href="tel:8698382024">8698382024</a>
          </div>

          <div>
            <small>EMAIL</small>
            <a href="mailto:Aniket.Mohite@supportleaklens.com">
              Aniket.Mohite@supportleaklens.com
            </a>
          </div>
        </footer>
      </div>
    );
  }

  /* =======================================================
     APP SHELL
  ======================================================= */

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div
            className="sidebar-brand clickable"
            onClick={() => setPage("home")}
          >
            <div className="brand-symbol">L</div>
            <strong>LEAKLEANS</strong>
          </div>

          <div className="sidebar-label">
            INTELLIGENCE PLATFORM
          </div>

          <nav className="sidebar-nav">
            <button
              className={page === "dashboard" ? "active" : ""}
              onClick={() => setPage("dashboard")}
            >
              <span>⌂</span>
              Dashboard
            </button>

            <button
              className={page === "leaks" ? "active" : ""}
              onClick={() => setPage("leaks")}
            >
              <span>◈</span>
              Revenue Leaks
              <em>24</em>
            </button>

            <button
              className={page === "integrations" ? "active" : ""}
              onClick={() => setPage("integrations")}
            >
              <span>◎</span>
              Integrations
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
              <span>→</span>
              Actions
            </button>

            <button
              className={page === "billing" ? "active" : ""}
              onClick={() => setPage("billing")}
            >
              <span>₹</span>
              Billing
            </button>

            <button
              className={page === "settings" ? "active" : ""}
              onClick={() => setPage("settings")}
            >
              <span>⚙</span>
              Settings
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-founder">
            <div className="avatar">AM</div>
            <div>
              <strong>ANIKET MOHITE</strong>
              <span>Founder · LeakLeans</span>
            </div>
          </div>

          <button
            className="website-button"
            onClick={() => setPage("home")}
          >
            ← Website
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="dashboard-header">
          <div>
            <span className="eyebrow">LEAKLEANS INTELLIGENCE</span>

            <h1>
              {page === "dashboard" && "Revenue Overview"}
              {page === "leaks" && "Revenue Leaks"}
              {page === "integrations" && "Connect Your Systems"}
              {page === "analytics" && "Analytics"}
              {page === "actions" && "Resolution Actions"}
              {page === "billing" && "Billing & Payments"}
              {page === "settings" && "Workspace Settings"}
            </h1>
          </div>

          <div className="header-user">
            <div className="avatar">AM</div>
            <div>
              <strong>ANIKET MOHITE</strong>
              <span>Founder</span>
            </div>
          </div>
        </header>

        {/* =================================================
            DASHBOARD
        ================================================= */}

        {page === "dashboard" && (
          <div className="content">
            <div className="metric-grid">
              <div className="metric-card">
                <span>Potential Leakage</span>
                <strong>₹4.8Cr</strong>
                <small>Across detected signals</small>
              </div>

              <div className="metric-card">
                <span>Open Leaks</span>
                <strong>24</strong>
                <small>Requiring investigation</small>
              </div>

              <div className="metric-card">
                <span>Recovered Value</span>
                <strong>₹82L</strong>
                <small>Tracked by LeakLeans</small>
              </div>

              <div className="metric-card">
                <span>Systems Connected</span>
                <strong>{connected.length}</strong>
                <small>of {integrations.length} systems</small>
              </div>
            </div>

            <section className="dashboard-section">
              <div className="section-title-row">
                <div>
                  <span className="eyebrow">DETECTION ENGINE</span>
                  <h2>Latest Revenue Leaks</h2>
                </div>

                <button
                  className="text-button"
                  onClick={() => setPage("leaks")}
                >
                  View all →
                </button>
              </div>

              <LeakTable
                resolved={resolvedLeaks}
                onSelect={setSelectedLeak}
              />
            </section>

            <section className="dashboard-section">
              <div className="section-title-row">
                <div>
                  <span className="eyebrow">DATA SOURCES</span>
                  <h2>Your Connected Systems</h2>
                </div>

                <button
                  className="text-button"
                  onClick={() => setPage("integrations")}
                >
                  Manage →
                </button>
              </div>

              <div className="connected-strip">
                {integrations.slice(0, 6).map((item) => (
                  <div className="connected-mini" key={item.id}>
                    <Logo item={item} />

                    <div>
                      <strong>{item.name}</strong>
                      <span>
                        {isConnected(item.id)
                          ? "Connected"
                          : "Not connected"}
                      </span>
                    </div>

                    <i
                      className={
                        isConnected(item.id) ? "live-dot" : "dead-dot"
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =================================================
            LEAKS
        ================================================= */}

        {page === "leaks" && (
          <div className="content">
            <div className="page-intro">
              <span className="eyebrow">DETECTION ENGINE</span>
              <h2>Potential Revenue Leakage</h2>
              <p>
                Investigate signals detected across your connected systems.
              </p>
            </div>

            <LeakTable
              resolved={resolvedLeaks}
              onSelect={setSelectedLeak}
            />
          </div>
        )}

        {/* =================================================
            INTEGRATIONS
        ================================================= */}

        {page === "integrations" && (
          <div className="content">
            <div className="page-intro">
              <span className="eyebrow">SYSTEM CONNECTIONS</span>
              <h2>Connect Your Existing Systems</h2>
              <p>
                Use automatic authorization where available or enter the
                required API connection information manually.
              </p>
            </div>

            <div className="integration-grid">
              {integrations.map((item) => (
                <div className="integration-card" key={item.id}>
                  <div className="integration-card-head">
                    <div className="integration-logo-box">
                      <Logo item={item} large />
                    </div>

                    <span className="category">
                      {item.category}
                    </span>
                  </div>

                  <h3>{item.name}</h3>

                  <p>{item.description}</p>

                  <StatusBadge connected={isConnected(item.id)} />

                  <button
                    className={`button ${
                      isConnected(item.id)
                        ? "secondary"
                        : "primary"
                    } full"
                    onClick={() => openIntegration(item)}
                  >
                    {isConnected(item.id)
                      ? "Manage Connection"
                      : "Connect System"}
                  </button>
                </div>
              ))}
            </div>

            <div className="integration-note">
              <strong>🔒 Security architecture</strong>
              <p>
                Production LeakLeans should use OAuth where supported and
                send manual credentials to a secure backend. Customer
                passwords should never be requested by LeakLeans.
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            ANALYTICS
        ================================================= */}

        {page === "analytics" && (
          <div className="content">
            <div className="page-intro">
              <span className="eyebrow">BUSINESS IMPACT</span>
              <h2>Leakage Analytics</h2>
              <p>
                Understand where potential revenue loss is originating.
              </p>
            </div>

            <div className="analytics-grid">
              <div className="analytics-card">
                <span>Potential leakage by category</span>

                <div className="bar-row">
                  <label>Follow-up Failure</label>
                  <div className="bar">
                    <i style={{ width: "90%" }} />
                  </div>
                  <strong>₹2.1Cr</strong>
                </div>

                <div className="bar-row">
                  <label>Missed Calls</label>
                  <div className="bar">
                    <i style={{ width: "66%" }} />
                  </div>
                  <strong>₹1.4Cr</strong>
                </div>

                <div className="bar-row">
                  <label>Response Delay</label>
                  <div className="bar">
                    <i style={{ width: "46%" }} />
                  </div>
                  <strong>₹78L</strong>
                </div>

                <div className="bar-row">
                  <label>Workflow Gaps</label>
                  <div className="bar">
                    <i style={{ width: "34%" }} />
                  </div>
                  <strong>₹56L</strong>
                </div>
              </div>

              <div className="analytics-card highlight">
                <span>Recovery rate</span>
                <strong>17.2%</strong>
                <p>
                  Demonstration metric showing recovered value from
                  identified leakage opportunities.
                </p>
              </div>
            </div>

            <div className="signal-grid">
              <div>
                <span>Sales signals</span>
                <strong>4,821</strong>
              </div>
              <div>
                <span>Call signals</span>
                <strong>3,204</strong>
              </div>
              <div>
                <span>Message signals</span>
                <strong>2,981</strong>
              </div>
              <div>
                <span>Workflow signals</span>
                <strong>1,834</strong>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            ACTIONS
        ================================================= */}

        {page === "actions" && (
          <div className="content">
            <div className="page-intro">
              <span className="eyebrow">RESOLUTION ENGINE</span>
              <h2>Recommended Actions</h2>
              <p>
                Convert detected leakage into business action.
              </p>
            </div>

            <div className="action-list">
              <Action
                number="01"
                title="Assign missed leads automatically"
                description="Route unowned leads to the appropriate sales representative."
              />

              <Action
                number="02"
                title="Trigger follow-up notifications"
                description="Notify responsible teams when customers are waiting."
              />

              <Action
                number="03"
                title="Escalate high-value opportunities"
                description="Prioritize leakage opportunities with significant potential impact."
              />

              <Action
                number="04"
                title="Monitor unresolved conversations"
                description="Continue monitoring until the customer interaction receives an outcome."
              />
            </div>
          </div>
        )}

        {/* =================================================
            BILLING
        ================================================= */}

        {page === "billing" && (
          <div className="content">
            <div className="page-intro">
              <span className="eyebrow">SUBSCRIPTION</span>
              <h2>LeakLeans Billing</h2>
              <p>
                Choose a LeakLeans plan and select your payment provider.
              </p>
            </div>

            <div className="pricing-grid">
              {plans.map((plan) => (
                <div
                  className={`pricing-card ${
                    plan.popular ? "popular" : ""
                  }`}
                  key={plan.id}
                >
                  {plan.popular && (
                    <div className="popular-label">
                      BUSINESS
                    </div>
                  )}

                  <span className="plan-name">{plan.name}</span>

                  <div className="plan-price">
                    {plan.price}
                    <small>{plan.period}</small>
                  </div>

                  <p>{plan.description}</p>

                  <div className="plan-features">
                    {plan.features.map((feature) => (
                      <div key={feature}>
                        <i>✓</i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`button ${
                      plan.popular ? "primary" : "secondary"
                    } full`}
                    onClick={() => choosePlan(plan)}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              ))}
            </div>

            {selectedPlan && (
              <div className="checkout-section">
                <div className="checkout-heading">
                  <div>
                    <span className="eyebrow">CHECKOUT</span>
                    <h2>{selectedPlan.name} Plan</h2>
                  </div>

                  <strong>
                    {selectedPlan.price}
                    <small>/month</small>
                  </strong>
                </div>

                <div className="payment-region">
                  <div>
                    <span className="region-title">
                      🇮🇳 INDIA
                    </span>

                    <PaymentCard
                      provider={paymentProviders[0]}
                      selected={selectedPayment}
                      onClick={startPayment}
                    />
                  </div>

                  <div>
                    <span className="region-title">
                      🌎 INTERNATIONAL
                    </span>

                    <div className="international-payment-grid">
                      {paymentProviders.slice(1).map((provider) => (
                        <PaymentCard
                          key={provider.id}
                          provider={provider}
                          selected={selectedPayment}
                          onClick={startPayment}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="payment-security">
                  <span>🔒 Secure payment architecture</span>
                  <p>
                    LeakLeans should never store customer card information.
                    Production checkout will be handled by the selected
                    payment provider.
                  </p>
                </div>
              </div>
            )}

            <div className="billing-info">
              <div>
                <span>Current plan</span>
                <strong>
                  {selectedPlan
                    ? selectedPlan.name
                    : "No active subscription"}
                </strong>
              </div>

              <div>
                <span>Payment status</span>
                <strong>Demo / Not activated</strong>
              </div>

              <div>
                <span>Billing cycle</span>
                <strong>Monthly</strong>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            SETTINGS
        ================================================= */}

        {page === "settings" && (
          <div className="content">
            <div className="page-intro">
              <span className="eyebrow">WORKSPACE</span>
              <h2>Settings</h2>
              <p>Manage your LeakLeans workspace information.</p>
            </div>

            <div className="settings-grid">
              <div className="settings-card">
                <span>Founder</span>
                <strong>ANIKET MOHITE</strong>
              </div>

              <div className="settings-card">
                <span>Contact</span>
                <strong>8698382024</strong>
              </div>

              <div className="settings-card">
                <span>Email</span>
                <strong>
                  Aniket.Mohite@supportleaklens.com
                </strong>
              </div>

              <div className="settings-card">
                <span>Company</span>
                <strong>LeakLeans</strong>
              </div>
            </div>

            <div className="settings-large">
              <span className="eyebrow">PLATFORM</span>
              <h3>Revenue Leakage Intelligence</h3>

              <p>
                LeakLeans is designed as an intelligence layer over existing
                business systems. It does not replace the customer's CRM,
                contact center or communication platform.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================
          INTEGRATION MODAL
      ===================================================== */}

      {selectedIntegration && (
        <Modal onClose={closeIntegration}>
          <div className="modal-brand">
            <div className="modal-logo">
              <Logo item={selectedIntegration} large />
            </div>

            <div>
              <span className="eyebrow">
                SYSTEM CONNECTION
              </span>
              <h2>{selectedIntegration.name}</h2>
            </div>
          </div>

          {!connectionMode && (
            <>
              <p className="modal-description">
                Choose how you want to connect{" "}
                <strong>{selectedIntegration.name}</strong>{" "}
                to LeakLeans.
              </p>

              <div className="connection-options">
                <button
                  className="connection-option"
                  onClick={() =>
                    setConnectionMode("automatic")
                  }
                >
                  <div className="option-icon">⚡</div>

                  <div>
                    <strong>Connect Automatically</strong>
                    <span>
                      Recommended. Authorize LeakLeans through
                      the platform.
                    </span>
                  </div>

                  <b>→</b>
                </button>

                <button
                  className="connection-option"
                  onClick={() =>
                    setConnectionMode("manual")
                  }
                >
                  <div className="option-icon">🔑</div>

                  <div>
                    <strong>Enter Manually</strong>
                    <span>
                      Enter the API or connection details
                      provided by your administrator.
                    </span>
                  </div>

                  <b>→</b>
                </button>
              </div>

              <div className="security-box">
                <strong>🔒 Secure connection</strong>
                <span>
                  LeakLeans should never ask customers for their
                  normal platform password.
                </span>
              </div>
            </>
          )}

          {connectionMode === "automatic" && (
            <div className="connection-method">
              <button
                className="back-link"
                onClick={() => setConnectionMode("")}
              >
                ← Back
              </button>

              <h3>Automatic Authorization</h3>

              <p>
                In the production version, LeakLeans will redirect
                you to the platform's authorization page.
              </p>

              <div className="oauth-steps">
                <div>
                  <b>01</b>
                  <span>Sign in to your platform account.</span>
                </div>

                <div>
                  <b>02</b>
                  <span>Review LeakLeans permissions.</span>
                </div>

                <div>
                  <b>03</b>
                  <span>Approve the connection.</span>
                </div>

                <div>
                  <b>04</b>
                  <span>Return to LeakLeans.</span>
                </div>
              </div>

              <button
                className="button primary full"
                onClick={automaticConnection}
              >
                Continue to {selectedIntegration.name} →
              </button>

              <small className="demo-warning">
                Demo mode — real OAuth/API authorization is not
                connected yet.
              </small>
            </div>
          )}

          {connectionMode === "manual" && (
            <div className="connection-method">
              <button
                className="back-link"
                onClick={() => setConnectionMode("")}
              >
                ← Back
              </button>

              <h3>Manual Connection</h3>

              <p>
                Enter the connection information supplied by your
                system administrator.
              </p>

              <div className="manual-form">
                {selectedIntegration.fields.map(
                  ([key, label, placeholder]) => {
                    const secret =
                      key.toLowerCase().includes("secret") ||
                      key.toLowerCase().includes("token") ||
                      key.toLowerCase().includes("key");

                    return (
                      <label key={key}>
                        <span>{label}</span>

                        <input
                          type={secret ? "password" : "text"}
                          placeholder={placeholder}
                          value={manualData[key] || ""}
                          onChange={(e) =>
                            setManualData({
                              ...manualData,
                              [key]: e.target.value,
                            })
                          }
                        />
                      </label>
                    );
                  }
                )}
              </div>

              <div className="security-box">
                <strong>🔒 Production security</strong>
                <span>
                  These demo fields are not connected to an
                  external service. Production credentials should
                  be sent directly to a secure LeakLeans backend
                  and encrypted.
                </span>
              </div>

              <button
                className="button primary full"
                onClick={manualConnection}
              >
                Save & Connect
              </button>

              <small className="demo-warning">
                Demo mode — information entered here is not sent
                anywhere.
              </small>
            </div>
          )}
        </Modal>
      )}

      {/* =====================================================
          LEAK INVESTIGATION MODAL
      ===================================================== */}

      {selectedLeak && (
        <Modal onClose={() => setSelectedLeak(null)} wide>
          <div className="investigation-header">
            <div>
              <span className="eyebrow">
                LEAK INVESTIGATION
              </span>
              <h2>{selectedLeak.title}</h2>
            </div>

            <strong>{selectedLeak.amount}</strong>
          </div>

          <div className="investigation-meta">
            <div>
              <span>Customer</span>
              <strong>{selectedLeak.customer}</strong>
            </div>

            <div>
              <span>Source</span>
              <strong>{selectedLeak.source}</strong>
            </div>

            <div>
              <span>Signal</span>
              <strong>{selectedLeak.signal}</strong>
            </div>

            <div>
              <span>Severity</span>
              <strong>{selectedLeak.severity}</strong>
            </div>
          </div>

          <div className="investigation-block">
            <span>PROBABLE CAUSE</span>
            <p>{selectedLeak.cause}</p>
          </div>

          <div className="investigation-block">
            <span>BUSINESS IMPACT</span>
            <p>
              Potential revenue opportunity associated with this
              signal: <strong>{selectedLeak.amount}</strong>.
            </p>
          </div>

          <div className="investigation-block">
            <span>RECOMMENDED RESOLUTION</span>
            <p>{selectedLeak.resolution}</p>
          </div>

          <button
            className="button primary full"
            onClick={() => resolveLeak(selectedLeak.id)}
          >
            Mark Resolution Complete
          </button>
        </Modal>
      )}
    </div>
  );
}

/* =========================================================
   TABLE
========================================================= */

function LeakTable({ resolved, onSelect }) {
  return (
    <div className="table-card">
      <div className="table-head">
        <span>Revenue Leak</span>
        <span>Customer</span>
        <span>Source</span>
        <span>Potential Impact</span>
        <span>Severity</span>
        <span>Status</span>
      </div>

      {demoLeaks.map((leak) => {
        const isResolved = resolved.includes(leak.id);

        return (
          <button
            className="table-row"
            key={leak.id}
            onClick={() => onSelect(leak)}
          >
            <span>
              <strong>{leak.title}</strong>
              <small>{leak.signal}</small>
            </span>

            <span>{leak.customer}</span>

            <span>{leak.source}</span>

            <span className="table-impact">
              {leak.amount}
            </span>

            <span>
              <i
                className={`severity ${leak.severity.toLowerCase()}`}
              >
                {leak.severity}
              </i>
            </span>

            <span>
              <i
                className={`table-status ${
                  isResolved ? "resolved" : ""
                }`}
              >
                {isResolved ? "Resolved" : leak.status}
              </i>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   ACTION
========================================================= */

function Action({ number, title, description }) {
  return (
    <div className="action-card">
      <div className="action-number">{number}</div>

      <div className="action-content">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button className="button secondary">
        Review
      </button>
    </div>
  );
}

/* =========================================================
   PAYMENT CARD
========================================================= */

function PaymentCard({ provider, selected, onClick }) {
  return (
    <button
      className={`payment-card ${
        selected?.id === provider.id ? "selected" : ""
      }`}
      onClick={() => onClick(provider)}
    >
      <div className="payment-logo">
        <Logo item={provider} />
      </div>

      <div className="payment-content">
        <strong>{provider.name}</strong>
        <span>{provider.description}</span>
        <small>{provider.methods}</small>
      </div>

      <b>→</b>
    </button>
  );
}