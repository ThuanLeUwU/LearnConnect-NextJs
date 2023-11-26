"use client";
import { useEffect, useState } from "react";
import "../../globals.css";
import axios from "axios";
import { UserAuth } from "@/app/context/AuthContext";
import { Empty, Modal } from "antd";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { toast } from "sonner";
import { resetWarned } from "antd/es/_util/warning";

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
        questionText: string;
        questionType: number;
        status: number;
        testId: number;
      };
      answers: [
        {
          id: number;
          answerText: string;
          isCorrect: boolean;
          questionId: number;
        }
      ];
    }
  ];
};

export default function Quiz({ params }: any) {
  const router = useRouter();
  const { role } = UserAuth();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    // if (role === 2) {
    //   router.push(`/instructorcourses`);
    // }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    if (role === -1) {
      router.push(`/`);
    }
  });
  const [questionsTest, setQuestionsTest] = useState<Test[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const idCourse = params.id;
  const { userData } = UserAuth();
  const [submitted, setSubmitted] = useState(false); // Track whether the quiz has been submitted
  const handleCancel = () => {
    console.log("Modal has been canceled.");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await http.get(
          `https://learnconnectapitest.azurewebsites.net/api/test/get-tests-by-course?courseId=${idCourse}`
        );
        setQuestionsTest(response.data);
        console.log("asad", questionsTest);
        const userAnswersResponse = await http.get(
          `https://learnconnectapitest.azurewebsites.net/api/user-answer/get-list-answer-by-course?userId=${userData?.id}&courseId=${idCourse}`
        );
        console.log("userAnswersResponse", userAnswersResponse.data.length);
        if (userAnswersResponse.data.length !== 0) {
          setSelectedAnswers(
            userAnswersResponse.data.map((answer) => answer.answerId)
          );
          setSubmitted(true);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (answerId) => {
    if (!submitted) {
      setSelectedAnswers((prevAnswers) => {
        const isSelected = prevAnswers.includes(answerId);
        return isSelected
          ? prevAnswers.filter((id) => id !== answerId)
          : [...prevAnswers, answerId];
      });
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    let count = 0;
    let totalQuestions = 0;

    questionsTest.forEach((item) => {
      totalQuestions += item.test.totalQuestion;
      item.questions.forEach((q) => {
        const correctAnswer = q.answers.find((answer) => answer.isCorrect);
        if (
          correctAnswer &&
          selectedAnswers &&
          selectedAnswers.includes(correctAnswer.id)
        ) {
          count++;
        }
      });
    });

    const urlAPI = `https://learnconnectapitest.azurewebsites.net/api/user-answer?userId=${userData?.id}&courseId=${idCourse}`;

    try {
      const response = await axios.post(urlAPI, selectedAnswers);
      console.log("User answers posted successfully:", response.data);

      setTimeout(() => {
        toast.success("Save Answer successful");
      });
    } catch (error) {
      console.error("Error posting user answers:", error);

      setTimeout(() => {
        toast.error(error.response.data);
      });
    }

    let averageScore = 0;
    if (count > 0) {
      averageScore = (100 / totalQuestions) * count;
    }
    const userId = userData?.id;
    const url = `https://learnconnectapitest.azurewebsites.net/api/learning-performance/user/${userId}/course/${idCourse}`;
    try {
      const response = await http.put(url, {
        score: averageScore,
        userId: userId,
        courseId: idCourse,
      });
      Modal.info({
        title: "Quiz Results",
        content: (
          <div>
            <p>Total Questions: {totalQuestions}</p>
            <p>Correct Answers: {count}</p>
            <p>Average Score: {averageScore}</p>
          </div>
        ),
        okText: "Close",
        okButtonProps: { style: { backgroundColor: "#309255", color: "#fff" } },
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

  const handleDoAgain = () => {
    setSubmitted(false);
    setSelectedAnswers([]);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClickGotoCourse = () => {
    router.push(`/my-course/${idCourse}`);
  };

  const answerOptions = ["A.", "B.", "C.", "D."];

  return (
    <div className="container mx-auto px-4">
      <div className="p-4">
        {questionsTest.length === 0 ? (
          <div className="text-center text-2xl mt-8 items-center justify-center min-h-[60vh]">
            <Empty description={false} />
            This Course don&apos;t have any quiz questions available.
            <div>
              <button
                className="bg-[#309255] text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={handleClickGotoCourse}
              >
                Back to Course
              </button>
            </div>
          </div>
        ) : (
          questionsTest.map((item) => (
            <div key={item.test.id} className="mb-4 mt-6">
              <h3 className="text-xl font-semibold mb-2">{item.test.title}</h3>

              {item.questions.map((q, index) => (
                <div
                  key={q.question.id}
                  className="mb-2 mt-6 p-6 border-2 rounded-lg border-gray-200 shadow-lg"
                >
                  <p className="mb-1 font-medium text-[18px]">
                    {index + 1}. {q.question.questionText}
                  </p>
                  <div className="pl-4 grid grid-cols-2 gap-4">
                    {q.answers.map((answer, ansIndex) => (
                      <button
                        key={answer.id}
                        className={`mt-3 border-2 p-2 text-left rounded-lg ${
                          submitted
                            ? selectedAnswers?.includes(answer.id)
                              ? answer.isCorrect
                                ? "border-green-500 bg-green-100"
                                : "border-red-500 bg-red-100"
                              : "border-gray-300"
                            : selectedAnswers?.includes(answer.id)
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-100"
                        }`}
                        onClick={() => handleAnswerSelect(answer.id)}
                      >
                        <span className="mr-2">{answerOptions[ansIndex]}</span>
                        {answer.answerText}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        {questionsTest.length > 0 && ( // Conditionally render submit button
          <div className="flex justify-end">
            {submitted ? (
              <>
                <button
                  className="bg-[#309255] text-white font-bold py-2 px-4 mt-4 rounded mx-2 hover:bg-[#309256da]"
                  onClick={handleDoAgain}
                >
                  Try it again
                </button>
                <button
                  className="bg-[#309255] text-white font-bold py-2 px-4 mt-4 rounded mx-2 hover:bg-[#309256da]"
                  onClick={handleClickGotoCourse}
                >
                  Go to Course
                </button>
              </>
            ) : (
              <button
                className="bg-[#309255] text-white font-bold py-2 px-4 mt-4 rounded mx-2 hover:bg-[#309256da]"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
