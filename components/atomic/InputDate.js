import { View, Pressable, Text } from "react-native"
import { useEffect, useState } from "react"
import { CalendarDays, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react-native"

import DateTimePicker from "react-native-ui-datepicker"
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const InputDate = ({ color, size, placeholder, onPick }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = useState('')
    const cap1st = str => str.charAt(0).toUpperCase() + str.slice(1)

    useEffect(() => {
        setIsOpen(false)
        onPick(String(date))
    }, [date])

    return (
        <View>
            <View
                style={[{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: color,
                    borderRadius: 5,
                    paddingVertical: 10,
                    backgroundColor: 'white',
                    position: 'relative'
                },
                isOpen && {
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomWidth: 0,
                }
            ]}
            >
                <Pressable 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        paddingHorizontal: 20
                    }}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    {date
                        ? <Text style={{ fontFamily: 'Lato_400Regular', fontSize: size, color: '#000000BF'}}>
                            { cap1st(date.locale('fr').format('dddd D MMMM YYYY')) }
                        </Text>
                        : <Text style={{ fontFamily: 'Lato_400Regular', fontSize: size, color: color }}>{placeholder}</Text>
                    }
                    {isOpen
                        ? <ChevronUp size={ 20 } color={ color } />
                        : <CalendarDays size={ 20 } color={ color } />
                    }
                </Pressable>
            </View>
            { isOpen &&
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: color,
                        borderTopWidth: 0,
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        backgroundColor: 'white',
                        width: '100%',
                        position: 'absolute',
                        top: 59,
                        padding: 10,
                    }}
                >
                <DateTimePicker
                    mode="single"
                    date={ dayjs() }
                    onChange={e => setDate(e.date)}
                    firstDayOfWeek={ 1 }
                    displayFullDays={ true }
                    minDate={ ( d => new Date(d.setDate(d.getDate()-1)) )(new Date) }
                    locale={ 'fr' }
                    buttonPrevIcon={ <ChevronLeft color={ color } size={ 32 } />}
                    buttonNextIcon={ <ChevronRight color={ color } size= { 32 } /> }
                    calendarTextStyle={{ fontFamily: 'Lato_400Regular', fontSize: size, color: '#000000BF' }}
                    selectedTextStyle={{ fontFamily: 'Lato_400Regular', fontSize: size, color: '#000000BF' }}
                    selectedItemColor={ color }
                    todayTextStyle={{ color: '#000000BF' }}
                    headerTextStyle={{ fontFamily: 'Lato_400Regular', fontSize: size+2, fontWeight: 400 }}
                    weekDaysTextStyle={{ fontFamily: 'Lato_400Regular', color: color }}
                    weekDaysContainerStyle={{ borderBottomColor: color }}
                />
                </View> 
            }
        </View>
            
    )
}

export default InputDate