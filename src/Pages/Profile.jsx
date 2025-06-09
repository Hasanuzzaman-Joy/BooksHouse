import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Loading from "../Components/Loading";
import CustomActiveShapePieChart from "../Components/CustomActiveShapePieChart";

const Profile = () => {

    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(books)

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

    console.log(chartData);

    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="w-full md:w-11/12 mx-auto py-7">
                        <div className="flex justify-self-center avatar avatar-online">
                            <div className="w-32 rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-2 py-5">
                            <h1 className="text-xl font-semibold text-[#242253]">Name : {user?.displayName}</h1>
                            <h2 className="text-xl font-semibold text-[#242253]">Email : {user?.email}</h2>
                        </div>
                        <CustomActiveShapePieChart data={chartData} />
                    </div>
            }
        </>
    );
};

export default Profile;