import React, { useState } from "react";
import { MapPin, Mail, MessageSquare, Award, Shield, Zap, ChevronRight, Heart } from "lucide-react";

const THEME = {
  navy: "#002B5B",
  blue: "#4A90E2",
  lightBlue: "#E1EEFF",
  slate: "#F8FAFC",
  text: "#1E293B",
  muted: "#64748B"
};

export default function VolunteerCompass() {
  const [view, setView] = useState("home");

  return (
    <div style={{ backgroundColor: THEME.slate, minHeight: "100vh", fontFamily: "sans-serif", color: THEME.text, margin: 0 }}>
      {/* NAVBAR */}
      <nav style={{ backgroundColor: "white", padding: "15px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setView("home")}>
          <div style={{ backgroundColor: THEME.navy, color: "white", padding: "6px 10px", borderRadius: "8px", fontWeight: "900", fontSize: "1.2rem" }}>vc.</div>
          <h1 style={{ fontSize: "1.2rem", fontWeight: "900", color: THEME.navy, margin: 0, letterSpacing: "-0.5px" }}>volunteer compass.</h1>
        </div>
        
        <div style={{ display: "flex", gap: "30px" }}>
          {['home', 'dashboard', 'about', 'contact'].map(item => (
            <button key={item} onClick={() => setView(item)} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "0.85rem", color: view === item ? THEME.navy : THEME.muted, textTransform: "uppercase" }}>
              {item}
            </button>
          ))}
        </div>

        <button onClick={() => setView("dashboard")} style={{ backgroundColor: THEME.navy, color: "white", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>
          Launch App
        </button>
      </nav>

      {/* HERO SECTION */}
      {view === "home" && (
        <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
          <div style={{ backgroundColor: THEME.lightBlue, color: "#2563EB", padding: "6px 16px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "800", display: "inline-block", marginBottom: "20px" }}>
            ⚡ INTELLIGENCE-DRIVEN MATCHING
          </div>
          <h2 style={{ fontSize: "4rem", fontWeight: "900", color: THEME.navy, marginBottom: "20px", lineHeight: "1.1" }}>
            Organize Good. <br /><span style={{ color: THEME.blue }}>Find Your Impact.</span>
          </h2>
          <p style={{ fontSize: "1.2rem", color: THEME.muted, maxWidth: "700px", margin: "0 auto 40px", lineHeight: "1.6" }}>
            Skilled volunteers go unmatched while events go understaffed. VolunteerCompass bridges the gap with a map-based platform.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <button onClick={() => setView("dashboard")} style={{ backgroundColor: THEME.navy, color: "white", padding: "16px 32px", borderRadius: "14px", border: "none", fontSize: "1.1rem", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              Explore Events Map <ChevronRight size={20} />
            </button>
            <button style={{ backgroundColor: "white", color: THEME.text, padding: "16px 32px", borderRadius: "14px", border: "1px solid #E2E8F0", fontSize: "1.1rem", fontWeight: "700", cursor: "pointer" }}>
              For Organizations
            </button>
          </div>
        </main>
      )}

      {/* ABOUT SECTION */}
      {view === "about" && (
        <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 20px" }}>
          <h3 style={{ fontSize: "2.5rem", fontWeight: "900", textAlign: "center", color: THEME.navy, marginBottom: "50px" }}>Why VolunteerCompass?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            {[
              { icon: <MapPin />, title: "Hyper-Local", desc: "Discover opportunities exactly where you are using GPS mapping." },
              { icon: <Award />, title: "Skill-Based", desc: "Contribute your unique skills like coding, design, or teaching." },
              { icon: <Shield />, title: "Verified Impact", desc: "Official tracking for your volunteer hours and achievements." }
            ].map((box, i) => (
              <div key={i} style={{ backgroundColor: "white", padding: "30px", borderRadius: "24px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                <div style={{ color: THEME.blue, marginBottom: "15px" }}>{box.icon}</div>
                <h4 style={{ fontSize: "1.3rem", fontWeight: "800", marginBottom: "10px" }}>{box.title}</h4>
                <p style={{ color: THEME.muted, fontSize: "0.95rem" }}>{box.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      

      {/* FOOTER */}
      <footer style={{ marginTop: "100px", padding: "40px", textAlign: "center", borderTop: "1px solid #E2E8F0", backgroundColor: "white" }}>
        <div style={{ color: THEME.navy, fontWeight: "900", fontSize: "1.5rem", marginBottom: "10px" }}>vc.</div>
        <p style={{ color: THEME.muted, fontSize: "0.85rem" }}>© 2026 VolunteerCompass. Mapping the path to social good.</p>
      </footer>
    </div>
  );


}