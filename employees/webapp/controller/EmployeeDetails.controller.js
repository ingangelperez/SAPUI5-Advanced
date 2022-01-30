sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "aapg/employees/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof aapg.employees.model.formatter} formatter
     */
    function (Controller, formatter) {
        "use strict";

        return Controller.extend("aapg.employees.controller.EmployeeDetails", {

            formatter: formatter,

            onInit: function () {

            },

            onCreateIncidence: function () {

                var oTableIncidence = this.getView().byId("tableIncidence");
                var oNewIncidence = sap.ui.xmlfragment("aapg.employees.fragment.NewIncidence", this);
                var oIncidenceModel = this.getView().getModel("incidenceModel");

                var oIncidenceData = oIncidenceModel.getData();
                var iIndex = oIncidenceData.length;

                oIncidenceData.push({ index: iIndex + 1 });
                oIncidenceModel.refresh();

                oNewIncidence.bindElement("incidenceModel>/" + iIndex);
                oTableIncidence.addContent(oNewIncidence);

            },

            onDeleteIncidence: function (oEvent) {
                //Delete Incidence

                var oTableIncidence = this.getView().byId("tableIncidence");
                var oRowIncidence = oEvent.getSource().getParent().getParent();
                var oIncidenceModel = this.getView().getModel("incidenceModel");
                var oIncidenceData = oIncidenceModel.getData();
                var oIncidenceContextObj = oRowIncidence.getBindingContext("incidenceModel").getObject();

                oIncidenceData.splice(oIncidenceContextObj.index - 1, 1);

                for (var i in oIncidenceData) {
                    oIncidenceData[i].index = parseInt(i) + 1;
                }

                oIncidenceModel.refresh();
                oTableIncidence.removeContent(oRowIncidence);

                for (var j in oTableIncidence.getContent()) {
                    oTableIncidence.getContent()[j].bindElement("incidenceModel>/" + j);
                }
            }

        });
    });
