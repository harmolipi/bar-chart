const getGDPData = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );
  const data = await response.json();
  return data;
};

getGDPData().then((data) => console.log(data));

const w = 800;
const h = 500;
const padding = 30;
const svg = d3
  .select('#chart-container')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

getGDPData().then((data) => {
  console.log(data.data);

  const gdpMax = d3.max(data.data, (d) => d[1]);

  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(data.data, (d) => new Date(d[0])),
      d3.max(data.data, (d) => new Date(d[0])),
    ])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, gdpMax])
    .range([h - padding, padding]);

  svg
    .selectAll('rect')
    .data(data.data)
    .enter()
    .append('rect')
    .attr('data-date', (d, i) => data.data[i][0]
    // .attr('x', (d, i) => xScale(new Date(d[0])))
    .attr('x', (d, i) => i * (w / data.data.length - 1))
    .attr('y', (d) => yScale(d[1]))
    .attr('width', w / data.data.length - 1)
    // .attr('width', w / 275)
    .attr('height', (d, i) => h - yScale(d[1]))
    .attr('class', 'bar');
});
