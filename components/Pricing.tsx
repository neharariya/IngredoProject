'use client';

import { Check, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Free Trial',
    price: '$0',
    period: '/month',
    description: 'Perfect for trying out Ingredo',
    badge: null,
    features: [
      'Upload 3 products/month',
      'Basic harmful/beneficial analysis',
      'Health score rating',
      'Email alerts for new scans',
      'Mobile app access',
      'Community support'
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'outline' as const,
    popular: false
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'Most cost-effective than traditional SEO tooling',
    badge: 'MOST POPULAR',
    features: [
      'Unlimited product scans',
      'Detailed ingredient breakdowns',
      'Product comparison tool',
      'Personalized recommendations',
      'Full ingredient glossary',
      'Priority support',
      'Export detailed reports',
      'Advanced filtering options'
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'default' as const,
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'Advanced features for power users',
    badge: null,
    features: [
      'Everything in Pro',
      'API access for integrations',
      'Custom health scoring',
      'Bulk product analysis',
      'White-label options',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantees'
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'outline' as const,
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            More cost-effective than traditional health consultations. Start free and scale your SEO strategy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button 
                  className={`w-full py-3 font-semibold ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  variant={plan.buttonVariant}
                >
                  {plan.popular && <Star className="h-4 w-4 mr-2" />}
                  {plan.buttonText}
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Make Smarter Health Choices?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of health-conscious users making informed product decisions
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Zap className="h-5 w-5 mr-3" />
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}