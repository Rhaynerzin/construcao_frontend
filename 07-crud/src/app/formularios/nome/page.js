import Pagina from '@/components/Pagina'
import React from 'react'

export default function page() {
   
   function ManipularNomes
   
    return (
        <Pagina titulo="Formulario Nome">
        
            <div>
                <h2>Seu Nome</h2>
                <h2>Seu e-mail</h2>


            </div>



        {/* Form do React Bootstrap */}
        <Form>
            <Form.group>
            {/* Form do Nome */}
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="nome" />
            <Form.Text>Informe seu nome</Form.Text>
            </Form.group>

        {/* Form do Email */}
            <Form.group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="text" name="nome" />
            <Form.Text>Informe seu e-mail</Form.Text>
            </Form.group>

            <Button>Enviar</Button>

        </Form>


        </Pagina>
    )
}