import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Loading from "../Components/Loading";
import CustomActiveShapePieChart from "../Components/CustomActiveShapePieChart";
import ZoomInSection from "../Components/ZoomInSection";

const Profile = () => {

    useEffect(() => {
        document.title = "BooksHouse | Profile";
    }, [])

    const { user, logOut } = useAuth();
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
            .catch(err => {
                if (err?.status === 401 || err?.status === 403) {
                    logOut()
                        .then(() => {
                            console.log('Signed Out')
                        })
                }
            })
    }, [user, logOut])


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
    const historicalCount = categoryCount['historical'] || 0;
    const biographyCount = categoryCount['biography'] || 0;
    const comicsCount = categoryCount['comics'] || 0;

    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="w-full md:w-11/12 bg-[#f4f3f3] mx-auto py-7">
                        <ZoomInSection>
                            <div className="flex justify-self-center avatar avatar-online mt-10">
                                <div className="w-32 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center space-y-2 py-5">
                                <h1 className="text-lg font-semibold">Name : {user?.displayName}</h1>
                                <h2 className="text-lg font-semibold">Email : {user?.email}</h2>
                            </div>
                        </ZoomInSection>
                        <div className={`flex gap-2 ${totalBooks <= 0 ? 'flex-col' : 'flex-col md:flex-row'} justify-center items-center px-0 md:px-5 mt-8`}>
                            <div>
                                <h1 className="text-xl mt-5 md:mt-0 text-center md:text-2xl font-bold text-[#242253]">My Bookshelf Summary :</h1>
                                <div className="w-full overflow-x-auto">
                                    <ZoomInSection>
                                        <table className="table w-full border border-gray-400 mt-3 md:mt-6 text-center mb-8 md:mb-0">
                                            <thead className="bg-[#242253] text-white">
                                                <tr className="text-base">
                                                    <th className="border border-gray-300" colSpan={2}>Books by Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-[#242253] text-sm font-bold">
                                                    <td className="border border-gray-300">Fiction : {fictionCount}</td>
                                                    <td className="border border-gray-300">Non-Fiction : {nonFictionCount}</td>
                                                </tr>
                                                <tr className="text-[#242253] text-sm font-bold">
                                                    <td className="border border-gray-300">Fantasy : {fantasyCount}</td>
                                                    <td className="border border-gray-300">Historical : {historicalCount}</td>
                                                </tr>
                                                <tr className="text-[#242253] text-sm font-bold">
                                                    <td className="border border-gray-300">Biography : {biographyCount}</td>
                                                    <td className="border border-gray-300">Comics : {comicsCount}</td>
                                                </tr>
                                                <tr className="bg-[#242253] text-white">
                                                    <td className="border border-gray-300" colSpan={2}>You have added : {totalBooks} books </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </ZoomInSection>
                                </div>

                            </div>
                            <div className="w-full md:w-[450px]">
                                <ZoomInSection>
                                    <CustomActiveShapePieChart data={chartData} />
                                </ZoomInSection>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Profile;