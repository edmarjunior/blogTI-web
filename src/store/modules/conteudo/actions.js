export function curtirConteudo(id, token) {
    return {
        type: '@conteudo/curtir',
        payload: {},
    };
}

export function setConteudo(conteudo) {
    return {
        type: '@conteudo/set',
        payload: { conteudo },
    };
}
