import axios from "axios"
import { useEffect, useState } from "react"
const Profile = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        // Fetch user data with an authenticated request
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios.get("http://localhost:3000/protected", config)
          .then((response) => {
            setUserData(response.data.user);
          })
          .catch((error) => {
            // Handle authentication errors or other errors
            console.error(error);
          });
      }, []);
  return (
    <div
    className='w-full min-h-screen bg-white flex flex-col justify-center items-center'
    >
        <h1>Profile</h1>
        {
            userData && (
                <div>
                    <p>Name: {userData.name}</p>
                </div>
            )
        }
    </div>
  )
}

export default Profile