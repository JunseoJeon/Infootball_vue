<template>
    <div class="fixture-info-wrap">
        <nav class="select-nav">
            <div>
                <button>경기 이벤트</button>
            </div>
            <div> <button @click="[getBtnValue($event),setLoaded()]" value="Info">
                경기 기록
            </button></div>
            <div>
            <button @click="[getBtnValue($event),getLineup()]" value="lineup">
                라인 업
            </button></div>
            
           
        </nav>
        <div v-if="selectKind === 'lineup' && loaded" class="lineup-wrap">
            <div v-for="(index,j) in lineupArr" :key="j" class="lineups">
                <div>
                    <span class="lineup-team-name-logo"><img :src="(lineups[j].team.logo)"> {{lineups[j].team.name}} <span>{{lineups[j].formation}} </span> </span> 
                    <br>
                    <div class="lineup-coach"> 감독 <img :src="(lineups[j].coach.photo)">  {{lineups[j].coach.name}}</div>
                </div>
                <div class="show-lineup">
                    <span  v-for="(XI,i) in lineups[j].startXI" :key="i"
                        :style="{gridRow : lineups[j].startXI[i].player.grid.substring(0,1), 
                                 gridColumn: lineups[j].startXI[i].player.grid.substring(2,3) }">
                        <img :src="'https://media.api-sports.io/football/players/'+(lineups[j].startXI[i].player.id)+'.png'"> 
                        <br> {{lineups[j].startXI[i].player.name}} {{lineups[j].startXI[i].player.pos}} {{lineups[j].startXI[i].player.number}} </span>
                </div>
            </div>   
        </div>



        <table v-if="selectKind === 'Info' && loaded" class="fixture-info-table">
            <thead> 
                <tr>
                    <th>홈</th><th> {{fixtureLeague}} </th><th>어웨이</th>
                </tr>
                <tr>
                    <th><img :src="(statics[0].team.logo)"></th>
                    <th><p>{{fixtureRound}}</p>
                    <p>{{fixtureDate.substring(0,10)}}</p>
                    <p>{{timeString(fixtureTime)}}</p></th>
                    <th><img :src="(statics[1].team.logo)"></th>
                </tr>
                <tr>
                    <th>{{statics[0].team.name}}</th>
                    <th> </th>
                    <th>{{statics[1].team.name}} </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{Number(statics[0].statistics[2].value)}} </td> <td>전체 슈팅</td> <td>{{Number(statics[1].statistics[2].value)}} </td>
                </tr>
                <tr>
                    <td>{{Number(statics[0].statistics[0].value)}}</td> <td>유효 슈팅</td> <td>{{Number(statics[1].statistics[0].value)}} </td>
                </tr>
                <tr>
                    <td>{{Number(statics[0].statistics[4].value)}}</td> <td>박스 안 슈팅</td> <td>{{Number(statics[1].statistics[4].value)}} </td>
                </tr>
                 <tr>
                    <td>{{Number(statics[0].statistics[5].value)}} </td> <td>박스 밖 슈팅 </td> <td>{{Number(statics[1].statistics[5].value)}} </td>
                </tr>
                 <tr>
                    <td>{{Number(statics[0].statistics[3].value)}} </td> <td>막힌 슈팅 </td> <td>{{Number(statics[1].statistics[3].value)}} </td>
                </tr>
                 <tr>
                    <td>{{Number(statics[0].statistics[6].value)}} </td> <td>파울</td> <td>{{Number(statics[1].statistics[6].value)}} </td>
                </tr>
                 <tr>
                    <td>{{Number(statics[0].statistics[7].value)}} </td> <td> 코너킥 </td> <td>{{Number(statics[1].statistics[7].value)}} </td>
                </tr>
                 <tr>
                    <td>{{Number(statics[0].statistics[8].value)}} </td> <td>오프사이드 </td> <td>{{Number(statics[1].statistics[8].value)}} </td>
                </tr>
                 <tr>
                    <td>{{statics[0].statistics[9].value}} </td> <td>공 점유율</td> <td>{{(statics[1].statistics[9].value)}} </td>
                </tr>
                 <tr>
                    <td>{{Number(statics[0].statistics[13].value)}} </td> <td>전체 패스</td> <td>{{Number(statics[1].statistics[13].value)}} </td>
                </tr>
                 <tr>
                    <td>{{statics[0].statistics[14].value}} </td> <td>패스 성공</td> <td>{{statics[1].statistics[14].value}}  </td>
                </tr>
                 <tr>
                    <td>{{statics[0].statistics[15].value}} </td> <td>패스 성공률</td> <td> {{statics[1].statistics[15].value}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import {timeString} from '../js/timeToString.js'
import {translate} from '../js/translate.js'
import {checkNull} from '../js/checkNull.js'
export default {
    data() {
        return {
            statics : [],
            params : '',
            lineups : [],
            loaded : false, 
            fixtureDate : this.$route.query.date,
            fixtureLeague : this.$route.query.league,
            fixtureTime : this.$route.query.time,
            fixtureRound : this.$route.query.round,
            selectKind : '',
            fixtureId: this.$route.params.id,
            lineupArr: [0,1],
            isGetLineups: false
        }
    },
    methods: {
        getFixtureStatics: async function(){
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics',
                params: {fixture: this.fixtureId},
                headers: {
                    'x-rapidapi-key': 'c5c22f4670msh948db228db3150fp12cd4cjsn6d9745526fcd',
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                }
            };
            try{
                const response = await axios.request(options)
                this.statics = response.data.response
                console.log(response.data)
                this.loaded = true;
                console.log(this.$route.query)
            }
            catch(error){
                console.error(error);
            }
        },
        getLineup : async function(){
            if(!this.isGetLineups){
                const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups',
                params: {fixture: this.fixtureId},
                headers: {
                    'x-rapidapi-key': 'c5c22f4670msh948db228db3150fp12cd4cjsn6d9745526fcd',
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                }
            };
            try{
                const response = await axios.request(options)
                this.lineups = response.data.response
                console.log(response.data.response)
                this.loaded = true;
                this.isGetLineups = true;   }
            catch(error){
                console.error(error);
            }
        }
            else{
                this.loaded = true
            }
        },
        getBtnValue: function(e){
            this.loaded = false
            const btnValue = e.target.value
            this.selectKind = btnValue
            console.log(this.selectKind)
            console.log(this.loaded)
        },
        setLoaded : function(){
            this.loaded = true
        },
        timeString,translate,checkNull
    },
    created() {
       this.params = this.$route.params
       this.selectKind = 'Info'
    },
    watch: {
        params(newVal){
            this.params = newVal
            console.log('변화 감지')
            this.getFixtureStatics()
        }
    }
}


</script>

<style>

</style>