import React, { useState } from "react";
import SelectForm from "./components/SelectForm";
import RecordTable from "./components/RecordTable";
import Footer from "./components/Footer";
import ProductDrawer from "./components/ProductDrawer";
import Headers from "./components/Headers";

const App = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const drawerEdit = () => {
    setOpenDrawer(!openDrawer);
  };
  const [products, setProduct] = useState([
    {
      id: 1,
      name: "mango",
      price: 3.5,
    },
    {
      id: 2,
      name: "banana",
      price: 1.5,
    },
    {
      id: 3,
      name: "orange",
      price: 2,
    },
  ]);
  const addProduct = (newProduct) => {
    setProduct([...products, newProduct]);
  };
  const [records, setRecord] = useState([]);
  const addRecord = (newRecord) => {
    const isExistedRecord = records.find(
      (record) => record.productId === newRecord.productId
    );
    if (isExistedRecord) {
      return updateRecord(isExistedRecord.id, newRecord.quantity);
    }
    return setRecord([...records, newRecord]);
  };
  const deleteRecord = (id) => {
    setRecord(records.filter((record) => record.id !== id));
  };
  const updateRecord = (id, addQuantity) => {
    setRecord(
      records.map((record) => {
        if (record.id === id) {
          const newQuantity = record.quantity + addQuantity;
          const newCost = record.price * newQuantity;
          return {
            ...record,
            quantity: newQuantity,
            cost: newCost,
          };
        }
        return record;
      })
    );
  };
  return (
    <div className="max-w-[700px] mx-auto min-h-screen flex flex-col">
      <Headers />
      <SelectForm products={products} addRecord={addRecord} />
      <RecordTable
        updateRecord={updateRecord}
        records={records}
        deleteRecord={deleteRecord}
      />
      <Footer drawerEdit={drawerEdit} />
      <ProductDrawer
        addProduct={addProduct}
        products={products}
        openDrawer={openDrawer}
        drawerEdit={drawerEdit}
      />
    </div>
  );
};

export default App;
