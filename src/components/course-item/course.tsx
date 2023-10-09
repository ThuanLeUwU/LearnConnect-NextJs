import ProgressBar from "@ramonak/react-progress-bar";

const CourseItem = () => {
  return (
    <div className="lg:col-span-4 border border-solid border-[#acd6bc] p-[20px] rounded-lg my-[10px] hover:border-[#309255] mx-[15px]">
      <div className="single-courses">
        <div className="courses-images">
          <a href="courses-details.html">
            <img
              className="rounded-lg w-full"
              src="./courses-01.jpg"
              alt="Courses"
            />
          </a>
        </div>
        <div className="courses-content">
          <div className="courses-author">
            <div className="flex text-center items-center pt-[25px]">
              <div className="author-thumb">
                <a href="#">
                  <img
                    className="rounded-full w-[50px] h-[50px]"
                    src="./author-01.jpg"
                    alt="Author"
                  />
                </a>
              </div>
              <div className="pl-3">
                <a className="text-[#52565b] hover:text-[#309255]" href="#">
                  Jason Williams
                </a>
                <a> || </a>
                <a className="text-[#309255]" href="#">
                  Ohula Malsh
                </a>
              </div>
            </div>
          </div>

          <h4 className="mt-[13px] mb-2 text-[#52565b] text-[16px] hover:text-[#309255]">
            <a href="">
              Data Science and Machine Learning with Python - Hands On!
            </a>
          </h4>

          <div className="courses-rating">
            <p className="text-[#52565b] text-[14px]">38% Complete</p>

            <div className="rating-progress-bar mt-2">
              <ProgressBar
                completed={38}
                bgColor="#309255"
                height="15px"
                customLabel=""
              />
            </div>
            <div className="rating-meta">
              <span className="rating-star">
                <span className="rating-bar"></span>
              </span>
              <p className="text-[#52565b] text-[14px] text-right pt-2">
                Your rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
