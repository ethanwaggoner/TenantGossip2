<script setup>
import {computed, ref} from "vue";

const resources = ref([
  {state: "AL",
  label: "Alabama",
  image: "/flowers/Alabama.jpg",
  links: ["https://www.alabamaag.gov/consumer-complaint/",],
  },
  {state: "AK",
  label: "Alaska",
  image: "/src/assets/flowers/Alaska.jpg",
  links: ["https://law.alaska.gov/department/civil/consumer/cp_complaint.html",]},
  {state: "AZ",
  label: "Arizona",
  image: "/src/assets/flowers/Arizona.jpg",
  links: ["https://www.azag.gov/complaints/consumer",]},
  {state: "AR",
  label: "Arkansas",
  image: "/src/assets/flowers/Arkansas.jpg",
  links: ["https://arkansasag.gov/consumer-protection/home/landlord-and-tenant-rights/",
  "https://arkansasag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "CA",
  label: "California",
  image: "/src/assets/flowers/California.jpg",
  links: ["https://www.calag.gov/consumer-complaint/",
  "https://www.calag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "CO",
  label: "Colorado",
  image: "/src/assets/flowers/Colorado.jpg",
  links: ["https://www.coloradoag.gov/consumer-complaint/",
  "https://www.coloradoag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "CT",
  label: "Connecticut",
  image: "/src/assets/flowers/Connecticut.jpg",
  links: ["https://www.ctag.gov/consumer-complaint/",
  "https://www.ctag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "DE",
  label: "Delaware",
  image: "/src/assets/flowers/Delaware.jpg",
  links: ["https://www.delawareag.gov/consumer-complaint/",
  "https://www.delawareag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "FL",
  label: "Florida",
  image: "/src/assets/flowers/Florida.jpg",
  links: ["https://www.flag.gov/consumer-complaint/",
  "https://www.flag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "GA",
  label: "Georgia",
  image: "/src/assets/flowers/Georgia.jpg",
  links: ["https://www.ga.gov/consumer-complaint/",
  "https://www.ga.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "HI",
  label: "Hawaii",
  image: "/src/assets/flowers/Hawaii.jpg",
  links: ["https://www.hawaiiag.gov/consumer-complaint/",
  "https://www.hawaiiag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "ID",
  label: "Idaho",
  image: "/src/assets/flowers/Idaho.jpg",
  links: ["https://www.idahoag.gov/consumer-complaint/",
  "https://www.idahoag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "IL",
  label: "Illinois",
  image: "/src/assets/flowers/Illinois.jpg",
  links: ["https://www.illinoisag.gov/consumer-complaint/",
  "https://www.illinoisag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "IN",
  label: "Indiana",
  image: "/src/assets/flowers/Indiana.jpg",
  links: ["https://www.inag.gov/consumer-complaint/",
  "https://www.inag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "IA",
  label: "Iowa",
  image: "/src/assets/flowers/Iowa.jpg",
  links: ["https://www.iowaag.gov/consumer-complaint/",
  "https://www.iowaag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "KS",
  label: "Kansas",
  image: "/src/assets/flowers/Kansas.jpg",
  links: ["https://www.ksag.gov/consumer-complaint/",
  "https://www.ksag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "KY",
  label: "Kentucky",
  image: "/src/assets/flowers/Kentucky.jpg",
  links: ["https://www.kyag.gov/consumer-complaint/",
  "https://www.kyag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "LA",
  label: "Louisiana",
  image: "/src/assets/flowers/Louisiana.jpg",
  links: ["https://www.la.gov/consumer-complaint/",
  "https://www.la.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "ME",
  label: "Maine",
  image: "/src/assets/flowers/Maine.jpg",
  links: ["https://www.meag.gov/consumer-complaint/",
  "https://www.meag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "MD",
  label: "Maryland",
  image: "/src/assets/flowers/Maryland.jpg",
  links: ["https://www.mdag.gov/consumer-complaint/",
  "https://www.mdag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "MA",
  label: "Massachusetts",
  image: "/src/assets/flowers/Massachusetts.jpg",
  links: ["https://www.massag.gov/consumer-complaint/",
  "https://www.massag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "MI",
  label: "Michigan",
  image: "/src/assets/flowers/Michigan.jpg",
  links: ["https://www.miag.gov/consumer-complaint/",
  "https://www.miag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "MN",
  label: "Minnesota",
  image: "/src/assets/flowers/Minnesota.jpg",
  links: ["https://www.mnag.gov/consumer-complaint/",
  "https://www.mnag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "MS",
  label: "Mississippi",
  image: "/src/assets/flowers/Mississippi.jpg",
  links: ["https://www.msag.gov/consumer-complaint/",
  "https://www.msag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "MO",
  label: "Missouri",
  image: "/src/assets/flowers/Missouri.jpg",
  links: ["https://www.moag.gov/consumer-complaint/",
  "https://www.moag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "MT",
  label: "Montana",
  image: "/src/assets/flowers/Montana.jpg",
  links: ["https://www.mtag.gov/consumer-complaint/",
  "https://www.mtag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "NE",
  label: "Nebraska",
  image: "/src/assets/flowers/Nebraska.jpg",
  links: ["https://www.neag.gov/consumer-complaint/",
  "https://www.neag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "NV",
  label: "Nevada",
  image: "/src/assets/flowers/Nevada.jpg",
  links: ["https://www.nvag.gov/consumer-complaint/",
  "https://www.nvag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "NH",
  label: "New Hampshire",
  image: "/src/assets/flowers/NewHampshire.jpg",
  links: ["https://www.nhag.gov/consumer-complaint/",
  "https://www.nhag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "NJ",
  label: "New Jersey",
  image: "/src/assets/flowers/NewJersey.jpg",
  links: ["https://www.njag.gov/consumer-complaint/",
  "https://www.njag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "NM",
  label: "New Mexico",
  image: "/src/assets/flowers/NewMexico.jpg",
  links: ["https://www.nmag.gov/consumer-complaint/",
  "https://www.nmag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "NY",
  label: "New York",
  image: "/src/assets/flowers/NewYork.jpg",
  links: ["https://www.nyag.gov/consumer-complaint/",
  "https://www.nyag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "NC",
  label: "North Carolina",
  image: "/src/assets/flowers/NorthCarolina.jpg",
  links: ["https://www.ncag.gov/consumer-complaint/",
  "https://www.ncag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "ND",
  label: "North Dakota",
  image: "/src/assets/flowers/NorthDakota.jpg",
  links: ["https://www.ndag.gov/consumer-complaint/",
  "https://www.ndag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "OH",
  label: "Ohio",
  image: "/src/assets/flowers/Ohio.jpg",
  links: ["https://www.ohag.gov/consumer-complaint/",
  "https://www.ohag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "OK",
  label: "Oklahoma",
  image: "/src/assets/flowers/Oklahoma.jpg",
  links: ["https://www.okag.gov/consumer-complaint/",
  "https://www.okag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "OR",
  label: "Oregon",
  image: "/src/assets/flowers/Oregon.jpg",
  links: ["https://www.orag.gov/consumer-complaint/",
  "https://www.orag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "PA",
  label: "Pennsylvania",
  image: "/src/assets/flowers/Pennsylvania.jpg",
  links: ["https://www.paag.gov/consumer-complaint/",
  "https://www.paag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "RI",
  label: "Rhode Island",
  image: "/src/assets/flowers/RhodeIsland.jpg",
  links: ["https://www.riag.gov/consumer-complaint/",
  "https://www.riag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "SC",
  label: "SouthCarolina",
  image: "/src/assets/flowers/SouthCarolina.jpg",
  links: ["https://www.scag.gov/consumer-complaint/",
  "https://www.scag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "SD",
  label: "SouthDakota",
  image: "/src/assets/flowers/SouthDakota.jpg",
  links: ["https://www.sdag.gov/consumer-complaint/",
  "https://www.sdag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "TN",
  label: "Tennessee",
  image: "/src/assets/flowers/Tennessee.jpg",
  links: ["https://www.tnag.gov/consumer-complaint/",
  "https://www.tnag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "TX",
  label: "Texas",
  image: "/src/assets/flowers/Texas.jpg",
  links: ["https://www.txag.gov/consumer-complaint/",
  "https://www.txag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "UT",
  label: "Utah",
  image: "/src/assets/flowers/Utah.jpg",
  links: ["https://www.utag.gov/consumer-complaint/",
  "https://www.utag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "VT",
  label: "Vermont",
  image: "/src/assets/flowers/Vermont.jpg",
  links: ["https://www.vtag.gov/consumer-complaint/",
  "https://www.vtag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "VA",
  label: "Virginia",
  image: "/src/assets/flowers/Virginia.jpg",
  links: ["https://www.vag.gov/consumer-complaint/",
  "https://www.vag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "WA",
  label: "Washington",
  image: "/src/assets/flowers/Washington.jpg",
  links: ["https://www.wag.gov/consumer-complaint/",
  "https://www.wag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "WV",
  label: "WestVirginia",
  image: "/src/assets/flowers/WestVirginia.jpg",
  links: ["https://www.wvag.gov/consumer-complaint/",
  "https://www.wvag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "WI",
  label: "Wisconsin",
  image: "/src/assets/flowers/Wisconsin.jpg",
  links: ["https://www.wiag.gov/consumer-complaint/",
  "https://www.wiag.gov/resources/contact-us/file-a-consumer-complaint/"]},
  {state: "WY",
  label: "Wyoming",
  image: "/src/assets/flowers/Wyoming.jpg",
  links: ["https://www.wyag.gov/consumer-complaint/",
  "https://www.wyag.gov/resources/contact-us/file-a-consumer-complaint/"]}
])

const search = ref("");

const filteredCards = computed(() => {
  return resources.value.filter(card => {
    return card.label.toLowerCase().includes(search.value.toLowerCase()) ||
        card.state.toLowerCase().includes(search.value.toLowerCase())
   })
})
</script>

<template>
  <div class="search-container">
    <input type="text" placeholder="Find your state" v-model="search" class="search-input"/>
  </div>
  <div class="container">
    <div class="card" v-for="state in filteredCards" :key="state.label">
      <div class="card-header">
        <img :src="state.image" :alt="`Image of ${state.label}`">
        <h3>{{ state.label }}</h3>
      </div>
      <div class="card-body">
        <ul class="links">
          <li v-for="link in state.links" :key="link">
            <a :href="link">{{ link }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 20px;
  width: 100%;
  overflow-y: auto;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  color: white;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card-header {
  position: relative;
  text-align: center;
  padding: 10px;
}

.card-header img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.card-header h3 {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  width: calc(100% - 20px);
  padding: 5px;
  border-radius: 10px;
}

.card-body {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.links {
  list-style-type: none;
  padding: 0;
}

.links li {
  margin-bottom: 10px;
  color: white;
}

a {
  transition: color 0.3s ease;
}

a:hover {
  color: #FFFFFF;
  text-decoration: underline;
}

.card:hover {
  transform: translateY(-5px);
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.links {
  padding: 10px;
  list-style-type: none;
}

a {
  color: cornflowerblue;
  text-decoration: none;
}

.search-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.search-input {
  width: 50%;
  border-radius: 10px;
  border: 2px solid #4A00E0;
  font-size: 16px;
  padding: 10px;
}

.search-input:focus {
  outline: none;
  border-color: #8E2DE2;
}
</style>
