import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Eu = require("../../assets/eu.jpg")

export default function HomeScreen() {
    return (
        <ScrollView>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.hero}>
                        <Text style={styles.eyebrow}>Emílio Henrique dos Santos Favoretto</Text>
                        <Image source={Eu} style={styles.profile}></Image>
                        <View style={styles.description}>
                            <Text style={styles.infoDesc}>sou desenvolvedor Web a aproximadamente 2 anos cursando Desenvolvimento de sistemas no SENAI Valinhos</Text>


                        </View>
                    </View>
                    <View style={styles.hero}>
                        <Text style={styles.eyebrow}> Ferramentas usadas no curso</Text>
                        <Text style={styles.title}>Curso - DS</Text>
                        <View style={styles.description}>
                            <Text style={styles.info}>• GitHub</Text>
                            <Text style={styles.info}>• VScode</Text>
                            <Text style={styles.info}>• Postmam</Text>
                            <Text style={styles.info}>• Node.js</Text>

                        </View>
                    </View>
                    <View style={styles.hero}>
                        <Text style={styles.eyebrow}>React Native + Expo Router</Text>
                        <Text style={styles.title}>Hobbies</Text>
                        <View style={styles.description}>
                            <Text style={styles.info}>• Praticar calistenia</Text>
                            <Text style={styles.info}>• Desenhar</Text>
                            <Text style={styles.info}>• Programar</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>O que vem configurado</Text>
                        <Text style={styles.cardItem}>• JavaScript habilitado</Text>
                        <Text style={styles.cardItem}>• Rotas com expo-router</Text>
                        <Text style={styles.cardItem}>• Abas e modal de exemplo</Text>
                        <Text style={styles.cardItem}>• Scripts para Android, iOS e Web</Text>
                    </View>

                    <Link href="/modal" asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Abrir modal de exemplo</Text>
                        </Pressable>
                    </Link>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#99e6d9',
    },
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
        flexDirection: 'column',
        zIndex: 1,
    },
    hero: {
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#061531',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 4,
    },
    eyebrow: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#d0e2ff',
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        lineHeight: 24,
        color: '#edf5ff',
        textAlign: 'center',
        width: 300,
        height: 150,
        backgroundColor: '#ece6e62a',
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#ec9d0a',
        borderWidth: 2,
    },
    card: {
        gap: 8,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#102542',
    },
    cardItem: {
        fontSize: 15,
        color: '#334e68',
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: 'center',
        backgroundColor: '#102542',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    info: {
        color: '#fdfbfb',
        padding: 5,
        fontSize: 15,
        fontWeight: 600,
    },
    profile: {
        borderRadius: 20,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#ec9d0a',
        borderWidth: 2,
        width: 200,
        height: 200,
    },
    infoDesc: {
        color: '#fdfbfb',
        padding: 5,
        fontSize: 15,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
