import Image from "next/image";
import styles from "../user-manage/styles.module.scss";

export default function UserManagePage() {
  return (
    <div className="bg-gray-200">
      <div className="grid cols-2 lg:grid-cols-12">
        <div className="lg:cols-span-1 w-full">
          <div className={styles["sidebar-wrapper"]}>
            <div className={styles["menu-list"]}>
              <a className={styles["active"]} href="#">
                <img src="assets/images/menu-icon/icon-1.png" alt="Icon" />
              </a>
              <a href="#">
                <img src="assets/images/menu-icon/icon-2.png" alt="Icon" />
              </a>
              <a href="#">
                <img src="assets/images/menu-icon/icon-3.png" alt="Icon" />
              </a>
              <a href="#">
                <img src="assets/images/menu-icon/icon-4.png" alt="Icon" />
              </a>
              <a href="#">
                <img src="assets/images/menu-icon/icon-5.png" alt="Icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-11">
          <div className="content-wrapper text-black w-full">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-center text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Class
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Heading
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Heading
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Default
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b border-primary-200 bg-primary-100 text-neutral-800">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Primary
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Secondary
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b border-success-200 bg-success-100 text-neutral-800">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Success
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b border-danger-200 bg-danger-100 text-neutral-800">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Danger
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b border-warning-200 bg-warning-100 text-neutral-800">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Warning
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b border-info-200 bg-info-100 text-neutral-800">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Info
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b border-neutral-100 bg-neutral-50 text-neutral-800 dark:bg-neutral-50">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Light
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Dark
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
