import '../../ItemListContainer/style_Instrumentos.css';
// import Imagen_Fender from '../../assets/Guitarra.jpg';
// import Imagen_Epiphone from '../../assets/epiphone.jpg';
// import Imagen_Telecaster from '../../assets/telecaster.jpg';
import Counter from '../../Counter/counter';
import Loading from '../../assets/loading.gif'
import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Instrumentos from '../ProductList/productlist'

function Guitarras() {
       const [items, setItems] = useState([]);
     
       let lista = Instrumentos.filter(guitarra => guitarra.categoria === 'Guitarra')
       console.log(lista)
 
       const getProducts = new Promise((resolve, reject) => {
              setTimeout(() => {
                     resolve(lista);
              },4000)
       })
       const getProducstFromDB = async () => {
              try {
                     const result = await getProducts;
                     setItems(result);
              } catch (error) {
                     alert('No podemos mostrar los productos en este momento');
              }
       }
       useEffect(() => {
              getProducstFromDB();
       // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [])
       return (<section className='contenedor_instrumentos'>{items.length ? <>
              {(items.map(u =>  
                     <div className='Producto' key={u.id}>
                     <p className='txt_producto'>{u.Marca} {u.Modelo}</p>
                     <img src={u.Imagen} alt="Guitarra" className="Foto_instrumento" />
                     <p className='txt_producto'>{u.Precio}</p>
                     <Counter Quantity={u.Quantity} />
                      <Link to={`/category/guitarras/${u.id}`} className='VerMas'>Ver Mas</Link>
                      </div> 
              ))}
       </> : <div>
                     <img src={Loading} alt="Cargando..." />
                     <p className='txt_cargando'>Cargando</p>
              </div>
       }</section>
       )
}
export default Guitarras