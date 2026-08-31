import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_KEY = 'cv_hK7LxiDK1cmbhA9-wfiya2Ahe3H1UlRnhlurz3c7vky_tMI_zfcCpUlSyCee-8MH';

const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

export default function PostScreen() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [anoPublicacao, setAnoPublicacao] = useState('');
    const [paginas, setPaginas] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');

    const [enviando, setEnviando] = useState(false);

    async function criarLivro() {
        if (!titulo || !autor || !genero || !anoPublicacao || !paginas) {
            Alert.alert('Aviso', 'Preencha todos os campos obrigatórios.');
            return;
        }

        setEnviando(true);
        try {
            const payload = {
                title: titulo,
                autor: autor,
                genero: genero,
                ano_publicacao: Number(anoPublicacao),
                numero_paginas: Number(paginas),
                imageUrl: imagemUrl.trim() !== '' ? imagemUrl : null,
            };

            const resposta = await api.post('/api/livros', payload);

            Alert.alert('Sucesso!', `Livro "${resposta.data.title || titulo}" criado com sucesso.`);

            // Limpa os campos
            setTitulo('');
            setAutor('');
            setGenero('');
            setAnoPublicacao('');
            setPaginas('');
            setImagemUrl('');
        } catch (e) {
            console.log('Erro API:', e.response?.data || e.message);

            Alert.alert(
                'Erro ao criar livro',
                'Confira se os números do ano e das páginas estão corretos e tente novamente.',
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Criar Livro</Text>
                    <Text style={styles.subtitulo}>POST /api/livros</Text>
                </View>

                <Text style={styles.rotulo}>Título *</Text>
                <TextInput
                    style={styles.campo}
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholder="Ex: O Senhor dos Anéis"
                />

                <Text style={styles.rotulo}>Autor *</Text>
                <TextInput
                    style={styles.campo}
                    value={autor}
                    onChangeText={setAutor}
                    placeholder="Ex: J.R.R. Tolkien"
                />

                <Text style={styles.rotulo}>Gênero *</Text>
                <TextInput
                    style={styles.campo}
                    value={genero}
                    onChangeText={setGenero}
                    placeholder="Ex: Fantasia"
                />

                <Text style={styles.rotulo}>Ano de Publicação *</Text>
                <TextInput
                    style={styles.campo}
                    value={anoPublicacao}
                    onChangeText={setAnoPublicacao}
                    keyboardType="numeric"
                    placeholder="Ex: 1954"
                />

                <Text style={styles.rotulo}>Quantidade de Páginas *</Text>
                <TextInput
                    style={styles.campo}
                    value={paginas}
                    onChangeText={setPaginas}
                    keyboardType="numeric"
                    placeholder="Ex: 1200"
                />

                <Text style={styles.rotulo}>URL da Imagem (opcional)</Text>
                <TextInput
                    style={styles.campo}
                    value={imagemUrl}
                    onChangeText={setImagemUrl}
                    placeholder="Ex: https://exemplo.com/imagem.jpg"
                />

                <Pressable style={styles.botao} onPress={criarLivro} disabled={enviando}>
                    <Text style={styles.botaoTexto}>
                        {enviando ? 'Enviando...' : 'Criar livro'}
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#06153104' },
    conteudo: { padding: 24, paddingBottom: 48, backgroundColor: '#99e6d9' },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: '800', color: '#061531' },
    subtitulo: { fontSize: 14, color: '#061531', marginTop: 2, fontWeight: '700' },
    rotulo: { fontSize: 13, fontWeight: '600', color: '#061531', marginBottom: 4 },
    campo: {
        borderWidth: 1,
        borderColor: '#ec9d0a',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    botao: {
        backgroundColor: '#061531',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    botaoTexto: { color: 'white', fontWeight: '700' },
});
