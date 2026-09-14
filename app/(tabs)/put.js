import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
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

export default function LivrosEditarScreen() {
  const [salvando, setSalvando] = useState(false);
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // null = mostra a lista; objeto = mostra o formulário de edição
  const [selecionado, setSelecionado] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [paginas, setPaginas] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  async function buscarLivros() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/livros", {
        params: { limit: 50 },
      });
      setLivros(resposta.data.data);
    } catch (e) {
      setErro("Não foi possível carregar os livros. Tenta de novo em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarLivros();
  }, []);

  function selecionarLivro(livro) {
    setSelecionado(livro);
    setTitulo(livro.title ?? "");
    setAutor(livro.autor ?? "");
    setPaginas(livro.paginas ? String(livro.paginas) : "");
    setImagemUrl(livro.imageUrl ?? "");
  }

  async function salvarEdicao() {
    if (!selecionado) return;
    if (!titulo) {
      Alert.alert("Atenção", "Preencha pelo menos o título do livro.");
      return;
    }

    setSalvando(true);
    try {
      // Rota corrigida para /api/livros/:id e enviando os campos corretos da API
      const resposta = await api.put(`/api/livros/${selecionado.id}`, {
        title: titulo,
        autor: autor,
        paginas: Number(paginas) || 0,
        imageUrl: imagemUrl,
      });

      Alert.alert("Sucesso!", "Livro atualizado com sucesso!");

      setSelecionado(null);
      buscarLivros(); // recarrega a lista com o dado novo
    } catch (e) {
      Alert.alert(
        "Erro ao atualizar",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Editar Livro</Text>
          <Text style={styles.subtitulo}>PUT /api/livros/:id</Text>
        </View>

        {!selecionado && (
          <>
            <Text style={styles.instrucao}>Toque em um livro para editar:</Text>

            {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
            {erro && <Text style={styles.erro}>{erro}</Text>}

            {!carregando &&
              livros.map((item) => (
                <Pressable key={item.id} style={styles.linha} onPress={() => selecionarLivro(item)}>
                  <Text style={styles.linhaTitulo}>{item.title}</Text>
                  <Text style={styles.linhaSeta}>editar ›</Text>
                </Pressable>
              ))}
          </>
        )}

        {selecionado && (
          <>
            <Pressable onPress={() => setSelecionado(null)} style={styles.voltar}>
              <Text style={styles.voltarTexto}>‹ voltar pra lista</Text>
            </Pressable>

            <Text style={styles.rotulo}>Título</Text>
            <TextInput
              style={styles.campo}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Ex: O Senhor dos Anéis"
            />

            <Text style={styles.rotulo}>Autor</Text>
            <TextInput
              style={styles.campo}
              value={autor}
              onChangeText={setAutor}
              placeholder="Ex: J.R.R. Tolkien"
            />

            <Text style={styles.rotulo}>Páginas</Text>
            <TextInput
              style={styles.campo}
              value={paginas}
              onChangeText={setPaginas}
              keyboardType="numeric"
              placeholder="Ex: 400"
            />

            <Text style={styles.rotulo}>URL da imagem</Text>
            <TextInput
              style={styles.campo}
              value={imagemUrl}
              onChangeText={setImagemUrl}
              placeholder="Ex: https://exemplo.com/capa.jpg"
            />

            <Pressable style={styles.botao} onPress={salvarEdicao} disabled={salvando}>
              <Text style={styles.botaoTexto}>{salvando ? "Salvando..." : "Salvar alterações"}</Text>
            </Pressable>
          </>
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

  instrucao: { fontSize: 14, color: "#061531", marginBottom: 8 },
  erro: { color: "#c62828", marginTop: 12 },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 8,
  },
  linhaTitulo: { fontSize: 15, fontWeight: "700", color: "#061531" },
  linhaSeta: { fontSize: 13, color: "#061531", fontWeight: "600" },

  voltar: { marginBottom: 16 },
  voltarTexto: { color: "#1565c0", fontWeight: "700" },

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
    marginTop: 4,
  },
  botaoTexto: { color: "white", fontWeight: "700" },
});