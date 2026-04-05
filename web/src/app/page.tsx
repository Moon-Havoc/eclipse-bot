import Image from "next/image";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="glass" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Endless <span className="gradient-text">Eclipse</span></div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#" style={{ padding: '0.5rem' }}>Features</a>
          <a href="#" style={{ padding: '0.5rem' }}>Commands</a>
          <a href="#" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Login with Discord</a>
        </div>
      </nav>

      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
          The only Discord bot you will <br /> <span className="gradient-text">ever need.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
          Eclipse Bot brings enterprise-grade moderation, detailed logging, reaction roles, and powerful utility to the Endless Eclipse server.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Add to Server</button>
          <button className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>View Dashboard</button>
        </div>
      </section>
    </main>
  );
}
