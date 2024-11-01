import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/usercontext";
import { useParams } from "react-router-dom";
import axios from "axios";

function BlogDetails() {
  const { data } = useContext(UserContext);
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(
        `http://localhost:9000/users/fetch-blog-details/?id=${id}`
      );
      setBlog(res.data.blog);
    };
    fetchBlog();
  }, []);

  return (
    <>
      <div id="blog-detail-parent">
        <div id="left">
          <div className="blog-detail">
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-image">
              <img
                src={`http://localhost:9000${blog.blogImage}`}
                alt="Blog Image"
              />
            </div>
            <div className="blog-content">
              <p>{blog.content}</p>
            </div>
          </div>
        </div>

        <div id="right">
          <div id="leave-comments">
            <h4>Leave Your Comment</h4>
            <form>
              <textarea rows="2" cols="30" placeholder="Comment...." required />
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <input type="number" placeholder="Phone" required />
              <input type="submit" value="Submit" />
            </form>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
