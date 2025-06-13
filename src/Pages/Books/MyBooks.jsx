import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../../Components/Loading';
import ZoomInSection from "../../Components/ZoomInSection";

const MyBooks = () => {

    useEffect(() => {
        document.title = "BooksHouse | My-Books";
    }, [])

    const { user, logOut } = useAuth();
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER_URL}/books?email=${user?.email}`, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                if (err?.status === 401 || err?.status === 403) {
                    logOut()
                        .then(() => {
                            console.log('Signed Out')
                        })
                }
            })
    }, [user, logOut])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_SERVER_URL}/books/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            const newBooks = books.filter(book => book._id !== id);
                            setBooks(newBooks);

                            Swal.fire({
                                icon: "success",
                                title: "You've successfully deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className='w-full md:w-11/12 mx-auto py-10 md:px-0 px-4'>

            {
                (loading) ? <Loading /> : books.length > 0 ? (<>
                <ZoomInSection>
                    <h1 className="text-4xl font-bold text-center text-[#242253] mb-6">My Reading Shelf</h1>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-[#f4f3f3]">
                        <table className="table">
                            <thead className="bg-[#242253] text-white">
                                <tr>
                                    <th>No.</th>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Reading Status</th>
                                    <th>Total Upvote</th>
                                    <th>Submitted By</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    books.map((book, index) => (
                                        <tr className="text-[#242253] text-sm font-medium" key={book._id}>
                                            <th>{index + 1}</th>
                                            <td>
                                                <img src={book.cover_photo} alt="" className="w-8 rounded" />
                                            </td>
                                            <td>{book.book_title}</td>
                                            <td>{book.book_category}</td>
                                            <td>{book.reading_status}</td>
                                            <td>{book.upvote.length}</td>
                                            <td>{book.name}</td>
                                            <td className="flex gap-2">
                                                <Link to={`/update-book/${book._id}`} className='btn bg-[#bfbdff] hover:bg-[#242253] transition-all text-[#242253] hover:text-white md:px-8'>Update</Link>
                                                <button className='btn bg-[#242253] hover:bg-[#bfbdff] transition-all text-white hover:text-[#242253] md:px-8' onClick={() => handleDelete(book._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    </ZoomInSection>
                </>
                ) : (
                    <>
                        <h1 className="text-4xl font-bold text-center text-[#242253] mb-6">My Reading Shelf</h1>
                        <div className="bg-[#f4f3f3] text-center space-y-4 py-12 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-[#242253]">You have not added any Books in your library.</h2>
                            <Link to="/add-book" className="btn bg-[#bfbdff] hover:bg-[#242253] transition-all text-[#242253] text-base font-medium hover:text-white ">Add a Book</Link>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default MyBooks;