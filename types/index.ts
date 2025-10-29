
export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  profilePhoto?: string;
  skillsToTeach: Skill[];
  skillsToLearn: Skill[];
  rating: number;
  tradesCompleted: number;
  joinedDate: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export type SkillCategory = 
  | 'design' 
  | 'development' 
  | 'music' 
  | 'writing' 
  | 'photography' 
  | 'language' 
  | 'other';

export interface TradeRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  offerSkill: Skill;
  requestSkill: Skill;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  createdAt: string;
  scheduledDate?: string;
}

export interface TradeSession {
  id: string;
  tradeRequestId: string;
  participants: [string, string];
  scheduledDate: string;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  rating?: {
    fromUser: number;
    toUser: number;
  };
  review?: {
    fromUser: string;
    toUser: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file' | 'voice';
  fileUrl?: string;
}
