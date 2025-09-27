export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'streak' | 'total' | 'uploads' | 'shares';
  earned: boolean;
  earnedDate?: Date;
}

interface StoredBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'streak' | 'total' | 'uploads' | 'shares';
  earned: boolean;
  earnedDate?: string;
}

interface StoredBrief {
  id: string;
  createdAt: string;
  [key: string]: unknown;
}

export const availableBadges: Omit<Badge, 'earned' | 'earnedDate'>[] = [
  {
    id: 'first_brief',
    name: 'First Steps',
    description: 'Generated your first daily brief',
    icon: '🎯',
    requirement: 1,
    type: 'total'
  },
  {
    id: 'streak_3',
    name: 'Getting Started',
    description: '3 daily challenges in a row!',
    icon: '🔥',
    requirement: 3,
    type: 'streak'
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: '7 daily challenges in a row!',
    icon: '⚡',
    requirement: 7,
    type: 'streak'
  },
  {
    id: 'streak_10',
    name: 'Perfect Ten',
    description: '10 daily challenges in a row!',
    icon: '💎',
    requirement: 10,
    type: 'streak'
  },
  {
    id: 'streak_30',
    name: 'Monthly Master',
    description: '30 daily challenges in a row!',
    icon: '👑',
    requirement: 30,
    type: 'streak'
  },
  {
    id: 'total_25',
    name: 'Quarter Century',
    description: 'Generated 25 total briefs',
    icon: '🎨',
    requirement: 25,
    type: 'total'
  },
  {
    id: 'total_50',
    name: 'Half Century',
    description: 'Generated 50 total briefs',
    icon: '🚀',
    requirement: 50,
    type: 'total'
  },
  {
    id: 'total_100',
    name: 'Century Club',
    description: 'Generated 100 total briefs',
    icon: '🏆',
    requirement: 100,
    type: 'total'
  },
  {
    id: 'uploads_5',
    name: 'Portfolio Builder',
    description: 'Uploaded 5 design files',
    icon: '📁',
    requirement: 5,
    type: 'uploads'
  },
  {
    id: 'uploads_20',
    name: 'Design Library',
    description: 'Uploaded 20 design files',
    icon: '🗂️',
    requirement: 20,
    type: 'uploads'
  },
  {
    id: 'shares_10',
    name: 'Social Butterfly',
    description: 'Shared 10 briefs or designs',
    icon: '🦋',
    requirement: 10,
    type: 'shares'
  },
  {
    id: 'shares_25',
    name: 'Community Leader',
    description: 'Shared 25 briefs or designs',
    icon: '🌟',
    requirement: 25,
    type: 'shares'
  }
];

export function getBadges(): Badge[] {
  const stored = localStorage.getItem('userBadges');
  if (stored) {
    return JSON.parse(stored).map((badge: StoredBadge) => ({
      ...badge,
      earnedDate: badge.earnedDate ? new Date(badge.earnedDate) : undefined
    }));
  }
  
  // Initialize with all badges as unearned
  const initialBadges: Badge[] = availableBadges.map(badge => ({
    ...badge,
    earned: false
  }));
  
  localStorage.setItem('userBadges', JSON.stringify(initialBadges));
  return initialBadges;
}

export function updateBadges(): Badge[] {
  const badges = getBadges();
  const briefs = JSON.parse(localStorage.getItem('briefs') || '[]');
  const designs = JSON.parse(localStorage.getItem('designFiles') || '[]');
  const shareCount = parseInt(localStorage.getItem('shareCount') || '0');
  
  // Calculate current streak
  const currentStreak = calculateCurrentStreak(briefs);
  
  const newlyEarned: Badge[] = [];
  
  badges.forEach(badge => {
    if (badge.earned) return;
    
    let shouldEarn = false;
    
    switch (badge.type) {
      case 'total':
        shouldEarn = briefs.length >= badge.requirement;
        break;
      case 'streak':
        shouldEarn = currentStreak >= badge.requirement;
        break;
      case 'uploads':
        shouldEarn = designs.length >= badge.requirement;
        break;
      case 'shares':
        shouldEarn = shareCount >= badge.requirement;
        break;
    }
    
    if (shouldEarn) {
      badge.earned = true;
      badge.earnedDate = new Date();
      newlyEarned.push(badge);
    }
  });
  
  localStorage.setItem('userBadges', JSON.stringify(badges));
  return newlyEarned;
}

function calculateCurrentStreak(briefs: StoredBrief[]): number {
  if (briefs.length === 0) return 0;
  
  // Sort briefs by date (newest first)
  const sortedBriefs = briefs
    .map((brief: StoredBrief) => ({
      ...brief,
      createdAt: new Date(brief.createdAt)
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
  let streak = 0;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const brief of sortedBriefs) {
    const briefDate = new Date(brief.createdAt);
    briefDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((currentDate.getTime() - briefDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
    } else if (daysDiff === streak + 1) {
      // Allow for today not having a brief yet
      break;
    } else {
      break;
    }
  }
  
  return streak;
}

export function incrementShareCount() {
  const current = parseInt(localStorage.getItem('shareCount') || '0');
  localStorage.setItem('shareCount', (current + 1).toString());
}