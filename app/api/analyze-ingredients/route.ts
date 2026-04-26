import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// In-memory rate limiter (per IP, 24h window)
const rateLimitWindowMs = 24 * 60 * 60 * 1000; // 24 hours
const maxRequests = 50;
const requestCounts = new Map<string, { count: number; timestamp: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return { success: true, remaining: maxRequests - 1 };
  }

  if (now - entry.timestamp > rateLimitWindowMs) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return { success: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return {
      success: false,
      retryAfter: rateLimitWindowMs - (now - entry.timestamp),
      remaining: 0,
    };
  }

  entry.count++;
  return { success: true, remaining: maxRequests - entry.count };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Identify client by IP
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit
    const limit = rateLimit(ip);
    if (!limit.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Try again later.",
          remaining: limit.remaining,
          retryAfterMs: limit.retryAfter,
        },
        { status: 429 }
      );
    }

    // Parse request
    const { ingredientsText } = await request.json();

    if (!ingredientsText || typeof ingredientsText !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid required field: ingredientsText" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Prompt for ingredient analysis
    const prompt = `
    You are an expert cosmetic chemist and health scientist.  

    before analysing the text, check : decide if this text looks like an ingredients list from a product (like food, cosmetics). 
    If the text does not include eatable items name or scientific names of chemicals, respond in JSON like this:
    {
       "error": "Not a product Ingredients list"
    }

    if it is ingredients, then continue:


  - Identify and count:
  - Beneficial ingredients (natural, safe, effective).
  - Caution ingredients (mild concerns, may cause issues for some).
  - Harmful ingredients (controversial, irritating, or unsafe).
  - product category
- Provide an overall health score (0 = very poor, 10 = excellent).
- Write a short 1–2 sentence consumer-friendly summary.
- List Strengths (positive qualities of the formula).
- List Weaknesses (limitations or concerns).
- Give clear Recommendations for consumers.
- Suggest possible Use Cases (e.g., "good for dry skin", "not for sensitive skin").

Ingredients:
${ingredientsText}

Respond ONLY in this JSON format:
{
  "category" : "",
  "beneficial": [ "Vitamin E", "Aloe Vera", ... ],
  "caution": [ "Fragrance", ... ],
  "harmful": [ "Parabens", ... ],
  "score": number (0-10),
  "summary": "short consumer-friendly overview",
  "strengths": [
    { "title": "Rich in Antioxidants", "description": "Contains Vitamin E and botanical extracts that protect against environmental damage" },
    { "title": "Deeply Moisturizing", "description": "Natural oils and hyaluronic acid provide hydration without clogging pores" }
  ],
  "weaknesses": [
    { "title": "Contains Fragrance", "description": "May cause irritation for sensitive skin types" }
  ],
  "recommendations": [
    "Best for normal to dry skin types",
    "Avoid if you have fragrance allergies"
  ],
  "useCases": [
    "Daily moisturizer for dry climates",
    "Suitable under makeup"
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert cosmetic chemist and health scientist. Analyze product ingredients for consumer safety and health.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 400,
      temperature: 0.3,
    });

    // Try to extract JSON from the response
    let result = {
      beneficial: [],
      harmful: [],
      score: 0,
      summary: "",
    };

    const content = completion.choices[0]?.message?.content || "";
    try {
      // Try to extract JSON block from the response
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        result = JSON.parse(match[0]);
      }
    } catch (e) {
      // fallback: leave result as default
    }

    return NextResponse.json({
      ...result,
      success: true,
      remaining: limit.remaining,
    });
  } catch (error) {
    console.error("Error analyzing ingredients:", error);
    return NextResponse.json(
      { error: "Failed to analyze ingredients" },
      { status: 500 }
    );
  }
}