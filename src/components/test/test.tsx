"use client";
import { ReactNode, useEffect, useState } from "react";
import "../../app/./globals.css";
import axios from "axios";
import { UserAuth } from "@/app/context/AuthContext";
import { Button, Empty, Modal, Table, Tabs, Tag } from "antd";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { toast } from "sonner";
import { resetWarned } from "antd/es/_util/warning";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Breadcrumb, Spin } from "antd";
import { Course } from "@/components/courses/courses";
import {
  differenceInMilliseconds,
  differenceInSeconds,
  format,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import dayjs from "dayjs";
import { ArrowLeftOutlined } from "@ant-design/icons";

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

export type TestResult = {
  id: number;
  score: number;
  timeSpent: string;
  timeSubmit: string;
  userId: number;
  testId: number;
};

const Quiz = (props) => {
  const { idCourse, setScore, IdTest, setIsTestOpen } = props;
  const [idTest, setIdTest] = useState<number>();
  const router = useRouter();
  const [questionsTest, setQuestionsTest] = useState<Test[]>([]);
  const [titleTest, setTitleTest] = useState<string>();
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const { userData } = UserAuth();
  const [submitted, setSubmitted] = useState(false); // Track whether the quiz has been submitted
  const [testResulted, setTestResulted] = useState(false);
  const [reviewQuiz, setReviewQuiz] = useState(false);
  const [resultAllTest, setResultAllTest] = useState<TestResult[]>([]);

  const [startTime, setStartTime] = useState<number>(0);

  const [endTime, setEndTime] = useState<number>(0);

  const [refresh, setRefresh] = useState<boolean>();

  const handleCancel = () => {
    console.log("Modal has been canceled.");
  };

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectapifpt.azurewebsites.net/api/test-resutl/get-tests-result?userId=${userData?.id}&courseId=${idCourse}`
        )
        .then((res) => {
          setResultAllTest(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  }, [userData, refresh]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await http.get(
          `https://learnconnectapifpt.azurewebsites.net/api/test/get-tests-by-course?courseId=${idCourse}`
        );
        setQuestionsTest(response.data);

        const userAnswersResponse = await http.get(
          `https://learnconnectapifpt.azurewebsites.net/api/user-answer/get-list-answer-by-test?userId=${userData?.id}&testId=${idTest}`
        );
        if (userAnswersResponse.data.length !== 0) {
          setTestResulted(true);
          setSelectedAnswers(
            userAnswersResponse.data[0].map((answer) => answer.answerId)
          );

          setSubmitted(true);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [idTest, userData]);

  const [oneQuestionTest, setOneQuestionTest] = useState<Test[]>([]);

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectapifpt.azurewebsites.net/api/test/get-test-by-course?courseId=${idCourse}&testId=${idTest}`
        )
        .then((res) => {
          setOneQuestionTest(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  }, [idTest]);

  const [oneTestDetails, setOneTestDetail] = useState<Test>();

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectapifpt.azurewebsites.net/api/test/get-test-by-course?courseId=${idCourse}&testId=${idTest}`
        )
        .then((res) => {
          setOneTestDetail(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  }, [idTest]);

  const handleAnswerSelect = (answerId) => {
    if (!submitted) {
      setSelectedAnswers((prevAnswers) => {
        const currentQuestion = oneQuestionTest[0].questions.find((q) =>
          q.answers.map((a) => a.id).includes(answerId)
        );

        if (currentQuestion?.question.questionType === 0) {
          const updatedAnswers = prevAnswers.filter(
            (id) => !currentQuestion?.answers.map((a) => a.id).includes(id)
          );
          return [...updatedAnswers, answerId];
        } else if (currentQuestion?.question.questionType === 1) {
          const isSelected = prevAnswers.includes(answerId);
          if (isSelected) {
            return prevAnswers.filter((id) => id !== answerId);
          } else {
            return [...prevAnswers, answerId];
          }
        }
        return [...prevAnswers, answerId];
      });
    }
  };

  const [duration, setDuration] = useState<number>(0);

  const handleSubmit = async (data) => {
    setSubmitted(true);
    setQuizStarted(false);
    // setReviewQuiz(true);
    let count = 0;
    let totalQuestions = 0;

    oneQuestionTest.forEach((item) => {
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

    const urlAPI = `https://learnconnectapifpt.azurewebsites.net/api/user-answer?userId=${userData?.id}&testId=${data}`;

    try {
      axios.post(urlAPI, selectedAnswers).then((res) => {
        setEndTime(dayjs().valueOf());
      });

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
    setScore(averageScore);
    const userId = userData?.id;
    const testId = data;
    let timeSubmit = dayjs().valueOf();
    const durationInSeconds = dayjs(timeSubmit).diff(startTime, "seconds");
    setDuration(durationInSeconds);

    const formData = new FormData();
    formData.append("score", averageScore.toString());
    formData.append("timeSpent", durationInSeconds.toString());
    formData.append("timeSubmit", endTime.toString());
    // }

    const url = `https://learnconnectapifpt.azurewebsites.net/api/test-resutl?userId=${userData?.id}&testId=${data}`;
    try {
      http.put(url, formData).then(() => {
        setShowTable(true);
        setRefresh(!refresh);
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

  const [scoreLastSubmit, setScoreLastSubmit] = useState<number>();

  const handleDoAgain = (record) => {
    // setOneTest(record);
    setShowTable(false);
    // setIdTest(record.test.id);
    setStartTime(dayjs().valueOf());
    setSubmitted(false);
    setQuizStarted(true);
    setReviewQuiz(false);
    setSelectedAnswers([]);
    setSubmitted(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClickGotoCourse = () => {
    // router.push(`/my-course/${idCourse}`);
    setIsTestOpen(false);
  };

  const answerOptions = ["A.", "B.", "C.", "D."];

  const [oneCourse, setOneCourse] = useState<Course>();

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectapifpt.azurewebsites.net/api/course/${idCourse}`
        )
        .then((res) => {
          setOneCourse(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const { TabPane } = Tabs;

  const [selectedTab, setSelectedTab] = useState("1");

  const handleTabChange = (key) => {
    if (!quizStarted) {
      // Allow switching tabs only if the quiz is started and not submitted
      setSelectedTab(key);
      setIdTest(key);
    }
  };

  const [showTable, setShowTable] = useState(true);
  const [oneTest, setOneTest] = useState<Test>();

  const handleStartQuiz = (record) => {
    setStartTime(dayjs().valueOf());
    setShowTable(false);
    setOneTest(record);
    setIdTest(record.test.id);
    setReviewQuiz(false);
    setSubmitted(false);
    setQuizStarted(true);
  };

  const handleReviewQuiz = (record) => {
    setReviewQuiz(true);
    setQuizStarted(false);
    setShowTable(false);
    // setSelectedTab(); // Start with the first test
    setOneTest(record);
    setIdTest(record.test.id);
  };

  const handleBackListTest = () => {
    setReviewQuiz(false);
    setQuizStarted(false);
    setShowTable(true);
  };

  const [quizStarted, setQuizStarted] = useState(false);

  const columns = [
    {
      title: "Title",
      dataIndex: ["test", "title"],
      key: "test.title",
    },
    {
      title: "Total Questions",
      dataIndex: ["test", "totalQuestion"],
      key: "totalQuestion",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (text, record) => {
        const score = resultAllTest.find(
          (score) => score.testId === record.test.id
        )?.score;

        if (score !== undefined && score !== null) {
          return <span>{score}/100</span>;
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: "Last Submitted",
      dataIndex: "timeSubmit",
      key: "timeSubmit",
      render: (text, record) => {
        const timeSubmit = resultAllTest.find(
          (timeSubmit) => timeSubmit.testId === record.test.id
        )?.timeSubmit;

        return (
          <span>
            {timeSubmit
              ? format(new Date(timeSubmit), "dd/MM/yyyy HH:mm:ss")
              : "Not submitted"}
          </span>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "timeSpent",
      key: "timeSpent",
      render: (text, record) => {
        const timeSpent: number | undefined = Number(
          resultAllTest.find((time) => time.testId === record.test.id)
            ?.timeSpent
        );

        if (timeSpent) {
          if (timeSpent < 60) {
            // If less than 60 seconds, display only seconds
            return <span>{`${timeSpent}s`}</span>;
          } else {
            // If 60 seconds or more, display minutes and seconds
            const minutes = Math.floor(timeSpent / 60);
            const remainingSeconds = timeSpent % 60;

            return <span>{`${minutes}m ${remainingSeconds}s`}</span>;
          }
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        const timeSubmit = resultAllTest.find(
          (timeSubmit) => timeSubmit.testId === record.test.id
        )?.timeSubmit;

        return (
          <Tag color={timeSubmit ? "green" : "gray"}>
            {timeSubmit ? "Done" : "Not completed"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        const testScore = resultAllTest.find(
          (score) => score.testId === record.test.id
        )?.score;

        return (
          <span>
            {testScore !== undefined ? (
              <>
                {/* <Button onClick={() => handleDoAgain(record)}>
                  Try It Again
                </Button> */}
                <Button onClick={() => handleReviewQuiz(record)}>Review</Button>
              </>
            ) : (
              <Button onClick={() => handleStartQuiz(record)}>
                Start Quiz
              </Button>
            )}
          </span>
        );
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <span>
    //       {/* {record.test.status === 0 ? ( */}
    //       <Button onClick={() => handleStartQuiz(record)}>Start Quiz</Button>
    //       {/* ) : ( */}
    //       <Button onClick={() => handleReviewQuiz(record)}>Review</Button>
    //       {/* )} */}
    //     </span>
    //   ),
    // },
  ];

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
            <div>
              {/* {!quizStarted && (
                <button
                  className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                  onClick={handleStartQuiz}
                >
                  Start Quiz
                </button>
              )} */}
              {/* {quizStarted && ( */}

              {!showTable ? (
                <>
                  <div key={oneTest?.test.id} className="mb-4">
                    <p className="text-3xl font-semibold mb-2 text-center">
                      {oneTest?.test.title}
                    </p>
                    <p className="text-start my-5">
                      {oneTest?.test.description}
                    </p>
                    {quizStarted && (
                      <>
                        {oneTest?.questions.map((q, index) => (
                          <div
                            key={q.question.id}
                            className="mb-2 mt-6 p-6 border-2 rounded-lg border-gray-200 shadow-lg"
                          >
                            <p className="mb-1 font-medium text-[18px]">
                              {index + 1}.{" "}
                              <span className="text-gray-500 text-[18px] text font-light">
                                (Choose{" "}
                                {q.answers.filter((a) => a.isCorrect).length}{" "}
                                answer
                                {q.answers.filter((a) => a.isCorrect).length <=
                                1
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
                        {questionsTest.length > 0 && ( // Conditionally render submit button
                          <div className="flex justify-end">
                            <button
                              className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                              onClick={() => handleSubmit(oneTest?.test.id)}
                            >
                              Submit
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {reviewQuiz && (
                      <>
                        {oneTest?.questions.map((q, index) => (
                          <div
                            key={q.question.id}
                            className="mb-2 mt-6 p-6 border-2 rounded-lg border-gray-200 shadow-lg"
                          >
                            <p className="mb-1 font-medium text-[18px]">
                              {index + 1}.{" "}
                              <span className="text-gray-500 text-[18px] text font-light">
                                (Choose{" "}
                                {q.answers.filter((a) => a.isCorrect).length}{" "}
                                answer
                                {q.answers.filter((a) => a.isCorrect).length <=
                                1
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
                        {questionsTest.length > 0 && ( // Conditionally render submit button
                          <div className="flex justify-end">
                            <button
                              className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                              onClick={handleDoAgain}
                            >
                              Try it again
                            </button>
                            <button
                              className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                              onClick={handleBackListTest}
                            >
                              Back To List
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <ArrowLeftOutlined
                    onClick={handleClickGotoCourse}
                    style={{ fontSize: "36px" }}
                  />
                  <Table dataSource={questionsTest} columns={columns} />
                </div>
              )}
              {/* {questionsTest.map((item, index) => (
                <TabPane tab={`Test ${index + 1}`} key={item.test.id}>
                <div key={item.test.id} className="mb-4">
                  <p className="text-3xl font-semibold mb-2 text-center">
                    {item.test.title}
                  </p>
                  <p className="text-start my-5">{item.test.description}</p>
                  {testResulted ? (
                    <>
                      {!reviewQuiz && (
                        <button
                          className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                          onClick={handleReviewQuiz}
                        >
                          Review
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {!quizStarted && (
                        <button
                          className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                          onClick={handleStartQuiz}
                        >
                          Start Quiz
                        </button>
                      )}
                    </>
                  )}
                  {reviewQuiz && (
                    <>
                      {item.questions.map((q, index) => (
                        <div
                          key={q.question.id}
                          className="mb-2 mt-6 p-6 border-2 rounded-lg border-gray-200 shadow-lg"
                        >
                          <p className="mb-1 font-medium text-[18px]">
                            {index + 1}.{" "}
                            <span className="text-gray-500 text-[18px] text font-light">
                              (Choose{" "}
                              {q.answers.filter((a) => a.isCorrect).length}{" "}
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
                      {questionsTest.length > 0 && ( // Conditionally render submit button
                        <div className="flex justify-end">
                          <>
                            <button
                              className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                              onClick={handleDoAgain}
                            >
                              Try it again
                            </button>
                          </>
                        </div>
                      )}
                    </>
                  )}

                  {quizStarted && (
                    <>
                      {item.questions.map((q, index) => (
                        <div
                          key={q.question.id}
                          className="mb-2 mt-6 p-6 border-2 rounded-lg border-gray-200 shadow-lg"
                        >
                          <p className="mb-1 font-medium text-[18px]">
                            {index + 1}.{" "}
                            <span className="text-gray-500 text-[18px] text font-light">
                              (Choose{" "}
                              {q.answers.filter((a) => a.isCorrect).length}{" "}
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
                      {questionsTest.length > 0 && ( // Conditionally render submit button
                        <div className="flex justify-end">
                          <button
                            className="bg-[#309255] text-white font-bold py-2 px-4 my-4 rounded mx-2 hover:bg-[#309256da] shadow-lg w-full"
                            onClick={() => handleSubmit(item.test.id)}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                </TabPane>
              ))} */}

              {/* <Tabs activeKey={selectedTab} onChange={handleTabChange}>
               
              </Tabs> */}
              {/* )} */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Quiz;
