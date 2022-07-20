<template>
    <div class="back">
        <div class="contantBox">
            <div class="topSuperBox">
                <div class="topBox">
                    <img class="topImg" src="@/assets/img/common/courseTop.png" />
                    <div class="topItemBox" v-for="(item, index) in topItemList">
                        <p class="topItemIndex">{{ index + 1 }}</p>
                        <p class="topItemText">{{ $t(item) }}</p>
                    </div>

                </div>
                <div class="sepLine"></div>
                <courseitem :goods="courseList"></courseitem>
            </div>


            <div class="sepView"></div>

            <div class="bottomBox">
                <p class="bottomBox_topTitle">FAQ</p>

                <div class="FAQItemBox" v-for="(item, index) in FAQItemList">
                    <p class="FAQItemBox_title">{{ $t(item.title) }}</p>
                    <p class="FAQItemBox_des" v-if="isShowText(index, FAQItemList, 1)">{{ $t(item.descrip) }}</p>

                    <p class="FAQItemBox_des" v-if="isShowText(index, FAQItemList, 2)">
                        {{ $t(item.desSub1) }}
                        <a :href="$t(item.desSub2)" target="_blank">
                            <span class="FAQItemBox_des_active">{{ $t(item.desSub2) }}</span>
                        </a>
                        <span class="FAQItemBox_des">{{ $t(item.desSub3) }}</span>
                    </p>

                    <a :href="$t(item.descrip)" target="_blank" v-if="isShowText(index, FAQItemList, 3)">
                        <p class="FAQItemBox_des_active">{{ $t(item.descrip) }}</p>
                    </a>
                    <div class="FAQItemBox_line"></div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

import Courseitem from '../children/CourseItem.vue'

export default {
    name: "Course",
    components: {
        Courseitem
    },
    methods: {
        isShowText(index, arr, type) {
            if (type == 1) {
                if (index != 1 && index != arr.length - 1 && index != arr.length - 2 && index != arr.length - 3) {
                    return true;
                } else {
                    return false
                }
            }

            if (type == 2) {
                if (index == 1 || index == arr.length - 3) {
                    return true;
                } else {
                    return false
                }
            }
            if (type == 3) {
                if (index == arr.length - 1 || index == arr.length - 2) {
                    return true;
                } else {
                    return false
                }
            }

        }
    },
    data() {
        return {
            courseList: [{
                name: "course.item1Title",
                des: "course.item1Des",
                linkUrl: "course.item1Link"
            },
            {
                name: "course.item2Title",
                des: "course.item2Des",
                linkUrl: "course.item2Link"
            },
            {
                name: "course.item3Title",
                des: "course.item3Des",
                linkUrl: "course.item3Link"
            },
            {
                name: "course.item4Title",
                des: "course.item4Des",
                linkUrl: "course.item4Link"
            }],
            topItemList: ["course.guide1", 'course.guide2', 'course.guide3', 'course.guide4'],
            FAQItemList: [
                { title: "FAQ.title1", descrip: "FAQ.descrip1", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title2", descrip: "FAQ.descrip2", desSub1: "FAQ.descrip2Sub1", desSub2: "FAQ.descrip2Sub2", desSub3: "" },
                { title: "FAQ.title3", descrip: "FAQ.descrip3", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title4", descrip: "FAQ.descrip4", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title5", descrip: "FAQ.descrip5", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title6", descrip: "FAQ.descrip6", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title7", descrip: "FAQ.descrip7", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title8", descrip: "FAQ.descrip8", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title9", descrip: "FAQ.descrip9", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title10", descrip: "FAQ.descrip10", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title11", descrip: "FAQ.descrip11", desSub1: "FAQ.descrip11Sub1", desSub2: "FAQ.descrip11Sub2", desSub3: "FAQ.descrip11Sub3" },
                { title: "FAQ.title12", descrip: "FAQ.descrip12", desSub1: "", desSub2: "", desSub3: "" },
                { title: "FAQ.title13", descrip: "FAQ.descrip13", desSub1: "", desSub2: "", desSub3: "" },
            ]
        }
    }

}



</script>


<style scoped>
.contantBox {
    width: 100%;
    /* background-color: white; */
    border-radius: 0.25rem;
    margin-bottom: .75rem;
}

.topSuperBox {
    width: 100%;
    background-color: white;
    border-radius: .25rem;
}

.topBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
}

