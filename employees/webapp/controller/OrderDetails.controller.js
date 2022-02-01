sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     */
    function (Controller, History) {
        "use strict";

        return Controller.extend("aapg.employees.controller.OrderDetails", {

            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteOrderDetails").attachPatternMatched(this._onObjectMatched, this);
            },

            _onObjectMatched: function (oEvent) {
                this.getView().bindElement({
                    path: "/Orders(" + oEvent.getParameter("arguments").OrderId + ")",
                    model: "odataNorthwind"
                });
            },

            onBack: function (oEvent) {

                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                }
                else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteMainView", true);
                }

            }

        });
    });
