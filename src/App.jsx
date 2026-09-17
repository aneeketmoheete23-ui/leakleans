import React, { useState } from "react";
import "./App.css";

const integrations = [
  {
    name: "Salesforce",
    key: "salesforce",
    logo: "https://cdn.simpleicons.org/salesforce",
    description: "CRM, leads, opportunities and follow-ups",
    fields: ["Instance URL", "Client ID", "Client Secret"],
  },
  {
    name: "WhatsApp Business",
    key: "whatsapp",
    logo: "https://cdn.simpleicons.org/whatsapp",
    description: "Customer conversations and response signals",
    fields: ["Business Account ID", "Phone Number ID", "Access Token"],
  },
  {
    name: "Genesys",
    key: "genesys",
    logo: "https://cdn.simpleicons.org/genesys",
    description: "Calls, queues and customer interactions",
    fields: ["Region", "Client ID", "Client Secret"],
  },
  {
    name: "Avaya",
    key: "avaya",
    logo: "https://cdn.simpleicons.org/avaya",
    description: "Contact center and call activity",
    fields: ["Base URL", "Tenant ID", "Client ID", "Client Secret"],
  },
  {
    name: "HubSpot",
    key: "hubspot",
    logo: "https://cdn.simpleicons.org/hubspot",
    description: "CRM and sales pipeline data",
    fields: ["Portal ID", "Private App Token"],
  },
  {
    name: "Gmail",
    key: "gmail",
    logo: "https://cdn.simpleicons.org/gmail",
    description: "Business email response signals",
    fields: ["Workspace Email", "OAuth Client ID", "Client Secret"],
  },
  {
    name: "Zendesk",
    key: "zendesk",
    logo: "https://cdn.simpleicons.org/zendesk",
    description: "Support tickets and customer complaints",
    fields: ["Subdomain", "Admin Email", "API Token"],
  },
  {
    name: "Custom CRM",
    key: "custom",
    logo: null,
    description: "Connect your own CRM or business system",
    fields: ["API Base URL", "API Key", "Data Format"],
  },
];

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    amount: "₹1,48,000",
    severity: "High",
    source: "Salesforce",
    description:
      "Several high-value leads received a quotation but no follow-up was recorded.",
    cause: "Sales handoff and follow-up workflow gap.",
    resolution:
      "Automatically assign the lead to the responsible sales representative and create a follow-up task.",
  },
  {
    id: 2,
    title: "Missed Inbound Calls",
    amount: "₹86,000",
    severity: "High",
    source: "Genesys",
    description:
      "Inbound customer calls were missed during high-volume periods.",
    cause: "Queue overflow and delayed callback process.",
    resolution:
      "Create automatic callbacks and notify the assigned team when calls remain unanswered.",
  },
  {
    id: 3,
    title: "Quote-to-Order Drop",
    amount: "₹2,14,000",
    severity: "Medium",
    source: "Salesforce",
    description:
      "Multiple quotations have remained inactive beyond the expected conversion window.",
    cause: "No structured follow-up after quotation delivery.",
    resolution:
      "Trigger follow-up sequences and alert the sales manager for high-value quotations.",
  },
  {
    id: 4,
    title: "Delayed Response",
    amount: "₹64,000",
    severity: "Medium",
    source: "WhatsApp Business",
    description:
      "Customer enquiries experienced unusually long response times.",
    cause: "Conversation ownership was not assigned quickly.",
    resolution:
      "Route new conversations to the correct team and monitor response SLA.",
  },
  {
    id: 5,
    title: "Repeated Complaint Loop",
    amount: "₹39,000",
    severity: "Low",
    source: "Zendesk",
    description:
      "Customers repeatedly contacted support about unresolved issues.",
    cause: "Ticket resolution and escalation workflow gap.",
    resolution:
      "Escalate repeated complaints and identify unresolved cases automatically.",
  },
];

