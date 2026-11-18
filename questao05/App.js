// Questão 5 - Simulador de conta bancária (saldo inicial R$ 1.000,00)
import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet,
  Keyboard, TouchableWithoutFeedback,
} from 'react-native';

// Formata número no padrão brasileiro: 1050 -> "R$ 1.050,00"
function formatarReal(valor) {
  const texto = valor.toFixed(2).replace('.', ',');
  return 'R$ ' + texto.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function App() {
  const [saldo, setSaldo] = useState(1000);
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  // Lê o valor digitado e valida (não aceita vazio, zero ou negativo)
  function lerValor() {
    const numero = parseFloat(valor.replace(',', '.'));
    if (valor.trim() === '' || isNaN(numero) || numero <= 0) {
      setErro(true);
      setMensagem('Informe um valor positivo.');
      return null;
    }
    return numero;
  }

  function depositar() {
    Keyboard.dismiss(); // fecha o teclado ao depositar
    const numero = lerValor();
    if (numero === null) return;
    setSaldo(saldo + numero);
    setErro(false);
    setMensagem(`Depósito de ${formatarReal(numero)} realizado.`);
    setValor('');
  }

  function sacar() {
    Keyboard.dismiss(); // fecha o teclado ao sacar
    const numero = lerValor();
    if (numero === null) return;

    // Bloqueia saque maior que o saldo
    if (numero > saldo) {
      setErro(true);
      setMensagem('Saldo insuficiente para este saque.');
      return;
    }
    setSaldo(saldo - numero);
    setErro(false);
    setMensagem(`Saque de ${formatarReal(numero)} realizado.`);
    setValor('');
  }

  return (
    // Tocar fora do campo fecha o teclado
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Simulador Bancário</Text>

        <View style={styles.cartaoSaldo}>
          <Text style={styles.rotulo}>Saldo atual</Text>
          <Text style={styles.saldo}>{formatarReal(saldo)}</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Valor (R$)"
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss} // fecha o teclado; depois escolha Depositar ou Sacar
          value={valor}
          onChangeText={setValor}
        />

        <View style={styles.linha}>
          <Pressable style={[styles.botao, { backgroundColor: '#4CAF50' }]} onPress={depositar}>
            <Text style={styles.textoBotao}>Depositar</Text>
          </Pressable>
          <Pressable style={[styles.botao, { backgroundColor: '#F44336' }]} onPress={sacar}>
            <Text style={styles.textoBotao}>Sacar</Text>
          </Pressable>
        </View>

        {mensagem !== '' && (
          <Text style={[styles.mensagem, { color: erro ? 'red' : 'green' }]}>{mensagem}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  cartaoSaldo: { backgroundColor: '#0D47A1', borderRadius: 12, padding: 20, marginBottom: 20, alignItems: 'center' },
  rotulo: { color: '#BBDEFB', fontSize: 14 },
  saldo: { color: '#fff', fontSize: 30, fontWeight: 'bold', marginTop: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12 },
  linha: { flexDirection: 'row' },
  botao: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  mensagem: { marginTop: 16, textAlign: 'center', fontSize: 15 },
});
