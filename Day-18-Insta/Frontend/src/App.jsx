import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import "./features/shared/globle.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { PostProvider } from "./features/post/post.context";

function App() {
  return (
    <>
      <AuthProvider>
        <PostProvider>
          <RouterProvider router={router} />
        </PostProvider>
      </AuthProvider>
    </>
  );
}

export default App;
