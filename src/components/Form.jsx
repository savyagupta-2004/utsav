import React, { useState } from "react";

const Form = () => {
  const [formD, setformD] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    comments: "",
  });
  const [image, setImage] = useState(null);
  const handleOnChange = (e) => {
    setformD({ ...formD, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    console.log(formD);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    } else {
      console.log("testing");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-black p-32 text-black">
        <div className="bg-white p-16 rounded-md shadow-lg">
          <form onSubmit={handlesubmit} className="space-y-4">
            <h2 className="text-2xl font-extrabold text-center mb-5">
              Form for Utsav
            </h2>
            <div>
              <label className="clock text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border-1 border-gray-700"
                type="text"
                name="fname"
                onChange={handleOnChange}
                value={formD.fname}
                required
                placeholder="Enter your First name "
              />
            </div>
            <div>
              <label className="clock text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border-1 border-gray-700"
                type="text"
                name="lname"
                onChange={handleOnChange}
                value={formD.lname}
                required
                placeholder="Enter your Last name "
              />
            </div>
            <div>
              <label className="clock text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border-1 border-gray-700"
                type="email"
                name="email"
                onChange={handleOnChange}
                value={formD.email}
                placeholder="Enter your Email Address"
              />
            </div>
            <div>
              <label className="clock text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border-1 border-gray-700"
                type="tel"
                name="contact"
                onChange={handleOnChange}
                value={formD.contact}
                placeholder="Enter your Phone Number"
              />
            </div>
            <div>
              <label className="clock text-sm font-medium text-gray-900">
                Comments
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border-1 border-gray-700"
                type="text"
                name="comments"
                onChange={handleOnChange}
                value={formD.comments}
                placeholder="Share your valuable insight"
              />
            </div>
            <div>
              <label className="clock text-sm font-medium text-gray-900">
                Image
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border-1 border-gray-700"
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                placeholder="Upload your image"
              />
              {/* <p className="text-red-400 text-sm mt-1" > </p> */}
              {image && (
                <img
                  src={image}
                  alt="uploaded image"
                  className="mt-4 w-full h-48 object-cover rounded-lg"
                ></img>
              )}
            </div>
            <button
              type="submit"
              className="w-full h-fit bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
