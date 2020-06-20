export function curtirConteudo(id) {
    return {
        type: '@conteudo/curtir',
        payload: { id },
    };
}

export function setConteudo(conteudo) {
    return {
        type: '@conteudo/set',
        payload: { conteudo },
    };
}
