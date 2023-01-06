import React from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";

export const HomePage = () => {
  return (
    <MainLayout hasHeader>
      <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Sistema Inventario Cafetalero</h1>
                  <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Seleccione que desea hacer</p>
                  <Link to={"/agregar-cajuelas"}>
                    <button type="button" className="mr-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Agregar Cajuelas</button>
                  </Link>
                  <Link to={"/agregar-rebajas"}>
                    <button type="button" className="mr-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Agregar Rebajas</button>
                  </Link>
                  <Link to={"/configurar"}>
                    <button type="button" className="mr-2 mt-1 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Configurar Precio de la Cajuela</button>
                  </Link>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                  <img src="https://assets.stickpng.com/images/580b57fbd9996e24bc43c0ea.png" alt="mockup"/>
              </div>                
          </div>
      </section>
    </MainLayout>
  );
};
