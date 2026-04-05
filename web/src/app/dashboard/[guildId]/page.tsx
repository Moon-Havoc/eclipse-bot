'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ServerSettings({ params }: { params: { guildId: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [prefix, setPrefix] = useState('!');
  const [logChannel, setLogChannel] = useState('');
  const [welcomeChannel, setWelcomeChannel] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/api/auth/signin');
    if (status === 'authenticated') {
      fetch(`/api/guilds/${params.guildId}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setPrefix(data.prefix || '!');
            setLogChannel(data.logChannel || '');
            setWelcomeChannel(data.welcomeChannel || '');
          }
          setIsLoading(false);
        })
        .catch(console.error);
    }
  }, [params.guildId, status, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await fetch(`/api/guilds/${params.guildId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix, logChannel, welcomeChannel })
    });
    setIsSaving(false);
  };

  if (isLoading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading settings...</div>;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '600px', height: '600px', background: 'var(--brand-glow)', filter: 'blur(200px)', borderRadius: '50%', zIndex: -1, pointerEvents: 'none', opacity: 0.5 }}></div>

      <div className="container" style={{ padding: '4rem 2rem' }}>
        <button onClick={() => router.push('/dashboard')} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>← Back to Servers</button>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2.5rem' }}>Server Configuration</h1>
        
        <form onSubmit={handleSave} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Command Prefix</label>
            <input 
              type="text" 
              value={prefix} 
              onChange={e => setPrefix(e.target.value)} 
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1rem' }} 
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>The symbol used to trigger commands (e.g. !help)</p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Welcome Channel ID</label>
            <input 
              type="text" 
              value={welcomeChannel} 
              onChange={e => setWelcomeChannel(e.target.value)} 
              placeholder="e.g. 1234567890"
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1rem' }} 
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>The ID of the channel where welcome messages will be sent.</p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Log Channel ID</label>
            <input 
              type="text" 
              value={logChannel} 
              onChange={e => setLogChannel(e.target.value)} 
              placeholder="e.g. 1234567890"
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1rem' }} 
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>The ID of the channel where moderation logs (deletions, kicks, bans) will be sent.</p>
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }} disabled={isSaving}>
            {isSaving ? 'Saved!' : 'Save Settings'}
          </button>
        </form>

      </div>
    </main>
  );
}
