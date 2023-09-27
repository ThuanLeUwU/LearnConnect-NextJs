"use client"
import Image from "next/image";
import styles from "../contact/styles.module.scss";

export default function ContactPage() {
  return (
    <div className="bg-[#fff]">
      <div className="container mx-auto max-w-screen-lg py-20">
        <div className="grid lg:grid-cols-2 pt-6 px-10 pb-16 border border-solid border-opacity-20 border-[#30925533] rounded-10">
          <div className="mx-auto">
            <div className="px-14 py-16 mt-12">
              <div className="flex items-center">
                <div className="hover:bg-[#309255] my-2 w-24 h-24 border border-solid border-green-600 border-opacity-20 rounded-full transition-all duration-300 ease-in-out delay-0">
                  <i className="flaticon-phone-call"></i>
                </div>
                <div className="pl-7">
                  <h6 className="font-normal text-[#309255] text-[14px]">
                    Phone No.
                  </h6>
                  <p className="text-black">
                    <a href="tel:88193326867">(88) 193 326 867</a>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hover:bg-[#309255] my-2 w-24 h-24 border border-solid border-green-600 border-opacity-20 rounded-full transition-all duration-300 ease-in-out delay-0">
                  <i className="flaticon-email"></i>
                </div>
                <div className="pl-7">
                  <h6 className="font-normal text-[#309255] text-[14px]">
                    Email Address.
                  </h6>
                  <p className="text-black">
                    <a href="mailto:edule100@gmail.com">edule100@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hover:bg-[#309255] my-2 w-24 h-24 border border-solid border-green-600 border-opacity-20 rounded-full transition-all duration-300 ease-in-out delay-0">
                  <i className="flaticon-pin"></i>
                </div>
                <div className="pl-7">
                  <h6 className="font-normal text-[#309255] text-[14px]">
                    Office Address.
                  </h6>
                  <p className="text-black">Talga, Alabama, USA</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="max-w-md mt-11 ml-24">
              <h3 className="text-[30px] font-medium text-black">
                Get in Touch <span className="text-[#309255]">With Us</span>
              </h3>

              <div className="form-wrapper pt-8">
                <form
                  id="contact-form"
                  action="https://htmlmail.hasthemes.com/humayun/edule-contact.php"
                  method="POST"
                >
                  <div className={styles["single-form"]}>
                    <input type="text" name="name" placeholder="Name" />
                  </div>
                  <div className={styles["single-form"]}>
                    <input type="email" name="email" placeholder="Email" />
                  </div>
                  <div className={styles["single-form"]}>
                    <input type="text" name="subject" placeholder="Subject" />
                  </div>
                  <div className={styles["single-form"]}>
                    <textarea name="message" placeholder="Message"></textarea>
                  </div>
                  <p className="form-message"></p>
                  <div className="className=inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-10 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-hover-dark w-full h-full transition-all duration-300 ease-in-out delay-0">
                    <button>
                      Send Message <i className="flaticon-right"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