const plans = [
  {
    name: "Small",
    price: "₹20,999",
    description: "For small teams starting revenue intelligence.",
    features: [
      "Revenue leak detection",
      "Basic integrations",
      "Leak investigation",
      "Basic analytics",
      "Email notifications",
    ],
  },
  {
    name: "Business",
    price: "₹69,999",
    description: "For growing businesses with multiple systems.",
    popular: true,
    features: [
      "Everything in Small",
      "Advanced integrations",
      "Cross-system analysis",
      "AI recommendations",
      "Automated actions",
      "Team workflows",
    ],
  },
  {
    name: "Enterprise",
    price: "₹99,999",
    description: "For organizations with complex operations.",
    features: [
      "Everything in Business",
      "Enterprise integrations",
      "Advanced analytics",
      "Custom workflows",
      "Priority support",
      "Enterprise controls",
    ],
  },
];

const paymentMethods = [
  {
    name: "Razorpay",
    region: "India",
    logo: "https://cdn.simpleicons.org/razorpay",
    detail: "UPI, Cards, Net Banking",
  },
  {
    name: "Stripe",
    region: "International",
    logo: "https://cdn.simpleicons.org/stripe",
    detail: "International Cards & Payments",
  },
  {
    name: "PayPal",
    region: "International",
    logo: "https://cdn.simpleicons.org/paypal",
    detail: "International Payments",
  },
];

function Logo({ item, large = false }) {
  const [error, setError] = useState(false);

  if (!item.logo || error) {
    return (
      <div className={`fallbackLogo ${large ? "large" : ""}`}>
        {item.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)}
      </div>
    );
  }

  return (
    <div className={`realLogo ${large ? "large" : ""}`}>
      <img
        src={item.logo}
        alt={`${item.name} logo`}
        onError={() => setError(true)}
      />
    </div>
  );
}

