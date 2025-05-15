import React from 'react';
import { Question } from '../types';
import { ExternalLink } from 'lucide-react';

interface QuestionItemProps {
  question: Question;
  onToggleCompletion: (id: string, user: 'puneet' | 'komal', value: boolean) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ 
  question, 
  onToggleCompletion 
}) => {
  const { id, link, difficulty, topic, doneBy } = question;
  
  const getHostname = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '');
    } catch (e) {
      return url;
    }
  };
  
  const getProblemName = (url: string) => {
    try {
      const path = new URL(url).pathname;
      const parts = path.split('/').filter(Boolean);
      const lastPart = parts[parts.length - 1] || '';
      return lastPart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } catch (e) {
      return 'Untitled Problem';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-difficulty-easy';
      case 'Medium': return 'text-difficulty-medium';
      case 'Hard': return 'text-difficulty-hard';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="card mb-4 hover:shadow-custom transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent-primary hover:underline flex items-center font-medium transition-colors"
            >
              {getProblemName(link)}
              <ExternalLink size={14} className="ml-1 inline" />
            </a>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-0">
            <span className={`text-sm ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
            
            <span className="text-text-tertiary">•</span>
            
            <span className="text-sm text-text-secondary">
              {getHostname(link)}
            </span>
            
            {topic && (
              <>
                <span className="text-text-tertiary">•</span>
                <span className="text-sm bg-background-tertiary px-2 py-0.5 rounded-md">
                  {topic}
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-6 mt-4 sm:mt-0">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`puneet-${id}`}
              className="sr-only peer"
              checked={doneBy.puneet}
              onChange={(e) => onToggleCompletion(id, 'puneet', e.target.checked)}
            />
            <label
              htmlFor={`puneet-${id}`}
              className="relative flex items-center cursor-pointer"
            >
              <div className="w-10 h-5 bg-background-tertiary rounded-full peer-checked:bg-accent-primary peer-focus:outline-none transition-colors"></div>
              <div className="absolute left-[2px] w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
              <span className="ml-2 text-sm font-medium">Puneet</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`komal-${id}`}
              className="sr-only peer"
              checked={doneBy.komal}
              onChange={(e) => onToggleCompletion(id, 'komal', e.target.checked)}
            />
            <label
              htmlFor={`komal-${id}`}
              className="relative flex items-center cursor-pointer"
            >
              <div className="w-10 h-5 bg-background-tertiary rounded-full peer-checked:bg-accent-primary peer-focus:outline-none transition-colors"></div>
              <div className="absolute left-[2px] w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
              <span className="ml-2 text-sm font-medium">Komal</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;