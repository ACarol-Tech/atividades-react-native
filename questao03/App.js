// Questão 3 - Controle de estoque de um produto
import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  Keyboard, TouchableWithoutFeedback,
} from 'react-native';

export default function App() {
  const [produto, setProduto] = useState('');
  const [quantidadeInicial, setQuantidadeInicial] = useState('');
  const [movimentacao, setMovimentacao] = useState('');
  const [estoque, setEstoque] = useState(null); // null = estoque ainda não definido
  const [mensagem, setMensagem] = useState('');

  // Referências para pular de um campo para o outro
  const refInicial = useRef(null);
  const refMovimentacao = useRef(null);

  function lerInteiro(texto) {
    const n = Number(texto);
    return Number.isInteger(n) ? n : NaN;
  }

  // Usa a quantidade atual; se ainda não houver, usa a quantidade inicial
  function obterEstoqueAtual() {
    if (estoque !== null) return estoque;
    const inicial = lerInteiro(quantidadeInicial);
    if (quantidadeInicial.trim() === '' || isNaN(inicial) || inicial < 0) {
      Alert.alert('Erro', 'Informe uma quantidade inicial válida (inteiro ≥ 0).');
      return null;
    }
    return inicial;
  }

  function validarMovimentacao() {
    const qtd = lerInteiro(movimentacao);
    if (movimentacao.trim() === '' || isNaN(qtd) || qtd <= 0) {
      Alert.alert('Erro', 'Informe uma movimentação válida (inteiro > 0).');
      return null;
    }
    return qtd;
  }

  function verificarEstoqueBaixo(novo) {
    if (novo < 5) {
      Alert.alert('Atenção', `Estoque baixo! Restam apenas ${novo} unidade(s).`);
    }
  }

  function adicionar() {
    Keyboard.dismiss(); // fecha o teclado ao tocar no botão
    if (produto.trim() === '') return Alert.alert('Erro', 'Informe o nome do produto.');
    const atual = obterEstoqueAtual();
    if (atual === null) return;
    const qtd = validarMovimentacao();
    if (qtd === null) return;

    const novo = atual + qtd;
    setEstoque(novo);
    setMensagem(`${atual} unidades + ${qtd} unidades → ${novo} unidades`);
    setMovimentacao('');
    verificarEstoqueBaixo(novo);
  }

  function retirar() {
    Keyboard.dismiss(); // fecha o teclado ao tocar no botão
    if (produto.trim() === '') return Alert.alert('Erro', 'Informe o nome do produto.');
    const atual = obterEstoqueAtual();
    if (atual === null) return;
    const qtd = validarMovimentacao();
    if (qtd === null) return;

    // Impede retirada maior que o disponível
    if (qtd > atual) {
      Alert.alert('Erro', `Retirada maior que o disponível (${atual} unidades).`);
      return;
    }

    const novo = atual - qtd;
    setEstoque(novo);
    setMensagem(`${atual} unidades − ${qtd} unidades → ${novo} unidades`);
    setMovimentacao('');
    verificarEstoqueBaixo(novo);
  }

  return (
    // Tocar fora dos campos fecha o teclado
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Controle de Estoque</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={produto}
          onChangeText={setProduto}
          returnKeyType="next"
          // Se a quantidade inicial já foi travada, pula direto para a movimentação
          onSubmitEditing={() =>
            estoque === null ? refInicial.current.focus() : refMovimentacao.current.focus()
          }
        />
        <TextInput
          ref={refInicial}
          style={styles.input}
          placeholder="Quantidade inicial"
          keyboardType="numeric"
          value={quantidadeInicial}
          onChangeText={setQuantidadeInicial}
          editable={estoque === null} // só pode alterar antes da primeira movimentação
          returnKeyType="next"
          onSubmitEditing={() => refMovimentacao.current.focus()}
        />
        <TextInput
          ref={refMovimentacao}
          style={styles.input}
          placeholder="Movimentação (quantidade)"
          keyboardType="numeric"
          value={movimentacao}
          onChangeText={setMovimentacao}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss} // fecha o teclado; depois escolha Adicionar ou Retirar
        />

        <View style={styles.linha}>
          <TouchableOpacity style={[styles.botao, { backgroundColor: '#4CAF50' }]} onPress={adicionar}>
            <Text style={styles.textoBotao}>Adicionar estoque</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botao, { backgroundColor: '#F44336' }]} onPress={retirar}>
            <Text style={styles.textoBotao}>Retirar estoque</Text>
          </TouchableOpacity>
        </View>

        {estoque !== null && (
          <View style={styles.caixa}>
            <Text style={styles.resultado}>{produto}: {estoque} unidades</Text>
            <Text style={styles.detalhe}>{mensagem}</Text>
            {estoque < 5 && <Text style={styles.alerta}>⚠ Estoque abaixo de 5 unidades!</Text>}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12 },
  linha: { flexDirection: 'row', justifyContent: 'space-between' },
  botao: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  textoBotao: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  caixa: { marginTop: 20, alignItems: 'center' },
  resultado: { fontSize: 20, fontWeight: 'bold' },
  detalhe: { fontSize: 15, marginTop: 6, color: '#555' },
  alerta: { color: '#E65100', marginTop: 8, fontWeight: 'bold' },
});
