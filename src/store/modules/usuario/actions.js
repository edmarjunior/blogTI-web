export function createUsuario(usuario) {
    return {
        type: '@usuario/CREATE',
        payload: { usuario }
    }
}
