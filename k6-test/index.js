import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from 'k6';
import http from 'k6/http';

const baseUrl = 'http://localhost:3000/api/v1/pizzas';

export const options = {
    vus: 10,
    iterations: 100,
    thresholds: {
        checks: ['rate == 1.0'],
    },
};

export default function () {
    const pizza = JSON.stringify({
        nombre: `Pizza k6 ${__VU}-${__ITER}`,
        descripcion: 'Pizza creada durante la prueba k6',
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const createResponse = http.post(baseUrl, pizza, params);
    const created = check(createResponse, {
        'POST crear pizza status code 201': (r) => r.status === 201,
        'POST crear pizza devuelve un id': (r) => r.status === 201 && Boolean(r.json('id')),
    });

    if (!created) {
        return;
    }

    const pizzaId = createResponse.json('id');
    const getResponse = http.get(`${baseUrl}/${pizzaId}`);
    check(getResponse, {
        'GET pizza por id status code 200': (r) => r.status === 200,
        'GET pizza por id devuelve el nombre': (r) => r.status === 200 && r.json('nombre') !== undefined,
    });

    const updateResponse = http.put(
        `${baseUrl}/${pizzaId}`,
        JSON.stringify({
            nombre: `Pizza k6 actualizada ${__VU}-${__ITER}`,
            descripcion: 'Pizza actualizada durante la prueba k6',
        }),
        params,
    );
    check(updateResponse, {
        'PUT actualizar pizza status code 200': (r) => r.status === 200,
        'PUT actualizar pizza devuelve el nombre actualizado': (r) => r.status === 200 && r.json('nombre') !== undefined,
    });

    const deleteResponse = http.del(`${baseUrl}/${pizzaId}`);
    check(deleteResponse, {
        'DELETE eliminar pizza status code 200': (r) => r.status === 200,
    });
}

export function handleSummary(data) {
    return {
        'index.html': htmlReport(data),
    };
}