import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressCounterProps {
  counts: {
    puneet: number;
    komal: number;
    total: number;
  };
}

const ProgressCounter: React.FC<ProgressCounterProps> = ({ counts }) => {
  const getUserProgress = (count: number) => {
    const percentage = counts.total > 0 ? Math.round((count / counts.total) * 100) : 0;
    return { count, percentage };
  };
  
  const puneetProgress = getUserProgress(counts.puneet);
  const komalProgress = getUserProgress(counts.komal);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <UserProgressCard 
        name="Puneet"
        progress={puneetProgress}
        total={counts.total}
        color="bg-accent-primary"
      />
      <UserProgressCard 
        name="Komal"
        progress={komalProgress}
        total={counts.total}
        color="bg-accent-secondary"
      />
    </div>
  );
};

interface UserProgressCardProps {
  name: string;
  progress: {
    count: number;
    percentage: number;
  };
  total: number;
  color: string;
}

const UserProgressCard: React.FC<UserProgressCardProps> = ({
  name,
  progress,
  total,
  color
}) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-lg">{name}'s Progress</h3>
        <div className="flex items-center">
          <CheckCircle2 size={16} className="text-accent-primary mr-1" />
          <span className="text-text-primary font-medium">
            {progress.count} / {total}
          </span>
        </div>
      </div>
      
      <div className="w-full bg-background-tertiary rounded-full h-2.5 mb-1">
        <div 
          className={`h-2.5 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${progress.percentage}%` }}
        ></div>
      </div>
      
      <div className="text-right text-text-secondary text-sm">
        {progress.percentage}% completed
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <StatBox
          icon={<CheckCircle2 size={14} className="text-difficulty-easy" />}
          label="Easy"
        />
        <StatBox
          icon={<CheckCircle2 size={14} className="text-difficulty-medium" />}
          label="Medium"
        />
        <StatBox
          icon={<CheckCircle2 size={14} className="text-difficulty-hard" />}
          label="Hard"
        />
      </div>
    </div>
  );
};

interface StatBoxProps {
  icon: React.ReactNode;
  label: string;
}

const StatBox: React.FC<StatBoxProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center justify-center p-2 bg-background-tertiary rounded-md">
      <div className="mr-1.5">{icon}</div>
      <span className="text-xs text-text-secondary">{label}</span>
    </div>
  );
};

export default ProgressCounter;