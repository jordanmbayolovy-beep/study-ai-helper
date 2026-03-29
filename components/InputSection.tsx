'use client';

interface InputSectionProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onMakeNotes: () => void;
  onAnswerQuestion: () => void;
  onSolveMath: () => void;
  onParaphrase: () => void;
  isLoading: boolean;
  mode: 'notes' | 'math' | 'chat';
}

export default function InputSection({
  inputText,
  onInputChange,
  onMakeNotes,
  onAnswerQuestion,
  onSolveMath,
  onParaphrase,
  isLoading,
  mode,
}: InputSectionProps) {
  const getPlaceholder = () => {
    if (mode === 'math') {
      return 'Paste your math problem here... (e.g., Solve: 2x + 5 = 13)';
    }
    return 'Paste text, questions, or problems here... (minimum 10 characters)';
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold mb-4">
        {mode === 'math' ? '➗ Math Problem' : '✏️ What can we help with?'}
      </h3>

      {/* Text Input */}
      <textarea
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={getPlaceholder()}
        className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      {/* Character Count */}
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {inputText.length} characters
      </div>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          onClick={onMakeNotes}
          disabled={inputText.length < 10 || isLoading}
          className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          📌 Notes
        </button>

        <button
          onClick={onAnswerQuestion}
          disabled={inputText.length < 10 || isLoading}
          className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          ❓ Answer
        </button>

        <button
          onClick={onParaphrase}
          disabled={inputText.length < 10 || isLoading}
          className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          🔄 Rephrase
        </button>

        {mode === 'math' && (
          <button
            onClick={onSolveMath}
            disabled={inputText.length < 10 || isLoading}
            className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            ➗ Solve
          </button>
        )}
      </div>

      {/* "Explain Like I'm 10" Button */}
      <button className="mt-3 w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition">
        🍎 Explain Like I'm 10
      </button>
    </div>
  );
}
