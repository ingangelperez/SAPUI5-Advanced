sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("aapg.employees.controller.MainView", {

            onInit: function () {

                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oView = this.getView();
                var i18nBundle = oView.getModel("i18n").getResourceBundle();

                // var oJSON = {
                //     employeeId: "12345",
                //     countryKey: "UK",
                //     listCountry: [
                //         {
                //             key: "US",
                //             text: i18nBundle.getText("countryUS")
                //         },
                //         {
                //             key: "UK",
                //             text: i18nBundle.getText("countryUK")
                //         },
                //         {
                //             key: "ES",
                //             text: i18nBundle.getText("countryES")
                //         }
                //     ]
                // }

                // oJSONModel.setData(oJSON);

                oJSONModel.loadData("./localService/mockdata/Employees.json");
                // oJSONModel.attachRequestCompleted(function (oEventModel) {
                //     console.log(JSON.stringify(oJSONModel.getData()));
                // });
                oView.setModel(oJSONModel);

            },

            onFilter: function () {
                //Filter for employee table

                var oModelData = this.getView().getModel().getData();
                var aFilters = [];

                if (oModelData.EmployeeId !== "") {
                    aFilters.push(new Filter("EmployeeID", FilterOperator.EQ, oModelData.EmployeeId));
                }

                if (oModelData.CountryKey !== "") {
                    aFilters.push(new Filter("Country", FilterOperator.EQ, oModelData.CountryKey));
                }

                var oTable = this.getView().byId("tableEmployee");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilters);

            },

            onClearFilter: function () {
                //Clear employee table filter

                var oModel = this.getView().getModel();

                oModel.setProperty("/EmployeeId", "");
                oModel.setProperty("/CountryKey", "");

                //To auto-reset table filter
                this.onFilter();

            },

            showPostalCode: function(oEvent) {
                //Display employee postal code

                var oItemPressed = oEvent.getSource();
                var oContext = oItemPressed.getBindingContext();
                var oObjectContext = oContext.getObject();

                sap.m.MessageToast.show(oObjectContext.PostalCode);

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
