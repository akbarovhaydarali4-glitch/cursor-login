import React, { useMemo, useState } from "react";

const BASE_URL = "http://127.0.0.1:5000";
const SEND_ENDPOINTS = {
  phone: "/auth/send-otp",
  email: "/auth/send-email-otp",
};
const VERIFY_ENDPOINTS = {
  phone: "/auth/verify-otp",
  email: "/auth/verify-email-otp",
};

const ROLES = [
  { key: "jobseeker", label: "Ish izlovchi sifatida kirish" },
  { key: "employer", label: "Ish beruvchi sifatida kirish" },
];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.08.36 2.24.56 3.44.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.42 21 3 13.58 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.36.56 3.44a1 1 0 0 1-.24 1L6.6 10.8z"
        fill="#6b7280"
      />
    </svg>
  );
}

function EmailGradientIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <defs>
        <linearGradient id="mail-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5c6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="3.5" y="5.5" width="17" height="13" rx="3" fill="none" stroke="url(#mail-grad)" strokeWidth="1.8" />
      <path d="M5 7l7 5 7-5" fill="none" stroke="url(#mail-grad)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1zm2 0h6V8a3 3 0 0 0-6 0v2z"
        fill="#8b95a7"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.94 9h-3.1a15.8 15.8 0 00-1.34-5A8.04 8.04 0 0119.94 11zM12 4.06c.93 1.1 1.77 3.03 2.17 5.94H9.83c.4-2.91 1.24-4.84 2.17-5.94zM8.5 6a15.8 15.8 0 00-1.34 5h-3.1A8.04 8.04 0 018.5 6zM4.06 13h3.1a15.8 15.8 0 001.34 5A8.04 8.04 0 014.06 13zM12 19.94c-.93-1.1-1.77-3.03-2.17-5.94h4.34c-.4 2.91-1.24 4.84-2.17 5.94zM15.5 18a15.8 15.8 0 001.34-5h3.1A8.04 8.04 0 0115.5 18z"
        fill="#586174"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-1.4 3.6-5.5 3.6-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.2 14.6 2.3 12 2.3A9.7 9.7 0 1 0 12 21.7c5.6 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6z" />
    </svg>
  );
}

function FaceIdIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M7 4h2v2H7v2H5V6a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v2h-2V6h-2V4h2zM5 16h2v2h2v2H7a2 2 0 0 1-2-2v-2zm14 0v2a2 2 0 0 1-2 2h-2v-2h2v-2h2zM8 11a1.5 1.5 0 1 0 0 .01zm8 0a1.5 1.5 0 1 0 0 .01zM8 16c1.1-1.3 2.4-2 4-2s2.9.7 4 2" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OneIdIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="#6b7280" strokeWidth="1.6" />
      <path d="M9 12h6M12 9v6" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M21.5 4.6L18.3 20a1 1 0 0 1-1.5.7l-4.4-3.2-2.2 2.1a1 1 0 0 1-1.7-.6l-.3-4.1L4.8 13a1 1 0 0 1 .1-1.8L20 4a1 1 0 0 1 1.5.6zM9.6 14.2l.1 2.2 1.2-1.2 5.2-6.7-6.5 5.7z"
        fill="#5ab6ff"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M5 5h3.3l3.8 5 4.2-5H19l-5.6 6.6L19.4 19h-3.3l-4.2-5.4L7.3 19H5l5.7-6.8z" fill="#c8d6ee" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="none" stroke="#c8d6ee" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.3" fill="none" stroke="#c8d6ee" strokeWidth="1.6" />
      <circle cx="16.5" cy="7.8" r="1" fill="#c8d6ee" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M13.3 20v-6h2.2l.4-2.5h-2.6V9.9c0-.8.3-1.3 1.4-1.3H16V6.3c-.2 0-1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v1.9H8.4V14h2.2v6z" fill="#c8d6ee" />
    </svg>
  );
}

function LandingDocIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M8 3h6l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm5 1.8V8h3.2"
        fill="none"
        stroke="#0d7f98"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 12.3h5M9.5 15.3h5" stroke="#0d7f98" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LandingUserSearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="10" cy="9" r="3.1" fill="none" stroke="#0d7f98" strokeWidth="1.8" />
      <path d="M4.8 18c1-2.4 3-3.8 5.2-3.8 1.9 0 3.8 1.1 4.9 3" fill="none" stroke="#0d7f98" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17.6" cy="16.8" r="2.2" fill="none" stroke="#0d7f98" strokeWidth="1.8" />
      <path d="M19.2 18.4l1.9 1.8" stroke="#0d7f98" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [role, setRole] = useState("jobseeker");
  const [method, setMethod] = useState("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form");
  const [codeChannel, setCodeChannel] = useState("sms");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("error");
  const [loading, setLoading] = useState(false);

  const formattedPhone = useMemo(() => {
    const clean = phone.replace(/\D/g, "").slice(0, 9);
    const parts = [clean.slice(0, 2), clean.slice(2, 5), clean.slice(5, 7), clean.slice(7, 9)];
    return parts.filter(Boolean).join(" ");
  }, [phone]);

  const activeTarget = method === "phone" ? formattedPhone.replace(/\s/g, "") : email.trim();

  const sendOtp = async () => {
    if (method === "phone" && activeTarget.length < 9) {
      setMsg("Telefon raqamni to'g'ri kiriting");
      setMsgType("error");
      return;
    }
    if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(activeTarget)) {
      setMsg("Email manzilni to'g'ri kiriting");
      setMsgType("error");
      return;
    }

    setMsg("");
    setMsgType("error");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}${SEND_ENDPOINTS[method]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          method,
          channel: method === "phone" ? codeChannel : undefined,
          phone: method === "phone" ? activeTarget : undefined,
          email: method === "email" ? activeTarget : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Kod yuborildi. Tasdiqlash kodini kiriting.");
        setMsgType("success");
        setStep("otp");
      } else {
        setMsg(data.message || "Kod yuborishda xatolik");
        setMsgType("error");
      }
    } catch {
      setMsg("Backend bilan aloqa yo'q");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length < 4) {
      setMsg("Kod yetarli emas");
      setMsgType("error");
      return;
    }
    setMsg("");
    setMsgType("error");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}${VERIFY_ENDPOINTS[method]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          method,
          code: otp,
          phone: method === "phone" ? activeTarget : undefined,
          email: method === "email" ? activeTarget : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("success");
      } else {
        setMsg(data.message || "Kod noto'g'ri");
        setMsgType("error");
      }
    } catch {
      setMsg("Tasdiqlashda server xatosi");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  const onPhoneChange = (value) => setPhone(value.replace(/\D/g, ""));

  const resetFlow = () => {
    setStep("form");
    setOtp("");
    setMsg("");
    setMsgType("error");
  };

  const goLanding = () => {
    setScreen("landing");
    resetFlow();
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>O</div>
          <div>
            <div style={styles.logoTitle}>OSON ISH</div>
            <div style={styles.logoSub}>BIZ BILAN BARCHASI OSON</div>
          </div>
        </div>
        <nav style={styles.nav}>
          <span>Bo'sh ish o'rinlari</span>
          <span>Rezyumelar</span>
          <span>Tashkilotlar</span>
        </nav>
        <div style={styles.headerRight}>
          <span style={styles.lang}>
            <GlobeIcon /> O'zb
          </span>
          <button style={styles.loginBtn}>Kirish</button>
        </div>
      </header>

      <main style={styles.content}>
        {screen === "landing" ? (
          <div style={styles.landingCard}>
            <h2 style={styles.landingTitle}>Foydalanuvchi rolini tanlang</h2>
            <div style={styles.landingRoleList}>
              {ROLES.map((item) => (
                <button
                  key={item.key}
                  style={styles.landingRoleBtn}
                  onClick={() => {
                    setRole(item.key);
                    setScreen("auth");
                    resetFlow();
                  }}
                >
                  <span style={styles.landingRoleBtnLeft}>
                    <span style={styles.iconBox}>
                      {item.key === "jobseeker" ? <LandingDocIcon /> : <LandingUserSearchIcon />}
                    </span>
                    {item.label}
                  </span>
                  <span style={styles.chevron}>&gt;</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.wrapper}>
            <section style={styles.rolePanel}>
              <h2 style={styles.rolePanelTitle}>Foydalanuvchi rolini tanlang</h2>
              {ROLES.map((item) => (
                <button
                  key={item.key}
                  style={{ ...styles.roleBtn, ...(role === item.key ? styles.roleBtnActive : {}) }}
                  onClick={() => {
                    setRole(item.key);
                    resetFlow();
                  }}
                >
                  <span style={styles.roleBtnLeft}>
                    <span style={styles.iconBox}>
                      {item.key === "jobseeker" ? <LandingDocIcon /> : <LandingUserSearchIcon />}
                    </span>
                    {item.label}
                  </span>
                  <span style={styles.chevron}>&gt;</span>
                </button>
              ))}
            </section>

            <section style={styles.formPanel}>
              <div style={styles.formTitleRow}>
                <button style={styles.backChip} onClick={goLanding}>
                  &lt;
                </button>
                <h2 style={styles.title}>Ro'yxatdan o'tish</h2>
              </div>

              {step === "form" && (
                <>
                  <div style={styles.tabRow}>
                    <button
                      style={{ ...styles.tabBtn, ...(method === "phone" ? styles.tabActive : {}) }}
                      onClick={() => {
                        setMethod("phone");
                        setMsg("");
                      }}
                    >
                      Telefon raqami
                    </button>
                    <button
                      style={{ ...styles.tabBtn, ...(method === "email" ? styles.tabActive : {}) }}
                      onClick={() => {
                        setMethod("email");
                        setMsg("");
                      }}
                    >
                      <EmailGradientIcon /> Elektron pochta
                    </button>
                  </div>

                  {method === "phone" ? (
                    <>
                      <label style={styles.label}>Telefon raqami</label>
                      <div style={styles.inputWrap}>
                        <span style={styles.prefix}>uz +998</span>
                        <input
                          type="tel"
                          value={formattedPhone}
                          onChange={(e) => onPhoneChange(e.target.value)}
                          placeholder="__ ___ __ __"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.channelWrap}>
                        <span style={styles.channelLabel}>Kodni olish usuli</span>
                        <label style={styles.radioItem}>
                          <button
                            type="button"
                            onClick={() => setCodeChannel("sms")}
                            style={{ ...styles.radioDot, ...(codeChannel === "sms" ? styles.radioDotActive : {}) }}
                          />
                          SMS-kod
                        </label>
                        <label style={styles.radioItem}>
                          <button
                            type="button"
                            onClick={() => setCodeChannel("telegram")}
                            style={{ ...styles.radioDot, ...(codeChannel === "telegram" ? styles.radioDotActive : {}) }}
                          />
                          Telegram-kod
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <label style={styles.label}>Elektron pochta</label>
                      <div style={styles.inputWrap}>
                        <span style={styles.prefix}>
                          <EmailGradientIcon />
                        </span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@email.com"
                          style={styles.input}
                        />
                      </div>
                    </>
                  )}

                  {msg && (
                    <p style={{ ...styles.feedback, ...(msgType === "success" ? styles.feedbackSuccess : styles.feedbackError) }}>
                      {msg}
                    </p>
                  )}

                  <button style={styles.primaryBtn} onClick={sendOtp} disabled={loading}>
                    {loading ? "Yuborilmoqda..." : "Kodni yuborish"}
                  </button>

                  <div style={styles.orText}>yoki</div>
                  <button style={styles.socialBtn}>
                    <span style={styles.socialBtnIcon}>
                      <GoogleIcon />
                    </span>{" "}
                    Google
                  </button>
                  {role !== "employer" && (
                    <>
                      <button style={styles.socialBtn}>
                        <span style={styles.socialBtnIcon}>
                          <FaceIdIcon />
                        </span>{" "}
                        Face ID
                      </button>
                      <button style={styles.socialBtn}>
                        <span style={styles.socialBtnIcon}>
                          <OneIdIcon />
                        </span>{" "}
                        OneID
                      </button>
                    </>
                  )}

                  {role === "employer" && (
                    <>
                      <div style={styles.orText}>yoki e-imzo orqali</div>
                      <div style={styles.infoBox}>
                        Yuqoridagi usullar orqali kirsangiz, tizimning tasdiqlanmagan bo'limlari ochiladi. To'liq funksiyalar uchun e-imzo orqali
                        tasdiqlang.
                      </div>
                      <button style={styles.identityBtn}>
                        <span style={styles.socialBtnIcon}>
                          <OneIdIcon />
                        </span>
                        OneID orqali kirish
                      </button>
                      <button style={styles.identityBtn}>
                        <span style={styles.socialBtnIcon}>
                          <LockIcon />
                        </span>
                        ERI orqali kirish
                      </button>
                      <button style={styles.identityBtn}>
                        <span style={styles.socialBtnIcon}>
                          <FaceIdIcon />
                        </span>
                        Face ID orqali kirish
                      </button>
                    </>
                  )}
                </>
              )}

              {step === "otp" && (
                <>
                  <p style={styles.hint}>{method === "phone" ? `+998 ${formattedPhone} ga kod yuborildi` : `${email} manzilga kod yuborildi`}</p>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="------"
                    maxLength={6}
                    style={{ ...styles.otpInput }}
                  />
                  {msg && (
                    <p style={{ ...styles.feedback, ...(msgType === "success" ? styles.feedbackSuccess : styles.feedbackError) }}>
                      {msg}
                    </p>
                  )}
                  <button style={styles.primaryBtn} onClick={verifyOtp} disabled={loading}>
                    {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
                  </button>
                  <button style={styles.linkBtn} onClick={resetFlow}>
                    Orqaga qaytish
                  </button>
                </>
              )}

              {step === "success" && (
                <div style={styles.successBox}>
                  <h3 style={{ color: "#0a8f3c", marginBottom: 8 }}>Muvaffaqiyatli kirdingiz!</h3>
                  <p style={{ margin: 0 }}>Rol: {role === "jobseeker" ? "Ish izlovchi" : "Ish beruvchi"}</p>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerCol}>
          <div style={styles.logoWrap}>
            <div style={styles.logoIcon}>O</div>
            <div>
              <div style={{ ...styles.logoTitle, color: "#fff" }}>OSON ISH</div>
              <div style={{ ...styles.logoSub, color: "#95a9cc" }}>BIZ BILAN BARCHASI OSON</div>
            </div>
          </div>
        </div>
        <div style={styles.footerCol}>
          <p style={styles.footerTitle}>Biz bilan bog'laning:</p>
          <p style={styles.footerItem}>+998 (71) 200-01-40</p>
          <p style={styles.footerItem}>+998 (71) 203-01-40</p>
          <p style={styles.footerItem}>+998 (71) 204-01-40</p>
          <p style={styles.footerItem}>info@mehnat.uz</p>
        </div>
        <div style={styles.footerCol}>
          <p style={styles.footerTitle}>Ijtimoiy tarmoqlarda kuzating:</p>
          <div style={styles.socialRow}>
            <span style={styles.circle}>
              <TelegramIcon />
            </span>
            <span style={styles.circle}>
              <XIcon />
            </span>
            <span style={styles.circle}>
              <InstagramIcon />
            </span>
            <span style={styles.circle}>
              <FacebookIcon />
            </span>
          </div>
          <button style={styles.footerBtn}>Moderator sifatida kirish</button>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "grid", gridTemplateRows: "70px 1fr 180px", background: "#f3f6fb", fontFamily: "Inter, Arial, sans-serif" },
  header: {
    height: 70,
    background: "#fff",
    borderBottom: "1px solid #e4e9f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  logoWrap: { display: "flex", gap: 10, alignItems: "center" },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    background: "#08a4bf",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
    fontSize: 15,
  },
  logoTitle: { fontWeight: 800, fontSize: 15, color: "#12315e", lineHeight: 1.1 },
  logoSub: { fontSize: 10, color: "#7f8ba1" },
  nav: { display: "flex", gap: 34, color: "#1f2937", fontSize: 14 },
  headerRight: { display: "flex", alignItems: "center", gap: 12 },
  lang: { display: "inline-flex", alignItems: "center", gap: 4, color: "#364052", fontSize: 14 },
  loginBtn: { background: "#08a4bf", border: "none", color: "#fff", fontWeight: 700, borderRadius: 7, height: 36, padding: "0 20px" },
  content: { display: "grid", placeItems: "center", padding: "6px 20px 28px" },
  landingCard: {
    width: "100%",
    maxWidth: 650,
    minHeight: 265,
    background: "#f7f8fa",
    border: "1px solid #e2e6ec",
    borderRadius: 14,
    padding: "22px 18px",
    boxShadow: "none",
  },
  landingTitle: {
    margin: "0 0 28px",
    textAlign: "left",
    fontSize: "clamp(24px, 4.8vw, 44px)",
    fontWeight: 800,
    color: "#0a2e52",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  },
  landingRoleList: { display: "grid", gap: 16 },
  landingRoleBtn: {
    width: "100%",
    border: "1px solid #d4dce8",
    background: "#fbfdff",
    color: "#0f1c2d",
    borderRadius: 10,
    padding: "13px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    lineHeight: 1.25,
  },
  landingRoleBtnLeft: { display: "flex", alignItems: "center", gap: 12, fontSize: 16, fontWeight: 600, lineHeight: 1.3 },
  wrapper: {
    width: "100%",
    maxWidth: 1240,
    background: "#f6f7f9",
    border: "1px solid #e3e7ee",
    borderRadius: 16,
    display: "grid",
    gridTemplateColumns: "0.74fr 1.26fr",
    overflow: "hidden",
    minHeight: 560,
    boxShadow: "0 2px 10px rgba(17, 24, 39, 0.04)",
  },
  rolePanel: { padding: "30px 24px", borderRight: "1px solid #d9dee7" },
  formPanel: { padding: "24px 24px 22px" },
  formTitleRow: { display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10, marginBottom: 14, minHeight: 34 },
  backChip: { width: 28, height: 28, borderRadius: 7, border: "1px solid #d9dee7", background: "#f8fafc", color: "#7a879d" },
  title: { margin: 0, fontSize: "clamp(24px, 4.8vw, 40px)", fontWeight: 800, color: "#10243b", letterSpacing: "-0.02em", lineHeight: 1.1, whiteSpace: "nowrap" },
  rolePanelTitle: {
    margin: "0 0 18px",
    fontSize: "clamp(28px, 3vw, 44px)",
    fontWeight: 800,
    color: "#10243b",
    letterSpacing: "-0.01em",
    lineHeight: 1.12,
    whiteSpace: "nowrap",
  },
  roleBtn: {
    width: "100%",
    marginBottom: 10,
    border: "1px solid #d4dbe6",
    background: "#fff",
    color: "#0f2a45",
    borderRadius: 11,
    padding: "13px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  roleBtnActive: { border: "1px solid #c7e7ef", background: "#d6edf3", boxShadow: "none" },
  roleBtnLeft: { display: "flex", alignItems: "center", gap: 11, fontSize: 17, fontWeight: 600, lineHeight: 1.24 },
  iconBox: {
    width: 24,
    height: 24,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    background: "linear-gradient(145deg, #f0fbff 0%, #e8f6ff 100%)",
    border: "1px solid #d5eaf6",
    flexShrink: 0,
  },
  chevron: { color: "#94a3b8", fontSize: 16, fontWeight: 700 },
  tabRow: { display: "grid", gridTemplateColumns: "1fr 1fr", background: "#eceff4", borderRadius: 11, padding: 4, gap: 4, marginBottom: 16 },
  tabBtn: {
    border: "none",
    background: "transparent",
    borderRadius: 8,
    height: 44,
    cursor: "pointer",
    color: "#4b5563",
    fontWeight: 500,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  tabActive: { background: "#fff", color: "#1093b0", boxShadow: "0 0 0 1px #d7dde8" },
  label: { display: "block", margin: "6px 0 8px", color: "#334155", fontSize: 15 },
  inputWrap: {
    border: "1px solid #cfd8e3",
    borderRadius: 11,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 12,
    background: "#fff",
  },
  prefix: {
    minWidth: 104,
    padding: "0 12px",
    height: 46,
    borderRight: "1px solid #e2e8f0",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#334155",
    fontSize: 15,
    gap: 6,
  },
  input: { width: "100%", border: "none", outline: "none", padding: "0 12px", height: 48, fontSize: 16, background: "transparent" },
  primaryBtn: {
    width: "100%",
    height: 46,
    border: "none",
    borderRadius: 10,
    background: "#0f9fbe",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 8,
  },
  feedback: { margin: "8px 0 0", fontSize: 13, lineHeight: 1.4, borderRadius: 8, padding: "7px 10px" },
  feedbackError: { color: "#b42318", background: "#fef3f2", border: "1px solid #fecdc8" },
  feedbackSuccess: { color: "#047857", background: "#ecfdf3", border: "1px solid #bbf7d0" },
  hint: { marginTop: 0, color: "#334155", marginBottom: 12, fontSize: 14 },
  otpInput: { width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, height: 48, fontSize: 24, textAlign: "center", letterSpacing: 6, marginBottom: 8 },
  orText: { textAlign: "center", color: "#8090a8", margin: "10px 0 12px", fontSize: 13 },
  socialBtn: {
    width: "100%",
    height: 44,
    border: "1px solid #d8e0ea",
    borderRadius: 10,
    background: "#fff",
    color: "#2d3c53",
    fontSize: 15,
    marginBottom: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "0 12px",
    lineHeight: 1.2,
  },
  identityBtn: {
    width: "100%",
    height: 42,
    border: "1px solid #d8e0ea",
    borderRadius: 10,
    background: "#fff",
    color: "#2d3c53",
    fontSize: 13,
    marginBottom: 8,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "0 12px",
    lineHeight: 1.2,
  },
  infoBox: { background: "#fff8e6", border: "1px solid #f1d99d", borderRadius: 8, color: "#7a6230", fontSize: 12, lineHeight: 1.4, padding: "9px 10px", marginBottom: 10 },
  socialBtnIcon: { width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  channelWrap: { marginTop: -2, marginBottom: 10, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" },
  channelLabel: { color: "#4b5563", fontSize: 13, marginRight: 2 },
  radioItem: { display: "inline-flex", alignItems: "center", gap: 7, color: "#4b5563", fontSize: 13, cursor: "pointer" },
  radioDot: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "1.8px solid #9aa7ba",
    display: "inline-block",
    position: "relative",
    background: "#fff",
    padding: 0,
    cursor: "pointer",
  },
  radioDotActive: { borderColor: "#0f9fbe", background: "radial-gradient(circle at center, #0f9fbe 0 4px, transparent 4px 100%)" },
  linkBtn: { border: "none", background: "transparent", color: "#0e7490", marginTop: 10, cursor: "pointer", fontWeight: 600 },
  successBox: { borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0", padding: 14 },
  footer: {
    background: "#173a68",
    color: "#fff",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "24px 34px 16px",
    alignItems: "start",
    gap: 24,
    borderTop: "1px solid #244b80",
  },
  footerCol: { minHeight: 100 },
  footerTitle: { margin: "0 0 12px", fontWeight: 700, fontSize: 15 },
  footerItem: { margin: "0 0 8px", color: "#d1dbeb", fontSize: 14 },
  socialRow: { display: "flex", gap: 10, marginBottom: 12 },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 999,
    border: "1px solid #4f6f9a",
    display: "grid",
    placeItems: "center",
    color: "#d6e2f3",
    fontSize: 13,
    background: "rgba(255,255,255,0.03)",
  },
  footerBtn: { border: "1px solid #496790", borderRadius: 8, background: "transparent", color: "#dbe5f5", height: 36, padding: "0 14px" },
};
import React, { useMemo, useState } from "react";

const BASE_URL = "http://127.0.0.1:5000";
const SEND_ENDPOINTS = {
  phone: "/auth/send-otp",
  email: "/auth/send-email-otp",
};
const VERIFY_ENDPOINTS = {
  phone: "/auth/verify-otp",
  email: "/auth/verify-email-otp",
};

const ROLES = [
  { key: "jobseeker", label: "Ish izlovchi sifatida kirish" },
  { key: "employer", label: "Ish beruvchi sifatida kirish" },
];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.08.36 2.24.56 3.44.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.42 21 3 13.58 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.36.56 3.44a1 1 0 0 1-.24 1L6.6 10.8z"
        fill="#6b7280"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm8 6 8-5H4l8 5zm0 2-8-5v8h16V9l-8 5z"
        fill="#6b7280"
      />
    </svg>
  );
}

function EmailGradientIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <defs>
        <linearGradient id="mail-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5c6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="3.5" y="5.5" width="17" height="13" rx="3" fill="none" stroke="url(#mail-grad)" strokeWidth="1.8" />
      <path d="M5 7l7 5 7-5" fill="none" stroke="url(#mail-grad)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.33 0-8 2.17-8 4.5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1c0-2.33-3.67-4.5-8-4.5z"
        fill="#8b95a7"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1zm2 0h6V8a3 3 0 0 0-6 0v2z"
        fill="#8b95a7"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.94 9h-3.1a15.8 15.8 0 00-1.34-5A8.04 8.04 0 0119.94 11zM12 4.06c.93 1.1 1.77 3.03 2.17 5.94H9.83c.4-2.91 1.24-4.84 2.17-5.94zM8.5 6a15.8 15.8 0 00-1.34 5h-3.1A8.04 8.04 0 018.5 6zM4.06 13h3.1a15.8 15.8 0 001.34 5A8.04 8.04 0 014.06 13zM12 19.94c-.93-1.1-1.77-3.03-2.17-5.94h4.34c-.4 2.91-1.24 4.84-2.17 5.94zM15.5 18a15.8 15.8 0 001.34-5h3.1A8.04 8.04 0 0115.5 18z"
        fill="#586174"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-1.4 3.6-5.5 3.6-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.2 14.6 2.3 12 2.3A9.7 9.7 0 1 0 12 21.7c5.6 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6z" />
    </svg>
  );
}

function FaceIdIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M7 4h2v2H7v2H5V6a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v2h-2V6h-2V4h2zM5 16h2v2h2v2H7a2 2 0 0 1-2-2v-2zm14 0v2a2 2 0 0 1-2 2h-2v-2h2v-2h2zM8 11a1.5 1.5 0 1 0 0 .01zm8 0a1.5 1.5 0 1 0 0 .01zM8 16c1.1-1.3 2.4-2 4-2s2.9.7 4 2" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OneIdIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="#6b7280" strokeWidth="1.6" />
      <path d="M9 12h6M12 9v6" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M21.5 4.6L18.3 20a1 1 0 0 1-1.5.7l-4.4-3.2-2.2 2.1a1 1 0 0 1-1.7-.6l-.3-4.1L4.8 13a1 1 0 0 1 .1-1.8L20 4a1 1 0 0 1 1.5.6zM9.6 14.2l.1 2.2 1.2-1.2 5.2-6.7-6.5 5.7z"
        fill="#5ab6ff"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M5 5h3.3l3.8 5 4.2-5H19l-5.6 6.6L19.4 19h-3.3l-4.2-5.4L7.3 19H5l5.7-6.8z" fill="#c8d6ee" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="none" stroke="#c8d6ee" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.3" fill="none" stroke="#c8d6ee" strokeWidth="1.6" />
      <circle cx="16.5" cy="7.8" r="1" fill="#c8d6ee" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M13.3 20v-6h2.2l.4-2.5h-2.6V9.9c0-.8.3-1.3 1.4-1.3H16V6.3c-.2 0-1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v1.9H8.4V14h2.2v6z" fill="#c8d6ee" />
    </svg>
  );
}

function LandingDocIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M8 3h6l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm5 1.8V8h3.2"
        fill="none"
        stroke="#0d7f98"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 12.3h5M9.5 15.3h5" stroke="#0d7f98" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LandingUserSearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="10" cy="9" r="3.1" fill="none" stroke="#0d7f98" strokeWidth="1.8" />
      <path d="M4.8 18c1-2.4 3-3.8 5.2-3.8 1.9 0 3.8 1.1 4.9 3" fill="none" stroke="#0d7f98" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17.6" cy="16.8" r="2.2" fill="none" stroke="#0d7f98" strokeWidth="1.8" />
      <path d="M19.2 18.4l1.9 1.8" stroke="#0d7f98" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}



export default function App() {
  const [screen, setScreen] = useState("landing");
  const [role, setRole] = useState("jobseeker");
  const [method, setMethod] = useState("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form");
  const [codeChannel, setCodeChannel] = useState("sms");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("error");
  const [loading, setLoading] = useState(false);

  const formattedPhone = useMemo(() => {
    const clean = phone.replace(/\D/g, "").slice(0, 9);
    const parts = [
      clean.slice(0, 2),
      clean.slice(2, 5),
      clean.slice(5, 7),
      clean.slice(7, 9),
    ];
    return parts.filter(Boolean).join(" ");
  }, [phone]);

  const activeTarget = method === "phone" ? formattedPhone.replace(/\s/g, "") : email.trim();

  const sendOtp = async () => {
    if (method === "phone" && activeTarget.length < 9) {
      setMsg("Telefon raqamni to'g'ri kiriting");
      setMsgType("error");
      return;
    }
    if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(activeTarget)) {
      setMsg("Email manzilni to'g'ri kiriting");
      setMsgType("error");
      return;
    }

    setMsg("");
    setMsgType("error");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}${SEND_ENDPOINTS[method]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          method,
          channel: method === "phone" ? codeChannel : undefined,
          phone: method === "phone" ? activeTarget : undefined,
          email: method === "email" ? activeTarget : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Kod yuborildi. Tasdiqlash kodini kiriting.");
        setMsgType("success");
        setStep("otp");
      } else {
        setMsg(data.message || "Kod yuborishda xatolik");
        setMsgType("error");
      }
    } catch {
      setMsg("Backend bilan aloqa yo'q");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length < 4) {
      setMsg("Kod yetarli emas");
      setMsgType("error");
      return;
    }
    setMsg("");
    setMsgType("error");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}${VERIFY_ENDPOINTS[method]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          method,
          code: otp,
          phone: method === "phone" ? activeTarget : undefined,
          email: method === "email" ? activeTarget : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("success");
      } else {
        setMsg(data.message || "Kod noto'g'ri");
        setMsgType("error");
      }
    } catch {
      setMsg("Tasdiqlashda server xatosi");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  const onPhoneChange = (value) => {
    setPhone(value.replace(/\D/g, ""));
  };

  const resetFlow = () => {
    setStep("form");
    setOtp("");
    setMsg("");
    setMsgType("error");
  };

  const goLanding = () => {
    setScreen("landing");
    resetFlow();
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>O</div>
          <div>
            <div style={styles.logoTitle}>OSON ISH</div>
            <div style={styles.logoSub}>BIZ BILAN BARCHASI OSON</div>
          </div>
        </div>
        <nav style={styles.nav}>
          <span>Bo'sh ish o'rinlari</span>
          <span>Rezyumelar</span>
          <span>Tashkilotlar</span>
        </nav>
        <div style={styles.headerRight}>
          <span style={styles.lang}>
            <GlobeIcon /> O'zb
          </span>
          <button style={styles.loginBtn}>Kirish</button>
        </div>
      </header>

      <main style={styles.content}>
        {screen === "landing" ? (
          <div style={styles.landingCard}>
            <h2 style={styles.landingTitle}>Foydalanuvchi rolini tanlang</h2>
            <div style={styles.landingRoleList}>
              {ROLES.map((item) => (
                <button
                  key={item.key}
                  style={styles.landingRoleBtn}
                  onClick={() => {
                    setRole(item.key);
                    setScreen("auth");
                    resetFlow();
                  }}
                >
                  <span style={styles.landingRoleBtnLeft}>
                    <span style={styles.iconBox}>
                      {item.key === "jobseeker" ? <LandingDocIcon /> : <LandingUserSearchIcon />}
                    </span>
                    {item.label}
                  </span>
                  <span style={styles.chevron}>&gt;</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.wrapper}>
            <section style={styles.rolePanel}>
              <h2 style={styles.rolePanelTitle}>Foydalanuvchi rolini tanlang</h2>
              {ROLES.map((item) => (
                <button
                  key={item.key}
                  style={{
                    ...styles.roleBtn,
                    ...(role === item.key ? styles.roleBtnActive : {}),
                  }}
                  onClick={() => {
                    setRole(item.key);
                    resetFlow();
                  }}
                >
                  <span style={styles.roleBtnLeft}>
                    <span style={styles.iconBox}>
                      {item.key === "jobseeker" ? <LandingDocIcon /> : <LandingUserSearchIcon />}
                    </span>
                    {item.label}
                  </span>
                  <span style={styles.chevron}>&gt;</span>
                </button>
              ))}
            </section>

            <section style={styles.formPanel}>
              <div style={styles.formTitleRow}>
                <button style={styles.backChip} onClick={goLanding}>
                  &lt;
                </button>
                <h2 style={styles.title}>Ro'yxatdan o'tish</h2>
              </div>

            {step === "form" && (
              <>
                <div style={styles.tabRow}>
                  <button
                    style={{
                      ...styles.tabBtn,
                      ...(method === "phone" ? styles.tabActive : {}),
                    }}
                    onClick={() => {
                      setMethod("phone");
                      setMsg("");
                    }}
                  >
                    Telefon raqami
                  </button>
                  <button
                    style={{
                      ...styles.tabBtn,
                      ...(method === "email" ? styles.tabActive : {}),
                    }}
                    onClick={() => {
                      setMethod("email");
                      setMsg("");
                    }}
                  >
                    <EmailGradientIcon /> Elektron pochta
                  </button>
                </div>

                {method === "phone" ? (
                  <>
                    <label style={styles.label}>Telefon raqami</label>
                    <div style={styles.inputWrap}>
                      <span style={styles.prefix}>uz +998</span>
                      <input
                        type="tel"
                        value={formattedPhone}
                        onChange={(e) => onPhoneChange(e.target.value)}
                        placeholder="__ ___ __ __"
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.channelWrap}>
                      <span style={styles.channelLabel}>Kodni olish usuli</span>
                      <label style={styles.radioItem}>
                        <button
                          type="button"
                          onClick={() => setCodeChannel("sms")}
                          style={{
                            ...styles.radioDot,
                            ...(codeChannel === "sms" ? styles.radioDotActive : {}),
                          }}
                        />
                        SMS-kod
                      </label>
                      <label style={styles.radioItem}>
                        <button
                          type="button"
                          onClick={() => setCodeChannel("telegram")}
                          style={{
                            ...styles.radioDot,
                            ...(codeChannel === "telegram" ? styles.radioDotActive : {}),
                          }}
                        />
                        Telegram-kod
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <label style={styles.label}>Elektron pochta</label>
                    <div style={styles.inputWrap}>
                      <span style={styles.prefix}>
                        <EmailGradientIcon />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        style={styles.input}
                      />
                    </div>
                  </>
                )}

                {msg && (
                  <p style={{ ...styles.feedback, ...(msgType === "success" ? styles.feedbackSuccess : styles.feedbackError) }}>
                    {msg}
                  </p>
                )}

                <button style={styles.primaryBtn} onClick={sendOtp} disabled={loading}>
                  {loading ? "Yuborilmoqda..." : "Kodni yuborish"}
                </button>

                <div style={styles.orText}>yoki</div>
                <button style={styles.socialBtn}>
                  <span style={styles.socialBtnIcon}><GoogleIcon /></span> Google
                </button>
                {role !== "employer" && (
                  <>
                    <button style={styles.socialBtn}>
                      <span style={styles.socialBtnIcon}><FaceIdIcon /></span> Face ID
                    </button>
                    <button style={styles.socialBtn}>
                      <span style={styles.socialBtnIcon}><OneIdIcon /></span> OneID
                    </button>
                  </>
                )}

                {role === "employer" && (
                  <>
                    <div style={styles.orText}>yoki e-imzo orqali</div>
                    <div style={styles.infoBox}>
                      Yuqoridagi usullar orqali kirsangiz, tizimning tasdiqlanmagan bo'limlari
                      ochiladi. To'liq funksiyalar uchun e-imzo orqali tasdiqlang.
                    </div>
                    <button style={styles.identityBtn}>
                      <span style={styles.socialBtnIcon}>
                        <OneIdIcon />
                      </span>
                      OneID orqali kirish
                    </button>
                    <button style={styles.identityBtn}>
                      <span style={styles.socialBtnIcon}>
                        <LockIcon />
                      </span>
                      ERI orqali kirish
                    </button>
                    <button style={styles.identityBtn}>
                      <span style={styles.socialBtnIcon}>
                        <FaceIdIcon />
                      </span>
                      Face ID orqali kirish
                    </button>
                  </>
                )}
              </>
            )}

            {step === "otp" && (
              <>
                <p style={styles.hint}>
                  {method === "phone"
                    ? `+998 ${formattedPhone} ga kod yuborildi`
                    : `${email} manzilga kod yuborildi`}
                </p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="------"
                  maxLength={6}
                  style={{ ...styles.otpInput }}
                />
                {msg && (
                  <p style={{ ...styles.feedback, ...(msgType === "success" ? styles.feedbackSuccess : styles.feedbackError) }}>
                    {msg}
                  </p>
                )}
                <button style={styles.primaryBtn} onClick={verifyOtp} disabled={loading}>
                  {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
                </button>
                <button style={styles.linkBtn} onClick={resetFlow}>
                  Orqaga qaytish
                </button>
              </>
            )}

            {step === "success" && (
              <div style={styles.successBox}>
                <h3 style={{ color: "#0a8f3c", marginBottom: 8 }}>Muvaffaqiyatli kirdingiz!</h3>
                <p style={{ margin: 0 }}>
                  Rol: {role === "jobseeker" ? "Ish izlovchi" : "Ish beruvchi"}
                </p>
              </div>
            )}
            </section>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerCol}>
          <div style={styles.logoWrap}>
            <div style={styles.logoIcon}>O</div>
            <div>
              <div style={{ ...styles.logoTitle, color: "#fff" }}>OSON ISH</div>
              <div style={{ ...styles.logoSub, color: "#95a9cc" }}>BIZ BILAN BARCHASI OSON</div>
            </div>
          </div>
        </div>
        <div style={styles.footerCol}>
          <p style={styles.footerTitle}>Biz bilan bog'laning:</p>
          <p style={styles.footerItem}>+998 (71) 200-01-40</p>
          <p style={styles.footerItem}>+998 (71) 203-01-40</p>
          <p style={styles.footerItem}>+998 (71) 204-01-40</p>
          <p style={styles.footerItem}>info@mehnat.uz</p>
        </div>
        <div style={styles.footerCol}>
          <p style={styles.footerTitle}>Ijtimoiy tarmoqlarda kuzating:</p>
          <div style={styles.socialRow}>
            <span style={styles.circle}>
              <TelegramIcon />
            </span>
            <span style={styles.circle}>
              <XIcon />
            </span>
            <span style={styles.circle}>
              <InstagramIcon />
            </span>
            <span style={styles.circle}>
              <FacebookIcon />
            </span>
          </div>
          <button style={styles.footerBtn}>Moderator sifatida kirish</button>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateRows: "70px 1fr 180px",
    background: "#f3f6fb",
    fontFamily: "Inter, Arial, sans-serif",
  },
  header: {
    height: 70,
    background: "#fff",
    borderBottom: "1px solid #e4e9f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  logoWrap: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    background: "#08a4bf",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
    fontSize: 15,
  },
  logoTitle: {
    fontWeight: 800,
    fontSize: 15,
    color: "#12315e",
    lineHeight: 1.1,
  },
  logoSub: {
    fontSize: 10,
    color: "#7f8ba1",
  },
  nav: {
    display: "flex",
    gap: 34,
    color: "#1f2937",
    fontSize: 14,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  lang: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    color: "#364052",
    fontSize: 14,
  },
  loginBtn: {
    background: "#08a4bf",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    borderRadius: 7,
    height: 36,
    padding: "0 20px",
  },
  content: {
    display: "grid",
    placeItems: "center",
    padding: "6px 20px 28px",
  },
  landingCard: {
    width: "100%",
    maxWidth: 650,
    minHeight: 265,
    background: "#f7f8fa",
    border: "1px solid #e2e6ec",
    borderRadius: 14,
    padding: "22px 18px",
    boxShadow: "none",
  },
  landingTitle: {
    margin: "0 0 28px",
    textAlign: "left",
    fontSize: "clamp(24px, 4.8vw, 44px)",
    fontWeight: 800,
    color: "#0a2e52",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  },
  landingRoleList: {
    display: "grid",
    gap: 16,
  },
  landingRoleBtn: {
    width: "100%",
    border: "1px solid #d4dce8",
    background: "#fbfdff",
    color: "#0f1c2d",
    borderRadius: 10,
    padding: "13px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    lineHeight: 1.25,
  },
  landingRoleBtnLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  wrapper: {
    width: "100%",
    maxWidth: 1240,
    background: "#f6f7f9",
    border: "1px solid #e3e7ee",
    borderRadius: 16,
    display: "grid",
    gridTemplateColumns: "0.74fr 1.26fr",
    overflow: "hidden",
    minHeight: 560,
    boxShadow: "0 2px 10px rgba(17, 24, 39, 0.04)",
  },
  rolePanel: {
    padding: "30px 24px",
    borderRight: "1px solid #d9dee7",
  },
  formPanel: {
    padding: "24px 24px 22px",
  },
  formTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 14,
    minHeight: 34,
  },
  backChip: {
    width: 28,
    height: 28,
    borderRadius: 7,
    border: "1px solid #d9dee7",
    background: "#f8fafc",
    color: "#7a879d",
  },
  title: {
    margin: 0,
    fontSize: "clamp(24px, 4.8vw, 40px)",
    fontWeight: 800,
    color: "#10243b",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  },
  rolePanelTitle: {
    margin: "0 0 18px",
    fontSize: "clamp(28px, 3vw, 44px)",
    fontWeight: 800,
    color: "#10243b",
    letterSpacing: "-0.01em",
    lineHeight: 1.12,
    whiteSpace: "nowrap",
  },
  roleBtn: {
    width: "100%",
    marginBottom: 10,
    border: "1px solid #d4dbe6",
    background: "#fff",
    color: "#0f2a45",
    borderRadius: 11,
    padding: "13px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  roleBtnActive: {
    border: "1px solid #c7e7ef",
    background: "#d6edf3",
    boxShadow: "none",
  },
  roleBtnLeft: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    fontSize: 17,
    fontWeight: 600,
    lineHeight: 1.24,
  },
  iconBox: {
    width: 24,
    height: 24,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    background: "linear-gradient(145deg, #f0fbff 0%, #e8f6ff 100%)",
    border: "1px solid #d5eaf6",
    flexShrink: 0,
  },
  chevron: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: 700,
  },
  tabRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "#eceff4",
    borderRadius: 11,
    padding: 4,
    gap: 4,
    marginBottom: 16,
  },
  tabBtn: {
    border: "none",
    background: "transparent",
    borderRadius: 8,
    height: 44,
    cursor: "pointer",
    color: "#4b5563",
    fontWeight: 500,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  tabActive: {
    background: "#fff",
    color: "#1093b0",
    boxShadow: "0 0 0 1px #d7dde8",
  },
  label: {
    display: "block",
    margin: "6px 0 8px",
    color: "#334155",
    fontSize: 15,
  },
  inputWrap: {
    border: "1px solid #cfd8e3",
    borderRadius: 11,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 12,
    background: "#fff",
  },
  prefix: {
    minWidth: 104,
    padding: "0 12px",
    height: 46,
    borderRight: "1px solid #e2e8f0",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#334155",
    fontSize: 15,
    gap: 6,
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    padding: "0 12px",
    height: 48,
    fontSize: 16,
    background: "transparent",
  },
  primaryBtn: {
    width: "100%",
    height: 46,
    border: "none",
    borderRadius: 10,
    background: "#0f9fbe",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 8,
  },
  feedback: {
    margin: "8px 0 0",
    fontSize: 13,
    lineHeight: 1.4,
    borderRadius: 8,
    padding: "7px 10px",
  },
  feedbackError: {
    color: "#b42318",
    background: "#fef3f2",
    border: "1px solid #fecdc8",
  },
  feedbackSuccess: {
    color: "#047857",
    background: "#ecfdf3",
    border: "1px solid #bbf7d0",
  },
  hint: {
    marginTop: 0,
    color: "#334155",
    marginBottom: 12,
    fontSize: 14,
  },
  otpInput: {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    height: 48,
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 6,
    marginBottom: 8,
  },
  orText: {
    textAlign: "center",
    color: "#8090a8",
    margin: "10px 0 12px",
    fontSize: 13,
  },
  socialBtn: {
    width: "100%",
    height: 44,
    border: "1px solid #d8e0ea",
    borderRadius: 10,
    background: "#fff",
    color: "#2d3c53",
    fontSize: 15,
    marginBottom: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "0 12px",
    lineHeight: 1.2,
  },
  identityBtn: {
    width: "100%",
    height: 42,
    border: "1px solid #d8e0ea",
    borderRadius: 10,
    background: "#fff",
    color: "#2d3c53",
    fontSize: 13,
    marginBottom: 8,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "0 12px",
    lineHeight: 1.2,
  },
  infoBox: {
    background: "#fff8e6",
    border: "1px solid #f1d99d",
    borderRadius: 8,
    color: "#7a6230",
    fontSize: 12,
    lineHeight: 1.4,
    padding: "9px 10px",
    marginBottom: 10,
  },
  socialBtnIcon: {
    width: 20,
    height: 20,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  channelWrap: {
    marginTop: -2,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  channelLabel: {
    color: "#4b5563",
    fontSize: 13,
    marginRight: 2,
  },
  radioItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    color: "#4b5563",
    fontSize: 13,
    cursor: "pointer",
  },
  radioDot: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "1.8px solid #9aa7ba",
    display: "inline-block",
    position: "relative",
    background: "#fff",
    padding: 0,
    cursor: "pointer",
  },
  radioDotActive: {
    borderColor: "#0f9fbe",
    background:
      "radial-gradient(circle at center, #0f9fbe 0 4px, transparent 4px 100%)",
  },
  linkBtn: {
    border: "none",
    background: "transparent",
    color: "#0e7490",
    marginTop: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  successBox: {
    borderRadius: 10,
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    padding: 14,
  },
  footer: {
    background: "#173a68",
    color: "#fff",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "24px 34px 16px",
    alignItems: "start",
    gap: 24,
    borderTop: "1px solid #244b80",
  },
  footerCol: {
    minHeight: 100,
  },
  footerTitle: {
    margin: "0 0 12px",
    fontWeight: 700,
    fontSize: 15,
  },
  footerItem: {
    margin: "0 0 8px",
    color: "#d1dbeb",
    fontSize: 14,
  },
  socialRow: {
    display: "flex",
    gap: 10,
    marginBottom: 12,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 999,
    border: "1px solid #4f6f9a",
    display: "grid",
    placeItems: "center",
    color: "#d6e2f3",
    fontSize: 13,
    background: "rgba(255,255,255,0.03)",
  },
  footerBtn: {
    border: "1px solid #496790",
    borderRadius: 8,
    background: "transparent",
    color: "#dbe5f5",
    height: 36,
    padding: "0 14px",
  },
};
