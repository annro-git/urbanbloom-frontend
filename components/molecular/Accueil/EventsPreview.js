import { TouchableOpacity, Text } from "react-native"

import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const EventsPreview = ({ event, navigate, index }) => {

    return (
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor: index%2 === 0 ? 'white' : '#FFFFFFCC', borderRadius: 5, padding: 10 }} onPress={() => navigate('Jardins', {garden: {id: event.gardenId}})}>
            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16 }}>{event.title}</Text>
            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 14 }}>Le {dayjs(event.date).locale('fr').format('D MMM')}</Text>
        </TouchableOpacity>
    )
}

export default EventsPreview