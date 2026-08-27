import React from 'react';
import SolutionCard from './SolutionCard';

export default function SolutionsGrid({ solution1, solution2, judge }) {
  const score1 = judge?.solution_1_score ?? 0;
  const score2 = judge?.solution_2_score ?? 0;

  const isSol1Winner = score1 > score2;
  const isSol2Winner = score2 > score1;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '16px',
      width: '100%'
    }}>
      <SolutionCard
        title="Solution 1"
        modelName="Model Alpha"
        code={solution1}
        score={score1}
        isWinner={isSol1Winner}
        variant="sol1"
      />
      <SolutionCard
        title="Solution 2"
        modelName="Model Beta"
        code={solution2}
        score={score2}
        isWinner={isSol2Winner}
        variant="sol2"
      />
    </div>
  );
}
