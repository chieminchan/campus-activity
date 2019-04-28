<template>
	<Card class='enrolled'>
		<GoBack></GoBack>
		<h2>报名名单</h2>

		<Button class="download-btn" type="success" icon="md-download" @click.prevent="" :loading="isFetching">
			导出名单
		</Button>

		<h3 class="table-title">{{activityName}}</h3>
		<Table class="enrolled-table" :fit="true" :data="enrolledList" :loading="isFetching" ref="studentsTable" border stripe>
			<Column prop="user_account" label="学生学号" fixed sortable></Column>
			<Column prop="user_name" label="学生名字"></Column>
			<Column prop="user_sex" label="性别"></Column>
			<Column prop="user_grade" label="年级" sortable></Column>
			<Column prop="user_department" label="院系" width="200" sortable></Column>
			<Column prop="user_profession" label="专业" width="200" sortable></Column>
			<Column prop="user_class" label="班级">
				<template slot-scope="scope">
					{{scope.row.user_class}}班
				</template>
			</Column>
			<Column prop="user_phone" label="联系方式"></Column>
		</Table>

	</Card>
</template>

<script>
import GoBack from '@/components/GoBack';
import { mapState, mapActions } from 'vuex';
import stateParseMixin from '@/utils/stateParseMixin';

export default {
	components: { GoBack },
	mixins: [stateParseMixin],
	data() {
		return {

		};
	},
	computed: {
		...mapState('admin', { state: 'enrolledList' }),
		enrolledList() {
			if (this.isFulfill) {
				return this.state.payload.results.data;
			}
			return [];
		},
		activityName() {
			if (this.isFulfill) {
				return this.state.payload.results.activity_name;
			}
			return '';
		}
	},
	methods: {
		...mapActions('admin', ['getEnrolledList']),
		load() {
			const { params: { aid } } = this.$route;
			this.getEnrolledList({ activityId: aid });
		},
	},
	mounted() {
		this.load();
	},
}
</script>
<style type='text/less' lang='less'>
.enrolled {
	position: relative;
	.table-title {
		font-size: 18px;
		font-weight: 500;
		text-align: center;
		margin-bottom: 20px;
	}
	.download-btn {
		position: absolute;
		right: 20px;
		top: 55px;
	}
	.enrolled-table {
		td .cell {
			text-align: center;
		}
	}
}
</style>