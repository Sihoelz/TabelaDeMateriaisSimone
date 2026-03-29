using materiais from '../db/schema';

service MaterialService {

  entity Materiais as projection on materiais.Cadastro;

  function filtroMateriais(qtd: Integer) returns array of Materiais;

   action criarMaterial(
   
    NumMat: Integer,
    Nome: String,
    Descr: String

  ) returns String;


}