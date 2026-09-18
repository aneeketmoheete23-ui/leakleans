import React, { useState } from "react";
import {
  LayoutDashboard,
  AlertTriangle,
  Search,
  Plug,
  BarChart3,
  Zap,
  Users,
  CreditCard,
  Bell,
  Settings as SettingsIcon,
  Menu,
  X,
  Bot,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Send,
} from "lucide-react";
import "./App.css";

const BRAND = "AI REVENUE LEAK DETECTOR";
const TAGLINE = "Find Where Your Revenue Is Leaking.";
const FOUNDER = "ANIKET MOHITE";

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    system: "Salesforce",
    severity: "High",
    amount: 148000,
    owner: "Sales Team",
    signal:
      "Customer enquiry received but no follow-up was recorded.",
  },
  {
    id: 2,
    title: "Missed Inbound Calls",
    system: "Genesys",
    severity: "High",
    amount: 86000,
    owner: "Call Team",
    signal:
      "Inbound customer calls were not followed by a successful callback.",
  },
  {
    id: 3,
    title: "Quote-to-Order Drop",
    system: "CRM + Sales",
    severity: "Medium",
    amount: 214000,
    owner: "Sales Team",
    signal:
      "Quotes were created but several customers did not progress to order.",
  },
];

const systems = [
  "Salesforce",
  "Genesys",
  "Avaya",
  "WhatsApp Business",
  "HubSpot",
  "Gmail",
  "Zendesk",
];

const navItems = [
  ["Overview", LayoutDashboard],
  ["Revenue Leaks", AlertTriangle],
  ["Investigation", Search],
  ["Integrations", Plug],
  ["Analytics", BarChart3],
  ["Actions", Zap],
  ["Agent System", Bot],
  ["Team", Users],
  ["Billing & Payments", CreditCard],
  ["Notifications", Bell],
  ["Settings", SettingsIcon],
];

