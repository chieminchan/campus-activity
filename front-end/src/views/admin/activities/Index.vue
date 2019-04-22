<template>
	<Card class='activities'>
		<h2 class="card-header" slot="title"> 活动信息管理 </h2>
		<Table class="activity-form" :fit="true" :data="allActivities" :loading="isFetching" ref="activityTable" border stripe>
			<Column prop="activity_name" label="活动名字" width="200" fixed>
				<template slot-scope="scope">
					<router-link :to="{name: '',params: {aid: scope.row.activity_id}}">
						{{ scope.row.activity_name }}
					</router-link>
				</template>
			</Column>
			<Column prop="activity_enroll_deadline" label="报名截止时间" width="160" sortable></Column>
			<Column prop="activity_start" label="活动开始时间"  width="125" sortable></Column>
			<Column prop="activity_end" label="活动结束时间"  width="125" sortable></Column>
			<Column prop="activity_concat_name" label="活动联系人"></Column>
			<Column prop="activity_concat_phone" label="活动联系方式" width="120"></Column>
			<Column class="action-column" label="操作" width="290">
				<template slot-scope="scope">
					<Button class="action-btn" type="primary" @click=""> 查看详情 </Button>
					<Button class="action-btn" type="success" @click=""> 修改信息 </Button>
					<Button class="action-btn" type="warning" @click=""> 删除活动 </Button>
				</template>
			</Column>
		</Table>

		<Page class="pagination" 
					:total=totalPage 
					:current="currentPage" 
					:page-size-opts="pageOpts" 
					:page-size="pageSize" 
					@on-page-size-change="changePageSize" 
					@on-change="changePage" show-elevator show-sizer />
	</Card>
</template>

<script>
import stateParseMixin from '@/utils/stateParseMixin';
import { mapState, mapActions } from 'vuex';

export default {
	components: {},
	mixins: [stateParseMixin],
	data() {
		return {
			currentPage: 1,
			pageOpts: [3, 5, 10, 20],
			pageSize: 10
		};
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
		},
		isEmpty() {
			return this.allActivities.length === 0;
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
.activities {
	padding: 20px 10px;

	.pagination {
		margin-top: 30px;
		text-align: right;
	}

	.action-btn{
		margin-left: 7px;
		margin-top: 5px;
	}
}

.activity-form {
	margin-top: 20px;
	width: 100%;
	overflow-x: auto;
	td{
		padding: 10px 2px;
	}
	th {
		.cell {
			text-align: center;
		}
	}
}
</style>