import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const data = await fetch(
  "https://gis.cdc.gov/Cancer/DataVizApi/GetJSON/TrendsMapData"
)
  .then((res) => res.json())
  .then((json) => JSON.parse(json));

const filteredData = data[0].TrendsMapData.filter((val) => {
  return (
    val.CancerSiteID === 1 && val.DataTypeID === 1 && val.GeoLocationID !== 1
  );
});
console.log(
  "🚀 ~ file: index.js:14 ~ filteredData ~ filteredData:",
  filteredData
);

const stateToId = {
  "United States": 1,
  Connecticut: 5,
  Maine: 6,
  Massachusetts: 7,
  "New Hampshire": 8,
  "Rhode Island": 9,
  Vermont: 10,
  "New Jersey": 12,
  "New York": 13,
  Pennsylvania: 14,
  Illinois: 17,
  Indiana: 18,
  Michigan: 19,
  Ohio: 21,
  Wisconsin: 22,
  Iowa: 24,
  Kansas: 25,
  Minnesota: 26,
  Missouri: 27,
  Nebraska: 28,
  "North Dakota": 29,
  "South Dakota": 30,
  Delaware: 33,
  "District of Columbia": 34,
  Florida: 35,
  Georgia: 36,
  Maryland: 38,
  "North Carolina": 39,
  "South Carolina": 40,
  Virginia: 41,
  "West Virginia": 42,
  Alabama: 44,
  Kentucky: 45,
  Mississippi: 46,
  Tennessee: 47,
  Arkansas: 49,
  Louisiana: 50,
  Oklahoma: 51,
  Texas: 52,
  Arizona: 55,
  Colorado: 56,
  Idaho: 57,
  Montana: 58,
  Nevada: 59,
  "New Mexico": 60,
  Utah: 61,
  Wyoming: 62,
  Alaska: 64,
  California: 65,
  Hawaii: 69,
  Oregon: 70,
  Washington: 71,
};

const stateGrid = [
  { x: 0, y: 7, key: "AK", name: "Alaska" },
  { x: 11, y: 0, key: "ME", name: "Maine" },
  { x: 9, y: 1, key: "VT", name: "Vermont" },
  { x: 10, y: 1, key: "NH", name: "New Hampshire" },
  { x: 11, y: 1, key: "MA", name: "Massachusetts" },
  { x: 1, y: 2, key: "WA", name: "Washington" },
  { x: 2, y: 2, key: "MT", name: "Montana" },
  { x: 3, y: 2, key: "ND", name: "North Dakota" },
  { x: 4, y: 2, key: "SD", name: "South Dakota" },
  { x: 5, y: 2, key: "MN", name: "Minnesota" },
  { x: 6, y: 2, key: "WI", name: "Wisconsin" },
  { x: 7, y: 2, key: "MI", name: "Michigan" },
  { x: 9, y: 2, key: "NY", name: "New York" },
  { x: 10, y: 2, key: "CT", name: "Connecticut" },
  { x: 11, y: 2, key: "RI", name: "Rhode Island" },
  { x: 1, y: 3, key: "OR", name: "Oregon" },
  { x: 2, y: 3, key: "ID", name: "Idaho" },
  { x: 3, y: 3, key: "WY", name: "Wyoming" },
  { x: 4, y: 3, key: "NE", name: "Nebraska" },
  { x: 5, y: 3, key: "IA", name: "Iowa" },
  { x: 6, y: 3, key: "IL", name: "Illinois" },
  { x: 7, y: 3, key: "IN", name: "Indiana" },
  { x: 8, y: 3, key: "OH", name: "Ohio" },
  { x: 9, y: 3, key: "PA", name: "Pennsylvania" },
  { x: 10, y: 3, key: "NJ", name: "New Jersey" },
  { x: 0, y: 4, key: "CA", name: "California" },
  { x: 1, y: 4, key: "NV", name: "Nevada" },
  { x: 2, y: 4, key: "UT", name: "Utah" },
  { x: 3, y: 4, key: "CO", name: "Colorado" },
  { x: 4, y: 4, key: "KS", name: "Kansas" },
  { x: 5, y: 4, key: "MO", name: "Missouri" },
  { x: 6, y: 4, key: "KY", name: "Kentucky" },
  { x: 7, y: 4, key: "WV", name: "West Virginia" },
  { x: 8, y: 4, key: "DC", name: "District of Columbia" },
  { x: 9, y: 4, key: "MD", name: "Maryland" },
  { x: 10, y: 4, key: "DE", name: "Delaware" },
  { x: 2, y: 5, key: "AZ", name: "Arizona" },
  { x: 3, y: 5, key: "NM", name: "New Mexico" },
  { x: 4, y: 5, key: "OK", name: "Oklahoma" },
  { x: 5, y: 5, key: "AR", name: "Arkansas" },
  { x: 6, y: 5, key: "TN", name: "Tennessee" },
  { x: 7, y: 5, key: "VA", name: "Virginia" },
  { x: 8, y: 5, key: "NC", name: "North Carolina" },
  { x: 3, y: 6, key: "TX", name: "Texas" },
  { x: 4, y: 6, key: "LA", name: "Louisiana" },
  { x: 5, y: 6, key: "MS", name: "Mississippi" },
  { x: 6, y: 6, key: "AL", name: "Alabama" },
  { x: 7, y: 6, key: "GA", name: "Georgia" },
  { x: 8, y: 6, key: "SC", name: "South Carolina" },
  { x: 1, y: 7, key: "HI", name: "Hawaii" },
  { x: 7, y: 7, key: "FL", name: "Florida" },
];

