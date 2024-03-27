import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import Details from '~/screens/details';
import Login from '~/screens/login';
import Overview from '~/screens/overview';
import SignUp from '~/screens/singup';

export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  Login: undefined;
  SignUp: undefined;
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Overview" component={Overview} />
          <Stack.Screen
            name="Details"
            component={Details}
            options={({ navigation }) => ({
              headerLeft: () => (
                <View className={styles.backButton}>
                  <Feather name="chevron-left" size={16} color="#007AFF" />
                  <Text className={styles.backButtonText} onPress={navigation.goBack}>
                    Back
                  </Text>
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

const styles = {
  backButton: 'flex-row',
  backButtonText: 'text-blue-500 ml-1',
};
