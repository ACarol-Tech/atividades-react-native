// Questão 8 - Cadastro e consulta de estudantes em cards
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [estudantes, setEstudantes] = useState([]); // array de objetos
  const [erro, setErro] = useState('');

  function cadastrar() {
    setErro('');

    // Valida campos obrigatórios
    if (!nome.trim() || !matricula.trim() || !email.trim() || !curso.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (!email.includes('@')) {
      setErro('Informe um e-mail válido.');
      return;
    }
    // Impede matrícula duplicada
    const existe = estudantes.some((e) => e.matricula === matricula.trim());
    if (existe) {
      setErro('Já existe um estudante com essa matrícula.');
      return;
    }

    // Cria o objeto e adiciona ao array
    const novoEstudante = {
      nome: nome.trim(),
      matricula: matricula.trim(),
      email: email.trim(),
      curso: curso.trim(),
    };
    setEstudantes([...estudantes, novoEstudante]);

    setNome('');
    setMatricula('');
    setEmail('');
    setCurso('');
  }

  function remover(matriculaRemover) {
    setEstudantes(estudantes.filter((e) => e.matricula !== matriculaRemover));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Estudantes</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Matrícula" keyboardType="numeric" value={matricula} onChangeText={setMatricula} />
      <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Curso" value={curso} onChangeText={setCurso} />

      <Pressable style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </Pressable>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <Text style={styles.subtitulo}>Estudantes cadastrados ({estudantes.length})</Text>

      {estudantes.length === 0 && <Text style={styles.vazio}>Nenhum estudante cadastrado.</Text>}

      {/* Exibe os cards com map() */}
      {estudantes.map((estudante) => (
        <View key={estudante.matricula} style={styles.card}>
          <Text style={styles.cardNome}>{estudante.nome}</Text>
          <Text>Matrícula: {estudante.matricula}</Text>
          <Text>E-mail: {estudante.email}</Text>
          <Text>Curso: {estudante.curso}</Text>
          <Pressable style={styles.botaoRemover} onPress={() => remover(estudante.matricula)}>
            <Text style={styles.textoBotao}>Remover</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12 },
  botao: { backgroundColor: '#009688', padding: 14, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  erro: { color: 'red', marginTop: 12, textAlign: 'center' },
  vazio: { color: '#777', textAlign: 'center' },
  card: { backgroundColor: '#E0F2F1', borderRadius: 10, padding: 14, marginBottom: 10 },
  cardNome: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  botaoRemover: { backgroundColor: '#E53935', padding: 8, borderRadius: 6, alignItems: 'center', marginTop: 10 },
});
