import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Upload, AlertCircle } from 'lucide-react';

export default function JSONModal({ isOpen, onClose, data, onApplyJSON }) {
  const [jsonText, setJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && data) {
      setJsonText(JSON.stringify(data, null, 2));
      setError('');
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      // Basic schema validation
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('JSON must be a valid object.');
      }
      
      const validated = {
        problem: typeof parsed.problem === 'string' ? parsed.problem : '',
        solution_1: typeof parsed.solution_1 === 'string' ? parsed.solution_1 : '',
        solution_2: typeof parsed.solution_2 === 'string' ? parsed.solution_2 : '',
        judge: {
          solution_1_score: typeof parsed.judge?.solution_1_score === 'number' ? parsed.judge.solution_1_score : 0,
          solution_2_score: typeof parsed.judge?.solution_2_score === 'number' ? parsed.judge.solution_2_score : 0,
          solution_1_reasoning: typeof parsed.judge?.solution_1_reasoning === 'string' ? parsed.judge.solution_1_reasoning : '',
          solution_2_reasoning: typeof parsed.judge?.solution_2_reasoning === 'string' ? parsed.judge.solution_2_reasoning : ''
        }
      };

      onApplyJSON(validated);
      onClose();
    } catch (err) {
      setError(err.message || 'Invalid JSON syntax');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '16px'
    }}>
      <div
        className="clean-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>
              Raw JSON Schema Payload
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              Matches schema: &#123; problem, solution_1, solution_2, judge &#125;
            </p>
          </div>

          <button onClick={onClose} className="btn-icon" title="Close Modal">
            <X size={18} />
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* JSON Editor Textarea */}
        <textarea
          value={jsonText}
          onChange={(e) => {
            setJsonText(e.target.value);
            setError('');
          }}
          className="text-input"
          style={{
            flex: 1,
            minHeight: '280px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            lineHeight: 1.5,
            whiteSpace: 'pre'
          }}
          spellCheck={false}
        />

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
          <button onClick={handleCopy} className="btn btn-ghost" style={{ fontSize: '13px' }}>
            {copied ? (
              <>
                <Check size={14} style={{ color: 'var(--winner-color)' }} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onClose} className="btn btn-ghost" style={{ fontSize: '13px' }}>
              Cancel
            </button>
            <button onClick={handleApply} className="btn btn-primary" style={{ fontSize: '13px' }}>
              <Upload size={14} />
              <span>Apply Payload</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
