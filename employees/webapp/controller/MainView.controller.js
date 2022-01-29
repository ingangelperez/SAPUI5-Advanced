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

                //var i18nBundle = oView.getModel("i18n").getResourceBundle();

                var oView = this.getView();

                var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
                oJSONModelEmpl.loadData("./localService/mockdata/Employees.json");
                oView.setModel(oJSONModelEmpl, "jsonEmployees");

                var oJSONModelCountries = new sap.ui.model.json.JSONModel();
                oJSONModelCountries.loadData("./localService/mockdata/Countries.json");
                oView.setModel(oJSONModelCountries, "jsonCountries");

                var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                    visibleID: true,
                    visibleName: true,
                    visibleCountry: true,
                    visibleCity: false,
                    visibleBtnShowCity: true,
                    visibleBtnHideCity: false

                });

                oView.setModel(oJSONModelConfig, "jsonConfig");

            },

            onFilter: function () {
                //Filter for employee table

                var oModelData = this.getView().getModel("jsonCountries").getData();
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

                var oModel = this.getView().getModel("jsonCountries");

                oModel.setProperty("/EmployeeId", "");
                oModel.setProperty("/CountryKey", "");

                //To auto-reset table filter
                this.onFilter();

            },

            showPostalCode: function (oEvent) {
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

            },

            onShowCity: function (oEvent) {
                //Show City Column

                var oJSONModelConfig = this.getView().getModel("jsonConfig");

                oJSONModelConfig.setProperty("/visibleCity", true);
                oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
                oJSONModelConfig.setProperty("/visibleBtnHideCity", true);

            },

            onHideCity: function (oEvent) {
                //Hide City Column 

                var oJSONModelConfig = this.getView().getModel("jsonConfig");
                
                //Another way to change the model data
                var oJsonConfigData = oJSONModelConfig.getData();
                oJsonConfigData.visibleCity = false;
                oJsonConfigData.visibleBtnShowCity = true;
                oJsonConfigData.visibleBtnHideCity = false;
                oJSONModelConfig.refresh();

            }

        });
    });
