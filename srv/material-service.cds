using materiais from '../db/schema';

service MaterialService {

  entity Materiais as projection on materiais.Cadastro;

// Chamada para fazer o filtro material
  function filtroMateriais(qtd: Integer) returns array of Materiais;

// Chamada para criação de material
  action criarMaterial(
   
    NumMat: Integer,
    Nome: String,
    Descr: String

  ) returns String;


}