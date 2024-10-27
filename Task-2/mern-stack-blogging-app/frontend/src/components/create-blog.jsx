import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/usercontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateBlog() {
  const { data } = useContext(UserContext);
  const nevigate = useNavigate();
  const [blogs, setBlogs] = useState({
    title: "",
    content: "",
    blogImage: null,
    userId: data._id,
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogs.title);
    formData.append("content", blogs.content);
    formData.append("blogImage", blogs.blogImage);
    formData.append("userId", blogs.userId);
    let res = await axios.post(
      "http://localhost:9000/users/create-blog",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.newBlog) {
      toast.success("blog created successfully");
      nevigate("/users/my-blogs");
    } else {
      toast.error("something went wrong!!");
      setBlogs({ title: "", content: "", blogImage: null });
    }
  };

  const ChangeHandler = (e) => {
    setBlogs({ ...blogs, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setBlogs({ ...blogs, blogImage: e.target.files[0] });
  };

  return (
    <>
      <div id="blogs-parent">
        <div id="blog-child">
          <form onSubmit={SubmitHandler} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                name="title"
                value={blogs.title}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Your Title"
                onChange={ChangeHandler}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Content
              </label>
              <textarea
                name="content"
                value={blogs.content}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Your Content"
                onChange={ChangeHandler}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                name="blogImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button id="btn-blogs" type="submit" className="btn btn-primary">
              Add Blog...
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateBlog;
