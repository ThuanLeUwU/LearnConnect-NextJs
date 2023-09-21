import Image from "next/image";
import styles from "../login/styles.module.scss";

export default function LoginPage() {
  return (
    <div className={styles["main-wrapper"]}>
      <div className="bg-gray-200">
        <div className="container mx-auto ">
          <div className="grid lg:grid-cols-2">
            <div className="mx-auto">
              <img src="/register-login.png" alt="Shape" />
            </div>
            <div className="">
              <div className="mx-auto max-w-md">
                <h3 className="text-[30px] font-medium text-black">
                  Login <span className="text-[#309255]">Now</span>
                </h3>
                <div>
                  <form action="#">
                    <div className={styles["single-form"]}>
                      <input type="email" placeholder="Username or Email" />
                    </div>
                    <div className={styles["single-form"]}>
                      <input type="password" placeholder="Password" />
                    </div>
                    <div className={styles["single-form"]}>
                      <button className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-hover-dark w-full transition-all duration-300 ease-in-out delay-0 my-2">
                        Login
                      </button>
                      <a
                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-white text-[#309255] hover:bg-[#309255] btn-outline w-full border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                        href="#"
                      >
                        Login with Google
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
