import React from 'react';
import Header from './components/Header';
import AddQuestionForm from './components/AddQuestionForm';
import QuestionList from './components/QuestionList';

function App() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-4 flex-grow">
        <AddQuestionForm />
        <QuestionList />
      </main>
      
      <footer className="text-center py-6 text-text-tertiary text-sm border-t border-background-tertiary mt-8">
        <p>CodeTracker PK © {new Date().getFullYear()} | Built with React, Firebase, and Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;