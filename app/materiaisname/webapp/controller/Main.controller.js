sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
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
        }

    });
});