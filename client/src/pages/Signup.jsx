import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { T } from '../theme';

export default function Signup({ setPage }) {
  const { register } = useAuth();
  const { addToast } = useToast();
  
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'VOLUNTEER' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return addToast('Please fill all fields', 'error');
    if (form.password.length < 8) return addToast('Password must be at least 8 chars', 'error');

    setLoading(true);
    try {
      await register(form);
      addToast('Account created successfully!', 'success');
      setPage('dashboard');
    } catch (err) {
      addToast(err.message || 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const set = field => e => setForm({ ...form, [field]: e.target.value });

  return (
    <div style={{ maxWidth: 440, margin: '60px auto', padding: '40px 32px', background: T.white, border: `1px solid ${T.border}`, borderRadius: 24 }}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '2rem', color: T.ink, marginBottom: 8, textAlign: 'center' }}>Create Account</h2>
      <p style={{ textAlign: 'center', color: T.muted, marginBottom: 32, fontSize: '0.9rem' }}>Join Volunteer Compass today.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: T.muted, textTransform: 'uppercase' }}>Account Type</label>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button type="button" onClick={() => setForm({...form, role: 'VOLUNTEER'})} style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${form.role === 'VOLUNTEER' ? T.leaf : T.border}`, background: form.role === 'VOLUNTEER' ? T.leaf : T.white, color: form.role === 'VOLUNTEER' ? '#fff' : T.muted, fontWeight: 700, cursor: 'pointer' }}>Volunteer</button>
            <button type="button" onClick={() => setForm({...form, role: 'ORGANIZER'})} style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${form.role === 'ORGANIZER' ? T.leaf : T.border}`, background: form.role === 'ORGANIZER' ? T.leaf : T.white, color: form.role === 'ORGANIZER' ? '#fff' : T.muted, fontWeight: 700, cursor: 'pointer' }}>Organizer</button>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: T.muted, textTransform: 'uppercase' }}>Full Name / Org Name</label>
          <input type="text" value={form.name} onChange={set('name')} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.cream, outline: 'none', marginTop: 6 }} placeholder="John Doe" />
        </div>
        
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: T.muted, textTransform: 'uppercase' }}>Email</label>
          <input type="email" value={form.email} onChange={set('email')} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.cream, outline: 'none', marginTop: 6 }} placeholder="you@example.com" />
        </div>
        
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: T.muted, textTransform: 'uppercase' }}>Password</label>
          <input type="password" value={form.password} onChange={set('password')} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.cream, outline: 'none', marginTop: 6 }} placeholder="••••••••" />
        </div>

        <button type="submit" disabled={loading} style={{ background: T.leaf, color: '#fff', border: 'none', borderRadius: 10, padding: 14, fontWeight: 800, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
          {loading ? 'Creating Account...' : 'Sign Up →'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: T.muted }}>
        Already have an account? <span onClick={() => setPage('login')} style={{ color: T.leaf, fontWeight: 700, cursor: 'pointer' }}>Log in</span>
      </div>
    </div>
  );
}
