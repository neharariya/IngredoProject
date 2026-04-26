'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Check, Shield, Zap, AlertTriangle, TrendingDown, Star, TrendingUp, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { extractTextFromImage, validateImageFile } from '@/lib/ocr';
// import demoResult from '@/api/demo-analysis';

// type AnalysisResult = {
//   beneficial: string[];
//   harmful: string[];
//   score: number;
//   summary: string;
// };

type AnalysisResult = {
  category: string;
  beneficial: string[];
  caution: string[];
  harmful: string[];
  score: number;
  strengths: { title: string; description: string }[];
  weaknesses: { title: string; description: string }[];
  recommendations: string[];
  useCases: string[];
  summary?: string;
};

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isdemoAnalyzing, setIsDemoAnalyzing] = useState(false);
  const [isuploadAnalyzing, setIsUploadAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('strengths');
  // Add a new state to track the current mode
  const [previewMode, setPreviewMode] = useState<'default' | 'demo' | 'upload'>('default');
  // Remove the expandedLists state and toggleList function as we'll use Accordion

  // Simulate API endpoint
  const API_ENDPOINT = '/api/analyze-ingredients';
  const DEMO_IMAGE_URL = '/demo/Vaseline-Ingredients.jpg';

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setIsUploadAnalyzing(true);
    setAnalysis(null);
    setPreviewMode('upload'); // Set to upload mode

    // Create URL for image preview
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);

    try {
      // Validate the image file using our utility
      validateImageFile(file);

      // Use our OCR utility to extract text from the image
      const extractedText = await extractTextFromImage(file);

      if (!extractedText || extractedText.trim().length === 0) {
        throw new Error('No text detected in the image. Please try a clearer photo.');
      }

      // Send the extracted ingredients text to the API
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredientsText: extractedText })
      });

      if (!res.ok) throw new Error('Failed to analyze ingredients');
      
      const data = await res.json();
      console.log('/////res', res, '////data', data);
      
      setAnalysis({
        category: (data.category) ? data.category : '',
        beneficial: Array.isArray(data.beneficial) ? data.beneficial : [],
        caution: Array.isArray(data.caution) ? data.caution : [],
        harmful: Array.isArray(data.harmful) ? data.harmful : [],
        score: typeof data.score === "number" ? data.score : 0,
        // If the arrays exist, use them. Otherwise, set to empty array []
        strengths: Array.isArray(data.strengths) ? data.strengths : [],
        weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses : [],
        recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
        useCases: Array.isArray(data.useCases) ? data.useCases : [],
        summary: typeof data.summary === 'string' ? data.summary : undefined,
      });

      if(data.error){
        setError(data.error);
        throw new Error(data.error);
      }

    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setIsUploadAnalyzing(false);
    }
  };

  
  // Cleanup function to revoke object URL when component unmounts
  useEffect(() => {
    return () => {
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl);
      }
    };
  }, [uploadedImageUrl]);

  const handleDemoClick = async () => {
    setError(null);
    setIsDemoAnalyzing(true);
    setAnalysis(null);
    setPreviewMode('demo'); // Set to demo mode
    setUploadedImageUrl(DEMO_IMAGE_URL);

    try {
      const res = await fetch('/api/demo-analysis', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to fetch demo analysis');
      const data = await res.json();

      setAnalysis({
        category: (data.category) ? data.category : '',
        beneficial: Array.isArray(data.beneficial) ? data.beneficial : [],
        caution: Array.isArray(data.caution) ? data.caution : [],
        harmful: Array.isArray(data.harmful) ? data.harmful : [],
        score: typeof data.score === "number" ? data.score : 0,
        strengths: Array.isArray(data.strengths) ? data.strengths : [],
        weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses : [],
        recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
        useCases: Array.isArray(data.useCases) ? data.useCases : [],
        summary: typeof data.summary === 'string' ? data.summary : undefined,
      });
      
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setIsDemoAnalyzing(false);
    }
  };

  // The toggleList function is no longer needed as Accordion handles expansion

  return (
    <section className="pt-20 pb-15 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center -mt-10 px-2 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
            <Zap className="h-4 w-4 mr-2" />
            AI-Powered Ingredient Analysis
          </div>

          {/* Headlines */}
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Know What's Inside Your
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"> Products</span>
            <br />in Seconds
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            AI-powered ingredient analysis that reveals harmful & beneficial ingredients instantly.
            Make informed choices about your health and wellness.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              aria-label="Upload product label image"
            />
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleUploadClick}
              disabled={isuploadAnalyzing}
            >
              <Upload className={`h-5 w-5 mr-3 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
              {isuploadAnalyzing ? 'Analyzing...' : 'Upload Ingredients Photo'}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:border-blue-300"
              onClick={handleDemoClick}
              disabled={isdemoAnalyzing}
            >
              <Play className="h-5 w-5 mr-3" />
              {isdemoAnalyzing ? 'Analyzing...' : 'Try Demo Analysis'}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-500" />
              Instant AI analysis
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-500" />
              Backed by science
            </div>
          </div>
        </div>

        {/* Product Mockup */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 transform transition-transform duration-500 hover:scale-105">
            <div className="space-y-4">
              {/* Product Image Mockup */}
              <div className="relative">
                {uploadedImageUrl ? (
                  // Show uploaded image
                  <div className="relative">
                    <img
                      src={uploadedImageUrl}
                      alt="Uploaded product label"
                      className="w-full h-64 object-contain rounded-xl border-2 border-gray-200 bg-gray-50"
                    />
                    {/* Overlay with upload button for changing image */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                      <button
                        onClick={handleUploadClick}
                        className="opacity-0 hover:opacity-100 bg-white bg-opacity-90 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-opacity duration-300"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  // Show upload placeholder
                  <div
                    className="bg-gray-100 rounded-xl p-6 h-64 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                    onClick={handleUploadClick}
                    tabIndex={0}
                    role="button"
                    aria-label="Upload product label image"
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') handleUploadClick();
                    }}
                  >
                    <div className="text-center">
                      <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">Product Label Image</p>
                      <p className="text-sm text-gray-400 mt-2">Upload or drag & drop</p>
                    </div>
                  </div>
                )}
                {/* Analysis Overlay */}
                {(isdemoAnalyzing || isuploadAnalyzing|| analysis) && (
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isdemoAnalyzing || isuploadAnalyzing? 'bg-green-400 animate-pulse' : 'bg-green-500'}`}></div>
                      <span className="text-sm font-medium text-gray-700">
                        {isdemoAnalyzing || isuploadAnalyzing? 'Analyzing...' : 'Analysis Complete'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Display - Now below the image */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Preview Section - Separated from upload box */}
        {previewMode!= 'default' && !error &&  !isdemoAnalyzing &&  !isuploadAnalyzing && <LivePreviewSection 
          analysis={analysis} 
          isdemoAnalyzing={isdemoAnalyzing} 
          isuploadAnalyzing = {isuploadAnalyzing}
          previewMode={previewMode}
          activeTab = {activeTab}
          setActiveTab={setActiveTab}
          // expandedLists={expandedLists} // Removed as Accordion handles expansion
          // toggleList={toggleList} // Removed as Accordion handles expansion
        />}
      </div>
    </section>
  );
}

