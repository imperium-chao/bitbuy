import MessageBox, { showMessage } from "@components/general/MessageBox";
import { Image, StyleSheet, Text, View } from "react-native";
import { QRCodeTextBox } from "@components/form/TextBoxs";
import { ButtonPrimary } from "@components/form/Buttons";
import { useTranslate } from "@src/services/translate";
import SplashScreen from "@components/general/SplashScreen";
import { validatePrivateKey } from "@src/services/nostr";
import { useEffect, useState } from "react";
import * as ClipBoard from 'expo-clipboard'
import { AppState } from "react-native";
import theme from "@src/theme";
import { SignIn } from "@/src/services/userManager";

const Login = ({ navigation }: any) => {

    const [loading, setLoading] = useState(false)
    const [secretKey, setSecretKey] = useState("")

    useEffect(() => {
        checkClipboardContainsKey()

        AppState.addEventListener("change", handleAppStateChange)
    }, [])

    const checkClipboardContainsKey = () => {
        // verify clipboard for a privateKey nostr
        ClipBoard.getStringAsync().then((clipboardString) => handlerClipboard(clipboardString))
    }

    const handleAppStateChange = (appstate: any) => {
        if (appstate === 'active')
            checkClipboardContainsKey()
    }

    const handlerClipboard = (key: string) => {
        if (validatePrivateKey(key)) {
            showMessage({
                type: "alert",
                // title: useTranslate("commons.detectedkey"),
                message: useTranslate("message.detectedkey"),
                infolog: useTranslate("message.detectedkey.value") + key,
                action: {
                    label: useTranslate("commons.yes"), onPress: () => {
                        setSecretKey(key)
                    }
                }
            })
        }
    }

    const handlerLogin = async () => {
        setLoading(true)

        if (validatePrivateKey(secretKey)) {
            await SignIn({
                secretKey: secretKey,
                callback: () => navigation.reset({ index: 0, routes: [{ name: "core-stack" }] })
            })
        } else
            showMessage({ message: useTranslate("message.invalidkey"), infolog: secretKey })

        setLoading(false)
    }

    if (loading)
        return <SplashScreen message={useTranslate("commons.signin")} />

    return (
        <>
            <View style={theme.styles.container}>
                <Image style={styles.logo} source={require("@assets/emptio.png")} />

                <Text style={styles.title}>{useTranslate("login.message")}</Text>

                <QRCodeTextBox placeholder={useTranslate("labels.privatekey")} onChangeText={setSecretKey} value={secretKey} />

                <View style={styles.buttonArea}>
                    <ButtonPrimary label={useTranslate("commons.signin")} onPress={handlerLogin} />
                </View>
            </View>
            <MessageBox />
        </>
    )
}

const styles = StyleSheet.create({
    logo: {
        maxWidth: "90%",
        height: "35%",
        marginTop: -100
    },
    title: {
        marginVertical: 25,
        color: theme.colors.gray,
        textAlign: "center",
        width: "85%"
    },
    buttonArea: {
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        marginVertical: 30,
        flexDirection: "row",
        bottom: 10,
    }
})

export default Login