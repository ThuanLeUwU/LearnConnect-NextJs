import ".././globals.css";

export default function EditProfile() {
  return (
    <div className="container">
      <div className="bg-[#fff]">
        <div className="container mx-auto max-w-screen-lg py-20">
          <div className="pt-6 px-10 pb-16 border border-solid border-opacity-20 border-[#30925533] rounded-lg">
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-base font-medium text-[#000]"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-base font-medium text-[#000]"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block mb-2 text-base font-medium text-[#000]"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                    placeholder="Flowbite"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-base font-medium text-[#000]"
                  >
                    Phone number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                    placeholder="012345678"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-base font-medium text-[#000]"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  placeholder="•••••••••"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-base font-medium text-[#000]"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className="bg-[#fff] border border-[#30925533] text-[#000] text-base rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#309255]"
                  placeholder="•••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#309255] text-[18px] px-[35px] py-[20px] rounded-lg text-[#fff] hover:bg-[#000] transition-all duration-300 ease-in-out delay-0"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
