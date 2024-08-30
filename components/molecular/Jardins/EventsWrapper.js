import { View, Text, TouchableOpacity } from "react-native"
import { useState } from "react"

import EventCard from "./EventCard"
import { ChevronUp, ChevronDown } from "lucide-react-native"

const EventsWrapper = ({ events, setEvent, subscribeEvent }) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <View style={{ backgroundColor: '#C5BBA2', width: '80%', padding: 20, borderRadius: 10 }}>
            {events && events.length > 0
                ? <View style={{ gap: 10 }}>
                    <TouchableOpacity onPress={()=> setIsOpen(!isOpen)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 16, color: '#000000BF'}}>{events.length} événement à venir !</Text>
                        {isOpen ? <ChevronUp size={ 20 } color='#000000BF' /> : <ChevronDown size={ 20 } color='#000000BF' />}
                    </TouchableOpacity>
                {isOpen && events
                    .filter(event => new Date(event.date) > new Date())
                    .sort((a,b) => new Date(a.date) - new Date(b.date))
                    .map((event, index) => {
                    return (
                        <EventCard key={index} event={event} setEvent={setEvent} subscribeEvent={() => subscribeEvent(event) }/>
                    )
                })}
                </View>
                : <View>
                    <Text style={{fontSize: 16, fontFamily: 'Lato_400Regular', textAlign: 'center',}}>Aucun événement pour le moment</Text>
                </View>
            }
        </View>
    )
}

export default EventsWrapper