'use client';

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SampleConversation } from "@/components/sample-conversation";
import WhatsAppWizard from "@/components/whatsapp-wizard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 rtl">
      <main className="max-w-7xl mx-auto">
        {/* כותרת ראשית */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">מערכת ניהול שיחות חכמה</h1>
          <p className="text-xl text-gray-600">ניתוח שיחות ומעקב לקוחות לאנשי נדל"ן</p>
        </div>

        {/* WhatsApp Wizard */}
        <div className="mb-8">
          <WhatsAppWizard />
        </div>

        {/* סטטיסטיקות */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">שיחות פעילות</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">לקוחות פוטנציאליים</h3>
            <p className="text-3xl font-bold text-green-600">5</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">סיכויי סגירה</h3>
            <p className="text-3xl font-bold text-purple-600">75%</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">פוטנציאל מכירות</h3>
            <p className="text-3xl font-bold text-orange-600">5.2M</p>
          </Card>
        </div>

        {/* אפשרויות ייבוא */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">ייבוא שיחות</h2>
            <div className="space-y-4">
              <Button className="w-full text-lg py-6" variant="outline">
                <span className="ml-2">📱</span>
                WhatsApp
              </Button>
              <Button className="w-full text-lg py-6" variant="outline">
                <span className="ml-2">💬</span>
                Messenger
              </Button>
              <Button className="w-full text-lg py-6" variant="outline">
                <span className="ml-2">✉️</span>
                SMS
              </Button>
              <Button className="w-full text-lg py-6" variant="outline">
                <span className="ml-2">📨</span>
                Telegram
              </Button>
            </div>
          </Card>

          {/* ניתוח ותובנות */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">ניתוח ותובנות</h2>
            <div className="space-y-4">
              <Button className="w-full text-lg py-6" variant="outline">
                <span className="ml-2">🔍</span>
                ניתוח פרופיל לקוח
              </Button>
              <Button className="w-full text-lg py-6" variant="outline">
                <span className="ml-2">📊</span>
                היסטוריית עסקאות
              </Button>
              <Button className="w-full text-lg py-6" variant="outline">
                <span className="ml-2">💡</span>
                הזדמנויות מכירה
              </Button>
              <Button className="w-full text-lg py-6" variant="outline">
                <span className="ml-2">📈</span>
                ניתוח מגמות שוק
              </Button>
            </div>
          </Card>
        </div>

        {/* שיחות אחרונות */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">שיחות אחרונות</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">דני כהן</h3>
                  <p className="text-sm text-gray-600">WhatsApp - לפני 2 שעות</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  פוטנציאל גבוה
                </span>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">רחל לוי</h3>
                  <p className="text-sm text-gray-600">Messenger - לפני 5 שעות</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  בבדיקה
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="container mx-auto py-6">
          <SampleConversation />
        </div>
      </main>
    </div>
  );
}