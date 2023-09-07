const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movies');

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.post('/movie', async (req, res) => {
    const {nome, salario, aprovado } = req.body
    const movie = {
        nome,
        salario,
        aprovado
    }
    try{
        await Movie.create(movie)
        res.status(201).json({ message: 'Filme inserido com sucesso'})
    }catch (error) {
        res.status(500).json({ erro: error})
    }
});

app.get('/movie', async (req, res) => {
    try{
        const movies = await Movie.find()
        res.status(200).json(movies)
    }catch (error) {
        res.status(500).json({ erro: error })
    }
});

app.get('/movie/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const movie = await Movie.findOne({ _id : id });
        if(!movie){
            res.status(422).json({ message: 'Filme não encontrado' });
            return;
        }
        res.status(200).json(movie);
    }catch (error) {
        res.status(500).json({ erro: error });
    }
});

app.patch('/movie/:id', async (req, res) => {
    const id = req.params.id;
    const { tiluto, sinopse, duracao, dataLancamento, imagem, Categorias } = req.body;
    const movie = {
        tiluto,
        sinopse,
        duracao,
        dataLancamento,
        imagem,
        Categorias
    }
    try{
        const updateMovie = await Movie.updateOne({ _id : id}, movie);
        if( updateMovie.matchedCount === 0) {
            res.status(422).json({ message: 'Filme não encontrado!'});
            return;
        }
        res.status(200).json(movie);
    }catch (error){
        res.status(500).json({ erro: error })
    }
});

app.delete('/movie/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findOne({ _id : id})
    if( !movie ){
        res.status(422).json({ message: 'Filme não encontrado!'})
        return;
    }
    try {
        await Movie.deleteOne({ _id : id })
        res.status(200).json({ message: 'Filme removido com sucesso!'})
    }catch (error){
        res.status(500).json({ erro: error});
    }
});

app.get("/", (req, res) => { 
    res.json({ message: 'Oi Express!'});
});
mongoose.connect(
    'mongodb+srv://talisonmoura13:Ta532900@cluster0.hotfiej.mongodb.net/Movie?retryWrites=true&w=majority'
)
.then(() => {
    console.log('Conectou ao Banco!')
    app.listen(3000)
})
.catch((err) => console.log(err));