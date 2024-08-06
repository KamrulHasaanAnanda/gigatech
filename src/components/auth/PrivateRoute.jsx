const PrivateRoute = ({ element: Element, session, ...rest }) => {
    return session ? <Element {...rest} session={session} /> : <Navigate to="/login" replace />;
};