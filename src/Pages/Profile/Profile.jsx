import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Loading from "../../Components/Loading";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";
import ZoomInSection from "../../Components/ZoomInSection";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
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
    if (category) {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    }
  });

  // Prepare flat chart data
  const chartData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate total books count
  const totalBooks = books.length;

  // Get counts per category or 0 if missing
  const fictionCount = categoryCount["fiction"] || 0;
  const nonFictionCount =
    categoryCount["non-fiction"] || categoryCount["nonfiction"] || 0;
  const fantasyCount = categoryCount["fantasy"] || 0;
  const historicalCount = categoryCount["historical"] || 0;
  const biographyCount = categoryCount["biography"] || 0;
  const comicsCount = categoryCount["comics"] || 0;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full bg-[#f4f3f3] mx-auto px-4 md:px-10 py-5 mt-20 md:mt-0 lg:mt-0">
          {/* Title */}
          <div className="mt-4 mb-10">
            <div className="flex items-center gap-2 text-[#242253]">
              <FaUserCircle className="text-3xl md:text-4xl" />
              <h1 className="text-2xl md:text-4xl font-bold">Profile Page</h1>
            </div>
            <p className="text-gray-500 text-base mt-3">
              Manage your personal information and bookshelf
            </p>
            <div className="w-24 h-[2px] bg-[#bfbdff] mt-3"></div>
          </div>

          {/* Profile Info */}
          <ZoomInSection>
            <div className="mt-10 mb-6">
              <div className="flex justify-self-center avatar avatar-online">
                <div className="w-32 rounded-full border-6 border-[#bfbdff]">
                  <img
                    src={
                      user?.photoURL ||
                      "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1756625310/hjsdchtjcutflbmbti83.png"
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center text-gray-700 space-y-2 py-5">
                <h1 className="text-lg font-semibold">
                  Name : {user?.displayName}
                </h1>
                <h2 className="text-lg font-semibold">Email : {user?.email}</h2>
              </div>
            </div>
          </ZoomInSection>

          {/* Bookshelf Summary */}
          <div
            className={`flex gap-2 flex-col md:flex-col lg:flex-row justify-center items-center`}
          >
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
                      <tr className="text-[#242253] text-sm font-bold">
                        <td className="border border-gray-300">
                          Fiction : {fictionCount}
                        </td>
                        <td className="border border-gray-300">
                          Non-Fiction : {nonFictionCount}
                        </td>
                      </tr>
                      <tr className="text-[#242253] text-sm font-bold">
                        <td className="border border-gray-300">
                          Fantasy : {fantasyCount}
                        </td>
                        <td className="border border-gray-300">
                          Historical : {historicalCount}
                        </td>
                      </tr>
                      <tr className="text-[#242253] text-sm font-bold">
                        <td className="border border-gray-300">
                          Biography : {biographyCount}
                        </td>
                        <td className="border border-gray-300">
                          Comics : {comicsCount}
                        </td>
                      </tr>
                      <tr className="bg-[#242253] text-white">
                        <td className="border border-gray-300" colSpan={2}>
                          You have added : {totalBooks} books{" "}
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
