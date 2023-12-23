"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.usa.gov/crime/fbi/cde/arrest/state/CA/all?from=2009&to=2021&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <div>This is the chart</div>;
};

export default Chart;
