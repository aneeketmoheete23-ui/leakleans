import React, { useEffect, useState } from "react";
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
  MessageCircle,
  Database,
  Mail,
  PhoneCall,
  Sparkles,
} from "lucide-react";

import "./App.css";

const BRAND = "AI REVENUE LEAK DETECTOR";
const TAGLINE = "Find Where Your Revenue Is Leaking.";
const FOUNDER = "ANIKET MOHITE";

const demoLeaks = [
  {
    issue: "Follow-up Failure",
    source: "Salesforce",
    severity: "High",
    amount: "₹1,48,000",
    owner: "Sales Team",
  },
  {
    issue: "Missed Inbound Calls",
    source: "Genesys",
    severity: "High",
    amount: "₹86,000",
    owner: "Call Team",
  },
  {
    issue: "Quote-to-Order Drop",
    source: "CRM + Sales",
    severity: "Medium",
    amount: "₹2,14,000",
    owner: "Sales Team",
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
  { name: "Overview", icon: LayoutDashboard },
  { name: "Revenue Leaks", icon: AlertTriangle },
  { name: "Investigation", icon: Search },
  { name: "Integrations", icon: Plug },
  { name: "Analytics", icon: BarChart3 },
  { name: "Actions", icon: Zap },
  { name: "Agent System", icon: Bot },
  { name: "Team", icon: Users },
  { name: "Billing & Payments", icon: CreditCard },
  { name: "Notifications", icon: Bell },
  { name: "Settings", icon: SettingsIcon },
];

function formatInline(text) {
  if (!text) return null;

  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

function formatAIText(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div className="aiSpace" key={index} />;
    }

    if (
      trimmed.startsWith("### ") ||
      trimmed.startsWith("## ")
    ) {
      return (
        <h4 key={index}>
          {trimmed.replace(/^#{2,3}\s*/, "")}
        </h4>
      );
    }

    if (
      trimmed.startsWith("- ") ||
      trimmed.startsWith("• ")
    ) {
      const bullet = trimmed.replace(/^[-•]\s*/, "");

      return (
        <div className="aiBullet" key={index}>
          <span>•</span>
          <div>{formatInline(bullet)}</div>
        </div>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const number = trimmed.match(/^\d+/)?.[0];
      const content = trimmed.replace(/^\d+\.\s*/, "");

      return (
        <div className="aiNumber" key={index}>
          <span>{number}</span>
          <div>{formatInline(content)}</div>
        </div>
      );
    }

    return (
      <p key={index}>
        {formatInline(trimmed)}
      </p>
    );
  });
}

function TypingMessage({ text, speed = 12 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");

    let index = 0;

    const timer = setInterval(() => {
      index += 1;

      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className="aiFormatted">
      {formatAIText(displayed)}

      {displayed.length < text.length && (
        <span className="typingCursor" />
      )}
    </div>
  );
}

function Stat({ label, value, sub, icon: Icon }) {
  return (
    <div className="statCard">
      <div className="statTop">
        <span>{label}</span>

        <div className="statIcon">
          <Icon size={17} />
        </div>
      </div>

      <strong>{value}</strong>

      <small>{sub}</small>
    </div>
  );
}

function PageIntro({ title, description }) {
  return (
    <div className="pageIntro">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function Overview({ navigate }) {
  return (
    <>
      <PageIntro
        title="Revenue Intelligence"
        description={TAGLINE}
      />

      <div className="hero">
        <div>
          <div className="eyebrow">
            {BRAND}
          </div>

          <h2>
            Find the revenue your business is
            <span> quietly losing.</span>
          </h2>

          <p>
            LeakLeans connects your business systems,
            detects revenue leakage patterns and helps
            your team recover lost opportunities.
          </p>

          <button
            className="primaryButton"
            onClick={() => navigate("Revenue Leaks")}
          >
            Explore Revenue Leaks
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="heroVisual">
          <div className="heroVisualTop">
            <span>Revenue at risk</span>
            <AlertTriangle size={18} />
          </div>

          <strong>₹4,48,000</strong>

          <div className="heroMiniBar">
            <span style={{ width: "72%" }} />
          </div>

          <small>
            Potential leakage detected
          </small>
        </div>
      </div>

      <div className="statsGrid">
        <Stat
          label="Revenue at Risk"
          value="₹4.48L"
          sub="Potential leakage"
          icon={AlertTriangle}
        />

        <Stat
          label="Active Leaks"
          value="18"
          sub="Across connected systems"
          icon={Search}
        />

        <Stat
          label="Recovery Opportunities"
          value="₹2.14L"
          sub="Currently recoverable"
          icon={Zap}
        />

        <Stat
          label="Connected Systems"
          value="7"
          sub="Business data sources"
          icon={Plug}
        />
      </div>

      <div className="panel">
        <div className="panelHeader">
          <div>
            <h3>Priority Revenue Leaks</h3>
            <p>
              Issues that may be impacting revenue.
            </p>
          </div>

          <button
            className="ghostButton"
            onClick={() => navigate("Revenue Leaks")}
          >
            View all
          </button>
        </div>

        <LeakTable />
      </div>
    </>
  );
}

function LeakTable() {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>Revenue Issue</th>
            <th>Source</th>
            <th>Severity</th>
            <th>Potential Loss</th>
            <th>Owner</th>
          </tr>
        </thead>

        <tbody>
          {demoLeaks.map((leak, index) => (
            <tr key={index}>
              <td>
                <strong>{leak.issue}</strong>
              </td>

              <td>{leak.source}</td>

              <td>
                <span
                  className={`severity ${leak.severity.toLowerCase()}`}
                >
                  {leak.severity}
                </span>
              </td>

              <td>
                <strong>{leak.amount}</strong>
              </td>

              <td>{leak.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Leaks({ navigate }) {
  return (
    <>
      <PageIntro
        title="Revenue Leaks"
        description="Identify where potential revenue is being lost."
      />

      <div className="statsGrid">
        <Stat
          label="Total Active Leaks"
          value="18"
          sub="Detected opportunities"
          icon={AlertTriangle}
        />

        <Stat
          label="High Priority"
          value="7"
          sub="Require attention"
          icon={Zap}
        />

        <Stat
          label="Potential Loss"
          value="₹4.48L"
          sub="Estimated impact"
          icon={BarChart3}
        />

        <Stat
          label="Recoverable"
          value="₹2.14L"
          sub="Current opportunity"
          icon={CheckCircle2}
        />
      </div>

      <div className="panel">
        <div className="panelHeader">
          <div>
            <h3>Detected Revenue Leaks</h3>
            <p>
              Investigate individual issues to understand their cause.
            </p>
          </div>
        </div>

        <LeakTable />

        <button
          className="primaryButton investigationButton"
          onClick={() => navigate("Investigation")}
        >
          Open Investigation
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}

function Investigation() {
  const [selectedLeak, setSelectedLeak] = useState(null);
  const [result, setResult] = useState("");
  const [investigating, setInvestigating] = useState(false);

  async function runInvestigation(leak) {
    setSelectedLeak(leak);
    setInvestigating(true);
    setResult("");

    try {
      const prompt = `
You are LeakLeans AI Revenue Investigation Engine.

Investigate this potential revenue leak:

Issue: ${leak.issue}
Source: ${leak.source}
Severity: ${leak.severity}
Potential Loss: ${leak.amount}
Owner: ${leak.owner}

Give a concise investigation with these sections:

Cause
Evidence to check
Business Impact
Recovery Action
Prevention

Use short bullets.
Do not invent actual data.
Clearly say when real business data is required.
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
        throw new Error(
          data?.error || "Investigation failed"
        );
      }

      setResult(data.text || "No investigation result.");
    } catch (error) {
      setResult(
        error?.message ||
          "Unable to investigate this leak right now."
      );
    } finally {
      setInvestigating(false);
    }
  }

  return (
    <>
      <PageIntro
        title="Investigation"
        description="Understand why revenue leakage may be happening."
      />

      <div className="investigationGrid">
        <div className="panel">
          <div className="panelHeader">
            <div>
              <h3>Select a Revenue Leak</h3>
              <p>
                Start an AI-powered investigation.
              </p>
            </div>
          </div>

          <div className="leakCards">
            {demoLeaks.map((leak, index) => (
              <button
                key={index}
                className={`leakCard ${
                  selectedLeak?.issue === leak.issue
                    ? "selected"
                    : ""
                }`}
                onClick={() => runInvestigation(leak)}
              >
                <div>
                  <strong>{leak.issue}</strong>
                  <span>{leak.source}</span>
                </div>

                <ArrowRight size={17} />
              </button>
            ))}
          </div>
        </div>

        <div className="panel investigationResult">
          <div className="panelHeader">
            <div>
              <h3>AI Investigation</h3>
              <p>
                {selectedLeak
                  ? selectedLeak.issue
                  : "Choose an issue to investigate"}
              </p>
            </div>

            {investigating && (
              <RefreshCw
                size={18}
                className="spin"
              />
            )}
          </div>

          {investigating ? (
            <div className="loadingState">
              <Bot size={22} />
              <span>
                LeakLeans is investigating...
              </span>
            </div>
          ) : result ? (
            <div className="aiFormatted investigationText">
              {formatAIText(result)}
            </div>
          ) : (
            <div className="emptyState">
              Select a revenue leak to start.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Integrations() {
  return (
    <>
      <PageIntro
        title="Integrations"
        description="Connect the systems where your revenue activity happens."
      />

      <div className="integrationGrid">
        {systems.map((system) => (
          <div className="integrationCard" key={system}>
            <div className="integrationIcon">
              <Plug size={19} />
            </div>

            <div>
              <strong>{system}</strong>
              <span>Ready to connect</span>
            </div>

            <button>Connect</button>
          </div>
        ))}
      </div>
    </>
  );
}

function Analytics() {
  return (
    <>
      <PageIntro
        title="Analytics"
        description="Understand your revenue leakage patterns."
      />

      <div className="statsGrid">
        <Stat
          label="Leakage Trend"
          value="-12%"
          sub="Compared with previous period"
          icon={BarChart3}
        />

        <Stat
          label="Recovery Rate"
          value="48%"
          sub="Estimated recovery"
          icon={CheckCircle2}
        />

        <Stat
          label="Average Leak"
          value="₹24.9K"
          sub="Per detected issue"
          icon={AlertTriangle}
        />

        <Stat
          label="Response Time"
          value="2.4h"
          sub="Average action time"
          icon={Zap}
        />
      </div>

      <div className="panel chartPanel">
        <h3>Revenue Leakage Overview</h3>

        <div className="fakeChart">
          <div style={{ height: "38%" }} />
          <div style={{ height: "55%" }} />
          <div style={{ height: "44%" }} />
          <div style={{ height: "72%" }} />
          <div style={{ height: "62%" }} />
          <div style={{ height: "82%" }} />
          <div style={{ height: "68%" }} />
        </div>
      </div>
    </>
  );
}

function Actions() {
  return (
    <>
      <PageIntro
        title="Actions"
        description="Turn detected revenue leaks into recovery actions."
      />

      <div className="actionGrid">
        {[
          "Create follow-up task",
          "Assign revenue leak",
          "Send customer callback request",
          "Notify sales manager",
          "Create recovery workflow",
          "Review stalled opportunity",
        ].map((item) => (
          <div className="actionCard" key={item}>
            <div className="actionIcon">
              <Zap size={18} />
            </div>

            <div>
              <strong>{item}</strong>
              <span>
                Available as an operational action.
              </span>
            </div>

            <ArrowRight size={17} />
          </div>
        ))}
      </div>
    </>
  );
}

function AgentSystem() {
  return (
    <>
      <PageIntro
        title="Agent System"
        description="Your AI revenue intelligence layer."
      />

      <div className="agentPanel">
        <div className="agentOrb">
          <Bot size={30} />
        </div>

        <div>
          <h2>LeakLeans AI Agent</h2>

          <p>
            The agent can analyze connected business
            data, identify revenue leakage patterns and
            recommend practical recovery actions.
          </p>

          <div className="agentFeatures">
            <span>
              <CheckCircle2 size={14} />
              Revenue monitoring
            </span>

            <span>
              <CheckCircle2 size={14} />
              Leak detection
            </span>

            <span>
              <CheckCircle2 size={14} />
              Investigation
            </span>

            <span>
              <CheckCircle2 size={14} />
              Recovery suggestions
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Team() {
  return (
    <>
      <PageIntro
        title="Team"
        description="Manage people responsible for revenue recovery."
      />

      <div className="teamCard">
        <div className="teamAvatar">AM</div>

        <div>
          <strong>{FOUNDER}</strong>
          <span>Founder — LeakLeans</span>
        </div>

        <span className="teamRole">
          Owner
        </span>
      </div>
    </>
  );
}

function Billing() {
  return (
    <>
      <PageIntro
        title="Billing & Payments"
        description="Manage your LeakLeans subscription."
      />

      <div className="billingCard">
        <span className="billingLabel">
          Current Plan
        </span>

        <h2>Starter</h2>

        <p>
          Upgrade when your connected systems and
          revenue operations grow.
        </p>

        <button className="primaryButton">
          Manage Plan
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}

function Notifications() {
  return (
    <>
      <PageIntro
        title="Notifications"
        description="Stay informed when important revenue events occur."
      />

      <div className="notificationList">
        {[
          "High-value revenue leak detected",
          "New investigation available",
          "Integration requires attention",
          "Recovery opportunity identified",
        ].map((item) => (
          <div className="notificationItem" key={item}>
            <div className="notificationIcon">
              <Bell size={17} />
            </div>

            <div>
              <strong>{item}</strong>
              <span>
                LeakLeans notification
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Settings() {
  return (
    <>
      <PageIntro
        title="Settings"
        description="Configure your LeakLeans workspace."
      />

      <div className="settingsList">
        <div className="settingItem">
          <div>
            <strong>AI Revenue Assistant</strong>
            <span>
              Enable AI-powered revenue analysis.
            </span>
          </div>

          <div className="toggle active">
            <span />
          </div>
        </div>

        <div className="settingItem">
          <div>
            <strong>Revenue Leak Alerts</strong>
            <span>
              Receive alerts for important leakage events.
            </span>
          </div>

          <div className="toggle active">
            <span />
          </div>
        </div>

        <div className="settingItem">
          <div>
            <strong>Workspace Security</strong>
            <span>
              Secure business workspace configuration.
            </span>
          </div>

          <div className="toggle active">
            <span />
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [chat, setChat] = useState([
    {
      role: "ai",
      welcome: true,
      text: `Hi Team,

I'm your LeakLeans AI Revenue Assistant.

I'm here to help you find where your revenue is leaking.

Connect your business systems such as WhatsApp, Salesforce, HubSpot, Gmail, Genesys or your CRM.

Once connected, I can help identify:
- Missed leads
- Follow-up gaps
- Missed calls
- Quote-to-order drops
- Customer journey problems
- Revenue recovery opportunities

Ask me anything about your revenue operations or start by connecting your systems.`,
    },
  ]);

  function navigate(page) {
    setActivePage(page);
    setSidebarOpen(false);
  }

  async function askAssistant(customText) {
    const text = (
      customText !== undefined
        ? customText
        : message
    ).trim();

    if (!text || aiLoading) return;

    setMessage("");

    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setAiLoading(true);

    try {
      const prompt = `
You are LeakLeans AI Revenue Assistant.

You are not a generic chatbot.

You are the intelligent revenue assistant inside LeakLeans, an AI Revenue Leak Detection SaaS platform.

Your purpose is to help businesses find, understand and recover lost revenue.

You can explain how LeakLeans can work with business systems such as:
- WhatsApp Business
- Salesforce
- HubSpot
- Gmail
- Genesys
- Avaya
- Zendesk
- CRM systems
- Sales systems
- Customer support systems
- Lead and communication systems

IMPORTANT:
Do not claim that a system is actually connected unless the user has explicitly provided that information.

Explain capabilities clearly.

Your communication style:
- Professional
- Modern SaaS product style
- Short and easy to scan
- Helpful and confident
- No unnecessary long paragraphs
- Avoid excessive commas
- Avoid excessive full stops
- Prefer short sections
- Use headings when useful
- Use bullet points for lists
- Use numbered steps when explaining a process
- Highlight important words using **bold**
- Do not use unnecessary emojis
- Do not repeat the same sentence
- Give practical next steps

When discussing integrations, explain what value the connection can provide.

WhatsApp → identify missed customer conversations and follow-up gaps.
Salesforce → identify stalled leads, opportunities and follow-up failures.
Gmail → identify important customer communication gaps.
Call systems → identify missed inbound calls and callback failures.
CRM → identify customer journey and conversion problems.

Never invent actual business data.

If the user asks about their actual revenue leakage, explain that real data or connected systems are required for a real investigation.

User question:
${text}
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
        throw new Error(
          data?.error || "AI request failed"
        );
      }

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data?.text ||
            "I couldn't generate a response right now.",
        },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            error?.message ||
            "AI is temporarily unavailable. Please try again.",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  }

  function useSuggestion(text) {
    setMessage(text);
  }

  function renderPage() {
    switch (activePage) {
      case "Overview":
        return <Overview navigate={navigate} />;

      case "Revenue Leaks":
        return <Leaks navigate={navigate} />;

      case "Investigation":
        return <Investigation />;

      case "Integrations":
        return <Integrations />;

      case "Analytics":
        return <Analytics />;

      case "Actions":
        return <Actions />;

      case "Agent System":
        return <AgentSystem />;

      case "Team":
        return <Team />;

      case "Billing & Payments":
        return <Billing />;

      case "Notifications":
        return <Notifications />;

      case "Settings":
        return <Settings />;

      default:
        return <Overview navigate={navigate} />;
    }
  }

  return (
    <div className="app">
      {sidebarOpen && (
        <div
          className="mobileOverlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebarBrand">
          <div className="brandMark">LL</div>

          <div>
            <strong>LeakLeans</strong>
            <span>Revenue Intelligence</span>
          </div>

          <button
            className="sidebarClose"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={
                  activePage === item.name
                    ? "navItem active"
                    : "navItem"
                }
                onClick={() => navigate(item.name)}
              >
                <Icon size={17} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebarFooter">
          <span>Founder</span>
          <strong>{FOUNDER}</strong>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="mobileMenu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={21} />
          </button>

          <div className="topbarTitle">
            <strong>{activePage}</strong>
            <span>LeakLeans Workspace</span>
          </div>

          <div className="topbarRight">
            <div className="liveStatus">
              <span />
              System Online
            </div>

            <div className="topAvatar">
              AM
            </div>
          </div>
        </header>

        <div className="content">
          {renderPage()}

          <section className="assistantSection">
            <div className="assistant">
              <div className="assistantHeader">
                <div className="assistantIdentity">
                  <div className="assistantAvatar">
                    <Bot size={19} />
                    <span className="onlineDot" />
                  </div>

                  <div>
                    <strong>
                      LeakLeans AI Revenue Assistant
                    </strong>

                    <span className="assistantStatus">
                      <span className="statusDot" />

                      {aiLoading
                        ? "Analyzing your request"
                        : "AI Revenue Intelligence Online"}
                    </span>
                  </div>
                </div>

                <div className="assistantBadge">
                  <Sparkles size={12} />
                  AI Assistant
                </div>
              </div>

              <div className="assistantIntro">
                <div className="founderWelcome">
                  <div className="founderWelcomeAvatar">
                    AM
                  </div>

                  <div className="founderWelcomeDetails">
                    <strong>ANIKET MOHITE</strong>

                    <span>
                      Founder — LeakLeans
                    </span>

                    <small>
                      AI Revenue Leak Detection Platform
                    </small>
                  </div>
                </div>

                <div className="welcomeDivider" />

                <div className="welcomeMessageContent">
                  <div className="introIcon">
                    <Bot size={22} />
                  </div>

                  <div>
                    <strong>
                      Hi Team — your Revenue Assistant is ready
                    </strong>

                    <span>
                      I’m here to help you find where your
                      revenue is leaking, understand the cause
                      and identify opportunities to recover it.
                    </span>
                  </div>
                </div>
              </div>

              <div className="quickConnections">
                <span className="quickLabel">
                  Connect your systems
                </span>

                <div className="connectionPills">
                  <button
                    onClick={() =>
                      navigate("Integrations")
                    }
                  >
                    <MessageCircle size={14} />
                    WhatsApp
                  </button>

                  <button
                    onClick={() =>
                      navigate("Integrations")
                    }
                  >
                    <Database size={14} />
                    Salesforce
                  </button>

                  <button
                    onClick={() =>
                      navigate("Integrations")
                    }
                  >
                    <Database size={14} />
                    HubSpot
                  </button>

                  <button
                    onClick={() =>
                      navigate("Integrations")
                    }
                  >
                    <Mail size={14} />
                    Gmail
                  </button>

                  <button
                    onClick={() =>
                      navigate("Integrations")
                    }
                  >
                    <PhoneCall size={14} />
                    Call Systems
                  </button>
                </div>
              </div>

              <div className="chatArea">
                {chat.map((item, index) => {
                  const isLast =
                    index === chat.length - 1;

                  return (
                    <div
                      key={index}
                      className={`chatMessage ${item.role} ${
                        item.welcome
                          ? "welcomeMessage"
                          : ""
                      }`}
                    >
                      {item.role === "ai" ? (
                        isLast && !aiLoading ? (
                          <TypingMessage
                            text={item.text}
                          />
                        ) : (
                          <div className="aiFormatted">
                            {formatAIText(item.text)}
                          </div>
                        )
                      ) : (
                        item.text
                      )}
                    </div>
                  );
                })}

                {aiLoading && (
                  <div className="chatMessage ai typingMessage">
                    <div className="typingHeader">
                      <Bot size={14} />
                      <span>
                        LeakLeans is thinking
                      </span>
                    </div>

                    <div className="typingDots">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
              </div>

              <div className="suggestions">
                <button
                  onClick={() =>
                    useSuggestion(
                      "How can LeakLeans find revenue leaks?"
                    )
                  }
                >
                  Find my revenue leaks
                </button>

                <button
                  onClick={() =>
                    useSuggestion(
                      "How can I connect WhatsApp and Salesforce?"
                    )
                  }
                >
                  How do integrations work?
                </button>

                <button
                  onClick={() =>
                    useSuggestion(
                      "What revenue problems can LeakLeans detect?"
                    )
                  }
                >
                  What can you detect?
                </button>
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
                  placeholder="Ask your Revenue Assistant..."
                  disabled={aiLoading}
                />

                <button
                  onClick={() => askAssistant()}
                  disabled={
                    aiLoading ||
                    !message.trim()
                  }
                >
                  <Send size={17} />
                </button>
              </div>
            </div>
          </section>

          <footer className="footer">
            <span>
              © 2026 LeakLeans
            </span>

            <span>
              {FOUNDER} · AI Revenue Intelligence
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;