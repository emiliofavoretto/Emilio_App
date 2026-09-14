import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_KEY = 'cv_yfAetsgLi9GPs488jiq-dBnVXXc0Dt9Ji9KWnFnmj0Sk840t4JDxPEIM1-l9HOLl';

const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

export default function LivrosListarScreen() {
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
            setLivros(resposta.data?.data || []);
        } catch (error) {
            setErro('Não foi possível carregar os livros.');
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

                {carregando && <ActivityIndicator size="large" style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    livros?.map((livro) => (
                        <View key={livro.id || livro._id} style={styles.cardBlock}>
                            <View style={styles.card}>
                                <Image
                                    source={{ uri: livro.imageUrl }}
                                    style={styles.imagem}
                                />
                                <View style={styles.info}>
                                    <Text style={styles.titulo}>{livro.title}</Text>
                                    <Text style={styles.categoria}>
                                        {livro.autor} · {`${livro.paginas} páginas`}
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
    cardBlock: { marginTop: 12 },
    card: {
        flexDirection: 'row',
        gap: 12,
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