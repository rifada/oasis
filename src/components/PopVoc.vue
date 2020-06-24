<template>
    <v-card height="750px">
        <v-card-title>
        <span class="headline">Issue 등록</span>
        </v-card-title>

        <v-card-text>
            
            <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <v-select
                                v-model="editItem.category"
                                :items="cateList"
                                item-text="category"
                                item-value="code"
                                label="등록유형"
                                :rules="[v => !!v || 'Item is required']"
                                required
                                >
                            </v-select>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete
                                v-model="comNm"
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
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field v-model="comList.comp_name" label="Company Name" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field v-model="comList.sol_gbn" label="Solution" disabled></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Date Picker-->
                    <v-row>
                        <v-col cols="12" lg="6">
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
                        
                        <v-col cols="12" lg="6">
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
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="editItem.title" 
                            label="Title"
                            :rules="basicRulse"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="12">
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
                        <v-col cols="12" sm="6" md="12">
                            <v-stepper v-model="editItem.stat">
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
                            </v-stepper>
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
            valid:false,
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            fromMenu : false,
            toMenu : false,
            fromDate: new Date().toISOString().substr(0, 10),
            toDate: new Date().toISOString().substr(0, 10),
            comNm:'',
            comCd:'',
            solGbn:'',
            cateList : [
                {category:"문의", code:1},
                {category:"자료요청", code:2},
                {category:"개선", code:3},
                {category:"일정", code:4},
            ],
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
            basicRulse :[
                value => !!value || 'Required.',
            ]
        }
    },
    props : {
        paramItem : {
            type:Object,
        }
    },
    created() {
        console.log('creted')
    },
    methods: {
        popAction(btnId){
            switch (btnId) {
                case 'popSave':
                    if(!this.$refs.form.validate()){
                        break;
                    }
                    console.log("pop_Save")
                    this.editItem.index=this.rnd(100,2000)
                    this.editItem.reg_id='admin'
                    this.editItem.reg_date = new Date().toISOString().substr(0, 10)
                    this.$emit('popAction',{'id':'popSave', 'callback':this.editItem})
                    break;
                case 'popClose':
                    console.log("pop_Close")
                    this.$emit('popAction',{'id':'popClose', 'callback':null})
                    break;
            }

        },
        //Date Format
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${year}/${month}/${day}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
    }
}
</script>