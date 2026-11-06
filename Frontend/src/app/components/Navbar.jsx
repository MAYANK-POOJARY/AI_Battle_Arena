import React from 'react';
import { Swords, RotateCcw } from 'lucide-react';

export default function Navbar({ onReset }) {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(20, 20, 23, 0.85)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <div className="max-w-content" style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-subtle)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <Swords size={20} />
          </div>
          <div>
            <h1 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--text-main)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2
            }}>
              AI Battle Arena
            </h1>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)'
            }}>
              AI Model Evaluation Suite
            </p>
          </div>
        </div>

        <button type="button" onClick={onReset} className="btn btn-ghost">
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
}
