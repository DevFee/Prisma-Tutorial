// Importação de bibliotecas
import { PrismaClient } from "@prisma/client"
import Color from "colors"

// Constante de inicialização do prisma client;
const prisma = new PrismaClient()

// Função de criação de um novo post;
export default async function createPost(userId: string, title: string, description?: string) {
    console.log(Color.green(`[+] Creating new post "${title}"...`))
    
    // Cria um novo post com os dados passados como parâmetro;
    await prisma.posts.create({
        data: {
            title: title,
            description: description,
            published: true,
            author: {
                connect: {
                    id: userId
                }
            }
        }

    // Caso a operação de criar um post seja bem sucedida executa o .then();
    }).then(() => {
        console.log(Color.green(`[+] Post "${title}" created!`))
        prisma.$disconnect
        process.exit(1)

    // Caso ocorra um erro ao criar um post executa o .catch();
    }).catch((e) => {
        console.log(Color.red(`[-] Error: ${e}`))
        prisma.$disconnect
        process.exit(1)
    
    // E por fim executa o .finally() independentemente se der erro ou não (isso para desconectar do prisma e finalizar o processo)
    }).finally(() => {
        prisma.$disconnect
        process.exit(1)
    })
}