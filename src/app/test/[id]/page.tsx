"use client";
import { useEffect, useState } from "react";
import "../../globals.css";
import axios from "axios";
import { UserAuth } from "@/app/context/AuthContext";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

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

const Quiz = ({ params }: any) => {
  const [questionsTest, setQuestionsTest] = useState<Test[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: { answer: string; isCorrect: boolean };
  }>({});
  const idCourse = params.id;
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const { userData, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false); // Track whether the quiz has been submitted
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    console.log("Modal has been canceled.");
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/test/get-tests-by-course?courseId=${idCourse}`
        );
        setQuestionsTest(response.data);
        console.log("Total Questions:", response.data);
        questionsTest.forEach((item) => {
          const totalQuestion = item.test.totalQuestion;
          console.log("Total Questions:", totalQuestion);
        });
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
    if (!submitted) {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: { answer, isCorrect },
      }));
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    let count = 0;
    let totalQuestions = 0;
    const updatedSelectedAnswers = { ...selectedAnswers };

    questionsTest.forEach((item) => {
      totalQuestions += item.test.totalQuestion;
      item.questions.forEach((q) => {
        const selectedAnswer = selectedAnswers[q.question.id]?.answer;
        const correctAnswer = q.answers.find((answer) => answer.isCorrect);
        if (correctAnswer && selectedAnswer === correctAnswer.answerTest) {
          count++;
        }
      });
    });

    let averageScore = 0;
    if (count > 0) {
      averageScore = (100 / totalQuestions) * count;
    }

    console.log("Correct Answers: ", count);
    console.log("Total Questions: ", totalQuestions);
    console.log("Average Score: ", averageScore);
    const userId = userData?.id;
    const url = `https://learnconnectapitest.azurewebsites.net/api/learning-performance/user/${userId}/course/${idCourse}`;
    try {
      const response = await axios.put(url, {
        score: averageScore,
        userId: userId,
        courseId: idCourse,
      });
      console.log("PUT request successful. Response:", response.data);
      Modal.info({
        title: "Quiz Results",
        content: (
          <div>
            <p>Total Questions: {totalQuestions}</p>
            <p>Correct Answers: {count}</p>
            <p>Average Score: {averageScore}</p>
          </div>
        ),
        okText: "Go to Course",
        okButtonProps: { style: { backgroundColor: "#309255", color: "#fff" } },
        onOk: handleClickGotoCourse,
        cancelText: "Cancel",
        cancelButtonProps: {
          style: { backgroundColor: "#309255", color: "#fff" },
        },
        onCancel: handleCancel,
      });
    } catch (error) {
      console.error("Error in PUT request:", error);
    }
  };

  const handleClickGotoCourse = () => {
    router.push(`/my-course/${idCourse}`);
    setIsModalVisible(false);
  };

  const answerOptions = ["A.", "B.", "C.", "D."];

  return (
    <div className="container mx-auto px-4">
      <div className="p-4">
        {/* <h2 className="text-2xl font-bold mb-4 text-center">
          Multiple Choice Quiz
        </h2> */}
        {questionsTest.map((item) => (
          <div key={item.test.id} className="mb-4 mt-6">
            <h3 className="text-xl font-semibold mb-2">{item.test.title}</h3>
            {item.questions.map((q, index) => (
              <div
                key={q.question.id}
                className="mb-2 mt-6 p-6 border-2 rounded-lg border-gray-200"
              >
                <p className="mb-1 font-medium text-[18px]">
                  {index + 1}. {q.question.questionTest}
                </p>
                <div className="pl-4 grid grid-cols-2 gap-4">
                  {q.answers.map((answer, ansIndex) => (
                    <button
                      key={answer.id}
                      className={`mt-3 border-2 p-2 text-left rounded-lg ${
                        submitted
                          ? selectedAnswers[q.question.id]?.answer ===
                            answer.answerTest
                            ? selectedAnswers[q.question.id]?.isCorrect
                              ? "border-green-500 bg-green-100"
                              : "border-red-500 bg-red-100"
                            : "border-gray-300"
                          : selectedAnswers[q.question.id]?.answer ===
                            answer.answerTest
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-100"
                      }`}
                      onClick={() =>
                        handleAnswerSelect(
                          q.question.id,
                          answer.answerTest,
                          answer.isCorrect
                        )
                      }
                    >
                      <span className="mr-2">{answerOptions[ansIndex]}</span>
                      {answer.answerTest}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-end">
          {submitted ? (
            <button
              className="bg-[#309255] text-white font-bold py-2 px-4 mt-4 rounded"
              onClick={handleClickGotoCourse}
            >
              Go to Course
            </button>
          ) : (
            <button
              className="bg-[#309255] text-white font-bold py-2 px-4 mt-4 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
