<template>
    <article v-if="loaded" class="players-article">
        <div class="season-select-options"> 
                <select> 
                    <option v-for="(season,i) in seasons" :key="i" :value="(seasons[i])">{{seasons[i]}}</option>
                </select>
            </div>
        <div class="player-info">
            <img :src="(stats[0].player.photo)">
                <table>
                    <tr>
                        <td>이름</td><td>{{stats[0].player.name}}</td>
                    </tr>
                    <tr>
                        <td>풀네임</td> <td>{{stats[0].player.firstname}} {{stats[0].player.lastname}} </td>
                    </tr>

                    <tr>
                        <td>키/몸무게</td> <td>{{stats[0].player.height}} / {{stats[0].player.weight}}</td>
                    </tr>
                    <tr>
                        <td>생년월일</td> <td>{{stats[0].player.birth.date}}</td>
                    </tr>
                    <tr>
                        <td>나이</td> <td>{{stats[0].player.age}}</td>
                    </tr>
                    <tr>
                        <td>국적</td> <td>{{stats[0].player.nationality}}</td>
                    </tr>
                </table>
        </div>
        <div class="player-stat-table">
            <table>
                <thead>
                    <th colspan="6">
                        <select v-model="league">
                            <option v-for="(stat,i) in stats[0].statistics" :key="i" :value="(i)"> {{translate(stats[0].statistics[i].team.name)}} - {{translate(stats[0].statistics[i].league.name)}} </option>
                        </select>
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="4" class="table-sect">출전</td> 
                        <td>전체 출전</td>
                        <td>선발</td>
                        <td>출전 시간</td>
                    </tr>
                    <tr>
                        <td>{{Number(stats[0].statistics[league].games.appearences)}}</td>
                        <td>{{Number(stats[0].statistics[league].games.lineups)}}</td> 
                        <td>{{Number(stats[0].statistics[league].games.minutes)}}분</td> 
                        
                    </tr>
                    <tr>
                        <td>교체 출전</td>
                        <td>교체 아웃 </td>
                        <td>벤치 </td>
                    </tr>
                    <tr>
                        <td>{{Number(stats[0].statistics[league].substitutes.in)}}</td>
                        <td>{{Number(stats[0].statistics[league].substitutes.out)}}</td>
                        <td>{{Number(stats[0].statistics[league].substitutes.bench)}} </td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="table-sect">골/어시</td>
                        <td>골 </td>
                        <td>어시스트</td>
                        <td>평점</td>
                    </tr>
                    <tr>
                        <td>{{Number(stats[0].statistics[league].goals.total)}} </td>
                        <td>{{Number(stats[0].statistics[league].goals.assists)}} </td>
                        <td>{{(stats[0].statistics[league].games.rating).substring(0,4)}} </td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="table-sect">패스</td>
                        <td>전체 패스</td>
                        <td>키 패스</td>
                        <td>정확한 패스</td>
                    </tr>
                    <tr>
                        <td>{{Number(stats[0].statistics[league].passes.total)}}</td>
                        <td>{{Number(stats[0].statistics[league].passes.key)}}</td>
                        <td>{{Number(stats[0].statistics[league].passes.accuracy)}}</td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="table-sect">슈팅 </td>
                        <td>전체 슈팅</td>
                        <td>유효 슈팅</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{{Number(stats[0].statistics[league].shots.total)}}</td>
                        <td>{{Number(stats[0].statistics[league].shots.on)}}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="table-sect">공중볼</td>
                        <td>경합 시도</td>
                        <td>경합 성공</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{{Number(stats[0].statistics[league].duels.total)}}</td>
                        <td>{{Number(stats[0].statistics[league].duels.won)}}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="table-sect">드리블</td>
                        <td>드리블 시도</td>
                        <td>드리블 성공</td>
                        <td></td>
                    </tr>
                     <tr>
                        <td>{{Number(stats[0].statistics[league].dribbles.attempts)}}</td>
                        <td>{{Number(stats[0].statistics[league].dribbles.success)}}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="table-sect">수비</td>
                        <td>전체 태클</td>
                        <td>가로챔</td>
                        <td>공 차단</td>
                    </tr>
                    <tr>
                        <td>{{Number(stats[0].statistics[league].tackles.total)}}</td>
                        <td>{{Number(stats[0].statistics[league].tackles.interceptions)}}</td>
                        <td>{{Number(stats[0].statistics[league].tackles.blocks)}}</td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="table-sect">PK</td>
                        <td>득점</td>
                        <td>실축</td>
                        <td>세이브</td>
                    </tr>
                    <tr>
                        <td>{{Number(stats[0].statistics[league].penalty.scored)}}</td>
                        <td>{{Number(stats[0].statistics[league].penalty.missed)}}</td>
                        <td>{{Number(stats[0].statistics[league].penalty.saved)}}</td>
                    </tr>
                     <tr>
                        <td rowspan="2" class="table-sect">카드</td>
                        <td>옐로우</td>
                        <td>레드</td>
                        <td>다이렉트 퇴장</td>
                    </tr>
                    <tr>
                        <td>{{Number(stats[0].statistics[league].cards.yellow)}}</td>
                        <td>{{Number(stats[0].statistics[league].cards.red)}}</td>
                        <td>{{Number(stats[0].statistics[league].cards.yellowred)}}</td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="table-sect">파울</td>
                        <td>횟수</td>
                        <td>피파울</td>
                        <td>PK 헌납</td>
                    </tr>
                     <tr>
                        <td>{{Number(stats[0].statistics[league].fouls.committed)}}</td>
                        <td>{{Number(stats[0].statistics[league].fouls.drawn)}}</td>
                        <td>{{Number(stats[0].statistics[league].penalty.commited)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </article>
</template>

<script>
import axios from "axios";
import {translate} from '../js/translate.js'
export default {
    data() {
        return {
            stats : [] ,
            playerID : '',
            loaded : false,
            seasons : [],
            league : '',
        }
    },
   methods: {
        showPlayerStat :async function() {
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/players',
                params: {id: this.playerID , season: '2020'},
                headers: {
                    'x-rapidapi-key': 'c5c22f4670msh948db228db3150fp12cd4cjsn6d9745526fcd',
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                }
            };
            try {
                const response = await axios.request(options)
                this.stats = response.data.response
                console.table(response.data.response)
                this.loaded = true;
            } catch(error) {
                console.error(error);
            }
        },
        getPlayerSeason : async function (){
           const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/players/seasons',
            params: {player: this.playerID },
            headers: {
                'x-rapidapi-key': 'c5c22f4670msh948db228db3150fp12cd4cjsn6d9745526fcd',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options)
            this.seasons = response.data.response
            console.log(this.seasons)
        } catch(error){
            console.error(error);
        }
        },
        checkNull : (checkArg) =>{
            if(checkArg === "" || checkArg === null || checkArg === undefined ||
            (checkArg !== null && typeof checkArg === "object" && !Object.keys(checkArg).length)){
                return "0"
            } else{
                return checkArg;
            }
        },
        translate
    },
   created() {
       this.playerID = '29'
       this.league = '0'
       this.showPlayerStat()
       this.getPlayerSeason()
   },
   watch: {
       league (newVal){
           this.league = newVal
           console.log(this.league)
       }
   }

}
</script>

<style>

</style>