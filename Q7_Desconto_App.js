// Questão 7 - Cálculo de preço final com desconto percentual
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

function formatarReal(valor) {
  const texto = valor.toFixed(2).replace('.', ',');
  return 'R$ ' + texto.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function App() {
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [desconto, setDesconto] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  function aplicarDesconto() {
    setResultado(null);
    setErro('');

    if (produto.trim() === '') {
      setErro('Informe o nome do produto.');
      return;
    }

    const valorPreco = parseFloat(preco.replace(',', '.'));
    const valorDesconto = parseFloat(desconto.replace(',', '.'));

    // Preço não pode ser negativo
    if (preco.trim() === '' || isNaN(valorPreco) || valorPreco < 0) {
      setErro('O preço deve ser um número não negativo.');
      return;
    }
    // Desconto entre 0% e 100%
    if (desconto.trim() === '' || isNaN(valorDesconto) || valorDesconto < 0 || valorDesconto > 100) {
      setErro('O desconto deve estar entre 0% e 100%.');
      return;
    }

    const economia = valorPreco * (valorDesconto / 100);
    const precoFinal = valorPreco - economia;
    setResultado({ economia, precoFinal });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de Desconto</Text>

      <TextInput style={styles.input} placeholder="Nome do produto" value={produto} onChangeText={setProduto} />
      <TextInput style={styles.input} placeholder="Preço original (R$)" keyboardType="numeric" value={preco} onChangeText={setPreco} />
      <TextInput style={styles.input} placeholder="Desconto (%)" keyboardType="numeric" value={desconto} onChangeText={setDesconto} />

      <Pressable style={styles.botao} onPress={aplicarDesconto}>
        <Text style={styles.textoBotao}>Aplicar desconto</Text>
      </Pressable>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {resultado && (
        <View style={styles.caixa}>
          <Text style={styles.nomeProduto}>{produto}</Text>
          <Text style={styles.linhaResultado}>Economia: {formatarReal(resultado.economia)}</Text>
          <Text style={styles.precoFinal}>Preço final: {formatarReal(resultado.precoFinal)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12 },
  botao: { backgroundColor: '#FF5722', padding: 14, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  erro: { color: 'red', marginTop: 16, textAlign: 'center' },
  caixa: { marginTop: 20, padding: 16, borderRadius: 10, backgroundColor: '#FBE9E7', alignItems: 'center' },
  nomeProduto: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  linhaResultado: { fontSize: 16, color: '#2E7D32' },
  precoFinal: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
});
