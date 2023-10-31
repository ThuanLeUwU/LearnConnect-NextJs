"use client";
import { useEffect, useState } from "react";
import "../../globals.css";
import axios from "axios";

export type Test = {
  test: {
    id: number;
    title: string;
    description: string;
    totalQuestion: number;
    status: number;
    courseId: number;
    questions: any;
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

const Quiz = (
  { params }: any,
  {
    id,
    title,
    description,
    totalQuestion,
    status,
    courseId,
    questions,
  }: Test["test"]
) => {
  const [questionsTest, setQuestionsTest] = useState<Test[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | any;
  }>({});
  const idCourse = params.id;
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/test/get-tests-by-course?courseId=${idCourse}`
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
    let count = 0;
    questionsTest.forEach((item) => {
      item.questions.forEach((q) => {
        const selectedAnswer = selectedAnswers[q.question.id];
        const correctAnswer = q.answers.find((answer) => answer.isCorrect);
        if (correctAnswer && selectedAnswer === correctAnswer.answerTest) {
          count++;
        }
      });
    });
    console.log("Correct Answers: ", count);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Multiple Choice Quiz
        </h2>
        {questionsTest.map((item) => (
          <div key={item.test.id} className="mb-4 mt-6">
            <h3 className="text-lg font-semibold mb-2">{item.test.title}</h3>
            {item.questions.map((q) => (
              <div key={q.question.id} className="mb-2">
                <p className="mb-1">{q.question.questionTest}</p>
                <div className="pl-4">
                  {q.answers.map((answer) => (
                    <button
                      key={answer.id}
                      className={`mt-1 border-2 p-2 w-full text-left rounded-lg ${
                        selectedAnswers[q.question.id] === answer.answerTest
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        handleAnswerSelect(
                          q.question.id,
                          answer.answerTest,
                          answer.isCorrect
                        )
                      }
                    >
                      {answer.answerTest}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="bg-[#309255] text-white font-bold py-2 px-4 mt-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

// "use client";
// // import Transaction from "@/components/transaction/transaction";
// import ".././globals.css";
// import useDataPaymentFetcher from "@/components/pagination/useDataPaymentFetcher";
// import Paginate from "@/components/pagination/pagination";

// const Test = () => {
//   return <></>;
// };

// export default Test;
