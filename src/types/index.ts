export interface Question {
  id: string;
  link: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  doneBy: {
    puneet: boolean;
    komal: boolean;
  };
  createdAt: number;
}

export type FilterOption = 'all' | 'Easy' | 'Medium' | 'Hard' | string;