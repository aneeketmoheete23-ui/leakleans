import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Check,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Database,
  FileSearch,
  Gauge,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Play,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const BRAND = "LeakLeans";
const FOUNDER = "ANIKET MOHITE";
const PHONE = "8698382024";
const EMAIL = "Aniket.Mohite@leaklens.com";

const logoUrls = {
  WhatsApp: "https://cdn.simpleicons.org/whatsapp",
  Salesforce: "https://cdn.simpleicons.org/salesforce",
  HubSpot: "https://cdn.simpleicons.org/hubspot",
  Gmail: "https://cdn.simpleicons.org/gmail",
  Genesys: "https://cdn.simpleicons.org/genesys",
  Avaya: "https://cdn.simpleicons.org/avaya",
  Zendesk: "https://cdn.simpleicons.org/zendesk",
};

const leaks = [
  {
    id: 1,
    title: "Follow-up Failure",
    source: "Salesforce",
    amount: 148000,
    severity: "High",
    team: "Sales Team",
    description:
      "Several qualified opportunities have no recent follow-up activity.",
  },
  {
    id: 2,
    title: "Missed Inbound Calls",
    source: "Genesys",
    amount: 86000,
    severity: "High",
    team: "Call Team",
    description:
      "Inbound calls are being missed during peak operating hours.",
  },
  {
    id: 3,
    title: "Quote-to-Order Drop",
    source: "CRM + Sales",
    amount: 214000,
    severity: "Medium",
    team: "Sales Team",
    description:
      "Quotes are being generated but a significant number are not converting.",
  },
];

