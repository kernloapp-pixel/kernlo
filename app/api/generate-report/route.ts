import { NextRequest, NextResponse } from "next/server";

interface ReportRequest {
  childName: string;
  subject: string;
  activity: string;
  duration: string;
  notes: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ReportRequest = await req.json();

    // Validate input
    if (!body.childName || !body.subject || !body.activity || !body.duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call OpenAI to generate report
    const prompt = `Generate a professional homeschool progress report based on this information:
    
Child's Name: ${body.childName}
Subject: ${body.subject}
Activity: ${body.activity}
Duration: ${body.duration} minutes
Additional Notes: ${body.notes || "None"}

Format the report professionally with:
1. A brief summary of what was covered
2. Skills developed
3. Time spent
4. Assessment/observations
5. Recommendations for next steps

Keep it concise but thorough (2-3 paragraphs).`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI error:", await response.text());
      return NextResponse.json(
        { error: "Failed to generate report" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const report = data.choices[0].message.content;

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
