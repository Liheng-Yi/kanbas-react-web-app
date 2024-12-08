import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) {
      return navigate("/Kanbas/Account/Signin");
    }
    setProfile(currentUser);
  };

  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
    } catch (error) {
      console.error("[Profile] Error updating profile:", error);
    }
  };

  const signout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      navigate("/Kanbas/Account/Signin");
    } catch (error) {
      console.error("[Profile] Error during signout:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {}, [profile]);

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <input 
            defaultValue={profile.username} 
            id="wd-username" 
            className="form-control mb-2"
            onChange={(e) => handleProfileChange("username", e.target.value)}
          />
          <input 
            defaultValue={profile.password} 
            id="wd-password" 
            className="form-control mb-2"
            onChange={(e) => handleProfileChange("password", e.target.value)}
          />
          <input 
            defaultValue={profile.firstName} 
            id="wd-firstname" 
            className="form-control mb-2"
            onChange={(e) => handleProfileChange("firstName", e.target.value)}
          />
          <input 
            defaultValue={profile.lastName} 
            id="wd-lastname" 
            className="form-control mb-2"
            onChange={(e) => handleProfileChange("lastName", e.target.value)}
          />
          <input 
            defaultValue={profile.dob} 
            id="wd-dob" 
            className="form-control mb-2"
            type="date"
            onChange={(e) => handleProfileChange("dob", e.target.value)}
          />
          <input 
            defaultValue={profile.email} 
            id="wd-email" 
            className="form-control mb-2"
            onChange={(e) => handleProfileChange("email", e.target.value)}
          />
          <select 
            onChange={(e) => handleProfileChange("role", e.target.value)}
            className="form-control mb-2" 
            id="wd-role"
            defaultValue={profile.role}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
            Update
          </button>
          <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
