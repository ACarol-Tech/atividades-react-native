// Questão 1 - Estimativa de consumo diário de água (35 mL por kg)
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Keyboard, TouchableWithoutFeedback,
} from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  function calcular() {
    Keyboard.dismiss(); // fecha o teclado ao calcular
    setResultado('');
    setErro('');

    // Validação de campo vazio
    if (peso.trim() === '') {
      setErro('Informe o peso.');
      return;
    }

    const valor = parseFloat(peso.replace(',', '.'));

    // Validação de valor inválido, negativo ou zero
    if (isNaN(valor) || valor <= 0) {
      setErro('O peso deve ser um número maior que zero.');
      return;
    }

    const litros = (valor * 35) / 1000; // mL -> L
    setResultado(`${litros.toFixed(2).replace('.', ',')} litros por dia`);
  }

  return (
    // Tocar fora do campo fecha o teclado
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Consumo Diário de Água</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          returnKeyType="done"          // botão "OK/Concluído" no teclado
          onSubmitEditing={calcular}    // ao apertar OK, calcula e fecha o teclado
          value={peso}
          onChangeText={setPeso}
        />

        <TouchableOpacity style={styles.botao} onPress={calcular}>
          <Text style={styles.textoBotao}>Calcular</Text>
        </TouchableOpacity>

        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
        {resultado !== '' && <Text style={styles.resultado}>{resultado}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12 },
  botao: { backgroundColor: '#2196F3', padding: 14, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  erro: { color: 'red', marginTop: 16, textAlign: 'center' },
  resultado: { fontSize: 20, marginTop: 16, textAlign: 'center', color: '#0D47A1' },
});
