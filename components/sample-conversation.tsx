'use client'

import { useState } from 'react'

interface Message {
  sender: 'client' | 'yoram'
  content: string
  timestamp: string
  type?: 'text' | 'file' | 'link'
  metadata?: {
    fileType?: string
    fileName?: string
    url?: string
  }
}

const sampleData = {
  clientInfo: {
    name: 'יעקב ושרה',
    location: 'חולון',
    interest: 'השקעה בנדל"ן',
    budget: '1.35M ₪',
    source: 'המלצה מחבר',
    status: 'משקיע פוטנציאלי'
  },
  conversation: [
    {
      sender: 'client',
      content: 'היי יורם, שמעתי עליך מחבר שעבד איתך בעבר. אני שוקל להשקיע בנדל"ן באשקלון',
      timestamp: '10:30'
    },
    {
      sender: 'yoram',
      content: 'שלום וברוך הבא! יש לי פרויקט מעניין באזור "נווה ים" באשקלון. מדובר בבניין של 12 יחידות דיור בשלבי תכנון.',
      timestamp: '10:32'
    },
    {
      sender: 'yoram',
      type: 'file',
      content: 'הנה המצגת של הפרויקט',
      metadata: {
        fileType: 'PDF',
        fileName: 'נווה_ים_מצגת.pdf'
      },
      timestamp: '10:33'
    }
  ],
  analytics: {
    responseTime: '2.3 שעות',
    interestLevel: 'גבוה',
    closingProbability: '75%',
    nextSteps: [
      'תיאום פגישה',
      'שליחת תוכנית מימון',
      'סיור בפרויקט'
    ]
  }
}

export function SampleConversation() {
  const [activeTab, setActiveTab] = useState<'conversation' | 'analytics'>('conversation')

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-r-4 border-blue-500">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-700">{sampleData.clientInfo.name}</span>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {sampleData.clientInfo.status}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-gray-600">
          <div className="flex items-center gap-2 bg-blue-50 p-2 rounded">
            <span>{sampleData.clientInfo.location}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 p-2 rounded">
            <span>{sampleData.clientInfo.budget}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 p-2 rounded">
            <span>{sampleData.clientInfo.source}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md transition-all ${
            activeTab === 'conversation'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-blue-600 hover:bg-blue-50'
          }`}
          onClick={() => setActiveTab('conversation')}
        >
          שיחה
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-blue-600 hover:bg-blue-50'
          }`}
          onClick={() => setActiveTab('analytics')}
        >
          ניתוח
        </button>
      </div>

      {activeTab === 'conversation' ? (
        <div className="h-[400px] overflow-y-auto bg-white rounded-lg shadow-md p-4">
          <div className="space-y-4">
            {sampleData.conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'client' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                    message.sender === 'client'
                      ? 'bg-white border border-gray-200'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-medium ${message.sender === 'client' ? 'text-blue-600' : 'text-white'}`}>
                      {message.sender === 'client' ? 'לקוח' : 'יורם'}
                    </span>
                    <span className={`text-xs ${message.sender === 'client' ? 'text-gray-500' : 'text-blue-100'}`}>
                      {message.timestamp}
                    </span>
                  </div>
                  <p>{message.content}</p>
                  {message.type === 'file' && message.metadata && (
                    <div className="mt-2 p-2 bg-white rounded flex items-center gap-2 border border-blue-200">
                      <div className="text-sm text-blue-600">{message.metadata.fileName}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700">זמן תגובה ממוצע</span>
              <span className="font-medium text-blue-800">{sampleData.analytics.responseTime}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700">סיכויי סגירה</span>
              <span className="font-medium text-blue-800">{sampleData.analytics.closingProbability}</span>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h4 className="mb-3 font-medium text-blue-800">צעדים הבאים:</h4>
              <ul className="space-y-2">
                {sampleData.analytics.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-blue-500">•</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
