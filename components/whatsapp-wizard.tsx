'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  FileDown, 
  Settings, 
  HelpCircle, 
  ChevronRight,
  Phone,
  MessagesSquare,
  Building2,
  Users,
  TrendingUp,
  Clock,
  FileText
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";

interface Customer {
  id: string;
  name: string;
  location: string;
}

interface SectionType {
  source: string | null;
  destination: string | null;
  analysis: string | null;
  [key: string]: string | null;
}

interface AnalysisOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface CustomerData {
  conversations: {
    date: string;
    messages: {
      sender: string;
      content: string;
      time: string;
      type: 'text' | 'file' | 'link';
      fileDetails?: {
        name: string;
        type: string;
      };
    }[];
  }[];
  stats: {
    totalMessages: number;
    responseTime: string;
    interests: string[];
    budget: string;
    preferredAreas: string[];
  };
}

interface AnalysisRecommendation {
  type: string;
  details: string;
  priority: number;
}

interface DetailedAnalysis {
  customerProfile: {
    initialInterest: string;
    trustLevel: string;
    location: string;
    budget: string;
    status: string;
    maturityLevel: string;
  };
  recommendations: AnalysisRecommendation[];
  behavior: {
    responseTime: string;
    activeHours: string;
    communicationStyle: string;
    mainInterests: string[];
  };
  systemRecommendations: string[];
  nextSteps: {
    suggested: string;
    timing: string;
    materials: string[];
  };
  metrics: {
    closingProbability: number;
    estimatedClosingTime: string;
    potentialDealValue: string;
  };
  automatedActions: string[];
  reminders: {
    time: string;
    action: string;
  }[];
}

