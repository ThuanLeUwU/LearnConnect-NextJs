"use client";
import { useEffect, useState } from "react";
import ".././globals.css";
import axios from "axios";

export type Test = {
  test: {
    id: number;
    title: string;
    description: string;
    totalQuestion: number;
    status: number;
    courseId: number;
    questions: null;
  };
  questions: [
    {
      question: {
        id: number;
        questionTest: string;
        questionType: number;
        status: number;
        testId: number;
      };
      answers: [
        {
          id: number;
          answerTest: string;
          isCorrect: boolean;
          questionId: number;
        }
      ];
    }
  ];
};

const Quiz = ({
  id,
  title,
  description,
  totalQuestion,
  status,
  courseId,
  questions,
}: Test["test"]) => {
  const [questionsTest, setQuestionsTest] = useState<Test[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | null;
  }>({});
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/test/get-tests-by-course?courseId=1`
        );
        setQuestionsTest(response.data);
        console.log("question:", response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (
    questionId: number,
    answer: string,
    isCorrect: boolean
  ) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
    if (isCorrect) {
      setCorrectAnswers((prevCount) => prevCount + 1);
    }
  };

  const handleSubmit = () => {
    console.log("Selected Answers: ", selectedAnswers);
    console.log("Correct Answers: ", correctAnswers);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Multiple Choice Quiz</h2>
        {questionsTest.map((item) => (
          <div key={item.test.id} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{item.test.title}</h3>
            {item.questions.map((q) => (
              <div key={q.question.id} className="mb-2">
                <p className="mb-1">{q.question.questionTest}</p>
                <ul className="pl-4">
                  {q.answers.map((answer) => (
                    <li key={answer.id} className="mt-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`question${q.question.id}`}
                          className="form-radio h-5 w-5 text-blue-500"
                          onChange={() =>
                            handleAnswerSelect(
                              q.question.id,
                              answer.answerTest,
                              answer.isCorrect
                            )
                          }
                        />
                        <span className="ml-2 text-gray-700">
                          {answer.answerTest}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;