function Modal({ children, close }) {
  return (
    <div className="modalOverlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={close}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function Landing({ start, integrationsPage }) {
  return (
    <div className="landingPage">
      <header className="landingNav">
        <div className="brand">
          <div className="brandIcon">L</div>
          <div>
            <h2>LeakLeans</h2>
            <span>Revenue Intelligence</span>
          </div>
        </div>

        <div className="founderTop">
          <strong>ANIKET MOHITE</strong>
          <span>Founder, LeakLeans</span>
        </div>

        <button className="navButton" onClick={start}>
          Open Platform
        </button>
      </header>

      <section className="hero">
        <div className="heroBadge">REVENUE INTELLIGENCE SYSTEM</div>

        <h1>
          Find Where Your
          <br />
          <span>Revenue Is Leaking.</span>
        </h1>

        <p>
          LeakLeans connects to the systems your business already uses,
          detects revenue leakage hiding between them, explains why it
          happened, and helps your team resolve it.
        </p>

        <div className="heroActions">
          <button className="primaryButton" onClick={start}>
            Start Leak Detection →
          </button>

          <button className="secondaryButton" onClick={integrationsPage}>
            Explore Integrations
          </button>
        </div>

        <div className="heroDisclaimer">
          LeakLeans is an intelligence layer on top of your existing business
          systems. It does not replace your CRM, contact center, helpdesk or
          accounting system.
        </div>
      </section>

      <section className="integrationPreview">
        <div className="sectionLabel">YOUR EXISTING SYSTEMS</div>
        <h2>One intelligence layer across your business</h2>
        <p>
          Connect CRM, contact center, messaging, email and support platforms.
        </p>

        <div className="logoGrid">
          {integrations.slice(0, 7).map((item) => (
            <div className="logoCard" key={item.key}>
              <Logo item={item} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="processSection">
        <div className="sectionLabel">HOW LEAKLEANS WORKS</div>
        <h2>From signal to resolution</h2>

        <div className="processGrid">
          {[
            ["01", "Detect", "Find suspicious revenue leakage signals."],
            ["02", "Investigate", "Trace the problem across systems."],
            ["03", "Explain", "Understand probable causes and impact."],
            ["04", "Resolve", "Recommend or execute the right action."],
          ].map(([number, title, text]) => (
            <div className="processCard" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricingPreview">
        <div className="sectionLabel">PLANS</div>
        <h2>Choose your operating scale</h2>

        <div className="pricingGrid">
          {plans.map((plan) => (
            <div
              className={`priceCard ${plan.popular ? "featured" : ""}`}
              key={plan.name}
            >
              {plan.popular && <div className="popularTag">POPULAR</div>}
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <span>/ month</span>
              <p>{plan.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="landingFooter">
        <div>
          <strong>LEAKLEANS</strong>
          <span>Find Where Your Revenue Is Leaking.</span>
        </div>

        <div className="founderFooter">
          <strong>ANIKET MOHITE</strong>
          <span>Founder, LeakLeans</span>
          <span>8698382024</span>
          <span>Aniket.Mohite@supportleaklens.com</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("landing");
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [connectionMode, setConnectionMode] = useState(null);
  const [connected, setConnected] = useState([]);
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [resolved, setResolved] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [notice, setNotice] = useState("");

  const showNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  };

  const connectAutomatically = () => {
    const key = selectedIntegration.key;

    if (!connected.includes(key)) {
      setConnected([...connected, key]);
    }

    showNotice(
      `${selectedIntegration.name} connection flow started. Demo authorization successful.`
    );

    setSelectedIntegration(null);
    setConnectionMode(null);
  };

  const connectManually = () => {
    if (!connected.includes(selectedIntegration.key)) {
      setConnected([...connected, selectedIntegration.key]);
    }

    showNotice(
      `${selectedIntegration.name} manual connection saved in demo mode.`
    );

    setSelectedIntegration(null);
    setConnectionMode(null);
  };

  const resolveLeak = (id) => {
    setResolved([...resolved, id]);
    setSelectedLeak(null);
    showNotice("Leak resolution action created.");
  };

  if (page === "landing") {
    return (
      <Landing
        start={() => setPage("dashboard")}
        integrationsPage={() => setPage("integrations")}
      />
    );
  }

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="sidebarBrand">
          <div className="brandIcon">L</div>
          <div>
            <strong>LeakLeans</strong>
            <span>Revenue Intelligence</span>
          </div>
        </div>

        <div className="workspace">
          <span>WORKSPACE</span>
          <strong>Demo Business</strong>
        </div>

        <nav>
          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            <span>⌂</span> Overview
          </button>

          <button
            className={page === "leaks" ? "active" : ""}
            onClick={() => setPage("leaks")}
          >
            <span>◈</span> Revenue Leaks
          </button>

          <button
            className={page === "integrations" ? "active" : ""}
            onClick={() => setPage("integrations")}
          >
            <span>◎</span> Integrations
          </button>

          <button
            className={page === "analytics" ? "active" : ""}
            onClick={() => setPage("analytics")}
          >
            <span>⌁</span> Analytics
          </button>

          <button
            className={page === "actions" ? "active" : ""}
            onClick={() => setPage("actions")}
          >
            <span>✓</span> Actions
          </button>

          <button
            className={page === "team" ? "active" : ""}
            onClick={() => setPage("team")}
          >
            <span>◉</span> Team
          </button>

          <button
            className={page === "billing" ? "active" : ""}
            onClick={() => setPage("billing")}
          >
            <span>₹</span> Billing
          </button>

          <button
            className={page === "settings" ? "active" : ""}
            onClick={() => setPage("settings")}
          >
            <span>⚙</span> Settings
          </button>
        </nav>

        <div className="sidebarFounder">
          <span>FOUNDER</span>
          <strong>ANIKET MOHITE</strong>
          <small>8698382024</small>
          <small>Aniket.Mohite@supportleaklens.com</small>
        </div>

        <button className="backHome" onClick={() => setPage("landing")}>
          ← Back to Website
        </button>
      </aside>

      <main className="mainArea">
        <header className="appTopbar">
          <div>
            <span className="topEyebrow">LEAKLEANS PLATFORM</span>
            <h1>
              {page === "dashboard" && "Overview"}
              {page === "leaks" && "Revenue Leaks"}
              {page === "integrations" && "Integrations"}
              {page === "analytics" && "Analytics"}
              {page === "actions" && "Actions"}
              {page === "team" && "Team"}
              {page === "billing" && "Billing & Payments"}
              {page === "settings" && "Settings"}
            </h1>
          </div>

          <div className="topAccount">
            <div>
              <strong>ANIKET MOHITE</strong>
              <span>Founder</span>
            </div>
            <div className="avatar">AM</div>
          </div>
        </header>

        <div className="pageContent">
          {page === "dashboard" && (
            <>
              <section className="welcomeRow">
                <div>
                  <div className="sectionLabel">LIVE INTELLIGENCE</div>
                  <h2>Revenue leakage overview</h2>
                  <p>
                    Signals detected across your connected business systems.
                  </p>
                </div>

                <button
                  className="primaryButton"
                  onClick={() => setPage("integrations")}
                >
                  + Connect System
                </button>
              </section>

              <section className="metricGrid">
                <div className="metricCard">
                  <span>Total At-Risk Revenue</span>
                  <strong>₹5,51,000</strong>
                  <small>Across detected leakage signals</small>
                </div>

                <div className="metricCard">
                  <span>Active Leaks</span>
                  <strong>{leaks.length - resolved.length}</strong>
                  <small>Require investigation</small>
                </div>

                <div className="metricCard">
                  <span>Connected Systems</span>
                  <strong>{connected.length}</strong>
                  <small>of {integrations.length} available</small>
                </div>

                <div className="metricCard">
                  <span>Potential Recovery</span>
                  <strong>₹3,42,000</strong>
                  <small>Based on current signals</small>
                </div>
              </section>

              <section className="dashboardGrid">
                <div className="panel">
                  <div className="panelHeader">
                    <div>
                      <span className="sectionLabel">DETECTED SIGNALS</span>
                      <h3>Latest revenue leaks</h3>
                    </div>

                    <button onClick={() => setPage("leaks")}>View all →</button>
                  </div>

                  <div className="leakList">
                    {leaks.slice(0, 4).map((leak) => (
                      <div className="leakRow" key={leak.id}>
                        <div className="leakMain">
                          <div className={`severity ${leak.severity.toLowerCase()}`}>
                            {leak.severity}
                          </div>

                          <div>
                            <strong>{leak.title}</strong>
                            <span>{leak.source}</span>
                          </div>
                        </div>

                        <div className="leakMoney">
                          <strong>{leak.amount}</strong>
                          <button onClick={() => setSelectedLeak(leak)}>
                            Investigate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <div className="panelHeader">
                    <div>
                      <span className="sectionLabel">SYSTEM HEALTH</span>
                      <h3>Connected systems</h3>
                    </div>

                    <button onClick={() => setPage("integrations")}>
                      Manage
                    </button>
                  </div>

                  <div className="systemHealth">
                    {integrations.slice(0, 5).map((item) => (
                      <div className="healthRow" key={item.key}>
                        <Logo item={item} />
                        <div>
                          <strong>{item.name}</strong>
                          <span>
                            {connected.includes(item.key)
                              ? "Connected"
                              : "Not connected"}
                          </span>
                        </div>
                        <i
                          className={
                            connected.includes(item.key)
                              ? "online"
                              : "offline"
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <div className="demoBanner">
                <strong>Demo environment</strong>
                <span>
                  Connections and payments shown here are UI demonstrations.
                  Production OAuth, API credentials, encrypted storage and
                  payment processing require backend configuration.
                </span>
              </div>
            </>
          )}

          {page === "leaks" && (
            <section>
              <div className="sectionIntro">
                <div>
                  <span className="sectionLabel">DETECT → INVESTIGATE → RESOLVE</span>
                  <h2>Revenue Leakage</h2>
                  <p>
                    Problems that may be causing revenue to disappear between
                    business processes.
                  </p>
                </div>
              </div>

              <div className="leakTable">
                <div className="tableHead">
                  <span>Leak</span>
                  <span>Source</span>
                  <span>Risk</span>
                  <span>At Risk</span>
                  <span></span>
                </div>

                {leaks.map((leak) => (
                  <div className="tableRow" key={leak.id}>
                    <div>
                      <strong>{leak.title}</strong>
                      <small>{leak.description}</small>
                    </div>

                    <span>{leak.source}</span>

                    <span className={`severity ${leak.severity.toLowerCase()}`}>
                      {leak.severity}
                    </span>

                    <strong>{leak.amount}</strong>

                    <button
                      className="smallButton"
                      onClick={() => setSelectedLeak(leak)}
                    >
                      Investigate
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {page === "integrations" && (
            <section>
              <div className="sectionIntro">
                <div>
                  <span className="sectionLabel">DATA CONNECTIONS</span>
                  <h2>Connect Your Existing Systems</h2>
                  <p>
                    LeakLeans sits on top of your existing CRM, contact center,
                    messaging, email and support systems.
                  </p>
                </div>
              </div>

              <div className="integrationGrid">
                {integrations.map((item) => {
                  const isConnected = connected.includes(item.key);

                  return (
                    <div className="integrationCard" key={item.key}>
                      <div className="integrationCardTop">
                        <Logo item={item} large />

                        {isConnected && (
                          <span className="connectedBadge">Connected</span>
                        )}
                      </div>

                      <h3>{item.name}</h3>
                      <p>{item.description}</p>

                      <div className="integrationActions">
                        <button
                          className="primaryButton"
                          onClick={() => {
                            setSelectedIntegration(item);
                            setConnectionMode("automatic");
                          }}
                        >
                          ⚡ Connect Automatically
                        </button>

                        <button
                          className="secondaryButton"
                          onClick={() => {
                            setSelectedIntegration(item);
                            setConnectionMode("manual");
                          }}
                        >
                          🔑 Enter Manually
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="securityBox">
                <strong>🔒 Security architecture</strong>
                <p>
                  Customers should never provide CRM passwords to LeakLeans.
                  Production integrations should use OAuth/API authorization.
                  Secrets and access tokens belong in the secure LeakLeans
                  backend, not in the React frontend.
                </p>
              </div>
            </section>
          )}

          {page === "analytics" && (
            <section>
              <div className="sectionIntro">
                <div>
                  <span className="sectionLabel">MEASURE</span>
                  <h2>Revenue Intelligence Analytics</h2>
                  <p>Understand where leakage is appearing and changing.</p>
                </div>
              </div>

              <div className="analyticsGrid">
                <div className="bigAnalytics">
                  <span>Total revenue signals</span>
                  <strong>₹5,51,000</strong>

                  <div className="fakeChart">
                    {[45, 60, 40, 75, 55, 82, 68, 90, 72, 95].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="chartBar"
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="analyticsSide">
                  <div>
                    <span>Follow-up leakage</span>
                    <strong>₹1.48L</strong>
                  </div>
                  <div>
                    <span>Call leakage</span>
                    <strong>₹86K</strong>
                  </div>
                  <div>
                    <span>Quote leakage</span>
                    <strong>₹2.14L</strong>
                  </div>
                </div>
              </div>
            </section>
          )}

          {page === "actions" && (
            <section>
              <div className="sectionIntro">
                <div>
                  <span className="sectionLabel">RESOLVE</span>
                  <h2>Resolution Actions</h2>
                  <p>Actions created from detected revenue leakage.</p>
                </div>
              </div>

              <div className="actionList">
                {leaks.map((leak) => (
                  <div className="actionCard" key={leak.id}>
                    <div>
                      <span className="sectionLabel">{leak.source}</span>
                      <h3>{leak.title}</h3>
                      <p>{leak.resolution}</p>
                    </div>

                    <div>
                      {resolved.includes(leak.id) ? (
                        <span className="resolvedBadge">Action Created</span>
                      ) : (
                        <button
                          className="primaryButton"
                          onClick={() => resolveLeak(leak.id)}
                        >
                          Create Action
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {page === "team" && (
            <section>
              <div className="sectionIntro">
                <div>
                  <span className="sectionLabel">WORKSPACE</span>
                  <h2>Team</h2>
                  <p>Manage people who investigate and resolve revenue leaks.</p>
                </div>

                <button
                  className="primaryButton"
                  onClick={() => showNotice("Invite flow opened in demo mode.")}
                >
                  + Invite Member
                </button>
              </div>

              <div className="teamCard">
                <div className="memberAvatar">AM</div>
                <div>
                  <strong>ANIKET MOHITE</strong>
                  <span>Founder & Administrator</span>
                </div>
                <span className="roleBadge">Owner</span>
              </div>
            </section>
          )}

          {page === "billing" && (
            <section>
              <div className="sectionIntro">
                <div>
                  <span className="sectionLabel">SUBSCRIPTION</span>
                  <h2>Billing & Payments</h2>
                  <p>Choose your LeakLeans operating plan.</p>
                </div>
              </div>

              <div className="pricingGrid dashboardPricing">
                {plans.map((plan) => (
                  <div
                    className={`priceCard ${plan.popular ? "featured" : ""}`}
                    key={plan.name}
                  >
                    {plan.popular && <div className="popularTag">POPULAR</div>}

                    <h3>{plan.name}</h3>
                    <strong>{plan.price}</strong>
                    <span>/ month</span>
                    <p>{plan.description}</p>

                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>✓ {feature}</li>
                      ))}
                    </ul>

                    <button
                      className="primaryButton fullButton"
                      onClick={() => setSelectedPlan(plan)}
                    >
                      Select {plan.name}
                    </button>
                  </div>
                ))}
              </div>

              <div className="paymentSection">
                <div>
                  <span className="sectionLabel">PAYMENT OPTIONS</span>
                  <h3>National & International Payments</h3>
                </div>

                <div className="paymentGrid">
                  {paymentMethods.map((payment) => (
                    <button
                      className="paymentCard"
                      key={payment.name}
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <Logo item={payment} large />
                      <div>
                        <strong>{payment.name}</strong>
                        <span>{payment.region}</span>
                        <small>{payment.detail}</small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {page === "settings" && (
            <section>
              <div className="sectionIntro">
                <div>
                  <span className="sectionLabel">CONFIGURATION</span>
                  <h2>Settings</h2>
                  <p>Workspace and notification settings.</p>
                </div>
              </div>

              <div className="settingsList">
                <div className="settingRow">
                  <div>
                    <strong>Workspace Name</strong>
                    <span>Demo Business</span>
                  </div>
                  <button
                    className="secondaryButton"
                    onClick={() => showNotice("Workspace editing enabled in demo.")}
                  >
                    Edit
                  </button>
                </div>

                <div className="settingRow">
                  <div>
                    <strong>Leak Notifications</strong>
                    <span>Receive alerts when high-risk leakage is detected.</span>
                  </div>
                  <div className="toggle active">ON</div>
                </div>

                <div className="settingRow">
                  <div>
                    <strong>Founder Account</strong>
                    <span>Aniket.Mohite@supportleaklens.com</span>
                  </div>
                  <span className="verified">Verified</span>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {selectedIntegration && (
        <Modal
          close={() => {
            setSelectedIntegration(null);
            setConnectionMode(null);
          }}
        >
          <div className="modalHeader">
            <Logo item={selectedIntegration} large />
            <div>
              <span className="sectionLabel">CONNECT SYSTEM</span>
              <h2>{selectedIntegration.name}</h2>
            </div>
          </div>

          {!connectionMode && (
            <div className="connectionChoices">
              <button
                className="connectionChoice"
                onClick={() => setConnectionMode("automatic")}
              >
                <strong>⚡ Connect Automatically</strong>
                <span>
                  Use OAuth or the platform's authorization process.
                </span>
              </button>

              <button
                className="connectionChoice"
                onClick={() => setConnectionMode("manual")}
              >
                <strong>🔑 Enter Manually</strong>
                <span>
                  Enter the platform-specific API connection details.
                </span>
              </button>
            </div>
          )}

          {connectionMode === "automatic" && (
            <div className="connectionForm">
              <div className="formNotice">
                <strong>Automatic authorization</strong>
                <p>
                  In production, LeakLeans will redirect you to{" "}
                  {selectedIntegration.name} so the authorized administrator
                  can approve access.
                </p>
              </div>

              <button className="primaryButton fullButton" onClick={connectAutomatically}>
                Authorize & Connect
              </button>

              <button
                className="textButton"
                onClick={() => setConnectionMode(null)}
              >
                ← Choose another method
              </button>
            </div>
          )}

          {connectionMode === "manual" && (
            <div className="connectionForm">
              {selectedIntegration.fields.map((field) => (
                <label key={field}>
                  {field}
                  <input
                    type={
                      field.toLowerCase().includes("secret") ||
                      field.toLowerCase().includes("token") ||
                      field.toLowerCase().includes("key")
                        ? "password"
                        : "text"
                    }
                    placeholder={`Enter ${field}`}
                  />
                </label>
              ))}

              <div className="securityMini">
                🔒 Demo mode: credentials are not transmitted or stored.
              </div>

              <button className="primaryButton fullButton" onClick={connectManually}>
                Save & Connect
              </button>

              <button
                className="textButton"
                onClick={() => setConnectionMode(null)}
              >
                ← Choose another method
              </button>
            </div>
          )}
        </Modal>
      )}

      {selectedLeak && (
        <Modal close={() => setSelectedLeak(null)}>
          <div className="investigation">
            <span className={`severity ${selectedLeak.severity.toLowerCase()}`}>
              {selectedLeak.severity} Risk
            </span>

            <h2>{selectedLeak.title}</h2>
            <div className="investigationAmount">
              {selectedLeak.amount} at risk
            </div>

            <div className="investigationBlock">
              <span>WHAT HAPPENED</span>
              <p>{selectedLeak.description}</p>
            </div>

            <div className="investigationBlock">
              <span>PROBABLE CAUSE</span>
              <p>{selectedLeak.cause}</p>
            </div>

            <div className="investigationBlock">
              <span>RECOMMENDED RESOLUTION</span>
              <p>{selectedLeak.resolution}</p>
            </div>

            <button
              className="primaryButton fullButton"
              onClick={() => resolveLeak(selectedLeak.id)}
            >
              Resolve Leak
            </button>
          </div>
        </Modal>
      )}

      {selectedPlan && (
        <Modal close={() => setSelectedPlan(null)}>
          <div className="paymentModal">
            <span className="sectionLabel">SUBSCRIPTION</span>
            <h2>{selectedPlan.name} Plan</h2>
            <div className="selectedPrice">{selectedPlan.price}/month</div>

            <p>Select a payment method to continue.</p>

            <div className="paymentChoiceList">
              {paymentMethods.map((payment) => (
                <button
                  key={payment.name}
                  onClick={() => {
                    setSelectedPlan(null);
                    setSelectedPayment(payment);
                  }}
                >
                  <Logo item={payment} />
                  <div>
                    <strong>{payment.name}</strong>
                    <span>{payment.region}</span>
                  </div>
                </button>
              ))}
            </div>

            <small className="paymentDisclaimer">
              Payment processing is a demo until the corresponding merchant
              account and backend checkout are configured.
            </small>
          </div>
        </Modal>
      )}

      {selectedPayment && (
        <Modal close={() => setSelectedPayment(null)}>
          <div className="paymentModal">
            <Logo item={selectedPayment} large />

            <span className="sectionLabel">PAYMENT PROVIDER</span>
            <h2>{selectedPayment.name}</h2>

            <p>
              {selectedPayment.name} is selected for{" "}
              {selectedPayment.region.toLowerCase()} payments.
            </p>

            <div className="formNotice">
              <strong>Checkout integration</strong>
              <p>
                This interface is ready for the production payment backend.
                Merchant onboarding, checkout APIs, webhooks and subscription
                verification still need to be configured.
              </p>
            </div>

            <button
              className="primaryButton fullButton"
              onClick={() => {
                setSelectedPayment(null);
                showNotice(`${selectedPayment.name} checkout opened in demo mode.`);
              }}
            >
              Continue to Checkout
            </button>
          </div>
        </Modal>
      )}

      {notice && <div className="toast">{notice}</div>}
    </div>
  );
}

export default App;