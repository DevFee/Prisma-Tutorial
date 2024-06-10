// Importaações de bibliotecas;
import { PrismaClient } from "@prisma/client";
import Color from "colors";

// Inicialiando o prismaclient;
const prisma = new PrismaClient()

// Função de registro;
export default async function register(username: string, email: string, name: string) {
    console.log(Color.green("[+] Registering user"))

    // Se user já existir a função para e desconecta do prisma;
    if (await prisma.users.findMany({ where: { userName: username } }) || await prisma.users.findMany({ where: { email: email } })) {
        console.log(Color.red(`[-] User ${username} or ${email} already exists`))
        prisma.$disconnect
        process.exit(1)
    }

    // Se não existir, criamos um user passsando um objeto como argumento atribuindo os valores dos parâmetros;
    await prisma.users.create({
        data: {
            userName: username,
            email: email,
            name: name,
            profile: { 
                create: {
                    role: "common",
                }
            }
        }

    // Se a criação for executada com sucesso executa o .then();
    }).then(() => {
        console.log(Color.green(`User ${username} created!`))
        prisma.$disconnect
        process.exit(1)

    // Se achar um erro na criação do usurio executa o .catch();
    }).catch((e) => {
        console.log(Color.red(e))
        prisma.$disconnect
        process.exit(1)
        
    // E por fim se der erro ou não executa .finally para desconectar do prisma;
    }).finally(() => {
        prisma.$disconnect
        process.exit(1)
    })
}