<template>
    <section class="fixture-section">
        <div class="fixtures-wrap">
            <div class="fixture-input">
                <input type="date" class="date" v-model=dateValue> 
                <button class="fixture-search-button" @click="showFixture(dateValue)">경기 찾기 </button>
            </div>
            <div class="showFixt">
                <div v-if="checkNull(fixture)" class="showNull"> 경기가 없습니다.</div>
                <table v-for="(apiCall,i) in fixture" :key="i" @click.stop="$router.push({name:'Fixtures',params:{id:fixture[i].fixture.id},query:{time:fixture[i].fixture.timestamp, date:fixture[i].fixture.date, league:fixture[i].league.name, round:fixture[i].league.round}})">
                    <thead>
                        <th>홈</th>
                        <th>{{translate(fixture[i].league.name)}}</th>
                        <th>어웨이</th>   
                    </thead>
                    <tbody>
                        <tr>
                            <td><img :src="(fixture[i].teams.home.logo)">
                                <br> {{translate(fixture[i].teams.home.name)}}
                            </td>
                            <td>{{timeString(fixture[i].fixture.timestamp)}}</td>
                            <td><img :src="(fixture[i].teams.away.logo)">
                                <br> {{translate(fixture[i].teams.away.name)}}
                            </td>
                        </tr>
                        <tr>
                            <td>{{fixture[i].goals.home}}</td>
                            <td>{{translate(fixture[i].fixture.status.short)}}</td>
                            <td>{{fixture[i].goals.away}}</td>
                        </tr>
                        <tr>
                            <td colspan="3">{{fixture[i].fixture.referee}}
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
        </div>
    </section>
</template>


<script>
import axios from 'axios';
import {translate} from '../js/translate'
import {timeString} from '../js/timeToString'
export default {
    data(){
        return{
            dateValue : '',
            fixture: [] ,
            leagueNum : [39,140,135,78,61],
            loading : true
        }
    },
    methods: { 
        showFixture : function(date) {
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                params: {date: date , timezone: 'Asia/Seoul'},
                headers: {
                'x-rapidapi-key': 'c5c22f4670msh948db228db3150fp12cd4cjsn6d9745526fcd',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                }
            };
            axios.request(options).then(response =>{
            const filterLeague = response.data.response.filter(el =>{
               return el.league.id == 39 || el.league.id == 140 || el.league.id == 135 || el.league.id == 78 || el.league.id == 61
            })
            this.fixture = filterLeague
            this.loading = false
            console.log(this.fixture)
        ;}).catch(error => {
                    console.error(error);
                });    
        },

        getToday: () =>{
                var date = new Date();
                var year = date.getFullYear();
                var month = ("0" + (1 + date.getMonth())).slice(-2);
                var day = ("0" + date.getDate()).slice(-2);

                return year+"-"+ month+"-" + day;
            },
        
        translate,timeString,

        checkNull : (checkArg) =>{
            if(checkArg === "" || checkArg === null || checkArg === undefined ||
            (checkArg !== null && typeof checkArg === "object" && !Object.keys(checkArg).length)){
                return true;
            } else{
                return false;
            }
        }
    },
    created() {
    },
    mounted() {
        this.dateValue = this.getToday()
    },
    watch: {

    },
}
</script>

<style>
    table{
        cursor: pointer;
    }
</style>