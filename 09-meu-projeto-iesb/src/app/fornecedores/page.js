'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FornecedoresPage() {

  const [fornecedores, setFornecedores] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const fornecedoresLocalStorage = JSON.parse(localStorage.getItem('fornecedores')) || []
    // guarda a lista no estado fornecedores
    setFornecedores(fornecedoresLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(fornecedor) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o fornecedor ${fornecedor.nomeEmpresa}?`)) {
      // Filtra a lista antiga removendo o fornecedor recebido
      const novaLista = fornecedores.filter(item => item.id !== fornecedor.id)
      // Grava no localStorage a nova lista
      localStorage.setItem('fornecedores', JSON.stringify(novaLista))
      // Atualiza a lista no estado para renderizar na tela
      setFornecedores(novaLista)
      alert("Fornecedor excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Fornecedores"}>
      <div className='text-end mb-2'>
        <Button href='/fornecedores/form'><FaPlusCircle /> Novo Fornecedor</Button>
      </div>

      {/* Tabela com os Fornecedores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome da Empresa</th>
            <th>CNPJ</th>
            <th>Nome do Representante</th>
            <th>E-mail de Contato</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Tipo de Produto/Serviço</th>
            <th>Condições de Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => {
            const endereco = `${fornecedor.endereco.rua}, ${fornecedor.endereco.numero}, ${fornecedor.endereco.bairro}, ${fornecedor.endereco.cidade} - ${fornecedor.endereco.estado}`;
            return (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nomeEmpresa}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.nomeRepresentante}</td>
                <td>{fornecedor.emailContato}</td>
                <td>{fornecedor.telefone}</td>
                <td>{endereco}</td>
                <td>{fornecedor.tipoProdutoServico}</td>
                <td>{fornecedor.condicoesPagamento}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/fornecedores/form?id=${fornecedor.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(fornecedor)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
