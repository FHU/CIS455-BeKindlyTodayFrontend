// Profile.tsx
import { useEffect, useState } from "react";
import "daisyui/dist/full.css";
import "../index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { getLoggedInUser, User, getUserStats } from "../services";
import { useNavigate } from "react-router-dom";
import fancyFetch from "../services/fetchData";

function Profile() {
  const { logout, isAuthenticated, isLoading, getToken } = useKindeAuth();
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<
    string | undefined
  >();
  const [backendUser, setBackendUser] = useState<User | undefined>();
  const [savedToken, setSavedToken] = useState<string | undefined>();
  const [userCompletionsCount, setUserCompletionsCount] = useState<
    number | undefined
  >();
  const [userStreak, setUserStreak] = useState<number | undefined>();
  const [showLogin, setShowLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setShowLogin(false);
      getToken().then((token) => {
        if (token !== undefined) {
          setSavedToken(token);
          fancyFetch({ endpoint: "/users/me", method: "GET", token }).then((user) => {
            setBackendUser(user);
            if (user.profilePicture !== null)
              setSelectedProfilePicture(user.profilePicture);
          });
          fancyFetch({ endpoint: "/users/stats", method: "GET", token }).then((stats) => {
            setUserCompletionsCount(stats.user_completions_count);
            setUserStreak(stats.user_streak);
          });
        }
      });
    } else if (!isLoading) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, getToken, navigate]);

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && savedToken) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await fancyFetch({
          endpoint: "/users/profilepicture",
          method: "POST",
          data: formData,
          token: savedToken,
        });

        if (!response.ok) {
          throw new Error("Failed to upload profile picture");
        }

        const data = await response.json();
        setSelectedProfilePicture(data.profilePictureUrl);
      } catch (error) {
        console.error("Error uploading profile picture", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between bg-kindly-offWhite min-h-screen">
      <Navbar showLogin={showLogin} />

      <div className="profile-picture-container min-h-[260px] min-w-px max-w-full justify-between mt-6 flex flex-col items-center relative">
        <div className="profile-picture bg-blue-500 rounded-full w-30 h-30 flex items-center justify-center mb-4 relative">
          {!showLogin ? (
            <img
              src={selectedProfilePicture}
              alt="Profile"
              className="rounded-full w-full h-full cursor-pointer"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          ) : (
            <div className="h-[200px] aspect-square"></div>
          )}
        </div>

        {/* Button for profile picture upload */}
        <label className="btn text-white bg-blue-500 border-hidden mt-4 cursor-pointer">
          Update Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="hidden"
          />
        </label>

        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-black">
            {backendUser ? backendUser.username : "Loading Username . . ."}
          </h2>
        </div>
      </div>

      <div className="flex flex-row space-x-4 text-center mt-6">
        <div className="stats shadow bg-white">
          <div className="stat w-40 space-y-2">
            <div className="stat-value text-black pt-2">
              {userCompletionsCount !== undefined ? userCompletionsCount : "..."}
            </div>
            <div className="stat-title text-black whitespace-normal">
              Challenges Completed
            </div>
          </div>
        </div>

        <div className="stats shadow bg-white">
          <div className="stat w-40 space-y-2">
            <div className="stat-value text-black pt-2">
              {userStreak !== undefined ? userStreak : "..."}
            </div>
            <div className="stat-title text-black whitespace-normal">
              Current Streak
            </div>
          </div>
        </div>
      </div>
      <br />
      <button
        onClick={logout}
        type="button"
        className="btn text-xl text-white pt-2 bg-blue-500 border-hidden"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
