'use client'

import Pagina from '@/components/Pagina'
import apiLocalidades from '@/services/apiLocalidades'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function DisciplinaFormPage(props) {
  
  const router = useRouter()

  // Estados para armazenar dados dos selects
  const [cursos, setCursos] = useState([])
  const [professores, setProfessores] = useState([])
  const [professoresFiltrados, setProfessoresFiltrados] = useState([])

  // Carregar dados de cursos e professores do localStorage ou API
  useEffect(() => {
    const cursosLocal = JSON.parse(localStorage.getItem('cursos')) || []
    setCursos(cursosLocal)

    const professoresLocal = JSON.parse(localStorage.getItem('professores')) || []
    setProfessores(professoresLocal)
  }, [])

  // Atualizar lista de professores filtrados com base no curso selecionado
  const handleCursoChange = (cursoId, setFieldValue) => {
    setFieldValue('curso', cursoId)
    const professoresFiltrados = professores.filter(prof => prof.cursoId === cursoId)
    setProfessoresFiltrados(professoresFiltrados)
    setFieldValue('professores', '')  // Limpar o campo de professor ao trocar de curso
  }

  // Função para salvar dados do formulário
  function salvar(dados) {
    const disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || []
    dados.id = v4()
    disciplinas.push(dados)
    localStorage.setItem('disciplinas', JSON.stringify(disciplinas))
    
    alert("Disciplina cadastrada com sucesso!")
    router.push("/disciplinas")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    descricao: '',
    status: 'ativo',
    curso: '',
    professor: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    curso: Yup.string().required("Campo obrigatório"),
    professor: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Disciplina"}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>

            {/* Nome */}
            <Row className='mb-2'>
              <Form.Group as={Col} md={2}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  name='nome'
                  type='text'
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Descrição */}
            <Row className='mb-3'>
              <Form.Group as={Col} md={3}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  name='descricao'
                  as='textarea'
                  rows={2}
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.descricao && !errors.descricao}
                  isInvalid={touched.descricao && errors.descricao}
                />
                <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Status */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Status:</Form.Label>
                <Form.Select
                  name='status'
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.status && !errors.status}
                  isInvalid={touched.status && errors.status}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Curso */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Curso:</Form.Label>
                <Form.Select
                  name='curso'
                  value={values.curso}
                  onChange={(e) => handleCursoChange(e.target.value, setFieldValue)}
                  onBlur={handleBlur}
                  isValid={touched.curso && !errors.curso}
                  isInvalid={touched.curso && errors.curso}
                >
                  <option value="">Selecione</option>
                  {cursos.map(curso => <option key={curso.id} value={curso.id}>{curso.nome}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.curso}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Professor */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Professor:</Form.Label>
                <Form.Select
                  name='professor'
                  value={values.professor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.professor && !errors.professor}
                  isInvalid={touched.professor && errors.professor}
                >
                  <option value="">Selecione</option>
                  {professoresFiltrados.map(prof => <option key={prof.id} value={prof.id}>{prof.nome}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.professor}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Botões */}
            <Form.Group className='text-end'>
              <Button className='me-2' href='/disciplinas'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>

          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
