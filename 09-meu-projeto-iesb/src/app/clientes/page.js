'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ClientesPage() {

  const [clientes, setClientes] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const clientesLocalStorage = JSON.parse(localStorage.getItem('clientes')) || []
    // guarda a lista no estado faculdades
    setClientes(clientesLocalStorage)
    console.log(clientesLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(cliente) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
      // filtra a lista antiga removando o curso recebido
      const novaLista = clientes.filter(item => item.id !== cliente.id)
      // grava no localStorage a nova lista
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setCursos(novaLista)
      alert("Cliente excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de Clientes"}>
      <div className='text-end mb-2'>
        <Button href='/clientes/form'><FaPlusCircle /> Novo Cliente</Button>
      </div>

      {/* Tabela com os Clientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.cpf}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.sobrenome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.cidade}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/clientes/form?id=${cliente.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(cliente)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}