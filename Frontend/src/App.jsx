import React, { useState } from 'react';
import Navbar from './components/Navbar';
import InputSection from './components/InputSection';
import ProblemCard from './components/ProblemCard';
import SolutionsGrid from './components/SolutionsGrid';
import JudgeVerdict from './components/JudgeVerdict';
import JSONModal from './components/JSONModal';
import { PRESETS, defaultBattleData } from './data/presets';

export default function App() {
  const [battleData, setBattleData] = useState(defaultBattleData);
  const [activePresetId, setActivePresetId] = useState(PRESETS[0].id);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isJSONModalOpen, setIsJSONModalOpen] = useState(false);

  // Switch preset
  const handleSelectPreset = (presetId) => {
    const selected = PRESETS.find((p) => p.id === presetId);
    if (selected) {
      setBattleData(selected.data);
      setActivePresetId(presetId);
    }
  };

  // Evaluate a newly typed problem prompt
  const handleEvaluateProblem = (newProblem) => {
    setIsEvaluating(true);
    setActivePresetId(null);

    // Simulate AI generation and judge evaluation
    setTimeout(() => {
      // Generate realistic dual AI solutions based on the problem
      const newBattlePayload = {
        problem: newProblem,
        solution_1: `# Model Alpha Approach\ndef solve(input_data):\n    # Basic standard implementation\n    result = []\n    for item in input_data:\n        if item not in result:\n            result.append(item)\n    return result`,
        solution_2: `# Model Beta Approach\ndef solve(input_data: list) -> list:\n    # Optimized set-based approach preserving order\n    seen = set()\n    return [x for x in input_data if not (x in seen or seen.add(x))]`,
        judge: {
          solution_1_score: 82,
          solution_2_score: 96,
          solution_1_reasoning: "Correct implementation with O(n^2) time complexity due to list lookups. Simple to read but inefficient on larger inputs.",
          solution_2_reasoning: "Optimal O(n) approach leveraging set lookup while preserving insertion order in a clean one-liner with type annotations."
        }
      };

      setBattleData(newBattlePayload);
      setIsEvaluating(false);
    }, 900);
  };

  // Apply custom raw JSON object
  const handleApplyJSON = (customData) => {
    setBattleData(customData);
    setActivePresetId(null);
  };

  // Reset to default
  const handleReset = () => {
    setBattleData(defaultBattleData);
    setActivePresetId(PRESETS[0].id);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        onOpenJSON={() => setIsJSONModalOpen(true)}
        onReset={handleReset}
        activePresetId={activePresetId}
      />

      {/* Main Content Area */}
      <main className="max-w-content" style={{
        flex: 1,
        paddingTop: '28px',
        paddingBottom: '48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* 1. Input Section */}
        <InputSection
          currentProblem={battleData.problem}
          onEvaluate={handleEvaluateProblem}
          isEvaluating={isEvaluating}
        />

        {/* 2. Problem Statement Card */}
        <ProblemCard problem={battleData.problem} />

        {/* 3. Solutions Grid (Solution 1 vs Solution 2) */}
        <SolutionsGrid
          solution1={battleData.solution_1}
          solution2={battleData.solution_2}
          judge={battleData.judge}
        />

        {/* 4. Judge Verdict & Reasoning Card */}
        <JudgeVerdict judge={battleData.judge} />
      </main>

      {/* Raw JSON Schema Inspector Modal */}
      <JSONModal
        isOpen={isJSONModalOpen}
        onClose={() => setIsJSONModalOpen(false)}
        data={battleData}
        onApplyJSON={handleApplyJSON}
      />

      {/* Clean Minimal Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '20px 0',
        marginTop: 'auto'
      }}>
        <div className="max-w-content" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '13px',
          color: 'var(--text-dim)'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>AI Battle Arena</span> &mdash; Component-Based Evaluation Architecture
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
            Schema: &#123; problem, solution_1, solution_2, judge &#125;
          </div>
        </div>
      </footer>
    </div>
  );
}
