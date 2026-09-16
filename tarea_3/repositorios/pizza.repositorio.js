// Capa donde persisten los datos.
import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
});

const Pizza = mongoose.models.Pizza || mongoose.model("Pizza", pizzaSchema);

/**
 * Regresa una lista de las pizzas
 * @returns {Promise<Array>} Lista de pizzas
 */
export async function obtenerTodasLasPizzasAsync(){
    return Pizza.find();
}

/**
 * Regresa la pizza del id buscado o un undefined si no lo encuentra
 * @param {string} id Identificador de MongoDB.
 * @returns {Promise<Object|null>} La pizza encontrada o null
 */
export async function obtenerTodasLasPizzaPorIdAsync(id){
    if (!mongoose.isObjectIdOrHexString(id)) return null;
    return Pizza.findById(id);
}

/**
 * Agrega una nueva pizza a la lista
 * @param {Object} pizza Datos de la pizza.
 * @returns {Promise<Object>} La pizza creada.
 */
export async function agregarPizzaAsync(pizza){
    return Pizza.create(pizza);
}

/**
 * Actualiza la pizza con el id proporcionado y regresa la pizza actualizada o null si no se encontró
 * @param {Object} pizza Pizza con `_id` y datos actualizados.
 * @returns {Promise<Object|null>} La pizza actualizada o null si no se encontró
 */
export async function actualizarPizzaAsync(pizza){
    const { _id, ...datosAActualizar } = pizza;
    if (!mongoose.isObjectIdOrHexString(_id)) return null;

    return Pizza.findByIdAndUpdate(
        _id,
        datosAActualizar,
        { returnDocument: "after", runValidators: true }
    );
}

/**
 * elimina la pizza del id buscado y regresa true si la eliminó o false si no la encontró
 * @param {string} id Identificador de MongoDB.
 * @returns {Promise<boolean>} true si se eliminó, false si no se encontró
 */
export async function eliminarPizzaAsync(id){
    if (!mongoose.isObjectIdOrHexString(id)) return false;

    const resultado = await Pizza.findByIdAndDelete(id);
    return resultado !== null;
}