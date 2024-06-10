// Importações;
import { PrismaClient } from "@prisma/client";
import register from "./scripts/register";
import ListUsers from "./scripts/selectusers";
import deleteUser from "./scripts/deleteuser";
import createPost from "./scripts/newposts";

// Inicializando o prismaclient;
const prisma = new PrismaClient({log: ["query"]});

// Constante que define a ação que vai ser definida (so pra testes não é importante em um projeto web);
const action: number = 20;

// UserID local para simular ações como deletar user ou criação de posts;
const localUserID = "440473c3-129f-412a-90cd-dc3774ca5f62"

// Switch básico para se caso a ação bater com algum dos números executar algum dos módulos;
switch (action) { 
    case 1:
        register("foda", "aaaaaaa@gmail.com", "Walter White");
        break;
    case 2:
        ListUsers();
        break;
    case 3: 
        createPost(localUserID, "New Post!", "This is my new post on luamake!");
        break;
    case 4:
        deleteUser(localUserID);
        break;
    default:
        console.log("Invalid action");
        break;
}

// Aqui é uma função de proucurar todos os usuarios filtrando apenas o email o username e os posts;
// sendo que os posts são filtrados tabmbém para mostrar apenas o titulo;

// async function main() {
//     const users = await prisma.users.findMany({
//         select: {
//             email: true,
//             userName: true,
//             posts: {
//                 select: {
//                     title: true,
//                 }
//             }
//         }
//     })
//     console.dir(users, {depth: null})
// }

// main()