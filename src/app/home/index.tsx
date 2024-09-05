import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { Input } from "../components/input";
import { theme } from "@/theme";

export function Home(){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Input style={styles.input}>
                    <Feather name="search" size={16} color={theme.colors.gray_300}></Feather>
                    <Input.Field placeholder="pesquisar pelo nome..."/>
                    <Feather name="x" size={19} color={theme.colors.gray_300}></Feather>
                </Input>
            </View>
        </View>
    )
}