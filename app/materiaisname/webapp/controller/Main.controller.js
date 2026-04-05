sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
     "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Button",
], (Controller, Filter, FilterOperator,Dialog,Input,Button) => {
    "use strict";

    return Controller.extend("app.materiais.materiaisname.controller.Main", {

        onInit() {
        },

//      FUNÇÃO DE FILTRO
        onFiltrar() {

            // pega valor digitado
            const sValor = this.byId("inputFiltro").getValue();

            // pega tabela
            const oTable = this.byId("tabelaMateriais");

            // pega binding
            const oBinding = oTable.getBinding("items");

            let aFilters = [];

            if (sValor) {
                aFilters.push(
                    new Filter("Descr", FilterOperator.Contains, sValor)
                );
            }

            // aplica filtro
            oBinding.filter(aFilters);
        },

         onNovo() {

            const oInputNumMat = new Input({ placeholder: "Número" });
            const oInputNome = new Input({ placeholder: "Nome" });
            const oInputDescr = new Input({ placeholder: "Descrição" });

            const oDialog = new Dialog({
                title: "Novo Material",

                content: [oInputNumMat, oInputNome, oInputDescr],

                beginButton: new Button({
                    text: "Salvar",
                    press: async () => {

                        const oModel = this.getView().getModel();

                        const oAction = oModel.bindContext("/criarMaterial(...)");

                        oAction.setParameter("NumMat", parseInt(oInputNumMat.getValue()));
                        oAction.setParameter("Nome", oInputNome.getValue());
                        oAction.setParameter("Descr", oInputDescr.getValue());

                        await oAction.execute();

                        this.byId("tabelaMateriais").getBinding("items").refresh();

                        oDialog.close();
                    }
                }),

                endButton: new Button({
                    text: "Cancelar",
                    press: () => oDialog.close()
                })
            });

            oDialog.open();
        }

    });
});