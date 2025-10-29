
import { User, Skill, TradeRequest } from '@/types';

export const skillCategories = [
  { id: 'design', name: 'Design', icon: '🎨', color: '#7B1FA2' },
  { id: 'development', name: 'Programming', icon: '💻', color: '#FF7043' },
  { id: 'music', name: 'Music', icon: '🎵', color: '#4CAF50' },
  { id: 'writing', name: 'Writing', icon: '✍️', color: '#2196F3' },
  { id: 'photography', name: 'Photography', icon: '📸', color: '#D81B60' },
  { id: 'language', name: 'Languages', icon: '🗣', color: '#FFC107' },
];

export const popularSkills: Skill[] = [
  { id: '1', name: 'UI/UX Design', category: 'design', level: 'intermediate' },
  { id: '2', name: 'React Native', category: 'development', level: 'advanced' },
  { id: '3', name: 'JavaScript', category: 'development', level: 'intermediate' },
  { id: '4', name: 'Figma', category: 'design', level: 'beginner' },
  { id: '5', name: 'Photography', category: 'photography', level: 'intermediate' },
  { id: '6', name: 'Spanish', category: 'language', level: 'beginner' },
  { id: '7', name: 'Guitar', category: 'music', level: 'intermediate' },
  { id: '8', name: 'Content Writing', category: 'writing', level: 'advanced' },
  { id: '9', name: 'Motion Graphics', category: 'design', level: 'expert' },
  { id: '10', name: 'Python', category: 'development', level: 'intermediate' },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    bio: 'Passionate UI/UX Designer | Love helping others learn Figma & branding.',
    location: 'San Francisco, CA',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    skillsToTeach: [
      { id: '1', name: 'UI/UX Design', category: 'design', level: 'expert' },
      { id: '9', name: 'Motion Graphics', category: 'design', level: 'advanced' },
      { id: '4', name: 'Figma', category: 'design', level: 'expert' },
    ],
    skillsToLearn: [
      { id: '2', name: 'React Native', category: 'development', level: 'beginner' },
      { id: '3', name: 'JavaScript', category: 'development', level: 'intermediate' },
    ],
    rating: 4.9,
    tradesCompleted: 128,
    joinedDate: '2023-01-15',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    bio: 'Full-stack developer with 5 years experience. Happy to teach coding!',
    location: 'New York, NY',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    skillsToTeach: [
      { id: '2', name: 'React Native', category: 'development', level: 'expert' },
      { id: '3', name: 'JavaScript', category: 'development', level: 'expert' },
      { id: '10', name: 'Python', category: 'development', level: 'advanced' },
    ],
    skillsToLearn: [
      { id: '1', name: 'UI/UX Design', category: 'design', level: 'beginner' },
      { id: '5', name: 'Photography', category: 'photography', level: 'beginner' },
    ],
    rating: 4.8,
    tradesCompleted: 95,
    joinedDate: '2023-03-20',
    isOnline: false,
    lastSeen: '2 hours ago',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    bio: 'Professional photographer & visual storyteller. Let&apos;s create together!',
    location: 'Los Angeles, CA',
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    skillsToTeach: [
      { id: '5', name: 'Photography', category: 'photography', level: 'expert' },
      { id: '8', name: 'Content Writing', category: 'writing', level: 'advanced' },
    ],
    skillsToLearn: [
      { id: '9', name: 'Motion Graphics', category: 'design', level: 'beginner' },
      { id: '7', name: 'Guitar', category: 'music', level: 'beginner' },
    ],
    rating: 4.95,
    tradesCompleted: 156,
    joinedDate: '2022-11-10',
    isOnline: true,
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    bio: 'Music producer & guitar teacher. 10+ years of experience.',
    location: 'Austin, TX',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    skillsToTeach: [
      { id: '7', name: 'Guitar', category: 'music', level: 'expert' },
    ],
    skillsToLearn: [
      { id: '10', name: 'Python', category: 'development', level: 'beginner' },
      { id: '6', name: 'Spanish', category: 'language', level: 'intermediate' },
    ],
    rating: 4.7,
    tradesCompleted: 73,
    joinedDate: '2023-05-08',
    isOnline: false,
    lastSeen: '1 day ago',
  },
  {
    id: '5',
    name: 'Aisha Patel',
    email: 'aisha.p@example.com',
    bio: 'Multilingual teacher | Fluent in 5 languages. Love cultural exchange!',
    location: 'Chicago, IL',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    skillsToTeach: [
      { id: '6', name: 'Spanish', category: 'language', level: 'expert' },
    ],
    skillsToLearn: [
      { id: '4', name: 'Figma', category: 'design', level: 'beginner' },
      { id: '8', name: 'Content Writing', category: 'writing', level: 'intermediate' },
    ],
    rating: 4.85,
    tradesCompleted: 112,
    joinedDate: '2023-02-14',
    isOnline: true,
  },
];

export const currentUser: User = {
  id: 'current',
  name: 'Abdi A.',
  email: 'abdi@example.com',
  bio: 'Passionate UI/UX Designer | Love helping others learn Figma & branding.',
  location: 'San Francisco, CA',
  profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  skillsToTeach: [
    { id: '1', name: 'UI/UX Design', category: 'design', level: 'expert' },
    { id: '9', name: 'Motion Graphics', category: 'design', level: 'advanced' },
  ],
  skillsToLearn: [
    { id: '3', name: 'JavaScript', category: 'development', level: 'intermediate' },
    { id: '2', name: 'React Native', category: 'development', level: 'beginner' },
  ],
  rating: 4.9,
  tradesCompleted: 128,
  joinedDate: '2023-01-15',
  isOnline: true,
};
