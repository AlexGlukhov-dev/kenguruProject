import React from "react";

import { IndivOrders } from "../../../containers/IndivOrders";
import { OptOrders } from "../../../containers/OptOrders";
import { ShopOrders } from "../../../containers/ShopOrders";

const SetPage = ({ type }) => {
	switch (type) {
		case "indiv":
			return <IndivOrders />;
		
		case "opt":
			return <OptOrders />;
		
		case "shop":
			return <ShopOrders />;
		
		default:
			return <IndivOrders />;
	}
};

export default SetPage;