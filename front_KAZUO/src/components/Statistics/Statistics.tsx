// c:/Users/Windows/OneDrive/Documentos/PROGRAMACION/CARRERA/PF/KAZUO/front_KAZUO/src/components/Statistics/Statistics.tsx

"use client";
import {
  IProduct,
  IStatisticsProps,
  IStore,
  IStoreInfo,
} from "@/interfaces/types";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { parse, format } from "date-fns";
import { es } from "date-fns/locale";
import * as echarts from "echarts";

const Statistics: React.FC<IStatisticsProps> = ({ storeId }) => {
  const [storeInfo, setStoreInfo] = useState<IStoreInfo | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");
  const { userData } = useAppContext();
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        const response = await fetch(`${kazuo_back}/store/${storeId}`);
        const dataStore = await response.json();
        if (response.ok) {
          setStoreInfo(dataStore.storeFound);
          setCreatedAt(dataStore.storeFound.createdAt);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStoreInfo();
  }, [storeId, kazuo_back]);

  useEffect(() => {
    if (storeInfo && storeInfo.products) {
      firstChart(storeInfo.products);
      profitsChart(storeInfo.products);
    }
  }, [storeInfo]);

  const formatDate = (createdAt: string) => {
    try {
      const date = parse(createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date());
      if (isNaN(date.getTime())) {
        throw new Error("Fecha inválida");
      }
      return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return "Fecha no disponible";
    }
  };

  const firstChart = (products: IProduct[]) => {
    const chartDom = document.getElementById("products");
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);

    const productNames = products.map((product) => product.name);
    const productQuantities = products.map((product) => product.quantity);

    const option = {
      title: {
        text: "Inventario de Productos",
      },
      tooltip: {},
      xAxis: {
        axisLabel: {
          // rotate: 90,
          color: "#fff",
        },
        data: productNames,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Cantidad",
          type: "bar",
          data: productQuantities,
          itemStyle: {
            color: "#c23531",
          },
        },
      ],
    };
    myChart.setOption(option);
  };

  const profitsChart = (products: IProduct[]) => {
    const chartDom = document.getElementById("profits");
    if (!chartDom) return;
    const myChart = echarts.init(chartDom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    const totalCost = Number(
      products
        .reduce((total, product) => total + Number(product.inPrice), 0)
        .toFixed(2)
    );
    console.log(totalCost);
    const totalSold = Number(
      products
        .reduce((total, product) => total + Number(product.outPrice), 0)
        .toFixed(2)
    );
    const storeProfits = Number((totalSold - totalCost).toFixed(2));

    var app = {};
    var option;

    option = {
      title: {
        text: "Ganancias estimadas de bodega",
        subtext: "Costo de productos vs Venta de productos",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        bottom: 10,
        right: 10,
      },
      series: [
        {
          name: "Ganancias Estimadas",
          type: "pie",
          radius: "50%",
          data: [
            { value: totalCost, name: "Costo toal" },
            { value: totalSold, name: "Ventas totales" },
            { value: storeProfits, name: "Ganancias totales" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    if (option && typeof option === "object") {
      myChart.setOption(option);
    }
  };

  if (!storeInfo) return <div>Cargando...</div>;

  return (
    <>
      <div>
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-700">HISTORIA "{storeInfo.name}"</h1>
        </div>
        <div>Fecha de creacion: {formatDate(createdAt)}</div>
      </div>
      <div className="grid grid-cols-4 grid-rows-4 mx-20">
        <div className="col-span-4 my-4">
          <h1 className="text-xl font-semibold mb-4">DATOS DE INTERES</h1>
        </div>
        <div className="col-span-2 row-span-3 row-start-2 my-4">
          <div id="products" style={{ width: "40vw", height: "400px" }}></div>
        </div>
        <div
          id="profits"
          style={{ width: "40vw", height: "400px" }}
          className="col-span-2 row-span-3 col-start-3 row-start-2"
        ></div>
      </div>
    </>
  );
};

export default Statistics;
