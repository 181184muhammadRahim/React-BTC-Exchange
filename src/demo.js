import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { Card } from "antd";
import axios from "axios";
const { Meta } = Card;
const instance = axios.create({
  baseURL: "https://rest.coinapi.io/v1/exchangerate",
  headers: { "X-CoinAPI-Key": "529F3BB5-F771-4881-BBF7-FC814B448251" },
  timeout: 2000
});

const currencyMenu = (prop) => {
  return (
    <Menu
      onClick={(e) => {
        prop(e.key);
      }}
      items={[
        {
          label: "American Dollar($)",
          key: "USD"
        },
        {
          label: "EUROS (€)",
          key: "EUR"
        },
        {
          label: "English Pound (£)",
          key: "GBP"
        },
        {
          label: "Chinese Yuan (¥)",
          key: "CNY"
        },
        {
          label: "Pakistani Rupees (Rs)",
          key: "PKR"
        },
        {
          label: "Indian Rupees (₹)",
          key: "INR"
        }
      ]}
    />
  );
};
const cryptoMenu = (props) => {
  return (
    <Menu
      onClick={(e) => {
        props(e.key);
      }}
      items={[
        {
          label: "Bitcoin (BTC)",
          key: "BTC"
        },
        {
          label: "Ethereum (ETH)",
          key: "ETH"
        }
      ]}
    />
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState();
  const [currencyOption, setCurrencyOption] = useState("INR");
  const [cryptoOption, setCryptoOption] = useState("ETH");
  const selectCurrency = (value) => {
    console.log(typeof value);
    setCurrencyOption(value);
  };
  const selectCrypto = (value) => {
    console.log(typeof value);
    setCryptoOption(value);
  };
  useEffect(() => {
    instance.get("/" + cryptoOption + "/" + currencyOption).then((response) => {
      setRate(response.data.rate);
      setLoading(false);
    });
  }, [currencyOption, cryptoOption]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Dropdown overlay={currencyMenu(selectCurrency)} trigger={["click"]}>
          <Space>
            Currency Select
            <DownOutlined />
          </Space>
        </Dropdown>
        <Dropdown overlay={cryptoMenu(selectCrypto)} trigger={["click"]}>
          <Space>
            Crypto Coin Select
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
      <div>
        <Card
          style={{
            width: 300,
            marginTop: 16
          }}
          loading={loading}
        >
          <Meta
            title={"Rate=" + rate}
            description={
              "Rate of " + cryptoOption + " in currency " + currencyOption
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default App;
