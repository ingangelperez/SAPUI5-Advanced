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

            },

            showOrders: function (oEvent) {

                var oHboxTable = this.getView().byId("boxOrdersTable");
                oHboxTable.destroyItems();

                var oItemPressed = oEvent.getSource();
                var oContext = oItemPressed.getBindingContext("jsonEmployees");
                var oObjectContext = oContext.getObject();

                var aOrders = oObjectContext.Orders;
                var aOrdersItems = [];

                for (var i in aOrders) {

                    aOrdersItems.push(new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Label({ text: aOrders[i].OrderID }),
                            new sap.m.Label({ text: aOrders[i].Freight }),
                            new sap.m.Label({ text: aOrders[i].ShipAddress })
                        ]
                    }));

                }

                var oNewTable = new sap.m.Table({
                    width: "auto",
                    columns: [
                        new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>orderID}" }) }),
                        new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>freight}" }) }),
                        new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>shipAddress}" }) }),
                    ],
                    items: aOrdersItems
                }).addStyleClass("sapUiTinyMargin");

                oHboxTable.addItem(oNewTable);

                //Another Table - Dynamic Table
                var oNewTableJson = new sap.m.Table();
                oNewTableJson.setWidth = "auto";
                oNewTableJson.addStyleClass("sapUiTinyMargin");

                //Columns
                var oColumnOrderID = new sap.m.Column();
                var oLabelOrderID = new sap.m.Label();
                oLabelOrderID.bindProperty("text", "i18n>orderID");
                oColumnOrderID.setHeader(oLabelOrderID);
                oNewTableJson.addColumn(oColumnOrderID);

                var oColumnFreight = new sap.m.Column();
                var oLabelFreight = new sap.m.Label();
                oLabelFreight.bindProperty("text", "i18n>freight");
                oColumnFreight.setHeader(oLabelFreight);
                oNewTableJson.addColumn(oColumnFreight);

                var oColumnShipAddress = new sap.m.Column();
                var oLabelShipAddress = new sap.m.Label();
                oLabelShipAddress.bindProperty("text", "i18n>shipAddress");
                oColumnShipAddress.setHeader(oLabelShipAddress);
                oNewTableJson.addColumn(oColumnShipAddress);

                //Cells
                var oColumnListItem = new sap.m.ColumnListItem();

                var oCellOrderID = new sap.m.Label();
                oCellOrderID.bindProperty("text", "jsonEmployees>OrdersId");
                oColumnListItem.addCell(oCellOrderID);

                var oCellFreight = new sap.m.Label();
                oCellFreight.bindProperty("text", "jsonEmployees>Freight");
                oColumnListItem.addCell(oCellFreight);

                var oCellShipAddress = new sap.m.Label();
                oCellShipAddress.bindProperty("text", "jsonEmployees>ShipAddress");
                oColumnListItem.addCell(oCellShipAddress);

                var oBindingInfo = {
                    model: "jsonEmployees",
                    path: "Orders",
                    template: oColumnListItem
                };

                oNewTableJson.bindAggregation("items", oBindingInfo);
                oNewTableJson.bindElement("jsonEmployees>" + oContext.getPath());

                oHboxTable.addItem(oNewTableJson);

            }

        });
    });
