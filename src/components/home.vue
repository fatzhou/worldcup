<template>
	<div class="home">
		<header class="header">
			<img src="../assets/user@2x.png" class="user left-part" />
			<h1>以太章鱼</h1>
			<p class="right-part" @click="goRule">玩法说明</p>
		</header>
		<div class="recommend">
			<h2>基于以太坊智能合约的2018足球世界杯竞猜平台</h2>
			<ul class="features clear">
				<li class="f-l">
					<img src="../assets/home@2x.png" alt="">
					<p class="title">投注可查验</p>
					<p class="desc">投注记录公开透明</p>
				</li>
				<li class="f-l">
					<img src="../assets/home@2x.png" alt="">
					<p class="title">智能合约托管资产</p>
					<p class="desc">杜绝丢单/篡改/跑路</p>
				</li>
				<li class="f-l">
					<img src="../assets/home@2x.png" alt="">
					<p class="title">用户隐私保护</p>
					<p class="desc">无需提交个人身份信息</p>
				</li>
			</ul>
		</div>
		<div class="focus-match">
			<ul class="tabs clear">
				<li class="tab f-l" :class="selectType===1?'active':''" @click="changeType">
					<p>焦点赛事</p>
				</li>
				<li class="tab f-l" :class="selectType===2?'active':''" @click="changeType">
					<p>近期赛事</p>
				</li>
			</ul>
		</div>
		<div class="match-info" v-for="match in renderData">
			<section class="betting-info clear">
				<p class="team f-l">{{ match.matchDesc }}</p>
				<p class="jackport f-r">
					参与人次：<span class="red">{{ match.attendants }}</span>
				</p>
			</section>
			<section class="team-info">
				<div class="host-team">
					<img :src="match.hostFlag" alt="">
					<p>{{ match.host }}</p>
				</div>
				<div class="time-info">
					<p class="vs">VS</p>
					<p class="deadline">{{ match.deadline }}</p>
				</div>
				<div class="guest-team">
					<img :src="match.guestFlag" alt="">
					<p>{{ match.guest }}</p>					
				</div>
			</section>
			<section class="betting-ratio  clear">
				<div class="ratio-host f-l" :style="{width: match.hostBetting / (match.hostBetting + match.guestBetting) * 100 + '%'}">
					<p>{{ match.hostBetting }}ETH</p>
				</div>
				<div class="ratio-guest f-l" :style="{width: match.guestBetting / (match.hostBetting + match.guestBetting) * 100 + '%'}">
					<p>{{ match.guestBetting }}ETH</p>
				</div>
			</section>
			<section class="betting-btn bottom-border clear">
				<div class="focus-btn do-betting f-l" @click="betTeam(match, 1)">投注{{match.host}}</div>
				<div class="focus-btn do-betting f-r" @click="betTeam(match, 2)">投注{{match.guest}}</div>
			</section>
			<section class="infomation bottom-border">
				<h3 class="title">章鱼推荐</h3>
				<p>
					{{ match.recommend }}
				</p>
			</section>
			<section class="history-analysis bottom-border" v-if="selectType===1">
				<h3 class="title">过往对阵</h3>
				<table>
					<thead>
						<tr>
							<th>日期</th>
							<th>赛事</th>
							<th>主队</th>
							<th>比分</th>
							<th>客队</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="history in match.historyAnalysis">
							<td>
								{{ history[0] }}
							</td>
							<td>{{ history[1] }}</td>
							<td>{{ history[2] }}</td>
							<td>{{ history[3] }}</td>
							<td>{{ history[4] }}</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section class="recent-matches bottom-border">
				<h3 class="title">最近战绩</h3>
				<table>
					<caption>{{ match.host }}</caption>
					<thead>
						<tr>
							<th>日期</th>
							<th>赛事</th>
							<th>主队</th>
							<th>比分</th>
							<th>客队</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="hostRecent in match.hostRencent">
							<td>{{hostRecent[0]}}</td>
							<td>{{hostRecent[1]}}</td>
							<td>{{hostRecent[2]}}</td>
							<td>{{hostRecent[3]}}</td>
							<td>{{hostRecent[4]}}</td>
						</tr>
					</tbody>
				</table>

				<table>
					<caption>俄罗斯</caption>
					<thead>
						<tr>
							<th>日期</th>
							<th>赛事</th>
							<th>主队</th>
							<th>比分</th>
							<th>客队</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="guestRecent in match.guestRencent">
							<td>{{guestRecent[0]}}</td>
							<td>{{guestRecent[1]}}</td>
							<td>{{guestRecent[2]}}</td>
							<td>{{guestRecent[3]}}</td>
							<td>{{guestRecent[4]}}</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section class="infomation bottom-border">
				<h3 class="title">双方动态</h3>
				<p>
					{{match.host}}：{{match.hostNews}}
				</p>
				<p >
					{{match.guest}}：{{match.guestNews}}
				</p>
			</section>
		</div>

		<div class="mask" v-if="betShow">
			<div class="content">
				<h3 class="title">投注<span class="close" @click="closeMask"></span></h3>
				<div class="content-inner">
					<p>您选择了投注<span class="red">{{bet.team}}</span><img :src="bet.flag">，合约地址为</p>
					<code id="contract-content">
						{{bet.contract}}
					</code>
					<p class="desc">请直接复制该合约，将以太坊转账至该合约即可，结算和回报请参考<span class="red"  @click="goRule">玩法说明</span></p>

					<div class="focus-btn copy" id="copyBtn"  data-clipboard-snippet data-target="contract-content" data-text="合约地址已成功复制到剪贴板">复制合约地址</div>					
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import Russia from '@/assets/Russia@2x.png';
	import Saudi from '@/assets/Saudi@2x.png';
	import Spain from '@/assets/Spain@2x.png';
	import Portugal from '@/assets/Portugal@2x.png';
	import Web3 from 'web3';
	// import '@/assets/js/web3.min.js';
	import clipboard from '@/assets/js/clipboard.min.js';
	import UEFATeamToken from '@/assets/js/UEFATeamToken.json';

	export default {
		data() {
			return {
				selectType: 1,
				renderData: [],
				betShow: false,
				bet: {
					team: '',
					flag: '',
					contract: '',
				},
				focusMatch: {
					matchDesc: '小组赛 A组 第1轮',
					attendants: 0,
					host: '俄罗斯',
					guest: '沙特阿拉伯',
					hostFlag: Russia,
					guestFlag: Saudi,
					deadline: '06-14 22:55',
					hostBetting: 1.5,
					guestBetting: 2.5,
					hostContract: '0xa550a68252053b139af6e7dd34adc8ec7406b5ec',
					guestContract: '0x323333',
					recommend: '俄罗斯。A组除了乌拉圭实力明显高出一筹，俄罗斯，埃及，沙特争抢另外一个出线名额。战斗名族作为东道主，也面临着近几届世界杯的最佳小组出线机会，必然需要从直接竞争对手身上抢分。而欧洲主流博彩公司开出了1.36-4.6-9.00的赔率，俄罗斯一球小胜概率极大。',
					historyAnalysis: [
						['2018-01-01', '国际友谊赛', '俄罗斯', '1:1', '沙特阿拉伯'],
						['2018-01-01', '国际友谊赛', '俄罗斯', '1:1', '沙特阿拉伯'],
					],
					hostRencent: [
						['2018-01-01', '国际友谊赛', '俄罗斯', '1:1', '沙特阿拉伯'],
						['2018-01-01', '国际友谊赛', '俄罗斯', '1:1', '沙特阿拉伯'],
					],					
					guestRencent: [
						['2018-01-01', '国际友谊赛', '俄罗斯', '1:1', '沙特阿拉伯'],
						['2018-01-01', '国际友谊赛', '俄罗斯', '1:1', '沙特阿拉伯'],
					],
					hostNews: '最新世界排名俄罗落在了70后，是小组最后一名，其实力也实在一般，但有一点可以肯定，俄罗斯近期的热身赛全是装怂示弱，连续四轮输盘，或为东道主正赛不被看高，如愿晋级做铺垫，俄罗斯要晋级，揭幕战对阵小组赛最弱的一个对手沙特阿拉伯总该全取三分吧，俄罗斯至少赢球会是必然思维。竞彩1.28的主胜被无数彩民数千数万连续几天的暴打，始终不降，就是普京来句经典“国家利益高于国家荣誉”，你又奈何。再装孙子的俄罗斯首战就是平了沙特也未必就不能小组晋级。有一点可以肯定，俄罗斯是否小组出线，俄罗斯是否揭幕战首胜是这届世界杯的最大看点之一，也是这届世界杯玩球的一个风向标。',
					guestNews: '六月下雪，沙特阿拉伯也不可能小组出线，但能作为揭幕战的主角，就千万别在首战把沙特当鱼腩。但曾经世界杯0比8被德国战车横扫的沙特，最后一场热身赛1比2输德国赢盘，基本注定了其被苏亚雷斯的乌拉圭和萨拉赫的埃及暴虐，沙特早早出局板上钉钉。'
				},
				recentMatch: [
					{
						matchDesc: '小组赛 B组 第1轮',
						attendants: 0,
						host: '葡萄牙',
						guest: '西班牙',
						hostFlag: Spain,
						guestFlag: Portugal,
						deadline: '06-15 01:55',
						hostBetting: 1.5,
						guestBetting: 2.5,
						recommend: '葡萄牙。西班牙临阵换帅，恐重蹈负责，而葡萄牙携欧冠冠军余威，极有可能一鼓作气拿下'						
					}

				]
			}
		},
		created() {
			this.renderData = [].concat(this.focusMatch);
			//获取合约人数
			this.initWeb3();
		},
		mounted() {
			if(window.Clipboard && Clipboard.isSupported()) {
				var clipboardSnippets = new Clipboard('[data-clipboard-snippet]', {
				    target: function(trigger) {
				        return document.getElementById(trigger.getAttribute('data-target'))
				    }
				});

				clipboardSnippets.on('success', function(e) {
				    e.clearSelection();
				    console.log(e)
				    alert(e.trigger.dataset.text);
				});

				clipboardSnippets.on('error', function(e) {
				    alert(e.trigger);
				});
			}
		},
		methods: {
			initWeb3() {
				console.log(Web3)
				// var web3 = new Web3();
				// let web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
    //     		web3.setProvider(web3Provider);
				// var contract = web3.eth.contract(UEFATeamToken.abi).at('0xa550a68252053b139af6e7dd34adc8ec7406b5ec');
				// console.log(contract)
				// var a = contract.totalSupply()
				// console.log(a)
			},
			goRule() {
				this.$router.push('rule');
			},
			changeType() {
				console.log(this.selectType)
				if(this.selectType === 1) {
					this.selectType = 2;
					this.renderData = [].concat(this.recentMatch);
				} else {
					this.selectType = 1;
					this.renderData = [].concat(this.focusMatch);
				}
			},
			betTeam(match, type) {
				console.log(type);
				if(type === 1) {
					this.bet.team = match.host;
					this.bet.flag = match.hostFlag;
					this.bet.contract = match.hostContract;
				} else {
					this.bet.team = match.guest;
					this.bet.flag = match.guestFlag;
					this.bet.contract = match.guestContract;					
				}
				this.betShow = true;
			},
			closeMask() {
				this.betShow = false;
			},
		}
	}
