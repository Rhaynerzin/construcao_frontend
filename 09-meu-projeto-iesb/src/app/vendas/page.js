'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function VendasPage() {

  const [vendas, setVendas] = useState([])
  const [clientes, setClientes] = useState([])
  const [veiculos, setVeiculos] = useState([])

  useEffect(() => {
    const vendasLocalStorage = JSON.parse(localStorage.getItem('vendas')) || []
    const clientesLocalStorage = JSON.parse(localStorage.getItem('clientes')) || []
    const veiculosLocalStorage = JSON.parse(localStorage.getItem('veiculos')) || []

    setVendas(vendasLocalStorage)
    setClientes(clientesLocalStorage)
    setVeiculos(veiculosLocalStorage)
  }, [])

  function excluir(venda) {
    if (window.confirm(`Deseja realmente excluir a venda do cliente ${venda.cliente}?`)) {
      const novaLista = vendas.filter(item => item.id !== venda.id)
      localStorage.setItem('vendas', JSON.stringify(novaLista))
      setVendas(novaLista)
      alert("Venda excluída com sucesso!")
    }
  }

  function getClienteNome(clienteId) {
    const cliente = clientes.find(cliente => cliente.id === clienteId)
    return cliente ? `${cliente.nome} ${cliente.sobrenome}` : "Cliente não encontrado"
  }

  function getVeiculoModelo(veiculoId) {
    const veiculo = veiculos.find(veiculo => veiculo.id === veiculoId)
    return veiculo ? veiculo.modelo : "Veículo não encontrado"
  }

  function getVendedorNome(vendedorId) {
    const vendedores = veiculos.find(veiculo => veiculo.id === veiculoId)
    return veiculo ? veiculo.modelo : "Veículo não encontrado"
  }

  return (
    <Pagina titulo="Lista de Vendas">
      <div className='text-end mb-2'>
        <Button href='/vendas/form'><FaPlusCircle /> Nova Venda</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Veículo</th>
            <th>Vendedor</th>
            <th>Data da Venda</th>
            <th>Valor da Venda</th>
            <th>Data de Entrega</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map(venda => (
            <tr key={venda.id}>
              <td>{getClienteNome(venda.cliente)}</td> 
              <td>{getVeiculoModelo(venda.veiculo)}</td>
              <td>{venda.vendedor}</td>
              <td>{new Date(venda.dataVenda).toLocaleDateString()}</td>
              <td>R$ {parseFloat(venda.valorVenda).toFixed(3)}</td>
              <td>{venda.dataEntrega}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/vendas/form?id=${venda.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(venda)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
