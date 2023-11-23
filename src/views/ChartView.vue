<script setup>
import { ref, onMounted } from 'vue';
import { getRankCity, getRankMale, getRankFemale } from '@/api/room.js';
// import { Doughnut } from "vue-chart-3";
// import { ref as chartRef, computed, defineComponent } from "@vue/composition-api";

import Chart from 'chart.js/auto';


const mostSido = ref("");
const colors = [
	"#622a19",
	"#1e81b0",
	"#e28743",
	"#76b5c5",
	"#21130d",
	"#873e23",
	"#063970",
	"#46382b",
	"#4ab2d5",
	"#422a0e",
]

onMounted(async () => {
	await getRankCity(
		({ data, status }) => {
			if (status === 200) {
				console.log("data :", data);
				// cityLabels.value.push(...data.data);
				// cityData.value.push(...data.labels);
				// mostSido.value = data.label[0];
				const cityConfig = {
					type: 'doughnut',
					data: {
						labels:data.labels,
						datasets: [{
							label: '양도 방 ',
							data: data.data,
							// boorderWidth: 1
							backgroundColor: [
								'rgb(255, 99, 132)',
								'rgb(54, 162, 235)',
								'rgb(255, 205, 86)',
								'rgb(255, 102, 86)',
								'rgb(121, 205, 86)',
								colors[0],
								colors[1],
								colors[2],
								colors[3],
								colors[4],
								colors[5],
								colors[6],
								colors[7],
								colors[8],
								colors[9],
								'rgb(250, 100, 50)',
							]
						}]
					},
					color:"#f7f7f7",
				}
				Chart.defaults.color="#f7f7f7";
				const ctx = document.getElementById('cityChart');;
				console.log(ctx);
				const chart = new Chart(ctx, cityConfig);
				console.log(chart);
			}
		},
		(err) => {
			console.log(err);
		}

	);
	await getRankMale(
		({ data, status }) => {
			if (status === 200) {
				console.log("data :", data);
				// cityLabels.value.push(...data.data);
				// cityData.value.push(...data.labels);
				const maleConfig = {
					type: 'doughnut',
					data: {
						labels:data.labels,
						datasets: [{
							label: '양도 방 ',
							data: data.data,
							// boorderWidth: 1
							backgroundColor: [
								'rgb(255, 99, 132)',
								'rgb(54, 162, 235)',
								'rgb(255, 205, 86)',
								'rgb(255, 102, 86)',
								'rgb(121, 205, 86)',
							]
						}]
					},
				}

				const ctx = document.getElementById('maleChart');;
				console.log(ctx);
				const chart = new Chart(ctx, maleConfig);
				console.log(chart);
			}
		},
		(err) => {
			console.log(err);
		}

	);
	await getRankFemale(
		({ data, status }) => {
			if (status === 200) {
				console.log("data :", data);
				// cityLabels.value.push(...data.data);
				// cityData.value.push(...data.labels);
				const femaleConfig = {
					type: 'doughnut',
					data: {
						labels:data.labels,
						datasets: [{
							label: '양도 방 ',
							data: data.data,
							// boorderWidth: 1
							backgroundColor: [
								'rgb(255, 99, 132)',
								'rgb(54, 162, 235)',
								'rgb(255, 205, 86)',
								'rgb(255, 102, 86)',
								'rgb(121, 205, 86)',
							]
						}]
					},
				}

				const ctx = document.getElementById('femaleChart');;
				console.log(ctx);
				const chart = new Chart(ctx, femaleConfig);
				console.log(chart);
			}
		},
		(err) => {
			console.log(err);
		}

	);
});

</script>

<template>
	<section id="section-custom">
		<div class="chart-container">
			<div>
				<h3 style="color:aliceblue">최다 양도 지역</h3>
				<canvas id="cityChart"></canvas>
			</div>
			<div>
				<h3 style="color:aliceblue">{{ mostSido }} 여성 인기 동</h3>
				<canvas id="maleChart"></canvas>
			</div>
			<div>
				<h3 style="color:aliceblue">남성 양도 지역</h3>
				<canvas id="femaleChart"></canvas>
			</div>
		</div>
	</section>
</template>

<style scoped>
.chart-container {
	/* width: 100%; */
	/* background-color: red; */
	/* display: flex; */
	width:100%;
	height: 900px;
	/* background-color:#f7f7f7 ; */
	display: flex;
	justify-content: center;
	margin-top: 100px;
}

</style>