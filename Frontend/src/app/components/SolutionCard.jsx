import React, { useState } from 'react';
import { Copy, Check, Trophy, Code2 } from 'lucide-react';

export default function SolutionCard({
  title,
  modelName,
  code,
  score,
  isWinner,
  variant = 'sol1' // 'sol1' or 'sol2'
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeClass = variant === 'sol1' ? 'badge-sol1' : 'badge-sol2';
  const borderHighlight = isWinner ? '1px solid var(--winner-border)' : '1px solid var(--border-subtle)';

  return (
    <div
      className="clean-card animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        border: borderHighlight,
        position: 'relative'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            background: variant === 'sol1' ? 'var(--solution-1-bg)' : 'var(--solution-2-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: variant === 'sol1' ? 'var(--solution-1-color)' : 'var(--solution-2-color)'
          }}>
            <Code2 size={15} />
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>
              {title}
            </h3>
            {modelName && (
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {modelName}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Winner indicator badge */}
          {isWinner && (
            <span className="badge badge-winner" title="Highest Evaluated Score">
              <Trophy size={13} /> Winner
            </span>
          )}

          {/* Score Badge */}
          <span className={`badge ${badgeClass}`}>
            Score: {score !== undefined ? score : 0}/10
          </span>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="btn-icon"
            title="Copy Solution Code"
          >
            {copied ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--winner-color)' }}>
                <Check size={14} />
              </span>
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>
      </div>

      {/* Code Viewer */}
      <pre className="code-viewer">
        <code>{code || '// No solution content available.'}</code>
      </pre>
    </div>
  );
}
