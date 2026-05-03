import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

export const useCarrito = () => useContext(CarritoContext);