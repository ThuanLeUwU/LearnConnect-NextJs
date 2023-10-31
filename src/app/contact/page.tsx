"use client";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-[#fff]">
      <div className="container mx-auto max-w-screen-lg py-20">
        <div className="grid lg:grid-cols-2 pt-6 px-10 pb-16 border border-solid border-opacity-20 border-[#30925533] rounded-lg">
          <div className="mx-auto">
            <div className="px-14 py-16 bg-[#e7f8ee] h-full rounded-lg">
              <div className="flex items-center ">
                <div className="hover:bg-[#309255] my-2 w-24 h-24 border border-solid border-green-600 border-opacity-20 rounded-full transition-all duration-300 ease-in-out delay-0">
                  <i className="flaticon-phone-call"></i>
                </div>
                <div className="pl-7">
                  <p className="font-normal text-[#309255] text-[14px]">
                    Phone No.
                  </p>
                  <p className="text-black">
                    <Link href="tel:88193326867">(88) 193 326 867</Link>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hover:bg-[#309255] my-2 w-24 h-24 border border-solid border-green-600 border-opacity-20 rounded-full transition-all duration-300 ease-in-out delay-0">
                  <i className="flaticon-email"></i>
                </div>
                <div className="pl-7">
                  <p className="font-normal text-[#309255] text-[14px]">
                    Email Address.
                  </p>
                
                    <Link className="text-black" href="mailto:learnconnect@gmail.com">
                      learnConnect@gmail.com
                    </Link>
                  
                </div>
              </div>
              <div className="flex items-center">
                <div className="hover:bg-[#309255] my-2 w-24 h-24 border border-solid border-green-600 border-opacity-20 rounded-full transition-all duration-300 ease-in-out delay-0">
                  <i className="flaticon-pin"></i>
                </div>
                <div className="pl-7">
                  <p className="font-normal text-[#309255] text-[14px]">
                    Office Address.
                  </p>
                  <p className="text-black">Talga, Alabama, USA</p>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="max-w-md mt-11 ml-24">
              <h3 className="text-[30px] font-medium text-black">
                Get in Touch <span className="text-[#309255]">With Us</span>
              </h3>
              <div className="pt-8">
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
                    className="bg-[#309255] text-[18px] px-[35px] py-[15px] rounded-lg text-[#fff] hover:bg-[#000] transition-all duration-300 ease-in-out delay-0"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
