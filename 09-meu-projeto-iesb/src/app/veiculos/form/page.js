'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function VeiculoFormPage(props) {

  const router = useRouter()

  // Recupera veículos do localStorage
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || []

  // Recupera o id para edição (se houver)
  const searchParams = useSearchParams(props);
  const id = searchParams.get('id');
  const veiculoEditado = veiculos.find(item => item.id === id)

  // Função para salvar os dados do formulário
  function salvar(dados) {
    if (veiculoEditado) {
      Object.assign(veiculoEditado, dados)
      localStorage.setItem('veiculos', JSON.stringify(veiculos))
    } else {
      dados.id = v4()
      veiculos.push(dados)
      localStorage.setItem('veiculos', JSON.stringify(veiculos))
    }

    alert("Veículo cadastrado com sucesso!")
    router.push("/veiculos")
  }

  // Valores iniciais do formulário
  const initialValues = {
    modelo: '',
    marca: '',
    ano: '',
    cor: '',
    arCondicionado: false,
    direcao: false,
    travaEletrica: false,
    vidroEletrico: false,
    quilometragem: '',
    valor: '',
    foto: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    modelo: Yup.string().required("Campo obrigatório"),
    marca: Yup.string().required("Campo obrigatório"),
    ano: Yup.number().required("Campo obrigatório").min(1900, "Ano inválido").max(new Date().getFullYear(), "Ano inválido"),
    cor: Yup.string().required("Campo obrigatório"),
    quilometragem: Yup.number().required("Campo obrigatório").min(0, "Valor inválido"),
    valor: Yup.number().required("Campo obrigatório").min(0, "Valor inválido"),
    foto: Yup.string().url("URL da foto inválida").required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Veículo"}>
      <Formik
        initialValues={veiculoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Modelo:</Form.Label>
                <Form.Control
                  name='modelo'
                  type='text'
                  value={values.modelo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.modelo && !errors.modelo}
                  isInvalid={touched.modelo && errors.modelo}
                />
                <Form.Control.Feedback type='invalid'>{errors.modelo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Marca:</Form.Label>
                <Form.Control
                  name='marca'
                  type='text'
                  value={values.marca}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.marca && !errors.marca}
                  isInvalid={touched.marca && errors.marca}
                />
                <Form.Control.Feedback type='invalid'>{errors.marca}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Ano:</Form.Label>
                <Form.Control
                  name='ano'
                  type='number'
                  value={values.ano}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.ano && !errors.ano}
                  isInvalid={touched.ano && errors.ano}
                />
                <Form.Control.Feedback type='invalid'>{errors.ano}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Cor:</Form.Label>
                <Form.Control
                  name='cor'
                  type='text'
                  value={values.cor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cor && !errors.cor}
                  isInvalid={touched.cor && errors.cor}
                />
                <Form.Control.Feedback type='invalid'>{errors.cor}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Check
                  name='arCondicionado'
                  type='checkbox'
                  label="Ar Condicionado"
                  checked={values.arCondicionado}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Check
                  name='direcao'
                  type='checkbox'
                  label="Direção"
                  checked={values.direcao}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Check
                  name='travaEletrica'
                  type='checkbox'
                  label="Trava Elétrica"
                  checked={values.travaEletrica}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Check
                  name='vidroEletrico'
                  type='checkbox'
                  label="Vidro Elétrico"
                  checked={values.vidroEletrico}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Quilometragem:</Form.Label>
                <Form.Control
                  name='quilometragem'
                  type='number'
                  value={values.quilometragem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.quilometragem && !errors.quilometragem}
                  isInvalid={touched.quilometragem && errors.quilometragem}
                />
                <Form.Control.Feedback type='invalid'>{errors.quilometragem}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Valor:</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="valor"
                  value={parseFloat(values.valor).toFixed(3)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.valor && !errors.valor}
                  isInvalid={touched.valor && errors.valor}
                />
                <Form.Control.Feedback type='invalid'>{errors.valor}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Foto (URL):</Form.Label>
                <Form.Control
                  name='foto'
                  type='text'
                  value={values.foto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.foto && !errors.foto}
                  isInvalid={touched.foto && errors.foto}
                />
                <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' href='/veiculos'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
