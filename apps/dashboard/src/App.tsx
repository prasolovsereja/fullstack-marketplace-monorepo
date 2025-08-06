import {useInitAuth} from "./hooks/useInitAuth";
import {useAppSelector} from "./slices/hooks";
import AppRouter from "./AppRouter";
import {Navigate} from "react-router-dom";


export default function App() {
  useInitAuth();

  const {user, isLoading, isAuthenticated} = useAppSelector(state => state.auth);
  console.log(user);
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to='http://localhost:3000/login' />;

  return (
      <>
        <AppRouter/>
      </>
  )

}