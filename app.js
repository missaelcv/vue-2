Vue.component(' CoinDetail', {

     //se puede Definicir como lo que mandara el componente padre a lo que recibe el componente hijo.
 
  props: ['coin'],    


    data() {           // es una funcion que devuelve un objeto
      return {
        showPrices : false,   //Propiedad 
        value : 0
      }
    },

    methods : {       //Metodo de ShowPrices 
      toggleShowPrices() {
        this.showPrices = !this.showPrices
      }
    },

    computed: {
      convertedValue() {
        if (!this.value) {
          return 0 
        }
        return this.value / this.coin.price
      }
    },

    // Nuevo Componente  
  template: `       
    <div>
  <img 
      v-on:mouseover="toggleShowPrices" 
      v-on:mouseout= "toggleShowPrices" 
      v-bind:src="coin.img" v-bind:alt="coin.name">

  <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red' ">  
  {{ title }}
  <span v-if="coin.changePercent > 0">✌</span>
  <span v-else-if="coin.changePercent < 0">👎</span>
  <span v-else>👎</span>

    <span v-on:click="toggleShowPrices">
    {{ showPrices ?  '😂': '😎'}}</span>
    </h1>

    <input type="number" v-model="value">
    <span>{{ convertedValue }}</span>

    <ul v-show=showPrices>
    <li class="uppercase"
      v-bind:class="{ orange : p.value == coin.price, red: p.value < coin.price, green : p.value > coin.price}"
      v-for="(p,i) in coin.pricesWithDays" 
      v-bind:key="p.day">
      {{ i }} - {{p.day}} - {{ p.value }} </li>
    </ul>
  </div>


</div>
`
})

new Vue ( {
  el: '#app',
  
  data () {
    return {
      name: 'Bitcoin',
      symbol: 'BTC',
      img:  'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      changePercent: -10,
      
      value : 0,
      color : 'f4f4f4',
      price : 8400, 

      pricesWithDays: [
        { day: 'Lunes', value: 8400 },
        { day: 'Martes', value: 7900 },
        { day: 'Miercoles', value: 8200 },
        { day: 'Jueves', value: 9000 },
        { day: 'Viernes', value: 9400 },
        { day: 'Sabado', value: 10000 },
        { day: 'Domingo', value: 10200 }, ],

        showPrices: false
    }
  },

  computed: {
    title () {
      return `${this.name} - ${this.symbol}`
    },

    convertedValue() {
      if (!this.value) {
        return 0 
      }
      return this.value / this.price
    }
  },

  watch : {
    showPrices(newVal, oldVal){
      console.log(newVal, oldVal)
    }
  },

    //Deficinion de Metodo
  methods: {
    toggleShowPrices () {
      this.showPrices = !this.showPrices

      //sacar el hash
      this.color = this.color.split('')
      .reverse().join('')
    }
  }
})