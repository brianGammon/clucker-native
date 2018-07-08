import { createStackNavigator } from 'react-navigation';
import SignInScreen from '../../containers/SignIn';
import SignUpScreen from '../../containers/SignUp';
import ResetPasswordScreen from '../../containers/ResetPassword';

export default createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  ResetPassword: ResetPasswordScreen,
});
