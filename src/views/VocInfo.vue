<template>
    <v-container fluid>
        <v-layout fill-height>
            <v-flex >
                    <btnBar :prog_cd="prog"
                            @btnAction = btnAction>
                    </btnBar>
                    
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
                            :paramItem="selected"
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
            selected :[]
        }
    },
    methods : {
        btnAction(btnId){
            switch (btnId) {
                case 'fadd':
                    this.dialog = true
                    console.log(this.dialog)
                    break;
                case 'fsearch':
                    this.fsearch();

                    console.log("voc")
                    break;
                case 'fsave':
                    this.dialog = true
                    console.log(this.selected)
                    break;
                case 'fexcel':
                    console.log("엑셀저장버튼")
                    //this.exportexcel()
                    break;
                default:
                    console.log("버튼정의 없음")
                    break;
            }
        },
        popAction(param){
            switch (param.id) {
                case 'popSave':
                    console.log("popSave")
                    this.list.push(param.callback)
                    this.dialog = false
                    break;
                case 'popClose':
                    console.log("popClose")
                    this.dialog = false
                    break;
            }

        },
        fsearch(){
            this.list = vocList
            console.log("test")
        }
    }
}
</script>