const systems = [
  "Salesforce",
  "Genesys",
  "Avaya",
  "WhatsApp",
  "HubSpot",
  "Gmail",
  "Zendesk",
];

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "leaks", label: "Revenue Leaks", icon: AlertTriangle },
  { id: "investigation", label: "Investigation", icon: FileSearch },
  { id: "integrations", label: "Integrations", icon: Database },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "actions", label: "Actions", icon: Zap },
  { id: "agent", label: "Agent System", icon: Bot },
  { id: "team", label: "Team", icon: Users },
  { id: "billing", label: "Billing & Payments", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function PlatformLogo({ name, size = 30 }) {
  const key = name === "WhatsApp Business" ? "WhatsApp" : name;

  return (
    <div
      className="platform-logo"
      style={{ width: size, height: size }}
      title={name}
    >
      {logoUrls[key] ? (
        <img src={logoUrls[key]} alt={name} />
      ) : (
        <span>{name.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}

function LeakLeansMark() {
  return (
    <div className="brand-mark">
      <span>L</span>
      <span>L</span>
    </div>
  );
}

function PageTitle({ eyebrow, title, description, action }) {
  return (
    <div className="page-title">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, danger }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">
          <Icon size={19} />
        </div>

        {change && (
          <span className={danger ? "change danger" : "change"}>
            {change}
          </span>
        )}
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState("overview");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [assistantOpen, setAssistantOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [chat, setChat] = useState([
    {
      role: "assistant",
      text: "Hi Team — your Revenue Assistant is ready.",
    },
    {
      role: "assistant",
      text:
        "I can help you identify revenue leaks, investigate issues, and understand where money may be getting lost.",
    },
  ]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const [selectedLeak, setSelectedLeak] = useState(null);
  const [connectSystem, setConnectSystem] = useState(null);
  const [manualConnect, setManualConnect] = useState(false);

  const [connections, setConnections] = useState(
    systems.reduce((acc, item) => {
      acc[item] = "Not connected";
      return acc;
    }, {})
  );

  const [actionModal, setActionModal] = useState(null);
  const [teamModal, setTeamModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New high-value leak detected",
      text: "Follow-up Failure may affect ₹1,48,000.",
      read: false,
    },
    {
      id: 2,
      title: "Integration ready",
      text: "Connect Salesforce to start monitoring.",
      read: false,
    },
    {
      id: 3,
      title: "Weekly revenue report",
      text: "Your revenue leak summary is ready.",
      read: true,
    },
  ]);

  const [settings, setSettings] = useState({
    autoScan: true,
    emailAlerts: true,
    aiActions: false,
    weeklyReport: true,
  });

  const [agentEnabled, setAgentEnabled] = useState(true);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chat, aiLoading]);

  function goTo(page) {
    setActivePage(page);
    setMobileMenu(false);
  }

  async function sendMessage(customText) {
    const message = (customText ?? input).trim();

    if (!message || aiLoading) return;

    setInput("");

    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
    ]);

    setAiLoading(true);

    try {
      const prompt = `
You are the LeakLeans AI Revenue Assistant.

LeakLeans is an AI Revenue Leak Detection Platform founded by Aniket Mohite.

Your job is to help a business:
- find revenue leaks
- investigate missed opportunities
- analyze sales and support problems
- explain revenue impact
- suggest practical next actions

Connected systems shown in the UI:
${Object.entries(connections)
  .map(([name, status]) => `${name}: ${status}`)
  .join("\n")}

Important:
Do not claim that an integration is actually connected unless its status says Connected (Demo).
Do not invent real business data.
Keep answers clean, professional and easy to read.
Avoid excessive commas and punctuation.
Use short paragraphs and bullet points when useful.

User:
${message}
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
        throw new Error(data?.error || "AI request failed");
      }

      const answer =
        data?.text ||
        data?.response ||
        data?.message ||
        "I could not generate a response right now.";

      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text: answer,
        },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "I couldn't process that request right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  }

  function connectAutomatically() {
    if (!connectSystem) return;

    setConnections((prev) => ({
      ...prev,
      [connectSystem]: "Connected (Demo)",
    }));

    setConnectSystem(null);
    setManualConnect(false);
  }

  function saveManualConnection() {
    if (!connectSystem) return;

    setConnections((prev) => ({
      ...prev,
      [connectSystem]: "Configured (Demo)",
    }));

    setConnectSystem(null);
    setManualConnect(false);
  }

  function renderPage() {
    if (activePage === "overview") {
      return (
        <>
          <PageTitle
            eyebrow="REVENUE INTELLIGENCE"
            title="Revenue Overview"
            description="Monitor where revenue is being lost and what needs attention."
            action={
              <button
                className="primary-btn"
                onClick={() => goTo("investigation")}
              >
                <FileSearch size={17} />
                Start Investigation
              </button>
            }
          />

          <div className="stats-grid">
            <StatCard
              icon={CircleDollarSign}
              label="Revenue at risk"
              value="₹4.48L"
              change="+12.4%"
              danger
            />
            <StatCard
              icon={AlertTriangle}
              label="Active leaks"
              value="18"
              change="6 high priority"
              danger
            />
            <StatCard
              icon={Target}
              label="Opportunities recovered"
              value="₹1.72L"
              change="+18.2%"
            />
            <StatCard
              icon={Gauge}
              label="Leak detection score"
              value="87%"
              change="Healthy"
            />
          </div>

          <div className="two-column">
            <section className="card">
              <div className="card-header">
                <div>
                  <h2>Priority revenue leaks</h2>
                  <p>Issues with the highest estimated impact.</p>
                </div>

                <button
                  className="ghost-btn"
                  onClick={() => goTo("leaks")}
                >
                  View all <ChevronRight size={16} />
                </button>
              </div>

              <div className="leak-list">
                {leaks.map((leak) => (
                  <button
                    className="leak-row"
                    key={leak.id}
                    onClick={() => {
                      setSelectedLeak(leak);
                      goTo("leaks");
                    }}
                  >
                    <div className="leak-main">
                      <div className="mini-warning">
                        <AlertTriangle size={16} />
                      </div>

                      <div>
                        <strong>{leak.title}</strong>
                        <span>
                          {leak.source} · {leak.team}
                        </span>
                      </div>
                    </div>

                    <div className="leak-money">
                      <strong>{money(leak.amount)}</strong>
                      <span className="severity">{leak.severity}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="card-header">
                <div>
                  <h2>Revenue health</h2>
                  <p>Current detection performance.</p>
                </div>
                <Activity size={20} />
              </div>

              <div className="health-score">
                <div className="score-circle">87%</div>

                <div>
                  <strong>Good visibility</strong>
                  <p>
                    LeakLeans is monitoring your configured revenue sources.
                  </p>
                </div>
              </div>

              <div className="progress">
                <span style={{ width: "87%" }} />
              </div>

              <div className="health-items">
                <div>
                  <span>Sales signals</span>
                  <b>92%</b>
                </div>
                <div>
                  <span>Support signals</span>
                  <b>84%</b>
                </div>
                <div>
                  <span>Follow-up signals</span>
                  <b>79%</b>
                </div>
              </div>
            </section>
          </div>

          <section className="founder-card">
            <div className="founder-avatar">AM</div>

            <div className="founder-info">
              <div className="eyebrow">FOUNDER</div>
              <h2>{FOUNDER}</h2>
              <p>Founder — LeakLeans</p>
              <span>AI Revenue Leak Detection Platform</span>
            </div>

            <div className="founder-contact">
              <a href={`tel:${PHONE}`}>
                <Phone size={16} />
                {PHONE}
              </a>

              <a href={`mailto:${EMAIL}`}>
                <Mail size={16} />
                {EMAIL}
              </a>
            </div>
          </section>
        </>
      );
    }

    if (activePage === "leaks") {
      return (
        <>
          <PageTitle
            eyebrow="REVENUE LEAKS"
            title="Find Where Revenue Is Leaking"
            description="Review detected issues and investigate their estimated financial impact."
          />

          <div className="search-bar">
            <Search size={18} />
            <input placeholder="Search revenue leaks..." />
          </div>

          <div className="leaks-grid">
            {leaks.map((leak) => (
              <div className="leak-card" key={leak.id}>
                <div className="leak-card-top">
                  <div className="mini-warning">
                    <AlertTriangle size={17} />
                  </div>

                  <span className="severity">{leak.severity}</span>
                </div>

                <h3>{leak.title}</h3>

                <p>{leak.description}</p>

                <div className="source-line">
                  <PlatformLogo name={leak.source.split(" + ")[0]} size={24} />
                  <span>{leak.source}</span>
                </div>

                <div className="impact">
                  <span>Estimated revenue at risk</span>
                  <strong>{money(leak.amount)}</strong>
                </div>

                <button
                  className="primary-btn full"
                  onClick={() => {
                    setSelectedLeak(leak);
                    goTo("investigation");
                  }}
                >
                  Investigate <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          {selectedLeak && (
            <section className="card investigation-preview">
              <div className="card-header">
                <div>
                  <div className="eyebrow">SELECTED LEAK</div>
                  <h2>{selectedLeak.title}</h2>
                  <p>{selectedLeak.description}</p>
                </div>

                <button
                  className="icon-btn"
                  onClick={() => setSelectedLeak(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="detail-grid">
                <div>
                  <span>Source</span>
                  <strong>{selectedLeak.source}</strong>
                </div>
                <div>
                  <span>Team</span>
                  <strong>{selectedLeak.team}</strong>
                </div>
                <div>
                  <span>Impact</span>
                  <strong>{money(selectedLeak.amount)}</strong>
                </div>
                <div>
                  <span>Priority</span>
                  <strong>{selectedLeak.severity}</strong>
                </div>
              </div>
            </section>
          )}
        </>
      );
    }

    if (activePage === "investigation") {
      return (
        <>
          <PageTitle
            eyebrow="AI INVESTIGATION"
            title="Investigate a Revenue Leak"
            description="Use the AI assistant to understand root causes and next actions."
          />

          <div className="investigation-layout">
            <section className="card">
              <div className="card-header">
                <div>
                  <h2>Select a leak</h2>
                  <p>Choose an issue to investigate.</p>
                </div>
              </div>

              <div className="select-leaks">
                {leaks.map((leak) => (
                  <button
                    key={leak.id}
                    className={
                      selectedLeak?.id === leak.id
                        ? "select-leak active"
                        : "select-leak"
                    }
                    onClick={() => setSelectedLeak(leak)}
                  >
                    <div className="mini-warning">
                      <AlertTriangle size={15} />
                    </div>

                    <div>
                      <strong>{leak.title}</strong>
                      <span>{money(leak.amount)} at risk</span>
                    </div>

                    <ChevronRight size={17} />
                  </button>
                ))}
              </div>
            </section>

            <section className="card investigation-card">
              <div className="ai-title">
                <div className="ai-icon">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h2>AI Investigation</h2>
                  <p>Revenue intelligence analysis</p>
                </div>
              </div>

              {!selectedLeak ? (
                <div className="empty-state">
                  <FileSearch size={34} />
                  <h3>Select a revenue leak</h3>
                  <p>
                    Choose an issue from the left to begin the investigation.
                  </p>
                </div>
              ) : (
                <>
                  <div className="analysis-box">
                    <span>Investigating</span>
                    <strong>{selectedLeak.title}</strong>
                    <p>{selectedLeak.description}</p>
                  </div>

                  <div className="analysis-points">
                    <div>
                      <Check size={17} />
                      <span>Identify the process where revenue is dropping</span>
                    </div>
                    <div>
                      <Check size={17} />
                      <span>Compare activity against expected behaviour</span>
                    </div>
                    <div>
                      <Check size={17} />
                      <span>Generate practical recovery actions</span>
                    </div>
                  </div>

                  <button
                    className="primary-btn"
                    onClick={() =>
                      sendMessage(
                        `Investigate this revenue leak: ${selectedLeak.title}. Estimated impact is ${money(
                          selectedLeak.amount
                        )}. Give me root causes and practical recovery actions.`
                      )
                    }
                  >
                    <Sparkles size={17} />
                    Ask AI to investigate
                  </button>
                </>
              )}
            </section>
          </div>
        </>
      );
    }

    if (activePage === "integrations") {
      return (
        <>
          <PageTitle
            eyebrow="DATA CONNECTIONS"
            title="Integrations"
            description="Connect the systems that contain your revenue signals."
            action={
              <button
                className="primary-btn"
                onClick={() => setConnectSystem("Salesforce")}
              >
                <Plus size={17} />
                Connect system
              </button>
            }
          />

          <div className="integration-grid">
            {systems.map((system) => (
              <div className="integration-card" key={system}>
                <div className="integration-top">
                  <PlatformLogo name={system} size={42} />

                  <span
                    className={
                      connections[system].includes("Connected") ||
                      connections[system].includes("Configured")
                        ? "status connected"
                        : "status"
                    }
                  >
                    {connections[system]}
                  </span>
                </div>

                <h3>{system}</h3>
                <p>
                  Monitor revenue signals and detect opportunities automatically.
                </p>

                <button
                  className="secondary-btn full"
                  onClick={() => {
                    setConnectSystem(system);
                    setManualConnect(false);
                  }}
                >
                  {connections[system] === "Not connected"
                    ? "Connect"
                    : "Manage connection"}
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (activePage === "analytics") {
      return (
        <>
          <PageTitle
            eyebrow="ANALYTICS"
            title="Revenue Analytics"
            description="Understand trends behind your revenue leakage."
          />

          <div className="stats-grid">
            <StatCard
              icon={CircleDollarSign}
              label="Potential recovery"
              value="₹6.82L"
              change="+21.8%"
            />
            <StatCard
              icon={AlertTriangle}
              label="Detected this month"
              value="42"
              change="+8"
            />
            <StatCard
              icon={Target}
              label="Recovered"
              value="₹2.31L"
              change="+14.6%"
            />
            <StatCard
              icon={RefreshCw}
              label="Scan frequency"
              value="Daily"
              change="Active"
            />
          </div>

          <section className="card chart-card">
            <div className="card-header">
              <div>
                <h2>Revenue leak trend</h2>
                <p>Estimated revenue at risk over the last 7 periods.</p>
              </div>

              <select className="period-select" defaultValue="7">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>

            <div className="fake-chart">
              {[42, 57, 48, 72, 61, 84, 68, 91, 73, 86, 78, 95].map(
                (height, index) => (
                  <div className="chart-bar-wrap" key={index}>
                    <div
                      className="chart-bar"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                )
              )}
            </div>

            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </section>
        </>
      );
    }

    if (activePage === "actions") {
      return (
        <>
          <PageTitle
            eyebrow="RECOVERY ACTIONS"
            title="Actions"
            description="Turn detected revenue leaks into recovery workflows."
          />

          <div className="action-grid">
            {[
              {
                title: "Follow-up campaign",
                text: "Create follow-up tasks for inactive opportunities.",
                icon: MessageSquare,
              },
              {
                title: "Missed-call recovery",
                text: "Create a callback workflow for missed inbound calls.",
                icon: Phone,
              },
              {
                title: "Quote recovery",
                text: "Find quotes that have not converted and flag them.",
                icon: Target,
              },
            ].map((action) => (
              <div className="action-card" key={action.title}>
                <div className="action-icon">
                  <action.icon size={20} />
                </div>

                <h3>{action.title}</h3>
                <p>{action.text}</p>

                <button
                  className="secondary-btn"
                  onClick={() => setActionModal(action)}
                >
                  Configure <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (activePage === "agent") {
      return (
        <>
          <PageTitle
            eyebrow="AI AGENT SYSTEM"
            title="Revenue Agent"
            description="Control how your LeakLeans AI assistant behaves."
          />

          <section className="card agent-system-card">
            <div className="agent-hero">
              <div className="large-ai-icon">
                <Bot size={30} />
              </div>

              <div>
                <div className="eyebrow">LEAKLEANS AI</div>
                <h2>Revenue Intelligence Agent</h2>
                <p>
                  Your AI assistant can analyze revenue signals and help your
                  team investigate potential leaks.
                </p>
              </div>

              <button
                className={agentEnabled ? "toggle on" : "toggle"}
                onClick={() => setAgentEnabled((v) => !v)}
              >
                <span />
              </button>
            </div>

            <div className="agent-features">
              <div>
                <Sparkles size={18} />
                <div>
                  <strong>AI Revenue Analysis</strong>
                  <span>Identify patterns and revenue risks.</span>
                </div>
              </div>

              <div>
                <ShieldCheck size={18} />
                <div>
                  <strong>Controlled Actions</strong>
                  <span>Actions require your confirmation.</span>
                </div>
              </div>

              <div>
                <RefreshCw size={18} />
                <div>
                  <strong>Continuous Monitoring</strong>
                  <span>Scan configured revenue sources regularly.</span>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }

    if (activePage === "team") {
      return (
        <>
          <PageTitle
            eyebrow="TEAM"
            title="Team"
            description="Manage people who can access LeakLeans."
            action={
              <button
                className="primary-btn"
                onClick={() => setTeamModal(true)}
              >
                <Plus size={17} />
                Add member
              </button>
            }
          />

          <section className="card">
            <div className="team-member">
              <div className="member-avatar">AM</div>

              <div className="member-info">
                <strong>{FOUNDER}</strong>
                <span>{EMAIL}</span>
              </div>

              <span className="role-pill">Founder</span>

              <span className="member-status">
                <Check size={14} /> Active
              </span>

              <button className="icon-btn">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="team-empty">
              <Users size={30} />
              <h3>Add your revenue team</h3>
              <p>
                Invite sales, support and operations users to collaborate on
                revenue recovery.
              </p>
              <button
                className="secondary-btn"
                onClick={() => setTeamModal(true)}
              >
                <Plus size={16} />
                Add team member
              </button>
            </div>
          </section>
        </>
      );
    }

    if (activePage === "billing") {
      const plans = [
        {
          name: "Starter",
          price: "₹20,999",
          description: "For small teams starting revenue monitoring.",
        },
        {
          name: "Growth",
          price: "₹59,999",
          description: "For growing teams with multiple revenue sources.",
          popular: true,
        },
        {
          name: "Enterprise",
          price: "₹99,999",
          description: "For larger operations and advanced workflows.",
        },
      ];

      return (
        <>
          <PageTitle
            eyebrow="BILLING"
            title="Plans & Payments"
            description="Choose the LeakLeans plan that fits your operation."
          />

          <div className="billing-grid">
            {plans.map((plan) => (
              <div
                className={
                  plan.popular
                    ? "plan-card popular"
                    : "plan-card"
                }
                key={plan.name}
              >
                {plan.popular && (
                  <div className="popular-badge">POPULAR</div>
                )}

                <h3>{plan.name}</h3>
                <div className="plan-price">{plan.price}</div>
                <span className="plan-period">per plan period</span>
                <p>{plan.description}</p>

                <div className="plan-feature">
                  <Check size={15} />
                  Revenue leak detection
                </div>

                <div className="plan-feature">
                  <Check size={15} />
                  AI investigation
                </div>

                <div className="plan-feature">
                  <Check size={15} />
                  Analytics dashboard
                </div>

                <button
                  className="primary-btn full"
                  onClick={() => setPaymentModal(plan)}
                >
                  Select plan
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          <section className="card payment-methods">
            <div>
              <h2>Payment methods</h2>
              <p>Payment gateway can be connected here.</p>
            </div>

            <div className="payment-options">
              <div>
                <Wallet size={20} />
                <span>UPI</span>
              </div>

              <div>
                <CreditCard size={20} />
                <span>Cards</span>
              </div>

              <div>
                <Database size={20} />
                <span>Net Banking</span>
              </div>

              <div>
                <CircleDollarSign size={20} />
                <span>Wallets</span>
              </div>
            </div>
          </section>
        </>
      );
    }

    if (activePage === "notifications") {
      return (
        <>
          <PageTitle
            eyebrow="NOTIFICATIONS"
            title="Notifications"
            description="Stay updated on important revenue signals."
            action={
              <button
                className="ghost-btn"
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((item) => ({ ...item, read: true }))
                  )
                }
              >
                Mark all as read
              </button>
            }
          />

          <section className="card notification-list">
            {notifications.map((item) => (
              <button
                className={item.read ? "notification read" : "notification"}
                key={item.id}
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((n) =>
                      n.id === item.id ? { ...n, read: true } : n
                    )
                  )
                }
              >
                <div className="notification-icon">
                  <Bell size={17} />
                </div>

                <div>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>

                {!item.read && <i />}
              </button>
            ))}
          </section>
        </>
      );
    }

    if (activePage === "settings") {
      const settingRows = [
        {
          key: "autoScan",
          title: "Automatic revenue scanning",
          text: "Scan connected sources for revenue leaks.",
        },
        {
          key: "emailAlerts",
          title: "Email alerts",
          text: "Receive important revenue leak notifications.",
        },
        {
          key: "aiActions",
          title: "AI action suggestions",
          text: "Allow the AI agent to recommend recovery actions.",
        },
        {
          key: "weeklyReport",
          title: "Weekly revenue report",
          text: "Receive a weekly summary of detected leaks.",
        },
      ];

      return (
        <>
          <PageTitle
            eyebrow="SETTINGS"
            title="Workspace Settings"
            description="Configure how LeakLeans monitors your business."
          />

          <section className="card settings-list">
            {settingRows.map((item) => (
              <div className="setting-row" key={item.key}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>

                <button
                  className={settings[item.key] ? "toggle on" : "toggle"}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key],
                    }))
                  }
                >
                  <span />
                </button>
              </div>
            ))}
          </section>

          <section className="card founder-settings">
            <div className="setting-contact-icon">
              <Phone size={18} />
            </div>

            <div>
              <div className="eyebrow">FOUNDER CONTACT</div>
              <h3>{FOUNDER}</h3>
              <p>{PHONE}</p>
              <p>{EMAIL}</p>
            </div>
          </section>
        </>
      );
    }

    return null;
  }

  return (
    <div className="app-shell">
      <aside className={mobileMenu ? "sidebar open" : "sidebar"}>
        <div className="sidebar-brand">
          <LeakLeansMark />
          <div>
            <strong>{BRAND}</strong>
            <span>Revenue Intelligence</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
          >
            <X size={19} />
          </button>
        </div>

        <nav>
          <div className="nav-section-title">WORKSPACE</div>

          {navItems.slice(0, 7).map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={activePage === item.id ? "nav-item active" : "nav-item"}
                onClick={() => goTo(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="nav-section-title second">MANAGE</div>

          {navItems.slice(7).map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={activePage === item.id ? "nav-item active" : "nav-item"}
                onClick={() => goTo(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-founder">
          <div className="small-avatar">AM</div>

          <div>
            <strong>{FOUNDER}</strong>
            <span>Founder — LeakLeans</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={21} />
          </button>

          <div className="breadcrumb">
            <span>{BRAND}</span>
            <ChevronRight size={14} />
            <strong>
              {navItems.find((x) => x.id === activePage)?.label}
            </strong>
          </div>

          <div className="topbar-right">
            <button
              className="top-icon"
              onClick={() => goTo("notifications")}
            >
              <Bell size={18} />
              {notifications.some((x) => !x.read) && <i />}
            </button>

            <div className="top-user">
              <div className="small-avatar">AM</div>
              <div>
                <strong>{FOUNDER}</strong>
                <span>Founder</span>
              </div>
            </div>
          </div>
        </header>

        <div className="content">{renderPage()}</div>

        <footer>
          <span>© 2026 LeakLeans</span>
          <span>AI Revenue Leak Detection Platform</span>
        </footer>
      </main>

      {!assistantOpen && (
        <button
          className="agent-launcher"
          onClick={() => setAssistantOpen(true)}
        >
          <div className="agent-launcher-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <strong>LeakLeans AI Agent</strong>
            <span>Find your revenue leaks</span>
          </div>

          <ArrowRight size={17} />
        </button>
      )}

      {assistantOpen && (
        <section className="assistant-window">
          <div className="assistant-header">
            <div className="assistant-brand">
              <div className="assistant-avatar">
                <Sparkles size={18} />
              </div>

              <div>
                <strong>LeakLeans AI Agent</strong>
                <span>
                  {aiLoading ? "Analyzing..." : "Revenue Assistant · Online"}
                </span>
              </div>
            </div>

            <div className="assistant-actions">
              <button
                className="icon-btn"
                onClick={() => setChat([])}
                title="Clear chat"
              >
                <RefreshCw size={16} />
              </button>

              <button
                className="icon-btn"
                onClick={() => setAssistantOpen(false)}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          <div className="assistant-messages">
            <div className="assistant-founder">
              <div className="founder-avatar small">AM</div>
              <div>
                <strong>{FOUNDER}</strong>
                <span>Founder — LeakLeans</span>
              </div>
            </div>

            {chat.map((message, index) => (
              <div
                className={
                  message.role === "user"
                    ? "chat-bubble user"
                    : "chat-bubble assistant"
                }
                key={index}
              >
                {message.text}
              </div>
            ))}

            {aiLoading && (
              <div className="chat-bubble assistant typing">
                <span />
                <span />
                <span />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="assistant-suggestions">
            <button
              onClick={() =>
                sendMessage("Find my biggest revenue leak.")
              }
            >
              Biggest leak
            </button>

            <button
              onClick={() =>
                sendMessage("How can I recover lost revenue?")
              }
            >
              Recovery ideas
            </button>

            <button
              onClick={() =>
                sendMessage("What integrations should I connect first?")
              }
            >
              Integrations
            </button>
          </div>

          <div className="assistant-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask your Revenue Assistant..."
              disabled={aiLoading}
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || aiLoading}
            >
              <Send size={17} />
            </button>
          </div>
        </section>
      )}

      {connectSystem && (
        <div className="modal-backdrop" onClick={() => setConnectSystem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-platform">
                <PlatformLogo name={connectSystem} size={42} />
                <div>
                  <div className="eyebrow">INTEGRATION</div>
                  <h2>{connectSystem}</h2>
                </div>
              </div>

              <button
                className="icon-btn"
                onClick={() => setConnectSystem(null)}
              >
                <X size={18} />
              </button>
            </div>

            {!manualConnect ? (
              <>
                <p className="modal-description">
                  Choose how you want to configure this integration.
                </p>

                <button
                  className="connect-option"
                  onClick={connectAutomatically}
                >
                  <div className="option-icon">
                    <Zap size={19} />
                  </div>
                  <div>
                    <strong>Automatic Connect</strong>
                    <span>
                      Start the guided connection flow.
                    </span>
                  </div>
                  <ChevronRight size={17} />
                </button>

                <button
                  className="connect-option"
                  onClick={() => setManualConnect(true)}
                >
                  <div className="option-icon">
                    <Settings size={19} />
                  </div>
                  <div>
                    <strong>Add Manually</strong>
                    <span>
                      Enter your integration details manually.
                    </span>
                  </div>
                  <ChevronRight size={17} />
                </button>

                <div className="demo-note">
                  <ShieldCheck size={16} />
                  Demo configuration only. Real API credentials are required
                  for live data.
                </div>
              </>
            ) : (
              <>
                <p className="modal-description">
                  Add the required connection details.
                </p>

                <label>
                  API Key / Client ID
                  <input placeholder="Enter API key or client ID" />
                </label>

                <label>
                  Workspace / Account ID
                  <input placeholder="Enter account ID" />
                </label>

                <label>
                  Base URL
                  <input placeholder="https://your-workspace.example" />
                </label>

                <div className="modal-actions">
                  <button
                    className="secondary-btn"
                    onClick={() => setManualConnect(false)}
                  >
                    Back
                  </button>

                  <button
                    className="primary-btn"
                    onClick={saveManualConnection}
                  >
                    Save configuration
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {actionModal && (
        <div className="modal-backdrop" onClick={() => setActionModal(null)}>
          <div className="modal small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-platform">
                <div className="option-icon">
                  <Play size={18} />
                </div>
                <div>
                  <div className="eyebrow">ACTION</div>
                  <h2>{actionModal.title}</h2>
                </div>
              </div>

              <button
                className="icon-btn"
                onClick={() => setActionModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <p className="modal-description">{actionModal.text}</p>

            <div className="demo-note">
              <ShieldCheck size={16} />
              This is a workflow preview. Live execution will require the
              relevant integration and permissions.
            </div>

            <button
              className="primary-btn full"
              onClick={() => setActionModal(null)}
            >
              Save action
            </button>
          </div>
        </div>
      )}

      {teamModal && (
        <div className="modal-backdrop" onClick={() => setTeamModal(false)}>
          <div className="modal small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="eyebrow">TEAM</div>
                <h2>Add team member</h2>
              </div>

              <button
                className="icon-btn"
                onClick={() => setTeamModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <label>
              Name
              <input placeholder="Team member name" />
            </label>

            <label>
              Email
              <input type="email" placeholder="name@company.com" />
            </label>

            <label>
              Role
              <select defaultValue="Member">
                <option>Member</option>
                <option>Admin</option>
                <option>Viewer</option>
              </select>
            </label>

            <button
              className="primary-btn full"
              onClick={() => setTeamModal(false)}
            >
              Send invitation
            </button>
          </div>
        </div>
      )}

      {paymentModal && (
        <div
          className="modal-backdrop"
          onClick={() => setPaymentModal(null)}
        >
          <div className="modal small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="eyebrow">CHECKOUT</div>
                <h2>{paymentModal.name} Plan</h2>
              </div>

              <button
                className="icon-btn"
                onClick={() => setPaymentModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="checkout-price">{paymentModal.price}</div>

            <p className="modal-description">
              Select your preferred payment method.
            </p>

            <div className="checkout-options">
              <button>
                <Wallet size={20} />
                <span>UPI</span>
                <ChevronRight size={16} />
              </button>

              <button>
                <CreditCard size={20} />
                <span>Credit / Debit Card</span>
                <ChevronRight size={16} />
              </button>

              <button>
                <Database size={20} />
                <span>Net Banking</span>
                <ChevronRight size={16} />
              </button>

              <button>
                <CircleDollarSign size={20} />
                <span>Wallet</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="demo-note">
              <ShieldCheck size={16} />
              Payment gateway is not connected yet. This screen is ready for
              gateway integration.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;