'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {

  const veiculos = JSON.parse(localStorage.getItem("veiculos")) || []
  const vendedores = JSON.parse(localStorage.getItem("vendedores")) || []
  const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || []
  const clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const vendas = JSON.parse(localStorage.getItem("vendas")) || []
  
  const lista = [
    {
      nome: "Veiculos",
      imagem: "https://mrveiculos.com/media/img/content/bgs/bg_1692913012.jpg", quantidade: veiculos.length,
      link: "/veiculos"
    },
    {
      nome: "Vendedores",
      imagem: "https://maximatech.com.br/wp-content/uploads/2024/07/Gestao-de-alta-demanda-como-preparar-a-equipe-de-vendedores-V2.jpg", quantidade: vendedores.length,
      link: "/vendedores"
    },
    {
      nome: "Fornecedores",
      imagem: "https://gestao-de-fornecedores.portaliso.com/wp-content/uploads/2022/11/tipos-de-fornecedores-300x200.jpg", quantidade: fornecedores.length,
      link: "/fornecedores"
    },
    {
      nome: "Clientes",
      imagem: "https://st.depositphotos.com/2309453/4248/i/450/depositphotos_42483789-stock-photo-smiling-young-man-shaking-hands.jpg", quantidade: clientes.length,
      link: "/clientes"
    },
    {
      nome: "Vendas",
      imagem: "https://st2.depositphotos.com/1003593/5365/i/450/depositphotos_53656519-stock-photo-sales-growth-graph.jpg", quantidade: vendas.length,
      link: "/vendas"
    },
  ]

  return (
    <Pagina>
      <Row md={5}>
        {lista.map((item, index) => (
          <Col className='py-2' key={item.id || index}>
            <Card className="bg-primary text-dark" style={{ height: '100%' }}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title> Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link} variant="light">Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  )
}
