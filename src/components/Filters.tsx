import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FilterOption } from '../types';

interface FiltersProps {
  onFilterChange: (filter: FilterOption) => void;
  onSearchChange: (search: string) => void;
  onTopicSelect: (topic: string) => void;
  allTopics: string[];
  activeFilter: FilterOption;
  activeTopic: string;
}

const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  onSearchChange,
  onTopicSelect,
  allTopics,
  activeFilter,
  activeTopic
}) => {
  const [search, setSearch] = useState('');
  const [showTopics, setShowTopics] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setSearch('');
    onSearchChange('');
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-text-tertiary" />
          </div>
          <input
            type="text"
            className="input pl-10 pr-10"
            placeholder="Search questions..."
            value={search}
            onChange={handleSearchChange}
          />
          {search && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={clearSearch}
            >
              <X size={16} className="text-text-tertiary hover:text-text-secondary" />
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <button 
              className="btn btn-secondary flex items-center"
              onClick={() => setShowTopics(!showTopics)}
            >
              <Filter size={16} className="mr-2" />
              {activeTopic || 'All Topics'}
              <ChevronIndicator isOpen={showTopics} />
            </button>
            
            {showTopics && (
              <div className="absolute right-0 mt-2 w-56 bg-background-secondary border border-background-tertiary rounded-md shadow-custom-lg z-10">
                <div className="py-1">
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-background-tertiary ${
                      activeTopic === '' ? 'bg-background-tertiary' : ''
                    }`}
                    onClick={() => {
                      onTopicSelect('');
                      setShowTopics(false);
                    }}
                  >
                    All Topics
                  </button>
                  {allTopics.map((topic) => (
                    <button
                      key={topic}
                      className={`w-full text-left px-4 py-2 hover:bg-background-tertiary ${
                        activeTopic === topic ? 'bg-background-tertiary' : ''
                      }`}
                      onClick={() => {
                        onTopicSelect(topic);
                        setShowTopics(false);
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <DifficultyButton 
              difficulty="all" 
              active={activeFilter === 'all'} 
              onClick={() => onFilterChange('all')} 
            />
            <DifficultyButton 
              difficulty="Easy" 
              active={activeFilter === 'Easy'} 
              onClick={() => onFilterChange('Easy')} 
            />
            <DifficultyButton 
              difficulty="Medium" 
              active={activeFilter === 'Medium'} 
              onClick={() => onFilterChange('Medium')} 
            />
            <DifficultyButton 
              difficulty="Hard" 
              active={activeFilter === 'Hard'} 
              onClick={() => onFilterChange('Hard')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface DifficultyButtonProps {
  difficulty: 'all' | 'Easy' | 'Medium' | 'Hard';
  active: boolean;
  onClick: () => void;
}

const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  difficulty,
  active,
  onClick
}) => {
  const getColorClass = () => {
    if (active) {
      switch (difficulty) {
        case 'Easy': return 'bg-difficulty-easy/20 border-difficulty-easy/50 text-difficulty-easy';
        case 'Medium': return 'bg-difficulty-medium/20 border-difficulty-medium/50 text-difficulty-medium';
        case 'Hard': return 'bg-difficulty-hard/20 border-difficulty-hard/50 text-difficulty-hard';
        default: return 'bg-accent-primary/20 border-accent-primary/50 text-accent-primary';
      }
    }
    return 'hover:bg-background-tertiary';
  };

  return (
    <button
      className={`px-3 py-1.5 rounded-md border border-background-tertiary text-sm font-medium transition-all ${getColorClass()}`}
      onClick={onClick}
    >
      {difficulty === 'all' ? 'All' : difficulty}
    </button>
  );
};

const ChevronIndicator: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export default Filters;