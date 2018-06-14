<template>
    <div class="rule">
        <header class="header">
            <span class="left-part" @click="goBack">返回</span>
            <h1>以太章鱼</h1>
        </header>
        <ul class="rule-list">
            <li>
                <p>1、竞猜输赢判断</p>
                <p>每一场比赛竞猜答案是唯一的，已相应比赛结果为准，如竞猜多个选项，只要竞猜结果包含正确答案，则用户可以获得竞猜正确选项的对应奖励。竞猜正确的用户将平分竞猜不正确用户奖池，若比赛结果为平局，则所有用户平分奖池奖励</p>
            </li>
            <li>
                2、所有用户的竞猜投注以智能合约记录为准
            </li>
            <li>
                <p>3、奖励发放、钱包地址说明</p>
                <p>奖励是由去中心化的智能合约以ETH的形式自动发放，所以为了奖励的顺利发放，请您提前绑定正确的以太坊钱包地址</p>
                <p>（如用户需要将获得ETH奖励兑换成法币，请加微信客服联系ETH回购事宜） </p>
            </li>
            <li>
                <p>4、奖励发放时间</p>
                <p>比赛结束后，1小时内智能合约将自动开始奖励结算，由于到账时间会受以太坊网络影响，所以请中奖用户耐心等待
                </p>
            </li>
            <li>
                <p>5、为了支付ETH网络的手续费及维护竞猜平台多项费用，每场竞猜游戏平台方将抽取总奖池5%的手续费</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}

</script>
<style lang="less" scoped>
	.rule {
		.rule-list {
			text-align: left;
			padding: 20px 20px;
			color: #333;
			font-size: 14px;
			line-height: 1.75;
			li {
				padding: 10px 0;
			}

		}

	}

</style>
