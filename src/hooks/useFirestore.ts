import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Question } from '../types';

export const useFirestore = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const questionsData: Question[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          questionsData.push({
            id: doc.id,
            link: data.link,
            difficulty: data.difficulty,
            topic: data.topic,
            doneBy: data.doneBy || { puneet: false, komal: false },
            createdAt: data.createdAt?.toMillis() || Date.now()
          });
        });
        
        setQuestions(questionsData);
        setLoading(false);
        setError(null);
      }, 
      (err) => {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please check your connection and try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addQuestion = async (question: Omit<Question, 'id' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'questions'), {
        ...question,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (err) {
      console.error("Error adding question:", err);
      setError("Failed to add question. Please try again.");
      return null;
    }
  };

  const updateQuestion = async (id: string, data: Partial<Question>) => {
    try {
      const questionRef = doc(db, 'questions', id);
      await updateDoc(questionRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (err) {
      console.error("Error updating question:", err);
      setError("Failed to update question. Please try again.");
      return false;
    }
  };

  const toggleCompletion = async (id: string, user: 'puneet' | 'komal', value: boolean) => {
    try {
      const questionRef = doc(db, 'questions', id);
      await updateDoc(questionRef, {
        [`doneBy.${user}`]: value,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (err) {
      console.error("Error toggling completion:", err);
      setError("Failed to update completion status. Please try again.");
      return false;
    }
  };

  return {
    questions,
    loading,
    error,
    addQuestion,
    updateQuestion,
    toggleCompletion
  };
};