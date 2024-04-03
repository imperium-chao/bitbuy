import { TouchableOpacity, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { IconNames } from '@src/services/types/icons';
import { Ionicons } from '@expo/vector-icons';
import { StyleProp } from 'react-native';
import { TextStyle } from 'react-native';
import theme from '@src/theme';

type Props = {
    label: string,
    leftIcon?: IconNames,
    rightIcon?: IconNames,
    style?: StyleProp<ViewStyle>,
    onPress: () => void
}

const TouchableEmptio = ({ label, style, leftIcon, rightIcon, onPress }: Props) => {

    return (
        <TouchableOpacity style={style} onPress={onPress} activeOpacity={.7}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {leftIcon && <Ionicons style={{ marginLeft: 10, color: theme.icons.white }} name={leftIcon} size={18} />}
                <Text style={styles.text}> {label} </Text>
                {rightIcon && <Ionicons style={{ marginRight: 10, color: theme.icons.white }} name={rightIcon} size={18} />}
            </View>
        </TouchableOpacity>
    )
}

export const ButtonSuccess = ({ label, style, leftIcon, rightIcon, onPress }: Props) => {
    return <TouchableEmptio label={label} leftIcon={leftIcon} rightIcon={rightIcon} onPress={onPress} style={[styles.button, styles.succes, style]} />
}

export const ButtonPrimary = ({ label, style, leftIcon, rightIcon, onPress }: Props) => {
    return <TouchableEmptio label={label} leftIcon={leftIcon} rightIcon={rightIcon} onPress={onPress} style={[styles.button, styles.primary, style]} />
}

export const ButtonDanger = ({ label, style, leftIcon, rightIcon, onPress }: Props) => {
    return <TouchableEmptio label={label} leftIcon={leftIcon} rightIcon={rightIcon} onPress={onPress} style={[styles.button, styles.danger, style]} />
}

export const ButtonDefault = ({ label, style, leftIcon, rightIcon, onPress }: Props) => {
    return <TouchableEmptio label={label} leftIcon={leftIcon} rightIcon={rightIcon} onPress={onPress} style={[styles.button, styles.default, style]} />
}

export const ButtonHead = ({ label, style, leftIcon, rightIcon, onPress }: Props) => {
    return <TouchableEmptio label={label} leftIcon={leftIcon} rightIcon={rightIcon} onPress={onPress} style={[styles.button, styles.default, style]} />
}

export const ButtonLink = ({ label, style, leftIcon, rightIcon, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.textLink}></Text>
        </TouchableOpacity>
    )
}

type IconProps = {
    icon: IconNames,
    size?: number,
    style?: StyleProp<TextStyle>,
    buttonStyle?: StyleProp<TextStyle>,
    onPress: () => void
}

export const ButtonIcon = ({ icon, size, style, buttonStyle, onPress }: IconProps) => {

    size = size ? size : 20
    style = style ? style : { textAlign: "center", padding: 12 }

    /**
   * See Icon Explorer app
   * {@link https://expo.github.io/vector-icons/}
   */
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={.7}>
            <Ionicons name={icon} size={size} color={theme.icons.white} style={style} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        minWidth: 150,
        maxWidth: "96%",
        paddingVertical: 14,
        borderRadius: 25,
    },
    succes: {
        backgroundColor: theme.colors.green
    },
    primary: {
        backgroundColor: theme.colors.blue
    },
    danger: {
        backgroundColor: theme.colors.red
    },
    default: {
        backgroundColor: theme.colors.gray
    },
    text: {
        fontSize: 13,
        fontWeight: "500",
        textAlign: 'center',
        marginHorizontal: 10,
        color: theme.colors.white
    },
    textLink: {
        color: theme.colors.link
    }
})

