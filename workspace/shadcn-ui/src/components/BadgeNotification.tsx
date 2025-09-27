import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Award } from 'lucide-react';
import { Badge } from '@/lib/badges';

interface BadgeNotificationProps {
  badges: Badge[];
  onClose: () => void;
}

export default function BadgeNotification({ badges, onClose }: BadgeNotificationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (badges.length === 0) {
      onClose();
      return;
    }

    const timer = setTimeout(() => {
      if (currentIndex < badges.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, badges.length, onClose]);

  if (!isVisible || badges.length === 0) return null;

  const currentBadge = badges[currentIndex];

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-500">
      <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 border-0 text-white shadow-lg max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span className="font-medium text-sm">Badge Earned!</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="text-white hover:bg-white/20 h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{currentBadge.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{currentBadge.name}</h3>
              <p className="text-sm text-white/90">{currentBadge.description}</p>
            </div>
          </div>
          {badges.length > 1 && (
            <div className="mt-3 text-xs text-white/80">
              {currentIndex + 1} of {badges.length} new badges
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}