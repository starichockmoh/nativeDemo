import React, {useState} from "react";
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {Navbar} from "./src/Components/Navbar";
import {AdTodo} from "./src/Components/AdTodo";
import {Task} from "./src/Components/Task";
import { SwipeListView } from 'react-native-swipe-list-view';

type TaskType = {
    text: string
    id: string
}


export default function App() {
    const [tasks, SetTasks] = useState<Array<TaskType>>([])

    const AddTask = (task: string) => {
        const newTask: TaskType = {
            id: Date.now().toString(),
            text: task
        }
        SetTasks(prevArray => [...prevArray, newTask])
    }
    const DeleteTask = (id: string) => {
        SetTasks(prevArray => prevArray.filter(t => t.id !== id))
    }

    const tasksComponents = tasks.map(t => <Task key={t.id} id={t.id} text={t.text} DeleteTask={DeleteTask}/>)

    return (
        <View>
            <Navbar/>
            <View style={styles.searchContainer}>
                <AdTodo AddTask={AddTask}/>
            </View>
            <FlatList data={tasks}
                      renderItem={({item}) =>
                          <Task DeleteTask={DeleteTask} text={item.text} id={item.id}/>}
                      keyExtractor={item => item.id}
            />

        </View>

    )
}


const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    tasksContainer:{
        overflow: 'scroll'
    }
})