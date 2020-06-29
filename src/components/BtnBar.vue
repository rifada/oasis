<template>
    <v-container>
        <v-layout>
            <v-flex>
                <div
                    align="right">
                    <v-btn
                        class="pa-1 ma-1"
                        v-for="btn in btns"
                        :key="btn.btn_id"
                        :color="btn.color"
                        small
                        @click="btnClick(btn.btn_id)"
                        >{{btn.text}}
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import btnList from '../dummy_json/btnList.json'
export default {
    data(){
        return{
            btns : [],
        }
    },
    props : {
        prog_cd : {
            type:String,
            required : true
        }
    }
    ,
    created() {
        this.btnList()
    },
    methods : {
        btnList() {
            // this.$http.post('http://localhost:7070/btnList', {prog : this.prog_cd})
            // .then(res=>{
            //     console.log(res)
            //     this.btns = res.data
            // })
            // .catch(err =>{
            //     console.log(err)
            // })
            this.btns = btnList
        },
        btnClick(btnId) {
            // console.log(btnId)
            // console.log(this.prog_cd)
            this.$emit('btnAction', btnId)
        }
    }
}
</script>