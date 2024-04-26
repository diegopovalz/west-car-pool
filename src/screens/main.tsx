import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';

import { NewModal as Modal } from '~/components';

let items = [
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

const modifyItem = (item: string, newDate: string) => {
  const modifiedItems = items.map((i) => (i.day === item ? { ...i, departureTime: newDate } : i));
  items = modifiedItems;
};

export default function Main() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>('Lunes');
  const [selectedDate, setSelectedDate] = useState(new Date(1598051730000));
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    if (!selectedDate) return;
    if (event.type === 'dismissed') return;
    const currentDate = selectedDate;
    setSelectedDate(currentDate);
    const minutes = currentDate.getMinutes();
    const hour = currentDate.getHours();
    modifyItem(
      selectedDay!,
      `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    );
    setShowTimePicker(false);
    setOpenModal(false);
    setSelectedDay('NA');
  };

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
        <Text className="text-xl">Selecciona el día</Text>
        <View className="border border-gray my-2 w-40 h-10 rounded relative">
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue, _) => {
              setSelectedDay(itemValue);
              setShowTimePicker(true);
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
            <Picker.Item label="Escoger día" value="NA" />
            <Picker.Item label="Lunes" value="Lunes" />
            <Picker.Item label="Martes" value="Martes" />
            <Picker.Item label="Miercoles" value="Miercoles" />
            <Picker.Item label="Jueves" value="Jueves" />
            <Picker.Item label="Viernes" value="Viernes" />
            <Picker.Item label="Sabado" value="Sabado" />
          </Picker>
        </View>
        {showTimePicker && (
          <DateTimePicker
            mode="time"
            value={selectedDate}
            onChange={onDateChange}
            is24Hour
            testID="dateTimePicker"
          />
        )}
        <Pressable
          className="bg-[#007d97] rounded-[28px] shadow-md p-4"
          onPress={() => setOpenModal(false)}>
          <Text className="text-white font-semibold text-center">Cancelar</Text>
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
