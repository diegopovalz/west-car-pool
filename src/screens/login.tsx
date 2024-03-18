import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
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
  );
};
export default Login;
