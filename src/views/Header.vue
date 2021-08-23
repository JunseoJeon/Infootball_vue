<template>
    <header>
        <nav>
            <a href="/"><img src="../assets/logo.png"></a>
            <div class="nav-links">
                <span @click.stop="$router.push({name:'Leagues'})">리그</span>
                <span> 팀 </span>
                <span  @click.stop="$router.push({name:'Players'})"> 선수 </span>
                <span @click.stop="$router.push({name:'Fixtures', params:{id: '592825'}})"> 경기 </span>
            </div>
        </nav>
        
        
       
    </header>
</template>

<script>
export default{
    name: "Header",
}
</script>

<style>
 header{
        position: fixed;
        background-color: #320a45;
        width: 100%;
        height: 40px;
        padding: 12px 24px;
        color: azure;
        font-size: 23px;
        font-weight: bold;
        border-bottom: #12926c 4px solid;
        z-index: 99;
 }

header img{
     width: 200px;
     height: 40px;
 }
nav{
    display: flex;
}
.nav-links{
    padding-top: 5px;
    margin-left: 20px;
}
span:hover{
    cursor: pointer;
}
</style>
