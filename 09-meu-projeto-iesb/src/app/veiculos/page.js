'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function VeiculosPage() {

  const [veiculos, setVeiculos] = useState([])

  // Carrega a lista de veículos do localStorage quando a tela é acessada
  useEffect(() => {
    const veiculosLocalStorage = JSON.parse(localStorage.getItem('veiculos')) || []
    setVeiculos(veiculosLocalStorage)
    console.log(veiculosLocalStorage)
  }, [])

  // Função para excluir um veículo
  function excluir(veiculo) {
    if (window.confirm(`Deseja realmente excluir o veículo ${veiculo.modelo}?`)) {
      const novaLista = veiculos.filter(item => item.id !== veiculo.id)
      localStorage.setItem('veiculos', JSON.stringify(novaLista))
      setVeiculos(novaLista)
      alert("Veículo excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo="Lista de Veículos">

      {/* Tabela com os Veículos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Ano</th>
            <th>Ar Condicionado</th>
            <th>Direção</th>
            <th>Trava Elétrica</th>
            <th>Vidro Elétrico</th>
            <th>Quilometragem</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map(veiculo => (
            <tr key={veiculo.id}>
              <td>
                <img src={veiculo.foto} alt={veiculo.modelo} width={250} height={300} />
              </td>
              <td>{veiculo.modelo}</td>
              <td>{veiculo.marca}</td>
              <td>{veiculo.ano}</td>
              <td>{veiculo.arCondicionado ? 'Sim' : 'Não'}</td>
              <td>{veiculo.direcao ? 'Sim' : 'Não'}</td>
              <td>{veiculo.travaEletrica ? 'Sim' : 'Não'}</td>
              <td>{veiculo.vidroEletrico ? 'Sim' : 'Não'}</td>
              <td>{veiculo.quilometragem} km</td>
              <td>R$ {parseFloat(veiculo.valor).toFixed(3)}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/veiculos/form?id=${veiculo.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(veiculo)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
