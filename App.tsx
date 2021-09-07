import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    SectionList,
    StatusBar,
    Button,
    Image,
    TextInput,
    NativeSyntheticEvent, TextInputChangeEventData
} from "react-native";
import axios from "axios";


type UsersListPropsType = {
    CurrentSearch: string
    onSelect: (login: string) => void
    onNavigation: (nav: 'search' | 'info') => void
    // CurrentUser: string | null
}
type UserType = {
    location: string
    avatar_url: string
    login: string
    followers: number
    name: string
}
type PreviewUserType = {
    avatar_url: string
    login: string
    id: number
}
type ResponseType = {
    items: Array<PreviewUserType>
}
type SearchComponentPropsType = {
    onSearch: (value: string) => void
    CurrentSearch: string
}

type UsersDataType = Array<{ data: Array<PreviewUserType> }>

const App = () => {
    const [CurrentUser, SetUser] = useState<null | string>(null)
    const [CurrentSearch, SetSearch] = useState("it-kamasutra")
    const [Navigation, SetNavigation] = useState<'search' | 'info'>("search")

    const onSearch = (value: string) => {
        value && SetSearch(value)
    }
    const onSelect = (login: string | null) => {
        SetUser(login)
    }
    return <SafeAreaView style={styles.container}>
        {Navigation === 'search' ?
            <>
                <SearchComponent CurrentSearch={CurrentSearch} onSearch={onSearch}/>
                <UsersList CurrentSearch={CurrentSearch} onSelect={onSelect} onNavigation={SetNavigation}/>
            </>
            : <>
                {CurrentUser && <Details CurrentUser={CurrentUser}/>}
                <Button title={'Назад'} onPress={() => SetNavigation('search')}/>
            </>
        }

    </SafeAreaView>

}

const Details: React.FC<{ CurrentUser: string }> = ({CurrentUser}) => {
    const [CurrentUserData, SetUserData] = useState<null | UserType>(null)

    useEffect(() => {
        axios.get<UserType>('https://api.github.com/users/' + CurrentUser)
            .then(res => {
                if (res.status === 200) {
                    SetUserData(res.data)
                }
            })
    }, [CurrentUser])
    if (CurrentUserData) return <SafeAreaView style={styles.userInfoBlock}>
        <Text style={styles.titleInfo}>{CurrentUserData.login}</Text>
        <Image style={styles.avatar} source={{uri: CurrentUserData.avatar_url}}/>
        <View>
            <View>
                <Text>
                    <Text style={styles.infoItem}> Followers: </Text> {CurrentUserData.followers}
                </Text>
            </View>
            <View>
                <Text>
                    <Text style={styles.infoItem}> UserName: </Text> {CurrentUserData.login}
                </Text>
            </View>
            <View>
                <Text>
                    <Text style={styles.infoItem}> Location: </Text> {CurrentUserData.location}
                </Text>
            </View>
        </View>
    </SafeAreaView>

    return <></>
}


const UsersList: React.FC<UsersListPropsType> = ({CurrentSearch, onSelect, onNavigation}) => {
    const [UsersData, SetUsersData] = useState<null | UsersDataType>(null)
    useEffect(() => {
        axios.get<ResponseType>(`https://api.github.com/search/users?q=${CurrentSearch}&per_page=12`)
            .then((res) => {
                if (res.status === 200) {
                    SetUsersData([{data: res.data.items}])
                }
            })
    }, [CurrentSearch])
    if (UsersData) return <SectionList
        sections={UsersData}
        keyExtractor={(item, index) => item.login + index}
        renderItem={({item}) =>
            <View style={styles.item} onTouchEnd={() => {
                onSelect(item.login)
                onNavigation('info')
            }}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: item.avatar_url,
                    }}
                />
                <Text style={styles.item_text}>
                    {item.login}
                </Text>
            </View>}
    />
    return <></>
}


const SearchComponent: React.FC<SearchComponentPropsType> = ({CurrentSearch, onSearch}) => {
    const [SearchValue, SetValue] = useState('')
    useEffect(() => {
        SetValue(CurrentSearch)
    }, [CurrentSearch])

    return <View style={styles.searchBlock}>
        <TextInput
            value={SearchValue}
            placeholder={'input name...'}
            style={styles.input}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => SetValue(e.nativeEvent.text)}
        />
        <View style={styles.searchButton}>
            <Button disabled={!SearchValue} title={'search'} onPress={() => onSearch(SearchValue)}/>
        </View>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    titleInfo: {
        fontWeight: '600',
        fontSize: 20,
        position: 'absolute',
        top: 0
    },
    item: {
        borderRadius: 15,
        backgroundColor: "#F8F8FF",
        padding: 10,
        position: 'relative',
        marginVertical: 8,
        height: 50,
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    },
    logo: {
        borderRadius: 30,
        width: 50,
        height: 50,
        marginBottom: 15,
        position: 'absolute',
        left: 5
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 30
    },
    item_text: {
        position: 'absolute',
        margin: 0,
        top: '50%',
        left: '40%'
    },
    input: {
        height: 40,
        width: '70%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
    },
    searchBlock: {
        display: 'flex',
        flexDirection: 'row'
    },
    searchButton: {
        padding: 5,
        height: 40,
        marginTop: 12
    },
    userInfoBlock: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoItem: {
        fontWeight: '600',
        color: 'grey'
    }

});

export default App;