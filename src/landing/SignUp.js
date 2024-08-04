import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { ClipLoader } from "react-spinners";  


const SignUp = () => {
  const baseUrl = "https://it-issue-tracking-api.onrender.com/api"
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    department: "",
    address: "",
    emergencyContact: "",
    employmentType: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectGender, setSelectGender] = useState("");
  const [departments, setDepartments] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);  // Add loading state

  
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('https://it-issue-tracking-api.onrender.com/api/department/getAll', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        })
        console.log('API Response:', res.data); // Log the response to inspect its structure

      if (res.data && res.data.departments) {
        setDepartments(res.data.departments); // Update departments state with correct data
      } else {
        console.error('Unexpected response format:', res.data);
      }
      } catch (error) {
        console.error('Unable to fetch departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);
  };

  const validateString = (input) => {
    return /^[a-zA-Z\s]+$/.test(input);
  };

  const validateNumber = (input) => {
    return /^\d+$/.test(input);
  };

  const validateField = async (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          errorMsg = "Invalid email format";
        } else {
          const emailExists = await checkEmailExists(value);
          if (emailExists) {
            errorMsg = "Email already registered";
          }
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          errorMsg = "Password must be a combination of letters and numbers";
        }
        break;
      case "firstName":
        if (!validateString(value)) {
          errorMsg = "First name must be a string";
        }
        break;
      case "lastName":
        if (!validateString(value)) {
          errorMsg = "Last name must be a string";
        }
        break;
      case "address":
        if (!validateString(value)) {
          errorMsg = "Address must be a string";
        }
        break;
      case "phoneNumber":
        if (!validateNumber(value)) {
          errorMsg = "Phone number must be numeric";
        }
        break;
      case "emergencyContact":
        if (!validateNumber(value)) {
          errorMsg = "Emergency contact must be numeric";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`${baseUrl}/users/checkEmail`, {
        params: { email },
      });
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email", error);
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    await validateField(name, value);
  };

  const handleChangeGender = (e) => {
    setSelectGender(e.target.value);
  };



  const startUpload = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const storageRef = ref(storage, `profiles/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("File upload error:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);  // Set loading state to true

    // Check if password and confirmPassword match
    if (userData.password !== userData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      setIsLoading(false);  // Set loading state to false if error
      return;
    }

    // Update gender in userData
    const userDataWithGender = { ...userData, gender: selectGender };

    const isValid = Object.values(errors).every((error) => !error) &&
                    Object.values(userDataWithGender).every((value) => value !== "");

    console.log("Errors object:", errors); // Log errors object
    console.log("User data object:", userDataWithGender); // Log user data object

    if (isValid) {
      console.log("Form is valid, submitting...");
      try {
        if (selectedFile) {
          const downloadURL = await startUpload(selectedFile);
          userDataWithGender.profile = downloadURL;
        }

        await axios.post(`${baseUrl}/users/register`, userDataWithGender);
        setIsLoading(false);  // Set loading state to false before navigation
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        console.log("Unable to fetch user data", error);
        setIsLoading(false);  // Set loading state to false if error
      }
    } else {
      console.log("Form is invalid, please correct the errors and try again.");
      setIsLoading(false);  // Set loading state to false if invalid
    }
  };

  return (
    <div className="flex justify-center shadow-lg h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-3 mt-2 font-sans">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start justify-start p-3">
            <div className="flex justify-around gap-5">
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
                  Email Address
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  onChange={handleChange}
                  value={userData.email}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
                  Password
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  onChange={handleChange}
                  value={userData.password}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
            </div>
            {/* Add confirm password field */}
            <div className="flex justify-around gap-5">
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={userData.confirmPassword}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
              </div>
            </div>
            
            <div className="flex justify-around gap-5">
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
                  First Name
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="firstName"
                  onChange={handleChange}
                  value={userData.firstName}
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={userData.lastName}
                  className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="lastName"
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            <div className="flex justify-around gap-5">
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
                  Phone Number
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={userData.phoneNumber}
                  className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="phoneNumber"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
                  Address
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={userData.address}
                  className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="address"
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
              </div>
            </div>

            <div className="flex justify-around gap-5">
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
                  Department
                </label>
                <select
  name="department"
  value={userData.department}
  onChange={handleChange}
  className="shadow border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>
  <option value="" disabled hidden>Select Department</option>
  {departments.map((dept) => (
    <option key={dept._id} value={dept.name}>
      {dept.name}
    </option>
  ))}
</select>

              </div>
            </div>

            <div className="flex justify-around gap-5">
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={userData.emergencyContact}
                  className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="emergencyContact"
                />
                {errors.emergencyContact && <p className="text-red-500 text-xs">{errors.emergencyContact}</p>}
              </div>
              <div className="flex flex-col">
                <label>Employment Type</label>
                <select
  name="employmentType"
  onChange={handleChange}
  value={userData.employmentType}
  className="shadow border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>
  <option value="" disabled selected hidden>Select Employment type</option>
  <option value="Full time">Full time</option>
  <option value="Regular">Regular</option>
  <option value="Part time">Part time</option>
</select>

              </div>
            </div>

            <div className="flex space-x-6 justify-center items-center">
              <div>
                <p>Gender</p>
                <div className="flex justify-center items-center gap-3">
                  <label className="flex items-center gap-2 justify-center">
                    <span>Male</span>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="w-7 h-5 cursor-pointer"
                      checked={selectGender === "male"}
                      onChange={handleChangeGender}
                    />
                  </label>
                  <label className="flex items-center gap-2 justify-center">
                    <span>Female</span>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="w-7 h-5 cursor-pointer"
                      checked={selectGender === "female"}
                      onChange={handleChangeGender}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col">
            {isLoading ? (
              <ClipLoader size={35} color={"#123abc"} loading={isLoading} />
            ) : (
              <button
                className="bg-sky-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                SignUp
              </button>
            )}
            <div className="mt-2">
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-lg text-slate-500 cursor-pointer">
                    Login
                  </span>
                </Link>{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
