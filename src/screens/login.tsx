import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { auth } from 'utils/firebase';

import { RootStackParamList } from '~/navigation';

type LoginScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProps>();

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('user', email);
      navigation.navigate('Main');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('errorHappened'),
        text2: error.code === 'auth/invalid-credential' ? t('invalidCredential') : error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordInputRef = useRef<TextInput>(null);

  return (
    <View className="bg-gray-50 dark:bg-gray-900 h-full">
      <View className="flex-1 flex-col items-center justify-center px-6 py-56 mx-auto gap-6">
        <View className="flex-1 flex-col items-center justify-center mb-2">
          <Image source={require('../../assets/LogoAppTransparent.png')} className="w-14 h-14" />
          <View>
            <Text>WestCarPool</Text>
          </View>
        </View>
        <View className="w-96 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <View className="p-6 space-y-4 md:space-y-6 sm:p-8 gap-4">
            <Text className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              {t('signYourAcccount')}
            </Text>
            <View className="space-y-4 md:space-y-6">
              <View className="mb-3">
                <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('yourEmail')}
                </Text>
                <TextInput
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#007d97] focus:border-[#007d97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>
              <View className="mb-3">
                <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('yourPassword')}
                </Text>
                <TextInput
                  secureTextEntry
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#007d97] focus:border-[#007d97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChangeText={setPassword}
                  ref={passwordInputRef}
                  blurOnSubmit={false}
                />
              </View>
              <TouchableOpacity
                disabled={loading}
                className="w-full bg-[#007d97] hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#007d97] dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 mb-3"
                onPress={signIn}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text className="text-white text-center">{t('logIn')}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                className="w-full bg-[#007d97] hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#007d97] dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                <Text className="text-white text-center">{t('notRegistered')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Login;
