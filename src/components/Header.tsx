import { Image, Text, View } from 'react-native';

const Header = () => {
  return (
    <View className="flex-1 items-center justify-start mt-10 max-h-[100px]">
      <Image source={require('../../assets/city.jpeg')} className="absolute -z-40 w-full h-36" />
      <Image source={require('../../assets/LogoAppTransparent.png')} className="mt-8 w-16 h-16" />
      <Text className="text-2xl font-bold text-[#000000]">WestCarPool</Text>
    </View>
  );
};

export { Header };
