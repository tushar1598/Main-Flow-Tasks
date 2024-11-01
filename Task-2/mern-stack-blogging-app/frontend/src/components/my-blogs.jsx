import React, { useState, useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { UserContext } from "../contexts/usercontext";
import { Link } from "react-router-dom";

function MyBlogs() {
  const { data } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(
        `http://localhost:9000/users/fetch-blog/?id=${data._id}`
      );
      setBlogs(res.data.output);
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <div id="blog-fetch">
        {blogs.map((e, i) => (
          <React.Fragment key={i}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:9000${e.blogImage}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{e.title}</h5>
                <p className="card-text">{e.content}</p>
                <Link
                  to={`/users/blogs-details/${e._id}`}
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default MyBlogs;
