// Importação de bibliotecas;
import { PrismaClient } from "@prisma/client";
import Color from "colors";

// Constante de inicialização do prisma client
const prisma = new PrismaClient();

// Função de listagem de usuários;
export default async function ListUsers() { 
    console.log(Color.green("[+] Listening users...\n"))

    // Listagem de usuários;
    const users = await prisma.users.findMany().then(user => {
        
        // Caso usuarios encontrados executa o .then(), que vai receber como argumento o array de usuarios;
        // E vai mapea-los cada um;
        // Ou seja, para cada usuario dê um console.log de seu username e seu id;
        user.map((x) => {
            console.log(`${x.userName} : ${x.id}`)
        })
        console.log("\n================================================================\n")
        // Fecha a conexão com o banco de dados;
        prisma.$disconnect
    }
    // Caso der erro ao proucurar pelos usuarios executa o .catch();
    ).catch((err) => { 
        console.log(Color.red(err))
        prisma.$disconnect
        process.exit(1)

    // E por fim executa o .finally() independentemente se der erro ou não (isso para desconectar do prisma e finalizar o processo);
    }).finally(() => {
        prisma.$disconnect
        process.exit(1)
    })
}