</script>

<style lang="less">
	@padding: 16px;
	@red: #FF4A4A;
	.header {
		background: #EB3636; 
		height: 44px;
		line-height: 44px;
		padding: 0 @padding;
		position: relative;
		.left-part {
			height: 24px;
			position: absolute;
			left: @padding;
			top: 10px;
			line-height: 24px;
		}
		.right-part {
			position: absolute;
			height: 44px;
			line-height: 44px;
			right: 10px;
			top: 0;
			padding: 0 10px;
		}
		h1 {
			text-align: center;
			font-size: 18px;
			line-height: 44px;
		}
	}

	.red {
		color: @red;
		font-weight: bold;
	}

	.title {
		line-height: 2.5;
	}

	table {
		font-size: 12px;
		width: 100%;
		caption {
		    text-align: left;
		    padding-left: 20px;
		    line-height: 2;
		    color: #000;
		}
		&:last-child caption {
			padding-top: 10px;
		}
		th, td {
			line-height: 1.25;
		}
	}

	.focus-btn {
		color: #fff;
		background: @red;
		border-radius: 4px;
		padding: 0 @padding;
		font-weight: bold;
		display: inline-block;
		height: 36px;
		line-height: 36px;
		font-size: 18px;
		&:active {
			background: #EB3636;
		}
	}

	.recommend {
		background: @red;
		padding: 24px 0;
		h2 {
			font-size: 16px;
			margin-bottom: 24px;
		}
		.features {
			/*padding: 0 60px;*/
			li {
				width: 33%;
			}
			img {
				width: 48px;
				height: 48px;
				border-radius: 4px;
				margin-bottom: 4px;
			}
			.title {
				font-size: 14px;
			}
			.desc {
				font-size: 12px;
			}
		}
	}
	.bottom-border {
		padding-bottom: 20px;
		border-bottom: 1px solid #f1f1f1;
	}
	.focus-match {
		margin-top: 10px;
		background: #fff;
		color: #000;

		.tabs {
			font-size: 16px;
			height: 45px;
			line-height: 44px;
			padding: 0 @padding;
			border-bottom: 1px solid #f1f1f1;
			.tab {
				width: 50%;
				p {
					display: inline-block;
					padding: 0 16px;
					border-bottom: 2px solid #fff;
					font-weight: bold;
				}
				&.active {
					color: @red;
					p {
						border-color: @red;
					}
				}
			}


		}
	}
	.match-info {
		background: #fff;
		color: #000;
		.betting-info {
			height: 36px;
			line-height: 36px;
			position: relative;
			font-size: 12px;
			color: #000;
			padding: 0 @padding;
			border-bottom: 1px solid #f1f1f1;

			&:before {
				content: "";
				background: #FF4A4A;
				width: 4px;
				height: @padding;
				position: absolute;
				left: 0;
				top: 8px;
			}	
			.team {
				text-align: left;
			}
			.jackport {
				text-align: right;
			}
		}
		.team-info {
			position: relative;
			height: 90px;
			padding: 17px 40px 0;
			/*border-bottom: 1px solid #f1f1f1;*/
			box-sizing: border-box;

			.host-team, .guest-team {
				width: 60px;
				position: absolute;
				top: 16px;
				img {
					width: 60px;
					display: block;
					border: 1px solid #f8f8f8;
				}
				p {
					font-size: 12px;
					margin-top: 6px;
				}
			}
			.host-team {
				left: 40px;
			}
			.guest-team {
				right: 40px;
			}
			.time-info {
				.vs {
					font-size: 28px;
					font-weight: bolder;
					line-height: 1.5;
				}
				.deadline {
					font-size: 12px;
					line-height: 1.75;
				}
			}
		}
	}
	.betting-ratio {
		padding: 4px 40px;
		height: 44px;
		box-sizing: border-box;
		.ratio-host, .ratio-guest {
			height: 10px;
			position: relative;
			p {
				position: absolute;
				width: 100%;
				top: 10px;
				text-align: center;
				font-size: 12px;
				line-height: 2;
			}
		}
		.ratio-host {
			background: @red;
		}
		.ratio-guest {
			background: green;
		}
	}
	.betting-btn {
		margin-top: 4px;
		padding-left: @padding;
		padding-right: @padding;
	}
	.infomation {
		p {
			font-size: 12px;
			line-height: 1.75;
			padding: 0 @padding;
			text-align: left;
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: rgba(0, 0, 0, .2);
		height: 100%;
		color: #000;
		font-size: 14px;
		line-height: 1.75;
		text-align: left;
		.content {
		    position: absolute;
		    width: 90%;
		    top: 50%;
		    left: 50%;
		    -webkit-transform: translate(-50%, -50%);
		    transform: translate(-50%, -50%);
		    background: #fff;
		    box-shadow: 0 0 5px #ddd;
		    box-sizing: border-box;
			.title {
				font-size: 18px;
				color: #000;
				height: 44px;
				line-height: 44px;
				border-bottom: 1px solid #f1f1f1;
				position: relative;
				padding: 0 @padding;
			}
			img {
				height: 16px;
				vertical-align: middle;
				margin-left: 4px;
			}
			.content-inner {
				padding: 10px @padding;
				code {
					border: 1px solid #ccc;
					background: #f1f1f1;
					width: 100%;
					display: block;
					margin: 10px 0;
					padding: 2px 10px;
					box-sizing: border-box;
				}
				.desc {
					font-size: 12px;
					color: #999;
				}
				.copy {
					margin: 10px 0;
				    width: 100%;
				    display: block;
				    box-sizing: border-box;
				    text-align: center;
				}
			}
		}
	}

	/* basic style */
	.close {
	    background: #f1f1f1;
	    color: #000;
	    border-radius: 15px;
	    line-height: 30px;
	    text-align: center;
	    height: 30px;
	    width: 30px;
	    font-size: 24px;
	    padding: 1px;
	    font-weight: lighter;
	}
	/* use cross as close button */
	.close::before {
	    content: "\2716";
	}
	/* place the button on top-right */
	.close {
	    top: -15px;
	    right: -15px;
	    position: absolute;
	}
</style>