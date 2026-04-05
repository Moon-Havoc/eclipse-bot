import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Ambient background glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'var(--brand-glow)', filter: 'blur(150px)', borderRadius: '50%', zIndex: -1, pointerEvents: 'none' }}></div>

      <nav className="glass-nav" style={{ padding: '1.25rem 0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
            ECLIPSE <span className="gradient-text">BOT</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 500 }}>
            <Link href="#features" style={{ transition: 'color 0.2s' }} className="hover-text">Features</Link>
            <Link href="#modules" style={{ transition: 'color 0.2s' }} className="hover-text">Modules</Link>
            {session ? (
              <a href="/dashboard" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>Dashboard</a>
            ) : (
              <a href="/api/auth/signin" className="btn btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>Sign In ➔</a>
            )}
          </div>
        </div>
      </nav>

      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '6rem 2rem 4rem 2rem', position: 'relative' }}>
        
        <div className="animate-fade-up" style={{ opacity: 0 }}>
          <h1 className="hero-title">
            UNLEASH <br />
            <span className="gradient-text">THE POWER</span>
          </h1>
        </div>

        <div className="animate-fade-up delay-1" style={{ opacity: 0 }}>
          <p className="hero-subtitle">
            A Premier Discord Utility Bot designed exclusively the Endless Eclipse community. Featuring advanced moderation, robust automation, and a stunning UI.
          </p>
        </div>

        <div className="animate-fade-up delay-2 flex-center" style={{ gap: '1.5rem', opacity: 0 }}>
          <button className="btn btn-primary float-element" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>Invite to Server</button>
          {session ? (
            <a href="/dashboard" className="btn btn-secondary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>Enter Dashboard</a>
          ) : (
            <a href="/api/auth/signin" className="btn btn-secondary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>Login with Discord</a>
          )}
        </div>

        {/* Feature Grid */}
        <div className="container grid-features animate-fade-up delay-3" style={{ opacity: 0, marginTop: '7rem' }}>
          
          <div className="glass-card">
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 245, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(0, 245, 255, 0.3)' }}>
              <span style={{ fontSize: '1.5rem' }}>🛡️</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>Advanced Moderation</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Keep your community safe with powerful tools, automated filters, and comprehensive logging arrays.</p>
          </div>

          <div className="glass-card" style={{ transform: 'translateY(20px)' }}>
             <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(157, 78, 221, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(157, 78, 221, 0.3)' }}>
              <span style={{ fontSize: '1.5rem' }}>⚡</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>Custom Automation</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Automate tasks inherently and create robust triggers with absolute ease to reduce admin overhead.</p>
          </div>

          <div className="glass-card">
             <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255, 170, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(255, 170, 0, 0.3)' }}>
              <span style={{ fontSize: '1.5rem' }}>🎭</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>Reaction Roles</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Boost initial activity and personalize user experiences with a highly engaging reaction role system.</p>
          </div>

        </div>
      </section>

    </main>
  );
}
