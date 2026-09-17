import React, { useState } from "react";
import "./App.css";

const integrations = [
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    logo: "https://cdn.simpleicons.org/salesforce",
    description: "Connect leads, opportunities, activities and customer records.",
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
    description: "Analyze customer conversations, response times and missed opportunities.",
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
    description: "Connect calls, queues, agents and customer interaction signals.",
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
    description: "Connect customer calls and contact-center operational signals.",
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
    description: "Connect contacts, deals, activities and pipeline information.",
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
    description: "Analyze customer emails, response delays and follow-up gaps.",
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
    description: "Connect tickets, support conversations and unresolved issues.",
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
    description: "Connect your own CRM or business platform through an API.",
    fields: [
      ["baseUrl", "API Base URL", "https://api.company.com"],
      ["apiKey", "API Key", "Enter API Key"],
      ["apiSecret", "API Secret", "Enter API Secret"],
    ],
  },
];

const payments = [
  {
    id: "razorpay",
    name: "Razorpay",
    region: "India",
    logo: "https://cdn.simpleicons.org/razorpay",
    methods: "UPI • Cards • Net Banking",
  },
  {
    id: "stripe",
    name: "Stripe",
    region: "International",
    logo: "https://cdn.simpleicons.org/stripe",
    methods: "Cards • International • Multi-currency",
  },
  {
    id: "paypal",
    name: "PayPal",
    region: "International",
    logo: "https://cdn.simpleicons.org/paypal",
    methods: "PayPal • International",
  },
];

const plans = [
  {
    id: "small",
    name: "Small",
    price: "₹20,999",
    description: "For smaller businesses starting with revenue intelligence.",
    features: [
      "Up to 3 connected systems",
      "Revenue leak detection",
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
    description: "For growing companies with multiple teams and systems.",
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
    description: "For large organizations with complex workflows.",
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

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    customer: "Enterprise Lead #1042",
    source: "Salesforce",
    amount: "₹2,40,000",
    severity: "High",
    status: "Open",
    signal: "Lead → Sales",
    cause: "Customer interaction was recorded but no follow-up activity was detected.",
    resolution: "Assign the opportunity to the responsible sales representative and trigger a follow-up task.",
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
    cause: "An inbound customer call was not followed by an appropriate sales or service action.",
    resolution: "Create a callback task and notify the responsible team immediately.",
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
    cause: "The customer waited beyond the configured response window.",
    resolution: "Escalate delayed conversations and assign an owner automatically.",
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
    cause: "The opportunity moved between teams without a clearly detected owner.",
    resolution: "Assign ownership and monitor the opportunity until the next customer action.",
  },
];

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
      src={item.logo}
      alt={`${item.name} logo`}
      className={`brand-logo ${large ? "large" : ""}`}
      onError={() => setFailed(true)}
    />
  );
}

