'use client';

interface GradeSelectorProps {
  selectedGrade: number | null;
  onGradeChange: (grade: number) => void;
}

export default function GradeSelector({ selectedGrade, onGradeChange }: GradeSelectorProps) {
  const grades = Array.from({ length: 7 }, (_, i) => i + 6);

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">📚 Select Your Grade</h2>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {grades.map((grade) => (
          <button
            key={grade}
            onClick={() => onGradeChange(grade)}
            className={`px-3 py-2 rounded-lg font-semibold transition ${
              selectedGrade === grade
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:shadow'
            }`}
          >
            {grade}
          </button>
        ))}
      </div>
      {selectedGrade && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          ✅ Grade {selectedGrade} selected • All explanations will be tailored for you
        </p>
      )}
    </div>
  );
}
