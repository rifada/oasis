<template>
        <v-container fluid>

          <!--Dashboard widget Row -->

          <v-row
                align="center"
                justify="center"
                style="height:100px">
                <v-col cols="4">
                        <widget icon="mdi-calendar-check" :title="calculator" subTitle= '13% higher yesterday' supTitle="To-Do" color="red"/>
                </v-col>
                <v-col cols="4">
                        <widget icon="mdi-calendar-clock" title="1,287,687" subTitle= '13% higher yesterday' supTitle="Do" color="yellow"/>
                </v-col>
                <v-col cols="4">
                        <widget icon="mdi-calendar-multiple-check" title="1,287,687" subTitle= '13% higher yesterday' supTitle="Done" color="green"/>
                </v-col>
            </v-row>

            <v-row
                align="center"
                justify="center"
                style="height:100px">
                <v-col cols="4">
                        <widget icon="mdi-calendar-check" title="1,287,687" subTitle= '13% higher yesterday' supTitle="Today's Visits" color="#00b297"/>
                </v-col>
                <v-col cols="4">
                        <widget icon="mdi-calendar-clock" title="1,287,687" subTitle= '13% higher yesterday' supTitle="Today's Visits" color="#dc3545"/>
                </v-col>
                <v-col cols="4">
                        <widget icon="mdi-calendar-multiple-check" title="1,287,687" subTitle= '13% higher yesterday' supTitle="Today's Visits" color="#0866C6"/>
                </v-col>
            </v-row>

            

            <!--Dashboard Calendar Row -->
            <v-row class="fill-height">
                <v-col>
                    <v-sheet height="64">
                        
                        <v-toolbar flat color="green">
                            <v-btn outlined class="mr-4" color="yellow" @click="setToday">
                                Today
                            </v-btn>
                            
                            <v-btn fab text small color="yellow" @click="prev">
                                <v-icon small>mdi-chevron-left</v-icon>
                            </v-btn>
                            
                            <v-btn fab text small color="yellow" @click="next">
                                <v-icon small>mdi-chevron-right</v-icon>
                            </v-btn>
                           
                            <v-toolbar-title>타이틀</v-toolbar-title>
                            <v-spacer></v-spacer>
                            
                            <v-menu bottom right>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                      outlined
                                      color="yellow"
                                      v-bind="attrs"
                                      v-on="on"
                                  >
                                      <span>{{ typeToLabel[type] }}</span>
                                      <v-icon right>mdi-menu-down</v-icon>
                                  </v-btn>
                                </template>
                                <v-list>
                                  <v-list-item @click="type = 'day'">
                                      <v-list-item-title>Day</v-list-item-title>
                                  </v-list-item>
                                  <v-list-item @click="type = 'week'">
                                      <v-list-item-title>Week</v-list-item-title>
                                  </v-list-item>
                                  <v-list-item @click="type = 'month'">
                                      <v-list-item-title>Month</v-list-item-title>
                                  </v-list-item>
                                  <v-list-item @click="type = '4day'">
                                      <v-list-item-title>4 days</v-list-item-title>
                                  </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-toolbar>
                    </v-sheet>

                    <v-sheet height="600">
                        <v-calendar
                            ref="calendar"
                            v-model="focus"
                            color="primary"
                            :events="events"
                            :event-color="getEventColor"
                            :type="type"
                            @click:event="showEvent"
                            @click:more="viewDay"
                            @click:date="viewDay"
                            @change="updateRange"
                        ></v-calendar>

                        <v-dialog v-model="selectedOpen" persistent max-width="800px">
                            <popVoc :show="selectedOpen"
                                    @popAction = popAction>
                            </popVoc>
                        </v-dialog>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
</template>

<script>
import popVoc from '../components/PopVoc.vue'
import widget from '../components/Widget.vue'

import calList from '../dummy_json/calList.json'

export default {
    components :{
      widget,
      popVoc,
    },
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      // start: null,
      // end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      today:'',
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),

    computed: {
      // title () {
      //   const { start, end } = this
      //   if (!start || !end) {
      //     return ''
      //   }


      //   const startMonth = this.monthFormatter(start)
      //   const endMonth = this.monthFormatter(end)
      //   const suffixMonth = startMonth === endMonth ? '' : endMonth

      //   const startYear = start.year
      //   const endYear = end.year
      //   const suffixYear = startYear === endYear ? '' : endYear

      //   const startDay = start.day + this.nth(start.day)
      //   const endDay = end.day + this.nth(end.day)

      //   switch (this.type) {
      //     case 'month':
      //       return `${startMonth} ${startYear}`
      //     case 'week':
      //     case '4day':
      //       return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
      //     case 'day':
      //       return `${startMonth} ${startDay} ${startYear}`
      //   }
      //   return ''
      // },
      calculator() {
        // console.log(this.events.filter(toDo => toDo.stat===1).length)
        const monthCnt = this.events.length
        const toDoCnt = this.events.filter(toDo => toDo.stat===1).length
        // const doCnt = this.events.filter(toDo => toDo.stat===2).length
        // const doneCnt = this.events.filter(toDo => toDo.stat===3).length

        return  toDoCnt + '/' + monthCnt
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange () {
        this.events = calList
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      formatDate (a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
      },
      popAction(param){
            switch (param.id) {
                case 'popSave':
                    console.log("popSave")
                    this.list.push(param.callback)
                    this.selectedOpen = false
                    break;
                case 'popClose':
                    console.log("popClose")
                    this.selectedOpen = false
                    break;
            }

        },
    },
}
</script>