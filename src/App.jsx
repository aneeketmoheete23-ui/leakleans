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
  SettingsIcon,
  Menu,
  X,
  Bot,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Send,
  RefreshCw,
  Facebook,
  Instagram,
} from "lucide-react";
import "./App.css";

const BRAND = "AI REVENUE LEAK DETECTOR";
const TAGLINE = "Find Where Your Revenue Is Leaking.";
const FOUNDER = "ANIKET MOHITE";
const PHONE = "8698382024";
const EMAIL = "Aniket.Mohite@supportleaklens.com";

const systems = [
  { name: "Salesforce", slug: "salesforce", color: "00A1E0" },
  { name: "Genesys", slug: "genesys", color: "FF4F1F" },
  { name: "Avaya", slug: "avaya", color: "FF4F00" },
  { name: "WhatsApp Business", slug: "whatsapp", color: "25D366" },
  { name: "HubSpot", slug: "hubspot", color: "FF7A59" },
  { name: "Gmail / Google Workspace", slug: "gmail", color: "EA4335" },
  { name: "Zendesk", slug: "zendesk", color: "03363D" },
];

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    system: "Salesforce",
    severity: "High",
    amount: 148000,
    owner: "Sales Team",
    signal: "Customer enquiry received but no follow-up was recorded.",
  },
  {
    id: 2,
    title: "Missed Inbound Calls",
    system: "Genesys",
    severity: "High",
    amount: 86000,
    owner: "Call Team",
    signal: "Inbound customer calls were not followed by a successful callback.",
  },
  {
    id: 3,
    title: "Quote-to-Order Drop",
    system: "CRM + Sales",
    severity: "Medium",
    amount: 214000,
    owner: "Sales Team",
    signal: "Quotes were created but several customers did not progress to order.",
  },
  {
    id: 4,
    title: "Delayed Response",
    system: "Gmail",
    severity: "Medium",
    amount: 64000,
    owner: "Support Team",
    signal: "Customer emails remained unanswered beyond the expected response time.",
  },
  {
    id: 5,
    title: "Repeated Complaint Loop",
    system: "Zendesk",
    severity: "Low",
    amount: 39000,
    owner: "Support Team",
    signal: "The same complaint was reopened multiple times without final resolution.",
  },
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
  ["Settings", Settings],
];

const roles = ["Admin", "Manager", "Project Head", "Team Member"];

