<template>
    <div>
        <div class="row filters-page__filter-bar-container">
            <filter-bar v-model="searchQuery" class="filters-page__filter-bar" label="Search"/>
        </div>
        <table class="table table-striped first-td-padding">
            <thead>
                <tr>
                    <td>index</td>
                    <td>username</td>
                    <td>exp</td>
                    <td>trophies</td>
                    <td>coins</td>
                    <td> </td>
                </tr>
            </thead>
            <tbody>
                <tr id="row">
                    <td>{{rows[0].index}}</td>
                    <td>{{rows[0].username}}</td>
                    <td>{{rows[0].experience}}</td>
                    <td>{{rows[0].trophies}}</td>
                    <td>{{rows[0].coins}}</td>
                    <td><button class="btn btn-primary btn-with-icon rounded-icon" id="info"
                    @click.stop.prevent="showUser(rows[0].userneame)">
                        <div class="btn-with-icon-content" id="infoic">
                            <i class="entypo entypo-info"></i>
                        </div>
                    </button></td>
                </tr>
                <tr id="row">
                    <td>{{rows[1].index}}</td>
                    <td>{{rows[1].username}}</td>
                    <td>{{rows[1].experience}}</td>
                    <td>{{rows[1].trophies}}</td>
                    <td>{{rows[1].coins}}</td>
                    <td><button class="btn btn-primary btn-with-icon rounded-icon" id="info"
                    @click.prevent.stop="showUser(rows[1].username)">
                        <div class="btn-with-icon-content" id="infoic">
                            <i class="entypo entypo-info"></i>
                        </div>
                    </button></td>
                </tr>
                <tr id="row">
                    <td>{{rows[2].index}}</td>
                    <td>{{rows[2].username}}</td>
                    <td>{{rows[2].experience}}</td>
                    <td>{{rows[2].trophies}}</td>
                    <td>{{rows[2].coins}}</td>
                    <td><button class="btn btn-primary btn-with-icon rounded-icon" id="info"
                    @click.prevent.stop="showUser(rows[2].username)">
                        <div class="btn-with-icon-content" id="infoic">
                            <i class="entypo entypo-info"></i>
                        </div>
                    </button></td>
                </tr>
                <tr></tr>
                <tr></tr>
                
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default { 
    name: 'Users',
    data(){
        return{
            apiUrl: 'http://193.176.243.42:254/getUsers',
            index: 1,
            rows: [],
            searchQuery: ''
        }       
    },
    methods:{
        mountTableRow(usr, exp, trp, coin){
            console.log('PUTTING')
            const row = {
                template: `<tr><td>546</td><td>{{username}}</td><td>{{exper}}</td><td>{{trophy}}</td><td>{{coins}}</td></tr><div id="row"></div>`,
                data(){
                    return{
                        index: 1,
                        username: usr,
                        exper: exp,
                        trophy: trp,
                        coins: coin
                    }
                }
            } 
           
        },
        insertRow(usr, exp, trp, coin){
            this.rows.push({
                index: this.index,
                username: usr,
                experience: exp,
                trophies: trp,
                coins: coin
            });
            this.index++;
        },
        takeNextChunk(chunkNum){
            //TODO: add pagination api to the server
        }
    },
    mounted(){
        axios.get('http://193.176.243.42:254/getUsers', {})
        .then((res) => {
                console.log(res.data);
                res.data.forEach(elm => {
                    this.insertRow(elm.username, elm.experience, elm.trophies, elm.coins);
                    console.log(elm.username);
                    
                });
                console.log(this.rows);
            }).catch((err) => {
                if(err.response.status === 401){
                    this.$router.replace({name: 'login'});
                }else if(err.response.status === 403){
                    this.$router.replace();
                }
        })
    }
}
</script>

<style>

    
</style>
