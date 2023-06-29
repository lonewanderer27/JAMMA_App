import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms/atoms";

// export default function ProtectedRoute(props: ProtectedRouteProps) {
//   if (props.session) {
//     // prevent user from going to login / signup page if already logged in
//     return (
//       <Route
//         {...props}
//         element={props.session ? <Navigate to="/"/> : props.element}
//       />
//     )
//   } else {
//     // prevent user from going to protected pages if not logged in
//     return (
//       <Route
//         {...props}
//         element={props.session ? 
//                   <Navigate to={`/login?next=${ props.path?.split("/")[1]}`} /> : 
//                   props.element}
//       />
//     )
//   }
// }


// such an ugly workaround but it works hahaha

const Auth = (props: RouteProps) => {
  const session = useRecoilValue(sessionState);

  if (session) {
    return props.children as JSX.Element;
  } else {
    return <Navigate to={`/login?next=${ props.path?.split("/")[1]}`} replace />
  }
}

// latest solution!!!

const AuthWrapper = () => {
  const session = useRecoilValue(sessionState);

  if (session) {
    return <Outlet/>;
  } else {
    return <Navigate to={`/login?next=${ window.location.pathname.split("/")[1]}`} replace />;
  }
}

export default Auth;
export { AuthWrapper };