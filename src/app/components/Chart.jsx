import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Colors } from "chart.js";

import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Crime",
    },
  },
};

const Chart = () => {
  const [crimeData, setCrimeData] = useState(null);
  const [crimeNames, setCrimeNames] = useState([]);
  const [selectedCrime, setSelectedCrime] = useState("Aggravated Assault");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.usa.gov/crime/fbi/cde/arrest/state/CA/all?from=2009&to=2021&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"
        );
        if (response.data.data.length > 0) {
          setCrimeData({
            labels: response.data.data.map(
              (individualData) => individualData.data_year
            ),
            datasets: [
              {
                label: selectedCrime,
                data: response.data.data.map(
                  (individualData) => individualData[selectedCrime]
                ),
              },
            ],
          });

          const crimeNamesList = Object.keys(response.data.data[0]).filter(
            (key) => key !== "data_year"
          );
          setCrimeNames(crimeNamesList);
        } else {
          console.log("Data is loading");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedCrime]);

  return (
    <div className="flex justify-center mt-14">
      <div className="" style={{ width: "800px", height: "800px" }}>
        <div>
          <label htmlFor="crimeSelect">Select Crime: </label>
          <select
            id="crimeSelect"
            value={selectedCrime}
            onChange={(e) => setSelectedCrime(e.target.value)}
            style={{ border: "1px solid #000000", borderRadius: "5px" }}>
            {crimeNames.length > 0 ? (
              crimeNames.map((crime) => (
                <option key={crime} value={crime}>
                  {crime}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Loading crimes...
              </option>
            )}
          </select>
        </div>

        {crimeData !== null ? (
          <Line data={crimeData} options={options} />
        ) : (
          <div>Loading chart data...</div>
        )}
      </div>
    </div>
  );
};

export default Chart;
