import { View, Text, TouchableOpacity } from "react-native"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react-native"

import PageBloc from "./PageBloc"

const PageTypeCard = ({ pages, title, selectPage, color }) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <View style={{ backgroundColor: color, padding: 20, gap: 20, borderRadius: 10 }}>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Text style={{ fontSize: 16, color: '#000000BF', fontFamily: 'Lato_700Bold', color: '#000000BF', lineHeight: 24 }}>
                    { title }
                </Text>
                {isOpen
                    ? <ChevronUp size={ 24 } color='#000000BF' />
                    : <ChevronDown size={ 24 } color='#000000BF' />
                }
            </TouchableOpacity>
            {isOpen &&
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'flex-start' }}>
                    {pages.map((page, index) => {
                        return (
                            <PageBloc
                                key={ index }
                                page={ page }
                                selectPage={ e => selectPage(e) }
                            />
                        )
                    })}
                </View>
            }
        </View>
    )
}

export default PageTypeCard