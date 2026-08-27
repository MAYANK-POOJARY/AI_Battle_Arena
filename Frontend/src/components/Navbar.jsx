import React from 'react';
import { Swords, FileJson, RotateCcw, Sparkles } from 'lucide-react';
import { PRESETS } from '../data/presets';

export default function Navbar({ onSelectPreset, onOpenJSON, onReset, activePresetId }) {
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

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Preset Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} /> Presets:
            </span>
            <select
              value={activePresetId || ''}
              onChange={(e) => onSelectPreset(e.target.value)}
              style={{
                background: 'var(--bg-code)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                fontSize: '13px',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="" disabled>Select a Preset</option>
              {PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* JSON Payload Inspector */}
          <button
            onClick={onOpenJSON}
            className="btn btn-ghost"
            style={{ fontSize: '13px', padding: '6px 12px' }}
            title="View or Paste Raw JSON Payload"
          >
            <FileJson size={15} />
            <span>JSON Payload</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="btn btn-ghost"
            style={{ fontSize: '13px', padding: '6px 10px' }}
            title="Reset to Default"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
