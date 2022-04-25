import React, {useState} from "react";
import {View, StyleSheet, TextInput, Button, NativeSyntheticEvent, TextInputChangeEventData, Alert} from "react-native";

type PropsType = {
    AddTask: (task: string) => void
}


export const AdTodo: React.FC<PropsType> = ({AddTask}) => {
    const [inputText, SetValue] = useState('')

    const onAdd = () => {
        if (inputText.trim()) {
            AddTask(inputText)
            SetValue('')
        } else {
            Alert.alert('Название дела не может быть пустым')
        }
    }
    return (
        <View style={styles.block}>
            <TextInput style={styles.input}
                       value={inputText}
                       onChangeText={SetValue}
                       autoCapitalize={'none'}
                       autoCorrect={false}
                       placeholder='Введите название дела...'
            />
            <Button title={'Добавить'}
                    color={'#3949ab'}
                    onPress={onAdd}/>
        </View>
    )
}


const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab',
        width: '70%',
        padding: 10,
        marginRight: 5

    }
})