const express = require("express");
const app = express();
const port = 3000;

app.get("/specs", (req, res) => {
  res.json({
    specs: ["shopping_cart", "user", "customer", "orders", "order_details"],
  });
});

app.get("/specs/:collection_name/schema", (req, res) => {
  let schema = {};

  switch (req.params.collection_name.toString()) {
    case "shopping_cart":
      schema = {
        fields: {},
        edges: {},
      };
      break;
    case "user":
      schema = {
        fields: {
          email: {
            description: "Email with which the user registered",
            type: "FieldType.String",
            initialValue: "",
          },
          password: {
            description: "Password which the user uses to login",
            type: "FieldType.String",
            initialValue: "",
          },
          last_login: {
            description: "Last time the user logged in",
            type: "FieldType.MaybeTimestamp",
            initialValue: null,
          },
        },
        edges: {
          customer: {
            description: "The customer profile associated with the user",
            destination: "customer",
          },
        },
      };
      break;
    case "customer":
      schema = {
        fields: {
          name: {
            description: "Customer's name",
            type: "FieldType.String",
            initialValue: "",
          },
          billing_address: {
            description: "Customer's billing address",
            type: "FieldType.MaybeString",
            initialValue: null,
          },
          shipping_address: {
            description: "Customer's shipping address",
            type: "FieldType.MaybeString",
            initialValue: null,
          },
        },
        edges: {
          shopping_cart: {
            description: "The shopping cart associated with the profile`",
            destination: "shopping_cart",
          },
          orders: {
            description: "All orders placed by the customer",
            destination: "orders",
          },
        },
      };
      break;
    case "orders":
      schema = {
        fields: {
          status: {
            description:
              "Whether the order has been completed, cancelled, delivered or shipped.",
            type: "FieldType.MaybeString",
            initialValue: "",
          },
          time_placed: {
            description: "Time at which the order has been placed",
            type: "FieldType.Timestamp",
            initialValue: null,
          },
          total: {
            description: "Total price of the order",
            type: "FieldType.Number",
            initialValue: null,
          },
        },
        edges: {
          order_details: {
            description: "Details for the order placed by the customer",
            destination: "order_details",
          },
        },
      };
      break;
    case "order_details":
      schema = {
        fields: {
          billing_address: {
            description: "Customer's billing address",
            type: "FieldType.MaybeString",
            initialValue: null,
          },
          shipping_address: {
            description: "Customer's shipping address",
            type: "FieldType.MaybeString",
            initialValue: null,
          },
          created_date: {
            description: "Time at which the order checkout was started",
            type: "FieldType.Timestamp",
            initialValue: null,
          },
          shipping_cost: {
            description: "The shipping cost associated with the purchase",
            type: "FieldType.Number",
            initialValue: 10,
          },
        },
        edges: {
          order: {
            description: "Order placed by the customer",
            destination: "orders",
          },
        },
      };
      break;
    default:
      schema = {};
  }

  console.log(schema);

  res.json(schema);
});

app.listen(port, () => {
  console.log(`Interview app listening to ${port}`);
});
