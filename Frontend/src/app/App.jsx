import React, { useState } from 'react';
import Navbar from './components/Navbar';
import InputSection from './components/InputSection';
import ProblemCard from './components/ProblemCard';
import SolutionsGrid from './components/SolutionsGrid';
import JudgeVerdict from './components/JudgeVerdict';
import axios from "axios"
import './App.css'

export default function App() {
  const [battleData, setBattleData] = useState(() => {
    const savedData = localStorage.getItem("data");
    if (!savedData) return null;

    try {
      const parsedData = JSON.parse(savedData);
      return parsedData?.problem ? parsedData : null;
    } catch (error) {
      console.error("Failed to parse saved battle data:", error);
      return null;
    }
  });
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [inputResetKey, setInputResetKey] = useState(0);

  const handleReset = () => {
    setBattleData(null);
    setInputResetKey((key) => key + 1);
    localStorage.removeItem("data");
  };

  // Evaluate a newly typed problem prompt
  const handleEvaluateProblem = async (newProblem) => {

    try{
      setIsEvaluating(true);

      const { data } = await axios.post('http://localhost:3000/invoke', {input: newProblem});

      // Simulate AI generation and judge evaluation
      // Generate realistic dual AI solutions based on the problem
      const newBattlePayload = {
        problem: data.result.problem ,
        solution_1: data.result.solution_1,
        solution_2: data.result.solution_2,
        judge: {
          solution_1_score: data.result.judge.solution_1_score,
          solution_2_score: data.result.judge.solution_2_score,
          solution_1_reasoning: data.result.judge.solution_1_reasoning,
          solution_2_reasoning: data.result.judge.solution_2_reasoning
        }
      };

      setBattleData(newBattlePayload);
      localStorage.setItem("data" , JSON.stringify(newBattlePayload))
      setIsEvaluating(false);
    }catch(error){
      setIsEvaluating(false)
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar onReset={handleReset} />

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
          key={inputResetKey}
          currentProblem={battleData?.problem}
          onEvaluate={handleEvaluateProblem}
          isEvaluating={isEvaluating}
        />

      { battleData?.problem && (
        <>
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
        </>)
      }

      </main>

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
        </div>
      </footer>
    </div>
  );
}
