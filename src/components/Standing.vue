<template>
    <section class="standing-section"> 
        <div class="select-season">
            <select name="season" id="season-select" v-model="season">
                <option value="2010">10-11 시즌</option>
                <option value="2011">11-12 시즌</option>
                <option value="2012">12-13 시즌</option>
                <option value="2013">13-14 시즌</option>
                <option value="2014">14-15 시즌</option>
                <option value="2015">15-16 시즌</option>
                <option value="2016">16-17 시즌</option>
                <option value="2017">17-18 시즌</option>
                <option value="2018">18-19 시즌</option>
                <option value="2019">19-20 시즌</option>
                <option value="2020">20-21 시즌</option>
                <option value="2021" selected>21-22 시즌</option>
            </select>
            <select v-model="id">
                <option value="default" @click="(selected = false)" selected disabled hidden> 리그 선택 </option>
                <option v-for="(league,i) in leagues" :key="i" :value="(leagues[i].Id)" @click="(selected = true)"> {{leagues[i].name}}</option>
            </select>
        </div>

        <div class="table-wrap">
            <div v-if="!selected">
                <div  class="showNull">순위를 볼 리그를 선택 해주세요.</div>
            </div>
            <table class="standing-table" v-show="selected">
                <thead>
                    <th v-for="(thead,i) in theads" :key="i">{{theads[i]}}</th>
                </thead>
                <tbody>
                    <tr v-for="(standing,i) in standings" :key="i">
                        <td>{{standings[i].rank}}</td>
                        <td><img :src="(standings[i].team.logo)"></td>
                        <td>{{translate(standings[i].team.name)}}</td>
                        <td>{{standings[i].all.played}}</td>
                        <td>{{standings[i].all.win}}</td>
                        <td>{{standings[i].all.draw}}</td>
                        <td>{{standings[i].all.draw}}</td>
                        <td>{{standings[i].points}}</td>
                        <td>{{standings[i].all.goals.for}}</td>
                        <td>{{standings[i].all.goals.against}}</td>
                        <td>{{standings[i].goalsDiff}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import {translate} from '../js/translate.js'

export default {
    data() {
        return {
            topPlayers: [],
            standings : [],
            id : 'default',
            season : 2020,
            theads : ["순위","","팀이름","경기수","승점","승","패","무","득점","실점","득실차"],
            leagues : [
                {
                    name : "잉글랜드 프리미어리그",
                    Id : "39"
                },
                {
                    name : "스페인 라리가",
                    Id : "140"
                },
                {
                    name : "독일 분데스리가",
                    Id : "78"
                },
                {
                    name : "이탈리아 세리에 A",
                    Id : "135"
                },
                {
                    name : "프랑스 리그 1",
                    Id : "61"
                },
            ],
            kinds : 'topscorers',
            selected : false,
        }
    },
    methods: {
        showStanding : function(season,leagueId) {
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
                params: {season: season, league: leagueId},
                headers: {
                    'x-rapidapi-key': 'c5c22f4670msh948db228db3150fp12cd4cjsn6d9745526fcd',
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                }
            };

            axios.request(options).then((response) => {
                this.standings = response.data.response[0].league.standings[0]
                this.selected = true;
            }).catch(function (error) {
                console.error(error);
            });

        },
        showTopPl : function(season,leagueId,kind){
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/players/'+kind,
                params: {league: leagueId , season: season},
                headers: {
                    'x-rapidapi-key': 'c5c22f4670msh948db228db3150fp12cd4cjsn6d9745526fcd',
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                }
            };

            axios.request(options).then((response) =>{
                this.topPlayers = response.data.response
                this.selected = true;
            }).catch(function (error) {
                console.error(error);
            });
        },
        getButtonVal : function(e){
            const value = e.target.value
            console.log(value)
            this.id = value
        },
        translate,

        checkNull : (checkArg) =>{
            if(checkArg === "" || checkArg === null || checkArg === undefined ||
            (checkArg !== null && typeof checkArg === "object" && !Object.keys(checkArg).length)){
                return "0"
            } else{
                return checkArg;
            }
        }
    },
    created(){
    },

    watch:{
        season (value){
            this.showStanding(value,this.id)
            this.showTopPl(value,this.id,this.kinds)
        },
        id (value){
            this.showStanding(this.season,value)
            this.showTopPl(this.season,value,this.kinds)
            console.log(value)
        },
        kinds (value){
            this.showTopPl(this.season,this.id,value)
        }
    } 
}
</script>

<style>

</style>