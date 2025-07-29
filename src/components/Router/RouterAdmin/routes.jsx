import { createBrowserRouter } from "react-router-dom";

import Home from "../../home/Home";
import SignIn from "../../signin/SignIn";
import Users from "../../users/Users";
import UserEdit from "../../userEdit/UserEdit";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:userId",
    element: (
      <ProtectedRoute>
        <UserEdit />
      </ProtectedRoute>
    ),
  },
]);

export default router;
