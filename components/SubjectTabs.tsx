'use client';

interface SubjectTabsProps {
  selectedSubject: string | null;
  onSubjectChange: (subject: string) => void;
  grade: number;
}

export default function SubjectTabs({ selectedSubject, onSubjectChange, grade }: SubjectTabsProps) {
  const subjects = [
    { id: 'math', name: '🔢 Math', icon: '➗' },
    { id: 'science', name: '🧪 Science', icon: '🔬' },
    { id: 'english', name: '📖 English', icon: '✍️' },
    { id: 'history', name: '📜 History', icon: '🏛️' },
  ];

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-lg font-bold mb-4">📚 Choose a Subject</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSubjectChange(subject.id)}
            className={`p-4 rounded-lg font-semibold transition text-center ${
              selectedSubject === subject.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:shadow'
            }`}
          >
            <div className="text-2xl mb-1">{subject.icon}</div>
            <div>{subject.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
