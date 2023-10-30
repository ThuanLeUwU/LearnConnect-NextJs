"use client";
// import Transaction from "@/components/transaction/transaction";
import ".././globals.css";
import useDataPaymentFetcher from "@/components/pagination/useDataPaymentFetcher";
import Paginate from "@/components/pagination/pagination";

const Transaction = () => {
  const { loading, transaction, totalPages, currentPage, setCurrentPage } =
    useDataPaymentFetcher();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Transaction Data
      </h2>
      {loading ? (
        <div className="text-center text-2xl text-gray-600">Loading...</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">CourseName</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">successDate</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {transaction.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border px-4 py-2 text-center">
                    {item.paymentTransaction.transactionId}
                  </td>
                  <td className="border px-4 py-2">
                    {item.paymentTransaction.courseName}
                  </td>
                  <td className="border px-4 py-2 relative">
                    {item.paymentTransaction.total &&
                      item.paymentTransaction.total.toLocaleString()}{" "}
                    <span className="absolute right-4 text-gray-500">VND</span>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {item.paymentTransaction.status === 0
                      ? "Success"
                      : item.paymentTransaction.status === 1
                      ? "Error"
                      : item.paymentTransaction.status === 2
                      ? "Pending"
                      : "Unknown Status"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(
                      item.paymentTransaction.successDate
                    ).toLocaleDateString("en-GB")}{" "}
                    at{" "}
                    {new Date(
                      item.paymentTransaction.successDate
                    ).toLocaleTimeString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Paginate
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Transaction;