function Modal({ children, onClose, wide = false }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal ${wide ? "wide" : ""}`}
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

function Status({ connected }) {
  return (
    <span className={`status ${connected ? "on" : "off"}`}>
      <i />
      {connected ? "Connected" : "Not connected"}
    </span>
  );
}

function LeakTable({ resolved, onOpen }) {
  return (
    <div className="leak-table">
      <div className="table-header">
        <span>Leak</span>
        <span>Customer</span>
        <span>Source</span>
        <span>Impact</span>
        <span>Severity</span>
        <span>Status</span>
      </div>

      {leaks.map((leak) => {
        const done = resolved.includes(leak.id);

        return (
          <button
            className="table-row"
            key={leak.id}
            onClick={() => onOpen(leak)}
          >
            <span>
              <strong>{leak.title}</strong>
              <small>{leak.signal}</small>
            </span>

            <span>{leak.customer}</span>
            <span>{leak.source}</span>

            <strong className="impact">{leak.amount}</strong>

            <span>
              <em className={`severity ${leak.severity.toLowerCase()}`}>
                {leak.severity}
              </em>
            </span>

            <span>
              <em className={`leak-status ${done ? "resolved" : ""}`}>
                {done ? "Resolved" : leak.status}
              </em>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [connected, setConnected] = useState([]);
  const [integration, setIntegration] = useState(null);
  const [mode, setMode] = useState("");
  const [manual, setManual] = useState({});
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [resolved, setResolved] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const connectedCheck = (id) => connected.includes(id);

  const connect = (id) => {
    setConnected((old) => (old.includes(id) ? old : [...old, id]));
  };

  const automaticConnect = () => {
    connect(integration.id);
    alert(
      `${integration.name}\n\nDemo OAuth authorization started.\n\nProduction version will redirect the customer to the platform authorization page.`
    );
    closeIntegration();
  };

  const manualConnect = () => {
    const missing = integration.fields.some(
      ([key]) => !manual[key]?.trim()
    );

    if (missing) {
      alert("Please complete all required fields.");
      return;
    }

    connect(integration.id);

    alert(
      `${integration.name}\n\nManual connection saved in demo mode.\n\nNo credentials were sent to an external service.`
    );

    closeIntegration();
  };

  const closeIntegration = () => {
    setIntegration(null);
    setMode("");
    setManual({});
  };

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    setPage("billing");
  };

  const payment = (provider) => {
    if (!selectedPlan) {
      alert("Please select a plan first.");
      return;
    }

    alert(
      `${provider.name} selected.\n\n${selectedPlan.name} Plan — ${selectedPlan.price}/month.\n\nProduction payment processing requires merchant onboarding and backend integration.`
    );
  };

  /* ================= LANDING ================= */

  if (page === "home") {
    return (
      <div className="landing-page">
        <header className="topbar">
          <div className="logo-lockup" onClick={() => setPage("home")}>
            <div className="logo-square">L</div>
            <div>
              <b>LEAKLEANS</b>
              <small>Revenue Leakage Intelligence</small>
            </div>
          </div>

          <div className="founder">
            <div>
              <small>FOUNDER</small>
              <b>ANIKET MOHITE</b>
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
            className="btn primary"
            onClick={() => setPage("dashboard")}
          >
            Open Dashboard
          </button>
        </header>

        <section className="hero">
          <div className="hero-tag">
            REVENUE LEAKAGE INTELLIGENCE SYSTEM
          </div>

          <h1>
            Find Where Your
            <span>Revenue Is Leaking.</span>
          </h1>

          <p>
            LeakLeans connects with the systems your business already uses
            and finds revenue leakage hiding between them.
          </p>

          <div className="hero-buttons">
            <button
              className="btn primary big"
              onClick={() => setPage("dashboard")}
            >
              Start Detecting →
            </button>

            <button
              className="btn secondary big"
              onClick={() => setPage("integrations")}
            >
              Connect Systems
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <b>₹4.8Cr</b>
              <span>Potential leakage</span>
            </div>

            <div>
              <b>12,840</b>
              <span>Signals analyzed</span>
            </div>

            <div>
              <b>24/7</b>
              <span>Monitoring</span>
            </div>
          </div>
        </section>

        <section className="landing-section">
          <div className="section-number">01</div>

          <div className="section-title">
            <h2>Connect Existing Business Systems</h2>
            <p>
              LeakLeans works as an intelligence layer above your existing
              systems.
            </p>
          </div>

          <div className="logo-grid">
            {integrations.slice(0, 6).map((item) => (
              <div className="logo-tile" key={item.id}>
                <div className="logo-white">
                  <Logo item={item} />
                </div>
                <b>{item.name}</b>
                <small>{item.category}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section">
          <div className="section-number">02</div>

          <div className="section-title">
            <h2>Detect → Investigate → Explain → Resolve</h2>
            <p>
              Turn disconnected business signals into measurable action.
            </p>
          </div>

          <div className="process-grid">
            {[
              ["01", "Detect", "Find missed opportunities, delays and workflow gaps."],
              ["02", "Investigate", "Connect signals across business systems."],
              ["03", "Explain", "Show probable cause and potential business impact."],
              ["04", "Resolve", "Recommend actions and measure recovered value."],
            ].map(([num, title, text]) => (
              <div className="process-card" key={num}>
                <b>{num}</b>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="architecture-section">
          <div className="architecture-card">
            <span className="hero-tag">THE LEAKLEANS LAYER</span>

            <h2>
              Your CRM records what happened.
              <span>LeakLeans looks for what was missed.</span>
            </h2>

            <div className="architecture">
              <div>Salesforce</div>
              <div>Genesys</div>
              <div>WhatsApp</div>
              <div>Avaya</div>
              <div>CRM</div>

              <strong>LEAKLEANS</strong>

              <div>Detect</div>
              <div>Investigate</div>
              <div>Explain</div>
              <div>Resolve</div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div>
            <b>LEAKLEANS</b>
            <span>Find Where Your Revenue Is Leaking.</span>
          </div>

          <div>
            <small>FOUNDER</small>
            <b>ANIKET MOHITE</b>
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

  /* ================= APP ================= */

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="side-brand" onClick={() => setPage("home")}>
            <div className="logo-square">L</div>
            <b>LEAKLEANS</b>
          </div>

          <small className="side-label">INTELLIGENCE PLATFORM</small>

          <nav>
            {[
              ["dashboard", "⌂", "Dashboard"],
              ["leaks", "◈", "Revenue Leaks"],
              ["integrations", "◎", "Integrations"],
              ["analytics", "◒", "Analytics"],
              ["actions", "→", "Actions"],
              ["billing", "₹", "Billing"],
              ["settings", "⚙", "Settings"],
            ].map(([id, icon, label]) => (
              <button
                key={id}
                className={page === id ? "active" : ""}
                onClick={() => setPage(id)}
              >
                <span>{icon}</span>
                {label}
                {id === "leaks" && <em>24</em>}
              </button>
            ))}
          </nav>
        </div>

        <div className="side-bottom">
          <div className="profile">
            <div className="avatar">AM</div>
            <div>
              <b>ANIKET MOHITE</b>
              <small>Founder · LeakLeans</small>
            </div>
          </div>

          <button className="website" onClick={() => setPage("home")}>
            ← Website
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-top">
          <div>
            <span className="hero-tag">LEAKLEANS INTELLIGENCE</span>
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

          <div className="user-top">
            <div className="avatar">AM</div>
            <div>
              <b>ANIKET MOHITE</b>
              <small>Founder</small>
            </div>
          </div>
        </header>

        {/* DASHBOARD */}

        {page === "dashboard" && (
          <div className="content">
            <div className="metrics">
              <div>
                <span>Potential Leakage</span>
                <b>₹4.8Cr</b>
                <small>Across detected signals</small>
              </div>

              <div>
                <span>Open Leaks</span>
                <b>24</b>
                <small>Requiring investigation</small>
              </div>

              <div>
                <span>Recovered Value</span>
                <b>₹82L</b>
                <small>Tracked by LeakLeans</small>
              </div>

              <div>
                <span>Systems Connected</span>
                <b>{connected.length}</b>
                <small>of {integrations.length}</small>
              </div>
            </div>

            <section className="dashboard-section">
              <div className="section-bar">
                <div>
                  <span className="hero-tag">DETECTION ENGINE</span>
                  <h2>Latest Revenue Leaks</h2>
                </div>

                <button
                  className="text-btn"
                  onClick={() => setPage("leaks")}
                >
                  View all →
                </button>
              </div>

              <LeakTable
                resolved={resolved}
                onOpen={setSelectedLeak}
              />
            </section>

            <section className="dashboard-section">
              <div className="section-bar">
                <div>
                  <span className="hero-tag">DATA SOURCES</span>
                  <h2>Connected Systems</h2>
                </div>

                <button
                  className="text-btn"
                  onClick={() => setPage("integrations")}
                >
                  Manage →
                </button>
              </div>

              <div className="mini-systems">
                {integrations.slice(0, 6).map((item) => (
                  <div key={item.id}>
                    <Logo item={item} />
                    <span>
                      <b>{item.name}</b>
                      <small>
                        {connectedCheck(item.id)
                          ? "Connected"
                          : "Not connected"}
                      </small>
                    </span>
                    <i
                      className={
                        connectedCheck(item.id) ? "live" : "dead"
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* LEAKS */}

        {page === "leaks" && (
          <div className="content">
            <div className="page-intro">
              <span className="hero-tag">DETECTION ENGINE</span>
              <h2>Potential Revenue Leakage</h2>
              <p>
                Investigate signals detected across your connected systems.
              </p>
            </div>

            <LeakTable
              resolved={resolved}
              onOpen={setSelectedLeak}
            />
          </div>
        )}

        {/* INTEGRATIONS */}

        {page === "integrations" && (
          <div className="content">
            <div className="page-intro">
              <span className="hero-tag">SYSTEM CONNECTIONS</span>
              <h2>Connect Your Existing Systems</h2>
              <p>
                Connect automatically through authorization or enter
                platform-specific API details manually.
              </p>
            </div>

            <div className="integration-grid">
              {integrations.map((item) => (
                <div className="integration-card" key={item.id}>
                  <div className="integration-top">
                    <div className="integration-logo">
                      <Logo item={item} large />
                    </div>

                    <span>{item.category}</span>
                  </div>

                  <h3>{item.name}</h3>
                  <p>{item.description}</p>

                  <Status connected={connectedCheck(item.id)} />

                  <button
                    className={`btn ${
                      connectedCheck(item.id)
                        ? "secondary"
                        : "primary"
                    } full`}
                    onClick={() => {
                      setIntegration(item);
                      setMode("");
                      setManual({});
                    }}
                  >
                    {connectedCheck(item.id)
                      ? "Manage Connection"
                      : "Connect System"}
                  </button>
                </div>
              ))}
            </div>

            <div className="security-note">
              <b>🔒 Secure connection architecture</b>
              <p>
                Production LeakLeans should use OAuth where available.
                Customer platform passwords should never be requested.
                Manual credentials should be sent to a secure backend and
                encrypted.
              </p>
            </div>
          </div>
        )}

        {/* ANALYTICS */}

        {page === "analytics" && (
          <div className="content">
            <div className="page-intro">
              <span className="hero-tag">BUSINESS IMPACT</span>
              <h2>Leakage Analytics</h2>
              <p>
                Understand where potential revenue loss is originating.
              </p>
            </div>

            <div className="analytics">
              <div className="analytics-card">
                <span>Potential leakage by category</span>

                {[
                  ["Follow-up Failure", "₹2.1Cr", "90%"],
                  ["Missed Calls", "₹1.4Cr", "66%"],
                  ["Response Delay", "₹78L", "46%"],
                  ["Workflow Gaps", "₹56L", "34%"],
                ].map(([name, amount, width]) => (
                  <div className="bar-row" key={name}>
                    <label>{name}</label>
                    <div>
                      <i style={{ width }} />
                    </div>
                    <b>{amount}</b>
                  </div>
                ))}
              </div>

              <div className="analytics-card recovery">
                <span>Recovery rate</span>
                <b>17.2%</b>
                <p>
                  Demonstration metric for value recovered from identified
                  leakage opportunities.
                </p>
              </div>
            </div>

            <div className="signal-grid">
              <div>
                <span>Sales signals</span>
                <b>4,821</b>
              </div>
              <div>
                <span>Call signals</span>
                <b>3,204</b>
              </div>
              <div>
                <span>Message signals</span>
                <b>2,981</b>
              </div>
              <div>
                <span>Workflow signals</span>
                <b>1,834</b>
              </div>
            </div>
          </div>
        )}

        {/* ACTIONS */}

        {page === "actions" && (
          <div className="content">
            <div className="page-intro">
              <span className="hero-tag">RESOLUTION ENGINE</span>
              <h2>Recommended Actions</h2>
              <p>
                Convert detected leakage into measurable business action.
              </p>
            </div>

            <div className="actions">
              {[
                [
                  "01",
                  "Assign missed leads automatically",
                  "Route unowned leads to the appropriate sales representative.",
                ],
                [
                  "02",
                  "Trigger follow-up notifications",
                  "Notify responsible teams when customers are waiting.",
                ],
                [
                  "03",
                  "Escalate high-value opportunities",
                  "Prioritize leakage opportunities with significant potential impact.",
                ],
                [
                  "04",
                  "Monitor unresolved conversations",
                  "Continue monitoring until the customer interaction receives an outcome.",
                ],
              ].map(([num, title, text]) => (
                <div className="action-card" key={num}>
                  <div className="action-number">{num}</div>

                  <div>
                    <b>{title}</b>
                    <p>{text}</p>
                  </div>

                  <button className="btn secondary">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BILLING */}

        {page === "billing" && (
          <div className="content">
            <div className="page-intro">
              <span className="hero-tag">SUBSCRIPTION</span>
              <h2>LeakLeans Billing & Payments</h2>
              <p>
                Select a plan and choose the appropriate payment provider.
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
                    <span className="popular-label">
                      BUSINESS
                    </span>
                  )}

                  <span className="plan-name">{plan.name}</span>

                  <h3>
                    {plan.price}
                    <small>/month</small>
                  </h3>

                  <p>{plan.description}</p>

                  <div className="features">
                    {plan.features.map((feature) => (
                      <span key={feature}>
                        <b>✓</b>
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button
                    className={`btn ${
                      plan.popular ? "primary" : "secondary"
                    } full`}
                    onClick={() => selectPlan(plan)}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              ))}
            </div>

            {selectedPlan && (
              <div className="checkout">
                <div className="checkout-head">
                  <div>
                    <span className="hero-tag">CHECKOUT</span>
                    <h2>{selectedPlan.name} Plan</h2>
                  </div>

                  <strong>
                    {selectedPlan.price}
                    <small>/month</small>
                  </strong>
                </div>

                <div className="payment-columns">
                  <div>
                    <h3>🇮🇳 India</h3>

                    <PaymentCard
                      provider={payments[0]}
                      onClick={payment}
                    />
                  </div>

                  <div>
                    <h3>🌎 International</h3>

                    <div className="payment-list">
                      {payments.slice(1).map((provider) => (
                        <PaymentCard
                          key={provider.id}
                          provider={provider}
                          onClick={payment}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="payment-security">
                  🔒 Production checkout will be handled by the selected
                  payment provider. LeakLeans should not store card details.
                </div>
              </div>
            )}

            <div className="billing-summary">
              <div>
                <span>Current plan</span>
                <b>
                  {selectedPlan
                    ? selectedPlan.name
                    : "No active subscription"}
                </b>
              </div>

              <div>
                <span>Payment status</span>
                <b>Demo / Not activated</b>
              </div>

              <div>
                <span>Billing cycle</span>
                <b>Monthly</b>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS */}

        {page === "settings" && (
          <div className="content">
            <div className="page-intro">
              <span className="hero-tag">WORKSPACE</span>
              <h2>Workspace Settings</h2>
              <p>Manage your LeakLeans workspace information.</p>
            </div>

            <div className="settings-grid">
              <div>
                <span>Founder</span>
                <b>ANIKET MOHITE</b>
              </div>

              <div>
                <span>Contact</span>
                <b>8698382024</b>
              </div>

              <div>
                <span>Email</span>
                <b>Aniket.Mohite@supportleaklens.com</b>
              </div>

              <div>
                <span>Product</span>
                <b>LeakLeans</b>
              </div>
            </div>

            <div className="settings-description">
              <span className="hero-tag">PLATFORM</span>
              <h3>Revenue Leakage Intelligence</h3>
              <p>
                LeakLeans is an intelligence layer over existing business
                systems. It does not replace the customer's CRM, contact
                center or communication platform.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* CONNECTION MODAL */}

      {integration && (
        <Modal onClose={closeIntegration}>
          <div className="modal-title">
            <div className="modal-logo">
              <Logo item={integration} large />
            </div>

            <div>
              <span className="hero-tag">SYSTEM CONNECTION</span>
              <h2>{integration.name}</h2>
            </div>
          </div>

          {!mode && (
            <>
              <p className="modal-text">
                Choose how you want to connect this system to LeakLeans.
              </p>

              <div className="connect-options">
                <button onClick={() => setMode("automatic")}>
                  <span>⚡</span>
                  <div>
                    <b>Connect Automatically</b>
                    <small>
                      Recommended. Authorize LeakLeans through the platform.
                    </small>
                  </div>
                  <strong>→</strong>
                </button>

                <button onClick={() => setMode("manual")}>
                  <span>🔑</span>
                  <div>
                    <b>Enter Manually</b>
                    <small>
                      Enter API or connection details supplied by your
                      administrator.
                    </small>
                  </div>
                  <strong>→</strong>
                </button>
              </div>

              <div className="modal-security">
                <b>🔒 Secure authorization</b>
                <span>
                  LeakLeans should never request the customer's normal
                  platform password.
                </span>
              </div>
            </>
          )}

          {mode === "automatic" && (
            <div className="connection-method">
              <button className="back" onClick={() => setMode("")}>
                ← Back
              </button>

              <h3>Automatic Authorization</h3>

              <p>
                In production, the customer will be redirected to the
                platform's official authorization page.
              </p>

              <div className="oauth-steps">
                <span><b>01</b> Sign in to the platform.</span>
                <span><b>02</b> Review LeakLeans permissions.</span>
                <span><b>03</b> Approve access.</span>
                <span><b>04</b> Return to LeakLeans.</span>
              </div>

              <button
                className="btn primary full"
                onClick={automaticConnect}
              >
                Continue to {integration.name} →
              </button>

              <small className="demo">
                Demo mode — real OAuth/API authorization is not connected yet.
              </small>
            </div>
          )}

          {mode === "manual" && (
            <div className="connection-method">
              <button className="back" onClick={() => setMode("")}>
                ← Back
              </button>

              <h3>Manual Connection</h3>

              <p>
                Enter the connection information supplied by the system
                administrator.
              </p>

              <div className="form">
                {integration.fields.map(([key, label, placeholder]) => {
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
                        value={manual[key] || ""}
                        onChange={(e) =>
                          setManual({
                            ...manual,
                            [key]: e.target.value,
                          })
                        }
                      />
                    </label>
                  );
                })}
              </div>

              <div className="modal-security">
                <b>🔒 Production security</b>
                <span>
                  Demo fields are not sent anywhere. Production credentials
                  should be transmitted to a secure backend and encrypted.
                </span>
              </div>

              <button
                className="btn primary full"
                onClick={manualConnect}
              >
                Save & Connect
              </button>

              <small className="demo">
                Demo mode — information entered here is not sent anywhere.
              </small>
            </div>
          )}
        </Modal>
      )}

      {/* INVESTIGATION MODAL */}

      {selectedLeak && (
        <Modal
          wide
          onClose={() => setSelectedLeak(null)}
        >
          <div className="investigation-head">
            <div>
              <span className="hero-tag">LEAK INVESTIGATION</span>
              <h2>{selectedLeak.title}</h2>
            </div>

            <strong>{selectedLeak.amount}</strong>
          </div>

          <div className="investigation-grid">
            <div>
              <span>Customer</span>
              <b>{selectedLeak.customer}</b>
            </div>

            <div>
              <span>Source</span>
              <b>{selectedLeak.source}</b>
            </div>

            <div>
              <span>Signal</span>
              <b>{selectedLeak.signal}</b>
            </div>

            <div>
              <span>Severity</span>
              <b>{selectedLeak.severity}</b>
            </div>
          </div>

          <div className="investigation-block">
            <span>PROBABLE CAUSE</span>
            <p>{selectedLeak.cause}</p>
          </div>

          <div className="investigation-block">
            <span>BUSINESS IMPACT</span>
            <p>
              Potential revenue opportunity associated with this signal:
              <strong>{selectedLeak.amount}</strong>.
            </p>
          </div>

          <div className="investigation-block">
            <span>RECOMMENDED RESOLUTION</span>
            <p>{selectedLeak.resolution}</p>
          </div>

          <button
            className="btn primary full"
            onClick={() => {
              setResolved((old) =>
                old.includes(selectedLeak.id)
                  ? old
                  : [...old, selectedLeak.id]
              );
              setSelectedLeak(null);
            }}
          >
            Mark Resolution Complete
          </button>
        </Modal>
      )}
    </div>
  );
}

function PaymentCard({ provider, onClick }) {
  return (
    <button className="payment-card" onClick={() => onClick(provider)}>
      <div className="payment-logo">
        <Logo item={provider} />
      </div>

      <div>
        <b>{provider.name}</b>
        <small>{provider.region}</small>
        <span>{provider.methods}</span>
      </div>

      <strong>→</strong>
    </button>
  );
}