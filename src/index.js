"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = __importDefault(require("./scripts/register"));
const selectusers_1 = __importDefault(require("./scripts/selectusers"));
const newposts_1 = __importDefault(require("./scripts/newposts"));
const deleteuser_1 = __importDefault(require("./scripts/deleteuser"));
const action = 1;
const localUserID = "66b81038-6048-451d-b231-142a6c302b69";
switch (action) {
    case 1:
        (0, register_1.default)("Heisenber", "walterwhite@gmail.com", "Walter White");
        break;
    case 2:
        (0, selectusers_1.default)();
        break;
    case 3:
        (0, newposts_1.default)(localUserID, "New Post!", "This is my new post on luamake!");
        break;
    case 4:
        (0, deleteuser_1.default)(localUserID);
        break;
    default:
        console.log("Invalid action");
        break;
}
