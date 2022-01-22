sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("aapg.employees.controller.MainView", {
            onInit: function () {

            },

            onValidateEmployeeInput: function (oEvent) {

                var oInputEmployee = oEvent.getSource();
                var oLabelCountry = this.getView().byId("labelSelectCountry");
                var oSelectCountry = this.getView().byId("slCountry");

                if (oInputEmployee.getValue().length === 6) {
                    oLabelCountry.setVisible(true);
                    oSelectCountry.setVisible(true);
                } else {
                    oLabelCountry.setVisible(false);
                    oSelectCountry.setVisible(false);
                }

            }

        });
    });
