//// home sayfasındaki ürünler hakkında gösterim, arama, sıralama yapabildiğiniz kısımla beraber tüm ürün kartlarının sergilendiği yer. ürün kartları (productıtem) adlı komponentde işlenecektir.
import React, { useEffect, useState } from 'react'
import styles from "./ProductList.module.scss"
import {BsFillGridFill} from "react-icons/bs"
import {FaListAlt} from "react-icons/fa"
import Search from '../../search/Search'
import ProductItem from '../productItem/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilteredProducts } from '../../../redux/slice/filterSlice'
import { STORE_PRODUCTS } from '../../../redux/slice/productSlice'
import Pagination from '../../pagination/Pagination'

const ProductList = ({products}) => {
  const [grid,setGrid] = useState(true)
  const [search,setSearch] = useState("")
  const [sort,setSort] = useState("latest")


  const filteredProducts = useSelector(selectFilteredProducts)
  const dispatch = useDispatch();

  const [currentPage,setCurrentPage] = useState(1)
  const productsPerPage = 9 

  const indexOfLastProduct =  currentPage * productsPerPage
  const indexOfFirstProduct = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products,search}))
  },[dispatch,products,search])

  useEffect(()=>{
    dispatch(SORT_PRODUCTS({products,sort}))
  },[dispatch,products,sort])
  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={()=>setGrid(true)}/>
          <FaListAlt size={24} color="#0066d4" onClick={()=>setGrid(false)}/>
          <p>
            <b>{filteredProducts.length}</b>ürün bulundu
          </p>
        </div>
        <div>
          <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <div className={styles.sort}>
          <label>Sırala:</label>
          <select name="category" value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="latest">Son Yüklenen</option>
            <option value="lowest-price">Azalan Fiyat</option>
            <option value="highest-price">Yükselen Fiyat</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>Ürün Bulunamadı</p>
        ) : (
          <>
          {currentProducts.map((product)=>{
            return (
              <div key={product.id}>
              <ProductItem {...product} grid={grid} product={product}/>
              </div>
            )
          })}
          </>
        )}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} totalProducts={filteredProducts.length}/>
      
    </div>
  )
}

export default ProductList