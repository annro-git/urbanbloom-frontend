/* import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';


export default Garden = (props) => {

    const [jardiniers, setJardiniers] = useState(0);
    const [members, setMembers] = useState([]);

    useEffect(() => {

        fetch(`${global.BACKEND_URL}/gardens/)

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Image>

                </Image>
                <Text>
                    Au Jardin Trucmuche
                </Text>
                <View>
                    <Text>
                        {jardiniers} Jardiniers
                    </Text>
                    {members.map}
                </View>
                
            </View>



        </View>
    )
} */