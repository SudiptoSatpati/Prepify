import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function GET() {
  return Response.json({ success: true, data: "Thank you" }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    // Mock implementation for now
    // TODO: Implement proper Google Generative AI integration
    const mockQuestions = [
      `Tell me about your experience with ${
        techstack.split(",")[0] || "programming"
      }.`,
      `How do you handle challenging projects?`,
      `What's your approach to problem-solving?`,
      `Describe a situation where you had to work under pressure.`,
      `What are your strengths and weaknesses?`,
    ].slice(0, amount || 5);

    const questions = JSON.stringify(mockQuestions);

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}
