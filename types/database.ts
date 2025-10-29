
export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  rating: number;
  trades_completed: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  created_at: string;
}

export interface UserSkillTeach {
  id: string;
  user_id: string;
  skill_id: string;
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  created_at: string;
  skill?: Skill;
}

export interface UserSkillLearn {
  id: string;
  user_id: string;
  skill_id: string;
  interest_level: 'low' | 'medium' | 'high';
  created_at: string;
  skill?: Skill;
}

export interface Conversation {
  id: string;
  participant1_id: string;
  participant2_id: string;
  last_message?: string;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'voice' | 'file' | 'image';
  file_url?: string;
  file_name?: string;
  file_size?: number;
  duration?: number;
  is_read: boolean;
  created_at: string;
}

export interface TradeRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  skill_to_teach_id: string;
  skill_to_learn_id: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  created_at: string;
  updated_at: string;
  sender?: Profile;
  receiver?: Profile;
  skill_to_teach?: Skill;
  skill_to_learn?: Skill;
}

export interface Session {
  id: string;
  trade_request_id?: string;
  teacher_id: string;
  student_id: string;
  skill_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  rating?: number;
  review?: string;
  created_at: string;
  updated_at: string;
  teacher?: Profile;
  student?: Profile;
  skill?: Skill;
}
