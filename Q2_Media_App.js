// Questão 2 - Média aritmética de três notas e situação do aluno
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  function converter(texto) {
    return parseFloat(texto.replace(',', '.'));
  }

  function calcularMedia() {
    setResultado('');
    setErro('');

    if (nome.trim() === '') {
      setErro('Informe o nome do estudante.');
      return;
    }

    const notas = [converter(nota1), converter(nota2), converter(nota3)];

    // Valida se todas as notas são números entre 0 e 10
    for (let n of notas) {
      if (isNaN(n) || n < 0 || n > 10) {
        setErro('As notas devem estar entre 0 e 10.');
        return;
      }
    }

    const media = (notas[0] + notas[1] + notas[2]) / 3;
    const situacao = media >= 7 ? 'Aprovado' : 'Reprovado';

    setResultado(
      `${nome}\nMédia: ${media.toFixed(1).replace('.', ',')}\nSituação: ${situacao}`
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cálculo de Média</Text>

      <TextInput style={styles.input} placeholder="Nome do estudante" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Nota 1" keyboardType="numeric" value={nota1} onChangeText={setNota1} />
      <TextInput style={styles.input} placeholder="Nota 2" keyboardType="numeric" value={nota2} onChangeText={setNota2} />
      <TextInput style={styles.input} placeholder="Nota 3" keyboardType="numeric" value={nota3} onChangeText={setNota3} />

      <TouchableOpacity style={styles.botao} onPress={calcularMedia}>
        <Text style={styles.textoBotao}>Calcular média</Text>
      </TouchableOpacity>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
      {resultado !== '' && <Text style={styles.resultado}>{resultado}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12 },
  botao: { backgroundColor: '#4CAF50', padding: 14, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  erro: { color: 'red', marginTop: 16, textAlign: 'center' },
  resultado: { fontSize: 18, marginTop: 16, textAlign: 'center' },
});
