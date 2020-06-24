<template>
    <v-container id="oasis">
            <v-navigation-drawer
                v-model="drawer"
                app
                fluid
                clipped
                left
                >
                <v-list dense>
                    <v-list-item
                        v-for="menu in menuList"
                        :key="menu.prog_cd"
                        @click="drawerClick(menu.prog_nm)">
                            <v-list-item-icon>
                                <v-icon>{{ menu.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{ menu.prog_nm }}</v-list-item-title>
                            </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar
                color="blue"
                app
                flat
                fixed
                clipped-left
                >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Oasis</v-toolbar-title>
                <v-spacer/>
                <div>
                    <v-icon
                        @click="logout()"
                        >mdi-logout</v-icon>
                </div>
            </v-app-bar>
            
            <v-content
                class="pa-0 ma-0"
            >
                <v-container
                    fluid
                    >
                    <v-layout
                        wrap fill-height fill-width>
                        <v-tabs 
                            v-model="tab"
                            slider-color="red"
                            color="blue"
                            >
                            <v-tab
                                v-for="(tabItem, index) in tabItems"
                                :key="tabItem"
                                @change="updateRouter(tabItem)"
                                >
                                <div>
                                    {{tabItem}}
                                    <span v-if="tabItem!=='Dashboard'">
                                    <v-icon 
                                        small
                                        @click="deleteTab(tabItem, index)">mdi-cancel</v-icon>
                                    </span>
                                </div>
                            </v-tab>
                            <v-spacer/>
                            <v-menu
                                v-if="moreItems.length>3"
                            >
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    text
                                    class="align-self-center mr-4"
                                    v-on="on"
                                >
                                    more
                                    <v-icon right>mdi-menu-down</v-icon>
                                </v-btn>
                                </template>

                                <v-list>
                                <v-list-item
                                    v-for="tabItem in moreItems"
                                    :key="tabItem"
                                    active-class="border"
                                    @click="updateRouter(tabItem)"
                                >
                                    {{ tabItem }}
                                </v-list-item>
                                </v-list>
                            </v-menu>

                            <v-tab-item
                                v-for="tabItem in tabItems"
                                :key="tabItem"
                            >
                                <companyInfo v-if="tabItem==='CompanyInfo'"></companyInfo>
                                <dashboard v-else-if="tabItem==='Dashboard'"></dashboard>
                                <vocInfo v-else-if="tabItem==='VocInfo'"></vocInfo>
                                <error v-else></error>

                            </v-tab-item>
                        </v-tabs>
                    </v-layout>
                </v-container>
            </v-content>
    </v-container>
</template>

<script>

import companyInfo from '../views/CompanyInfo.vue'
import error from '../views/Error.vue'
import dashboard from '../views/Dashboard.vue'
import vocInfo from '../views/VocInfo.vue'

import dummyMenuList from '../dummy_json/menuList.json'

export default {
    components:{
        companyInfo,
        vocInfo,
        error,
        dashboard
    },
    data(){
        return{
            drawer : null,
            mini : true,
            menuList : [],
            tab : 0,
            tabItems : ["Dashboard"],
            moreItems : ["All Close"],
        }
    },
    created() {
        console.log("Main Created"+this.$store.state.token)
        //메인화면 생성 시, 메뉴리스트를 불러옴
        //권한은 로그인 시, 저장된 토큰 값으로 파라미터 넘김
        // this.$http.post('http://localhost:7070/menuList',{role:this.$store.state.role})
        //     .then(res=>{
        //         console.log(res)
        //         this.menuList = res.data
        //     })
        //     .catch(err =>{
        //         console.log(err)
        //     })
        this.menuList = dummyMenuList
    },
    methods : {
        logout(){
            this.$router.push("/")
        },
        drawerClick(menuName){
            //열려 있는 창이 있을 경우 포커싱되도록
            //없을 경우 신규로 라우팅 처리
            console.log(this.tabItems)
            console.log(menuName)

            if(this.tabItems.indexOf(menuName)<0){
                this.tabItems.push(menuName)
                this.moreItems.push(menuName)
            }
            
            //포커싱 되도록
            // console.log(this.tabItems.indexOf(menuName))
            this.tab = this.tabItems.indexOf(menuName)
        },
        deleteTab(tabItem, index){
            //탭 삭제 (배열삭제, 삭제 시, 이전 탭 보여주도록 라우팅)
            //var sel = index 
            this.tabItems.splice(index,1)
            this.moreItems.splice(index,1)
        },
        updateRouter(name){
            //모두 닫더라도 메인인 dashboard는 살리고 포커싱되도록
            if(name=="All Close"){
                this.tabItems = ["dashboard"]
                this.moreItems = ["All Close"]
                this.tab = this.tabItems.indexOf("dashboard")
                return
            }
            console.log(this.tabItems)
            this.tab = this.tabItems.indexOf(name)
        },
   
    }
}
</script>

<style>
.border{
    border-left: 40px solid red;
}
</style>