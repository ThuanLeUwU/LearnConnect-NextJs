"use client";
import { useState } from "react";
import ".././globals.css";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const Quiz = () => {
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
    },
    {
      id: 2,
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Lion"],
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | null;
  }>({});

  const handleCheckboxChange = (questionId: number, option: string) => {
    const newSelectedAnswers = { ...selectedAnswers };

    // If another option was selected for the same question, clear the previous selection
    for (const id in newSelectedAnswers) {
      if (id !== questionId.toString() && newSelectedAnswers[id] === option) {
        newSelectedAnswers[id] = null;
      }
    }

    // Set the new selection for the current question
    newSelectedAnswers[questionId] =
      selectedAnswers[questionId] === option ? null : option;

    setSelectedAnswers(newSelectedAnswers);
  };
  const handleSubmit = () => {
    // Implement your submit logic here
    console.log(selectedAnswers);
  };

  return (
    <div className="container">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Multiple Choice Quiz</h2>
        {questions.map((question) => (
          <div key={question.id} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAnswers[question.id] === option}
                    onChange={() => handleCheckboxChange(question.id, option)}
                    className="hidden"
                  />
                  <div className="w-6 h-6 border-2 border-gray-400 rounded-full mr-2 flex items-center justify-center">
                    {selectedAnswers[question.id] === option && (
                      <div className="w-3 h-3 bg-[#309255] rounded-full"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </label>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-[#309255] hover:bg-black text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
