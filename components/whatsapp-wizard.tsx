'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const WhatsAppWizard = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const demoClient = {
    name: 'יעקב ושרה',
    joinDate: '01.01.2024',
    status: 'לקוח פעיל',
    location: 'חולון',
  };

  const handleClientSelect = async () => {
    console.log('Starting client selection process...');
    setIsUploading(true);
    setProcessingStage('טוען');
    setProgress(0);
    setShowProfile(false);

    try {
      // שלב ראשון - טעינה עד 40%
      for (let i = 0; i <= 40; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(i);
        console.log(`Loading progress: ${i}%`);
      }

      // שלב שני - עיבוד עד 99%
      setProcessingStage('מעבד');
      for (let i = 41; i <= 99; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(i);
        console.log(`Processing progress: ${i}%`);
      }

      // סיום התהליך
      await new Promise(resolve => setTimeout(resolve, 500));
      setProcessingStage('הפעולה הסתיימה בהצלחה');
      setProgress(100);
      console.log('Process completed successfully');
      
      // הצגת פרופיל הלקוח
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowProfile(true);
    } catch (error) {
      console.error('Error in client selection:', error);
      setError('אירעה שגיאה בתהליך הטעינה');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">ניתוח שיחות ומעקב לקוחות לאנשי נדל"ן</h1>
          <p className="text-gray-600">עבור: יורם חדד | גרסת הדגמה</p>
        </div>

        <Button
          onClick={handleClientSelect}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-6 rounded-lg flex items-center gap-2 transition-colors mb-4 text-lg"
          disabled={isUploading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
          </svg>
          {demoClient.name} ({demoClient.location})
        </Button>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {isUploading && (
          <Card className="p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{processingStage}</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} max={100} className="h-2" />
          </Card>
        )}

        {showProfile && (
          <Card className="mt-8 p-6">
            <h2 className="text-2xl font-bold mb-6">פרופיל לקוח</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">שם הלקוח:</span>
                <span>{demoClient.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">תאריך הצטרפות:</span>
                <span>{demoClient.joinDate}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">סטטוס:</span>
                <span className="text-green-600 font-medium">{demoClient.status}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">מיקום:</span>
                <span>{demoClient.location}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WhatsAppWizard;