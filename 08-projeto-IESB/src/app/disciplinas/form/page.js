'use client'

import Pagina from '@/components/Pagina'
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

  // Carregar dados de cursos e professores do localStorage
  useEffect(() => {
    const cursos = JSON.parse(localStorage.getItem("cursos")) || []
    setCursos(cursos)

    const professores = JSON.parse(localStorage.getItem("professores")) || []
    setProfessores(professores)
  }, [])

  // Função para atualizar lista de professores filtrados com base no curso selecionado
  const handleCursoChange = (cursoId, setFieldValue) => {
    setFieldValue('curso', cursoId)
    
  }

  function salvar(dados) {
    const disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || []

    if (props.searchParams?.id) {
      const disciplinaEditada = disciplinas.find(disciplina => disciplina.id === props.searchParams.id)
      Object.assign(disciplinaEditada, dados)
    } else {
      dados.id = v4()
      disciplinas.push(dados)
    }
    
    localStorage.setItem('disciplinas', JSON.stringify(disciplinas))
    alert("Disciplina salva com sucesso!")
    router.push("/disciplinas")
  }

  const initialValues = {
    nome: '',
    descricao: '',
    status: 'ativo',
    curso: '',
    professor: ''
  }

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
                  {professores.map(professor => <option key={professor.id} value={professor.id}>{professor.nome}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.professor}</Form.Control.Feedback>
              </Form.Group>
            </Row>

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
