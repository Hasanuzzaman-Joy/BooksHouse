import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Loading from "../../Components/Loading";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";
import ZoomInSection from "../../Components/ZoomInSection";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  // Page title
  useEffect(() => {
    document.title = "BooksHouse | Profile";
  }, []);

  const { user, logOut } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's books
  useEffect(() => {
    axios(`${import.meta.env.VITE_SERVER_URL}/books?email=${user?.email}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.status === 401 || err?.status === 403) {
          logOut();
        }
      });
  }, [user, logOut]);

  // Count categories
  const categoryCount = {};
  books.forEach((book) => {
    const category = book.book_category?.toLowerCase().trim();
    if (category) categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  // Prepare chart data
  const chartData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  // Book counts
  const counts = {
    fiction: categoryCount["fiction"] || 0,
    "non-fiction":
      categoryCount["non-fiction"] || categoryCount["nonfiction"] || 0,
    fantasy: categoryCount["fantasy"] || 0,
    historical: categoryCount["historical"] || 0,
    biography: categoryCount["biography"] || 0,
    comics: categoryCount["comics"] || 0,
  };

  // Table rows
  const tableRows = [
    ["Fiction", counts.fiction, "Non-Fiction", counts["non-fiction"]],
    ["Fantasy", counts.fantasy, "Historical", counts.historical],
    ["Biography", counts.biography, "Comics", counts.comics],
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full mx-auto flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col justify-center space-y-3">
            <div className="flex items-center gap-2 text-[#242253]">
              <FaUserCircle className="text-2xl md:text-4xl" />
              <h1 className="text-2xl md:text-4xl font-bold">Profile Page</h1>
            </div>
            <p className="text-gray-500 text-base">
              Manage your personal information and bookshelf
            </p>
            <div className="w-24 h-[2px] bg-[#bfbdff]"></div>
          </div>

          {/* Profile Info */}
          <ZoomInSection>
            <div className="my-4 flex flex-col items-center">
              <div className="avatar avatar-online">
                <div className="w-32 rounded-full border-6 border-[#bfbdff]">
                  <img
                    src={
                      user?.photoURL ||
                      "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1756625310/hjsdchtjcutflbmbti83.png"
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-center text-gray-700 space-y-2 mt-4">
                <h1 className="text-base md:text-lg font-semibold">
                  Name: {user?.displayName || "No Name"}
                </h1>
                <h1 className="text-base md:text-lg font-semibold">
                  Email: {user?.email || "No Email"}
                </h1>
              </div>
            </div>
          </ZoomInSection>

          {/* Bookshelf Summary */}
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
            <div className="flex-1">
              <h1 className="text-xl text-center md:text-2xl font-bold text-[#242253]">
                Bookshelf Summary :
              </h1>
              <div className="w-full overflow-x-auto">
                <ZoomInSection>
                  <table className="table w-full border border-gray-400 mt-3 md:mt-6 text-center mb-8 md:mb-0">
                    <thead className="bg-[#242253] text-white">
                      <tr className="text-base">
                        <th className="border border-gray-300" colSpan={2}>
                          Books by Category
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map(([label1, count1, label2, count2], i) => (
                        <tr
                          key={i}
                          className="text-[#242253] text-base font-medium"
                        >
                          <td className="border border-gray-300">
                            {label1} : {count1}
                          </td>
                          <td className="border border-gray-300">
                            {label2} : {count2}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-[#242253] text-white text-base font-semibold">
                        <td className="border border-gray-300" colSpan={2}>
                          You have added : {books.length} books
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </ZoomInSection>
              </div>
            </div>

            {/* Chart */}
            <div className="w-full md:w-[450px]">
              <ZoomInSection>
                <CustomActiveShapePieChart data={chartData} />
              </ZoomInSection>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
