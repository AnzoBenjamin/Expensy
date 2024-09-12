import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import {
  GET_AUTHENTICATED_USER,
  GET_USER_AND_TRANSACTIONS,
} from "../graphql/queries/user.query";
import generateTransactionPDF from "../libs/generateTransactionPDF";
const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);

  const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
    variables: {
      userId: authUser?.authUser?._id,
    },
  });

  const handleGeneratePDF = () => {
    if (userAndTransactions?.user?.transactions) {
      generateTransactionPDF(
        userAndTransactions.user.transactions,
        userAndTransactions.user.name
      );
    }
  };

  console.log("userAndTransactions:", userAndTransactions);

  console.log("cards:", data);

  // TODO => ADD RELATIONSHIPS
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data.transactions.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              authUser={authUser.authUser}
            />
          ))}
      </div>
      {!loading && data?.transactions?.length === 0 && (
        <p className="text-2xl font-bold text-center w-full">
          No transaction history found.
        </p>
      )}
      {!loading && data?.transactions?.length > 0 && (
        <button
          className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
			from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600
			disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleGeneratePDF}
        >
          Generate report
        </button>
      )}
    </div>
  );
};
export default Cards;
