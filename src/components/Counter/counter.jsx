import "./Container.css";
import React, { useState } from "react";
import CountContainer from "./countContainer";


function Contador({ Quantity, onAdd , product, preciototal}) {
  const [count, setCount] = useState(1);

  
  const qty = Quantity;

  const add = () => {
    if (count < qty) {
      setCount(count + 1);
    }
    if (count === qty) {
      alert("Solo tengo eso en stock");
    }
  };

  const less = () => {
    if (count === 1) {
      alert("No se puede menos de 1");
      return;
    }

    setCount(count - 1);
  };
  return (
    <div className="count_display">
      <div className="count_container">
        <p className="Cantidad_Productos">Disponibilidad de Productos: {qty}</p>
        <CountContainer count={count} add={add} less={less} quantity={qty} onAdd={onAdd} product={product}  preciototal={preciototal}/>
      </div>
    </div>
  );

}

export default Contador;
