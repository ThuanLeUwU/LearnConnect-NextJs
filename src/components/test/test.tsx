"use client";
import { ReactNode, useEffect, useState } from "react";
import "../../app/./globals.css";
import axios from "axios";
import { UserAuth } from "@/app/context/AuthContext";
import { Empty, Modal } from "antd";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { toast } from "sonner";
import { resetWarned } from "antd/es/_util/warning";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Breadcrumb, Spin } from "antd";
import { Course } from "@/components/courses/courses";

ChartJs.register(ArcElement, Tooltip, Legend);

export type Test = {
  description: ReactNode;
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

const Quiz = (props) => {
  const { idCourse } = props;
  //   console.log("idcourse1", idCourse);
  const router = useRouter();
  const [questionsTest, setQuestionsTest] = useState<Test[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const { userData } = UserAuth();
  const [submitted, setSubmitted] = useState(false); // Track whether the quiz has been submitted
  const handleCancel = () => {
    console.log("Modal has been canceled.");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await http.get(
          `https://learnconnectserver.azurewebsites.net/api/test/get-tests-by-course?courseId=${idCourse}`
        );
        setQuestionsTest(response.data);

        const userAnswersResponse = await http.get(
          `https://learnconnectserver.azurewebsites.net/api/user-answer/get-list-answer-by-course?userId=${userData?.id}&courseId=${idCourse}`
        );
        // console.log("userAnswersResponse", userAnswersResponse.data.length);
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
        const currentQuestion = questionsTest[0].questions.find((q) =>
          q.answers.map((a) => a.id).includes(answerId)
        );
        console.log("updatedAnswers1", currentQuestion);

        if (currentQuestion?.question.questionType === 0) {
          const updatedAnswers = prevAnswers.filter(
            (id) => !currentQuestion?.answers.map((a) => a.id).includes(id)
          );

          console.log("updatedAnswers", updatedAnswers);
          return [...updatedAnswers, answerId];
        }
        return [...prevAnswers, answerId];
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
        const correctAnswer = q.answers
          .filter((answer) => answer.isCorrect)
          .map((a) => a.id);
        if (
          correctAnswer &&
          selectedAnswers &&
          correctAnswer.filter((a) => selectedAnswers.includes(a)).length ===
            correctAnswer.length &&
          q.answers.filter((a) => selectedAnswers.includes(a.id)).length ===
            correctAnswer.length
        ) {
          count++;
        }
      });
    });

    const urlAPI = `https://learnconnectserver.azurewebsites.net/api/user-answer?userId=${userData?.id}&courseId=${idCourse}`;

    try {
      const response = await axios.post(urlAPI, selectedAnswers);
      // console.log("User answers posted successfully:", response.data);

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
    const url = `https://learnconnectserver.azurewebsites.net/api/learning-performance/user/${userId}/course/${idCourse}`;
    try {
      const response = await http.put(url, {
        score: averageScore,
        userId: userId,
        courseId: idCourse,
      });

      const chartDataFormatted = {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            data: [count, totalQuestions - count],
            backgroundColor: ["#309255", "rgb(255, 99, 132)"],
            hoverOffset: 4,
          },
        ],
      };
      Modal.info({
        title: "Quiz Results",
        content: (
          <div className="flex flex-row">
            <div className="w-60">
              <Doughnut data={chartDataFormatted} />
            </div>
            <div className="text-xl pl-5">
              <p className="text-[#309255]">Correct Answers: {count}</p>
              <p>Total Questions : {totalQuestions}</p>
              <p>Average Score : {averageScore.toFixed(2)}</p>
            </div>
          </div>
        ),
        okText: "Close",
        okButtonProps: { style: { backgroundColor: "#309255", color: "#fff" } },
        cancelText: "Cancel",
        cancelButtonProps: {
          style: { backgroundColor: "#309255", color: "#fff" },
        },
        width: 600,
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

  const [oneCourse, setOneCourse] = useState<Course>();

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectserver.azurewebsites.net/api/course/${idCourse}`
        )
        .then((res) => {
          setOneCourse(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat bg-auto flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
          }}
        >
          <div
            className="w-2/5 bg-auto bg-no-repeat bg-right-top flex-1"
            style={{
              backgroundImage: "url('/images/shape-24.png')",
            }}
          />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="">
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
              <div key={item.test.id} className="mb-4">
                <p className="text-3xl font-semibold mb-2 text-center">
                  {item.test.title}
                </p>
                <p className="text-start my-5">{item.test.description}</p>

                {item.questions.map((q, index) => (
                  <div
                    key={q.question.id}
                    className="mb-2 mt-6 p-6 border-2 rounded-lg border-gray-200 shadow-lg"
                  >
                    <p className="mb-1 font-medium text-[18px]">
                      {index + 1}.{" "}
                      <span className="text-gray-500 text-[18px] text font-light">
                        (Choose {q.answers.filter((a) => a.isCorrect).length}{" "}
                        answer
                        {q.answers.filter((a) => a.isCorrect).length <= 1
                          ? ""
                          : "s"}
                        ){" "}
                      </span>
                      {q.question.questionText}
                    </p>
                    <div className="px-4 grid grid-cols-2 gap-4 mt-10">
                      {q.answers.map((answer, ansIndex) => (
                        <button
                          key={answer.id}
                          className={` border-2 p-2 text-left rounded-lg ${
                            submitted
                              ? selectedAnswers?.includes(answer.id)
                                ? answer.isCorrect
                                  ? "border-green-500 bg-green-100"
                                  : "border-red-500 bg-red-100"
                                : "border-gray-300"
                              : selectedAnswers?.includes(answer.id)
                              ? "border-blue-500 bg-blue-100 hover:border-blue-700"
                              : "border-gray-300 hover:border-blue-500"
                          }`}
                          onClick={() => handleAnswerSelect(answer.id)}
                        >
                          <span className="mr-2">
                            {answerOptions[ansIndex]}
                          </span>
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
                    className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                    onClick={handleDoAgain}
                  >
                    Try it again
                  </button>
                </>
              ) : (
                <button
                  className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Quiz;
