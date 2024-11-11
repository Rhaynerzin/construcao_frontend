'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function VendaFormPage(props) {

  const router = useRouter()

  // Recupera os veiculos e clientes do localStorage
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || []
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []
  const vendas = JSON.parse(localStorage.getItem('vendas')) || []

  // Recupera o id para edição (se houver)
  const searchParams = useSearchParams(props);
  const id = searchParams.get('id');
  const vendaEditada = vendas.find(item => item.id === id)

  // Função para salvar os dados do form
  function salvar(dados) {
    if (vendaEditada) {
      Object.assign(vendaEditada, dados)
      localStorage.setItem('vendas', JSON.stringify(vendas))
    } else {
      dados.id = v4()
      vendas.push(dados)
      localStorage.setItem('vendas', JSON.stringify(vendas))
    }

    alert("Venda registrada com sucesso!")
    router.push("/vendas")
  }

  // Valores iniciais do formulário
  const initialValues = {
    cliente: '',
    veiculo: '',
    dataVenda: '',
    valorVenda: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    cliente: Yup.string().required("Campo obrigatório"),
    veiculo: Yup.string().required("Campo obrigatório"),
    dataVenda: Yup.date().required("Campo obrigatório"),
    valorVenda: Yup.number().required("Campo obrigatório").positive("O valor deve ser positivo")
  })

  return (
    <Pagina titulo={"Registro de Venda"}>
      <Formik
        initialValues={vendaEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              
              {/* Cliente */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Cliente:</Form.Label>
                  <Form.Select
                    name='cliente'
                    value={values.cliente}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cliente && !errors.cliente}
                    isInvalid={touched.cliente && errors.cliente}
                  >
                    <option value=''>Selecione o Cliente</option>
                    {clientes.map(cliente => (<option key={cliente.id} value={cliente.id}>{cliente.nome} {cliente.sobrenome}</option>))}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.cliente}</Form.Control.Feedback>
              </Form.Group>

              {/* Veiculos */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Veículos:</Form.Label>
                  <Form.Select
                    name='veiculo'
                    value={values.veiculo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.veiculo && !errors.veiculo}
                    isInvalid={touched.veiculo && errors.veiculo}
                  >
                    <option value=''>Selecione o Veículo</option>
                    {veiculos.map(veiculo => (<option key={veiculo.id} value={veiculo.id}>{veiculo.marca} {veiculo.modelo} {veiculo.ano}</option>))}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.veiculo}</Form.Control.Feedback>
              </Form.Group>

              {/* Data de Venda */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Data de Venda:</Form.Label>
                  <Form.Control
                    name='dataVenda'
                    type='date'
                    value={values.dataVenda}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataVenda && !errors.dataVenda}
                    isInvalid={touched.dataVenda && errors.dataVenda}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.dataVenda}</Form.Control.Feedback>
              </Form.Group>

              {/* Valor da Venda */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Valor da Venda:</Form.Label>
                  <Form.Control
                    name='valorVenda'
                    type='number'
                    placeholder='Digite o valor da venda'
                    value={values.valorVenda}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.valorVenda && !errors.valorVenda}
                    isInvalid={touched.valorVenda && errors.valorVenda}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.valorVenda}</Form.Control.Feedback>
              </Form.Group>

              {/* Botões */}
              <Form.Group className='text-end'>
                <Button className='me-2' href='/vendas'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>
    </Pagina>
  )
}
