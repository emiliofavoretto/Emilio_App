import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_yfAetsgLi9GPs488jiq-dBnVXXc0Dt9Ji9KWnFnmj0Sk840t4JDxPEIM1-l9HOLl";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function LivrosListaScreen() {
  const [id, setId] = useState("");
  const [livro, setLivro] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  async function buscarPorId() {
    const idLimpo = id.trim();

    if (!idLimpo) {
      setErro("Digite um ID válido para buscar.");
      return;
    }

    Keyboard.dismiss();
    setBuscando(true);
    setErro(null);
    setNaoEncontrado(false);
    setLivro(null);

    try {
      const resposta = await api.get(`/api/livros/${idLimpo}`);
      setLivro(resposta.data?.data || resposta.data);
    } catch (e) {
      console.log("Erro na busca por ID:", e.response?.status, e.response?.data || e.message);

      if (e.response && e.response.status === 404) {
        setNaoEncontrado(true);
      } else {
        setErro("Não foi possível buscar o livro. Tenta de novo em instantes.");
      }
    } finally {
      setBuscando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Buscar livro</Text>
          <Text style={styles.subtitulo}>GET /api/livros/:id</Text>
        </View>

        <Text style={styles.rotulo}>ID do livro</Text>
        <View style={styles.linhaBusca}>
          <TextInput
            style={styles.campo}
            value={id}
            onChangeText={setId}
            placeholder="Ex: 1"
          />
          <Pressable style={styles.botao} onPress={buscarPorId} disabled={buscando}>
            <Text style={styles.botaoTexto}>{buscando ? "..." : "Buscar"}</Text>
          </Pressable>
        </View>

        {buscando && <ActivityIndicator style={{ marginVertical: 16 }} size="large" />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        {naoEncontrado && (
          <Text style={styles.avisoNaoEncontrado}>
            Nenhum livro encontrado com o ID "{id}".
          </Text>
        )}

        {livro && (
          <View style={styles.card}>
            <Image source={{ uri: livro.imageUrl }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.titulo}>{livro.title}</Text>
              <Text style={styles.categoria}>
                {livro.autor}
              </Text>
              <Text style={styles.fraqueza}>Páginas: {livro.paginas}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#99e6d9" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#061531" },
  subtitulo: { fontSize: 14, color: "#061531", marginTop: 2 },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#061531", marginBottom: 4 },
  linhaBusca: { flexDirection: "row", gap: 8, alignItems: "center" },
  campo: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#ec9d0a",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#061531",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700", fontSize: 15 },

  erro: { color: "#c62828", marginTop: 12 },
  avisoNaoEncontrado: { color: "#9a6700", marginTop: 16, fontStyle: "italic" },

  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ec9d0a",
  },
  imagem: { width: 88, height: 88, borderRadius: 6 },
  info: { flex: 1, justifyContent: "center", gap: 4 },
  titulo: { fontSize: 17, fontWeight: "700", color: "#102542" },
  categoria: { fontSize: 13, color: "#64748b" },
  fraqueza: { fontSize: 13, color: "#64748b" },
});