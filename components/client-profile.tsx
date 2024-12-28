'use client'

import { useState } from 'react'

const clientData = {
  personalInfo: {
    name: 'שרה ויעקב',
    phone: '0541234567',
    dealDate: '28.12.2023',
    profit: {
      amount: '30,000$',
      percentage: '10%',
      days: 9
    },
    lastPayment: 'טרם שולם'
  },
  analysis: {
    summary: {
      totalMessages: 156,
      averageResponseTime: '2.3 שעות',
      dealProbability: '85%',
      clientInterest: 'גבוה מאוד'
    },
    keyMetrics: [
      {
        title: 'רמת מעורבות',
        value: '92%',
        trend: 'up',
        description: 'תגובות מהירות ושאלות ענייניות'
      },
      {
        title: 'פוטנציאל השקעה',
        value: '250,000$',
        trend: 'up',
        description: 'מוכנות להשקעה נוספת'
      },
      {
        title: 'זמן לסגירת עסקה',
        value: '9 ימים',
        trend: 'down',
        description: 'מהיר מהממוצע ב-50%'
      }
    ],
    timeline: [
      {
        date: '20.12.2023',
        event: 'יצירת קשר ראשוני',
        details: 'התעניינות בפרויקט נווה ים'
      },
      {
        date: '22.12.2023',
        event: 'פגישת זום',
        details: 'הצגת תוכניות ומחירים'
      },
      {
        date: '25.12.2023',
        event: 'סיור בשטח',
        details: 'התרשמות חיובית מהמיקום'
      },
      {
        date: '28.12.2023',
        event: 'חתימת חוזה',
        details: 'השקעה ראשונית של 300,000$'
      }
    ],
    recommendations: [
      'להציע השקעה בפרויקט הבא באשקלון',
      'לשלוח עדכון שבועי על התקדמות הבנייה',
      'לתאם פגישת מעקב בעוד חודש',
      'להציע תוכנית השקעה מדורגת'
    ]
  }
}

export function ClientProfile() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'timeline' | 'recommendations'>('overview')

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header Card */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-blue-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">{clientData.personalInfo.name}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <span className="mr-2">📱</span>
                {clientData.personalInfo.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📅</span>
                {clientData.personalInfo.dealDate}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">רווח נוכחי</div>
              <div className="text-2xl font-bold text-blue-800">{clientData.personalInfo.profit.amount}</div>
              <div className="text-sm text-green-600">
                עלייה של {clientData.personalInfo.profit.percentage} תוך {clientData.personalInfo.profit.days} ימים
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">סיכויי סגירה</div>
              <div className="text-2xl font-bold text-blue-800">{clientData.analysis.summary.dealProbability}</div>
              <div className="text-sm text-blue-600">רמת עניין: {clientData.analysis.summary.clientInterest}</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">תשלום אחרון</div>
              <div className="text-xl font-bold text-orange-600">{clientData.personalInfo.lastPayment}</div>
              <div className="text-sm text-blue-600">יש לתאם תשלום</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex space-x-2 rtl:space-x-reverse">
          {['overview', 'analysis', 'timeline', 'recommendations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {tab === 'overview' && 'סקירה כללית'}
              {tab === 'analysis' && 'ניתוח מפורט'}
              {tab === 'timeline' && 'ציר זמן'}
              {tab === 'recommendations' && 'המלצות'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientData.analysis.keyMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{metric.title}</h3>
                <div className="text-3xl font-bold text-blue-900 mb-2">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.description}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">סטטיסטיקות שיחה</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span>מספר הודעות כולל</span>
                    <span className="font-semibold">{clientData.analysis.summary.totalMessages}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span>זמן תגובה ממוצע</span>
                    <span className="font-semibold">{clientData.analysis.summary.averageResponseTime}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span>סיכויי סגירה</span>
                    <span className="font-semibold">{clientData.analysis.summary.dealProbability}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">נקודות מפתח</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">•</span>
                    תגובות מהירות ועניין גבוה
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">•</span>
                    מוכנות להשקעה משמעותית
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">•</span>
                    היסטוריית השקעות חיובית
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              {clientData.analysis.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-24 text-sm text-blue-600">{event.date}</div>
                  <div>
                    <div className="font-semibold text-blue-800">{event.event}</div>
                    <div className="text-sm text-gray-600">{event.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">המלצות להמשך</h3>
            <div className="grid gap-4">
              {clientData.analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">#{index + 1}</span>
                    <span>{recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
