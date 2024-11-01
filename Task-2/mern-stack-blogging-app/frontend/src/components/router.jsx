import { createBrowserRouter } from "react-router-dom";
import Nav from "./nav";
import Home from "./home";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import Profile from "./profile";
import SignOut from "./sign-out";
import Forgotpassword from "./reset-password";
import Resetpassword from "./password";
import Update from "./update-profile";
import SearchResults from "./search";
import Updatepassword from "./update-password";
import CreateBlog from "./create-blog";
import MyBlogs from "./my-blogs";
import BlogDetails from "./blog-details";

import {
  AuthProfile,
  AuthSignIn,
  AuthSignUp,
  AuthCreateBlogPage,
  AuthMyBlogPage,
  AuthMyBlogDetailsPage,
  AuthResetPasswordLink,
  AuthResetPassword,
  AuthLogOut,
  AuthUpdate,
  AuthUpdatePassword,
} from "./auth";
import NotFound from "./invalid";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/users/sign-in",
          element: (
            <AuthSignIn>
              <SignIn />
            </AuthSignIn>
          ),
        },
        {
          path: "/users/sign-up",
          element: (
            <AuthSignUp>
              <SignUp />
            </AuthSignUp>
          ),
        },
        {
          path: "/users/profile",
          element: (
            <AuthProfile>
              <Profile />
            </AuthProfile>
          ),
        },
        {
          path: "/users/create-blog",
          element: (
            <AuthCreateBlogPage>
              <CreateBlog />
            </AuthCreateBlogPage>
          ),
        },
        {
          path: "/users/my-blogs",
          element: (
            <AuthMyBlogPage>
              <MyBlogs />
            </AuthMyBlogPage>
          ),
        },
        {
          path: "/users/blogs-details/:id",
          element: (
            <AuthMyBlogDetailsPage>
              <BlogDetails />
            </AuthMyBlogDetailsPage>
          ),
        },
        {
          path: "/users/reset-password-link",
          element: (
            <AuthResetPasswordLink>
              <Forgotpassword />
            </AuthResetPasswordLink>
          ),
        },
        {
          path: "/users/reset-password/:id",
          element: (
            <AuthResetPassword>
              <Resetpassword />
            </AuthResetPassword>
          ),
        },
        {
          path: "/users/update-password/:id",
          element: (
            <AuthUpdatePassword>
              <Updatepassword />
            </AuthUpdatePassword>
          ),
        },

        {
          path: "/users/search", // "/users/update/:id"
          element: <SearchResults />,
        },
        {
          path: "/users/update", // "/users/update/:id"
          element: (
            <AuthUpdate>
              <Update />
            </AuthUpdate>
          ),
        },
        {
          path: "/users/sign-out",
          element: (
            <AuthLogOut>
              <SignOut />
            </AuthLogOut>
          ),
        },
        {
          path: "*", // Wildcard for any unmatched routes
          element: <NotFound />,
        },
      ],
    },
  ]);

  return router;
}