function getDataByState(state) {
  const data = filteredData
    .filter((val) => val.GeoLocationID === stateToId[state])
    .sort((a, b) => b.YearID - a.YearID);
  return data;
}

const stateGridWithData = stateGrid.map((state) => ({
  ...state,
  data: getDataByState(state.name),
}));
console.log(
  "🚀 ~ file: index.js:139 ~ stateGridWithData ~ stateGridWithData:",
  stateGridWithData
);

const width = 800;
const height = width * 0.8;

const xDomain = stateGrid.map((state) => state.x).sort((a, b) => a - b);
const yDomain = stateGrid.map((state) => state.y).sort((a, b) => a - b);

const xScale = d3
  .scaleBand()
  .domain(xDomain)
  .range([0, width])
  .padding(0.05)
  .round(true);
const yScale = d3
  .scaleBand()
  .domain(yDomain)
  .range([0, height])
  .padding(0.05)
  .round(true);
const lineXScale = d3
  .scaleBand()
  .domain(filteredData.map((val) => val.YearID).sort((a, b) => a - b))
  .range([0, xScale.bandwidth()]);
const lineYScale = d3
  .scaleLinear()
  .domain([
    Math.min(
      ...filteredData.filter((val) => val.value).map((val) => val.value)
    ),
    Math.max(
      ...filteredData.filter((val) => val.value).map((val) => val.value || 0)
    ),
  ])
  .range([0, yScale.bandwidth()]);

const svg = d3.selectAll("svg");

svg.style("height", height).style("width", width);

const map = svg
  .append("g")
  .selectAll("rect")
  .data(stateGrid)
  .join("rect")
  .attr("x", (d) => xScale(d.x))
  .attr("width", xScale.bandwidth())
  .attr("y", (d) => yScale(d.y))
  .attr("height", yScale.bandwidth())
  .attr("stroke", "black")
  .attr("fill", "white");

const stateLabels = svg
  .append("g")
  .selectAll("text")
  .data(stateGrid)
  .join("text")
  .attr("x", (d) => xScale(d.x) + xScale.bandwidth() / 2)
  .attr("y", (d) => yScale(d.y) + yScale.bandwidth() * 0.2)
  .attr("fill", "black")
  .attr("font-size", "14px")
  .attr("text-anchor", "middle")
  .text((d) => d.key);

const line = d3
  .line()
  .x((d) => lineXScale(d.YearID))
  .y((d) => lineYScale(d.value))
  .defined((d) => d.value);

const charts = svg
  .append("g")
  .selectAll("path")
  .data(stateGridWithData)
  .join("path")
  .attr("d", (d) => line(d.data))
  .attr("fill", "none")
  .attr("stroke-width", 1.5)
  .attr("stroke", "steelblue")
  .attr("transform", (d) => `translate(${xScale(d.x)}, ${yScale(d.y)})`);
