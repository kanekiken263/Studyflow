import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import IntegratedAiChat from '@/components/integrated-ai-chat';

export default function ChatbotPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Tutor - StudyFlow</title>
        <meta name="description" content="Get help with your studies from our AI tutor. Ask questions about math, physics, chemistry, biology, and more." />
      </Helmet>

      <Header />

      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">AI tutor</h1>
            <p className="text-muted-foreground">
              Ask questions about math, physics, chemistry, biology, and other subjects
            </p>
          </div>

          <div className="flex-1 bg-card rounded-2xl shadow-lg overflow-hidden">
            <IntegratedAiChat />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}