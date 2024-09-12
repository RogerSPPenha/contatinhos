import { Alert, View, SectionList, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { Input } from "../components/input";
import { theme } from "@/theme";
import { useState, useEffect } from "react";
import { Contact, ContactProps } from "../components/contact";
import * as Contacts from "expo-contacts";

type SectionListDataProps = {
    title: String
    data: ContactProps //Contato já está tipado
}


export function Home(){
    const [contacts, setContacts] = useState<SectionListDataProps[]>([]);
    const [name, setName] = useState("");
    useEffect(() => {
        fetchContacts()
    },[])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Input style={styles.input}>
                    <Feather name="search" size={16} color={theme.colors.gray_300}></Feather>
                    <Input.Field placeholder="pesquisar pelo nome..." onChangeText={setName}/>
                    <Feather name="x" size={19} color={theme.colors.gray_300} onPress={() => setName("")}></Feather>
                </Input>
            </View>
            <SectionList
                sections={[{title: "R", data: [{id: "1", name: "Heloísa"}] }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Contact contact={{
                        name: item.name,
                        image: require("@/assets/avatar.jpeg")
                    }} />
                )}
                renderSectionHeader={({ section }) => (<Text style={ styles.section }>{section.title}</Text>)}
                contentContainerStyle = {styles.contentList}
            />
            
        </View>
    )
}

async function fetchContacts() {
    try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === Contacts.PermissionStatus.GRANTED) {
            const { data } = await Contacts.getContactsAsync()
            console.log(data)
        }
    } catch( error ) {
        console.log(error)
        Alert.alert("Contatos", "Não foi possível carregar os contatos...")
    }
}