function money(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function Severity({ value }) {
  return (
    <span className={`severity ${value.toLowerCase()}`}>
      {value}
    </span>
  );
}

function App() {
  const [page, setPage] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState(leaks[0]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [investigation, setInvestigation] = useState(null);
  const [investigating, setInvestigating] = useState(false);

  const totalLeak = leaks.reduce(
    (sum, leak) => sum + leak.amount,
    0
  );

  function navigate(name) {
    setPage(name);
    setMobileOpen(false);
  }

  function investigate(leak) {
    setSelectedLeak(leak);
    setInvestigation(null);
    setPage("Investigation");
  }

  async function askAssistant() {
    if (!message.trim() || aiLoading) return;

    const text = message.trim();

    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setMessage("");
    setAiLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
You are the AI Revenue Assistant inside LeakLeans.

LeakLeans is an AI Revenue Leak Detector.

Your job is to help businesses understand:
- Revenue leakage
- Missed sales follow-ups
- Customer journey problems
- Missed inbound calls
- Quote-to-order drops
- Recovery opportunities
- Operational actions

Give clear, practical and easy-to-understand answers.

Do not claim to have access to business data unless that data is provided.

User question:
${text}
          `,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "AI request failed"
        );
      }

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.text ||
            "I could not generate a response.",
        },
      ]);
    } catch (error) {
      console.error("Assistant error:", error);

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Sorry, I could not connect to the AI right now. Please check the Gemini configuration.",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  }

  async function runInvestigation() {
    if (!selectedLeak || investigating) return;

    setInvestigating(true);
    setInvestigation(null);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
You are the AI Investigation Engine inside LeakLeans.

Analyze this potential revenue leakage case.

Leak title: ${selectedLeak.title}
System: ${selectedLeak.system}
Severity: ${selectedLeak.severity}
Potential impact: ${money(selectedLeak.amount)}
Owner: ${selectedLeak.owner}
Detected signal: ${selectedLeak.signal}

Provide:
1. Likely cause
2. What evidence should be checked
3. Business impact
4. Recommended recovery action
5. Prevention action

Keep the answer practical and concise.
Do not invent evidence that was not provided.
          `,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Investigation failed"
        );
      }

      setInvestigation(
        data.text ||
          "No investigation result was returned."
      );
    } catch (error) {
      console.error(
        "Investigation error:",
        error
      );

      setInvestigation(
        "Sorry, the AI investigation could not be completed. Please check the Gemini configuration."
      );
    } finally {
      setInvestigating(false);
    }
  }

  return (
    <div className="app">
      <aside
        className={`sidebar ${
          mobileOpen ? "open" : ""
        }`}
      >
        <div className="brandArea">
          <div className="brandIcon">
            <Bot size={25} />
          </div>

          <div>
            <div className="brandName">
              AI REVENUE
            </div>
            <div className="brandName">
              LEAK DETECTOR
            </div>
          </div>

          <button
            className="mobileClose"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <X size={22} />
          </button>
        </div>

        <div className="founderCard">
          <div className="founderName">
            {FOUNDER}
          </div>

          <div className="founderRole">
            Founder, AI Revenue Leak Detector
          </div>
        </div>

        <nav>
          {navItems.map(([name, Icon]) => (
            <button
              key={name}
              className={
                page === name
                  ? "navActive"
                  : ""
              }
              onClick={() => navigate(name)}
            >
              <Icon size={18} />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebarBottom">
          <strong>{TAGLINE}</strong>
          <span>
            Detect → Investigate → Resolve → Prevent
          </span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topLeft">
            <button
              className="menuButton"
              onClick={() =>
                setMobileOpen(true)
              }
            >
              <Menu size={23} />
            </button>

            <div>
              <div className="pageTitle">
                {page}
              </div>

              <div className="pageSub">
                Revenue Intelligence Workspace
              </div>
            </div>
          </div>

          <div className="topActions">
            <button className="iconButton">
              <Bell size={20} />
            </button>
          </div>
        </header>

        <div className="content">
          {page === "Overview" && (
            <Overview
              totalLeak={totalLeak}
              leaks={leaks}
              onInvestigate={investigate}
            />
          )}

          {page === "Revenue Leaks" && (
            <Leaks
              leaks={leaks}
              onInvestigate={investigate}
            />
          )}

          {page === "Investigation" && (
            <Investigation
              leak={selectedLeak}
              investigation={investigation}
              investigating={investigating}
              onRunInvestigation={
                runInvestigation
              }
            />
          )}

          {page === "Integrations" && (
            <Integrations />
          )}

          {page === "Analytics" && (
            <Analytics
              totalLeak={totalLeak}
            />
          )}

          {page === "Actions" && <Actions />}

          {page === "Agent System" && (
            <AgentSystem />
          )}

          {page === "Team" && <Team />}

          {page === "Billing & Payments" && (
            <Billing />
          )}

          {page === "Notifications" && (
            <Notifications />
          )}

          {page === "Settings" && (
            <Settings />
          )}
        </div>

        <div className="assistant">
          <div className="assistantHeader">
            <div>
              <Bot size={19} />
              <strong>
                AI Revenue Assistant
              </strong>
            </div>

            <span>
              {aiLoading
                ? "Thinking..."
                : "Gemini powered"}
            </span>
          </div>

          <div className="chatArea">
            {chat.length === 0 && (
              <div className="chatEmpty">
                Ask about revenue leakage, missed
                follow-ups, customer journeys or
                recovery actions.
              </div>
            )}

            {chat.map((item, index) => (
              <div
                key={index}
                className={`chatMessage ${item.role}`}
              >
                {item.text}
              </div>
            ))}

            {aiLoading && (
              <div className="chatMessage ai">
                Gemini is analyzing your question...
              </div>
            )}
          </div>

          <div className="chatInput">
            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  askAssistant();
                }
              }}
              placeholder="Ask the AI Revenue Assistant..."
              disabled={aiLoading}
            />

            <button
              onClick={askAssistant}
              disabled={aiLoading}
            >
              <Send size={17} />
            </button>
          </div>
        </div>

        <footer>
          <div>
            © 2026 {BRAND} · {FOUNDER}
          </div>
        </footer>
      </main>
    </div>
  );
}

function Overview({
  totalLeak,
  leaks,
  onInvestigate,
}) {
  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">
            REVENUE LEAKAGE INTELLIGENCE
          </div>

          <h1>
            Find Where Your Revenue Is Leaking.
          </h1>

          <p>
            Connect the systems your business
            already uses. LeakLeans helps identify
            hidden revenue leakage and guides your
            team toward recovery.
          </p>

          <button
            className="primary"
            onClick={() =>
              onInvestigate(leaks[0])
            }
          >
            Investigate a Leak
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="heroGraphic">
          <Bot size={50} />
          <strong>AI INTELLIGENCE</strong>
          <span>
            Across your existing systems
          </span>
        </div>
      </section>

      <div className="statsGrid">
        <Stat
          title="Detected Leakage"
          value={money(totalLeak)}
          icon={<AlertTriangle />}
        />

        <Stat
          title="Active Signals"
          value={leaks.length}
          icon={<Search />}
        />

        <Stat
          title="High Priority"
          value={
            leaks.filter(
              (x) => x.severity === "High"
            ).length
          }
          icon={<Zap />}
        />

        <Stat
          title="Connected Systems"
          value={systems.length}
          icon={<Plug />}
        />
      </div>

      <section className="panel">
        <div className="sectionHeading">
          <div>
            <h2>
              Latest Revenue Leakage
            </h2>

            <p>
              Signals requiring investigation
            </p>
          </div>
        </div>

        <LeakTable
          leaks={leaks}
          onInvestigate={onInvestigate}
        />
      </section>
    </>
  );
}

