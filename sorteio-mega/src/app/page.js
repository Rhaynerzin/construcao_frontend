import Logo from './componentes/Logo';
import NumeroAleatorio from './componentes/NumeroAleatorio';

const Sorteio = () => {
    const sorteados = Array.from({ length: 6 }, () => <NumeroAleatorio key={Math.random()} />);

    return (
        <div>
            <Logo />
            <h1>Números Sorteados</h1>
            <p>Os números sorteados são:  </p>
            <div>
                {sorteados.map((numero, index) => (
                    <span key={index}>{numero} </span>
                ))}
            </div>
        </div>
    );
};

export default Sorteio;