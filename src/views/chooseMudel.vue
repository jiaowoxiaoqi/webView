<template>
    <div class="zy_page chooseMudelPage">
        <sm-header :zyhConfig='venueZyHdConfig' :zyhTxt='venueZyHdTxt' :zyhlEvent='backPage'></sm-header>
        <sm-scroll :scrollbar="scrollbar"
        :pullDownRefresh="pulldown">
            <div class="zyMgTop_15 chooseMudelContent content">
                <div :class='["zy_flex_clumn zy_card",{"cardfrist":index==0,"cardTwo":index==1}]' v-for='(card,index) in cardList' :key='index' @click="jump(card.type)">
                    <img :src="card.imgUrl" :alt="card.imgAlt">
                    <span :class='{"zy_yellow":index==0,"zy_green":index==1}' v-text='card.title'></span>
                </div>
            </div>
        </sm-scroll>
        
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        data() {
            return {
                message: 'vue',
                venueZyHdConfig: {
                    left_show: true,
                    left_icon_show: true,
                    left_title_show: false,
                    center_show: true,
                    center_inner_show: false,
                    center_title_show: true,
                    right_show: false,
                    right_title_show: false,
                    right_icon_show: true,
                },
                venueZyHdTxt: {
                    zyhCtTxt: '首 页',
                },
                cardList: [
                    {
                        imgUrl: require('../assets/images/icon_2.png'),
                        imgAlt: "外出用餐.icon",
                        title: "外出用餐",
                        type: "MeiCan"
                    },
                    {
                        imgUrl: require('../assets/images/icon_3.png'),
                        imgAlt: "外卖/茶歇.icon",
                        title: "外卖/茶歇",
                        type: "TakeAway"
                    }
                ],
                scrollbar: true,
                pulldown: true,
            }

        },
        components: {
            'smHeader': (resolve) => {
                require(['../components/sm_header/sm_header'], resolve);
            },
            'smScroll': (resolve) => {
                require(['../components/sm_scroll/sm_scroll'], resolve);
            }
        },
        methods: {
            backPage () {
                this.$router.back()
            },
            jump (type) {
                switch (type) {
                    case "MeiCan":
                        this.$router.push('/recommendedMeiCan')
                        break;
                    case "TakeAway":
                        alert(type)
                        break;
                }
            }
        }
    }
</script>

<style lang="scss">
 @import '~@/assets/sass/chooseMudel';

</style>