// Separate Live Preview Component
function LivePreviewSection({ 
  analysis, 
  isdemoAnalyzing,
  isuploadAnalyzing, 
  previewMode,
  activeTab,
  setActiveTab,
  // expandedLists, // Removed as Accordion handles expansion
  // toggleList // Removed as Accordion handles expansion
}: { 
  analysis: AnalysisResult | null; 
  isdemoAnalyzing: boolean; 
  isuploadAnalyzing: boolean;
  previewMode: 'default' | 'demo' | 'upload'; 
  activeTab: string;
  setActiveTab: (value: string) => void;
  // expandedLists: { beneficial: boolean; caution: boolean; harmful: boolean }; // Removed as Accordion handles expansion
  // toggleList: (listType: 'beneficial' | 'caution' | 'harmful') => void; // Removed as Accordion handles expansion
}) {
  return (
    <section className=" pt-20 pb-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            See our AI in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Live results from your product analysis
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="shadow-2xl border-0 overflow-hidden bg-white rounded-xl">
            <div className="bg-white border-b border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {previewMode === 'demo' && 'Demo Product Analysis'}
                    {previewMode === 'upload' && 'Your Product Analysis'}
                  </h3>
                  <p className="text-gray-600">
                    {previewMode === 'demo' && (analysis?.summary || 'AI-powered demo analysis')}
                    {previewMode === 'upload' && (analysis?.summary || 'AI-powered analysis of your uploaded image')}
                  </p>
                </div>
                <div className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded whitespace-nowrap">
                  Available Now
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Quick Overview */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {previewMode === 'demo' ? 'Vaseline Cream' : analysis?.category}
                      </h4>
                    <p className="text-gray-600">our product analysis</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold text-gray-900">{(analysis?.score)}</span>
                      <span className="text-gray-600">/10</span>
                    </div>
                    <p className="text-sm text-gray-500">Health Rating</p>
                  </div>
                </div>

              <Accordion type="single" collapsible className=" grid md:grid-cols-3 gap-4 w-full">
                {/* <div className="grid md:grid-cols-3 gap-4"> */}
                  {/* Beneficial Ingredients */}
                  
                    {/* <div className=""> */}
                    
                      <AccordionItem value="beneficial" className="bg-green-50 rounded-lg border border-green-200 h-fit">
                        <AccordionTrigger className="flex items-center justify-between p-3 cursor-pointer hover:bg-green-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-semibold text-green-900">{analysis?.beneficial?.length || 0} Beneficial</p>
                              <p className="text-xs text-green-700">Good ingredients</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-3 border-t border-green-200 bg-green-25">
                          <ul className="mt-2 space-y-1">
                            {analysis?.beneficial?.map((ingredient, index) => (
                              <li key={index} className="text-sm text-green-800 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                {ingredient}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    {/* </Accordion> */}
                  {/* </div> */}

                  {/* Caution Ingredients */}
                  {/* <div className=""> */}
                    {/* <Accordion type="single" collapsible className="w-full"> */}
                      <AccordionItem value="caution" className=" bg-yellow-50 rounded-lg border border-yellow-200 h-fit">
                        <AccordionTrigger className="flex items-center justify-between p-3 cursor-pointer hover:bg-yellow-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <div>
                              <p className="font-semibold text-yellow-900">{analysis?.caution?.length || 0} Caution</p>
                              <p className="text-xs text-yellow-700">Mild concerns</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-3 border-t border-yellow-200 bg-yellow-25">
                          <ul className="mt-2 space-y-1">
                            {analysis?.caution?.map((ingredient, index) => (
                              <li key={index} className="text-sm text-yellow-800 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                                {ingredient}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    {/* </Accordion> */}
                  {/* </div> */}

                  {/* Harmful Ingredients */}
                  {/* <div className=""> */}
                    {/* <Accordion type="single" collapsible className="w-full"> */}
                      <AccordionItem value="harmful" className="bg-red-50 rounded-lg border border-red-200 h-fit">
                        <AccordionTrigger className="flex items-center justify-between p-3 cursor-pointer hover:bg-red-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <TrendingDown className="h-5 w-5 text-red-600" />
                            <div>
                              <p className="font-semibold text-red-900">{analysis?.harmful?.length || 0} Harmful</p>
                              <p className="text-xs text-red-700">Avoid if sensitive</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-3 border-t border-red-200 bg-red-25">
                          <ul className="mt-2 space-y-1">
                            {analysis?.harmful?.map((ingredient, index) => (
                              <li key={index} className="text-sm text-red-800 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                {ingredient}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    
                  {/* </div> */}
                 
                {/* </div> */}
                </Accordion>
              </div>

              {/* Analysis Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="strengths" className="data-[state=active]:bg-white font-medium">
                    Strengths
                  </TabsTrigger>
                  <TabsTrigger value="weaknesses" className="data-[state=active]:bg-white font-medium">
                    Weaknesses
                  </TabsTrigger>
                  <TabsTrigger value="recommendations" className="data-[state=active]:bg-white font-medium">
                    Recommendations
                  </TabsTrigger>
                  <TabsTrigger value="uses" className="data-[state=active]:bg-white font-medium">
                    Use Cases
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="strengths" className="space-y-4">
                  {analysis?.strengths?.length && (
                    <div className="grid gap-4">
                      {analysis.strengths.map((s, i) => (
                        <div key={`str-${i}`} className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-semibold text-green-900 mb-1">{s.title}</h4>
                            <p className="text-sm text-green-800">{s.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="weaknesses" className="space-y-4">
                  {analysis?.weaknesses?.length && (
                    <div className="grid gap-4">
                      {analysis.weaknesses.map((w, i) => (
                        <div key={`weak-${i}`} className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
                          <div>
                            <h4 className="font-semibold text-red-900 mb-1">{w.title}</h4>
                            <p className="text-sm text-red-800">{w.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  {analysis?.recommendations?.length && (
                    <div className="grid gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          {analysis.recommendations.map((r, i) => (
                            <li key={`rec-${i}`}>• {r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="uses" className="space-y-4">
                  {analysis?.useCases?.length && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Ideal Applications</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {analysis.useCases.map((u, i) => (
                            <li key={`use-${i}`}>• {u}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) }
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}