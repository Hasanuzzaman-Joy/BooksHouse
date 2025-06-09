
import axios from 'axios';
import useAuth from '../../Hooks/useAuth'
import { IoBookSharp } from "react-icons/io5";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddBook = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleBookForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        data.upvote = [];

        axios.post(`${import.meta.env.VITE_SERVER_URL}/add-book`, data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "You've successfully added",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });

                    setTimeout(() => {
                        navigate('/my-books')
                    }, 2200);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='bg-[#f4f3f3] w-full md:w-11/12 mx-auto py-10 px-4'>
            <div className="max-w-[96%] md:max-w-[800px] mx-auto bg-base-100 p-4 rounded-md sm:p-8 shadow-xl" style={{
                boxShadow:
                    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
            }}>
                <h2 className="mb-3 text-3xl font-bold text-center text-[#242253]">Add a New Book to Your Library</h2>
                <div className="flex items-center w-full my-4 gap-3">
                    <hr className="w-full" />
                    <IoBookSharp size={50} />
                    <hr className="w-full" />
                </div>
                <form onSubmit={handleBookForm} className="space-y-8">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="book_title" className="block text-sm font-semibold">Book Title</label>
                                <input type="text" name="book_title" id="book_title" placeholder="Enter the title of the book" className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="cover_photo" className="block text-sm font-semibold">Book Image URL</label>
                                <input type="text" name="cover_photo" id="cover_photo" placeholder="Paste the direct image URL of the book cover" className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="total_page" className="block text-sm font-semibold">Total Number of Pages</label>
                                <input type="number" id='total_page' placeholder='e.g., 350' name="total_page" className="w-full px-3 py-2  rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="book_author" className="block text-sm font-semibold">Author Name</label>
                                <input type="text" name="book_author" id='book_author' placeholder="Enter the author’s full name" className="w-full px-3 py-2  rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="book_category" className="block text-sm font-semibold">Book Category</label>
                            <select name="book_category" id='book_category' className="w-full px-3 py-2 rounded-md border  border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" required>
                                <option value="">Select Category</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Fantasy">Fantasy</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="reading_status" className="block text-sm font-semibold">Reading Status</label>
                            <select name="reading_status" id='reading_status' className="w-full px-3 py-2 rounded-md border  border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" required>
                                <option value="">Select your current reading status</option>
                                <option value="Want-to-Read">Want-to-Read</option>
                                <option value="Reading">Reading</option>
                                <option value="Read">Read</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="book_overview" className="block text-sm font-semibold">Book Overview</label>
                            <textarea
                                name="book_overview"
                                id="book_overview"
                                rows="4"
                                placeholder="Write a short summary or thoughts about the book"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600 resize-none"
                            ></textarea>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="upvote" className="block text-sm font-semibold">Upvote</label>
                            <input type="text" name="upvote" id="upvote" value={0} readOnly placeholder="Upvote" className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-semibold">Your Name</label>
                                <input type="text" value={user.displayName} readOnly name="name" id="name" placeholder="Your Name" className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold">Email address</label>
                                <input type="email" value={user.email} readOnly name="email" id="email" placeholder="abc@gmail.com" className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-gray-600" />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-8 py-2 font-semibold rounded-md bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] border border-transparent cursor-pointer transition-all"
                    >
                        Add Plant
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;