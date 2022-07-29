<template>
  <div class="back">
    <list class="contantBack" ref="content">
      <!-- <div class="contantList"> -->
      <!-- 头部 -->
      <div class="topBackBox">
        <img :src="topBackImgUrl" class="topImg" />
        <div class="topBackContant">
          <div class="topImgIconBox">
            <img class="topImgIcon" src="@/assets/img/farms/topImgIcon.png" />
            <div class="topImgIconBox_contantBox">
              <p class="topImgIconBox_contantBox_text">Stake NFT to Earn $STB</p>
            </div>
          </div>
          <p class="topTitle">{{ $t("navBar.section1") }}</p>

          <div class="courseBox_super">
            <div class="courseBox">
              <a :href="$t('common.courseLinkUrl')" target="_blank">
                <div class="courseBox_contantBox">
                  <img class="courseBox_contantBox_imgLeft" src="@/assets/img/farms/course_left.svg" />
                  <p class="courseBox_contantBox_text">{{ $t("common.course") }}</p>
                </div>
              </a>
            </div>

            <div class="courseBox">
              <a href="https://forms.gle/FZukoQmPMTYGDFQCA" target="_blank">
                <div class="courseBox_contantBox">
                  <img class="courseBox_contantBox_imgLeft" src="@/assets/img/farms/course_left1.svg" />
                  <p class="courseBox_contantBox_text">{{ $t("common.applyCollection") }}</p>
                </div>
              </a>
            </div>
          </div>

          <p class="topSubTitle">{{ $t("farms.topDes") }}</p>
          <div class="topItemDataSuperBox">
            <div class="itemDataBox">
              <p class="itemDataBox_topText">
                {{ totalTVL > 0 ? totalTVLStr : "-- ETH" }}
              </p>
              <p class="itemDataBox_bottomText">{{ $t("farms.topItem1") }}</p>
            </div>
            <div class="vSepLine"></div>
            <div class="itemDataBox">
              <p class="itemDataBox_topText">{{ totalNftQuantityStr }}</p>
              <!-- <p class="itemDataBox_topText">{{ "--" }}</p> -->
              <p class="itemDataBox_bottomText">{{ $t("farms.topItem2") }}</p>
            </div>
            <div class="vSepLine"></div>
            <div class="itemDataBox">
              <p class="itemDataBox_topText">
                {{ totalRewardStr }}
              </p>
              <p class="itemDataBox_bottomText">{{ $t("farms.topItem3") }}</p>
            </div>


            <div class="vSepLine" v-show="!isShowMobile"></div>
            <div class="itemDataBox" v-show="!isShowMobile">
              <p class="itemDataBox_topText">
                {{ totalBonusStr }}
              </p>
              <p class="itemDataBox_bottomText">{{ $t("farms.topItem4") }}</p>
            </div>
          </div>
        </div>
      </div>


      <div class="topCourseBox">
        <div class="courseLeftBox">
          <div class="courseTopImgBox">
            <img class="courseTopImg" :src="topImgUrl" />
          </div>

          <div class="topItemBox" v-for="(item, index) in topItemList">
            <p class="topItemIndex">{{ index + 1 }}</p>
            <p class="topItemText">{{ $t(item) }}</p>
          </div>
        </div>
        <div class="courseRightBox" @click="courseRightBoxClick">
          <p class="courseRightBox_text">{{ $t("common.moreInfo") }}</p>
          <img class="courseRightBox_img" src="@/assets/img/common/access_yellow.svg" />
        </div>


      </div>

      <div class="myfarmdata">
        <myfarmdata :userInfo="userInfo"></myfarmdata>
      </div>


      <!-- Farms -->
      <div class="itemsBox" id="main2" ref="instro">
        <div class="searchAndSortBox">
          <div class="searchBoxSuper">
            <div class="searchBox">
              <img class="searchBox_leftImg" src="@/assets/img/common/search_yellow.svg" />
              <input class="searchBox_input" @keyup.enter="enterSearch" v-model="searchText"
                :placeholder="$t(placeholderText)" />
              <img class="searchBox_rightImg" src="@/assets/img/common/close_gray.svg" @click="clearSearchText" />
            </div>

            <button class="searchBtn" @click="searchBtnAction">{{ $t("common.search") }}</button>
          </div>

          <div class="sortBox">
            <el-dropdown trigger="click" @visible-change="dropdownHiddenClick" @command="dropdownClick">
              <div class="sortItemBox0">
                <p class="sortItemBox0_text">{{ $t(shortNameStr) }}</p>
                <img class="sortItemBox0_img" :src="drow_upDownImgUrl" />
              </div>
              <el-dropdown-menu slot="dropdown" class="filtrateBtnMarginRight">
                <el-dropdown-item v-for="(item, index) in shortList" :command="item" class="el-dropdown-item">
                  <p :class="index == dropdownClickIndex ? 'el-dropdown-item_active' : 'el-dropdown-item'">{{
                      $t(item)
                  }}</p>

                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="sortItemBox1">
              <img class="sortItemBox1_img" :src="sort_myNFTimgUrl" @click="sortMyNFTAction" />
              <p class="sortItemBox1_text">{{ $t("common.myNFT") }}</p>
            </div>
            <div class="sortItemBox1">
              <img class="sortItemBox1_img" :src="sort_myWNFTimgUrl" @click="sortMyWNFTAction" />
              <p class="sortItemBox1_text">{{ $t("common.myStake") }}</p>

            </div>
          </div>
        </div>
        <farmitem :items="handledPoolItems" :currentBlockNumber="currentBlockNumber"></farmitem>
        <farmitemplace :items="placeItems" v-show="handledPoolItems.length == 0 && !isSearchEmpty"></farmitemplace>
        <div class="emptyNFTBox" v-show="isSearchEmpty">
          <img class="emptyNFTImg" src="@/assets/img/common/empty_search.svg" />
          <p class="emptyDes">{{ $t("common.noData") }}</p>
        </div>
      </div>

      <!-- <div class="emptyContantBox">
        <img class="emptyContantBox_img" src="@/assets/img/farms/empty.png" />
        <div class="countDownBox">
          <countdown :isFarms="true"></countdown>
        </div>
      </div> -->
    </list>

    <!-- <div class="bottomDesBox">
      <img src="@/assets/img/farms/farmsDes.png" class="farmsDesImg" />
      <div class="farmsDesTextBox">
        <p class="farmsDesText">
          <span>{{ "· " }}</span>
          <span>{{ $t("farms.tip1") }}</span>
          <br />
          <span>{{ "· " }}</span>
          <span>{{ $t("farms.tip2") }}</span>
          <br />
          <span>{{ "· " + $t("farms.rewardsDes") }}</span>
          <br />
          <span>{{ "· " + $t("farms.tip3") }}</span>
          <br />
          <span>{{ "· " + $t("farms.tip4") }}</span>
          <br />
          <span>{{ "· " + $t("farms.tip5") }}</span>
          <br />
          <span>{{ "· " + $t("farms.tip6") }}</span>
        </p>
      </div>
    </div> -->
    <!-- <div id="main3" ref="instro"></div> -->
    <div class="courseSectionBox" id="main3" ref="instro">
      <course></course>
    </div>


    <bottom></bottom>

    <el-dialog title="" :visible.sync="actionAlertShow" :width="elDialogEditSellDataWidth"
      :height="elDialogEditSellDataHeight" :close-on-click-modal="false" :show-close="false" :fullscreen="false"
      :destroy-on-close="true" center top="70px" :lock-scroll="false" :close-on-press-escape="false">
      <div class="alertContantBox1">
        <div class=""></div>
        <p class="alertTitle">{{ $t("farms.NFTOfCollection") }}</p>
        <img class="closeAlertIcon" src="@/assets/img/farms/optionViewClose.svg" @click="closeAlertAction" />
      </div>

      <div class="alertSectionBox1">

        <div class="itemDataBox">
          <p class="itemDataBox_topText_alert">
            {{ (selectPollItem.mining * Math.pow(10, -18)).toFixed(2) + " STB" }}
          </p>
          <p class="itemDataBox_bottomText_alert">{{ $t("common.optionName5") }}</p>
        </div>
        <div class="vSepLine_alert"></div>

        <div class="itemDataBox">
          <p class="itemDataBox_topText_alert">{{ this.selectPollItem.wnftQuantity + " NFT" }}</p>
          <p class="itemDataBox_bottomText_alert">{{ $t("farms.havePledge") }}</p>
        </div>
        <div class="vSepLine_alert"></div>
        <div class="itemDataBox">
          <p class="itemDataBox_topText_alert">{{ this.selectPollItem.nftQuantity + " NFT" }}</p>
          <p class="itemDataBox_bottomText_alert">{{ $t("common.canStake") }}</p>
        </div>
        <!-- <div class="vSepLine_alert"></div> -->

        <!-- <div class="itemDataBox">
          <p class="itemDataBox_topText_alert">{{ "0 WETH" }}</p>
          <p class="itemDataBox_bottomText_alert">{{ $t("farms.getBonusAmount") }}</p>
        </div> -->
      </div>

      <div class="alertSectionBox2" v-loading.lock="actionAlertShowLoading"
        element-loading-background="rgba(0, 0, 0, 0.0)">
        <div class="switchBtnBox">
          <button :class="isSwitch1 ? 'switchBtn_on' : 'switchBtn_off'" @click="switchBtn(1)">
            {{ $t("farms.pledge") }}
          </button>
          <button :class="!isSwitch1 ? 'switchBtn_on' : 'switchBtn_off'" @click="switchBtn(2)">
            {{ $t("farms.havePledge") }}
          </button>
        </div>
        <div class="unPledgeActionBox">
          <button class="unPledgeAction" @click="alertBeforeAction">
            {{ alertActionStr + " " + selectCount + $t("common.defaultMessSub2") }}
          </button>
          <div class="selectAllBtnBox" @click="selectAllAction">
            <p class="selectAllBtnBox_text">{{ $t("common.sellectAll") }}</p>
            <img class="selectAllBtnBox_img" :src="selectIconUrl" />
          </div>
        </div>
      </div>

      <div class="itemsSuperBox">
        <div class="alertSectionBox3">
          <div class="alertSectionBox3_textBox1">
            <p class="alertSectionBox3_text1">NFT</p>
          </div>
          <div class="alertSectionBox3_textBox2">
            <p class="alertSectionBox3_text2">{{ $t("farms.detailInfo") }}</p>
          </div>
          <div class="alertSectionBox3_textBox3">
            <p class="alertSectionBox3_text3">{{ $t("farms.option") }}</p>
          </div>
        </div>
        <div class="selectItemSepLine"></div>
        <!-- <div v-for="(item, index) in selectItems"> -->
        <selectnft :items="canSelectNftItems" v-show="!isShowEmptyImg"></selectnft>
        <div class="emptyImgBox" v-show="isShowEmptyImg">
          <img class="emptyImg" src="@/assets/img/common/emptyNFT.png" />
          <p class="emptyImgBox_des">{{ $t("farms.noWNFTDes") }}</p>
        </div>

        <!-- </div> -->
      </div>

      <p class="alertTip1">{{ "· " + $t("farms.optionTip1") }}</p>
      <p class="alertTip2">{{ "· " + $t("farms.optionTip2") }}</p>
      <p class="alertTip2">{{ "· " + $t("farms.optionTip3") }}</p>
      <p class="alertTip2">{{ "· " + $t("farms.optionTip4") }}</p>
    </el-dialog>


    <el-dialog title="" :visible.sync="successVisible2" :width="elDialogWidth" :show-close="false" center top="200px"
      :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <img class="dialogTopImg" src="@/assets/img/common/requestSuccess.svg" />
        <p class="dialopTitle">
          {{ requestSuccessStr2 }}
        </p>

        <div class="txHashBox">
          <p class="txHash_pre">{{ $t("common.txHash") + ":" }}</p>
          <a :href="getChainWebUrl(txHashOringion)" target="_blank">
            <p class="txHash">{{ txHash }}</p>
          </a>
          <img class="txHash_copy" src="@/assets/img/common/copy.svg" @click="copyAddressAction(txHashOringion)" />
        </div>
        <p class="defaultRewardDes">{{ $t("common.rewardAlertDes_success") }}</p>

        <div class="bottomBtnBox1">
          <a href="https://starblock.io/assets" target="_blank" class="traddingStarblockBtn_a">
            <button class="traddingStarblockBtn_yellow">
              {{ $t("common.tradingNFT") }}
            </button>
          </a>
          <button class="lookDetailBtn" @click="alertCloseBtnAction">
            {{ $t("common.alertClose") }}
          </button>
        </div>
      </div>
    </el-dialog>


    <el-dialog title="" :visible.sync="warningDefaultVisible" :width="elDialogWidth" :show-close="false" center
      top="200px" :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <img class="dialogTopImg" src="@/assets/img/common/alertWaring.svg" />
        <p class="dialopTitle">
          {{ defaultMessageStr }}
        </p>
        <span class="dialogDes" v-bind="{ color: dialogDesColor }">
          {{
              !isGetReward
                ? defaultMessageDesStr
                : defaultMessageDesStr + ": " + awardAmountStr(selectPollItem.mining)
          }}
        </span>
        <p class="defaultRewardDes">{{ $t("common.rewardAlertDes") }}</p>

        <div class="bottomBtnBox1">
          <button class="goOnCreatBtn" @click="defaultBtnAction">
            {{ $t("common.confirm") }}
          </button>
          <button class="lookDetailBtn" @click="cancleBtnAction">
            {{ $t("common.cancle") }}
          </button>
        </div>
      </div>
    </el-dialog>


    <el-dialog title="" :visible.sync="warningDefaultReceiveAllReward" :width="elDialogWidth" :show-close="false" center
      top="200px" :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <img class="dialogTopImg" src="@/assets/img/common/alertWaring.svg" />
        <p class="dialopTitle">
          {{ defaultMessageStr }}
        </p>
        <span class="dialogDes" v-bind="{ color: dialogDesColor }">
          {{
              defaultMessageDesStr + ": " + awardAmountStr(userInfo.mining)
          }}
        </span>

        <p class="defaultRewardDes">{{ $t("common.rewardAlertDes") }}</p>
        <div class="bottomBtnBox1">
          <button class="goOnCreatBtn" @click="defaulAllRewardAlertBtnAction">
            {{ $t("common.confirm") }}
          </button>
          <button class="lookDetailBtn" @click="cancleAllRewardAlertBtnAction">
            {{ $t("common.cancle") }}
          </button>
        </div>
      </div>
    </el-dialog>



    <el-dialog title="" :visible.sync="defaultAlertShow" :width="elDialogWidth1" :show-close="false" center top="200px"
      :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <div class="dialogTopBack">
          <div></div>
          <p class="dialogTopBack_title">
            {{ defaultAlertTitle }}
          </p>
          <img class="dialogTopBack_img" src="@/assets/img/common/close.svg" @click="stakeAlertCloseAction" />
        </div>

        <div class="dialogContantBox">

          <div class="dialogContantBox_topBox">
            <div class="dialogContantBox_topBox_leftBox">
              <img class="collectionImg" :src="selectPollItem.collection.imagePath" v-if="selectPollItem.collection" />
              <p class="collectionName" v-if="selectPollItem.collection">{{ selectPollItem.collection.showName }}</p>
            </div>

            <div class="dialogContantBox_topBox_rightBox">
              <div class="rewardBox">
                <p class="rewardBox_text">{{ selectPollItemReward }}</p>
                <!-- <img class="rewardBox_img" src="@/assets/img/farms/linkIcon1.png" /> -->
              </div>
              <!-- <p class="priceText">$124.98</p> -->
              <p class="rewardDes">{{ $t("farms.awardNFT") + "/" + $t("farms.month") }}</p>
            </div>
          </div>
          <div class="dialogContantBox_sepLine"></div>

          <div class="quantityBox">
            <p class="quantityBox_leftText">{{ $t("common.quantity") }}</p>
            <p class="quantityBox_rightText">{{ selectCount }}</p>
          </div>

          <p class="stakeDes">{{ defaltAlertStakeDes }}</p>

          <button class="stakeBtnOfAction" @click="defalutStakeBtnAction">{{ defaultStakeAlertBtnStr }}</button>
        </div>
      </div>
    </el-dialog>


    <el-dialog title="" :visible.sync="stakeProcessAlertShow" :width="elDialogWidth1" :show-close="false" center
      top="200px" :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <div class="dialogTopBack">
          <div></div>
          <p class="dialogTopBack_title">
            {{ defaultAlertTitle }}
          </p>
          <img class="dialogTopBack_img" src="@/assets/img/common/close.svg" @click="stakeProcessAlertCloseAction" />
        </div>

        <div class="dialogContantBox">

          <div class="dialogContantBox_topBox">
            <div class="dialogContantBox_topBox_leftBox">
              <img class="collectionImg" :src="selectPollItem.collection.imagePath" v-if="selectPollItem.collection" />
              <div class="selectTextBox">
                <p class="collectionName" v-if="selectPollItem.collection">{{ selectPollItem.collection.showName }}</p>
                <p class="selectTextBox_count">{{ $t("common.quantity") + ": " + selectCount }}</p>
              </div>
            </div>

            <div class="dialogContantBox_topBox_rightBox">
              <div class="rewardBox">
                <p class="rewardBox_text">{{ selectPollItemReward }}</p>
                <!-- <img class="rewardBox_img" src="@/assets/img/farms/linkIcon1.png" /> -->
              </div>
              <!-- <p class="priceText">$124.98</p> -->
              <p class="rewardDes">{{ $t("farms.awardNFT") + "/" + $t("farms.month") }}</p>
            </div>
          </div>
          <div class="dialogContantBox_sepLine"></div>


          <div class="stepBox">
            <!-- 授权 -->
            <div class="stepBoxSub">
              <div class="statusImgBox">
                <img :class="approveProcessImgClass" :src="approveStatusImgUrl" />
              </div>
              <div class="stepBoxSub_contantBox">
                <p class="processDesTopTitle">{{ approveStepTitle }}</p>
                <p class="processDesBottomTitle">{{ approveStepDes }}</p>

                <div class="processStepBtnBox">
                  <button class="processStepOffBtn" v-if="isApprove">
                    {{ $t("common.haveComplete") }}
                  </button>
                  <button class="processStepOnBtn" v-if="!isApprove" @click="startApprove">
                    {{ $t("common.start") }}
                  </button>
                  <button class="processStepOnBtn" v-if="isStartedApprove">
                    {{ $t("common.approveIngStatus") }}
                  </button>

                  <button class="processStepOnBtn" v-if="isApproveFaild" @click="startApprove">
                    {{ $t("common.reStart") }}
                  </button>
                </div>
              </div>

            </div>

            <!-- 抵押/解抵押 -->
            <div class="stepBoxSub1">
              <div class="statusImgBox">
                <img :class="deployProcessImgClass" :src="delyContractStatusImgUrl" />
              </div>
              <div class="stepBoxSub_contantBox">
                <p class="processDesTopTitle">{{ deployStepTitle }}</p>
                <p class="processDesBottomTitle">
                  <span>
                    {{ deployStepDesSub1 }}
                  </span>
                  <span class="processDesBottomTitle_active">
                    {{ deployStepDesSub2 }}
                  </span>
                  {{ deployStepDesSub3 }}
                </p>

                <div class="processStepBtnBox">
                  <button class="processStepOffBtn" v-if="!isApprove">
                    {{ $t("common.unStart") }}
                  </button>
                  <button class="processStepOnBtn" v-if="isApprove && !isDelyFailed && !isDelySuccess"
                    @click="startDelyContractBtnAction()">
                    {{ $t("common.start") }}
                  </button>
                  <button class="processStepOnBtn" v-if="isStartedDelyContract">
                    {{ $t("common.deployingStatus") }}
                  </button>
                  <button class="processStepOffBtn" v-if="isDelySuccess">
                    {{ $t("common.haveComplete") }}
                  </button>
                  <button class="processStepOnBtn" v-if="isDelyFailed" @click="startDelyContractBtnAction()">
                    {{ $t("common.reStart") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>



    <el-dialog title="" :visible.sync="processSuccessAlertShow" :width="elDialogWidth1" :show-close="false" center
      top="200px" :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <div class="dialogTopBack">
          <div></div>
          <p class="dialogTopBack_title">
            {{ processSuccessAlertTitle }}
          </p>
          <img class="dialogTopBack_img" src="@/assets/img/common/close.svg" @click="stakeSuccessAlertCloseAction" />
        </div>

        <div class="dialogSuccessContantBox">
          <div class="collectionImgBox_success">
            <img class="collectionImg_success" src="@/assets/img/common/alertProcessSuccess.png"
              v-if="selectPollItem.collection" />
          </div>

          <p class="stakeSuccessDes">
            <span class="stakeSuccessDes">{{ stakeProcessSuccessDes }}</span>
            <!-- <span class="stakeSuccessDes_active">{{ selectCount }}</span>
            <span>{{ processSuccessDesSub2 }}</span>
            <span>{{ " " }}</span>
            <span class="stakeSuccessDes_active">{{ selectPollItem.collection.showName }}</span>
            <span>{{ " " }}</span>
            <span>{{ processSuccessDesSub3 }}</span> -->
          </p>
          <div class="txHashBox_process">
            <p class="txHash_pre">{{ $t("common.txHash") + ":" }}</p>
            <a :href="getChainWebUrl(txHashOringion)" target="_blank">
              <p class="txHash">{{ txHash }}</p>
            </a>
            <img class="txHash_copy" src="@/assets/img/common/copy.svg" @click="copyAddressAction(txHashOringion)" />
          </div>

          <div class="alertDesBox">
            <div class="alertDesItemBox" v-for="(item, index) in alertDesItemArr">
              <img class="alertDesItemBox_img" :src="alertDesItemBoxImgUrl(index)" />
              <p class="alertDesItemBox_text">{{ $t(item) }}</p>
            </div>
          </div>

          <div class="alertBottomBtnBox">
            <a href="https://starblock.io/assets" target="_blank" class="traddingStarblockBtn_a">
              <button class="traddingStarblockBtn">{{ "Trading WNFT" }}</button>
            </a>
            <button class="stakeBtn" @click="continueStakeBtnAction">{{ $t("common.continueStake") }}</button>

          </div>
        </div>
      </div>
    </el-dialog>


    <el-dialog title="" :visible.sync="processSuccessAlertShow1" :width="elDialogWidth1" :show-close="false" center
      top="200px" :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <div class="dialogTopBack">
          <div></div>
          <p class="dialogTopBack_title">
            {{ processSuccessAlertTitle1 }}
          </p>
          <img class="dialogTopBack_img" src="@/assets/img/common/close.svg" @click="unstakeSuccessAlertCloseAction" />
        </div>

        <div class="dialogSuccessContantBox">
          <div class="collectionImgBox_success">
            <img class="collectionImg_success" src="@/assets/img/common/alertProcessSuccess.png"
              v-if="selectPollItem.collection" />
          </div>

          <p class="stakeSuccessDes">
            <span class="stakeSuccessDes">{{ unstakeProcessSuccessDes }}</span>
            <!-- <span class="stakeSuccessDes_active">{{ selectCount }}</span>
            <span>{{ processSuccessDesSub2 }}</span>
            <span>{{ " " }}</span>
            <span class="stakeSuccessDes_active">{{ selectPollItem.collection.showName }}</span>
            <span>{{ " " }}</span>
            <span>{{ processSuccessDesSub3 }}</span> -->
          </p>
          <div class="txHashBox_process">
            <p class="txHash_pre">{{ $t("common.txHash") + ":" }}</p>
            <a :href="getChainWebUrl(txHashOringion)" target="_blank">
              <p class="txHash">{{ txHash }}</p>
            </a>
            <img class="txHash_copy" src="@/assets/img/common/copy.svg" @click="copyAddressAction(txHashOringion)" />
          </div>

          <div class="alertDesBox">
            <div class="alertDesItemBox" v-for="(item, index) in alertDesItemArr1">
              <img class="alertDesItemBox_img" :src="alertDesItemBoxImgUrl(index)" />
              <p class="alertDesItemBox_text">{{ $t(item) }}</p>
            </div>
          </div>

          <div class="alertBottomBtnBox">
            <a href="https://starblock.io/assets" target="_blank" class="traddingStarblockBtn_a">
              <button class="traddingStarblockBtn">{{ "Trading WNFT" }}</button>
            </a>
            <button class="stakeBtn" @click="continueUnstakeBtnAction">{{ $t("common.continueStake") }}</button>

          </div>
        </div>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { onConnect, initWeb3Modal, resetApp } from "@/common/useWallet";
import Farmitem from "../farms/children/FarmsItem.vue";
import Farmitemplace from "../farms/children/FarmItemPlace.vue";

import Myfarmdata from "../farms/children/MyFarmData.vue";
import Selectnft from "../farms/children/SelectNFT.vue";
import poolDatas from "@/common/dataConfig";
import poolDatas_main from "@/common/dataConfig_main";

import Countdown from "../home/children/CountDown.vue";
import { List } from "vant";
import Bottom from "../home/children/Bottom.vue";
import Course from '../farms/children/Course.vue'
import {
  web3ProviderUrl,
  getProdcutMode,
  getSurpportChainId,
  getEtherscanOfCollection,
  getEtherscanOfNFT,
  getOpenSeaOfCollection,
  getOpenSeaOfNFT
} from "@/common/starBlockConfig";
import {
  daoportAction,
  getBlockNumber,
  onBlockNumberChange,
  onLogsChange,
  approveNFTAction,
  approveWNFTAction,
  getBonusRewardAction,
  getNFTTokenIDs,
  daoporDeposit,
  getWNFTTokenIDs,
  daoporWithdraw,
  daoporHarvest,
  openseaApiBaseUrl,
  getPoolSta,
  getAllPoolInfos,
  ownedWNFTsTokenIdsByPids,
  harvestAllByWNFTTokenIds,
  getPoolInfosByNFTorWNFTs
} from "@/common/starblockdao";

import {
  getLocalStorage,
  setLocalStorage,
  isLogin,
  localAccount,
  localUserLoginObject,
  getETHPriceItemCell,
  checkChainIdError,
  formmatToToLocaleStringEnUS
} from "@/common/utils";
var ethUtil = require("ethereumjs-util");

export default {
  name: "Farms",

  components: {
    Countdown,
    List,
    Farmitem,
    Selectnft,
    Bottom,
    Course,
    Myfarmdata,
    Farmitemplace
  },
  computed: {
    topImgUrl() {
      return this.$t("course.topImg")
    },
    defaultAlertTitle() {
      if (this.isSwitch1) {
        return this.$t("common.defaultStakeAlertTitle");
      } else {
        return this.$t("common.defaultUnstakeAlertTitle");
      }
    },

    defaltAlertStakeDes() {
      if (this.isSwitch1) {
        return this.$t("common.defaultStakeAlertDes");
      } else {
        return this.$t("farms.tip3");
      }
    },
    defaultStakeAlertBtnStr() {
      if (this.isSwitch1) {
        return this.$t("farms.pledge");
      } else {
        return this.$t("farms.unPledge");
      }
    },
    stakeProcessSuccessDes() {
      return this.$t("common.stakeSuccessDes")
    },
    unstakeProcessSuccessDes() {
      return this.$t("common.unstakeSuccessDes")
    },

    processSuccessDesSub1() {
      if (this.isSwitch1) {
        return this.$t("common.stakeSuccessDesSub1")
      } else {
        return this.$t("common.unstakeSuccessDesSub1")
      }
    },
    processSuccessDesSub2() {
      if (this.isSwitch1) {
        return this.$t("common.stakeSuccessDesSub2")
      } else {
        return this.$t("common.unstakeSuccessDesSub2")
      }

    },
    processSuccessDesSub3() {
      if (this.isSwitch1) {
        return this.$t("common.stakeSuccessDesSub3")
      } else {
        return this.$t("common.unstakeSuccessDesSub3")
      }
    },

    processSuccessAlertTitle() {
      return this.$t("common.stakeSuccessTitle");
    },

    processSuccessAlertTitle1() {
      return this.$t("common.unstakeSuccessTitle");
    },
    // isApprove() {
    // return this.isSwitch1 ? this.selectPollItem.isNFTApproved : this.selectPollItem.isWNFTApproved
    // if (this.isSwitch1) {
    //   return this.selectPollItem.isNFTApproved;
    // } else {
    //   return this.selectPollItem.isWNFTApproved;
    // }
    // },
    approveStepTitle() {
      if (this.isSwitch1) {
        return this.$t("common.stakeApprove");
      } else {
        return this.$t("common.unstakeApprove");
      }
    },
    approveStepDes() {
      if (this.isSwitch1) {
        return this.$t("common.stakeApproveNFTDes");
      } else {
        return this.$t("common.stakeApproveWNFTDes");
      }
    },
    deployStepTitle() {
      if (this.isSwitch1) {
        return this.$t("common.confirmStake");
      } else {
        return this.$t("common.confirmUnStake");
      }
    },
    deployStepDesSub1() {
      if (this.isSwitch1) {
        return this.$t("common.confirmStakeDesSub1");
      } else {
        return this.$t("common.confirmUnstakeDesSub1");
      }

    },
    deployStepDesSub2() {
      return this.isSwitch1 ? this.selectPollItem.collection.showName : "Wrapped" + this.selectPollItem.collection.showName;
      // if (this.isSwitch1) {
      //   return this.selectPollItem.collection.showName;
      // } else {
      //   return "Wrapped" + this.selectPollItem.collection.showName;
      // }

    },
    deployStepDesSub3() {
      if (this.isSwitch1) {
        return this.$t("common.confirmStakeDesSub2");
      } else {
        return this.$t("common.confirmUnstakeDesSub2");
      }

    },
    selectPollItemReward() {
      if (Number(this.selectPollItem.rewardPerNFTForEachBlock) > 0) {
        return formmatToToLocaleStringEnUS((Number(this.selectPollItem.rewardPerNFTForEachBlock) * 6500 * 30 * Math.pow(10, -18)).toFixed(2)) + " STB";
      } else if (Number(this.selectPollItem.rewardForEachBlock) > 0 && Number(this.selectPollItem.poolInfo.amount) != 0) {
        return formmatToToLocaleStringEnUS((
          (Number(this.selectPollItem.rewardForEachBlock) * 6500 * 30 * Math.pow(10, -18)) /
          Number(this.selectPollItem.poolInfo.amount)
        ).toFixed(2)) + " STB"
      } else if (Number(this.selectPollItem.poolInfo.amount) == 0) {
        return Number(this.rewardAmount(this.selectPollItem).toFixed(2)) + " STB"
      }
    },
    selectIconUrl() {
      return this.selectAll
        ? require("@/assets/img/farms/nft_select_y.svg")
        : require("@/assets/img/farms/nft_select_n.svg");
    },
    totalRewardStr() {
      if (this.totalReward * Math.pow(10, -18) > 10000) {
        return formmatToToLocaleStringEnUS((this.totalReward * Math.pow(10, -18)).toFixed(0)) + " STB";
      } else {
        return this.totalReward > 0
          ? formmatToToLocaleStringEnUS((this.totalReward * Math.pow(10, -18)).toFixed(2)) + " STB"
          : "--" + " STB";
      }
    },
    totalNftQuantityStr() {
      return formmatToToLocaleStringEnUS(this.totalNftQuantity) + " NFT"
    },
    totalTVLStr() {
      return formmatToToLocaleStringEnUS(Number(this.totalTVL.toFixed(2))) + " ETH"
    },

    totalBonusStr() {



      if (this.poolSta.totalRewardedDividend != "--") {
        return Number((this.poolSta.totalRewardedDividend * Math.pow(10, -18)).toFixed(2)) + " WETH";
      }
      if (this.poolSta.totalRewardedDividend == "--") {
        return "-- WETH";
      }
      return this.poolSta.totalRewardedDividend;

      if (this.totalBonus * Math.pow(10, -18) > 10000) {
        return formmatToToLocaleStringEnUS((this.totalBonus * Math.pow(10, -18)).toFixed(0)) + " WETH";
      } else {
        // if (this.totalBonus = "--") {
        //   return "-- WETH";
        // } else {
        return this.totalBonus > 0 ? formmatToToLocaleStringEnUS((this.totalBonus * Math.pow(10, -18)).toFixed(2)) + " WETH" : "0 WETH"
        // }
      }
    },
    defaultMessageStr() {
      if (this.isGetReward) {
        return this.$t("common.defaultMessSub4");
      }
      if (this.isSwitch1) {
        return this.selectCount == 1
          ? this.$t("common.defaultMessSub1") +
          this.selectCount +

          this.$t("common.defaultMessSub2") + " " +
          "NFT"
          : this.$t("common.defaultMessSub1") +
          this.selectCount +
          this.$t("common.defaultMessSub2") + " " +
          "NFTs";
      } else {
        return this.selectCount == 1
          ? this.$t("common.defaultMessSub3") +
          " " +
          this.selectCount +
          this.$t("common.defaultMessSub2") +
          "WNFT"
          : this.$t("common.defaultMessSub3") +
          " " +
          this.selectCount +
          this.$t("common.defaultMessSub2") +
          "WNFTs";
      }
    },

    defaultMessageDesStr() {
      if (this.isGetReward) {
        return this.$t("common.defaultMessSub4Des");
      }
      if (this.isSwitch1) {
        return this.$t("farms.tip4") + "，" + this.$t("farms.tip6");
      } else {
        return this.$t("farms.tip3");
      }
    },

    dialogDesColor() {
      if (this.isGetReward) {
        return "#f7b500";
      }
      if (this.isSwitch1) {
        return "#666";
      } else {
        return "#666";
      }
    },

    requestSuccessStr() {
      return this.$t("farms.depositSuccess");
    },

    requestSuccessStr1() {
      return this.$t("farms.withdrawSuccess");
    },

    requestSuccessStr2() {
      return this.$t("farms.getRewardSuccess");
    },

    alertActionStr() {
      if (this.isSwitch1) {
        return this.$t("farms.pledge");
      } else {
        return this.$t("farms.unPledge");
      }
    }
  },
  data() {
    var topImgHeight = 0;
    topImgHeight = document.documentElement.clientWidth > 750 ? "7rem" : "6rem";

    var elDialogWidth1 = "450px";
    if (document.documentElement.clientWidth <= 1200) {
      elDialogWidth1 = "350px";
    } else if (document.documentElement.clientWidth > 1200 && document.documentElement.clientWidth < 1500) {
      elDialogWidth1 = "400px";
    } else {
      elDialogWidth1 = "480px";
    }

    return {
      alertDesItemArr: ["common.stakeAlertItem1",
        "common.stakeAlertItem2",
        "common.stakeAlertItem3",
        "common.stakeAlertItem4",
        "common.stakeAlertItem5"],

      alertDesItemArr1: ["common.unstakeAlertItem1",
        "common.unstakeAlertItem2",
        "common.unstakeAlertItem3",
        "common.unstakeAlertItem4",
        "common.unstakeAlertItem5"],

      shortNameStr: "common.sortOption1",
      shortList: ["common.sortOption1", "common.sortOption2", "common.sortOption3", "common.sortOption4", "common.sortOption5"],
      dropdownClickIndex: 0,
      isSearchEmpty: false,
      keyword: "",
      pids: [],
      placeholderText: "common.searchPlace",
      searchText: "",
      drow_upDownImgUrl: require("@/assets/img/common/drow_down.svg"),
      sort_myNFTimgUrl: require("@/assets/img/common/sort_unselect.svg"),
      sort_myWNFTimgUrl: require("@/assets/img/common/sort_unselect.svg"),
      selectSortMyNFT: false,
      selectSortMyWNFT: false,
      poolSta: { totalNFTAmount: "--", totalRewardedToken: "--", totalRewardedDividend: "--" },
      userInfo: { dividend: "--", mining: "--", nftQuantity: "--", wnftQuantity: "--", selectedAddress: null, blockNumber: "--", tokenBalance: "--" },
      topItemList: ["course.guide1", 'course.guide2', 'course.guide3', 'course.guide4'],
      deployProcessImgClass: "processImg",
      approveProcessImgClass: "processImg",
      processSuccessAlertShow: false,
      processSuccessAlertShow1: false,
      isDelyFailed: false,
      isDelySuccess: false,
      isStartedDelyContract: false,
      isStartedApprove: false,
      isApprove: false,
      isApproveFaild: false,
      approveStatusImgUrl: require("@/assets/img/common/step1.svg"),
      delyContractStatusImgUrl: require("@/assets/img/common/step2.svg"),
      stakeProcessAlertShow: false,
      defaultAlertShow: false,
      loadPoolDataCount: 0,
      selectAll: false,
      actionAlertShowLoading: false,
      txHash: "",
      txHashOringion: "",
      successVisible: false,
      successVisible1: false,
      successVisible2: false,

      selectPollItem: { collection: {}, poolInfo: {} },
      elDialogWidth: document.documentElement.clientWidth > 1200 ? "500px" : "350px",
      elDialogWidth1: elDialogWidth1,
      warningDefaultVisible: false,
      warningDefaultVisible1: false,
      warningDefaultVisible2: false,
      warningDefaultReceiveAllReward: false,

      selectTokenIdsArr: [],
      selectCount: 0,
      totalNftQuantity: "--",
      totalTVL: 0,
      totalReward: "--",
      totalBonus: "--",

      currentBlockNumber: 0,
      topImgHeight: topImgHeight,
      topBackImgUrl:
        document.documentElement.clientWidth > 750
          ? require("@/assets/img/farms/topBack.jpg")
          : require("@/assets/img/farms/mobile/topBack.png"),
      isSwitch1: true,
      isGetReward: false,
      poolItems: [],
      placeItems: ["", "", "", "", "", "", "", ""],
      handledPoolItems: [],
      wrappedPoolInfos: [],
      canSelectNftItems: [],
      isShowEmptyImg: true,
      NFTItems: [],
      WNFTItems: [],

      elDialogEditSellDataWidth: document.documentElement.clientWidth > 750 ? "900px" : "350px",
      elDialogEditSellDataHeight: "918px",
      actionAlertShow: false,
      items: [],
      isScroll: false,
      isClickTab: false,
      active: 0,
      isShowMobile: document.documentElement.clientWidth > 750 ? false : true
    };
  },

  beforeRouteEnter(to, from, next) {
    undefined;
    next(vm => {
      undefined;
      // 通过 `vm` 访问组件实例,将值传入fromPath
    });
  },
  beforeUpdate() { },
  beforeRouteEnter(to, from, next) {
    undefined;
    next(vm => {
      undefined;
      // 通过 `vm` 访问组件实例,将值传入fromPath
      // vm.setScrollToPostion();
    });
  },
  created() {
    // var prama = {
    //   treeId: 0,
    //   address: "0x3664d9F2b27C58D7ee71D436F27F5034359cD6fa",
    // }
    // var urlPath = "/tree/user";
    // this.$axios
    //   .get(urlPath, {
    //     params: prama
    //   })
    //   .then(res => {
    //     console.log("tree/user*******", res.data);
    //   });


    getBlockNumber(this.updateBlockData);
    onLogsChange();
    // onBlockNumberChange(this.updateBlockData);
    setTimeout(() => {
      this.$bus.$emit("updateTabIndex", 1);
    });


    var list = [];
    if (getProdcutMode() == 1) {
      list = poolDatas_main;
    } else {
      list = poolDatas;
    }
    list.sort(this.compare("sort"));
    this.poolItems = list
    var emptyPids = [];
    this.poolItems.forEach(element => emptyPids.push(element.poolInfo.pid));
    console.log("pids", emptyPids)
    this.pids = emptyPids;

    setTimeout(() => {
      if (this.$route.query.keyword != "" && this.$route.query.keyword != null) {
        this.searchText = this.$route.query.keyword;
        this.searchBtnAction();
      } else {
        var isFirstLoad = true;
        this.getMasterChefInfo(isFirstLoad);
      }

    }, 2000);
    this.loadPoolDataCount = 0
    // setInterval(() => {
    //   if (this.loadPoolDataCount == 5) {
    //     return;
    //   }
    //   this.getMasterChefInfo(false);
    //   getBlockNumber(this.updateBlockData);
    //   this.loadPoolDataCount = this.loadPoolDataCount + 1;
    // }, 1000 * 60 * 2);

    setInterval(() => {
      this.$bus.$emit("showRefeshIcon", "1");
    }, 1000 * 60 * 2);

    // setInterval(() => {
    //   this.$bus.$emit("showRefeshIcon", "1");
    // }, 1000);

  },
  watch: {
    windowWidth(val) {
      this.windowWidth = val;
      let that = this;
      if (that.windowWidth > 750) {
        // that.isShowMobile = false;
      } else {
        // that.isShowMobile = true;
      }
      console.log(that.windowWidth);
      // this.ratio = this.detectZoom();

      var html = document.documentElement; //获取到html元素
      var hWidth = that.windowWidth; //获取到html的宽度
      // 当hWidth大于640时，则物理分辨率小于1280（这就看设备的devicePixelRatio这个值了），应该去访问pc网站了
      // alert(hWidth);
      var bili = Number(this.ratio) / 100;
      if (this.ratio > 100) {
        this.metaItemContantDesFontSize = 14 / (3 * bili) + "px";
      }
    },
    $route(to, from) {
      // if (to.name == "farms") {
      //   var keyWord = getLocalStorage("keyword");
      //   this.keyword = keyWord;
      // }
      if (this.$route.query.keyword != "" && this.$route.query.keyword != null) {
        this.searchText = this.$route.query.keyword;
        this.searchBtnAction();
      }
    }

  },
  mounted() {
    this.$bus.$on("refreshAllData", val => {
      this.getMasterChefInfo(false)
    }),

      this.$bus.$on("harvestAllNoti", val => {
        this.warningDefaultReceiveAllReward = true;
        this.isGetReward = true;
      }),

      this.$bus.$on("selectNftAction", val => {
        this.setSelectIdsArr();
      }),

      this.$bus.$on("pledgeBtnNotiAction", val => {
        this.actionAlertShowLoading = true;

        this.selectPollItem = val.item;
        this.selectPollItem.showImgLoading = true;
        this.isGetReward = val.isGetReward;

        if (this.isGetReward) {
          this.warningDefaultVisible = true;
        } else {
          if (val.isNFTSell) {
            getNFTTokenIDs(val.item, this.handleGetNFTTokenIDs);
            this.isSwitch1 = true;
          }
          if (val.isWNFTSell) {
            getWNFTTokenIDs(val.item, this.handleGetWNFTTokenIDs);
            this.isSwitch1 = false;
          }
          this.$bus.$emit("switchBtnAction", this.isSwitch1);
          this.resetSelectNFT();
          this.actionAlertShow = true;
        }
      });
    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        // that.windowHeight = window.fullHeight; // 高
        that.windowWidth = window.fullWidth; // 宽
      })();
    };
  },

  methods: {
    alertDesItemBoxImgUrl(index) {
      if (index <= 1) {
        return require("@/assets/img/common/requestSuccess.svg");
      } else {
        return require("@/assets/img/common/alertDesItemIcon.svg");

      }
    },
    rewardAmount(item) {
      if (Number(item.rewardForEachBlock) > 0) {
        var number = Number(item.rewardForEachBlock) * 6500 * 30 * Math.pow(10, -18);
        return number;
        // if (number >= 10000) {
        //   return formmatToToLocaleStringEnUS(number.toFixed(0));
        // } else {
        //   return formmatToToLocaleStringEnUS(Number(number.toFixed(2)));
        // }
      } else if (Number(item.rewardPerNFTForEachBlock) > 0 && Number(item.poolInfo.amount) > 0) {
        var number =
          Number(item.rewardPerNFTForEachBlock) *
          6500 *
          30 *
          (Number(item.poolInfo.amount) *
            Math.pow(10, -18));
        return number;
        // if (number >= 10000) {
        //   return formmatToToLocaleStringEnUS(number.toFixed(0));
        // } else {
        //   return formmatToToLocaleStringEnUS(Number(number.toFixed(2)));
        // }
      } else if (Number(item.poolInfo.amount) == 0) {
        return "--";
      } else if (item.rewardForEachBlock == "--") {
        return "--";
      }
    },

    rewardPerNFTAmount(item) {
      if (Number(item.rewardPerNFTForEachBlock) > 0) {
        return (Number(item.rewardPerNFTForEachBlock) * 6500 * 30 * Math.pow(10, -18)).toFixed(2)

        // return formmatToToLocaleStringEnUS((Number(item.rewardPerNFTForEachBlock) * 6500 * 30 * Math.pow(10, -18)).toFixed(2))
      } else if (Number(item.rewardForEachBlock) > 0 && Number(item.poolInfo.amount) != 0) {
        return (
          (Number(item.rewardForEachBlock) * 6500 * 30 * Math.pow(10, -18)) /
          Number(item.poolInfo.amount)
        ).toFixed(2);
        // return formmatToToLocaleStringEnUS((
        //   (Number(item.rewardForEachBlock) * 6500 * 30 * Math.pow(10, -18)) /
        //   Number(item.poolInfo.amount)
        // ).toFixed(2));
      } else if (Number(item.poolInfo.amount) == 0) {
        return this.rewardAmount(item)
      } else {
        return "--";
      }
    },
    dropdownClick(command) {
      var index = this.getArrayIndex(this.shortList, command);
      this.dropdownClickIndex = index;
      this.drow_upDownImgUrl = require("@/assets/img/common/drow_down.svg");

      this.shortNameStr = command;
      console.log(command);
      if (this.searchText.length > 0) {
        this.searchText = "";
        this.$router.push({ path: "/nftfarming", query: {} });
        this.sortPoolInfos(this.selectSortMyNFT, this.selectSortMyWNFT)
      } else {
        this.sortHandledPoolItems();
      }


    },

    getArrayIndex(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return i;
        }
      }
      return -1;
    },
    dropdownHiddenClick(value) {
      this.drow_upDownImgUrl = value == true ? require("@/assets/img/common/drow_up.svg") : require("@/assets/img/common/drow_down.svg");
    },
    enterSearch() {
      if (this.searchText.length > 0) {
        this.$router.push({ path: "/nftfarming", query: { keyword: this.searchText } });
      } else {
        this.$router.push({ path: "/nftfarming", query: {} });
      }
    },
    resetSelectSortStatus() {
      this.selectSortMyWNFT = false;
      this.selectSortMyNFT = false;
      this.sort_myNFTimgUrl = this.selectSortMyNFT ? require("@/assets/img/common/sort_select.svg") : require("@/assets/img/common/sort_unselect.svg")
      this.sort_myWNFTimgUrl = this.selectSortWMyNFT ? require("@/assets/img/common/sort_select.svg") : require("@/assets/img/common/sort_unselect.svg")
      this.dropdownClickIndex = 0;
      this.shortNameStr = this.shortList[this.dropdownClickIndex];
    },
    searchBtnAction(isReset) {
      if (this.searchText.length == 0 && !isReset) {
        return;
      }
      this.resetSelectSortStatus();
      this.handledPoolItems = [];
      if (this.searchText.length > 0) {
        this.$router.push({ path: "/nftfarming", query: { keyword: this.searchText } });
      } else {
        this.$router.push({ path: "/nftfarming", query: {} });
      }
      if (!ethUtil.isValidAddress(this.searchText)) {
        this.sortPoolInfos(this.selectSortMyNFT, this.selectSortMyWNFT)
      } else {
        getPoolInfosByNFTorWNFTs(this.searchText, this.handlePoolInfos);
      }
    },
    cancleAllRewardAlertBtnAction() {
      this.warningDefaultReceiveAllReward = false;
      this.$bus.$emit("resetBtnStatusNoti", "1");

    },
    defaulAllRewardAlertBtnAction() {
      ownedWNFTsTokenIdsByPids(this.pids, this.handleWNFTsTokenIds)
      this.warningDefaultReceiveAllReward = false;
      this.isGetReward = false;
    },
    handleWNFTsTokenIds(WNFTsTokenIds) {
      harvestAllByWNFTTokenIds(WNFTsTokenIds, this.pids, this.handleHarvestAll, this.getHarvestAllTxHash, this.harvestAllFaild,)
    },
    harvestAllFaild() {
      this.isGetReward = false;
      this.$bus.$emit("resetBtnStatusNoti", "1");
    },

    sortPoolInfos(canDeposite, deposited) {
      this.isSearchEmpty = false;
      getAllPoolInfos(this.handlePoolInfos, canDeposite, deposited)
    },
    clearSearchText() {
      if (this.searchText.length > 0) {
        this.searchText = "";
        this.$router.push({ path: "/nftfarming", query: {} });
        this.searchBtnAction(true)
      }
    },
    sortMyNFTAction() {
      this.selectSortMyNFT = !this.selectSortMyNFT;
      this.sort_myNFTimgUrl = this.selectSortMyNFT ? require("@/assets/img/common/sort_select.svg") : require("@/assets/img/common/sort_unselect.svg")
      this.handledPoolItems = [];
      this.searchText = "";
      this.$router.push({ path: "/nftfarming", query: {} });
      this.sortPoolInfos(this.selectSortMyNFT, this.selectSortMyWNFT);
    },
    sortMyWNFTAction() {
      this.selectSortMyWNFT = !this.selectSortMyWNFT;
      this.sort_myWNFTimgUrl = this.selectSortMyWNFT ? require("@/assets/img/common/sort_select.svg") : require("@/assets/img/common/sort_unselect.svg")
      this.handledPoolItems = [];
      this.searchText = "";
      this.$router.push({ path: "/nftfarming", query: {} });
      this.sortPoolInfos(this.selectSortMyNFT, this.selectSortMyWNFT);
    },
    changeTab() {
      // setTimeout(() => {
      //   this.active = index;
      // }, 50);

      let blocks = document.querySelectorAll(".courseSectionBox");
      console.log("--changeTab", blocks[0].id);
      let step = 40; //滚动步长
      let currentScrollTop = this.$refs.content.scrollTop;
      let targetOffsetTop = blocks[0].offsetTop - 30;
      // let targetOffsetTop = 0;
      // if (index == 0) {
      //   targetOffsetTop = blocks[index].offsetTop;
      // }
      console.log("currentScrollTop", currentScrollTop);
      console.log("targetOffsetTop", targetOffsetTop);

      setTimeout(() => {
        if (document.documentElement.clientWidth < 1200) {
          document.documentElement.scrollTop = targetOffsetTop - 45;
          document.body.scrollTop = targetOffsetTop - 45;
        } else {
          document.documentElement.scrollTop = targetOffsetTop - (80 * document.documentElement.clientWidth / 1920);
          document.body.scrollTop = targetOffsetTop - (80 * document.documentElement.clientWidth / 1920);
        }

      }, 100);
      // this.$refs.content.scrollTop = targetOffsetTop;
    },
    courseRightBoxClick() {
      this.changeTab()
      // document.querySelector("#main3").scrollIntoView();
    },
    // rewardAmount(item) {
    //   if (Number(item.rewardForEachBlock) > 0) {
    //     var number = Number(item.rewardForEachBlock) * 6500 * 30 * Math.pow(10, -18);
    //     if (number >= 10000) {
    //       return formmatToToLocaleStringEnUS(number.toFixed(0));
    //     } else {
    //       return formmatToToLocaleStringEnUS(Number(number.toFixed(2)));
    //     }
    //   } else if (Number(item.rewardPerNFTForEachBlock) > 0 && Number(item.poolInfo.amount) > 0) {
    //     var number =
    //       Number(item.rewardPerNFTForEachBlock) *
    //       6500 *
    //       30 *
    //       formmatToToLocaleStringEnUS(Number(item.poolInfo.amount) *
    //         Math.pow(10, -18));
    //     if (number >= 10000) {
    //       return formmatToToLocaleStringEnUS(number.toFixed(0));
    //     } else {
    //       return formmatToToLocaleStringEnUS(Number(number.toFixed(2)));
    //     }
    //   } else if (Number(item.poolInfo.amount) == 0) {
    //     return "--";
    //   } else if (item.rewardForEachBlock == "--") {
    //     return "--";
    //   }
    // },
    stakeSuccessAlertCloseAction() {
      this.processSuccessAlertShow = false;
    },
    continueStakeBtnAction() {
      this.processSuccessAlertShow = false;
    },
    unstakeSuccessAlertCloseAction() {
      this.processSuccessAlertShow1 = false;
    },
    continueUnstakeBtnAction() {
      this.processSuccessAlertShow1 = false;
    },
    startDelyContractBtnAction() {
      this.isDelyFailed = false;
      this.deployProcessImgClass = "processImg_loading"
      this.delyContractStatusImgUrl = require("@/assets/img/common/requestLoading_yellow.svg");

      this.isStartedDelyContract = true;
      if (this.isSwitch1) {
        daoporDeposit(
          this.selectPollItem,
          this.handleDeposit,
          this.selectTokenIdsArr,
          this.faildHandleDaoporDeposit,
          this.getDepositTxHash
        );
      } else {
        daoporWithdraw(
          this.selectPollItem,
          this.handleWithdraw,
          this.selectTokenIdsArr,
          this.faildHandleDaoporWithdraw,
          this.getWithdrawTxHash
        );
      }
    },
    startApprove() {
      this.isApproveFaild = false;
      this.approveStatusImgUrl = require("@/assets/img/common/requestLoading_yellow.svg");
      this.approveProcessImgClass = "processImg_loading"
      this.isStartedApprove = true;
      if (this.isSwitch1) {
        approveNFTAction(
          this.selectPollItem,
          this.handleNftApprove,
          0,
          false,
          this.faildHandleApproveNFT,
          this.getApproveNFTTxHash
        );
      } else {
        approveWNFTAction(
          this.selectPollItem,
          this.handleWNftApprove,
          0,
          false,
          this.faildHandleApproveWNFT,
          this.getApproveWNFTTxHash
        );
      }
    },
    getApproveNFTTxHash(txHash) {
      var messageList = this.$store.getters.messageList;
      var messageObj = {
        type: 1,
        optionName: "common.optionName1",
        txHash: txHash,
      };
      messageList.push(messageObj);
      this.$store.commit('changeMessageList', messageList);
    },
    getApproveWNFTTxHash(txHash) {
      var messageList = this.$store.getters.messageList;
      var messageObj = {
        type: 2,
        optionName: "common.optionName2",
        txHash: txHash,
        optionTime: new Date().getTime()
      };
      messageList.push(messageObj);
      this.$store.commit('changeMessageList', messageList);
    },
    getHarvestAllTxHash(txHash) {
      var messageList = this.$store.getters.messageList;
      var messageObj = {
        type: 5,
        optionName: "common.optionName5",
        txHash: txHash,
        optionTime: new Date().getTime()
      };
      messageList.push(messageObj);
      this.$store.commit('changeMessageList', messageList);
    },
    getDepositTxHash(txHash) {
      var messageList = this.$store.getters.messageList;
      var messageObj = {
        type: 3,
        optionName: "common.optionName3",
        txHash: txHash,
        optionTime: new Date().getTime()
      };
      messageList.push(messageObj);
      this.$store.commit('changeMessageList', messageList);
    },
    getWithdrawTxHash(txHash) {
      var messageList = this.$store.getters.messageList;
      var messageObj = {
        type: 4,
        optionName: "common.optionName4",
        txHash: txHash,
        optionTime: new Date().getTime()
      };
      messageList.push(messageObj);
      this.$store.commit('changeMessageList', messageList);
    },
    getHarvestTxHash(txHash) {
      var messageList = this.$store.getters.messageList;
      var messageObj = {
        type: 5,
        optionName: "common.optionName5",
        txHash: txHash,
        optionTime: new Date().getTime()
      };
      messageList.push(messageObj);
      this.$store.commit('changeMessageList', messageList);
    },
    stakeProcessAlertCloseAction() {
      this.stakeProcessAlertShow = false;
    },
    stakeAlertCloseAction() {
      this.defaultAlertShow = false;
    },
    defalutStakeBtnAction() {
      this.defaultAlertShow = false;
      this.stakeProcessAlertShow = true;
      if (this.isSwitch1) {
        if (!this.selectPollItem.isNFTApproved) {
          this.approveStatusImgUrl = require("@/assets/img/common/requestLoading_yellow.svg");
          this.approveProcessImgClass = "processImg_loading"
          this.isStartedApprove = true;
          this.isApprove = false;
          approveNFTAction(
            this.selectPollItem,
            this.handleNftApprove,
            0,
            false,
            this.faildHandleApproveNFT,
            this.getApproveNFTTxHash
          );
        } else {
          this.startDelyContractBtnAction();
          this.approveStatusImgUrl = require("@/assets/img/common/requestSuccess.svg");
          this.approveProcessImgClass = "processImg"
          this.isApprove = true;

        }
      } else {
        if (!this.selectPollItem.isWNFTApproved) {
          this.approveStatusImgUrl = require("@/assets/img/common/requestLoading_yellow.svg");
          this.approveProcessImgClass = "processImg_loading"
          this.isStartedApprove = true;
          this.isApprove = false;
          approveWNFTAction(
            this.selectPollItem,
            this.handleWNftApprove,
            0,
            false,
            this.faildHandleApproveWNFT,
            this.getApproveWNFTTxHash

          );
        } else {
          this.isApprove = true;
          this.startDelyContractBtnAction();
          this.approveStatusImgUrl = require("@/assets/img/common/requestSuccess.svg");
          this.approveProcessImgClass = "processImg"
        }
      }


    },

    handleNftApprove(isApprove, item, index, res) {
      this.selectPollItem.isNFTApproved = isApprove;
      this.approveStatusImgUrl = require("@/assets/img/common/requestSuccess.svg");
      this.approveProcessImgClass = "processImg"
      this.isApprove = true;
      this.isStartedApprove = false;
      this.startDelyContractBtnAction();

      var messageList = this.$store.getters.messageList;
      messageList.splice(messageList.findIndex(item => item.txHash === res.transactionHash), 1)
      this.$store.commit('changeMessageList', messageList);
    },
    faildHandleApproveNFT(item) {
      this.isApproveFaild = true;
      this.approveStatusImgUrl = require("@/assets/img/common/step1.svg");
      this.approveProcessImgClass = "processImg"
      this.$message.error(this.$t("common.transactionCancle"))
    },
    handleWNftApprove(isApprove, item, index, res) {
      this.selectPollItem.isWNFTApproved = isApprove;
      this.approveStatusImgUrl = require("@/assets/img/common/requestSuccess.svg");
      this.approveProcessImgClass = "processImg"
      this.isStartedApprove = false;
      this.isApprove = true;
      this.startDelyContractBtnAction();

      var messageList = this.$store.getters.messageList;
      messageList.splice(messageList.findIndex(item => item.txHash === res.transactionHash), 1)
      this.$store.commit('changeMessageList', messageList);
    },
    faildHandleApproveWNFT() {
      this.isApproveFaild = true;
      this.approveStatusImgUrl = require("@/assets/img/common/step1.svg");
      this.approveProcessImgClass = "processImg"
      this.$message.error(this.$t("common.transactionCancle"))
    },

    compare(p) { //这是比较函数
      return function (m, n) {
        var a = m[p];
        var b = n[p];
        return a - b; //升序
      }
    },
    compareDes(p) { //这是比较函数
      return function (m, n) {
        var a = m[p];
        var b = n[p];
        return b - a; //降序
      }
    },
    setSelectIdsArr() {
      var selectTokenIdsArr = [];
      Object.keys(this.canSelectNftItems).forEach(key => {
        var item = this.canSelectNftItems[key];
        if (item.select) {
          selectTokenIdsArr.push(item.tokenId);
        }
      });
      this.selectTokenIdsArr = selectTokenIdsArr;
      this.selectCount = this.selectTokenIdsArr.length;
    },
    selectAllAction() {
      this.selectAll = !this.selectAll;
      Object.keys(this.canSelectNftItems).forEach(key => {
        var item = this.canSelectNftItems[key];
        item.select = this.selectAll;
      });
      this.setSelectIdsArr();
    },
    getChainWebUrl(subStr) {
      if (getProdcutMode() == 1) {
        return "https://etherscan.io/tx/" + subStr;
      } else {
        return "https://rinkeby.etherscan.io/tx/" + subStr;
      }
    },
    requestFloorPrice(item, handleFloorPrice, index) {
      // var urlPath = openseaApiBaseUrl() + "collection/" + item.collection.name + "/stats";
      var urlPath = "collection/" + item.collection.name + "/stats";
      // this.axios.defaults.baseURL = "https://api.opensea.io/api/v1/";
      this.$axios
        .get(urlPath, {
          params: {}
        })
        .then(res => {
          if (handleFloorPrice) {
            handleFloorPrice(item, res.data.stats.floor_price);

          }
          console.log("collection/doodles-official/stats", res.data.stats.floor_price);
        });
    },
    handleFloorPrice(item, floor_price, index) {
      item.floor_price = floor_price;
      if (Number(item.poolInfo.amount) > 0) {
        this.totalTVL += Number(item.floor_price) * Number(item.poolInfo.amount);
      }

      // // if (index == this.poolItems.length - 1) {
      // this.totalTVL = 0;
      // for (var i = 0; i < this.poolItems.length; i++) {
      //   const item = this.poolItems[i];
      //   this.totalTVL += Number(item.floor_price) * Number(item.poolInfo.amount);
      // }
      // }
    },
    awardAmountStr(mining) {
      if (mining != "--") {
        var number = mining * Math.pow(10, -18);
        if (number >= 10000) {
          return number.toFixed(0) + " STB";
        } else {
          return Number(number.toFixed(2)) + " STB";
        }
      }
      return mining;
    },
    copyAddressAction(address) {
      var that = this;
      var clipBoardContent = address;
      this.$copyText(clipBoardContent).then(
        function (e) {
          that.$message.success(that.$t("common.copySucceess"));
          console.log(e);
        },
        function (e) {
          that.$message.error("复制失败");
          console.log(e);
        }
      );
    },
    getFrommatAccount(account) {
      if (account) {
        var str1 = account.substr(0, 5);
        var str2 = "...";
        var str3 = account.substr(-4, 4);
        return str1 + str2 + str3;
      } else {
        return "";
      }
    },
    alertCloseBtnAction() {
      this.successVisible = false;
      this.successVisible1 = false;
      this.successVisible2 = false;
    },
    alertBeforeAction() {
      if (this.selectTokenIdsArr.length == 0) {
        return;
      }
      if (checkChainIdError()) {
        this.$bus.$emit("checkChainIdError", "1");
        return;
      }
      this.actionAlertShow = false;
      this.defaultAlertShow = true;
      // this.warningDefaultVisible = true;
    },
    defaultBtnAction() {

      if (checkChainIdError()) {
        this.$bus.$emit("checkChainIdError", "1");
        return;
      }
      this.warningDefaultVisible = false;
      this.warningDefaultVisible1 = false;
      this.warningDefaultVisible2 = false;

      this.actionAlertShow = false;

      var isHarvest = true;
      // if (this.isGetReward) {
      //   getWNFTTokenIDs(this.selectPollItem, this.handleGetWNFTTokenIDs, isHarvest);
      // }
      if (this.isGetReward) {
        getWNFTTokenIDs(this.selectPollItem, this.handleGetWNFTTokenIDs, isHarvest);
        this.$bus.$emit("defaultBtnNotiAction", { selectItem: this.selectPollItem, clickType: 2 });
      } else {
        if (this.isSwitch1) {
          this.$bus.$emit("defaultBtnNotiAction", {
            selectItem: this.selectPollItem,
            clickType: 0
          });
          daoporDeposit(
            this.selectPollItem,
            this.handleDeposit,
            this.selectTokenIdsArr,
            this.faildHandleDaoporDeposit,
            this.getDepositTxHash
          );
        } else {
          daoporWithdraw(
            this.selectPollItem,
            this.handleWithdraw,
            this.selectTokenIdsArr,
            this.faildHandleDaoporWithdraw,
            this.getWithdrawTxHash
          );
          this.$bus.$emit("defaultBtnNotiAction", {
            selectItem: this.selectPollItem,
            clickType: 1
          });
        }
      }
    },
    faildHandleDaoporDeposit(item) {
      this.deployProcessImgClass = "processImg"
      this.delyContractStatusImgUrl = require("@/assets/img/common/step2.svg");
      this.isDelyFailed = true;
      this.isStartedDelyContract = false;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 0 });
      this.$message.error(this.$t("common.transactionCancle"))
    },
    faildHandleDaoporWithdraw(item) {
      this.deployProcessImgClass = "processImg"
      this.delyContractStatusImgUrl = require("@/assets/img/common/step2.svg");
      this.isDelyFailed = true;
      this.isStartedDelyContract = false;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 1 });
      this.$message.error(this.$t("common.transactionCancle"))
    },
    faildHandleDaoporHarvest(item) {
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 2 });
      this.$message.error(this.$t("common.transactionCancle"))
    },

    cancleBtnAction() {
      this.warningDefaultVisible = false;
      this.warningDefaultVisible1 = false;
      this.warningDefaultVisible2 = false;

    },

    handleDeposit(txHash, item) {

      this.txHash = this.getFrommatAccount(txHash.transactionHash);
      this.txHashOringion = txHash.transactionHash;
      this.getMasterChefInfo(false);
      this.processSuccessAlertShow = true;
      this.actionAlertShow = false;
      this.stakeProcessAlertShow = false;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 0 });

      var messageList = this.$store.getters.messageList;
      messageList.splice(messageList.findIndex(item => item.txHash === txHash.transactionHash), 1)
      this.$store.commit('changeMessageList', messageList);
    },
    handleWithdraw(txHash, item) {
      this.txHash = this.getFrommatAccount(txHash.transactionHash);
      this.txHashOringion = txHash.transactionHash;
      this.getMasterChefInfo(false);
      this.processSuccessAlertShow1 = true;
      this.actionAlertShow = false;
      this.stakeProcessAlertShow = false;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 1 });

      var messageList = this.$store.getters.messageList;
      messageList.splice(messageList.findIndex(item => item.txHash === txHash.transactionHash), 1)
      this.$store.commit('changeMessageList', messageList);
    },
    handleHarvest(txHash, item) {
      this.txHash = this.getFrommatAccount(txHash.transactionHash);
      this.txHashOringion = txHash.transactionHash;
      this.getMasterChefInfo(false);
      this.successVisible2 = true;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 2 });

      var messageList = this.$store.getters.messageList;
      messageList.splice(messageList.findIndex(item => item.txHash === txHash.transactionHash), 1)
      this.$store.commit('changeMessageList', messageList);
    },
    handleHarvestAll(txHash) {
      this.isGetReward = false;
      this.$bus.$emit("resetBtnStatusNoti", "1");

      this.txHash = this.getFrommatAccount(txHash.transactionHash);
      this.txHashOringion = txHash.transactionHash;
      var messageList = this.$store.getters.messageList;
      messageList.splice(messageList.findIndex(item => item.txHash === txHash.transactionHash), 1)
      this.$store.commit('changeMessageList', messageList);
      this.getMasterChefInfo(false);
      this.successVisible2 = true;


    },
    updateBlockData(number, web3) {
      this.currentBlockNumber = number;
      console.log("currentBlockNumber", this.currentBlockNumber);
    },

    async getMasterChefInfo(isFirstLoad) {
      this.resetSelectSortStatus();
      getPoolSta(this.handlePoolSta, isFirstLoad);
      // for (var i = 0; i < this.poolItems.length; i++) {
      //   var item = this.poolItems[i];
      //   await daoportAction(item, this.handleMasterChefInfo, i, isFirstLoad);
      // }
    },
    async getFloorPriceData() {
      for (var i = 0; i < this.poolItems.length; i++) {
        var item = this.poolItems[i];
        if (item.collection.name) {
          this.requestFloorPrice(item, this.handleFloorPrice, i);
        }

      }
    },


    handlePoolSta(poolStaInfo, isFirstLoad) {
      this.wrappedPoolInfos = poolStaInfo.wrappedPoolInfos;
      this.userInfo.mining = poolStaInfo.userInfo.mining;
      this.userInfo.dividend = poolStaInfo.userInfo.dividend;
      this.userInfo.nftQuantity = poolStaInfo.userInfo.nftQuantity
      this.userInfo.wnftQuantity = poolStaInfo.userInfo.wnftQuantity;
      this.userInfo.blockNumber = poolStaInfo.poolSta.blockNumber;
      this.userInfo.tokenBalance = Number(poolStaInfo.userInfo.tokenBalance);


      // this.$emit("userInfoUpdateNoti",this.userInfo)
      for (var i = 0; i < poolStaInfo.wrappedPoolInfos.length; i++) {
        var item = poolStaInfo.wrappedPoolInfos[i];
        this.setLocalDataWithItem(item, isFirstLoad, i);
      }
      this.sortHandledPoolItems();
      this.setTopData(poolStaInfo.poolSta);
    },

    handlePoolInfos(poolInfos) {
      if (poolInfos.length == 0) {
        this.isSearchEmpty = true;
      }
      for (var i = 0; i < poolInfos.length; i++) {
        var item = poolInfos[i];
        this.setLocalDataWithItem(item, false, i);
      }
      this.sortHandledPoolItems();

    },

    sortHandledPoolItems() {
      if (this.dropdownClickIndex == 0) {
        this.handledPoolItems = this.handledPoolItems.sort(this.compare("sort"));
      }
      if (this.dropdownClickIndex == 1) {
        this.handledPoolItems = this.handledPoolItems.sort(this.compareDes("startBlock"));
      }
      if (this.dropdownClickIndex == 2) {
        this.handledPoolItems = this.handledPoolItems.sort(this.compareDes("calculateRewardForEachBlock"));
      }
      if (this.dropdownClickIndex == 3) {
        this.handledPoolItems = this.handledPoolItems.sort(this.compareDes("calculateRewardPerNFTForEachBlock"));
      }
      if (this.dropdownClickIndex == 4) {
        this.handledPoolItems = this.handledPoolItems.sort(this.compareDes("amount"));
      }
    },
    setTopData(poolSta) {
      this.poolSta.totalRewardedDividend = Number(poolSta.totalRewardedDividend)
      this.totalNftQuantity = Number(poolSta.totalNFTAmount);
      this.totalReward = Number(poolSta.totalRewardedToken);
      this.totalBonus = Number(poolSta.totalRewardedDividend);
    },

    setLocalDataWithItem(masterChefInfo, isFirstLoad, index) {
      const item = this.poolItems.find(localItem => localItem.poolInfo.pid == Number(masterChefInfo.pid));
      // console.log("foundLoalItem", foundLoalItem);
      // console.log("document=== masterchefinfo", item.poolInfo.pid, masterChefInfo, index);
      // console.log(" masterChefInfo.endBlock", masterChefInfo.endBlock, item);
      if (index == 0) {
        this.handledPoolItems = [];
      }
      if (item == undefined) {
        return;
      }

      item.endBlock = Number(masterChefInfo.endBlock);
      item.poolInfo.startBlock = Number(masterChefInfo.poolInfo.startBlock);
      item.startBlock = Number(masterChefInfo.poolInfo.startBlock);
      item.currentRewardEndBlock = Number(masterChefInfo.currentRewardEndBlock)
      item.nftQuantity = masterChefInfo.userInfo.nftQuantity;

      item.wnftQuantity = masterChefInfo.userInfo.wnftQuantity;
      if (window.ethereum) {
        this.userInfo.selectedAddress = window.ethereum.selectedAddress;
        item.selectedAddress = window.ethereum.selectedAddress;
      } else {
        item.selectedAddress = null;
        this.userInfo.selectedAddress = null
      }
      item.poolInfo.amount = masterChefInfo.poolInfo.amount;
      item.amount = Number(masterChefInfo.poolInfo.amount);
      item.dividend = Number(masterChefInfo.userInfo.dividend);
      item.isNFTApproved = masterChefInfo.userInfo.isNFTApproved;
      item.isWNFTApproved = masterChefInfo.userInfo.isWNFTApproved;
      item.mining = Number(masterChefInfo.userInfo.mining);
      item.poolInfo.wnft = masterChefInfo.poolInfo.wnft;
      item.nft = masterChefInfo.nft;
      item.rewardPerNFTForEachBlock = Number(masterChefInfo.currentReward.rewardPerNFTForEachBlock);
      item.rewardForEachBlock = masterChefInfo.currentReward.rewardForEachBlock;
      item.poolInfo.currentRewardIndex = masterChefInfo.currentRewardIndex;


      item.calculateRewardPerNFTForEachBlock = Number(this.rewardPerNFTAmount(item));
      item.calculateRewardForEachBlock = this.rewardAmount(item);

      if (this.searchText.length > 0) {
        if (ethUtil.isValidAddress(this.searchText)) {
          if (this.searchText.toLowerCase() == item.nft.toLowerCase() || this.searchText.toLowerCase() == item.poolInfo.wnft.toLowerCase()) {
            this.handledPoolItems.push(item);
          }

        } else {

          if ((item.collection.showName && item.collection.showName.toLowerCase().match(this.searchText.toLowerCase())) || (item.collection.name && item.collection.name.toLowerCase().match(this.searchText.toLowerCase()))) {
            this.handledPoolItems.push(item);
          }

        }
      } else {
        this.handledPoolItems.push(item);
      }
      this.isSearchEmpty = this.handledPoolItems.length > 0 ? false : true;




      // if (index == this.poolItems.length - 1) {
      //   this.totalNftQuantity = poolSta.totalNFTAmount;
      //   this.totalReward = poolSta.totalRewardedToken;
      //   this.totalBonus = poolSta.totalRewardedDividend;
      // }

      // for (var i = 0; i < this.poolItems.length; i++) {
      //   const item = this.poolItems[i];
      //   this.totalNftQuantity += Number(item.poolInfo.amount);
      //   var reward = 0;

      //   if (this.currentBlockNumber > Number(item.poolInfo.startBlock)) {
      //     reward =
      //       (this.currentBlockNumber - Number(item.poolInfo.startBlock)) *
      //       Number(item.rewardForEachBlock);
      //   }
      //   console.log("item.poolInfo.pid*** ,currentRewardIndex", item.poolInfo.pid, item.poolInfo.currentRewardIndex);
      //   if (Number(item.poolInfo.currentRewardIndex) == 1) {
      //     reward = Number(item.rewardForEachBlock) * 6500 * 30 + reward
      //     // console.log("item.poolInfo.pid***", item.poolInfo.pid);
      //   }
      //   this.totalReward += reward;
      //   this.totalBonus += item.dividend;
      // }
      if (item.collection.name && isFirstLoad) {
        this.requestFloorPrice(item, this.handleFloorPrice);
      }
    },

    handleMasterChefInfo(masterChefInfo, item, index, isFirstLoad) {

      console.log("document=== masterchefinfo", item.poolInfo.pid, masterChefInfo, index);
      item.endBlock = masterChefInfo.endBlock;
      item.poolInfo.startBlock = masterChefInfo.poolInfo.startBlock;
      item.nftQuantity = masterChefInfo.nftQuantity;

      item.wnftQuantity = masterChefInfo.wnftQuantity;
      if (window.ethereum) {
        item.selectedAddress = window.ethereum.selectedAddress;
      } else {
        item.selectedAddress = null;
      }
      // item.poolInfo.startBlock = 10746993;
      item.poolInfo.amount = masterChefInfo.poolInfo.amount;
      item.dividend = Number(masterChefInfo.dividend);
      item.isNFTApproved = masterChefInfo.isNFTApproved;
      item.isWNFTApproved = masterChefInfo.isWNFTApproved;
      item.mining = Number(masterChefInfo.mining);
      item.poolInfo.wnft = masterChefInfo.poolInfo.wnft;
      item.nft = masterChefInfo.nft;
      item.rewardPerNFTForEachBlock = masterChefInfo.rewardPerNFTForEachBlock;
      item.rewardForEachBlock = masterChefInfo.rewardForEachBlock;
      item.poolInfo.currentRewardIndex = masterChefInfo.poolInfo.currentRewardIndex;
      if (isFirstLoad) {
        if (item.collection.name) {
          this.requestFloorPrice(item, this.handleFloorPrice, index);
        }

      }
      // if (index == 0) {
      //   item.poolInfo.startBlock = 10776740;
      // }
      if (index == this.poolItems.length - 1) {
        this.totalNftQuantity = totalNFTAmount;
        this.totalReward = 0;
        this.totalBonus = 0;
        for (var i = 0; i < this.poolItems.length; i++) {
          const item = this.poolItems[i];
          this.totalNftQuantity += Number(item.poolInfo.amount);
          var reward = 0;

          if (this.currentBlockNumber > Number(item.poolInfo.startBlock)) {
            reward =
              (this.currentBlockNumber - Number(item.poolInfo.startBlock)) *
              Number(item.rewardForEachBlock);
          }
          console.log("item.poolInfo.pid*** ,currentRewardIndex", item.poolInfo.pid, item.poolInfo.currentRewardIndex);
          if (Number(item.poolInfo.currentRewardIndex) == 1) {
            reward = Number(item.rewardForEachBlock) * 6500 * 30 + reward
            // console.log("item.poolInfo.pid***", item.poolInfo.pid);
          }
          this.totalReward += reward;
          this.totalBonus += item.dividend;
        }
      }
    },
    handleGetNFTTokenIDs(NFTTokenIDs, item, index) {
      var emptyArr = [];
      for (var i = 0; i < NFTTokenIDs.length; i++) {
        var miniItem = {};
        miniItem.tokenId = Number(NFTTokenIDs[i]);
        miniItem.select = false;
        miniItem.collection = {};
        miniItem.collection.showName = item.collection.showName;
        miniItem.poolInfo = {};
        miniItem.poolInfo.pid = item.poolInfo.pid;
        miniItem.collection.contractAddress = item.collection.contractAddress;
        // miniItem.collection.wnftContractAddress = item.poolInfo.wnft;
        emptyArr.push(miniItem);
      }
      // item.NFTItems = emptyArr;
      this.NFTItems = emptyArr;
      this.canSelectNftItems = this.NFTItems;
      this.actionAlertShowLoading = false;
      if (this.canSelectNftItems.length > 0) {
        this.isShowEmptyImg = false;
      } else {
        this.isShowEmptyImg = true;
      }
    },
    handleGetWNFTTokenIDs(WNFTTokenIDs, item, isHarvest) {
      var emptyArr = [];
      for (var i = 0; i < WNFTTokenIDs.length; i++) {
        var miniItem = {};
        miniItem.tokenId = Number(WNFTTokenIDs[i]);
        miniItem.select = false;
        miniItem.collection = {};
        miniItem.poolInfo = {};
        miniItem.poolInfo.pid = item.poolInfo.pid;
        miniItem.collection.showName = item.collection.showName;
        miniItem.collection.contractAddress = item.poolInfo.wnft;
        // miniItem.collection.wnftContractAddress = item.poolInfo.wnft;
        emptyArr.push(miniItem);
      }
      // item.WNFTItems = emptyArr;
      this.WNFTItems = emptyArr;
      this.canSelectNftItems = this.WNFTItems;
      this.actionAlertShowLoading = false;
      this.isShowEmptyImg = this.canSelectNftItems.length > 0 ? false : true;

      if (isHarvest) {
        var emptyArr = [];
        for (var i = 0; i < this.WNFTItems.length; i++) {
          var miniItem = this.WNFTItems[i];
          emptyArr.push(miniItem.tokenId);
        }
        daoporHarvest(
          this.selectPollItem,
          this.handleHarvest,
          emptyArr,
          this.faildHandleDaoporHarvest,
          this.getHarvestTxHash
        );
      }
    },
    handleGetBonusReward(result, item) {
      var result0 = result[0];
      var result1 = result[1];
      item.award = Number(result0);
      item.bonus = Number(result1);
    },
    switchBtn(index) {
      this.isSwitch1 = index == 1 ? true : false;
      this.actionAlertShowLoading = true;
      this.resetSelectNFT();
      if (this.isSwitch1) {
        getNFTTokenIDs(this.selectPollItem, this.handleGetNFTTokenIDs);
      } else {
        getWNFTTokenIDs(this.selectPollItem, this.handleGetWNFTTokenIDs);
      }
      // this.canSelectNftItems = this.isSwitch1 ? this.NFTItems : this.WNFTItems;
      // this.isShowEmptyImg = this.canSelectNftItems.length > 0 ? false : true;
      this.$bus.$emit("selectNftAction", 1);
      this.$bus.$emit("switchBtnAction", this.isSwitch1);
    },
    closeAlertAction() {
      this.resetSelectNFT();
      this.actionAlertShow = false;
    },

    resetSelectNFT() {
      this.isStartedApprove = false;
      this.isApprove = false;
      this.isApproveFaild = false;
      this.isDelyFailed = false;
      this.isDelySuccess = false;
      this.isStartedDelyContract = false;

      this.approveStatusImgUrl = require("@/assets/img/common/step1.svg");
      this.delyContractStatusImgUrl = require("@/assets/img/common/step2.svg");
      this.deployProcessImgClass = "processImg",
        this.approveProcessImgClass = "processImg",
        this.selectTokenIdsArr = [];
      this.selectCount = 0;
      this.canSelectNftItems = [];
      this.isShowEmptyImg = this.canSelectNftItems.length > 0 ? false : true;
      this.selectAll = false;
      Object.keys(this.NFTItems).forEach(key => {
        var item = this.NFTItems[key];
        item.select = false;
      });
      Object.keys(this.WNFTItems).forEach(key => {
        var item = this.WNFTItems[key];
        item.select = false;
      });
    },
    resetApp() {
      resetApp();
    },
    async accountsChange() {
      const provider = await initWeb3Modal().connect();
      provider.on("accountsChanged", function (accounts) {
        alert(accounts[0]);
      });
    },
    handleWalletConnect() {
      onConnect();
      // if (connected) {
      //   console.log("afterConnectdWallet", connected);
      // }
    }
  }
};
</script>

