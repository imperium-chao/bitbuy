import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native"
import theme from "@src/theme"
import { useEffect, useState } from "react"
import SplashScreen from "@components/general/SplashScreen"
import { Section } from "@components/general/Section"
import { ButtonDanger, ButtonPrimary } from "@components/form/Buttons"
import { getPairKeys } from "@src/services/memory"
import { listenerEvents } from "@src/services/nostr/events"

type EventData = {
    kind: number,
    pubkey: string,
    content: string
}

const Home = ({ navigation }: any) => {

    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState<EventData[]>([])

    useEffect(() => handleData(), [])

    const handleData = () => {
        setLoading(true)
        const { publicKey } = getPairKeys()

        listenerEvents({ limit: 5, kinds: [0], authors: [publicKey], search: "contribuinte" }).then(result => {
            
            setEvents(result)

            setLoading(false)
        }) 
    }

    if (loading)
        return <SplashScreen />

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={theme.styles.scroll_container}
                refreshControl={<RefreshControl refreshing={false} onRefresh={handleData} />}
            >
                {events && events.map((event, key) => {
                    return <Section key={key}>
                        <Text style={{ fontSize: 16, color: theme.colors.gray, margin: 10 }}>{event.content}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <ButtonPrimary label="Repost" onPress={() => { }} />
                            <ButtonDanger label="Donate" onPress={() => { }} />
                        </View>
                    </Section>
                })}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        padding: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.gray,
    },
    container: {
        backgroundColor: theme.colors.black,
        height: "100%"
    },
})

export default Home