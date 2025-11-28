import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.6:8080" //toda vez que algum fdp for usar em sua maquida, deve dar o comando ipconfig pegar o ipv4 e colocar no lugar 
  // desse mas subistituindo apenas onde estão os xsis pq ai o resto é o ip do host local e é ingueal para todes "http://xxx.xxx.xx.x:8080"
});