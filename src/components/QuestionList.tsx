import React, { useState, useMemo } from 'react';
import { Question, FilterOption } from '../types';
import QuestionItem from './QuestionItem';
import Filters from './Filters';
import ProgressCounter from './ProgressCounter';
import { useFirestore } from '../hooks/useFirestore';
import { Loader } from 'lucide-react';

const QuestionList: React.FC = () => {
  const { questions, loading, error, toggleCompletion } = useFirestore();
  const [difficultyFilter, setDifficultyFilter] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  
  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    questions.forEach(q => {
      if (q.topic) topics.add(q.topic);
    });
    return Array.from(topics).sort();
  }, [questions]);
  
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      // Apply difficulty filter
      if (difficultyFilter !== 'all' && question.difficulty !== difficultyFilter) {
        return false;
      }
      
      // Apply topic filter
      if (topicFilter && question.topic !== topicFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchQuery) {
        const lowercaseQuery = searchQuery.toLowerCase();
        const hostname = new URL(question.link).hostname.toLowerCase();
        const path = new URL(question.link).pathname.toLowerCase();
        return (
          hostname.includes(lowercaseQuery) ||
          path.includes(lowercaseQuery) ||
          question.topic.toLowerCase().includes(lowercaseQuery)
        );
      }
      
      return true;
    });
  }, [questions, difficultyFilter, searchQuery, topicFilter]);
  
  const completedCounts = useMemo(() => {
    const counts = {
      puneet: 0,
      komal: 0,
      total: questions.length
    };
    
    questions.forEach(question => {
      if (question.doneBy.puneet) counts.puneet++;
      if (question.doneBy.komal) counts.komal++;
    });
    
    return counts;
  }, [questions]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <Loader className="animate-spin h-8 w-8 text-accent-primary mb-4" />
        <p className="text-text-secondary">Loading questions...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800/50 rounded-md p-4 text-center">
        <p className="text-red-500">{error}</p>
        <p className="text-text-secondary mt-2 text-sm">Please refresh the page or try again later.</p>
      </div>
    );
  }
  
  return (
    <div>
      <ProgressCounter counts={completedCounts} />
      
      <Filters
        onFilterChange={setDifficultyFilter}
        onSearchChange={setSearchQuery}
        onTopicSelect={setTopicFilter}
        allTopics={allTopics}
        activeFilter={difficultyFilter}
        activeTopic={topicFilter}
      />
      
      {filteredQuestions.length === 0 ? (
        <div className="text-center py-8 bg-background-secondary rounded-lg border border-background-tertiary">
          <p className="text-text-secondary">No questions found with the current filters.</p>
          {(difficultyFilter !== 'all' || topicFilter || searchQuery) && (
            <button
              className="mt-2 text-accent-primary hover:underline"
              onClick={() => {
                setDifficultyFilter('all');
                setTopicFilter('');
                setSearchQuery('');
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-text-secondary mb-4 text-sm">
            Showing {filteredQuestions.length} of {questions.length} questions
          </p>
          
          <div>
            {filteredQuestions.map(question => (
              <QuestionItem 
                key={question.id} 
                question={question} 
                onToggleCompletion={toggleCompletion}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionList;