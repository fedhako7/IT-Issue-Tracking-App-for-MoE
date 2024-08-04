import React, { useState, useEffect } from "react";

const Profile = () => {
  const userFromStorage = JSON.parse(localStorage.getItem("user")).others;
  const [user, setUser] = useState(userFromStorage);
  const [formData, setFormData] = useState(userFromStorage);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Fetch the latest user data from the backend and update local storage
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://it-issue-tracking-api.onrender.com/api/users/updateUser/${userFromStorage._id}`);
        const data = await response.json();
        setUser(data);
        setFormData(data);
        localStorage.setItem("user", JSON.stringify({ others: data }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userFromStorage._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    formDataWithImage.append('firstName', formData.firstName);
    formDataWithImage.append('lastName', formData.lastName);
    formDataWithImage.append('department', formData.department);
    formDataWithImage.append('email', formData.email);
    formDataWithImage.append('address', formData.address);
    formDataWithImage.append('phoneNumber', formData.phoneNumber);
    formDataWithImage.append('gender', formData.gender);
    formDataWithImage.append('profileImage', profileImage);
    try {
      const response = await fetch(`https://it-issue-tracking-api.onrender.com/api/users/updateUser/${userFromStorage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setUser(formData);
        localStorage.setItem("user", JSON.stringify({ others: formData }));
        alert('Profile updated successfully');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 font-sans">
      <div className="flex shadow-xl flex-col px-10 mt-2 border-white justify-center bg-white" style={{ width: "600px" }}>
        <h3 className="text-center text-2xl p-2 font-bold">Personal Information</h3>
        <div className="flex gap-4">
          <h4 className="text-center text-xl">First Name</h4>
          <h3 className="text-xl text-gray-600 font-semibold">{user.firstName}</h3>
        </div>
        <div className="flex gap-4">
          <h4 className="text-center text-xl">Last Name</h4>
          <h3 className="text-xl text-gray-600 font-semibold">{user.lastName}</h3>
        </div>
        <div className="flex gap-4">
          <h4 className="text-center text-xl">Email</h4>
          <h3 className="text-xl text-gray-600 font-semibold">{user.email}</h3>
        </div>
        <div className="flex gap-4">
          <h4 className="text-center text-xl">Department</h4>
          <h3 className="text-xl text-gray-600 font-semibold">{user.department}</h3>
        </div>
        <div className="flex gap-4">
          <h4 className="text-center text-xl">Address</h4>
          <h3 className="text-xl text-gray-600 font-semibold">{user.address}</h3>
        </div>
        <div className="flex gap-4">
          <h4 className="text-center text-xl">Phone Number</h4>
          <h3 className="text-xl text-gray-600 font-semibold">{user.phoneNumber}</h3>
        </div>
        <div className="flex gap-4">
          <h4 className="text-center text-xl">Gender</h4>
          <h3 className="text-xl text-gray-600 font-semibold">{user.gender}</h3>
        </div>
        <div style={{ width: "200px",height:"200px" }} className="mt-2 flex items-center justify-center">
          <img src={user.profile||"https://i.pinimg.com/736x/c0/9c/97/c09c979549603cf39105ff1ec8375fd7.jpg"} className="w-full  object-cover mb-2" style={{ height: "200px" }} alt="Profile" />
        </div>
      </div>
      <div className="flex p-6 mt-2 flex-col bg-white w-full shadow-xl pb-8 mb-8">
        <h3 className="text-center text-2xl font-bold">Update Personal Details</h3>
        <form className="flex justify-between" onSubmit={handleSubmit}>
          <div>
            <div className="flex flex-col">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" />
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" />
            </div>
            <div className="flex flex-col">
              <label>Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" />
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" />
            </div>
            <div className="flex flex-col">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" />
            </div>
            <div className="flex flex-col">
              <label>Phone Number</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" />
            </div>
            <div className="flex flex-col my-3">
              <label>Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2">
                <option value="" disabled>Select your gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div className="mt-2 flex gap-6">
              <button type="submit" className="mt-2 ml-3 bg-blue-700 hover:bg-blue-800 py-2 px-6 text-white font-semibold rounded cursor-pointer">
                Update
              </button>
              <button type="button" className="mt-2 ml-3 bg-red-700 hover:bg-red-800 py-2 px-6 text-white font-semibold rounded cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col">
            <input type="file" onChange={handleImageChange}/>
            <div>
              <img src={formData.profile} alt="Profile" className="w-20 h-20 object-cover" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
