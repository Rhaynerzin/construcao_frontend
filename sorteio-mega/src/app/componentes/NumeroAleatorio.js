const NumeroAleatorio = () => {
    const GerarNumeroAleatorio = () => {
        return Math.floor(Math.random() * 60) + 1;
    };

    return GerarNumeroAleatorio();
};

export default NumeroAleatorio;