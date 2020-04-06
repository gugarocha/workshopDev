// Usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require('./db')

// Configurar arquivos estáticos (CSS, Scripts, imagens)
server.use(express.static("public"))

// Habilitando o req.body
server.use(express.urlencoded({ extended: true }))

// Configurando o nunjucks (template engine, que permite manipular o HTML com JavaScript)
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
})

// Criei uma rota "/"
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS!")
        }

        // Criando um spread(espalhamento) do array rows
        // Assim é criada uma "cópia" de rows 
        const reversedIdeas = [...rows].reverse()

        // Regra de negócio: Mostrar as duas últimas ideias na página inicial
        let lastIdeas = []
        for ( idea of reversedIdeas ) {
            if ( lastIdeas.length < 2 ) {
                lastIdeas.push(idea)
            }
        }
    
        // Renderizando a página index.html e enviando para este arquivo um objeto com as últimas ideias
        return res.render("index.html", { ideas: lastIdeas })
    })

})

// Criei outra rota para a página de ideias
server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS!")
        }

        const reversedIdeas = [...rows].reverse()
        
        // Renderizando a página ideias.html e enviando para este arquivo um objeto com as todas as ideias
        return res.render("ideias.html", {ideas: reversedIdeas})
    })

})

server.post("/", function(req, res) {
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS!")
        }
        
        return res.redirect("/ideias")
    })
})

// Liguei meu servidor na porta 3000
server.listen(3000)