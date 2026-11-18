// Questão 6 - Votação para três candidatos fictícios
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CANDIDATOS = ['Ana Souza', 'Bruno Lima', 'Carla Mendes'];

export default function App() {
  const [votos, setVotos] = useState([0, 0, 0]);

  function votar(indice) {
    const novos = [...votos];
    novos[indice] = novos[indice] + 1;
    setVotos(novos);
  }

  function zerar() {
    setVotos([0, 0, 0]);
  }

  const total = votos[0] + votos[1] + votos[2];

  // Descobre o(s) mais votado(s)
  function resultadoLideranca() {
    if (total === 0) return 'Nenhum voto registrado.';

    const maior = Math.max(...votos);
    const lideres = CANDIDATOS.filter((nome, i) => votos[i] === maior);

    if (lideres.length > 1) {
      return `Empate na liderança: ${lideres.join(' e ')} (${maior} votos)`;
    }
    return `Mais votado: ${lideres[0]} (${maior} votos)`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Eleição Estudantil</Text>

      {CANDIDATOS.map((nome, i) => (
        <View key={i} style={styles.card}>
          <View>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.votos}>{votos[i]} voto(s)</Text>
          </View>
          <Pressable style={styles.botao} onPress={() => votar(i)}>
            <Text style={styles.textoBotao}>Votar</Text>
          </Pressable>
        </View>
      ))}

      <Text style={styles.total}>Total geral: {total} voto(s)</Text>
      <Text style={styles.lider}>{resultadoLideranca()}</Text>

      <Pressable style={styles.botaoZerar} onPress={zerar}>
        <Text style={styles.textoBotao}>Zerar votação</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 10,
  },
  nome: { fontSize: 18, fontWeight: 'bold' },
  votos: { fontSize: 15, color: '#555', marginTop: 2 },
  botao: { backgroundColor: '#673AB7', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8 },
  botaoZerar: { backgroundColor: '#757575', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  textoBotao: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  total: { fontSize: 17, textAlign: 'center', marginTop: 12 },
  lider: { fontSize: 17, textAlign: 'center', marginTop: 8, fontWeight: 'bold', color: '#4527A0' },
});
