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

                //Event Bus
                this._bus = sap.ui.getCore().getEventBus();

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

                //New logic for delete with OData
                var oRowIncidence = oEvent.getSource().getParent().getParent();
                var oIncidenceContextObj = oRowIncidence.getBindingContext("incidenceModel").getObject();

                //Publish the event for delete in the Main controller
                this._bus.publish("incidence", "onDeleteIncidence", {
                    IncidenceId: oIncidenceContextObj.IncidenceId,
                    SapId: oIncidenceContextObj.SapId,
                    EmployeeId: oIncidenceContextObj.EmployeeId
                });

                //Old logic for delete only in the view
                /*var oTableIncidence = this.getView().byId("tableIncidence");
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
                }*/

            },

            onSaveIncidence: function (oEvent) {
                //Save incidence - Publish event to save incidence in controller Main

                var oRowIncidence = oEvent.getSource().getParent().getParent();
                var oIncidenceContext = oRowIncidence.getBindingContext("incidenceModel");

                this._bus.publish("incidence", "onSaveIncidence", { incidenceRow: oIncidenceContext.sPath.replace("/", "") });

            },

            updateIncidenceCreationDate: function (oEvent) {
                //Update incidence creation date flag
                var oContext = oEvent.getSource().getBindingContext("incidenceModel");
                var oContextObj = oContext.getObject();
                oContextObj.CreationDateX = true;
            },

            updateIncidenceReason: function (oEvent) {
                //Update incidence reason flag
                var oContext = oEvent.getSource().getBindingContext("incidenceModel");
                var oContextObj = oContext.getObject();
                oContextObj.ReasonX = true;
            },

            updateIncidenceType: function (oEvent) {
                //Update incidence type flag
                var oContext = oEvent.getSource().getBindingContext("incidenceModel");
                var oContextObj = oContext.getObject();
                oContextObj.TypeX = true;
            }

        });
    });
