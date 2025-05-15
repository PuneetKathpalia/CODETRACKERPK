import React from 'react';
import { Code, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-background-tertiary py-4 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Code size={28} className="text-accent-primary mr-2" />
            <h1 className="text-xl font-bold">CodeTracker PK</h1>
          </div>
          
          <div className="flex items-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-background-tertiary transition-colors"
              title="View on GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;