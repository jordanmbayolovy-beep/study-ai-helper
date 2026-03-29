import { NextRequest, NextResponse } from 'next/server';

// Mock AI responses - in production, connect to OpenAI or similar
function getGradeAdjustedResponse(
  text: string,
  grade: number,
  action: string
): string {
  const gradeDescriptor = grade <= 8 ? 'simple and easy to understand' : 'detailed and advanced';

  const responses: { [key: string]: string } = {
    makeNotes: `📌 **Key Points:**
- Main concept: ${text.split(' ').slice(0, 5).join(' ')}...
- Important details identified
- Study tip: Break this into smaller parts

🧠 **Explanation (Grade ${grade} Level):**
This topic is explained in a ${gradeDescriptor} way. ${text.slice(0, 100)}...

✨ **Memory Tips:**
- Create flashcards for key terms
- Draw diagrams to visualize concepts
- Practice with similar problems`,

    answerQuestion: `❓ **Answer:**
Based on the content provided, the answer is: [Generated answer for your question]

🧠 **Explanation:**
Here's why this is the answer, explained at a Grade ${grade} level in a ${gradeDescriptor} manner.

📚 **Sources:**
- [Khan Academy](https://www.khanacademy.org)
- [Britannica](https://www.britannica.com)
- [Your textbook resource]`,

    solveMath: `➗ **Step-by-Step Solution:**

Step 1: Identify what we know
- Problem: ${text.slice(0, 50)}...

Step 2: Choose the right method
- Using [relevant formula/method]

Step 3: Calculate
- Calculation shown here

Step 4: Verify your answer
- Double-check complete

**Final Answer:** [Solution]

💡 **Why this works:**
Explained at Grade ${grade} level in a ${gradeDescriptor} way.`,

    paraphrase: `📝 **Paraphrased Version:**
"${text.slice(0, 100)}..." can be understood as:

In simpler terms: [Paraphrased version]

✨ **Key difference:**
The original uses complex terms, but the meaning is the same - just explained more clearly.`,
  };

  return responses[action] || 'Unable to process request';
}

export async function POST(request: NextRequest) {
  try {
    const { action, text, grade, subject } = await request.json();

    if (!text || !grade || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = getGradeAdjustedResponse(text, grade, action);

    return NextResponse.json({
      success: true,
      output: {
        type: action,
        content: response,
        grade,
        subject,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'AI processing failed' },
      { status: 500 }
    );
  }
}
