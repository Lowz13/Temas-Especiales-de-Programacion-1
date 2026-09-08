//capa donde persisten los datos

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let pizzas = [{ id: 1, nombre: "Hawaiana", descripcion: "Jamon y piña" }];
/**
 * Regresa una lista de las pizzas
 * @returns []
 */
export async function obtenerTodasLasPizzasAsync(params){

    await sleep(2000); // Simula un retraso de 1 segundo

    return pizzas;
}

/**
 * Regresa la pizza del id buscado o un undefined si no lo encuentra
 * @param {*} id 
 */

export async function obtenerTodasLasPizzaPorIdAsync(id){
    await sleep(1000);
    const pizza = pizzas.find(x => x.id == id);

    return pizza;
}

export async function agregarPizzaAsync(pizza){
    await sleep(1000);
    pizzas.push(pizza)
}

export async function actualizarPizzaAsync(pizza){
    await sleep(1000);
    const index = pizzas.findIndex(x => x.id == pizza.id);
    if (index !== -1) {
        pizzas[index] = { ...pizzas[index], ...pizza };
        return pizzas[index];
        }
    return null; 

}

export async function eliminarPizzaAsync(id){
    await sleep(1000);
    const index = pizzas.findIndex(x => x.id == id);
    if (index !== -1) {
        pizzas = pizzas.filter(x => x.id != id);
        return true;
    }
    return false;
}