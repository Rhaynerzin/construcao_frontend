'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function CleintesPage() {

  const [clientes, setClientes] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || []
    // guarda a lista no estado clientes
    setClientes(clientesLocalStorage)
    console.log(clientesLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(cliente) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome} ${cliente.sobrenome}?`)) {
      // filtra a lista antiga removando o funcionário recebido
      const novaLista = clientes.filter(item => item.id !== cliente.id)
      // grava no localStorage a nova lista
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setClientes(novaLista)
      alert("Cliente excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Clientes"}>
      <div className='text-end mb-2'>
        <Button href='/clientes/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Clientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Status</th>

            <th></th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => {
            return (
            
              
              <td>{funcionario.cpf}</td>
              <td>{funcionario.nome}</td>
              <td>{funcionario.sobrenome}</td>
              <td>{funcionario.endereco}</td>
              <td>{funcionario.turno === 'manha' ? 'Manhã' : funcionario.turno === 'tarde' ? 'Tarde' : 'Noite'}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/funcionarios/form?id=${funcionario.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(funcionario)}><FaTrash /></Button>
              </td>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
