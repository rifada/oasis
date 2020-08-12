<template>
    <v-container fluid class="fill-height">
        <v-layout column style="height: 60vh"
            >
            <v-flex>
                <btnBar :prog_cd="prog"
                        @btnAction = btnAction>
                </btnBar>
                <v-card>
                <v-card-title>
                    <v-icon>fas fa-search</v-icon>
                    <v-spacer></v-spacer>
                        <v-text-field
                        v-model="search"
                        label="Search"
                        append-icon="fa-window-close"
                        single-line
                        hide-details
                        ></v-text-field>
                </v-card-title>            

                    <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="list"
                        :search="search"
                        :single-select="false"
                        height="600px"
                        item-key="com_cd"
                        show-select
                        fixed-header
                        class="elevation-1"
                        multi-sort
                    >
                    <template v-slot:item.index="{ index }">
                        {{ index }}
                    </template>
                    <template v-slot:item.comp_name="{ item }">
                        <v-text-field v-model="item.comp_name"></v-text-field>
                    </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import btnBar from '../components/BtnBar.vue'
//import headerList from '../dummy_json/companyList.json'
import detailList from '../dummy_json/companyrawList.json'
import XLSX from 'xlsx'

export default {
    components :{
        btnBar
    },
    data : function(){
        return {
            prog : "P001"
            ,dialog:false
            ,search :''
            ,singleSelect: false
            ,selected:[]
            ,editedItem:[]
            ,headers :[
                    {text:"번호", width:80, value:'index'},
                    {text:"회사코드", width:150, value:"com_cd"},
                    {text:"회사명", width:120,value:"comp_name"},
                    {text:"사용료",width:150,value:"charge"},
                    {text:"가입일",width:150,value:"join_date"},
                    {text:"pos 사용여부",width:150,value:"pos_yn"},
                    {text:"매장관리 사용여부",width:150,value:"storemng"},
                    {text:"솔루션구분",width:150,value:"sol_gbn"},
                    {text:"해지여부",width:150,value:"cancel_yn"},
                    {text:"상품수",width:150,value:"sku_cnt"},
                    {text:"매장수",width:150,value:"sto_cnt"},
                    {text:"매입처수",width:150,value:"vendor_cnt"},
            ]
            ,list :[]
        }
    },

    created() {
        this.init()
    },
    methods : {
        btnAction(btnId){
            switch (btnId) {
                case 'fsearch':
                    this.fsearch();
                    break;
                case 'fsave':
                    var selectItem = this.selected
                    console.log(selectItem)
                    break;
                case 'fexcel':
                    console.log("엑셀저장버튼")
                    this.exportexcel()
                    break;
                default:
                    console.log("버튼정의 없음")
                    break;
            }
        },
        
        init(){
           
        },
        fsearch(){
            this.list = detailList
        },
        exportexcel(){
          console.log(this.selected)
          // export json to Worksheet of Excel
          // only array possible
          var vtable = XLSX.utils.json_to_sheet(this.selected) 

          // A workbook is the name given to an Excel file
          var wb = XLSX.utils.book_new() // make Workbook of Excel

          // add Worksheet to Workbook
          // Workbook contains one or more worksheets
          XLSX.utils.book_append_sheet(wb, vtable, 'companyInfo') // sheetAName is name of Worksheet

          // export Excel file
          XLSX.writeFile(wb, 'companyInfo.xlsx') // name of the file is 'book.xlsx'
    
        },
    }
}
</script>
<style scoped>
.v-data-table {
  max-width: 100%
}
</style>