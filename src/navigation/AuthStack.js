import { createStackNavigator } from 'react-navigation';
import SignInScreen from '../components/SignIn';
import SignUpScreen from '../components/SignUp';
import ResetPasswordScreen from '../components/ResetPassword';

export default createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ResetPassword: ResetPasswordScreen,
  },
  {
    headerMode: 'none',
  },
);
