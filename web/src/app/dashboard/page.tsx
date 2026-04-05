import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { getUserGuilds } from "../../lib/discord";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !(session as any).accessToken) {
    redirect("/api/auth/signin");
  }

  const guilds = await getUserGuilds((session as any).accessToken);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Ambient background glows */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '600px', height: '600px', background: 'var(--brand-glow)', filter: 'blur(200px)', borderRadius: '50%', zIndex: -1, pointerEvents: 'none', opacity: 0.5 }}></div>

      <nav className="glass-nav" style={{ padding: '1rem 0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
            ECLIPSE <span className="gradient-text">BOT</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Welcome, <span style={{ color: 'white' }}>{session.user?.name}</span></span>
            <a href="/api/auth/signout" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Log Out ➔</a>
          </div>
        </div>
      </nav>

      <div className="container animate-fade-up" style={{ display: 'flex', flex: 1, paddingTop: '3rem', paddingBottom: '3rem', opacity: 0 }}>
        
        {/* Sidebar */}
        <aside style={{ width: '260px', paddingRight: '2.5rem' }}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <a href="#" style={{ display: 'block', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'white', fontWeight: 600, borderLeft: '3px solid var(--brand-blue)' }}>
                  Servers
                </a>
              </li>
              <li><a href="#" style={{ display: 'block', padding: '0.875rem 1rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }} className="hover-text">Moderation</a></li>
              <li><a href="#" style={{ display: 'block', padding: '0.875rem 1rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }} className="hover-text">Reaction Roles</a></li>
              <li><a href="#" style={{ display: 'block', padding: '0.875rem 1rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }} className="hover-text">Logging</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <section style={{ flex: 1, paddingLeft: '2.5rem', borderLeft: '1px solid var(--glass-border)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>Your Servers</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {guilds.length === 0 && (
              <p style={{ color: 'var(--text-secondary)' }}>You don't have 'Manage Server' permissions for any active servers.</p>
            )}
            
            {guilds.map((guild) => (
              <div key={guild.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '64px', height: '64px', background: 'var(--gradient-main)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.25rem', boxShadow: '0 4px 15px rgba(0, 245, 255, 0.3)', overflow: 'hidden' }}>
                    {guild.icon ? (
                      <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      guild.name.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{guild.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Configure bot modules and settings</p>
                  </div>
                </div>
                <Link href={`/dashboard/${guild.id}`} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>Manage</Link>
              </div>
            ))}
          </div>

        </section>
      </div>

    </main>
  );
}
