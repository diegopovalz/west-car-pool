import { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* return (
    <View className="flex-1 px-4 pt-6 pb-4 items-center h-full">
      <View className="flex-1 flex-col justify-center items-center gap-4">
        <Text className="text-4xl font-bold">Iniciar sesión con tu usuario y contraseña</Text>
        <TextInput
          className="bg-indigo-50 w-56 border rounded-md px-3 py-1"
          placeholder="ejemplo@dominio.com"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          className="bg-indigo-50 w-56 border rounded-md px-3 py-1"
          secureTextEntry
          placeholder="Tu contraseña"
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title="Iniciar sesión"
          onPress={() => {
            console.log({ email, password });
          }}
        />
      </View>
    </View>
  ); */

  return (
    <View className="bg-gray-50 dark:bg-gray-900 h-full">
      <View className="flex-1 flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <View className="w-96 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <View className="p-6 space-y-4 md:space-y-6 sm:p-8 gap-4">
            <Text className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Sign in to your account
            </Text>
            <View className="space-y-4 md:space-y-6">
              <View className="mb-3">
                <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </Text>
                <TextInput
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </View>
              <View className="mb-3">
                <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </Text>
                <TextInput
                  secureTextEntry
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </View>
              <TouchableOpacity className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                <Text className="text-white text-center">Sign in</Text>
              </TouchableOpacity>
              {/* <Text className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{' '}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">
                  Sign up
                </a>
              </Text> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Login;
