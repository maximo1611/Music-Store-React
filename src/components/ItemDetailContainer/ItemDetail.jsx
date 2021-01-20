import "../ItemDetailContainer/itemDetailStyle.css";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Counter from "../Counter/counter";
import Loading from "../assets/loading.gif";
import { Store } from "../../store/index";
import { getFirestore } from "../../DB";


const Detail = () => {
  const { id } = useParams(); 
  const [data, setData] = useContext(Store);
  const [item, setItem] = useState({})
  const history = useHistory();
  const db = getFirestore();
  console.log(data)
 
  function onAdd(count, product) {
    if(data.length > 0){
      if(data.id === id){
      var itemInCart = true
      }
    } else{
      itemInCart = false
    }

    if(itemInCart){
      const newItems = [...data];
      newItems.forEach((i)=>{
        if(i.id === id){
          i.cantidad += count;
        }
      })
      setData({
        items: newItems,
        cantidad: Number(data.items.reduce((acc, item) => acc += item.cantidad, 0)),
        precioTotal: 0
      })

    } else {
      //si llegaste aca es porque el producto no se encuentra en el cart, por lo que podes agregarlo normalmente        
        setData({
          ...data,
          id: id ,    
          cantidad: Number( data.cantidad + count),
          items: [...data.items, {product, cantidad: count, id:id}]
        });

        localStorage.setItem("Cart", JSON.stringify({
          ...data.items, 
          id: id , 
          cantidad: Number( data.cantidad + count),
          items: [...data.items, {product, cantidad: count, id:id}]
        }));
    }  
    history.push("/cart");
  }


  const getProduct = new Promise((resolve, reject) => {
    const getDoc = db.collection('Productos').doc(id).get();
    getDoc.then(doc => {
    resolve({id: doc.id, ...doc.data()})
    })
   
  });

  const getProducstFromDB = async () => {
    try {
      const result = await getProduct;
      console.log(result)
      setItem(result);
    } catch (error) {
      alert("No podemos mostrar el producto");
    }
  };

  useEffect(() => {
    getProducstFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section>
      {item ? (
        <>
          <div className="contenedor_detail">
            <div className="contenedor_imagen">
              <img
                src={item.Imagen}
                alt="Guitarra"
                className="Imagen_Detail"
              />
            </div>
            <div className="div_producto">
              <p className="Titulo_Producto">
                {item.Marca} {item.Modelo}
              </p>
              <p className="Descripcion_producto">{item.descripcion}</p>
              <p style={{ justifyContent: "center", display: "flex" }}>
                {item.Precio}
              </p>
              <Counter
                Quantity={item.Quantity}
                onAdd={onAdd}
                product={`${item.Marca} ${item.Modelo}`}
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <img src={Loading} alt="Cargando..." />
          <p className="txt_cargando">Cargando</p>
        </div>
      )}
    </section>
  );
}

export default Detail;
