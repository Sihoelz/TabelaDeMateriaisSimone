const cds = require('@sap/cds');

module.exports = (srv) => {

  const { Materiais } = srv.entities;

  //Function filtro
  srv.on('filtroMateriais', async (req) => {

    const qtd = req.data.qtd;

    if (!qtd || qtd <= 0) {
      return [];
    }

    const materiais = await cds.run(
      SELECT.from(Materiais)
    );

    const embaralhado = materiais.sort(() => 0.5 - Math.random());
    return embaralhado.slice(0, qtd);

  });

// Criar Material
  srv.on('criarMaterial', async (req) => {

    const { NumMat, Nome, Descr } = req.data;

    // Validação
    if (!NumMat || !Nome || !Descr) {
      return 'Erro: Todos os campos são obrigatórios';
    }

    // Verifica duplicidade
    const existe = await cds.run(
      SELECT.one.from(Materiais).where({ NumMat: NumMat })
    );

    if (existe) {
      return 'Erro: Material já cadastrado';
    }

    // Busca último ID
    const ultimo = await cds.run(
      SELECT.one.from(Materiais)
        .columns('ID')
        .orderBy('ID desc')
    );

    // Converte para inteiro antes de somar
    let novoID = 1;
    if (ultimo && ultimo.ID) {
      novoID = parseInt(ultimo.ID, 10) + 1;
    }

    // Inserção
    await cds.run(
      INSERT.into(Materiais).entries({
        ID: novoID,
        NumMat: NumMat,
        Nome: Nome,
        Descr: Descr
      })
    );

    return `Sucesso: Material ${Nome} criado com ID ${novoID}`;

});

};