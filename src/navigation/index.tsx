import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import Login from '~/screens/login';
import Main from '~/screens/main';
import SignUp from '~/screens/singup';

export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  Login: undefined;
  SignUp: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const toastConfig = {
  success: (props: any) => <BaseToast {...props} text2NumberOfLines={2} />,
  error: (props: any) => <ErrorToast {...props} text2NumberOfLines={2} />,
};

export default function RootStack() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
