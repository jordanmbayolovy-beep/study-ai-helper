'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GradeSelector from '@/components/GradeSelector';
import SubjectTabs from '@/components/SubjectTabs';
import InputSection from '@/components/InputSection';
import OutputSection from '@/components/OutputSection';
import Chatbot from '@/components/ChatBot';
import UpgradeModal from '@/components/UpgradeModal';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useStudentStore } from '@/lib/store';

export default function Dashboard() {
  const {
    grade,
    subject,
    subscriptionStatus,
    usageStats,
    setGrade,
    setSubject,
  } = useStudentStore();

  const [mode, setMode] = useState<'notes' | 'math' | 'chat'>('notes');
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load user data from localStorage
    const savedGrade = localStorage.getItem('selectedGrade');
    if (savedGrade) {
      setGrade(Number(savedGrade));
    }
  }, []);

  const handleMakeNotes = async () => {
    if (!grade) {
      setError('Please select a grade level');
      return;
    }

    if (usageStats.notesUsed >= 15 && subscriptionStatus === 'free') {
      setShowUpgradeModal(true);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'makeNotes',
          text: inputText,
          grade,
          subject,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setOutput(data.output);
      } else {
        setError(data.error || 'Failed to generate notes');
      }
    } catch (err) {
      setError('Error processing request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerQuestion = async () => {
    if (!grade) {
      setError('Please select a grade level');
      return;
    }

    if (usageStats.questionsUsed >= 20 && subscriptionStatus === 'free') {
      setShowUpgradeModal(true);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'answerQuestion',
          text: inputText,
          grade,
          subject,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setOutput(data.output);
      } else {
        setError(data.error || 'Failed to answer question');
      }
    } catch (err) {
      setError('Error processing request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSolveMath = async () => {
    if (!grade) {
      setError('Please select a grade level');
      return;
    }

    if (usageStats.mathUsed >= 20 && subscriptionStatus === 'free') {
      setShowUpgradeModal(true);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'solveMath',
          text: inputText,
          grade,
          subject: 'Math',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setOutput(data.output);
      } else {
        setError(data.error || 'Failed to solve math problem');
      }
    } catch (err) {
      setError('Error processing request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleParaphrase = async () => {
    if (!grade) {
      setError('Please select a grade level');
      return;
    }

    if (usageStats.paraphrasesUsed >= 15 && subscriptionStatus === 'free') {
      setShowUpgradeModal(true);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'paraphrase',
          text: inputText,
          grade,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setOutput(data.output);
      } else {
        setError(data.error || 'Failed to paraphrase');
      }
    } catch (err) {
      setError('Error processing request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Grade and Subject Selection */}
        <div className="mb-8">
          <GradeSelector selectedGrade={grade} onGradeChange={setGrade} />
          {grade && <SubjectTabs selectedSubject={subject} onSubjectChange={setSubject} grade={grade} />}
        </div>

        {/* Mode Tabs */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {['notes', 'math', 'chat'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                mode === m
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:shadow'
              }`}
            >
              {m === 'notes' ? '📝 Notes' : m === 'math' ? '➗ Math' : '💬 Chat'}
            </button>
          ))}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            {mode !== 'chat' && (
              <InputSection
                inputText={inputText}
                onInputChange={setInputText}
                onMakeNotes={handleMakeNotes}
                onAnswerQuestion={handleAnswerQuestion}
                onSolveMath={handleSolveMath}
                onParaphrase={handleParaphrase}
                isLoading={isLoading}
                mode={mode}
              />
            )}
          </div>

          {/* Usage Stats */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              📊 Usage Stats
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Questions</span>
                  <span>{subscriptionStatus === 'free' ? `${usageStats.questionsUsed}/20 today` : 'Unlimited'}</span>
                </div>
                {subscriptionStatus === 'free' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(usageStats.questionsUsed / 20) * 100}%` }}
                    />
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Notes</span>
                  <span>{subscriptionStatus === 'free' ? `${usageStats.notesUsed}/15 today` : 'Unlimited'}</span>
                </div>
                {subscriptionStatus === 'free' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(usageStats.notesUsed / 15) * 100}%` }}
                    />
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Math</span>
                  <span>{subscriptionStatus === 'free' ? `${usageStats.mathUsed}/20 today` : 'Unlimited'}</span>
                </div>
                {subscriptionStatus === 'free' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(usageStats.mathUsed / 20) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {subscriptionStatus === 'free' && (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition"
              >
                🚀 Upgrade to Pro
              </button>
            )}
          </div>
        </div>

        {/* Output Section */}
        {output && mode !== 'chat' && (
          <div className="mt-8">
            <OutputSection output={output} />
          </div>
        )}

        {/* Chatbot */}
        {mode === 'chat' && (
          <div className="mt-8">
            <ChatBot grade={grade} subject={subject} />
          </div>
        )}

        {/* Loading Animation */}
        {isLoading && <LoadingAnimation />}

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
        )}
      </div>
      <Footer />
    </div>
  );
}
