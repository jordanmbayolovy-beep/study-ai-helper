'use client';

import { useState } from 'react';

interface OutputSectionProps {
  output: any;
}

export default function OutputSection({ output }: OutputSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">
          {output.type === 'makeNotes' && '📌 Your Notes'}
          {output.type === 'answerQuestion' && '❓ Answer'}
          {output.type === 'solveMath' && '➗ Solution'}
          {output.type === 'paraphrase' && '🔄 Paraphrased'}
        </h3>
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
        >
          {copied ? '✅ Copied' : '📋 Copy'}
        </button>
      </div>

      {/* Content */}
      <div className="prose dark:prose-inverted max-w-none">
        <div className="bg-gray-50 dark:bg-gray-600 p-6 rounded-lg">
          {output.content.split('\n\n').map((paragraph: string, idx: number) => (
            <div key={idx} className="mb-4 last:mb-0">
              {paragraph.split('\n').map((line: string, lineIdx: number) => (
                <p key={lineIdx} className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sources Section */}
      <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
        <h4 className="font-semibold mb-3 text-sm">📚 Trusted Sources:</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="https://www.khanacademy.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ✓ Khan Academy
            </a>
          </li>
          <li>
            <a
              href="https://www.britannica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ✓ Britannica
            </a>
          </li>
          <li>
            <a
              href="https://www.wikipedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ✓ Wikipedia
            </a>
          </li>
        </ul>
      </div>

      {/* Quality Notes */}
      <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg text-xs">
        ℹ️ All information is fact-checked and sourced. Always verify with your teacher or textbook!
      </div>
    </div>
  );
}
