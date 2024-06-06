import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';

interface ScheduleProps {
  items: any[];
}

const Schedule = ({ items }: ScheduleProps) => {
  const [scheduleItems, setScheduleItems] = useState(items);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date(1598051730000));
  const [showTimePicker, setShowTimePicker] = useState(false);

  const modifyItem = (item: { day: string; type: string }, newDate: string) => {
    const modifiedItems = scheduleItems.map((i) => {
      if (i.day === item.day) {
        if (item.type === 'departure') {
          return { ...i, departureTime: newDate };
        }
        return { ...i, arrivalTime: newDate };
      }
      return i;
    });
    setScheduleItems(modifiedItems);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    if (!selectedDate) return;
    if (event.type === 'dismissed') return;
    const currentDate = selectedDate;
    setSelectedDate(currentDate);
    const minutes = currentDate.getMinutes();
    const hour = currentDate.getHours();
    modifyItem(
      selectedDay,
      `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    );
    setShowTimePicker(false);
  };

  const toggleCarInfo = (day: string, type: string) => {
    const modifiedItems = scheduleItems
      .map((i) => {
        if (i.day !== day) {
          return { ...i, showDepatureInfo: false, showArrivalInfo: false };
        }
        return i;
      })
      .map((i) => {
        if (i.day === day) {
          if (type === 'departure') {
            return { ...i, showDepatureInfo: !i.showDepatureInfo, showArrivalInfo: false };
          }
          return { ...i, showArrivalInfo: !i.showArrivalInfo, showDepatureInfo: false };
        }
        return i;
      });
    setScheduleItems(modifiedItems);
  };

  useEffect(() => {
    setScheduleItems(items);
  }, [items]);

  if (!scheduleItems)
    return (
      <View className="flex-1 mt-10 mb-1 max-h-[75%]">
        <Text className="text-2xl font-bold text-gray-700 text-center mb-4">Mis horarios2</Text>
        <Text className="text-center">No hay horarios disponibles</Text>
      </View>
    );

  return (
    <View className="flex-1 mt-10 mb-1 max-h-[75%]">
      <Text className="text-2xl font-bold text-gray-700 text-center mb-4">Mis horarios</Text>
      <ScrollView>
        {scheduleItems?.map((item) => {
          return (
            <View key={item.day} className="mb-4">
              <Text className="mb-4 text-center">{item.day}</Text>
              <DataTable>
                <DataTable.Header className="bg-white rounded-lg">
                  <DataTable.Title>Desde</DataTable.Title>
                  <DataTable.Title>Hora</DataTable.Title>
                  <DataTable.Title> </DataTable.Title>
                </DataTable.Header>
                <DataTable.Row
                  className="bg-white rounded-lg"
                  onPress={() => toggleCarInfo(item.day, 'departure')}>
                  <DataTable.Cell>{item.origin}</DataTable.Cell>
                  <DataTable.Cell>{item.departureTime}</DataTable.Cell>
                  <DataTable.Cell>
                    <TouchableOpacity
                      className="items-center bg-[#007d97] rounded-[28px] shadow-md px-4 py-1"
                      onPress={() => {
                        setSelectedDay({ day: item.day, type: 'departure' });
                        setShowTimePicker(true);
                      }}>
                      <Text className="text-white text-lg font-semibold text-center">Cambiar</Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
                {item.showDepatureInfo && (
                  <DataTable.Row className="bg-white">
                    <View className="flex-1 flex-row items-center justify-center">
                      <Image source={require(`../../assets/red_car.jpg`)} className="w-28 h-9" />
                      <View className="flex-1 flex-col">
                        <Text className="text-lg font-semibold text-gray-700 ml-4">
                          Conductor: <Text className="font-normal">{item.departureCar.owner}</Text>
                        </Text>
                        <Text className="text-lg font-semibold text-gray-700 ml-4">
                          Modelo: <Text className="font-normal">{item.departureCar.model}</Text>
                        </Text>
                      </View>
                    </View>
                  </DataTable.Row>
                )}
                <DataTable.Row
                  className="bg-white rounded-lg"
                  onPress={() => toggleCarInfo(item.day, 'arrival')}>
                  <DataTable.Cell>{item.destination}</DataTable.Cell>
                  <DataTable.Cell>{item.arrivalTime}</DataTable.Cell>
                  <DataTable.Cell>
                    <TouchableOpacity
                      className="items-center bg-[#007d97] rounded-[28px] shadow-md px-4 py-1"
                      onPress={() => {
                        setSelectedDay({ day: item.day, type: 'arrival' });
                        setShowTimePicker(true);
                      }}>
                      <Text className="text-white text-lg font-semibold text-center">Cambiar</Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
                {item.showArrivalInfo && (
                  <DataTable.Row className="bg-white">
                    <View className="flex-1 flex-row items-center justify-center">
                      <Image source={require(`../../assets/white_car.jpg`)} className="w-28 h-9" />
                      <View className="flex-1 flex-col">
                        <Text className="text-lg font-semibold text-gray-700 ml-4">
                          Conductor: <Text className="font-normal">{item.arrivalCar.owner}</Text>
                        </Text>
                        <Text className="text-lg font-semibold text-gray-700 ml-4">
                          Modelo: <Text className="font-normal">{item.arrivalCar.model}</Text>
                        </Text>
                      </View>
                    </View>
                  </DataTable.Row>
                )}
              </DataTable>
            </View>
          );
        })}
      </ScrollView>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={selectedDate}
          onChange={onDateChange}
          is24Hour
          testID="dateTimePicker"
        />
      )}
    </View>
  );
};

export { Schedule };
