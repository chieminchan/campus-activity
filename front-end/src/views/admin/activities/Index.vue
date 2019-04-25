<template>
	<Card class='activities-page'>
		<h2 class="card-header" slot="title"> 活动信息管理 </h2>

		<div class="action-list">
			<Button class="btn" type="warning" @click.prevent="" :loading="isFetching">
				<i class="fa fa-lg fa-trash-o" aria-hidden="true"></i> 批量删除
			</Button>
			<Button class="btn" type="success" @click.prevent="" :loading="isFetching">
				<i class="fa fa-paper-plane" aria-hidden="true"></i>  发布活动
			</Button>
			<Input class="search-text" search type="text" v-model="searchText" placeholder="搜索活动" @change=""></Input>
		</div>

		<Table class="activity-table" :fit="true" :data="allActivities" :loading="isFetching" ref="activityTable" border stripe>
			<Column type="selection" width="40">
			</Column>
			<Column prop="activity_name" label="活动名字" width="180" fixed>
				<template slot-scope="scope">
					<router-link :to="{name: 'admin-activity-detail',params: {aid: scope.row.activity_id}}">
						{{ scope.row.activity_name }}
					</router-link>
				</template>
			</Column>
			<Column prop="activity_type" label="活动类型" width="100" sortable></Column>
			<Column prop="activity_start" label="活动时间" width="210" sortable>
				<template slot-scope="scope">
					{{`${scope.row.activity_start} - ${scope.row.activity_end}`}}
				</template>
			</Column>
			<Column prop="activity_score_value" label="活动评分" width="100" sortable>
				<template slot-scope="scope">
					{{ scope.row.activity_score_value | formatScore}}
				</template>
			</Column>
			<Column prop="activity_creator" label="活动发布人" width="90"></Column>
			<Column prop="activity_creator_phone" label="联系方式" width="115"></Column>
			<Column class="action-column" label="操作" width="290">
				<template slot-scope="scope">
					<Button class="action-btn" type="primary" @click=""> 查看详情 </Button>
					<Button class="action-btn" type="success" @click=""> 编辑 </Button>
					<Button class="action-btn" type="warning" @click=""> 删除 </Button>
				</template>
			</Column>
		</Table>

		<Page class="pagination" :total=totalPage :current="currentPage" :page-size-opts="pageOpts" :page-size="pageSize" @on-page-size-change="changePageSize" @on-change="changePage" show-elevator show-sizer />
	</Card>
</template>

<script>
import _ from 'lodash';
import stateParseMixin from '@/utils/stateParseMixin';
import { mapState, mapActions } from 'vuex';

export default {
	components: {},
	mixins: [stateParseMixin],
	data() {
		return {
			currentPage: 1,
			pageOpts: [3, 5, 10, 20],
			pageSize: 10,
			searchText: ''
		};
	},
	filters: {
		formatScore(num) {
			if(_.isNil(num)) {
				return '0.0'
			}
			return num.toFixed(1);
		}
	},
	computed: {
		...mapState('admin', { state: 'activities' }),
		allActivities() {
			if (this.isFulfill) {
				return this.state.payload.results.data;
			}
			return [];
		},
		totalPage() {
			if (this.isFulfill) {
				return this.state.payload.results.total;
			}
			return 0;
		}
	},
	methods: {
		...mapActions('admin', ['getActivities']),
		load() {
			const { currentPage, pageSize } = this;
			this.getActivities({ currentPage, pageSize })
				.catch(() => {
					this.$Message.error('活动列表请求出现错误！');
				});
		},
		changePage(currentIndex) {
			this.currentPage = currentIndex;
			this.load();
		},
		changePageSize(pageSize) {
			this.pageSize = pageSize;
			this.currentPage = 1;
			this.load();
		}
	},
	created() {
		this.load();
	},
}
</script>
<style type='text/less' lang='less'>
.activities-page {
	padding: 20px 5px;

	.pagination {
		margin-top: 30px;
		text-align: right;
	}

	.action-btn {
		margin-left: 7px;
		margin-top: 5px;
	}
}

.activity-table {
	margin-top: 20px;
	width: 100%;
	overflow-x: auto;
	td {
		padding: 10px 2px;
	}
	th {
		.cell {
			text-align: center;
		}
	}
}

.action-list {
	margin: 10px 0 30px 10px;
	.btn {
		margin-right: 20px;
	}
	.search-text {
		text-indent: 5px;
		display: inline-block;
		width: 30%;
		margin-left: 20px;
	}
}
</style>