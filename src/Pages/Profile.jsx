import useAuth from "../Hooks/useAuth";

const Profile = () => {

    const {user} = useAuth();

    return (
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
        </div>
    );
};

export default Profile;