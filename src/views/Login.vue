<template>
    <v-container fill-height fulid>
        <v-row no-gutters
                align="center"
                justify="center"
                style="height:95vh;"
                >
            <v-col
                cols="12"
                sm="3"
                >
                <v-alert
                        type="error"
                        :value="isFail"
                        transition="scale-transition">
                        로그인 실패
                    </v-alert>
                <v-card>
                    <div class="pa-3 d-flex justify-end">
                        Operation ASIsstant System
                    </div>
                    <div class="d-flex justify-center"> 
                        <div style="width:400px" class="pa-3">
                            <v-text-field
                                v-model="userId"
                                placeholder="ID를 입력하세요."
                                prepend-inner-icon="mdi-account"
                                label="ID">
                            </v-text-field>
                            <v-text-field
                                v-model="password"
                                @keyup.enter="login()"
                                type="password"
                                placeholder="패스워드를 입력하세요."
                                prepend-inner-icon="mdi-key"
                                label="Password">
                            </v-text-field>
                            <v-btn 
                                @click="validator"
                                block
                                large
                                depressed
                                color="primary">Login
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>

    </v-container> 
</template>

<script>
import {mapActions} from 'vuex'

export default {
    components: {
    },
    data (){
        return{
            userId : null
            ,password : null
            ,isFail : false
        }
    },
    methods :{
        ...mapActions(['getToken']),
        validator(){
            
            if((this.userId === null) || (this.password === null)){
                this.isFail=true
                setTimeout(()=>{this.isFail=false},2000)
                return
            }
           
            this.login()
        },
        login(){

            // let form = new FormData()
            // form.append('username', this.userId)
            // form.append('passowrd', this.password)

            // this.$http({
            //     methods:'post',
            //     url:'/login',
            //     data:form,
            //     headers: {'Content-Type': 'multipart/form-data' }
            // })
            // .then(res=>{
            //     console.log(res)
            //     this.isFail=true
            //     this.getToken(res.data)
            //     this.$router.push({name : "main"})
            // })
            // .catch(err =>{
            //     console.log(err)
            // })
            // this.isFail=true
            this.getToken("test")
            this.$router.push({name : "main"})
        }
    }
}
</script>