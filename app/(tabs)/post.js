import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";


const API_KEY = "cv_hK7LxiDK1cmbhA9-wfiya2Ahe3H1UlRnhlurz3c7vky_tMI_zfcCpUlSyCee-8MH";


const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY,
    },
});


export default function HeroisCriarScreen() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagemUrl, setImagemUrl] = useState("");
    const [autor, setAutor] = useState("");
    const [paginas, setPaginas] = useState("");
    const [genero, setGenero] = useState("");

    const [enviando, setEnviando] = useState(false);

    async function criarLivro() {
        if (!titulo) {
            Alert.alert("Preencha pelo menos o título.");
            return;
        }

        setEnviando(true);
        try {
            const resposta = await api.post("/api/livros", {
                title: titulo,
                description: descricao,
                imageUrl: imagemUrl,
                autor: autor,
                paginas: paginas,
                genero: genero,
            });

            Alert.alert("Herói criado!", resposta.data.title);
            setTitulo("");
            setDescricao("");
            setImagemUrl("");
            setAutor("");
            setPaginas("");
            setGenero("");

            console.log("Erro API:", e.response?.data || e.message);

        } catch (e) {
            Alert.alert(
                "Não deu pra criar o livro",
                "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Criar livro</Text>
                    <Text style={styles.subtitulo}>POST /api/livro</Text>
                </View>

                <Text style={styles.rotulo}>Título</Text>
                <TextInput
                    style={styles.campo}
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholder="Ex: Senhor dos Aneis"
                />

                <Text style={styles.rotulo}>Descrição</Text>
                <TextInput
                    style={styles.campo}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Ex: livro"
                />

                <Text style={styles.rotulo}>URL da imagem</Text>
                <TextInput
                    style={styles.campo}
                    value={imagemUrl}
                    onChangeText={setImagemUrl}
                    placeholder="Ex: https://exemplo.com/senhor-dos-aneis.jpg"
                />

                <Text style={styles.secao}>Campos específicos do tema livro</Text>

                <Text style={styles.rotulo}>Autor</Text>
                <TextInput
                    style={styles.campo}
                    value={autor}
                    onChangeText={setAutor}
                    placeholder="Ex: J.R.R. Tolkien"
                />

                <Text style={styles.rotulo}>paginas</Text>
                <TextInput
                    style={styles.campo}
                    value={paginas}
                    onChangeText={setPaginas}
                    placeholder="Ex: 100"
                />

                <Text style={styles.rotulo}>Genero</Text>
                <TextInput
                    style={styles.campo}
                    value={genero}
                    onChangeText={setGenero}
                    placeholder="Ex: Fantasia"
                />

                <Pressable style={styles.botao} onPress={criarLivro} disabled={enviando}>
                    <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar livro"}</Text>
                </Pressable>
            </ScrollView>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#06153104" },
    conteudo: { padding: 24, paddingBottom: 48, backgroundColor: "#99e6d9" },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: "800", color: "#061531" },
    subtitulo: { fontSize: 14, color: "#061531", marginTop: 2,fontWeight: "700", },
    secao: {
        fontSize: 14,
        fontWeight: "700",
        color: "#102542",
        marginTop: 8,
        marginBottom: 8,
    },

    rotulo: { fontSize: 13, fontWeight: "600", color: "#061531", marginBottom: 4 },
    campo: {
        borderWidth: 1,
        borderColor: "#ec9d0a",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        backgroundColor: "white",
    },
    botao: {
        backgroundColor: "#061531",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    botaoTexto: { color: "white", fontWeight: "700" },
});