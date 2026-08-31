import { React, useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_KEY = 'cv_hK7LxiDK1cmbhA9-wfiya2Ahe3H1UlRnhlurz3c7vky_tMI_zfcCpUlSyCee-8MH';

const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

export default function livrosListarScreen() {
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    async function buscarLivros() {
        setCarregando(true);
        setErro(null);
        try {
            const resposta = await api.get('/api/livros', {
                params: { limit: 50 },
            });
            setLivros(resposta.data.data);
        } catch (error) {
            setErro('Não foi possivel carregar livros');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarLivros();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar livros</Text>
                    <Text style={styles.subtitulo}>GET /api/livros</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    livros.map((livros) => (
                        <View style={styles.cardBlock}>
                            <View key={livros.id} style={styles.card}>
                                <Image
                                    source={{ uri: livros.imageUrl }}
                                    height={64}
                                    width={64}
                                    style={styles.imagem}
                                />
                                <View style={styles.info}>
                                    <Text style={styles.titulo}>{livros.title}</Text>
                                    <Text style={styles.categoria}>
                                        {livros.autor} · {`${livros.paginas} páginas`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#99e6d9' },
    conteudo: { padding: 24, paddingBottom: 48 },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: '800', color: '#061531' },
    subtitulo: { fontSize: 14, color: '#061531', marginTop: 2 },

    erro: { color: '#c62828', marginTop: 12 },
    card: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
        backgroundColor: '#061531',
        borderRadius: 10,
        overflow: 'hidden',
        borderStyle: 'solid',
        borderColor: '#ec9d0a',
        borderWidth: 1,
    },
    imagem: { width: 64, height: 64 },
    info: { flex: 1, justifyContent: 'center', paddingRight: 12 },
    titulo: { fontSize: 16, fontWeight: '700', color: '#ffffff' },
    categoria: { fontSize: 13, color: '#ffffff' },
});
