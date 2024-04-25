import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';

import { NewModal as Modal } from '~/components';

// Crea un arreglo de objetos con las propiedades dia (un dia de la semana por cada uno), y un objeto con las propiedades origen, destino, hora de salida y hora de llegada.
const items = [
  {
    day: 'Lunes',
    origin: 'Casa',
    destination: 'Trabajo',
    departureTime: '08:00',
    arrivalTime: '09:00',
  },
  {
    day: 'Martes',
    origin: 'Casa',
    destination: 'Trabajo',
    departureTime: '08:00',
    arrivalTime: '09:00',
  },
  {
    day: 'Miercoles',
    origin: 'Casa',
    destination: 'Trabajo',
    departureTime: '08:00',
    arrivalTime: '09:00',
  },
  {
    day: 'Jueves',
    origin: 'Casa',
    destination: 'Trabajo',
    departureTime: '08:00',
    arrivalTime: '09:00',
  },
  {
    day: 'Viernes',
    origin: 'Casa',
    destination: 'Trabajo',
    departureTime: '08:00',
    arrivalTime: '09:00',
  },
  {
    day: 'Sabado',
    origin: 'Casa',
    destination: 'Trabajo',
    departureTime: '08:00',
    arrivalTime: '09:00',
  },
];

const modifyItem = (item: string, newItem: any) => {
  const modifiedItems = items.map((i) => (i.day === item ? newItem : i));
  return modifiedItems;
};

export default function Main() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <View className={styles.container}>
      <View className={styles.main}>
        <View className="flex-1 items-center justify-start mt-10 max-h-[100px]">
          <Image
            source={require('../../assets/city.jpeg')}
            className="absolute -z-40 w-full h-36"
          />
          <Image
            source={require('../../assets/LogoAppTransparent.png')}
            className="mt-8 w-16 h-16"
          />
          <Text className={styles.title}>WestCarPool</Text>
        </View>
        <View className="flex-1 mt-10 mb-9 max-h-[70%]">
          <Text className={styles.subtitle}>Mis horarios</Text>
          <ScrollView>
            {items.map((item) => (
              <View key={item.day} className="mb-4">
                <Text className="mb-4">{item.day}</Text>
                <DataTable>
                  <DataTable.Header className="bg-white rounded-lg">
                    <DataTable.Title onPress={() => console.log('origen')}>Origen</DataTable.Title>
                    <DataTable.Title>Destino</DataTable.Title>
                    <DataTable.Title>Salida</DataTable.Title>
                    <DataTable.Title>Llegada</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row className="bg-white rounded-lg">
                    <DataTable.Cell>{item.origin}</DataTable.Cell>
                    <DataTable.Cell>{item.destination}</DataTable.Cell>
                    <DataTable.Cell>{item.departureTime}</DataTable.Cell>
                    <DataTable.Cell>{item.arrivalTime}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="flex-1 items-center justify-end max-h-[64px]">
          <TouchableOpacity className={styles.button} onPress={() => setOpenModal(true)}>
            <Text className={styles.buttonText}>Modificar horarios</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={openModal}>
        <Text>Modal</Text>
        <Pressable onPress={() => setOpenModal(false)}>
          <Text>Close</Text>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = {
  button: 'items-center bg-[#007d97] rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
  container: 'flex-1 p-6',
  main: 'flex-1 max-w-[960]',
  title: 'text-2xl font-bold text-[#000000]',
  subtitle: 'text-2xl font-bold text-gray-700 text-center',
};
