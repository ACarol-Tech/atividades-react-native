// Questão 4 - Conversor de temperatura Celsius <-> Fahrenheit
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [valor, setValor] = useState('');
  const [sentido, setSentido] = useState('CtoF'); // 'CtoF' ou 'FtoC'
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  function converter() {
    setResultado('');
    setErro('');

    const temp = parseFloat(valor.replace(',', '.'));
    if (valor.trim() === '' || isNaN(temp)) {
      setErro('Digite uma temperatura válida.');
      return;
    }

    if (sentido === 'CtoF') {
      const f = temp * 9 / 5 + 32;           // F = (C × 9/5) + 32
      setResultado(`${temp} °C → ${f.toFixed(1)} °F`);
    } else {
      const c = (temp - 32) * 5 / 9;         // C = (F − 32) × 5/9
      setResultado(`${temp} °F → ${c.toFixed(1)} °C`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Conversor de Temperatura</Text>

      <TextInput
        style={styles.input}
        placeholder="Temperatura"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      {/* Seleção do sentido da conversão */}
      <View style={styles.linha}>
        <TouchableOpacity
          style={[styles.opcao, sentido === 'CtoF' && styles.opcaoAtiva]}
          onPress={() => setSentido('CtoF')}
        >
          <Text style={[styles.textoOpcao, sentido === 'CtoF' && styles.textoAtivo]}>°C → °F</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.opcao, sentido === 'FtoC' && styles.opcaoAtiva]}
          onPress={() => setSentido('FtoC')}
        >
          <Text style={[styles.textoOpcao, sentido === 'FtoC' && styles.textoAtivo]}>°F → °C</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botao} onPress={converter}>
        <Text style={styles.textoBotao}>Converter</Text>
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
  linha: { flexDirection: 'row', marginBottom: 12 },
  opcao: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#FF9800', borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  opcaoAtiva: { backgroundColor: '#FF9800' },
  textoOpcao: { fontSize: 16, color: '#FF9800', fontWeight: 'bold' },
  textoAtivo: { color: '#fff' },
  botao: { backgroundColor: '#E65100', padding: 14, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  erro: { color: 'red', marginTop: 16, textAlign: 'center' },
  resultado: { fontSize: 22, marginTop: 16, textAlign: 'center' },
});
