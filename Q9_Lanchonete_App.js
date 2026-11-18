// Questão 9 - Montagem de pedidos de lanchonete
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

// Cardápio: pelo menos quatro produtos com nome e preço
const PRODUTOS = [
  { id: 1, nome: 'Sanduíche', preco: 8.0 },
  { id: 2, nome: 'Suco', preco: 5.0 },
  { id: 3, nome: 'Salgado', preco: 6.0 },
  { id: 4, nome: 'Café', preco: 3.5 },
  { id: 5, nome: 'Refrigerante', preco: 4.5 },
];

function formatarReal(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

export default function App() {
  // Quantidade escolhida para cada produto antes de adicionar
  const [quantidades, setQuantidades] = useState({});
  // Itens do pedido: array de objetos { id, nome, preco, quantidade }
  const [pedido, setPedido] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  function alterarQuantidade(id, delta) {
    const atual = quantidades[id] || 0;
    const nova = Math.max(0, atual + delta);
    setQuantidades({ ...quantidades, [id]: nova });
  }

  function adicionarAoPedido(produto) {
    const qtd = quantidades[produto.id] || 0;
    if (qtd === 0) return;

    const existente = pedido.find((item) => item.id === produto.id);
    if (existente) {
      // Se já está no pedido, soma a quantidade
      setPedido(pedido.map((item) =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade + qtd } : item
      ));
    } else {
      setPedido([...pedido, { ...produto, quantidade: qtd }]);
    }
    setQuantidades({ ...quantidades, [produto.id]: 0 });
    setFinalizado(false);
  }

  function removerItem(id) {
    setPedido(pedido.filter((item) => item.id !== id));
    setFinalizado(false);
  }

  function novoPedido() {
    setPedido([]);
    setQuantidades({});
    setFinalizado(false);
  }

  const total = pedido.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Lanchonete Universitária</Text>

      <Text style={styles.subtitulo}>Cardápio</Text>
      {PRODUTOS.map((produto) => (
        <View key={produto.id} style={styles.produto}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.preco}>{formatarReal(produto.preco)}</Text>
          </View>

          {/* Seleção de quantidade */}
          <Pressable style={styles.botaoQtd} onPress={() => alterarQuantidade(produto.id, -1)}>
            <Text style={styles.textoQtd}>−</Text>
          </Pressable>
          <Text style={styles.qtd}>{quantidades[produto.id] || 0}</Text>
          <Pressable style={styles.botaoQtd} onPress={() => alterarQuantidade(produto.id, 1)}>
            <Text style={styles.textoQtd}>+</Text>
          </Pressable>

          <Pressable style={styles.botaoAdd} onPress={() => adicionarAoPedido(produto)}>
            <Text style={styles.textoBotao}>Adicionar</Text>
          </Pressable>
        </View>
      ))}

      <Text style={styles.subtitulo}>Pedido</Text>
      {pedido.length === 0 && <Text style={styles.vazio}>Nenhum item no pedido.</Text>}

      {pedido.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={{ flex: 1 }}>
            {item.quantidade}x {item.nome} — subtotal {formatarReal(item.preco * item.quantidade)}
          </Text>
          <Pressable style={styles.botaoRemover} onPress={() => removerItem(item.id)}>
            <Text style={styles.textoBotao}>Remover</Text>
          </Pressable>
        </View>
      ))}

      <Text style={styles.total}>Total: {formatarReal(total)}</Text>

      <Pressable
        style={[styles.botaoFinalizar, pedido.length === 0 && { opacity: 0.5 }]}
        disabled={pedido.length === 0}
        onPress={() => setFinalizado(true)}
      >
        <Text style={styles.textoBotao}>Finalizar pedido</Text>
      </Pressable>

      {/* Resumo final */}
      {finalizado && (
        <View style={styles.resumo}>
          <Text style={styles.subtitulo}>Resumo do pedido</Text>
          {pedido.map((item) => (
            <Text key={item.id}>
              {item.quantidade}x {item.nome} ({formatarReal(item.preco)}) = {formatarReal(item.preco * item.quantidade)}
            </Text>
          ))}
          <Text style={styles.total}>Total a pagar: {formatarReal(total)}</Text>
          <Pressable style={styles.botaoNovo} onPress={novoPedido}>
            <Text style={styles.textoBotao}>Novo pedido</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  produto: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 },
  nome: { fontSize: 16, fontWeight: 'bold' },
  preco: { color: '#555' },
  botaoQtd: { backgroundColor: '#FFC107', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  textoQtd: { fontSize: 18, fontWeight: 'bold' },
  qtd: { width: 30, textAlign: 'center', fontSize: 16 },
  botaoAdd: { backgroundColor: '#4CAF50', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 6, marginLeft: 8 },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
  vazio: { color: '#777' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF8E1', borderRadius: 8, padding: 10, marginBottom: 6 },
  botaoRemover: { backgroundColor: '#E53935', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  total: { fontSize: 20, fontWeight: 'bold', marginTop: 12 },
  botaoFinalizar: { backgroundColor: '#3F51B5', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  resumo: { marginTop: 16, padding: 14, borderRadius: 10, backgroundColor: '#E8EAF6' },
  botaoNovo: { backgroundColor: '#757575', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 12 },
});
