import { Text, TouchableOpacity, View } from "react-native"
import { CircleX, CircleCheck } from "lucide-react-native"
import { useSelector } from "react-redux"

import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const EventCard = ({ event, setEvent, subscribeEvent }) => {

    const user = useSelector(state => state.user)

    return (
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <TouchableOpacity onPress={() => setEvent(event)}>
                <Text style={{ width: '100%', fontFamily: 'Lato_400Regular' }}>{event.title}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TouchableOpacity onPress={() => setEvent(event)}>
                    <Text style={{fontFamily: 'Lato_400Regular'}}>{dayjs(event.date).locale('fr').format('DD-MM-YY')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => subscribeEvent()}>
                {!event.subscribers.some(e => e === user.username)
                    ? <CircleCheck size={ 20 } color='#BDCEBB' />
                    : <CircleX size={ 20 } color='#FEC2A9' />
                }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EventCard