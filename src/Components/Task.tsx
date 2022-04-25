import React, {useState} from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";


type PropsType = {
    DeleteTask: (id: string) => void
    text: string
    id: string
}

export const Task: React.FC<PropsType> = ({id, text, DeleteTask}) => {
    const [done, SetDone] = useState(false)
    return (
        <TouchableOpacity
            onPress={(e) => console.log("Pressed", id,e)}
            onLongPress={DeleteTask.bind(null, id)}

        >
            <View style={done? [styles.block, {opacity: 0.5}]: styles.block}>
                <Text style={done? styles.done_task: undefined}>
                    {text}
                </Text>
                <BouncyCheckbox fillColor={'#3949ab'} onPress={() => SetDone(!done)}/>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    block: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    done_task: {
        textDecorationLine: 'line-through',
    }
})