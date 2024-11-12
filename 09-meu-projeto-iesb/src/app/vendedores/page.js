'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FuncionariosPage() {

  const [vendedores, setVendedores] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const vendedoresLocalStorage = JSON.parse(localStorage.getItem("vendedores")) || []
    // guarda a lista no estado funcionarios
    setVendedores(vendedoresLocalStorage)
    console.log(vendedoresLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(vendedor) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o vendedor ${vendedor.nome} ${vendedor.sobrenome}?`)) {
      // filtra a lista antiga removando o funcionário recebido
      const novaLista = vendedores.filter(item => item.id !== vendedor.id)
      // grava no localStorage a nova lista
      localStorage.setItem('vendedores', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setFuncionarios(novaLista)
      alert("Vendedor excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Vendedores"}>
      <div className='text-end mb-2'>
        <Button href='/vendedores/form'><FaPlusCircle /> Novo Vendedor</Button>
      </div>

      {/* Tabela com os Vendedores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendedores.map(vendedor => {
            return (
            <tr key={vendedor.id}>
              <td>
                {vendedor.foto ? (
                  <img src={vendedor.foto} alt="Foto do vendedor" style={{ maxWidth: '120px'}} />
                ) : (
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f0f0', borderRadius: '50%' }}></div>
                )}
              </td>
              <td>{vendedor.cpf}</td>
              <td>{vendedor.nome}</td>
              <td>{vendedor.sobrenome}</td>
              <td>{vendedor.endereco}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/vendedores/form?id=${vendedor.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(vendedor)}><FaTrash /></Button>
              </td>
            </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