function formatMoney(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function logoUrl(slug, color) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
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
  const [role, setRole] = useState("Admin");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState(leaks[0]);
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [alertsOpen, setAlertsOpen] = useState(false);

  const totalLeak = leaks.reduce((sum, leak) => sum + leak.amount, 0);

  async function investigateLeak(leak) {
    setSelectedLeak(leak);
    setAiLoading(true);
    setAiResult(null);
    setPage("Investigation");

    const prompt = `
You are the AI Revenue Leak Detector intelligence engine.

Analyze this business revenue leakage signal.

Leak:
${JSON.stringify(leak, null, 2)}

Return a clear operational investigation using these headings:

WHO MISSED THIS?
WHY WAS THIS MISSED?
WHAT NEEDS TO BE DONE?
PROBABLE CAUSE
BUSINESS IMPACT
RECOMMENDED RESOLUTION
CONFIDENCE

Important:
- Never invent a person's name.
- If the responsible person is unknown, say that the owner is not identified from available data.
- Clearly distinguish evidence from inference.
- Focus on practical revenue recovery.
`;

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setAiResult(data.text);
    } catch (error) {
      setAiResult(
        `AI investigation could not be completed.\n\nReason: ${error.message}`
      );
    } finally {
      setAiLoading(false);
    }
  }

  async function askAssistant() {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setChat((prev) => [...prev, { role: "user", text: userMessage }]);

    try {
      const prompt = `
You are the AI assistant inside AI Revenue Leak Detector.

The product detects revenue leakage across CRM, call systems, email, support systems and other business workflows.

Current role: ${role}

User question:
${userMessage}

Give a concise practical answer focused on detecting, investigating, resolving or preventing revenue leakage.
`;

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setChat((prev) => [
        ...prev,
        { role: "ai", text: data.text },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: `AI assistant error: ${error.message}`,
        },
      ]);
    }
  }

  function navigate(name) {
    setPage(name);
    setMobileOpen(false);
  }

  return (
    <div className="app">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brandArea">
          <div className="brandIcon">
            <Bot size={25} />
          </div>

          <div>
            <div className="brandName">AI REVENUE</div>
            <div className="brandName">LEAK DETECTOR</div>
          </div>

          <button
            className="mobileClose"
            onClick={() => setMobileOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <div className="founderCard">
          <div className="founderName">{FOUNDER}</div>
          <div className="founderRole">
            Founder, AI Revenue Leak Detector
          </div>
          <div className="founderContact">{PHONE}</div>
          <div className="founderContact">{EMAIL}</div>
        </div>

        <div className="roleBox">
          <label>ACCESS ROLE</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <nav>
          {navItems.map(([name, Icon]) => (
            <button
              key={name}
              className={page === name ? "navActive" : ""}
              onClick={() => navigate(name)}
            >
              <Icon size={18} />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebarBottom">
          <strong>{TAGLINE}</strong>
          <span>Detect → Investigate → Resolve → Prevent</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topLeft">
            <button
              className="menuButton"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={23} />
            </button>

            <div>
              <div className="pageTitle">{page}</div>
              <div className="pageSub">
                {role} workspace
              </div>
            </div>
          </div>

          <div className="topActions">
            <button
              className="iconButton"
              onClick={() => setAlertsOpen(!alertsOpen)}
            >
              <Bell size={20} />
              <span className="notificationDot" />
            </button>

            <div className="rolePill">{role}</div>
          </div>

          {alertsOpen && (
            <div className="alertPopup">
              <strong>Alerts</strong>
              <p>3 revenue leakage signals need attention.</p>
              <button onClick={() => navigate("Revenue Leaks")}>
                View Revenue Leaks <ArrowRight size={15} />
              </button>
            </div>
          )}
        </header>

        <div className="content">
          {page === "Overview" && (
            <Overview
              totalLeak={totalLeak}
              leaks={leaks}
              onInvestigate={investigateLeak}
              role={role}
            />
          )}

          {page === "Revenue Leaks" && (
            <Leaks
              leaks={leaks}
              onInvestigate={investigateLeak}
            />
          )}

          {page === "Investigation" && (
            <Investigation
              leak={selectedLeak}
              result={aiResult}
              loading={aiLoading}
              onInvestigate={investigateLeak}
            />
          )}

          {page === "Integrations" && <Integrations />}

          {page === "Analytics" && (
            <Analytics totalLeak={totalLeak} />
          )}

          {page === "Actions" && <Actions />}

          {page === "Agent System" && <AgentSystem />}

          {page === "Team" && <Team role={role} />}

          {page === "Billing & Payments" && <Billing />}

          {page === "Notifications" && <Notifications />}

          {page === "Settings" && <Settings />}
        </div>

        <div className="assistant">
          <div className="assistantHeader">
            <div>
              <Bot size={19} />
              <strong>AI Revenue Assistant</strong>
            </div>
            <span>Gemini powered</span>
          </div>

          <div className="chatArea">
            {chat.length === 0 && (
              <div className="chatEmpty">
                Ask about revenue leakage, missed follow-ups,
                customer journeys or recovery actions.
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
          </div>

          <div className="chatInput">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") askAssistant();
              }}
              placeholder="Ask the AI Revenue Assistant..."
            />
            <button onClick={askAssistant}>
              <Send size={17} />
            </button>
          </div>
        </div>

        <footer>
          <div>
            © 2026 {BRAND} · {FOUNDER}
          </div>

          <div className="socials">
            <button title="Facebook">
              <Facebook size={18} />
            </button>
            <button title="Instagram">
              <Instagram size={18} />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Overview({ totalLeak, leaks, onInvestigate, role }) {
  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">REVENUE LEAKAGE INTELLIGENCE</div>
          <h1>Find Where Your Revenue Is Leaking.</h1>
          <p>
            Connect the systems your business already uses.
            AI Revenue Leak Detector finds hidden leakage,
            explains the cause and guides your team toward recovery.
          </p>

          <div className="heroButtons">
            <button
              className="primary"
              onClick={() => onInvestigate(leaks[0])}
            >
              Investigate a Leak <ArrowRight size={17} />
            </button>
            <div className="heroFounder">
              <strong>{FOUNDER}</strong>
              <span>Founder</span>
            </div>
          </div>
        </div>

        <div className="heroGraphic">
          <div className="orbitCard">
            <Bot size={30} />
            <strong>AI INTELLIGENCE</strong>
            <span>Across your existing systems</span>
          </div>
        </div>
      </section>

      <div className="statsGrid">
        <Stat
          title="Detected Leakage"
          value={formatMoney(totalLeak)}
          icon={<AlertTriangle />}
        />
        <Stat
          title="Active Signals"
          value={leaks.length}
          icon={<Search />}
        />
        <Stat
          title="High Priority"
          value={leaks.filter((x) => x.severity === "High").length}
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
            <h2>Latest Revenue Leakage</h2>
            <p>Signals requiring investigation</p>
          </div>
          <span className="roleTag">{role}</span>
        </div>

        <LeakTable
          leaks={leaks}
          onInvestigate={onInvestigate}
        />
      </section>
    </>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="statCard">
      <div className="statIcon">{icon}</div>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function LeakTable({ leaks, onInvestigate }) {
  return (
    <div className="tableWrap">
      {leaks.map((leak) => (
        <div className="leakRow" key={leak.id}>
          <div>
            <strong>{leak.title}</strong>
            <span>{leak.system}</span>
          </div>

          <Severity value={leak.severity} />

          <strong className="amount">
            {formatMoney(leak.amount)}
          </strong>

          <button
            className="smallButton"
            onClick={() => onInvestigate(leak)}
          >
            Investigate <ArrowRight size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function Leaks({ leaks, onInvestigate }) {
  return (
    <>
      <PageIntro
        eyebrow="DETECTION ENGINE"
        title="Revenue Leaks"
        text="Signals detected across customer, sales, support and communication workflows."
      />

      <section className="panel">
        <LeakTable leaks={leaks} onInvestigate={onInvestigate} />
      </section>
    </>
  );
}

function Investigation({ leak, result, loading, onInvestigate }) {
  return (
    <>
      <PageIntro
        eyebrow="AI INVESTIGATION"
        title="Investigate Revenue Leakage"
        text="Understand who missed the signal, why it happened and what needs to happen next."
      />

      <section className="investigationGrid">
        <div className="panel">
          <div className="investigationHeader">
            <div>
              <Severity value={leak.severity} />
              <h2>{leak.title}</h2>
              <p>{leak.system}</p>
            </div>
            <strong>{formatMoney(leak.amount)}</strong>
          </div>

          <div className="signalBox">
            <span>DETECTED SIGNAL</span>
            <p>{leak.signal}</p>
          </div>

          <div className="evidenceGrid">
            <Info title="Owner / Team" value={leak.owner} />
            <Info title="Potential Impact" value={formatMoney(leak.amount)} />
            <Info title="Detection" value="AI signal correlation" />
            <Info title="Status" value="Needs investigation" />
          </div>

          <button
            className="primary full"
            onClick={() => onInvestigate(leak)}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={17} className="spin" />
                AI Investigating...
              </>
            ) : (
              <>
                <Bot size={17} />
                Run AI Investigation
              </>
            )}
          </button>
        </div>

        <div className="panel aiPanel">
          <div className="aiTitle">
            <Bot size={20} />
            <div>
              <strong>AI Investigation</strong>
              <span>Gemini analysis</span>
            </div>
          </div>

          {loading && (
            <div className="loadingBox">
              <RefreshCw className="spin" />
              <strong>Analyzing the revenue leakage signal...</strong>
              <span>
                Correlating ownership, workflow and business impact.
              </span>
            </div>
          )}

          {!loading && !result && (
            <div className="emptyAI">
              <Bot size={40} />
              <strong>Ready to investigate</strong>
              <span>
                Run the AI investigation to understand the cause and next action.
              </span>
            </div>
          )}

          {!loading && result && (
            <div className="aiResult">
              {result}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Info({ title, value }) {
  return (
    <div className="infoBox">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Integrations() {
  const [selected, setSelected] = useState("Salesforce");

  return (
    <>
      <PageIntro
        eyebrow="SYSTEM CONNECTIONS"
        title="Integrations"
        text="Connect the systems where customer, sales and service signals already exist."
      />

      <div className="integrationGrid">
        {systems.map((system) => (
          <div className="integrationCard" key={system.name}>
            <div className="integrationLogo">
              <img
                src={logoUrl(system.slug, system.color)}
                alt={system.name}
              />
            </div>

            <div>
              <strong>{system.name}</strong>
              <span>API / OAuth connection</span>
            </div>

            <button
              className="smallButton"
              onClick={() => setSelected(system.name)}
            >
              Configure
            </button>
          </div>
        ))}
      </div>

      <section className="panel apiPanel">
        <div className="sectionHeading">
          <div>
            <h2>Manual API Configuration</h2>
            <p>{selected}</p>
          </div>
          <ShieldCheck size={22} />
        </div>

        <div className="formGrid">
          <label>
            Account / Instance
            <input placeholder="Enter account or instance" />
          </label>

          <label>
            Client ID / API Key
            <input placeholder="Enter API credential" type="password" />
          </label>

          <label>
            Client Secret
            <input placeholder="Enter client secret" type="password" />
          </label>

          <label>
            API Base URL
            <input placeholder="https://api.example.com" />
          </label>
        </div>

        <div className="secureNote">
          <ShieldCheck size={18} />
          Production credentials should be stored and processed by a secure backend, not exposed in browser code.
        </div>

        <button className="primary">
          Save Connection
        </button>
      </section>
    </>
  );
}

function Analytics({ totalLeak }) {
  return (
    <>
      <PageIntro
        eyebrow="BUSINESS INTELLIGENCE"
        title="Analytics"
        text="Measure where leakage is appearing and how much value is exposed."
      />

      <div className="statsGrid">
        <Stat title="Potential Revenue" value={formatMoney(totalLeak)} icon={<BarChart3 />} />
        <Stat title="Detected Cases" value="5" icon={<Search />} />
        <Stat title="Signals Resolved" value="0" icon={<CheckCircle2 />} />
        <Stat title="Recovery Tracking" value="Ready" icon={<RefreshCw />} />
      </div>

      <section className="panel chartPanel">
        <h2>Leakage by Workflow</h2>

        <div className="bars">
          <Bar label="Sales Follow-up" value={148000} max={214000} />
          <Bar label="Missed Calls" value={86000} max={214000} />
          <Bar label="Quote Conversion" value={214000} max={214000} />
          <Bar label="Email Response" value={64000} max={214000} />
          <Bar label="Support" value={39000} max={214000} />
        </div>
      </section>
    </>
  );
}

function Bar({ label, value, max }) {
  return (
    <div className="barRow">
      <div>
        <span>{label}</span>
        <strong>{formatMoney(value)}</strong>
      </div>
      <div className="barTrack">
        <div
          className="barFill"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Actions() {
  return (
    <>
      <PageIntro
        eyebrow="RESOLUTION"
        title="Actions"
        text="Move from detected leakage to controlled business action."
      />

      <div className="actionGrid">
        <ActionCard
          title="Assign Owner"
          text="Route the leakage case to the correct team or person."
        />
        <ActionCard
          title="Request Approval"
          text="Ask a manager before an automated action is executed."
        />
        <ActionCard
          title="Trigger Follow-up"
          text="Prepare a permitted customer follow-up workflow."
        />
        <ActionCard
          title="Create Task"
          text="Create an operational task for the responsible team."
        />
      </div>
    </>
  );
}

function ActionCard({ title, text }) {
  return (
    <div className="actionCard">
      <Zap size={22} />
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="smallButton">
        Configure <ArrowRight size={14} />
      </button>
    </div>
  );
}

function AgentSystem() {
  const steps = [
    ["1", "Observe Signals", "Read approved signals from connected business systems."],
    ["2", "Correlate Activity", "Connect calls, leads, messages, quotes and support events."],
    ["3", "Identify Ownership", "Determine which workflow or team owns the missed step."],
    ["4", "Explain", "Generate evidence-based explanation for the leakage."],
    ["5", "Recommend", "Suggest the next operational resolution."],
    ["6", "Ask Approval", "Request human approval when the action requires it."],
    ["7", "Execute", "Perform only permitted actions through connected systems."],
    ["8", "Verify", "Check whether the leakage was resolved."],
    ["9", "Audit", "Record the decision, action and result."],
  ];

  return (
    <>
      <PageIntro
        eyebrow="AGENT INTELLIGENCE"
        title="Agent System & Behaviour"
        text="The agent observes business signals, reasons about leakage and follows controlled action paths."
      />

      <section className="agentFlow">
        {steps.map(([number, title, text]) => (
          <div className="agentStep" key={number}>
            <div className="agentNumber">{number}</div>
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
            {number !== "9" && <ArrowRight size={17} />}
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="aiTitle">
          <Bot size={20} />
          <div>
            <strong>Agent Behaviour Rules</strong>
            <span>Controlled automation</span>
          </div>
        </div>

        <div className="rules">
          <div><CheckCircle2 /> Never invent missing evidence.</div>
          <div><CheckCircle2 /> Never expose API secrets to the browser.</div>
          <div><CheckCircle2 /> Ask for approval before restricted actions.</div>
          <div><CheckCircle2 /> Record actions for an audit trail.</div>
          <div><CheckCircle2 /> Verify the result after an action.</div>
        </div>
      </section>
    </>
  );
}

function Team({ role }) {
  return (
    <>
      <PageIntro
        eyebrow="WORKFORCE"
        title="Team"
        text={`Manage access and responsibilities for the ${role} workspace.`}
      />

      <section className="panel">
        {[
          ["Revenue Operations", "Manager"],
          ["Sales Team", "Project Head"],
          ["Customer Support", "Team Member"],
          ["Administration", "Admin"],
        ].map(([name, access]) => (
          <div className="teamRow" key={name}>
            <div className="avatar">{name.charAt(0)}</div>
            <div>
              <strong>{name}</strong>
              <span>{access}</span>
            </div>
            <span className="status">Active</span>
          </div>
        ))}
      </section>
    </>
  );
}

function Billing() {
  const methods = [
    ["Razorpay", "razorpay", "0A2540"],
    ["Stripe", "stripe", "635BFF"],
    ["PayPal", "paypal", "003087"],
    ["Google Pay", "googlepay", "4285F4"],
    ["PhonePe", "phonepe", "5F259F"],
  ];

  return (
    <>
      <PageIntro
        eyebrow="SUBSCRIPTION"
        title="Billing & Payments"
        text="Configure payment methods for your SaaS subscription."
      />

      <section className="paymentGrid">
        {methods.map(([name, slug, color]) => (
          <div className="paymentCard" key={name}>
            <img src={logoUrl(slug, color)} alt={name} />
            <strong>{name}</strong>
            <span>Available</span>
          </div>
        ))}
        <div className="paymentCard">
          <CreditCard />
          <strong>Debit Card</strong>
          <span>Available</span>
        </div>
        <div className="paymentCard">
          <CreditCard />
          <strong>Credit Card</strong>
          <span>Available</span>
        </div>
        <div className="paymentCard">
          <CreditCard />
          <strong>super.money</strong>
          <span>Configure</span>
        </div>
      </section>
    </>
  );
}

function Notifications() {
  return (
    <>
      <PageIntro
        eyebrow="ALERTS"
        title="Notifications"
        text="Control how your team receives revenue leakage alerts."
      />

      <section className="panel">
        {[
          "High-value leakage detected",
          "Missed customer follow-up",
          "AI investigation completed",
          "Action requires approval",
          "Revenue recovery verified",
        ].map((item) => (
          <div className="notificationRow" key={item}>
            <Bell size={18} />
            <div>
              <strong>{item}</strong>
              <span>Enabled</span>
            </div>
            <input type="checkbox" defaultChecked />
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
            <input placeholder="Your company name" />
          </label>

          <label>
            Workspace Name
            <input placeholder="Revenue Intelligence Workspace" />
          </label>

          <label>
            Facebook
            <input placeholder="Add your Facebook URL" />
          </label>

          <label>
            Instagram
            <input placeholder="Add your Instagram URL" />
          </label>
        </div>

        <button className="primary">
          Save Settings
        </button>
      </section>
    </>
  );
}

function PageIntro({ eyebrow, title, text }) {
  return (
    <section className="pageIntro">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

export default App;