const WhatsAppWizard: React.FC = () => {
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [expandedSection, setExpandedSection] = useState<keyof SectionType | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);

  const customers: Customer[] = [
    { id: '1', name: 'יעקב ושרה כהן', location: 'חולון' },
    { id: '2', name: 'דוד לוי', location: 'רמת גן' },
    { id: '3', name: 'רחל אברהם', location: 'תל אביב' },
    { id: '4', name: 'משה ושירה דוד', location: 'פתח תקווה' },
  ];

  const customerData: Record<string, CustomerData & { detailedAnalysis: DetailedAnalysis }> = {
    '1': {
      conversations: [
        {
          date: '2024-03-20',
          messages: [
            {
              sender: 'לקוח',
              content: 'בוקר טוב יורם, עברתי על החומרים. מרשים מאוד. יש לי כמה שאלות לגבי התשואה והמיסוי.',
              time: '09:15',
              type: 'text'
            },
            {
              sender: 'יורם',
              content: 'בוקר אור! שמח שעברת על החומרים. אשמח לענות על כל שאלה. מה מעניין אותך לדעת?',
              time: '09:17',
              type: 'text'
            },
            {
              sender: 'לקוח',
              content: 'קודם כל, לגבי המיסוי - אני עצמאי ויש לי כבר דירה להשקעה. איך זה משפיע?',
              time: '09:20',
              type: 'text'
            },
            {
              sender: 'יורם',
              content: `אני שמח ששאלת. בתור עצמאי, יש כאן כמה נקודות חשובות:

- אפשרות לרשום את הנכס על חברה בע"מ אם יש לך
- ניצול הוצאות והטבות מס ייחודיות
- אפשרות למימון דרך קרן השתלמות לעצמאים

לגבי דירה שנייה - כ��, יש מס רכישה של 8%, אבל אנחנו יכולים לעשות תכנון מס חכם. יש לי יועץ מס שמתמחה בהשקעות נדל"ן שיכול לעזור לנו למקסם את ההטבות.`,
              time: '09:25',
              type: 'text'
            }
          ]
        },
        {
          date: '2024-03-20',
          messages: [
            {
              sender: 'לקוח',
              content: 'מעניין. ולגבי התשואה - ראיתי שציינת 4.5%-5% מהשכרה. איך זה מתחלק לאורך השנה?',
              time: '09:30',
              type: 'text'
            },
            {
              sender: 'יורם',
              content: `התשואה מתחלקת ככה:

- שכר דירה ממוצע באזור: 4,200 ₪ לחודש
- הכנסה שנתית: כ-50,000 ₪
- הוצאות (ארנונה, ועד בית, תחזוקה): כ-12,000 ₪ בשנה
- רווח נטו: כ-38,000 ₪ בשנה

בנוסף, יש לנו הסכם עם חברת ניהול שיכולה לטפל בכל ההיבטים של ההשכרה - משכירים, תחזוקה, גבייה. העמלה שלהם 8% מההכנסות.`,
              time: '09:35',
              type: 'text'
            }
          ]
        }
      ],
      stats: {
        totalMessages: 42,
        responseTime: '2.3 שעות',
        interests: ['השקעה', 'תשואה', 'מיסוי', 'ניהול נכסים'],
        budget: '1.35-1.5 מיליון ₪',
        preferredAreas: ['חולון', 'ראשון לציון', 'בת ים']
      },
      detailedAnalysis: {
        customerProfile: {
          initialInterest: 'דרך המלצה מחבר',
          trustLevel: 'גבוהה',
          location: 'אשקלון, שכונת נווה ים',
          budget: '1.35 מיליון ₪',
          status: 'משקיע פוטנציאלי עם הבנה פיננסית',
          maturityLevel: 'גבוהה - שואל שאלות מעמיקות על תשואה ומיסוי'
        },
        recommendations: [
          { type: 'פגישה', details: 'לתזמן פגישה פרונטלית תוך 48 שעות', priority: 1 },
          { type: 'תכנון', details: 'להכין תוכנית מימון מותאמת אישית', priority: 2 },
          { type: 'חומרים', details: 'לשלוח דוגמאות של עסקאות דומות', priority: 3 },
          { type: 'חיבור', details: 'לחבר עם לקוחות ממליצים', priority: 4 }
        ],
        behavior: {
          responseTime: '2.3 שעות',
          activeHours: 'בוקר (8:00-11:00)',
          communicationStyle: 'ענייני, ממוקד נתונים',
          mainInterests: ['תשואה', 'מיסוי', 'ביטחונות']
        },
        systemRecommendations: [
          'להציע סיור וירטואלי בפרויקט',
          'לשלוח ניתוח תשואה מפורט',
          'לתאם פגישה עם יועץ מס',
          'להציג נתוני תשואה מפרויקטים דומים'
        ],
        nextSteps: {
          suggested: 'תוכנית מימון מפורטת, פגישה עם יועץ מס, סיור בפרויקט',
          timing: 'מיידי',
          materials: ['תוכנית מימון', 'מצגת פרויקט', 'דוגמאות עסקאות']
        },
        metrics: {
          closingProbability: 75,
          estimatedClosingTime: '2-3 שבועות',
          potentialDealValue: '1.35M ₪'
        },
        automatedActions: [
          'עודכן CRM',
          'נוצר תיק לקוח דיגיטלי',
          'תוזמנה תזכורת למעקב',
          'הופק דו"ח התאמה ראשוני'
        ],
        reminders: [
          { time: '09:00 מחר', action: 'מעקב בוקר' },
          { time: '12:00 היום', action: 'שליחת חומרים נוספים' },
          { time: '15:00 היום', action: 'תיאום פגישה פרונטלית' }
        ]
      }
    }
  };

  const analysisOptions: AnalysisOption[] = [
    {
      id: 'profile',
      title: 'ניתוח פרופיל לקוח',
      description: 'העדפות, צרכים ויכולות כלכליות',
      icon: <Users className="ml-2 h-6 w-6" />
    },
    {
      id: 'history',
      title: 'היסטוריית עסקאות',
      description: 'מעקב אחר התקדמות עסקאות',
      icon: <Clock className="ml-2 h-6 w-6" />
    },
    {
      id: 'opportunities',
      title: 'ניתוח הזדמנויות מכירה',
      description: 'זיהוי לקוחות פוטנציאל��ים',
      icon: <TrendingUp className="ml-2 h-6 w-6" />
    },
    {
      id: 'properties',
      title: 'התאמת נכסים',
      description: 'המלצות מותאמות אישית ללקוח',
      icon: <Building2 className="ml-2 h-6 w-6" />
    }
  ];

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsProcessing(true);
    setUploadProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
        setTimeout(() => {
          setExpandedSection('destination');
        }, 500);
      }
    }, 300);
  };

  const handleAnalysisSelect = (analysisId: string) => {
    setSelectedAnalysis(prev => 
      prev.includes(analysisId) 
        ? prev.filter(id => id !== analysisId)
        : [...prev, analysisId]
    );
  };

  const startAnalysis = () => {
    setIsProcessing(true);
    setAnalysisProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
        setAnalysisComplete(true);
        showResults();
      }
    }, 200);
  };

  const showDetailedResults = () => {
    if (!selectedCustomer) return;
    
    const data = customerData[selectedCustomer.id];
    if (!data) return;

    const analysis = data.detailedAnalysis;
    
    const detailedView = (
      <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-right">ניתוח מפורט - {selectedCustomer.name}</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">פרופיל לקוח</h3>
            <div className="space-y-2">
              {Object.entries(analysis.customerProfile).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">מדדים</h3>
            <div className="space-y-2">
              <p>סיכוי סגירה: {analysis.metrics.closingProbability}%</p>
              <p>זמן משוער: {analysis.metrics.estimatedClosingTime}</p>
              <p>פוטנציאל: {analysis.metrics.potentialDealValue}</p>
            </div>
          </div>
        </div>
        
        {/* Add more sections for recommendations, behavior analysis, etc. */}
      </div>
    );

    alert(`
ניתוח מפורט עבור ${selectedCustomer.name}:

פרופיל לקוח:
- רמת בשלות: ${analysis.customerProfile.maturityLevel}
- תקציב: ${analysis.customerProfile.budget}

המלצות מערכת:
${analysis.systemRecommendations.join('\n')}

מדדים:
- סיכוי סגירה: ${analysis.metrics.closingProbability}%
- זמן משוער: ${analysis.metrics.estimatedClosingTime}
- פוטנציאל עסקה: ${analysis.metrics.potentialDealValue}
    `);
  };

  const showResults = () => {
    showDetailedResults();
  };

  const whatsAppContent = (
    <div className="space-y-4">
      <Button 
        className="w-full text-right h-auto p-4 justify-start" 
        variant="ghost"
        onClick={() => setExpandedSection('customers')}
      >
        <MessageSquare className="ml-2 h-6 w-6" />
        WhatsApp - שיחות טקסט והודעות קוליות
      </Button>
      
      {expandedSection === 'customers' && (
        <div className="space-y-4 pr-8">
          <p className="text-right text-gray-600 mb-2">בחר לקוח לניתוח:</p>
          {customers.map(customer => (
            <Button
              key={customer.id}
              className={`w-full text-right p-3 ${
                selectedCustomer?.id === customer.id ? 'bg-blue-50 border-blue-500' : ''
              }`}
              variant="outline"
              onClick={() => handleCustomerSelect(customer)}
            >
              {customer.name} - {customer.location}
            </Button>
          ))}
        </div>
      )}

      {selectedCustomer && (
        <div className="space-y-4 pr-8">
          <div className="text-right">
            <p className="text-lg font-medium mb-2">מעלה נתונים עבור {selectedCustomer.name}</p>
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-gray-600 mt-1">
              {uploadProgress}% הושלם
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const analysisContent = (
    <div className="space-y-4">
      <div className="text-right mb-4">
        <h3 className="text-xl font-semibold mb-2">בחר סוגי ניתוח</h3>
        <p className="text-gray-600">ניתן לבחור מספר אפשרויות</p>
      </div>

      <div className="space-y-3">
        {analysisOptions.map(option => (
          <Button
            key={option.id}
            className={`w-full text-right h-auto p-4 justify-start ${
              selectedAnalysis.includes(option.id) ? 'bg-blue-50 border-blue-500' : ''
            }`}
            variant="outline"
            onClick={() => handleAnalysisSelect(option.id)}
          >
            {option.icon}
            <div>
              <div className="font-medium">{option.title}</div>
              <div className="text-sm text-gray-600">{option.description}</div>
            </div>
          </Button>
        ))}
      </div>

      {selectedAnalysis.length > 0 && (
        <div className="space-y-4">
          <Button 
            className="w-full"
            onClick={startAnalysis}
            disabled={isProcessing}
          >
            התחל ניתוח
          </Button>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-center text-sm text-gray-600">
                מנתח את השיחות... {analysisProgress}%
              </p>
            </div>
          )}

          {analysisComplete && (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-green-600 font-medium">הניתוח הושלם בהצלחה!</p>
              <Button 
                className="mt-2"
                onClick={() => {/* Handle viewing results */}}
              >
                צפה בתוצאות
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">ייצוא וניתוח תכתובות עבור אנשי נדל"ן</h1>
        <p className="text-xl text-gray-600 mb-4">עבור: יורם חדד | גרסת הדגה</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {showHelp && (
          <Alert className="mb-6 text-right">
            <AlertDescription className="text-lg">
              יורם, כאן תוכל לנתח את כל התקשורת עם הלקוחות שלך ולקבל תובנות חכמות שיעזרו לך למכור יותר!
              בחר באחת האפשרויות למטה ואני אדריך אותך בתהליך.
            </AlertDescription>
          </Alert>
        )}

        {/* בחירת מקור */}
        <Collapsible 
          open={expandedSection === 'source'} 
          onOpenChange={() => setExpandedSection(expandedSection === 'source' ? null : 'source')}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CollapsibleTrigger asChild>
              <Button 
                className="w-full h-auto p-6 flex justify-between items-center text-right"
                variant="ghost"
              >
                <ChevronRight className="h-8 w-8" />
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">בחר מקורות תקשורת</h3>
                    <p className="text-gray-600 text-lg">ייבא שיחות מכל אמצעי התקשורת שלך</p>
                  </div>
                  <MessagesSquare className="h-12 w-12" />
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-3">
              {whatsAppContent}
              <Button className="w-full text-right h-auto p-4 justify-start" variant="ghost">
                <MessagesSquare className="ml-2 h-6 w-6" />
                Messenger - צ'אטים של פייסבוק
              </Button>
              <Button className="w-full text-right h-auto p-4 justify-start" variant="ghost">
                <Phone className="ml-2 h-6 w-6" />
                SMS - הודעות טקסט מהטלפון
              </Button>
              <Button className="w-full text-right h-auto p-4 justify-start" variant="ghost">
                <MessageSquare className="ml-2 h-6 w-6" />
                Telegram - שיחות וקבוצות
              </Button>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* בחירת כלי ניתוח */}
        <Collapsible 
          open={expandedSection === 'destination'} 
          onOpenChange={() => setExpandedSection(expandedSection === 'destination' ? null : 'destination')}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CollapsibleTrigger asChild>
              <Button 
                className="w-full h-auto p-6 flex justify-between items-center text-right"
                variant="ghost"
              >
                <ChevronRight className="h-8 w-8" />
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">בחר כלי לניתוח השיחות</h3>
                    <p className="text-gray-600 text-lg">כלים חכמים שינתחו את השיחות שלך</p>
                  </div>
                  <TrendingUp className="h-12 w-12" />
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-3">
              <Button className="w-full text-right h-auto p-4 justify-start" variant="ghost">
                <FileText className="ml-2 h-6 w-6" />
                Google Gemini - ניתוח מעמיק של שיחות
              </Button>
              <Button className="w-full text-right h-auto p-4 justify-start" variant="ghost">
                <FileDown className="ml-2 h-6 w-6" />
                Notebook LLM - תובנות מתקדמות
              </Button>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* אפשרויות המרה וניתוח */}
        <Collapsible 
          open={expandedSection === 'analysis'} 
          onOpenChange={() => setExpandedSection(expandedSection === 'analysis' ? null : 'analysis')}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CollapsibleTrigger asChild>
              <Button 
                className="w-full h-auto p-6 flex justify-between items-center text-right"
                variant="ghost"
              >
                <ChevronRight className="h-8 w-8" />
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">בחר סוג ניתוח</h3>
                    <p className="text-gray-600 text-lg">תובנות מותאמות לעולם הנדל"ן</p>
                  </div>
                  <Building2 className="h-12 w-12" />
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-3">
              {analysisContent}
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="text-lg"
            onClick={() => setShowHelp(!showHelp)}
          >
            <HelpCircle className="h-6 w-6 ml-2" />
            ציך עזרה?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppWizard;