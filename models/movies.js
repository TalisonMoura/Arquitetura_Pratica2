const mongoose = require('mongoose');
const Movie = mongoose.model('Movie', {
    tiluto: String,
    sinopse: String,
    duracao: String,
    dataLancamento: String,
    imagem: String,
    Categorias: String
});
module.exports = Movie