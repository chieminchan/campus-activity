<template>
	<Card class='approvals-page'>
		<h2 class="card-header" slot="title"> 待审批活动 </h2>

		<Table class="approval-table" :fit="true" :data="pendingReview" :loading="isFetching" ref="activityTable" border stripe>
			<Column prop="activity_name" label="活动名字" width="185" fixed>
				<template slot-scope="scope">
					<router-link :to="{name: '',params: {aid: scope.row.activity_id}}">
						{{ scope.row.activity_name }}
					</router-link>
				</template>
			</Column>
			<Column prop="activity_type" label="活动类型" width="100" sortable></Column>
			<Column prop="activity_enroll_deadline" label="报名截止时间" width="160" sortable></Column>
			<Column prop="activity_start" label="活动时间" width="190" sortable>
				<template slot-scope="scope">
					{{`${scope.row.activity_start} - ${scope.row.activity_end}`}}
				</template>
			</Column>
			<Column prop="activity_creator" label="活动申请人" width="90"></Column>
			<Column prop="activity_creator_phone" label="联系方式" width="115"></Column>
			<Column class="action-column" label="操作" width="285">
				<template slot-scope="scope">
					<Button class="action-btn" type="primary" @click=""> 查看详情 </Button>
					<Button class="action-btn" type="success" @click=""> 通过审核 </Button>
					<Button class="action-btn" type="warning" @click=""> 不通过 </Button>
				</template>
			</Column>
		</Table>

		<Page class="pagination" :total=totalPage :current="currentPage" :page-size-opts="pageOpts" :page-size="pageSize" @on-page-size-change="changePageSize" @on-change="changePage" show-elevator show-sizer />
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
			pageSize: 10,
		};
	},
	computed: {
		...mapState('admin', { state: 'approvals' }),
		pendingReview() {
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
		...mapActions('admin', ['getApprovals']),
		load() {
			const { currentPage, pageSize } = this;
			this.getApprovals({ currentPage, pageSize })
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
.approvals-page {
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

.approval-table {
	margin-top: 20px;
	width: 100%;
}
</style>