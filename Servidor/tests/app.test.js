import app from "../src/app";
import request from "supertest";

test('should respond with a 200 status code for a valid user', async () => {
    const nombreUsuario = 'pierre';
    const contrasena = '123';

    const response = await request(app)
        .post('/buscar-usuario')
        .send({
            nombre: nombreUsuario,
            contra: contrasena
        });

    expect(response.statusCode).toBe(200);

    const usuario = response.body;
    expect(usuario).toBeDefined();
    expect(usuario.nombre).toBeDefined();
    expect(usuario.password).toBeDefined();

    expect(typeof usuario.nombre).toBe('string');
    expect(typeof usuario.password).toBe('string');
});

test('should respond with a 404 status code for an invalid user', async () => {
    const response = await request(app)
        .post('/buscar-usuario')
        .send({
            nombre: 'usuarioNoExistente',
            contra: 'contrasenaInvalida'
        });

    expect(response.statusCode).toBe(404);
});



