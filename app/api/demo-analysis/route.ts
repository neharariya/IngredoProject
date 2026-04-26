import { NextResponse } from "next/server";

const demoResult = {
  category: "Moisturizing Cream",
  beneficial: [
    "Glycerin",
    "Dimethicone",
    "Vitamin E",
    "Shea Butter",
    "Hyaluronic Acid",
    "Squalane",
    "Aloe Vera",
    "Panthenol",
    "Ceramides",
    "Niacinamide",
  ],
  caution: [
    "Phenoxyethanol",
    "Fragrance",
    "Limonene",
    "Linalool",
    "Citronellol",
    "Alcohol Denat.",
    "BHT",
    "Colorants",
  ],
  harmful: [
    "Parabens",
    "Formaldehyde Donors",
  ],
  score: 6,
  summary:
    "Effective moisturizer with strong hydration; contains fragrance and controversial preservatives that sensitive users may avoid.",
  strengths: [
    {
      title: "Strong Moisturization",
      description:
        "Contains glycerin, mineral oil, petrolatum, and dimethicone which lock in moisture and hydrate skin.",
    },
    {
      title: "Skin Softening",
      description:
        "Fatty alcohols and stearic acid help smooth and soften the skin’s surface.",
    },
  ],
  weaknesses: [
    {
      title: "Paraben Preservatives",
      description:
        "Includes methylparaben and propylparaben, which are controversial and avoided by many consumers.",
    },
    {
      title: "Fragrance Allergens",
      description:
        "Perfume and compounds like limonene, linalool, and citronellol may cause irritation in sensitive skin.",
    },
  ],
  recommendations: [
    "Good option if you need an affordable, effective moisturizer.",
    "Avoid if you are sensitive to fragrance or prefer paraben-free products.",
  ],
  useCases: [
    "Daily moisturizer for dry or very dry skin",
    "Barrier cream for rough patches like elbows and heels",
    "Not ideal for sensitive or allergy-prone skin",
  ],
};

export async function GET() {
  return NextResponse.json(demoResult);
}
  