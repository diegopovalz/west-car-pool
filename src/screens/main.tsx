import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { database } from 'utils/firebase';

import { Header, NewModal, Schedule } from '~/components';
import { RootStackParamList } from '~/navigation';

const DAYS = {
  Lunes: 'MO',
  Martes: 'TU',
  Miércoles: 'WE',
  Jueves: 'TH',
  Viernes: 'FR',
  Sábado: 'SA',
};

const getSchedule = async () => {
  const userEmail = (await AsyncStorage.getItem('user')) || 'prueba@prueba.com';
  const user = await getDoc(doc(database, 'users', userEmail));
  const userData = user.data();
  console.log(userData);

  for (const dayKey in userData?.schedule) {
    const daySchedule = userData.schedule[dayKey];

    const destinationCar = await getDoc(daySchedule.destinationCar);
    daySchedule.destinationCar = destinationCar.exists() ? destinationCar.data() : null;
    daySchedule.destinationCar.id = destinationCar.id;

    const originCar = await getDoc(daySchedule.originCar);
    daySchedule.originCar = originCar.exists() ? originCar.data() : null;
    daySchedule.originCar.id = originCar.id;
  }
  return userData;
};

const getItems = async () => {
  const schedule = await getSchedule();

  if (!schedule) {
    return;
  }

  const convertedSchedule = Object.keys(schedule.schedule).map((key) => {
    const daySchedule = schedule.schedule[key];
    return {
      day: daySchedule.day,
      origin: daySchedule.origin,
      destination: daySchedule.destination,
      departureTime: '08:00',
      arrivalTime: '09:00',
      showDepatureInfo: false,
      showArrivalInfo: false,
      departureCar: daySchedule.originCar,
      arrivalCar: daySchedule.destinationCar,
    };
  });

  const daysOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return convertedSchedule.sort((a, b) => {
    return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
  });
};

/* const saveItems = async (items: any[]) => {
  const parsedItems = items.reduce(async (acc, item) => {
    const itemKey = (DAYS as any)[item.day] as string;
    const originCar = doc(database, 'cars', item.departureCar.id);
    const destinationCar = doc(database, 'cars', item.arrivalCar.id);
    acc[itemKey] = {
      day: item.day,
      origin: item.origin,
      destination: item.destination,
      originCar, //`cars/${item.departureCar.id}`,
      destinationCar, //`cars/${item.arrivalCar.id}`,
    };
    return acc;
  }, {});
  await updateDoc(doc(database, 'users', 'prueba@prueba.com'), { schedule: parsedItems });
}; */

const saveItems = async (items: any[]) => {
  const parsedItems: any = {};

  for (const item of items) {
    const itemKey = (DAYS as any)[item.day] as string;
    const originCar = doc(database, 'cars', item.departureCar.id);
    const destinationCar = doc(database, 'cars', item.arrivalCar.id);

    parsedItems[itemKey] = {
      day: item.day,
      origin: item.origin,
      destination: item.destination,
      originCar,
      destinationCar,
    };
  }

  try {
    await updateDoc(doc(database, 'users', 'prueba@prueba.com'), { schedule: parsedItems });
    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

type LoginScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Main'>;

export default function Main() {
  const [items, setItems] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const navigation = useNavigation<LoginScreenNavigationProps>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  const handleAddSchedule = async () => {
    const dayObject = {
      day: selectedDay,
      origin: 'Casa',
      destination: 'Trabajo',
      departureTime: '08:00',
      arrivalTime: '09:00',
      showDepatureInfo: false,
      showArrivalInfo: false,
      departureCar: items[0].departureCar,
      arrivalCar: items[0].arrivalCar,
    };
    await saveItems([...items, dayObject]);
    setItems((prevItems: any[]) => {
      return [...prevItems, dayObject];
    });
    setOpenModal(false);
  };

  useEffect(() => {
    getItems().then((schedule) => {
      setItems(schedule);
    });
  }, []);

  return (
    <View className={styles.container}>
      <View className={styles.main}>
        <Header />
        {!items && <Text className="mt-16">No hay horarios</Text>}
        {items && items.length > 0 && (
          <>
            <Schedule items={items} />
          </>
        )}
        <View className="flex-1 flex-row items-center justify-center max-h-[64px] gap-4">
          <TouchableOpacity className={styles.button} onPress={() => setOpenModal(true)}>
            <Text className={styles.buttonText}>Agregar horario</Text>
          </TouchableOpacity>
          <Pressable onPress={handleLogout} className={styles.button}>
            <Text className={styles.buttonText}>Cerrar sesión</Text>
          </Pressable>
        </View>
        <NewModal visible={openModal}>
          <Text className="text-xl">Selecciona el día</Text>
          <View className="border border-gray my-2 w-40 h-10 rounded relative">
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue, _) => {
                setSelectedDay(itemValue);
              }}
              style={{
                width: 150,
                color: 'black',
                backgroundColor: 'transparent',
                margin: 20,
                position: 'absolute',
                left: -25,
                top: -30,
              }}>
              <Picker.Item label="Seleccionar" value="NA" />
              {(!items?.find((item: any) => item.day === 'Lunes') || !items) && (
                <Picker.Item label="Lunes" value="Lunes" />
              )}
              {(!items?.find((item: any) => item.day === 'Martes') || !items) && (
                <Picker.Item label="Martes" value="Martes" />
              )}
              {(!items?.find((item: any) => item.day === 'Miércoles') || !items) && (
                <Picker.Item label="Miércoles" value="Miércoles" />
              )}
              {(!items?.find((item: any) => item.day === 'Jueves') || !items) && (
                <Picker.Item label="Jueves" value="Jueves" />
              )}
              {(!items?.find((item: any) => item.day === 'Viernes') || !items) && (
                <Picker.Item label="Viernes" value="Viernes" />
              )}
              {(!items?.find((item: any) => item.day === 'Sábado') || !items) && (
                <Picker.Item label="Sábado" value="Sábado" />
              )}
            </Picker>
          </View>
          <View className="flex-1 flex-row gap-3">
            <Pressable
              className="bg-[#007d97] rounded-[28px] shadow-md p-4 h-14 w-24"
              onPress={handleAddSchedule}>
              <Text className="text-white font-semibold text-center text-sm">Agregar</Text>
            </Pressable>
            <Pressable
              className="bg-[#007d97] rounded-[28px] shadow-md p-4 h-14 w-24"
              onPress={() => setOpenModal(false)}>
              <Text className="text-white font-semibold text-center text-sm">Cancelar</Text>
            </Pressable>
          </View>
        </NewModal>
      </View>
    </View>
  );
}

const styles = {
  button: 'items-center bg-[#007d97] rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
  container: 'flex-1 p-3',
  main: 'flex-1 max-w-[960]',
};
