<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <section>
        <div class="flex">
          <div class="max-w-xs">
            <label for="wallet" class="block text-sm font-medium text-gray-700"
              >Тикер</label
            >
            <div class="mt-1 relative rounded-md shadow-md">
              <input
                type="text"
                name="wallet"
                id="wallet"
                class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="Например DOGE"
                v-model="ticker"
              />
            </div>
            <div class="text-sm text-red-600">Такой тикер уже добавлен</div>
          </div>
        </div>
        <button
          type="button"
          @click="add"
          class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <!-- Heroicon name: solid/mail -->
          <svg
            class="-ml-0.5 mr-2 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#ffffff"
          >
            <path
              d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            ></path>
          </svg>
          Добавить
        </button>
      </section>

      <hr class="w-full border-t border-gray-600 my-4" />
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          v-for="(ticker, idx) in tickers"
          :key="'ticker' + idx"
          @click="select(ticker)"
          :class="selectedTicker === ticker ? 'border-4' : ''"
          class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
        >
          <div class="px-4 py-5 sm:p-6 text-center">
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ ticker.name }} - USD
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              {{ ticker.price }}
            </dd>
          </div>
          <div class="w-full border-t border-gray-200"></div>
          <button
            @click.stop="deleteTicker(ticker)"
            class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#718096"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path></svg
            >Удалить
          </button>
        </div>
      </dl>
      <hr class="w-full border-t border-gray-600 my-4" />
      <section class="relative" v-if="selectedTicker">
        <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
          {{ selectedTicker.name }} - USD
        </h3>
        <div class="flex items-end border-gray-600 border-b border-l h-64">
          <div
            v-for="(bar, idx) in normalizeGraph()"
            :key="'bar' + idx"
            :style="{ height: `${bar}%`, 'min-heigth': '5px' }"
            class="bg-purple-800 border w-10"
          ></div>
        </div>
        <button
          type="button"
          class="absolute top-0 right-0"
          @click="selectedTicker = null"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:svgjs="http://svgjs.com/svgjs"
            version="1.1"
            width="30"
            height="30"
            x="0"
            y="0"
            viewBox="0 0 511.76 511.76"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
                fill="#718096"
                data-original="#000000"
              ></path>
            </g>
          </svg>
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import { loadTicker } from "@/api.js";

export default {
  name: "home-page",
  data() {
    return {
      ticker: "",
      api_key:
        "0324c7a2351023626af2970665500fa37f105e33714c76344a8611428cf8e336",
      tickers: [],
      selectedTicker: null,
      graph: [],
    };
  },
  methods: {
    add() {
      // передалал метод для большей читаемости ( метод вызывает метод )
      const currentTicker = {
        name: this.ticker,
        price: "-",
        intervalId: null, // Добавляем переменную для хранения идентификатора интервала
      };
      this.tickers.push(currentTicker);
      // this.updateTicker(currentTicker)
    },
    async updateTicker() {
      // переработаный метод пофиксил логику удаления интервалов из-за того что мы сейчас запрашиваем сразу, кучу монеток и если их нет , то ничего не запрашиваем
      if (!this.tickers.length) return;
      // убрали сет инвервал и переделали метод, так чтобы апи принимала все наши тикеры
      // tickerName.intervalId = setInterval(async () => {
      // ниже при вызове loadTicker перебираем все тикеры и передаем в метод все неймы
      const excahngeData = await loadTicker(this.tickers.map((t) => t.name));
      // тут мы мутируем массив tickers чтобы обновлятьв нем цену из-за такого кода мы мужем убрать this.tickers.find((t) ....
      this.tickers.forEach((ticker) => {
        const price = excahngeData[ticker.name.toUpperCase()];
        // из-за то что мы сменили апи и получаем 1 долар к тикеры, а не как раньше ,то цену нужно изменить
        // раньше сработал бы такой вариант ticker.price = price
        // добавляем фогику отформатированой цены
        if (!ticker.price) {
          ticker.price = "-";
          return;
        }
        // если все ок, мы форматируем цену чтобы она показывала цену за 1 тикер в валюте
        const normalizedPrice = 1 / price;
        const formatedPrice =
          normalizedPrice > 1
            ? normalizedPrice.toFixed(2)
            : normalizedPrice.toPrecision(2);

        ticker.price = formatedPrice;
      });
      // this.tickers.find((t) => t.name === tickerName.name).price =
      //   excahngeData.USD > 1
      //     ? excahngeData.USD.toFixed(2)
      //     : excahngeData.USD.toPrecision(2);
      // if (this.selectedTicker?.name === tickerName.name) {
      //   this.graph.push(excahngeData.USD);
      // }
      // }, 3000);
      this.ticker = "";
    },
    deleteTicker(tickerToRemove) {
      const tickerIndex = this.tickers.findIndex((el) => el === tickerToRemove);
      if (tickerIndex !== -1) {
        const ticker = this.tickers[tickerIndex];
        clearInterval(ticker.intervalId); // Остановка интервала
        this.tickers.splice(tickerIndex, 1);
      }
    },
    normalizeGraph() {
      const maxValue = Math.max(...this.graph);
      const minValue = Math.min(...this.graph);
      return this.graph.map(
        (price) => ((price - minValue) * 100) / (maxValue - minValue)
      );
    },
    select(ticker) {
      this.selectedTicker = ticker;
      this.graph = [];
    },
  },
  created() {
    setInterval(this.updateTicker, 5000);
  },
};
</script>

<style scoped src="~/static/app.css"></style>
<style lang="scss" scoped>
</style>
