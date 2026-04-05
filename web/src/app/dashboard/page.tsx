import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="glass" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Endless <span className="gradient-text">Eclipse</span></div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Welcome, {session.user?.name}</span>
          <a href="/api/auth/signout" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Log Out</a>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '250px', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><a href="#" style={{ color: 'var(--accent)', fontWeight: 600 }}>Servers</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Moderation (WIP)</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Reaction Roles (WIP)</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Logging (WIP)</a></li>
          </ul>
        </aside>

        <section style={{ flex: 1, padding: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>Your Servers</h1>
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                EE
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>Endless Eclipse</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Configure Eclipse Bot settings for this server</p>
              </div>
            </div>
            <button className="btn btn-primary">Manage</button>
          </div>
        </section>
      </div>
    </main>
  );
}
