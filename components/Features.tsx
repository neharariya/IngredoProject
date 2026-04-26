'use client';

import React from 'react';
import { Brain, Camera, Search, BarChart3, GitCompare, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Ingredient Analysis',
    description: 'Advanced machine learning algorithms analyze ingredients instantly, providing comprehensive health insights backed by scientific research.',
    color: 'bg-blue-50 border-blue-200 text-blue-600'
  },
  {
    icon: BarChart3,
    title: 'Smart Health Score',
    description: 'Get a clear 1-10 rating system that summarizes product safety and benefits at a glance, making decisions easier.',
    color: 'bg-green-50 border-green-200 text-green-600'
  },
  {
    icon: Camera,
    title: 'Instant Photo Scan',
    description: 'Simply take a photo of any product label and our OCR technology extracts ingredients automatically for analysis.',
    color: 'bg-purple-50 border-purple-200 text-purple-600'
  },
  {
    icon: Search,
    title: 'Comprehensive Ingredient Glossary',
    description: 'Detailed explanations for each ingredient including benefits, risks, alternatives, and scientific backing.',
    color: 'bg-orange-50 border-orange-200 text-orange-600'
  },
  {
    icon: GitCompare,
    title: 'Product Comparisons',
    description: 'Compare multiple products side-by-side to find the healthiest options that match your specific needs and preferences.',
    color: 'bg-red-50 border-red-200 text-red-600'
  },
  {
    icon: Globe,
    title: 'Global Ingredient Database',
    description: 'Access to thousands of ingredients with region-specific regulations and safety standards from around the world.',
    color: 'bg-teal-50 border-teal-200 text-teal-600'
  }
];

export default function Features() {
  return React.createElement(
    'section',
    { id: 'features', className: 'py-24 bg-white' },
    React.createElement(
      'div',
      { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
      React.createElement(
        'div',
        { className: 'text-center mb-16' },
        React.createElement(
          'h2',
          { className: 'text-3xl lg:text-4xl font-bold text-gray-900 mb-6' },
          'Everything You Need for Smart Product Choices'
        ),
        React.createElement(
          'p',
          { className: 'text-xl text-gray-600 max-w-3xl mx-auto' },
          "Stop guessing about what's in your products. Get comprehensive ingredient analysis with our cutting-edge AI technology and make informed health decisions."
        )
      ),
      React.createElement(
        'div',
        { className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' },
        features.map((feature, index) => {
          const IconComponent = feature.icon;
          return React.createElement(
            Card,
            {
              key: index,
              className:
                'border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group'
            },
            React.createElement(
              CardHeader,
              { className: 'pb-4' },
              React.createElement(
                'div',
                {
                  className: `w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`
                },
                React.createElement(IconComponent, { className: 'h-7 w-7' })
              ),
              React.createElement(
                CardTitle,
                { className: 'text-xl font-bold text-gray-900' },
                feature.title
              )
            ),
            React.createElement(
              CardContent,
              null,
              React.createElement(
                'p',
                { className: 'text-gray-600 leading-relaxed' },
                feature.description
              )
            )
          );
        })
      ),
      // Additional Stats Section
      React.createElement(
        'div',
        { className: 'mt-24 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12' },
        React.createElement(
          'div',
          { className: 'grid md:grid-cols-4 gap-8 text-center' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'text-3xl font-bold text-blue-600 mb-2' },
              '50,000+'
            ),
            React.createElement(
              'div',
              { className: 'text-gray-600' },
              'Ingredients Analyzed'
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'text-3xl font-bold text-green-600 mb-2' },
              '98.5%'
            ),
            React.createElement(
              'div',
              { className: 'text-gray-600' },
              'Accuracy Rate'
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'text-3xl font-bold text-purple-600 mb-2' },
              '< 2s'
            ),
            React.createElement(
              'div',
              { className: 'text-gray-600' },
              'Analysis Time'
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'text-3xl font-bold text-orange-600 mb-2' },
              '24/7'
            ),
            React.createElement(
              'div',
              { className: 'text-gray-600' },
              'Available Access'
            )
          )
        )
      )
    )
  );
}