.topImg {
    margin-top: .75rem;
    margin-left: 0rem;
    width: 3.225rem;
    margin-right: .5rem;
    margin-bottom: .325rem;
}


.topItemBox {
    margin-top: .5rem;
    width: 100%;
    margin-left: .75rem;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.topItemIndex {
    width: .75rem;
    height: .75rem;
    background: #F7B500;
    border-radius: .1rem;
    font-size: .6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: .75rem;
    text-align: center;
}



.topItemText {
    margin-left: .25rem;
    font-size: .6rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #212121;
    line-height: .6rem;
}

.sepLine {

    margin-left: .8rem;
    margin-right: .8rem;
    /* width: 100%; */
    height: .0rem;
    background-color: #E5E5E5;
    margin-bottom: .75rem;
}

.sepView {
    /* margin-top: -0.75rem; */
    background-color: #f7faff;
    width: 100%;
    height: .75rem;
}

.bottomBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: .25rem;
    padding-bottom: .5rem;


}

.bottomBox_topTitle {
    margin-top: .75rem;
    font-size: 1.05rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 1.05rem;
    margin-bottom: .5rem;
}

.FAQItemBox {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin-bottom: 0rem;
}

.FAQItemBox_title {
    margin-top: .75rem;
    font-size: .75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: .75rem;
}

.FAQItemBox_des {
    width: 100%;
    margin-top: .55rem;
    font-size: .6rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8C9399;
    line-height: .95rem;
    word-break: break-all;
}

.FAQItemBox_des_active {
    width: 100%;
    margin-top: .55rem;
    font-size: .6rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2c6ff8;
    line-height: .95rem;
    word-break: break-all;
}

.FAQItemBox_line {
    margin-top: .5rem;
    background-color: #E5E5E5;
    height: .7px;
    width: 100%;
}

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1200px) {
    .contantBox {
        width: 100%;
        /* background-color: white; */
        border-radius: 0.25rem;
        margin-bottom: .75rem;
    }

    .topSuperBox {
        width: 100%;
        background-color: white;
        border-radius: .25rem;
    }

    .topBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 1.75rem;
    }

    .topImg {
        margin-top: 0rem;
        margin-left: .8rem;
        width: 2.45rem;
        margin-right: -.25rem;
        margin-bottom: 0rem;
    }


    .topItemBox {
        margin-top: 0rem;
        width: auto;
        margin-left: .75rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .topItemIndex {
        /* padding-bottom: -.05rem; */
        width: .5rem;
        height: .5rem;
        background: #F7B500;
        border-radius: .1rem;
        font-size: .4rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: .5rem;
        text-align: center;
    }



    .topItemText {
        margin-left: .125rem;
        font-size: .375rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #111111;
        line-height: .55rem;
        white-space: nowrap;
    }

    .sepLine {

        margin-left: .8rem;
        margin-right: .8rem;
        /* width: 100%; */
        height: .015rem;
        background-color: #E5E5E5;
        margin-bottom: .75rem;
    }

    .sepView {
        /* margin-top: -0.75rem; */
        background-color: #f7faff;
        width: 100%;
        height: .75rem;
    }

    .bottomBox {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        border-radius: .25rem;
        padding-bottom: .5rem;

    }

    .bottomBox_topTitle {
        margin-top: 1.25rem;
        font-size: .75rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #111111;
        line-height: 1.05rem;
        margin-bottom: 0.5rem;
    }

    .FAQItemBox {
        width: 80%;
        display: flex;
        flex-direction: column;
        margin-bottom: 0rem;
    }

    .FAQItemBox_title {
        margin-top: .45rem;
        font-size: .45rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #111111;
        line-height: .625rem;
    }

    .FAQItemBox_des {
        margin-top: .55rem;
        font-size: .4rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8C9399;
        line-height: .55rem;
        width: 100%;
        /* word-break: normal */
    }

    .FAQItemBox_des_active {
        margin-top: .55rem;
        font-size: .4rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2c6ff8;
        line-height: .55rem;
        /* word-break: normal */
    }

    .FAQItemBox_line {
        margin-top: .5rem;
        background-color: #E5E5E5;
        height: .7px;
        width: 100%;
    }
}
</style>