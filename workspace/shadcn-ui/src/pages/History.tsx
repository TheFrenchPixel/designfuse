import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2, Calendar } from 'lucide-react';
import { getBriefs, shareContent, Brief } from '@/lib/storage';
import { toast } from 'sonner';

export default function History() {
  const [briefs, setBriefs] = useState<Brief[]>([]);

  useEffect(() => {
    setBriefs(getBriefs());
  }, []);

  const handleShare = async (brief: Brief) => {
    const shareText = `Check out this creative brief: ${brief.title}\n\n${brief.overview}\n\nCreative Spark: ${brief.creativeSpark}`;
    
    try {
      await shareContent(brief.title, shareText);
      toast.success('Brief shared! 📤');
    } catch (error) {
      toast.error('Failed to share brief');
    }
  };

  if (briefs.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-teal-400 mb-2">Brief History</h1>
            <p className="text-slate-400 mb-8">Your previously generated design briefs</p>
          </div>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No briefs yet. Create one!</h3>
              <p className="text-slate-400">Start by generating your first design brief to see it here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-400 mb-2">Brief History</h1>
          <p className="text-slate-400">Your previously generated design briefs</p>
        </div>
        
        <div className="grid gap-6">
          {briefs.map((brief) => (
            <Card key={brief.id} className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-teal-400 mb-2">{brief.title}</CardTitle>
                  <CardDescription className="text-slate-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {brief.createdAt.toLocaleDateString()} at {brief.createdAt.toLocaleTimeString()}
                  </CardDescription>
                </div>
                <Button
                  onClick={() => handleShare(brief)}
                  variant="outline"
                  size="sm"
                  className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">{brief.overview}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-teal-400 font-semibold">Product:</span>
                    <p className="text-slate-300">{brief.productType}</p>
                  </div>
                  <div>
                    <span className="text-teal-400 font-semibold">Brand:</span>
                    <p className="text-slate-300">{brief.brand}</p>
                  </div>
                  <div>
                    <span className="text-teal-400 font-semibold">Target:</span>
                    <p className="text-slate-300">{brief.targetAudience}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                  <span className="text-teal-400 font-semibold text-sm">Creative Spark:</span>
                  <p className="text-slate-300 italic">{brief.creativeSpark}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}