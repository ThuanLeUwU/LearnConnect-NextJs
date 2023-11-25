"use client";
import { useEffect, useState } from "react";
import "../../globals.css";
import axios from "axios";
import { UserAuth } from "@/app/context/AuthContext";
import { Empty, Modal } from "antd";
import { useRouter } from "next/navigation";
import { Console } from "console";
import { toast } from "sonner";

export type Test = {
  test: {
    id: number;
    title: string;
    description: string;
    totalQuestion: number;
    createDate: string;
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
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: { answerId: number; answer: string; isCorrect: boolean };
  }>({});
  const idCourse = params.id;
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const { userData, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [submitted, setSubmitted] = useState(false); // Track whether the quiz has been submitted
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userAnswers, setUserAnswers] = useState<
    Array<{ questionId: number; answer: string }>
  >([]);

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
        questionsTest.forEach((item) => {
          const totalQuestion = item.test.totalQuestion;
          // console.log("Total Questions:", totalQuestion);
        });
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (
    questionId: number,
    answerId: number,
    answer: string,
    isCorrect: boolean
  ) => {
    if (!submitted) {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: { answerId, answer, isCorrect },
      }));
      console.log(`Selected Answer ID for question ${questionId}: ${answerId}`);
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    let count = 0;
    let totalQuestions = 0;
    const updatedSelectedAnswers = { ...selectedAnswers };
    const userSelectedAnswers: number[] = [];

    questionsTest.forEach((item) => {
      totalQuestions += item.test.totalQuestion;
      item.questions.forEach((q) => {
        const selectedAnswer = selectedAnswers[q.question.id];
        const answerId = selectedAnswer ? selectedAnswer.answerId : -1;

        userSelectedAnswers.push(answerId);

        const correctAnswer = q.answers.find((answer) => answer.isCorrect);
        if (
          correctAnswer &&
          selectedAnswer &&
          selectedAnswer.answer === correctAnswer.answerText
        ) {
          count++;
        }
      });
    });

    console.log("User selected answers:", userSelectedAnswers);

    const urlAPI = `https://learnconnectapitest.azurewebsites.net/api/user-answer?userId=${userData?.id}&courseId=${idCourse}`;

    try {
      const response = await axios.post(urlAPI, userSelectedAnswers);
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
      const response = await axios.put(url, {
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
        onOk: handleCancel,
        cancelButtonProps: { style: { display: "none" } }, // To hide the Cancel button
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
                  className="mb-2 mt-6 p-6 border-2 rounded-lg border-gray-200"
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
                            ? selectedAnswers[q.question.id]?.answerId ===
                              answer.id
                              ? selectedAnswers[q.question.id]?.isCorrect
                                ? "border-green-500 bg-green-100"
                                : "border-red-500 bg-red-100"
                              : "border-gray-300"
                            : selectedAnswers[q.question.id]?.answerId ===
                              answer.id
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-100"
                        }`}
                        onClick={() =>
                          handleAnswerSelect(
                            q.question.id,
                            answer.id, // Pass answerId to the function
                            answer.answerText,
                            answer.isCorrect
                          )
                        }
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
        )}
      </div>
    </div>
  );
}