function Stat({
  title,
  value,
  icon,
}) {
  return (
    <div className="statCard">
      <div className="statIcon">
        {icon}
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function LeakTable({
  leaks,
  onInvestigate,
}) {
  return (
    <div className="tableWrap">
      {leaks.map((leak) => (
        <div
          className="leakRow"
          key={leak.id}
        >
          <div>
            <strong>{leak.title}</strong>
            <span>{leak.system}</span>
          </div>

          <Severity value={leak.severity} />

          <strong className="amount">
            {money(leak.amount)}
          </strong>

          <button
            className="smallButton"
            onClick={() =>
              onInvestigate(leak)
            }
          >
            Investigate
            <ArrowRight size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function Leaks({
  leaks,
  onInvestigate,
}) {
  return (
    <>
      <PageIntro
        eyebrow="DETECTION ENGINE"
        title="Revenue Leaks"
        text="Signals detected across customer, sales, support and communication workflows."
      />

      <section className="panel">
        <LeakTable
          leaks={leaks}
          onInvestigate={onInvestigate}
        />
      </section>
    </>
  );
}

function Investigation({
  leak,
  investigation,
  investigating,
  onRunInvestigation,
}) {
  return (
    <>
      <PageIntro
        eyebrow="AI INVESTIGATION"
        title="Investigate Revenue Leakage"
        text="Understand the signal and determine the next operational action."
      />

      <section className="investigationGrid">
        <div className="panel">
          <Severity value={leak.severity} />

          <h2>{leak.title}</h2>

          <p>{leak.system}</p>

          <div className="signalBox">
            <span>
              DETECTED SIGNAL
            </span>

            <p>{leak.signal}</p>
          </div>

          <div className="evidenceGrid">
            <Info
              title="Owner / Team"
              value={leak.owner}
            />

            <Info
              title="Potential Impact"
              value={money(leak.amount)}
            />

            <Info
              title="Detection"
              value="AI signal correlation"
            />

            <Info
              title="Status"
              value={
                investigation
                  ? "Investigation completed"
                  : "Needs investigation"
              }
            />
          </div>

          <button
            className="primary full"
            onClick={onRunInvestigation}
            disabled={investigating}
          >
            <Bot size={17} />

            {investigating
              ? "AI Investigating..."
              : "Run AI Investigation"}
          </button>
        </div>

        <div className="panel aiPanel">
          <div className="aiTitle">
            <Bot size={20} />

            <div>
              <strong>
                AI Investigation
              </strong>

              <span>
                Gemini analysis
              </span>
            </div>
          </div>

          {!investigation &&
            !investigating && (
              <div className="emptyAI">
                <Bot size={40} />

                <strong>
                  Ready to investigate
                </strong>

                <span>
                  Click "Run AI Investigation"
                  to analyze this revenue
                  leakage signal with Gemini.
                </span>
              </div>
            )}

          {investigating && (
            <div className="emptyAI">
              <RefreshCw
                size={40}
                className="spin"
              />

              <strong>
                Gemini is investigating...
              </strong>

              <span>
                Analyzing the revenue leakage
                signal and recommended actions.
              </span>
            </div>
          )}

          {investigation && (
            <div className="aiResult">
              <div className="aiResultLabel">
                GEMINI ANALYSIS
              </div>

              <div className="aiResultText">
                {investigation}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Info({
  title,
  value,
}) {
  return (
    <div className="infoBox">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Integrations() {
  return (
    <>
      <PageIntro
        eyebrow="SYSTEM CONNECTIONS"
        title="Integrations"
        text="Connect the systems where customer, sales and service signals already exist."
      />

      <div className="integrationGrid">
        {systems.map((system) => (
          <div
            className="integrationCard"
            key={system}
          >
            <Plug size={24} />

            <div>
              <strong>{system}</strong>
              <span>
                API / OAuth connection
              </span>
            </div>

            <button className="smallButton">
              Configure
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function Analytics({
  totalLeak,
}) {
  return (
    <>
      <PageIntro
        eyebrow="BUSINESS INTELLIGENCE"
        title="Analytics"
        text="Measure where leakage is appearing and how much value is exposed."
      />

      <div className="statsGrid">
        <Stat
          title="Potential Revenue"
          value={money(totalLeak)}
          icon={<BarChart3 />}
        />

        <Stat
          title="Detected Cases"
          value="3"
          icon={<Search />}
        />

        <Stat
          title="Signals Resolved"
          value="0"
          icon={<CheckCircle2 />}
        />

        <Stat
          title="Recovery Tracking"
          value="Ready"
          icon={<RefreshCw />}
        />
      </div>
    </>
  );
}

function Actions() {
  const actions = [
    [
      "Assign Owner",
      "Route the leakage case to the correct team.",
    ],
    [
      "Request Approval",
      "Ask a manager before an action is executed.",
    ],
    [
      "Trigger Follow-up",
      "Prepare a customer follow-up workflow.",
    ],
    [
      "Create Task",
      "Create an operational task for the responsible team.",
    ],
  ];

  return (
    <>
      <PageIntro
        eyebrow="RESOLUTION"
        title="Actions"
        text="Move from detected leakage to controlled business action."
      />

      <div className="actionGrid">
        {actions.map(([title, text]) => (
          <div
            className="actionCard"
            key={title}
          >
            <Zap size={22} />

            <h3>{title}</h3>

            <p>{text}</p>

            <button className="smallButton">
              Configure
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function AgentSystem() {
  const steps = [
    "Observe Signals",
    "Correlate Activity",
    "Identify Ownership",
    "Explain",
    "Recommend",
    "Ask Approval",
    "Execute",
    "Verify",
    "Audit",
  ];

  return (
    <>
      <PageIntro
        eyebrow="AGENT INTELLIGENCE"
        title="Agent System & Behaviour"
        text="The agent observes signals, investigates leakage and follows controlled action paths."
      />

      <section className="panel">
        {steps.map((step, index) => (
          <div
            className="teamRow"
            key={step}
          >
            <div className="avatar">
              {index + 1}
            </div>

            <div>
              <strong>{step}</strong>
              <span>
                Controlled agent workflow
              </span>
            </div>

            <CheckCircle2 size={18} />
          </div>
        ))}
      </section>
    </>
  );
}

function Team() {
  const teams = [
    "Revenue Operations",
    "Sales Team",
    "Customer Support",
    "Administration",
  ];

  return (
    <>
      <PageIntro
        eyebrow="WORKFORCE"
        title="Team"
        text="Manage access and responsibilities."
      />

      <section className="panel">
        {teams.map((name) => (
          <div
            className="teamRow"
            key={name}
          >
            <div className="avatar">
              {name.charAt(0)}
            </div>

            <div>
              <strong>{name}</strong>
              <span>Active team</span>
            </div>

            <span className="status">
              Active
            </span>
          </div>
        ))}
      </section>
    </>
  );
}

function Billing() {
  const methods = [
    "Razorpay",
    "Stripe",
    "PayPal",
    "Google Pay",
    "PhonePe",
    "Debit Card",
    "Credit Card",
  ];

  return (
    <>
      <PageIntro
        eyebrow="SUBSCRIPTION"
        title="Billing & Payments"
        text="Configure payment methods for your SaaS subscription."
      />

      <div className="paymentGrid">
        {methods.map((method) => (
          <div
            className="paymentCard"
            key={method}
          >
            <CreditCard size={28} />

            <strong>{method}</strong>

            <span>Available</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Notifications() {
  const notifications = [
    "High-value leakage detected",
    "Missed customer follow-up",
    "AI investigation completed",
    "Action requires approval",
    "Revenue recovery verified",
  ];

  return (
    <>
      <PageIntro
        eyebrow="ALERTS"
        title="Notifications"
        text="Control how your team receives revenue leakage alerts."
      />

      <section className="panel">
        {notifications.map((item) => (
          <div
            className="notificationRow"
            key={item}
          >
            <Bell size={18} />

            <div>
              <strong>{item}</strong>
              <span>Enabled</span>
            </div>

            <input
              type="checkbox"
              defaultChecked
            />
          </div>
        ))}
      </section>
    </>
  );
}

function Settings() {
  return (
    <>
      <PageIntro
        eyebrow="ACCOUNT"
        title="Settings"
        text="Configure your AI Revenue Leak Detector workspace."
      />

      <section className="panel">
        <div className="formGrid">
          <label>
            Company Name
            <input
              placeholder="Your company name"
            />
          </label>

          <label>
            Workspace Name
            <input
              placeholder="Revenue Intelligence Workspace"
            />
          </label>

          <label>
            Company Email
            <input
              placeholder="Company email"
            />
          </label>

          <label>
            Contact Number
            <input
              placeholder="Contact number"
            />
          </label>
        </div>

        <button className="primary">
          Save Settings
        </button>
      </section>
    </>
  );
}

function PageIntro({
  eyebrow,
  title,
  text,
}) {
  return (
    <section className="pageIntro">
      <div className="eyebrow">
        {eyebrow}
      </div>

      <h1>{title}</h1>

      <p>{text}</p>
    </section>
  );
}

export default App;