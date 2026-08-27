import React from 'react';
import { Scale, Trophy, CheckCircle2, Award } from 'lucide-react';

export default function JudgeVerdict({ judge }) {
  const score1 = judge?.solution_1_score ?? 0;
  const score2 = judge?.solution_2_score ?? 0;
  const reasoning1 = judge?.solution_1_reasoning || 'No reasoning provided for Solution 1.';
  const reasoning2 = judge?.solution_2_reasoning || 'No reasoning provided for Solution 2.';

  let winnerText = 'Tie (Equal Scores)';
  let winnerVariant = 'tie';

  if (score1 > score2) {
    winnerText = 'Winner: Solution 1';
    winnerVariant = 'sol1';
  } else if (score2 > score1) {
    winnerText = 'Winner: Solution 2';
    winnerVariant = 'sol2';
  }

  return (
    <section className="clean-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header with Winner Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--winner-bg)',
            border: '1px solid var(--winner-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--winner-color)'
          }}>
            <Scale size={16} />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>
              Judge Verdict
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
              Comprehensive evaluation and scoring breakdown
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-winner" style={{ fontSize: '13px', padding: '6px 12px' }}>
            <Trophy size={15} />
            {winnerText}
          </span>
        </div>
      </div>

      {/* Score Comparison Bars */}
      <div style={{
        background: 'var(--bg-code)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--solution-1-color)' }}>
            Solution 1: {score1}/100
          </span>
          <span style={{ color: 'var(--solution-2-color)' }}>
            Solution 2: {score2}/100
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Solution 1 Bar */}
          <div className="progress-track" style={{ flex: 1 }}>
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(Math.max(score1, 0), 100)}%`,
                background: 'var(--solution-1-color)'
              }}
            />
          </div>
          {/* Solution 2 Bar */}
          <div className="progress-track" style={{ flex: 1 }}>
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(Math.max(score2, 0), 100)}%`,
                background: 'var(--solution-2-color)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Side-by-Side Detailed Reasoning */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '14px'
      }}>
        {/* Solution 1 Reasoning */}
        <div style={{
          background: 'var(--bg-code)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--solution-1-color)',
              display: 'inline-block'
            }} />
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
              Solution 1 Analysis
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {reasoning1}
          </p>
        </div>

        {/* Solution 2 Reasoning */}
        <div style={{
          background: 'var(--bg-code)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--solution-2-color)',
              display: 'inline-block'
            }} />
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
              Solution 2 Analysis
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {reasoning2}
          </p>
        </div>
      </div>
    </section>
  );
}
