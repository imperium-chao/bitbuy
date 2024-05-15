import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import theme from "@src/theme"

type Props = {
    label?: string,
    onPress?: () => void
}

const SearchButton = ({ label, onPress }: Props) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.sarchArea}>
            <View style={styles.content}>
                <Ionicons name="search" color={theme.colors.gray} size={theme.icons.medium} style={styles.icon} />
                <Text style={styles.text}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    sarchArea: { width: "95%", padding: 4.5, paddingVertical: 5, borderRadius: 25, backgroundColor: theme.input.backGround },
    text: { fontSize: 16, marginHorizontal: 10, marginVertical: 2, color: theme.colors.gray },
    icon: { marginHorizontal: 5, marginVertical: 1 },
    content: { flexDirection: "row" }
})

export default SearchButton