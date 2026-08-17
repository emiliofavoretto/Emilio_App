import { View, Text, StyleSheet } from "react-native";

export default function Exemplo() {
    // logica aqui
    return (
        <View style={styles.card}>
            <Text>Teste</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },
});
