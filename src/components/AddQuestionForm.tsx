import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { AlertCircle, ChevronDown, Plus } from 'lucide-react';

const AddQuestionForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [topic, setTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addQuestion } = useFirestore();

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate the link
    if (!link) {
      setError('Platform link is required');
      return;
    }
    
    if (!validateUrl(link)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsSubmitting(true);
    
    const success = await addQuestion({
      link,
      difficulty,
      topic: topic.trim() || 'General',
      doneBy: {
        puneet: false,
        komal: false
      }
    });

    setIsSubmitting(false);
    
    if (success) {
      setLink('');
      setDifficulty('Medium');
      setTopic('');
      setIsOpen(false);
    }
  };

  return (
    <div className="card mb-8 w-full">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold flex items-center">
          <Plus size={18} className="mr-2" />
          Add New Question
        </h2>
        <ChevronDown 
          size={18} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      {isOpen && (
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 rounded-md flex items-center">
                <AlertCircle size={16} className="text-red-500 mr-2" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-text-secondary text-sm mb-1">
                Platform Link *
              </label>
              <input
                type="url"
                className="input"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://leetcode.com/problems/example-problem/"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-text-secondary text-sm mb-1">
                Difficulty
              </label>
              <div className="relative">
                <select
                  className="select w-full appearance-none pr-8"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={16} className="text-text-secondary" />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-text-secondary text-sm mb-1">
                Topic
              </label>
              <input
                type="text"
                className="input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., DP, Graph, Tree"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Question'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddQuestionForm;