//Importações;
import { PrismaClient } from "@prisma/client";
import Color from "colors/safe";

// Constante de inicialiazação do prisma
const prisma = new PrismaClient();

// Função para deletar um usuário pelo ID;
export default async function deleteUser(userId: string) { 
    console.log(Color.red("[+] Deleting user..."))
    
    // Constante que proucura pelo usuário;
    const user = await prisma.users.findFirst({
        where: {
            id: userId
        }
    })

    // Verifica se o usuário foi encontrado, se não encontrado desconecta do prisma e retorna uma mensagem de usuario não encontrado;
    if (!user) {
        console.log(Color.red(`[-] User with ID ${userId} not found.`))
        prisma.$disconnect
        process.exit(1)
    }

    // Função que deleta o usuário pelo ID;
    await prisma.users.delete({
        where: {
            id: userId
        }

    // Se o usuário for deletado corretamente executa o .then();
    }).then(() => {
        console.log(Color.green(`[+] User ${user.userName} deleted!`))
        prisma.$disconnect
        process.exit(1)
    
    // Se ocorrer um erro na deletação do usuario executa o .catch();
    }).catch((e) => {
        console.log(Color.red(e))
        prisma.$disconnect
        process.exit(1)

    // E por fim executa o .finally() independentemente se der erro ou não (isso para desconectar do prisma e finalizar o processo);
    }).finally(() => {
        prisma.$disconnect
        process.exit(1)
    })
}