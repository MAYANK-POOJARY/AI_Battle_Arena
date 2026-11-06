import React, { useState } from 'react';
import { HelpCircle, Copy, Check } from 'lucide-react';

export default function ProblemCard({ problem }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!problem) return;
    navigator.clipboard.writeText(problem);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="clean-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            background: 'rgba(99, 102, 241, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <HelpCircle size={15} />
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
            Problem Context
          </h2>
        </div>

        <button
          onClick={handleCopy}
          className="btn-icon"
          title="Copy Problem Statement"
        >
          {copied ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--winner-color)' }}>
              <Check size={14} /> Copied
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Copy size={14} /> Copy
            </span>
          )}
        </button>
      </div>

      <div style={{
        background: 'var(--bg-code)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '14px 16px',
        color: '#e2e8f0',
        fontSize: '14px',
        lineHeight: 1.6
      }}>
        {problem || <span style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>No problem provided.</span>}
      </div>
    </section>
  );
}
