import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const withAuth = Component => {
    const Auth = (props) => {
        const user = useSelector(state => state.user)
        const router = useRouter()
      // Login data added to props via redux-store (or use react context for example)
      // If user is not logged in, return login component
        React.useEffect(() => {
            if (!user.auth_token && router.isReady) {
                router.push('/user/signin')
            }
        }, [user, router.isReady])

      // If user is logged in, return original component
      return (
        <Component {...props} />
      );
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
  };

  export default withAuth;
