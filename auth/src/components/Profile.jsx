import axios from "axios"
import { useEffect, useState } from "react"
const Profile =  () => {
    const [userData, setUserData] = useState(null);
    const getUser= async (config) => {
     await axios.get("http://localhost:3000/protected", config)
          .then((response) => {
            setUserData(response.data.user);
          })

          .catch((error) => {
            console.error(error);
            if (error.response.status === 401) {
              window.location.href = "/login";
            }
          });
    };
     const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }

    useEffect(() => {
        // Fetch user data with an authenticated request
        const user=localStorage.getItem("user")
        //if the user is not logged in, redirect to login page
        if(!user){
            window.location.href="/login"
        }
        const {token}=JSON.parse(user);
        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };
        getUser(config);
      }
    , [])
  return (
    <div
    className='w-full min-h-screen bg-white flex flex-col justify-center items-center'
    >
        {
            userData ? (
                <div
                className="w-full flex flex-col justify-center items-center"
                >
                    <p
                    className="text-2xl text-gray-800 font-bold"
                    > Hi  {userData.name} 
                    </p>
                    <button
                    onClick={logout}
                    className="mt-4 bg-gray-300 rounded-md px-4 py-1.5 text-gray-800 "
                    >
                      Logout 
                    </button>
                </div>
            ):(
                <div>
                    <p
                    className="text-2xl text-gray-800 font-bold"
                    > Loading... 
                    </p>
                </div>
            )
        }
    </div>
  )
}

export default Profile