<style scoped>
.back {
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  width: 100%;
  background-color: #f7faff;
  /* background-color: #ea4ae0; */
}

.contantBack {
  /* background-color: #ea4ae0; */
  align-items: center;
  margin-top: 3.5rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  width: 95%;
  margin-left: 2.5%;
  overflow-x: hidden;
  overflow-y: auto;
}

.contantList {
  align-items: center;
  /* margin-top: 3.1rem; */
  z-index: 100;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 95%;
  margin-left: 2.5%;
  overflow-x: hidden;
}

.topBackBox {
  position: relative;
}

.topImg {
  width: 100%;
  height: 7.9rem;
}

.topBackContant {
  top: 0%;
  left: 0%;
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.topTitle {
  margin-top: 0rem;
  font-size: 0.9rem;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #ffffff;
  line-height: 1.05rem;
  letter-spacing: 1px;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
}

.topSubTitle {
  margin-top: 0.05rem;
  font-size: 0.45rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.7rem;
}

.topItemDataSuperBox {
  margin-top: 0.35rem;
  display: flex;
  flex-direction: row;
  width: 16.25rem;
  height: 2.5rem;
  background: #ffffff;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
}

.itemDataBox {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.75rem;
  justify-content: space-between;
  width: 33.33%;
}

.itemDataBox_topText {
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.6rem;
}

.itemDataBox_bottomText {
  margin-top: 0.375rem;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 18px;
}

.vSepLine {
  width: 0.7px;
  height: 1.5rem;
  background-color: #e5e5e5;
}

.itemsBox {
  border-radius: .25rem;
  background-color: #f7faff;
  margin-top: 0.25rem;
  width: 103%;
}

.alertContantBox1 {
  /* background-color: aqua; */
  margin-top: -0.8rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.alertTitle {
  font-size: 0.75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.75rem;
}

.closeAlertIcon {
  width: 0.575rem;
  height: 0.575rem;
}

.alertSectionBox1 {
  margin-top: 0.75rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fff8e6;
  border-radius: 0.1rem;
  height: 3rem;
}

.itemDataBox_topText_alert {
  margin-top: 0.25rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.7rem;
}

.itemDataBox_bottomText_alert {
  margin-top: 0.375rem;
  font-size: 0.5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.5rem;
}

.vSepLine_alert {
  width: 0.7px;
  height: 1.525rem;
  background-color: #e5e5e5;
}

.alertSectionBox2 {
  margin-top: 0.75rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.1rem;
}

.switchBtnBox {
  border-style: solid;
  border-width: 0.035rem;
  border-color: #f7b500;
  width: 6rem;
  border-radius: .12rem;
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  background-color: #fff8e6;
}

.switchBtn_off {
  background-color: #fff8e6;
  border-radius: 0.1rem;
  width: 50%;
  border-style: none;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #f7b500;
  line-height: 0.4rem;
}

.switchBtn_on {
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  border-radius: 0.1rem;
  width: 50%;
  border-style: none;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #fff;
  line-height: 0.4rem;
}

.unPledgeActionBox {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.unPledgeAction {
  width: 3.25rem;
  /* padding-left: 0.4rem; */
  /* padding-right: 0.4rem; */
  height: 1.5rem;
  border-radius: 0.1rem;
  border-style: none;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  /* font-family: monospace; */
  font-weight: 500;
  color: #ffffff;
  line-height: 0.4rem;
}

.selectAllBtnBox {
  margin-right: 0.5rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  height: 1.5rem;
  border-radius: 0.1rem;
  border-style: none;
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

.selectAllBtnBox_text {
  font-size: .6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: .4rem;
}

.selectAllBtnBox_img {
  margin-left: 0.25rem;
  width: .75rem;
  height: .75rem;
}

.itemsSuperBox {
  margin-top: 1.325rem;
  border-radius: 0.25rem;
  border-style: solid;
  border-color: #ececec;
  width: 100%;
  border-width: 0.025rem;
}

.alertSectionBox3 {
  margin-top: 0.75rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.alertSectionBox3_textBox1 {
  /* background-color: blue; */
  width: 33.33%;
}

.alertSectionBox3_textBox2 {
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  display: flex;
  justify-content: center;
  width: 33.33%;
}

.alertSectionBox3_textBox3 {
  /* background-color: aqua; */
  display: flex;
  flex-direction: row-reverse;
  width: 33.33%;
}

.alertSectionBox3_text1 {
  margin-left: 0.525rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.45rem;
}

.alertSectionBox3_text2 {
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.45rem;
}

.alertSectionBox3_text3 {
  margin-right: 0.525rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.45rem;
}

.selectItemSepLine {
  margin-top: 0.65rem;
  width: 100%;
  background-color: #f1f1f1;
  height: 0.025rem;
}

.alertTip1 {
  margin-top: 1.1rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.6rem;
}

.alertTip2 {
  margin-top: 0.5rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.6rem;
}

.bottomDesBox {
  margin-top: 1.5rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.25rem;
}

.farmsDesImg {
  width: 4.05rem;
  height: 5.875rem;
}

.farmsDesText {
  max-width: 12rem;
  padding-top: 0.25rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.25rem;
  /* margin-top: 0.5rem; */
  font-size: 0.45rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.7rem;
  background-color: white;
  border-radius: 0.25rem;
}

.farmsDesText_span {
  padding-top: 0.25rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.25rem;
  /* margin-top: 0.5rem; */
  font-size: 0.45rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.7rem;
  background-color: white;
  border-radius: 0.25rem;
}

.farmsDesTextBox {
  margin-top: -1.2rem;
  align-items: center;
  /* margin-left: 0.5rem; */
  display: flex;
  flex-direction: row;
}

.courseBox_super {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: .125rem;
}

.courseBox {
  display: flex;
  justify-content: right;
  /* width: 33.33%; */
  flex-direction: row-reverse;
}

.courseBox_contantBox {
  margin-top: .35rem;
  margin-right: .35rem;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1rem;
  cursor: pointer;
}

.courseBox_contantBox_imgLeft {
  margin-left: .125rem;
  width: .6327rem;
  height: .6rem;
}

.courseBox_contantBox_imgRight {
  margin-left: .1rem;
  width: .2rem;
  height: .35rem;
  margin-right: .125rem;
}


.courseBox_contantBox_text {
  margin-left: .15rem;
  margin-right: .2rem;
  font-size: .5rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #F7B500;
  line-height: .7rem;
  white-space: nowrap;
}

.topImgIconBox {
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: relative;
  width: 33.33%;
}

.topImgIcon {
  width: 10rem;
  height: 1.425rem;
}

.topImgIconBox_contantBox {
  top: 0%;
  left: 0%;
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.topImgIconBox_contantBox_text {
  margin-top: -0.3rem;
  font-size: 0.53rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.825rem;
  white-space: nowrap;
}

.emptyContantBox {
  background-color: white;
  margin-top: 0.75rem;
  margin-left: 0%;
  width: 100%;
  /* height: 7.5rem; */
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.emptyContantBox_img {
  margin-top: 0.75rem;
  width: 13.25rem;
  height: 6.675rem;
}

.countDownBox {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.dialogBack {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
}

.dialogTopImg {
  margin-top: -0.5rem;
  width: 1.25rem;
  height: 1.25rem;
}

.dialopTitle {
  font-size: 0.6rem;
  font-weight: 500;
  color: #111;
  margin-top: 0.15rem;
}

.dialogDes {
  color: #FF7421;
  font-size: 0.5rem;
  margin-top: 0.25rem;
  align-content: center;
  text-align: center;
}

.dialogDes_active {
  color: #f7b500;
  font-size: 0.325rem;
  margin-top: 0.25rem;
  align-content: center;
  text-align: center;
}

.bottomBtnBox1 {
  width: 100%;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.lookDetailBtn {
  margin-top: 0rem;
  font-size: 0.6rem;
  font-weight: 400;
  color: #f7b500;
  background-color: white;
  height: 1.25rem;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #f7b500;
  width: 45%;
}

.goOnCreatBtn {
  margin-top: 0rem;
  font-size: 0.6rem;
  font-weight: 400;
  color: white;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  height: 1.25rem;
  border-radius: 5px;
  border-style: none;
  /* border-width: 1px; */
  /* border-color: #111; */
  width: 45%;
  /* width: 100%; */
}

.alertCloseBtn {
  margin-top: 0.2rem;
  font-size: 0.375rem;
  font-weight: 400;
  color: white;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  height: 1rem;
  border-radius: 0.5rem;
  border-style: none;
  /* border-width: 1px; */
  /* border-color: #111; */
  width: 90%;
}

.emptyImgBox {
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.emptyImg {
  height: 2.875rem;
}

.emptyImgBox_des {
  color: #666;
  font-size: 0.5rem;
}

.txHashBox {
  margin-top: 0.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}

.txHash_pre {
  font-size: 0.6rem;
  color: #666;
}

.txHash {
  font-size: 0.6rem;
  color: #2c6ff8;
}

.txHash_copy {
  width: 0.5rem;
  height: 0.5rem;
  cursor: pointer;
}

.dialogTopBack {
  margin-top: -.75rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.dialogTopBack_title {
  margin-right: -0rem;
  font-size: .75rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #212121;
  line-height: .725rem;
}

.dialogTopBack_img {
  margin-right: 0rem;
  width: .6rem;
  height: .6rem;
  cursor: pointer;
}

.dialogContantBox {
  margin-top: .8rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: aqua; */
}

.dialogSuccessContantBox {
  margin-top: .55rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 105%;
}

.dialogContantBox_topBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  /* background-color: #F7B500; */
  justify-content: space-between;
}

.dialogContantBox_topBox_leftBox {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.collectionImgBox_success {
  display: flex;
  width: 100%;
  justify-content: center;
}

.collectionImg_success {
  /* border-radius: .1rem; */
  width: 5.625rem;
  height: 2.75rem;
}


.collectionImg {
  border-radius: .1rem;
  width: 3rem;
  height: 3rem;
  margin-left: 0rem;
}

.collectionName {
  margin-left: .25rem;
  font-size: .7rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #212121;
  line-height: .65rem;
}

.dialogContantBox_topBox_rightBox {
  margin-right: 0rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-around;
  height: 100%;
}

.rewardBox {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.rewardBox_text {
  font-size: .7rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #111111;
  line-height: .7rem;
}

.rewardBox_img {
  margin-right: .1rem;
  width: .325rem;
  height: .325rem;
}

.priceText {
  margin-top: .1rem;
  text-align: right;
  font-size: .75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #5C5E67;
  line-height: .75rem;
}

.rewardDes {
  margin-top: .1rem;
  font-size: .6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #9A999A;
  line-height: .45rem;
}

.dialogContantBox_sepLine {
  margin-top: .75rem;
  margin-left: 0rem;
  margin-right: 0rem;
  height: .025rem;
  background-color: #E5E5E5;
}

.quantityBox {
  margin-top: .75rem;
  display: flex;
  flex-direction: row;
  margin-left: 0rem;
  margin-right: 0rem;
  justify-content: space-between;
}

.quantityBox_leftText {
  font-size: .7rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #212121;
  line-height: .65rem;
}

.quantityBox_rightText {
  font-size: .7rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #5C5E67;
  line-height: .45rem;
}

.stakeDes {

  margin-top: .675rem;
  margin-left: 0rem;
  margin-right: 0rem;
  font-size: .6rem;
  font-family: Poppins-Regular, Poppins;
  font-weight: 400;
  color: #5C5E67;
  line-height: 1rem;
}

.stakeBtn {
  cursor: pointer;
  /* margin-top: .75rem; */
  margin-left: 0rem;
  margin-right: 0.25rem;
  height: 1.25rem;
  width: 45%;
  background: linear-gradient(270deg, #FF7C3D 0%, #F7B500 100%);
  border-radius: 4px;
  border-style: none;
  font-size: .6rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #FFFFFF;
  line-height: .65rem;
  /* margin-bottom: -0.1rem; */
}

.stakeBtnOfAction {
  cursor: pointer;
  margin-top: .75rem;
  margin-left: 0rem;
  margin-right: 0rem;
  height: 1.25rem;
  background: linear-gradient(270deg, #FF7C3D 0%, #F7B500 100%);
  border-radius: 4px;
  border-style: none;
  font-size: .6rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #FFFFFF;
  line-height: .65rem;
  margin-bottom: -0.1rem;
}

.selectTextBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.selectTextBox_count {
  /* margin-top: .375rem; */
  margin-left: .25rem;
  font-size: .6rem;
  font-family: Poppins-Regular, Poppins;
  font-weight: 400;
  color: #5C5E67;
  line-height: .625rem;
}

.stepBox {
  margin-left: 0rem;
  margin-right: 0rem;
  margin-top: .55rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: left;
}

.stepBoxSub {
  margin-top: 0rem;
  display: flex;
  flex-direction: row;
}

.stepBoxSub1 {
  margin-top: .875rem;
  display: flex;
  flex-direction: row;
}

.stepBoxSub_contantBox {
  margin-left: .0rem;
  margin-top: 0rem;
  display: flex;
  flex-direction: column;
}

.stepName {
  margin-top: 0.5rem;
  font-size: 0.35rem;
  color: #111111;
}

.processImg {
  /* margin-left: 0.25rem; */
  margin-left: 0rem;
  margin-top: 0rem;
  width: .75rem;
  height: 0.75rem;
}

.processImg_loading {
  margin-left: -0.25rem;
  margin-top: -0.25rem;
  width: 1.3rem;
  height: 1.3rem;
  /* width: .875rem; */
  /* height: 0.875rem; */
}

.processDesTopTitle {
  margin-top: 0.02rem;
  font-size: .7rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #212121;
  line-height: .7rem;

}

.processDesBottomTitle {
  width: 100%;
  margin-top: .375rem;
  font-size: .6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #5C5E67;
  line-height: .6rem;
  margin-right: 0rem;
}

.processDesBottomTitle_active {
  margin-top: .05rem;
  font-size: .6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #F7B500;
  line-height: .6rem;
}

.processStepBtnBox {
  position: relative;
  margin-top: 0.4rem;
  width: 8.25rem;
  height: 1.5rem;
}

.processStepOffBtn {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  border-radius: 0.1rem;
  border-style: none;
  background-color: #eee;
  color: #999;
  font-size: 0.6rem;
}

.processStepOnBtn {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  border-radius: 0.1rem;
  border-style: none;
  background: linear-gradient(270deg, #FF7C3D 0%, #F7B500 100%);
  color: white;
  font-size: 0.6rem;
}

.processCloseBtn {
  margin-top: 0.375rem;
  width: 5rem;
  height: 0.8rem;
  border-radius: 0.4rem;
  border-style: none;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  color: white;
  font-size: 0.4rem;
}

.stakeSuccessDes {
  margin-left: .5rem;
  margin-right: .5rem;
  margin-top: .6rem;
  font-size: .6rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #212121;
  line-height: .625rem;
  text-align: center;
}

.stakeSuccessDes_active {
  margin-top: .6rem;
  font-size: .6rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #F7B500;
  line-height: .625rem;
}

.txHashBox_process {
  margin-top: 0.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  margin-bottom: -0.25rem;
}

.statusImgBox {
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 1rem;
  height: 1rem;
  /* background-color: aqua; */
}


.courseSectionBox {
  border-radius: 0.25rem;
  background-color: white;
  margin-left: 2.5%;
  width: 95%;
}


.topCourseBox {
  background-color: white;
  margin-top: .5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: unset;
  height: auto;
  border-radius: .25rem;
  margin-bottom: 0.25rem;
  justify-content: space-between;
}

.courseLeftBox {
  display: flex;
  flex-direction: column;
  align-items: unset;
  margin-bottom: .5rem;
}

.courseRightBox {
  margin-top: .85rem;
  margin-right: .75rem;
  display: flex;
  flex-direction: row;
  align-items: unset;
  cursor: pointer;
}

.courseRightBox_text {
  font-size: .6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #F7B500;
  line-height: .6rem;
  white-space: nowrap;
}

.courseRightBox_img {
  margin-top: .1rem;
  margin-left: .075rem;
  height: .35rem;
}

.courseTopImg {
  margin-top: .75rem;
  margin-left: 0.75rem;
  /* width: 3.225rem; */
  width: auto;
  height: .75rem;
  /* margin-right: .5rem; */
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

.courseTopImgBox {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.searchAndSortBox {
  margin-top: .375rem;
  display: flex;
  flex-direction: column;
  justify-content: left;
  background-color: white;
  /* background-color: #2c6ff8; */
  /* width: 100%; */
  margin-bottom: .75rem;
  border-radius: .5rem;

}

.searchBoxSuper {
  width: 100%;
  margin-top: .5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.searchBox {
  margin-right: .75rem;
  margin-left: .75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: .1rem;
  border: 1px solid #F1F1F1;
  /* width: 13.625rem; */
  flex: 1;
  height: 1.5rem;
}

.searchBtn {
  margin-right: .75rem;
  padding-left: .6rem;
  padding-right: .6rem;
  height: 1.5rem;
  /* padding-top: .4rem;
  padding-bottom: .4rem; */
  margin-left: 0rem;
  font-size: .6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: .5rem;
  border-style: none;
  background-color: #F7B500;
  border-radius: .1rem;
  cursor: pointer;
}

.searchBox_leftImg {
  margin-left: .25rem;
  width: .811rem;
  height: .8975rem;

}

.searchBox_input {
  margin-left: .175rem;
  margin-right: .5rem;
  flex: 1;
  height: 100%;
  border: none;
  font-size: .525rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8C9399;
  color: #111;
  line-height: .4rem;
  background-color: #fff;
  border-width: 0rem;
  outline: none;
  cursor: pointer;



}

.searchBox_rightImg {
  margin-right: .25rem;
  width: .5rem;
  height: .5rem;
  cursor: pointer;
}

.sortBox {
  width: 100%;
  margin-top: .375rem;
  margin-right: 0rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .5rem;
  cursor: pointer;
}

.sortItemBox0 {
  margin-left: .75rem;
  margin-right: .75rem;
  /* width: 6rem; */
  flex: 1;
  width: 8rem;
  height: 1.3rem;
  border-radius: .1rem;
  border: 1px solid #EEEEEE;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.filtrateBtnMarginRight {
  margin-right: .75rem;
}

.sortItemBox1 {
  margin-left: .75rem;
  width: 4rem;
  height: 1.3rem;
  border-radius: .1rem;
  border: 1px solid #EEEEEE;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.sortItemBox0_text {
  margin-left: .25rem;
  font-size: .5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #212121;
  line-height: .5rem;
}

.sortItemBox1_text {
  margin-left: .125rem;
  font-size: .5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #212121;
  line-height: .5rem;
}

.sortItemBox0_img {
  margin-right: .25rem;
  width: .4rem;
  cursor: pointer;
  /* height: .175rem; */
}

.sortItemBox1_img {
  width: .6rem;
  height: .6rem;
  cursor: pointer;

}

.el-dropdown-item_active {
  color: #f7b500;
  font-size: .6rem;
  line-height: 1.2rem;

}

.el-dropdown-item {
  color: #212121;
  font-size: .6rem;
  line-height: 1.2rem;
}

.emptyNFTBox {
  margin-top: -0.75rem;
  width: 100%;
  /* height: 5rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: .75rem;
  background-color: white;
  border-radius: .25rem;

  /* background-color: #2c6ff8; */
}

.emptyNFTImg {
  margin-top: .5rem;
  width: 5rem;
  height: 5rem;
}

.emptyDes {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.alertDesBox {
  width: 100%;
  margin-top: .4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #2c6ff8; */

}

.alertDesItemBox {
  margin-left: 3%;
  width: 100%;
  margin-top: .35rem;
  display: flex;
  flex-direction: row;
  align-items: top;
}

.alertDesItemBox_img {
  width: .6rem;
  height: .6rem;

}

.alertDesItemBox_text {
  margin-right: .25rem;
  margin-top: -0.05rem;
  margin-left: .125rem;
  font-size: .5rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #212121;
  line-height: .7rem;

}

.alertBottomBtnBox {
  margin-top: .79rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.traddingStarblockBtn_a {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 45%;
}

.traddingStarblockBtn {
  margin-left: .25rem;
  font-size: .6rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  line-height: .65rem;
  border-radius: .1rem;
  border: 1px solid #F7B500;
  background-color: white;
  color: #FE9C02;
  height: 1.25rem;
  width: 100%;
}

.traddingStarblockBtn_yellow {
  margin-left: .25rem;
  font-size: .6rem;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  line-height: .65rem;
  border-radius: .1rem;
  border: 1px solid #F7B500;
  background-color: white;
  color: white;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  height: 1.25rem;
  width: 100%;
}

.defaultRewardDes {
  width: 100%;
  text-align: center;
  margin-top: .375rem;
  font-size: .5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #5C5E67;
  line-height: .75rem
}

.myfarmdata {
  margin-top: .125rem;
  width: 100%;
  margin-bottom: -0rem;
}

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1200px) {
  .back {
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    width: 100%;
    background-color: #f7faff;
    /* background-color: #ea4ae0; */
  }

  .contantBack {
    /* background-color: #ea4ae0; */
    align-items: center;
    margin-top: 3.1rem;
    z-index: 100;
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    width: 95%;
    margin-left: 2.5%;
    overflow-x: hidden;
    background-color: #f7faff;
  }

  .contantList {
    align-items: center;
    /* margin-top: 3.1rem; */
    z-index: 100;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 90%;
    margin-left: 5%;
    overflow-x: hidden;
  }

  .topBackBox {
    position: relative;
  }

  .topImg {
    width: 100%;
    height: 9.5rem;
  }

  .topBackContant {
    top: 0%;
    left: 0%;
    height: 100%;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .topTitle {
    margin-top: 0rem;
    /* margin-top: 0.5rem; */
    font-size: 1.05rem;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #ffffff;
    line-height: 1.2rem;
    letter-spacing: 1px;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  }

  .topSubTitle {
    margin-top: 0.325rem;
    font-size: 0.6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.825rem;
  }

  .topItemDataSuperBox {
    margin-top: 0.625rem;
    display: flex;
    flex-direction: row;
    width: 36rem;
    height: 3rem;
    background: #ffffff;
    border-radius: 10px;
    align-items: center;
    justify-content: space-around;
  }

  .itemDataBox {
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.75rem;
    justify-content: space-between;
    width: 33.33%;
  }

  .itemDataBox_topText {
    font-size: 0.6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
  }

  .itemDataBox_bottomText {
    margin-top: 0.525rem;
    font-size: 0.4rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
  }

  .vSepLine {
    width: 0.7px;
    height: 1.5rem;
    background-color: #e5e5e5;
  }

  .itemsBox {
    border-radius: .25rem;
    background-color: white;
    width: 100%;
    margin-bottom: .75rem;
    margin-top: 1.275rem;
    width: 100%;
  }

  .alertContantBox1 {
    /* background-color: aqua; */
    margin-top: -0.8rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .alertTitle {
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }

  .closeAlertIcon {
    width: 0.4rem;
    height: 0.4rem;
  }

  .alertSectionBox1 {
    margin-top: 0.75rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #fff8e6;
    border-radius: 0.1rem;
    height: 2.25rem;
  }

  .itemDataBox_topText_alert {
    margin-top: 0.25rem;
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }

  .itemDataBox_bottomText_alert {
    margin-top: 0.375rem;
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.35rem;
  }

  .vSepLine_alert {
    width: 0.7px;
    height: 1.15rem;
    background-color: #e5e5e5;
  }

  .alertSectionBox2 {
    margin-top: 0.75rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.1rem;
  }

  .switchBtnBox {
    border-style: solid;
    border-width: 0.025rem;
    border-color: #f7b500;
    width: 4rem;
    border-radius: 0.12rem;
    height: 1rem;
    display: flex;
    flex-direction: row;
    background-color: #fff8e6;
  }

  .switchBtn_off {
    background-color: #fff8e6;
    border-radius: 0.1rem;
    width: 50%;
    border-style: none;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #f7b500;
    line-height: 0.4rem;
  }

  .switchBtn_on {
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
    border-radius: 0.1rem;
    width: 50%;
    border-style: none;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fff;
    line-height: 0.4rem;
  }

  .unPledgeAction {
    width: 2.5rem;
    /* padding-left: 0.4rem; */
    /* padding-right: 0.4rem; */
    height: 1rem;
    border-radius: 0.1rem;
    border-style: none;
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    /* font-family: monospace; */
    font-weight: 500;
    color: #ffffff;
    line-height: 0.4rem;
    white-space: nowrap;
  }

  .selectAllBtnBox {
    border-style: solid;
    border-width: 1px;
    border-color: #E5E5E5;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    height: 1rem;
    border-radius: 0.1rem;
    /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .selectAllBtnBox_text {
    font-size: .4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: .4rem;
  }

  .selectAllBtnBox_img {
    margin-left: 0.25rem;
    width: .5rem;
    height: .5rem;
  }

  .itemsSuperBox {
    margin-top: 0.5rem;
    border-radius: 0.25rem;
    border-style: solid;
    border-color: #ececec;
    width: 100%;
    border-width: 0.025rem;
  }

  .alertSectionBox3 {
    margin-top: 0.5rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .alertSectionBox3_textBox1 {
    /* background-color: blue; */
    width: 33.33%;
  }

  .alertSectionBox3_textBox2 {
    /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
    display: flex;
    justify-content: center;
    width: 33.33%;
  }

  .alertSectionBox3_textBox3 {
    /* background-color: aqua; */
    display: flex;
    flex-direction: row-reverse;
    width: 33.33%;
  }

  .alertSectionBox3_text1 {
    margin-left: 0.525rem;
    font-size: .4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }

  .alertSectionBox3_text2 {
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }

  .alertSectionBox3_text3 {
    margin-right: 0.525rem;
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }

  .selectItemSepLine {
    margin-top: 0.5rem;
    width: 100%;
    background-color: #f1f1f1;
    height: 0.025rem;
  }

  .alertTip1 {
    margin-top: 0.5rem;
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.35rem;
  }

  .alertTip2 {
    margin-top: 0.35rem;
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.35rem;
  }

  .bottomDesBox {
    margin-top: 1.5rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .farmsDesImg {
    width: 4.05rem;
    height: 5.875rem;
  }

  .farmsDesText {
    max-width: unset;
    padding-top: 0.25rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    padding-bottom: 0.25rem;
    /* margin-top: 0.5rem; */
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.7rem;
    background-color: white;
    border-radius: 0.25rem;
  }

  .farmsDesText_span {
    text-align: left;
    padding-top: 0.25rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    padding-bottom: 0.25rem;
    /* margin-top: 0.5rem; */
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.7rem;
    background-color: white;
    border-radius: 0.25rem;
  }

  .farmsDesTextBox {
    margin-top: -1.2rem;
    align-items: center;
    /* margin-left: 0.5rem; */
    display: flex;
    flex-direction: row;
  }

  .topImgIconBox {
    position: relative;
  }


  .courseBox_super {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 0.125rem;
  }

  .courseBox {
    display: flex;
    justify-content: right;
    /* width: 33.33%; */
    flex-direction: row-reverse;
  }

  .courseBox_contantBox {
    margin-top: .375rem;
    margin-right: .375rem;
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 1rem;
    cursor: pointer;
  }

  .courseBox_contantBox_imgLeft {
    margin-left: .25rem;
    width: .6327rem;
    height: .6rem;
  }

  .courseBox_contantBox_imgRight {
    margin-left: .1rem;
    width: .2rem;
    height: .35rem;
    margin-right: .25rem;
  }


  .courseBox_contantBox_text {
    margin-left: .15rem;
    margin-right: .2rem;
    font-size: .45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #F7B500;
    line-height: .7rem;
  }

  .topImgIconBox {
    display: flex;
    justify-content: center;
    flex-direction: row;
    position: relative;
    width: 33.33%;
  }

  .topImgIcon {
    width: 8rem;
    height: 1.425rem;
  }

  .topImgIconBox_contantBox {
    top: 0%;
    left: 0%;
    height: 100%;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .topImgIconBox_contantBox_text {
    margin-top: -0.3rem;
    font-size: 0.6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.825rem;
  }

  .emptyContantBox {
    background-color: white;
    margin-top: 0.75rem;
    margin-left: 0%;
    width: 100%;
    /* height: 7.5rem; */
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .emptyContantBox_img {
    margin-top: 0.75rem;
    width: 13.25rem;
    height: 6.675rem;
  }

  .countDownBox {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .dialogTopImg {
    margin-top: -0.5rem;
    width: 1.25rem;
    height: 1.25rem;
  }

  .dialopTitle {
    font-size: 0.4rem;
    font-weight: 500;
    color: #111;
    margin-top: 0.5rem;
  }

  .dialogDes {
    color: #FF7421;
    font-size: .35rem;
    margin-top: 0.25rem;
    align-content: center;
    text-align: center;
  }

  .dialogDes_active {
    color: #f7b500;
    font-size: 0.325rem;
    margin-top: 0.25rem;
    align-content: center;
    text-align: center;
  }

  .lookDetailBtn {
    margin-top: 0rem;
    font-size: 0.375rem;
    font-weight: 400;
    color: #f7b500;
    background-color: white;
    height: 1rem;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: #f7b500;
    width: 45%;
  }

  .goOnCreatBtn {
    margin-top: 0rem;
    font-size: 0.375rem;
    font-weight: 400;
    color: white;
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
    height: 1rem;
    border-radius: 5px;
    border-style: none;
    /* border-width: 1px; */
    /* border-color: #111; */
    width: 45%;
  }

  .alertCloseBtn {
    margin-top: 0rem;
    font-size: 0.375rem;
    font-weight: 400;
    color: white;
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
    height: 1rem;
    border-radius: 0.5rem;
    border-style: none;
    /* border-width: 1px; */
    /* border-color: #111; */
    width: 90%;
  }

  .emptyImgBox {
    margin-top: 1.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 1.5rem;
  }

  .emptyImg {
    height: 2.875rem;
  }

  .emptyImgBox_des {
    margin-top: 0.5rem;
    color: #666;
    font-size: 0.4rem;
  }

  .txHashBox {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .txHash_pre {
    /* font-size: .6rem; */
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #5C5E67;
    line-height: .6rem;
    font-size: 0.375rem;
    /* color: #666; */
  }

  .txHash {
    font-family: Poppins-Regular, Poppins;
    font-size: 0.375rem;
    color: #2c6ff8;
  }

  .txHash_copy {
    width: 0.4rem;
    height: 0.4rem;
    cursor: pointer;
  }


  .dialogTopBack {
    margin-top: -1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .dialogTopBack_title {
    margin-right: -0px;
    font-size: .45rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #212121;
    line-height: .725rem;
  }

  .dialogTopBack_img {
    margin-right: 0px;
    width: .4rem;
    height: .4rem;
    cursor: pointer;
  }

  .dialogContantBox {
    margin-top: .8rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* background-color: aqua; */
  }

  .dialogSuccessContantBox {
    margin-top: .55rem;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    width: 100%;
  }

  .dialogContantBox_topBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    /* background-color: #F7B500; */
    justify-content: space-between;
  }

  .dialogContantBox_topBox_leftBox {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .collectionImgBox_success {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .collectionImg_success {
    /* border-radius: .1rem; */
    width: 5.625rem;
    height: 2.75rem;
  }


  .collectionImg {
    border-radius: .1rem;
    width: 2rem;
    height: 2rem;
    margin-left: 0px;
  }

  .collectionName {
    margin-left: .25rem;
    font-size: .4rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #212121;
    line-height: .65rem;
  }

  .dialogContantBox_topBox_rightBox {
    margin-right: 0px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-around;
    height: 100%;
  }

  .rewardBox {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  .rewardBox_text {
    font-size: .4rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #111111;
    line-height: .45rem;
  }

  .rewardBox_img {
    margin-right: .1rem;
    width: .325rem;
    height: .325rem;
  }

  .priceText {
    margin-top: .1rem;
    text-align: right;
    font-size: .375rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #5C5E67;
    line-height: .45rem;
  }

  .rewardDes {
    margin-top: .1rem;
    font-size: .375rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #9A999A;
    line-height: .625rem;
  }

  .dialogContantBox_sepLine {
    margin-top: .5rem;
    margin-left: 0px;
    margin-right: 0px;
    height: .025rem;
    background-color: #E5E5E5;
  }

  .quantityBox {
    margin-top: .25rem;
    display: flex;
    flex-direction: row;
    margin-left: 0px;
    margin-right: 0px;
    justify-content: space-between;
  }

  .quantityBox_leftText {
    font-size: .4rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #212121;
    line-height: .65rem;
  }

  .quantityBox_rightText {
    font-size: .45rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #5C5E67;
    line-height: .45rem;
  }

  .stakeDes {

    margin-top: .675rem;
    margin-left: 0px;
    margin-right: 0px;
    font-size: .35rem;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #5C5E67;
    line-height: .575rem;
  }

  .stakeBtn {
    cursor: pointer;
    /* margin-top: .825rem; */
    margin-left: 0px;
    margin-right: 0px;
    width: 47%;
    height: 1rem;
    background: linear-gradient(270deg, #FF7C3D 0%, #F7B500 100%);
    border-radius: 4px;
    border-style: none;
    font-size: .4rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #FFFFFF;
    line-height: .65rem;
    /* margin-bottom: -0.25rem; */

  }

  .stakeBtnOfAction {
    cursor: pointer;
    margin-top: .825rem;
    margin-left: 0px;
    margin-right: 0px;
    height: 1.25rem;
    background: linear-gradient(270deg, #FF7C3D 0%, #F7B500 100%);
    border-radius: 4px;
    border-style: none;
    font-size: .4rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #FFFFFF;
    line-height: .65rem;
    margin-bottom: -0.25rem;
  }

  .selectTextBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .selectTextBox_count {
    margin-left: .25rem;
    font-size: .375rem;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #5C5E67;
    line-height: .625rem;
  }

  .stepBox {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: .55rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: left;
  }

  .stepBoxSub {
    margin-top: 0rem;
    display: flex;
    flex-direction: row;
  }

  .stepBoxSub1 {
    margin-top: .875rem;
    display: flex;
    flex-direction: row;
  }

  .stepBoxSub_contantBox {
    margin-left: .0rem;
    margin-top: 0rem;
    display: flex;
    flex-direction: column;
  }

  .stepName {
    margin-top: 0.5rem;
    font-size: 0.35rem;
    color: #111111;
  }

  .processImg {
    /* margin-left: 0.25rem; */
    margin-top: 0rem;
    width: 0.5rem;
    height: 0.5rem;
  }

  .processImg_loading {
    margin-left: -.25rem;
    margin-top: -.25rem;
    /* margin-left: 0.25rem; */
    width: 1rem;
    height: 1rem;

    /* width: 0.5rem; */
    /* height: 0.5rem; */
  }

  .processDesTopTitle {
    margin-top: -0.075rem;
    font-size: .4rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #212121;
    line-height: .65rem;
  }

  .processDesBottomTitle {
    width: 100%;
    margin-top: .05rem;
    font-size: .375rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #5C5E67;
    line-height: .525rem;
    margin-right: .5rem;
  }

  .processDesBottomTitle_active {
    margin-top: .05rem;
    font-size: .375rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #F7B500;
    line-height: .525rem;
  }

  .processStepBtnBox {
    position: relative;
    margin-top: 0.35rem;
    width: 5.5rem;
    height: 1rem;
  }

  .processStepOffBtn {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0%;
    top: 0%;
    width: 5.5rem;
    height: 1rem;
    border-radius: 0.1rem;
    border-style: none;
    background-color: #eee;
    color: #999;
    font-size: 0.4rem;
  }

  .processStepOnBtn {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0%;
    top: 0%;
    border-radius: 0.1rem;
    border-style: none;
    background: linear-gradient(270deg, #FF7C3D 0%, #F7B500 100%);
    color: white;
    font-size: 0.4rem;
  }

  .processCloseBtn {
    margin-top: 0.375rem;
    width: 5rem;
    height: 0.8rem;
    border-radius: 0.4rem;
    border-style: none;
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    color: white;
    font-size: 0.4rem;
  }

  .stakeSuccessDes {
    margin-left: .5rem;
    margin-right: .5rem;
    margin-top: .6rem;
    font-size: .4rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #212121;
    line-height: .625rem;
  }

  .stakeSuccessDes_active {
    margin-top: .6rem;
    font-size: .375rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #F7B500;
    line-height: .625rem;
  }

  .txHashBox_process {
    margin-top: 0.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    margin-bottom: -0.25rem;
  }

  .statusImgBox {
    display: flex;
    flex-direction: row;
    justify-content: left;
    width: .75rem;
    height: .75rem;
    /* background-color: aqua; */
  }


  .courseSectionBox {
    border-radius: 0.25rem;
    background-color: white;
    margin-left: 2.5%;
    width: 95%;
  }


  .topCourseBox {
    margin-bottom: -0.5rem;
    background-color: white;
    border-radius: .25rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 1.75rem;
    justify-content: space-between;
  }

  .courseLeftBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0rem;
  }

  .courseRightBox {
    margin-right: .75rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0rem;
    cursor: pointer;
  }

  .courseRightBox_text {
    font-size: .4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #F7B500;
    line-height: .55rem;
  }

  .courseRightBox_img {
    margin-top: .0rem;
    margin-left: .075rem;
    height: .2rem;
  }

  .courseTopImg {
    margin-top: -0rem;
    margin-left: .8rem;
    /* width: 3.225rem; */
    /* margin-right: unset; */
    /* width: 2.45rem; */
    height: .575rem;
    /* margin-right: -.25rem; */
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

  .myfarmdata {
    margin-top: 1.35rem;
    width: 100%;
    margin-bottom: -0.35rem;
  }


  .emptyNFTBox {
    margin-top: 3rem;
    width: 100%;
    /* height: 5rem; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 1rem;
    background-color: white;
  }

  .emptyNFTImg {
    margin-top: 0rem;
    width: 5rem;
    height: 5rem;
  }

  .emptyDes {
    font-size: 0.5rem;
    color: #999;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }


  .searchAndSortBox {
    margin-top: .75rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    /* width: 100%; */
    margin-bottom: .75rem;

  }

  .searchBoxSuper {
    width: 100%;
    margin-top: 0rem;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }

  .searchBox {
    margin-right: 0rem;
    margin-left: .75rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: .1rem;
    border: 1px solid #F1F1F1;
    width: 8.625rem;
    height: 1rem;
    flex: none;
  }

  .searchBtn {
    margin-right: 0rem;
    padding-left: .3rem;
    padding-right: .3rem;
    /* padding-top: .2rem;
    padding-bottom: .2rem; */
    height: 1rem;
    margin-left: .5rem;
    font-size: .35rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: .5rem;
    border-style: none;
    background-color: #F7B500;
    border-radius: .1rem;
  }

  .searchBox_leftImg {
    margin-left: .25rem;
    width: .4055rem;
    height: .4487rem;

  }

  .searchBox_input {
    margin-left: .175rem;
    margin-right: .5rem;
    flex: 1;
    height: 100%;
    border: none;
    font-size: .325rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8C9399;
    color: #111;
    line-height: .4rem;
    background-color: #fff;
    border-width: 0rem;
    outline: none;



  }

  .searchBox_rightImg {
    margin-right: .25rem;
    width: .35rem;
    height: .35rem;
  }

  .sortBox {
    margin-top: 0rem;
    margin-right: .75rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: right;

    align-items: center;
    margin-bottom: 0rem;
  }

  .sortItemBox0 {
    margin-left: .5rem;
    margin-right: 0rem;
    width: 4.6rem;
    height: 1rem;
    border-radius: .1rem;
    border: 1px solid #EEEEEE;
    display: flex;
    flex: unset;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .filtrateBtnMarginRight {
    margin-right: 0rem;
  }

  .sortItemBox1 {
    margin-left: .5rem;
    width: 3rem;
    height: 1rem;
    border-radius: .1rem;
    border: 1px solid #EEEEEE;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .sortItemBox0_text {
    margin-left: .25rem;
    font-size: .35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #212121;
    line-height: .5rem;
  }

  .sortItemBox1_text {
    margin-left: .125rem;
    font-size: .35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #212121;
    line-height: .5rem;
  }

  .sortItemBox0_img {
    margin-right: .25rem;
    width: .4rem;
    /* height: .175rem; */
  }

  .sortItemBox1_img {
    width: .4rem;
    height: .4rem;

  }

  .el-dropdown-item_active {
    color: #f7b500;
    font-size: .35rem;
    line-height: .8rem;
  }

  .el-dropdown-item {
    color: #212121;
    font-size: .35rem;
    line-height: .8rem;

  }


  .traddingStarblockBtn_a {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 47%;
  }

  .traddingStarblockBtn {
    margin-left: 0rem;
    font-size: .4rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    line-height: .65rem;
    border-radius: .1rem;
    border: 1px solid #F7B500;
    background-color: white;
    color: #FE9C02;
    height: 1rem;
    width: 100%;
  }

  .traddingStarblockBtn_yellow {
    font-size: .4rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    line-height: .65rem;
    border-radius: .1rem;
    border: 1px solid #F7B500;
    background-color: white;
    color: white;
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    height: 1rem;
    width: 100%;
  }


  .defaultRewardDes {
    width: 100%;
    text-align: center;
    margin-top: .375rem;
    font-size: .35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #5C5E67;
    line-height: .5rem
  }


  .alertDesBox {
    width: 100%;
    margin-top: .4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: #2c6ff8; */

  }

  .alertDesItemBox {
    margin-left: 2%;
    width: 100%;
    margin-top: .35rem;
    display: flex;
    flex-direction: row;
    align-items: top;
  }

  .alertDesItemBox_img {
    width: .4rem;
    height: .4rem;

  }

  .alertDesItemBox_text {
    margin-top: -0.1rem;
    margin-left: .125rem;
    font-size: .375rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #212121;
    line-height: .525rem;

  }

}
</style>
