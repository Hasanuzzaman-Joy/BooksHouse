import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Loading from "../Components/Loading";
import CustomActiveShapePieChart from "../Components/CustomActiveShapePieChart";

const Profile = () => {

    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER_URL}/books?email=${user?.email}`, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => {
                setBooks(res.data)
                setLoading(false)
            })
    }, [user])


    // Count categories
    const categoryCount = {};
    books.forEach(book => {
        const category = book.book_category?.toLowerCase().trim();
        if (category) {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        }
    });

    // Prepare flat chart data
    const chartData = Object.entries(categoryCount).map(([name, value]) => ({
        name,
        value
    }));

    // Calculate total books count
    const totalBooks = books.length;

    // Get counts per category or 0 if missing
    const fictionCount = categoryCount['fiction'] || 0;
    const nonFictionCount = categoryCount['non-fiction'] || categoryCount['nonfiction'] || 0;
    const fantasyCount = categoryCount['fantasy'] || 0;

    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="w-full md:w-11/12 bg-[#f4f3f3] mx-auto py-7">
                        <div className="flex justify-self-center avatar avatar-online mt-10">
                            <div className="w-32 rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-2 py-5">
                            <h1 className="text-lg font-semibold">Name : {user?.displayName}</h1>
                            <h2 className="text-lg font-semibold">Email : {user?.email}</h2>
                        </div>
                        <div className="flex gap-10 flex-col md:flex-row justify-center items-center px-5">
                            <div>
                                <h1 className="text-xl mt-10 md:mt-0 text-center md:text-2xl font-bold text-[#242253]">My Bookshelf Summary :</h1>
                                <table className="table w-full md:w-[450px] border border-gray-400 mt-3 md:mt-6 table-fixed">
                                    <thead className="bg-[#242253] text-white">
                                        <tr className="text-[11px] md:text-sm text-center">
                                            <th className="border border-gray-300">Total Books</th>
                                            <th className="border border-gray-300">Fiction</th>
                                            <th className="border border-gray-300">Non-Fiction</th>
                                            <th className="border border-gray-300">Fantasy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-[#242253] text-[11px] md:text-sm font-bold text-center">
                                            <td className="border border-gray-300">{totalBooks}</td>
                                            <td className="border border-gray-300">{fictionCount}</td>
                                            <td className="border border-gray-300">{nonFictionCount}</td>
                                            <td className="border border-gray-300">{fantasyCount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full md:w-[450px]">
                                <CustomActiveShapePieChart data={chartData} />
                            </div>
                        </div>

                    </div>
            }
        </>
    );
};

export default Profile;