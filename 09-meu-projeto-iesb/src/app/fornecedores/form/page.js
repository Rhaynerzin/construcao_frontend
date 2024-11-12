'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { ReactInputMask } from 'react-input-mask';
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function FornecedoresFormPage(props) {

  const router = useRouter()

  // Recupera fornecedores do localStorage
  const fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || []

  // Recupera o id para edição (se houver)
  const searchParams = useSearchParams(props);
  const id = searchParams.get('id');
  const fornecedorEditado = fornecedores.find(item => item.id === id)

  // Função para salvar os dados do form
  function salvar(dados) {
    if (fornecedorEditado) {
      Object.assign(fornecedorEditado, dados)
      localStorage.setItem('fornecedores', JSON.stringify(fornecedores))
    } else {
      dados.id = v4()
      fornecedores.push(dados)
      localStorage.setItem('fornecedores', JSON.stringify(fornecedores))
    }

    alert("Fornecedor cadastrado com sucesso!")
    router.push("/fornecedores")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nomeEmpresa: '',
    cnpj: '',
    nomeRepresentante: '',
    emailContato: '',
    telefone: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    tipoProdutoServico: '',
    condicoesPagamento: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nomeEmpresa: Yup.string().required("Campo obrigatório"),
    cnpj: Yup.string().required("Campo obrigatório").length(14, "CNPJ deve ter 14 dígitos"),
    nomeRepresentante: Yup.string().required("Campo obrigatório"),
    emailContato: Yup.string().email("Email inválido").required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    endereco: Yup.object().shape({
      rua: Yup.string().required("Campo obrigatório"),
      numero: Yup.string().required("Campo obrigatório"),
      bairro: Yup.string().required("Campo obrigatório"),
      cidade: Yup.string().required("Campo obrigatório"),
      estado: Yup.string().required("Campo obrigatório")
    }),
    tipoProdutoServico: Yup.string().required("Campo obrigatório"),
    condicoesPagamento: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Fornecedor"}>
      <Formik
        initialValues={fornecedorEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Nome da Empresa:</Form.Label>
                  <Form.Control
                    name='nomeEmpresa'
                    type='text'
                    value={values.nomeEmpresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nomeEmpresa && !errors.nomeEmpresa}
                    isInvalid={touched.nomeEmpresa && errors.nomeEmpresa}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.nomeEmpresa}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>CNPJ:</Form.Label>
                  <Form.Control as={ReactInputMask}
                    name='cnpj'
                    type='text'
                    mask={"99.999.999/9999-99"}
                    placeholder='99.999.999/9999-99'
                    maxLength={14}
                    value={values.cnpj}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cnpj && !errors.cnpj}
                    isInvalid={touched.cnpj && errors.cnpj}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.cnpj}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Nome do Representante:</Form.Label>
                  <Form.Control
                    name='nomeRepresentante'
                    type='text'
                    value={values.nomeRepresentante}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nomeRepresentante && !errors.nomeRepresentante}
                    isInvalid={touched.nomeRepresentante && errors.nomeRepresentante}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.nomeRepresentante}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>E-mail de Contato:</Form.Label>
                  <Form.Control
                    name='emailContato'
                    type='email'
                    value={values.emailContato}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.emailContato && !errors.emailContato}
                    isInvalid={touched.emailContato && errors.emailContato}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.emailContato}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Telefone:</Form.Label>
                  <Form.Control as={ReactInputMask}
                    name='telefone'
                    type='text'
                    mask={"(99) 99999-9999"}
                    placeholder='(99) 99999-9999'
                    value={values.telefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.telefone && !errors.telefone}
                    isInvalid={touched.telefone && errors.telefone}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className='mb-2'>
                <Form.Label>Endereço:</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      name='endereco.rua'
                      type='text'
                      placeholder='Rua'
                      value={values.endereco.rua}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.endereco?.rua && !errors.endereco?.rua}
                      isInvalid={touched.endereco?.rua && errors.endereco?.rua}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.endereco?.rua}</Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      name='endereco.numero'
                      type='text'
                      placeholder='Número'
                      value={values.endereco.numero}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.endereco?.numero && !errors.endereco?.numero}
                      isInvalid={touched.endereco?.numero && errors.endereco?.numero}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.endereco?.numero}</Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <Form.Control
                      name='endereco.bairro'
                      type='text'
                      placeholder='Bairro'
                      value={values.endereco.bairro}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.endereco?.bairro && !errors.endereco?.bairro}
                      isInvalid={touched.endereco?.bairro && errors.endereco?.bairro}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.endereco?.bairro}</Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      name='endereco.cidade'
                      type='text'
                      placeholder='Cidade'
                      value={values.endereco.cidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.endereco?.cidade && !errors.endereco?.cidade}
                      isInvalid={touched.endereco?.cidade && errors.endereco?.cidade}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.endereco?.cidade}</Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      name='endereco.estado'
                      type='text'
                      placeholder='Estado'
                      value={values.endereco.estado}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.endereco?.estado && !errors.endereco?.estado}
                      isInvalid={touched.endereco?.estado && errors.endereco?.estado}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.endereco?.estado}</Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Tipo de Produto/Serviço Fornecido:</Form.Label>
                  <Form.Control
                    name='tipoProdutoServico'
                    type='text'
                    value={values.tipoProdutoServico}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipoProdutoServico && !errors.tipoProdutoServico}
                    isInvalid={touched.tipoProdutoServico && errors.tipoProdutoServico}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.tipoProdutoServico}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Condições de Pagamento:</Form.Label>
                  <Form.Control
                    name='condicoesPagamento'
                    type='text'
                    value={values.condicoesPagamento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.condicoesPagamento && !errors.condicoesPagamento}
                    isInvalid={touched.condicoesPagamento && errors.condicoesPagamento}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.condicoesPagamento}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Botões */}
              <Form.Group className='text-end'>
                <Button className='me-2' href='/fornecedores'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>
    </Pagina>
  )
}
