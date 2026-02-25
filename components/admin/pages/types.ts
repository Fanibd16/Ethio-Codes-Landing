export type AdminTab = 'dashboard' | 'calendar' | 'clients' | 'services' | 'blog' | 'settings';

export type ActionTab = 'email' | 'sms' | 'call' | 'note';

export interface Interaction {
  id: number;
  type: ActionTab;
  date: string;
  title: string;
  content: string;
  status?: 'sent' | 'delivered' | 'missed' | 'completed';
}

