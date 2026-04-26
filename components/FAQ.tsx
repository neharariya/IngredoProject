'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does Ingredo work?',
    answer: 'Ingredo uses advanced AI and machine learning to analyze ingredient lists from product photos or manual input. Our system cross-references ingredients against scientific databases to provide health scores, identify beneficial and harmful components, and offer personalized recommendations based on your specific needs and sensitivities.'
  },
  {
    question: 'Is the ingredient data reliable?',
    answer: 'Yes, our ingredient database is built from peer-reviewed scientific studies, regulatory data from FDA, EMA, and other health authorities worldwide. We continuously update our database with the latest research and maintain a 98.5% accuracy rate through regular validation and expert review.'
  },
  {
    question: 'Can it scan food and skincare products?',
    answer: 'Absolutely! Ingredo works with all types of consumer products including food, beverages, skincare, cosmetics, cleaning products, supplements, and more. Our AI is trained on diverse product categories and can identify ingredients across different industries.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time with no questions asked. Your subscription will remain active until the end of your current billing period, and you\'ll retain access to all features during that time. No cancellation fees or hidden charges.'
  },
  {
    question: 'What makes Ingredo different from reading labels myself?',
    answer: 'While you can read ingredient labels, Ingredo provides instant access to scientific research, health implications, interaction warnings, and personalized recommendations that would take hours to research manually. Our AI also identifies ingredients by alternative names and provides context you might miss.'
  },
  {
    question: 'How accurate is the OCR technology?',
    answer: 'Our OCR (Optical Character Recognition) technology has over 95% accuracy rate for ingredient extraction from product photos. It works with various lighting conditions, angles, and image qualities. For best results, we recommend clear, well-lit photos of ingredient labels.'
  },
  {
    question: 'Do you store my personal health information?',
    answer: 'We prioritize your privacy and security. We only store the minimum data necessary to provide our services, and all data is encrypted and securely stored. You can delete your data at any time, and we never sell personal information to third parties.'
  },
  {
    question: 'Is there a mobile app available?',
    answer: 'Yes, Ingredo is available as a mobile app for both iOS and Android devices, as well as a web application. The mobile app includes camera scanning features for easy ingredient analysis on-the-go.'
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Ingredo and ingredient analysis
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <AccordionTrigger className="py-6 text-left text-lg font-semibold text-gray-900 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                {faq.question}
                {/* <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" /> */}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Supercharge Your Health Strategy?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join health professionals using Ingredo to make better product recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
                Get Started Free →
              </button>
              <button className="border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors">
                Sign in with Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 1. Identify and list the most beneficial ingredients for skin/hair/health (with a focus on natural, safe, and effective components).
// 2. Identify and list any potentially harmful, irritating, or controversial ingredients (e.g., parabens, sulfates, artificial fragrances, etc).
// 3. Give a health score from 0 (very poor) to 10 (excellent) for the overall ingredient list.
// 4. Write a 1-2 sentence summary of your analysis for a consumer.

// Ingredients:
// ${ingredientsText}

// Respond in this JSON format:
// {
//   "beneficial": [array of beneficial ingredient names],
//   "harmful": [array of potentially harmful ingredient names],
//   "score": number (0-10),
//   "summary": string
// }


