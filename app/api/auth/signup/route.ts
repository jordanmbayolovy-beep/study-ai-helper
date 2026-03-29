import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '@/lib/mockDatabase';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, grade } = await request.json();

    // Check if user exists
    if (users.find((u) => u.email === email)) {
      return NextResponse.json({ success: false, error: 'Email already in use' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      grade,
      subscriptionStatus: 'free',
      usageStats: {
        questionsUsed: 0,
        notesUsed: 0,
        paraphrasesUsed: 0,
        mathUsed: 0,
      },
      createdAt: new Date(),
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        grade: newUser.grade,
        subscriptionStatus: newUser.subscriptionStatus,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Signup failed' }, { status: 500 });
  }
}
