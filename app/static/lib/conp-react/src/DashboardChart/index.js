import React from "react";
import PropTypes from "prop-types";
import { useDebounce } from "react-use";
import * as qs from "query-string";

import Highcharts from "highcharts";

const DashboardChart = ({ datasetsURL, pipelinesURL, ...props }) => {

    const drawChart = (data) => {

        const xAxis = [];
        const yAxisDatasets = [];
        const yAxisPipelines = [];

        var countDatasets = 0;
        var countPipelines = 0;

        Object.keys(data.datasets).forEach(year => {
            Object.keys(data.datasets[year]).forEach(month => {
                xAxis.push(`${month}/${year}`);
                countDatasets += data.datasets[year][month];
                yAxisDatasets.push(countDatasets);
            });
        });

        Object.keys(data.pipelines).forEach(year => {
            Object.keys(data.pipelines[year]).forEach(month => {
                countPipelines += data.pipelines[year][month];
                yAxisPipelines.push(countPipelines);
            });
        });

        /* Only show pipeline data for the months we have dataset data */
        var yAxisPipelinesExtract = yAxisPipelines;
        if (yAxisDatasets.length > yAxisPipelines.length) {
            yAxisPipelinesExtract = new Array(yAxisDatasets.length - yAxisPipelines.length).fill(0).concat(yAxisPipelines);
        }
        else if (yAxisDatasets.length < yAxisPipelines.length) {
            yAxisPipelinesExtract = yAxisPipelines.slice(Math.max(yAxisPipelines.length - xAxis.length, 0));
        }

        Highcharts.chart('dashboard-chart-container', {

            chart: {
                type: 'column',
                styledMode: true,
                backgroundColor: '#FFF'
            },
            credits: {
                enabled: false
            },

            title: {
                text: 'Cumulative Number of Datasets and Pipelines'
            },

            yAxis: [{
                title: {
                    text: '',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                allowDecimals: false,
            }],

            xAxis: {
                categories: xAxis
            },

            plotOptions: {
                column: {
                    borderRadius: 5
                }
            },

            series: [{
                name: 'Datasets',
                data: yAxisDatasets,
                yAxis: 0
            },
            {
                name: 'Pipelines',
                data: yAxisPipelinesExtract,
                yAxis: 0
            }]

        })
    };

    const fetchElements = async () => {

        try {
            const datasetsFetch = await fetch(datasetsURL + '?elements=all');

            if (!datasetsFetch.ok) {
                throw new Error(
                    `Request failed with status: ${datasetsFetch.status} (${datasetsFetch.statusText})`
                );
            }

            const datasetsRes = await datasetsFetch.json();

            const pipelinesFetch = await fetch(pipelinesURL);

            if (!pipelinesFetch.ok) {
                throw new Error(
                    `Request failed with status: ${pipelinesFetch.status} (${pipelinesFetch.statusText})`
                );
            }

            const pipelinesRes = await pipelinesFetch.json();

            const chartData = {
                datasets: {},
                pipelines: {}
            };

            datasetsRes.elements.map(element => {
                const dateAdded = new Date(element.dateAdded);

                if (!chartData.datasets[dateAdded.getFullYear()]) {
                    chartData.datasets[dateAdded.getFullYear()] = {}
                }

                if (!chartData.datasets[dateAdded.getFullYear()][dateAdded.getMonth() + 1]) {
                    chartData.datasets[dateAdded.getFullYear()][dateAdded.getMonth() + 1] = 1;
                }
                else {
                    chartData.datasets[dateAdded.getFullYear()][dateAdded.getMonth() + 1] += 1
                }
            });

            /* check if we've skipped months */

            var months = [];

            for (var i = 1; i <= 12; i++) {
                months.push(i);
            }

            const today = new Date();

            Object.keys(chartData.datasets).map(year => {
                for (var i = 1; i <= 12; i++) {
                    if (year == today.getFullYear() && i == today.getMonth() + 2) {
                        break;
                    }
                    if (Object.keys(chartData.datasets).includes((year - 1).toString()) &&
                        !Object.keys(chartData.datasets[year]).includes(`${i}`) && i == 1) {
                        chartData.datasets[year][i] = 0;
                    }
                    if (Object.keys(chartData.datasets[year]).includes(`${i - 1}`) &&
                        !Object.keys(chartData.datasets[year]).includes(`${i}`)) {
                        chartData.datasets[year][i] = 0;
                    }
                }
            });

            pipelinesRes.elements.map(element => {
                const dateAdded = new Date(element.publicationdate);

                if (!chartData.pipelines[dateAdded.getFullYear()]) {
                    chartData.pipelines[dateAdded.getFullYear()] = {}
                }

                if (!chartData.pipelines[dateAdded.getFullYear()][dateAdded.getMonth() + 1]) {
                    chartData.pipelines[dateAdded.getFullYear()][dateAdded.getMonth() + 1] = 1;
                }
                else {
                    chartData.pipelines[dateAdded.getFullYear()][dateAdded.getMonth() + 1] += 1
                }
            });

            Object.keys(chartData.pipelines).map(year => {
                for (var i = 1; i <= 12; i++) {
                    if (year == today.getFullYear() && i == today.getMonth() + 2) {
                        break;
                    }
                    if (Object.keys(chartData.pipelines).includes((year - 1).toString()) &&
                        !Object.keys(chartData.pipelines[year]).includes(`${i}`) && i == 1) {
                        chartData.pipelines[year][i] = 0;
                    }
                    if (Object.keys(chartData.pipelines[year]).includes(`${i - 1}`) &&
                        !Object.keys(chartData.pipelines[year]).includes(`${i}`)) {
                        chartData.pipelines[year][i] = 0;
                    }
                }
            });

            drawChart(chartData);

        } catch (err) {
            alert("There was an error retrieving the search results.");
            console.error(err);
        }
    };

    useDebounce(() => void fetchElements(), 300, [datasetsURL]);

    return (
        <div id="dashboard-chart" />
    );
};

DashboardChart.propTypes = {

};

DashboardChart.defaultProps = {

};

export default DashboardChart;