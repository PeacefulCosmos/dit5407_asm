import { MAX_YEAR, MIN_YEAR, yearLegend } from "../model/yearLegend";
import * as d3 from "d3";
import perCapitaCSV from "../../../data/econ/gdp_pcap_1960-2019.csv";

export const populationStringToInt = async (populationCSV) => {
  let population = await d3.csv(populationCSV);
  population.forEach((year) => {
    for (let i = MAX_YEAR; i < MAX_YEAR; i++) {
      year[i] = +year[i];
    }
  });
  return population;
};

export const populationMap = (population, worldmapJson) => {
  population.forEach((p) => {
    worldmapJson.objects.world_geomap_mid.geometries.forEach((w) => {
      if (!w.properties.population) {
        w.properties.population = {};
      }
      if (p["Country Code"] === w.properties.adm0_a3) {
        for (let i = MIN_YEAR; i <= MAX_YEAR; i++) {
          w.properties.population[i] = p[i];
        }
      }
    });
  });
  return worldmapJson;
};

export const loadPerCapitaData = async () => {
  const data = [];
  const rawData = await d3.csv(perCapitaCSV);
  rawData.forEach((e) => {
    let set = {
      name: e["Country Name"],
      code: e["Country Code"],
      perCapita: [],
    };
    for (let i = MIN_YEAR; i < MAX_YEAR; i++) {
      set.perCapita.push({ year: `${i}-01-01`, value: +e[i] });
    }
    data.push(set);
    set = {};
  });
  console.log(rawData);
  return data;
};
