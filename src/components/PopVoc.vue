<template>
    <v-card height="750px" >
        <v-card-title>
            <span class="headline">Issue 등록</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12" sm="6" md="3">
                            <v-select
                                v-model="editItem.code"
                                :items="cateList"
                                item-text="category"
                                item-value="code"
                                label="등록유형"
                                :rules="[v => !!v || 'Item is required']"
                                required
                                >
                            </v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-autocomplete
                                v-model="editItem"
                                :items="comList"
                                color="red"
                                item-text="comp_name"
                                item-value="com_cd"
                                label="회사명"
                                placeholder="회사명을 입력하세요"
                                prepend-icon="mdi-database-search"
                                return-object
                                :rules="[v => !!v || 'Item is required']"
                                required
                                >
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field 
                                v-model="editItem.com_cd" 
                                label="Company Code"
                                readonly
                                :rules="[v => !!v || 'Item is required']"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field 
                                v-model="editItem.sol_gbn" 
                                label="Solution" 
                                readonly
                                :rules="[v => !!v || 'Item is required']"
                                requried></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Date Picker-->
                    <v-row>
                        <v-col cols="12" lg="6" sm="6">
                            <v-menu
                            v-model="fromMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                v-model="fromDate"
                                label="From Date"
                                hint="YYYY/MM/DD format"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                v-on="on"
                                :rules="basicRulse"
                                required
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="fromDate" no-title @input="fromMenu = false"></v-date-picker>
                            </v-menu>
                            <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
                        </v-col>
                        
                        <v-col cols="12" lg="6" sm="6">
                            <v-menu
                            v-model="toMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                v-model="toDate"
                                label="To Date"
                                hint="YYYY/MM/DD format"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                v-on="on"
                                :rules="basicRulse"
                                required
                                ></v-text-field>
                            </template>
                            <v-date-picker 
                                v-model="toDate" 
                                no-title 
                                show-current
                                @input="toMenu = false"></v-date-picker>
                            </v-menu>
                            <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
                        </v-col>
                    </v-row>
                    <!-- title -->
                    <v-row>
                        <v-col cols="12" lg="12" sm="12" md="12">
                            <v-text-field v-model="editItem.title" 
                            label="Title"
                            :rules="basicRulse"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pa-1" cols="12" lg="12" sm="12" md="12">
                            <v-textarea
                                outlined
                                label="Text"
                                v-model="editItem.text"
                                :rules="basicRulse"
                                required
                                >
                            </v-textarea>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col class="pa-1 ma-1" cols="12" lg="12" sm="12" md="12">
                            <!-- <v-stepper v-model="editItem.stat">
                                <v-stepper-header>
                                    <v-stepper-step
                                        step="1"
                                        color="red"
                                        editable
                                        :complete="editItem.stat > 1"
                                    ></v-stepper-step>
                                    <v-divider></v-divider>
                                    <v-stepper-step
                                        step="2"
                                        color="yellow"
                                        editable
                                        :complete="editItem.stat > 2"
                                    ></v-stepper-step>
                                    <v-divider></v-divider>
                                    <v-stepper-step
                                        step="3"
                                        color="green"
                                        editable
                                        :complete="editItem.stat > 3"
                                    ></v-stepper-step>
                                </v-stepper-header>
                            </v-stepper> -->
                            <v-radio-group 
                                v-model="editItem.stat" 
                                row
                                class="ma-1 pa-1"
                                :rules="[v => !!v || 'Item is required']"
                                required>
                                <v-radio
                                    color="red"
                                    label="Todo"
                                    value="1">
                                </v-radio>
                                <v-divider class="ma-5"></v-divider>
                                <v-radio
                                    color="yellow"
                                    label="Do"
                                    value="2">
                                </v-radio>
                                <v-divider class="ma-5"></v-divider>
                                <v-radio
                                    color="green"
                                    label="Done"
                                    value="3">
                                </v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card-text>

        <v-card-actions>
        <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="popAction('popClose')">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="popAction('popSave')">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data : function(){
        return {
            // form 의 validation 체크값
            valid:false,
            //날짜형태 yyyy-mm-dd
            date: new Date().toISOString().substr(0, 10),
            //날짜형태 yyyy/mm/dd
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            //from 캘린더 메뉴 값
            fromMenu : false,
            //to 캘린더 메뉴 값
            toMenu : false,
            //from 날짜(yyyy-mm-dd)
            fromDate: new Date().toISOString().substr(0, 10),
            //to 날짜(yyyy-mm-dd)
            toDate: new Date().toISOString().substr(0, 10),

            //유형 배열
            selectCate : [],
            cateList : [
                {category:"문의", code:1},
                {category:"자료요청", code:2},
                {category:"개선", code:3},
                {category:"일정", code:4},
            ],
            //회사 리스트 배열
            selectCom:{},
            comList:[
                {com_cd:"keienkor",comp_name:"케이엔코리아", sol_gbn:"유통"},
                {com_cd:"lesvins",comp_name:"레벵드메일", sol_gbn:"유통"},
                {com_cd:"194002",comp_name:"레드페이스", sol_gbn:"유통"},
                {com_cd:"barrels",comp_name:"배럴즈", sol_gbn:"패션"},
                {com_cd:"601669",comp_name:"시그널어패럴", sol_gbn:"패션"},
                {com_cd:"unipair",comp_name:"유니페어", sol_gbn:"패션"},
                {com_cd:"cowaylst",comp_name:"코웨이", sol_gbn:"유통"},
                {com_cd:"ohbaksa1",comp_name:"오박사", sol_gbn:"유통"},
            ],
            //화면내 vo
            editItem : {
                index:'',
                category:'',
                com_cd:'',
                comp_name:'',
                sol_gbn:'',
                from_date:'',
                to_date:'',
                title:'',
                text:'',
                stat:'',
                reg_id:'',
                reg_date:new Date()
            },
            //form validation rules
            basicRulse :[
                value => !!value || 'Required.',
            ]
        }
    },
    props : {
        paramItem : {
            type:Object,
            default() {
                return{}
            }
        }
    },
    watch: {
        paramItem : { 
            deep: true,
            immediate: true,
            handler(newVal){
                console.log(newVal)
                this.editItem = newVal
            }
            
        },
    },
    methods: {
        popAction(btnId){
            switch (btnId) {
                case 'popSave':
                    if(!this.$refs.form.validate()){
                        break;
                    }
                    this.editItem.index=this.rnd(100,2000)
                    this.editItem.reg_id='admin'
                    this.editItem.reg_date = new Date().toISOString().substr(0, 10)
                    this.$emit('popAction',{'id':'popSave', 'callback':this.editItem})
                    break;
                case 'popClose':
                    this.$emit('popAction',{'id':'popClose', 'callback':null})
                    break;
            }

        },
        //Date Format(yyyy-mm-dd -> yyyy/mm/dd)
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${year}/${month}/${day}`
        },
        //Date Format(yyyy/mm/dd -> yyyy-mm-dd)
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        //random number
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
    }
}
</script>