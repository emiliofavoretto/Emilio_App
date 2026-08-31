import { React, useState, useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import axios from "axios"
import { SafeAreaView } from "react-native-safe-area-context"

const API_KEY ="cv_hK7LxiDK1cmbhA9-wfiya2Ahe3H1UlRnhlurz3c7vky_tMI_zfcCpUlSyCee-8MH"

const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY
    }
})

export default function livrosListarScreen() {
    const [livros, setLivros] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    async function buscarLivros() {
        setCarregando(true)
        setErro(null)
        try {
            const resposta = await api.get("/api/livros", {
                params: { limit: 50 }
            })
            setLivros(resposta.data.data)
        } catch (error) {
            setErro("Não foi possivel carregar livros")
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarLivros()
    }, [])

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
                        <View key={livros.id} style={styles.card}>
                            <Image source={{ uri: livros.imageUrl }} height={64} width={64} style={styles.imagem} />
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{livros.title}</Text>
                                <Text style={styles.categoria}>
                                    {livros.autor} · {`${livros.paginas} páginas`}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#f8fbff" }, // ocupa a tela toda, cor de fundo clara
    conteudo: { padding: 24, paddingBottom: 48 }, // respiro nas bordas do conteúdo
    header: { marginBottom: 16 }, // espaço abaixo do cabeçalho
    tituloPagina: { fontSize: 24, fontWeight: "800", color: "#102542" }, // título grande e escuro
    subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 }, // texto menor e mais claro, abaixo do título

    erro: { color: "#c62828", marginTop: 12 }, // texto de erro em vermelho
    card: {
        flexDirection: "row", // imagem e texto lado a lado
        gap: 12, // espaço entre imagem e texto
        marginTop: 12, // espaço entre um card e outro
        backgroundColor: "white",
        borderRadius: 10, // cantos arredondados
        overflow: "hidden", // corta a imagem nos cantos arredondados do card
    },
    imagem: { width: 64, height: 64 }, // tamanho fixo da foto do herói
    info: { flex: 1, justifyContent: "center", paddingRight: 12 }, // ocupa o espaço que sobra ao lado da imagem
    titulo: { fontSize: 16, fontWeight: "700" }, // nome do herói em destaque
    categoria: { fontSize: 13, color: "#64748b" }, // categoria/ano em cinza, menor
});
