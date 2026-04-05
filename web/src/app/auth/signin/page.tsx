'use client';

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      {/* Ambient background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'var(--brand-glow)', filter: 'blur(200px)', borderRadius: '50%', zIndex: -1, pointerEvents: 'none' }}></div>
      
      <div className="glass-card animate-fade-up" style={{ textAlign: 'center', maxWidth: '450px', width: '100%', padding: '3.5rem 2.5rem' }}>
        
        <div style={{ width: '64px', height: '64px', background: 'var(--gradient-main)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', boxShadow: '0 4px 25px var(--brand-glow)' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>E</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Welcome <span className="gradient-text">Back</span>
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.05rem', lineHeight: 1.5 }}>
          Log in with your Discord account to securely manage your server modules and data.
        </p>

        <button 
          className="btn btn-primary" 
          onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
          style={{ width: '100%', padding: '1.1rem', fontSize: '1.15rem' }}
        >
          Login with Discord
        </button>

        <div style={{ marginTop: '2rem', color: '#555', fontSize: '0.85rem' }}>
          Secure OAuth2 authentication via Discord API
        </div>

      </div>
    </main>
  );
}
