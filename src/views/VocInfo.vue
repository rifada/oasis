<template>
    <v-container fluid>
        <v-layout fill-height>
            <v-flex >
                    <btnBar :prog_cd="prog"
                            @btnAction = btnAction>
                    </btnBar>
                    <v-alert
                        type="warning"
                        :value="isFail"
                        dismissible
                        transition="scale-transition">
                        No seledted Item!
                    </v-alert>
                    <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="list"
                            :single-select="false"
                            fixed-header
                            height="600px"
                            item-key="index"
                            show-select
                            class="elevation-1"
                            multi-sort
                        >
                    </v-data-table>

                 <v-dialog v-model="dialog" persistent max-width="800px">
                    <popVoc :show="dialog"
                            :paramItem="paramItem"
                            @popAction = popAction>
                    </popVoc>
                </v-dialog>
            </v-flex>
        </v-layout>
    </v-container>
       
</template>

<script>
import btnBar from '../components/BtnBar.vue'
import popVoc from '../components/PopVoc.vue'
import vocList from '../dummy_json/vocList.json'


export default {
    components :{
        btnBar,
        popVoc
    },
    data : function(){
        return {
            //팝업창 다이얼로그 여부
            dialog : false,
            isFail : false,
            prog : "P002",
            model:null,
            headers :[
                {text:"번호", width:80, value:'index'},
                {text:"구분",width:150,value:"category"},
                {text:"회사코드", width:150, value:"com_cd"},
                {text:"회사명", width:150,value:"comp_name"},
                {text:"솔루션구분",width:150,value:"sol_gbn"},
                {text:"제목",width:150,value:"title"},
                {text:"내용",width:150,value:"text"},
                {text:"진행상태",width:150,value:"stat"},
                {text:"등록자",width:150,value:"reg_id"},
                {text:"등록일",width:150,value:"reg_date"},
            ],
            list :[],
            selected :[],
            paramItem :{}
        }
    },
    methods : {
        btnAction(btnId){
            switch (btnId) {
                case 'fadd':
                    this.paramItem = {}
                    this.dialog = true
                    break;
                case 'fsearch':
                    this.fsearch();
                    break;
                case 'fsave':
                    if(this.selected.length>0){
                        this.paramItem = this.selected[0]
                        this.dialog = true
                    }else{
                        this.isFail = true
                        setTimeout(()=>{this.isFail=false},2000)
                    }
                    break;
                case 'fexcel':
                    //this.exportexcel()
                    break;
                case 'finit':
                    this.list =[]
                    break
                default:
                    break;
            }
        },
        popAction(param){
            switch (param.id) {
                case 'popSave':
                    this.list.push(param.callback)
                    this.dialog = false
                    break;
                case 'popClose':
                    this.dialog = false
                    break;
            }

        },
        fsearch(){
            this.list = vocList
        }
    }
}
</script>