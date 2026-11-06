import React, { useState } from 'react';
import { Play, Sparkles, Loader2 } from 'lucide-react';

export default function InputSection({ onEvaluate, isEvaluating }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onEvaluate(inputText.trim());
    }
  };

  return (
    <section className="clean-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
            Challenge Input
          </h2>
          <span style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-dim)',
            background: 'var(--bg-surface-elevated)',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            PROMPT / PROBLEM
          </span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
          Enter a problem statement to simulate AI solutions and evaluation
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. Write a function to check if two strings are valid anagrams of each other..."
          rows={3}
          className="text-input"
          style={{ minHeight: '84px' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
          <button
            type="submit"
            disabled={!inputText.trim() || isEvaluating}
            className="btn btn-primary"
          >
            {isEvaluating ? (
              <>
                <Loader2 size={16} className="spinner" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Play size={15} />
                <span>Evaluate Solutions</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
