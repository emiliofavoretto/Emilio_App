import { useEffect, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_KEY = 'cv_hK7LxiDK1cmbhA9-wfiya2Ahe3H1UlRnhlurz3c7vky_tMI_zfcCpUlSyCee-8MH';

const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

export default function DeleteScreen() {
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [excluindoId, setExcluindoId] = useState(null);
    const [erro, setErro] = useState(null);

    async function buscarLivros() {
        setCarregando(true);
        setErro(null);
        try {
            const resposta = await api.get('/api/livros');
            const lista = Array.isArray(resposta.data)
                ? resposta.data
                : resposta.data.data || resposta.data.livros || [];
            setLivros(lista);
        } catch (e) {
            setErro('Não foi possível carregar os livros. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarLivros();
    }, []);

    function confirmarExclusao(id, titulo) {
        Alert.alert('Confirmar Exclusão', `Tem certeza que deseja apagar o livro "${titulo}"?`, [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: () => deletarLivro(id) },
        ]);
    }

    async function deletarLivro(id) {
        setExcluindoId(id);
        try {
            await api.delete(`/api/livros/${id}`);
            Alert.alert('Sucesso', 'Livro apagado com sucesso!');
            buscarLivros(); 
        } catch (e) {
            console.log('Erro DELETE:', e.response?.data || e.message);
            Alert.alert('Erro', 'Não foi possível apagar o livro.');
        } finally {
            setExcluindoId(null);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Deletar Livros</Text>
                    <Text style={styles.subtitulo}>DELETE /api/livros/:id</Text>
                </View>

                <Text style={styles.instrucao}>Toque no botão para apagar um livro:</Text>

                {carregando && (
                    <ActivityIndicator
                        size="large"
                        color="#9f1239"
                        style={{ marginVertical: 20 }}
                    />
                )}
                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando && livros.length === 0 && (
                    <Text style={styles.vazio}>Nenhum livro encontrado.</Text>
                )}

                {!carregando &&
                    livros.map((item) => (
                        <View key={item.id} style={styles.linha}>
                            <Text style={styles.linhaTitulo}>{item.title}</Text>
                            <Pressable
                                style={styles.botaoDeletar}
                                onPress={() => confirmarExclusao(item.id, item.title)}
                                disabled={excluindoId === item.id}>
                                <Text style={styles.botaoDeletarTexto}>
                                    {excluindoId === item.id ? 'Apagando...' : 'Apagar'}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff5f5' },
    conteudo: { padding: 24, paddingBottom: 48 },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: '800', color: '#881337' },
    subtitulo: { fontSize: 14, color: '#9f1239', marginTop: 2 },
    instrucao: { fontSize: 14, color: '#4c0519', marginBottom: 12 },
    erro: { color: '#c62828', marginVertical: 12 },
    vazio: { textAlign: 'center', color: '#881337', marginTop: 20 },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fecdd3',
    },
    linhaTitulo: { fontSize: 15, fontWeight: '700', color: '#102542', flex: 1, marginRight: 8 },
    botaoDeletar: {
        backgroundColor: '#e11d48',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    botaoDeletarTexto: { color: 'white', fontWeight: '700', fontSize: 12 },
});
