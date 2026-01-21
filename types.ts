import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  imageUrl: string;
  type: 'Web System' | 'Institutional' | 'Dashboard' | 'App';
}

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: 'Frontend' | 'Backend' | 'Tools';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  label: string;
}