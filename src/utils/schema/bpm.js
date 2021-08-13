let Config = {
// bocspace项目管理
	bpm: {
		saveProject: `mutation($project: InputProject) {
		saveProject(project: $project)
		{
			id
			pid
			projectId
			treeType
			code
			name
			masters
			{
				userId
				userName
			}
			customer
			productType
			address
			description
			milepost
			builtArea
			totalCost
			builtType
			beginTime
			endTime
			constructionUnit
			constructionQualification
			partyaUnit
			unitQualification
			declarationAwards
			awardGrade
			buySoftware
			usageSituation
			background
			temporaryDecision
			temporaryManagerDesire
			temporaryRequirement
			temporaryBudgetStandard
			temporaryTotalAcceptability
			temporaryTotalRange
			temporaryBudget
			temporaryPriceDesire
			temporaryEstimatePrice
			temporaryManagersNumber
			temporaryWorkersNumber
			temporaryBeginTime
			temporaryEndTime
			temporaryBudgetEvaluation
			template
			currentTaskState
			currentProgress
			state
			stageId
			closeReason
			projectType
		}
	}`, // 返回项目信息

		closeProject: `mutation($projectId: String, $text: String) {
		closeProject(projectId: $projectId, text: $text)
	}`, // 关闭项目

		saveTask: `mutation($task: InputTask) {
		saveTask(task: $task)
		{
			id
			pid
			projectId
			treeType
			name
			rate
			masters
			{
				userId
				userName
			}
			nodeCount
			endTime
			orders
			delayType
			beginTime
			remark
		}
	}`, // 返回任务

		saveSubTask: `mutation($subtask: InputSubtask) {
		saveSubTask(subtask: $subtask)
		{
			id
			pid
			projectId
			treeType
			name
			rate
			masters
			{
				userId
				userName
			}
			endTime
			totalHours
			alreadyHours
			orders
			beginTime
			remark
		}
	}`, // 返回子任务

		saveProposal: `mutation($proposal: InputProposal) {
		saveProposal(proposal: $proposal)
		{
			id
			pid
			projectId
			treeType
			type
			masters
			{
				userId
				userName
			}
			supplierPrice
			customerPrice
		}
	}`, // 保存报价信息

		saveAttachment: `mutation($attachment: InputAttachment) {
		saveAttachment(attachment: $attachment)
		{
			id
			pid
			projectId
			treeType
			fileId
			fileName
			fileType
			filePath
			createTime
			isDeleted
		}
	}`, // 保存附件

		saveStage: `mutation($stage: InputStage) {
		saveStage(stage: $stage)
		{
			id
			pid
			projectId
			treeType
			masters
			{
				userId
				userName
			}
			status
			rate
			stageName
			finishTime
			dictStage
			indexs
		}
	}`, // 保存阶段

		saveStep: `mutation($step: InputStep) {
		saveStep(step: $step)
		{
			id
			pid
			projectId
			treeType
			stepName
			stepType
			rate
		}
	}`, // 保存 步骤

		saveTasks: `mutation($tasks: [InputTask]) {
		saveTasks(tasks: $tasks)
			{
			id
			pid
			projectId
			treeType
			name
			rate
			masters
			{
				userId
				userName
			}
			nodeCount
			endTime
			orders
			delayType
			beginTime
			remark
		}
	}`, // 返回任务

		saveSubTasks: `mutation($subtasks: [InputSubtask]) {
		saveSubTasks(subtasks: $subtasks)
			{
			id
			pid
			projectId
			treeType
			name
			rate
			masters
			{
				userId
				userName
			}
			endTime
			totalHours
			alreadyHours
			orders
			beginTime
			remark
		}
	}`, // 返回子任务

		delNode: `mutation($id: String) {
		delNode(id: $id)
	}`, // 删除节点

		getTree: `query($projectId: String) {
		getTree(projectId: $projectId)
	}`, // 获取树

		getProjectBoardList: `query($beginTime: Long, $endTime: Long, $text: String) {
		getProjectBoardList(beginTime: $beginTime, endTime: $endTime, text: $text)
			{
			id
			pid
			projectId
			treeType
			code
			name
			masters
			{
				userId
				userName
			}
			customer
			productType
			address
			description
			milepost
			builtArea
			totalCost
			builtType
			beginTime
			endTime
			constructionUnit
			constructionQualification
			partyaUnit
			unitQualification
			declarationAwards
			awardGrade
			buySoftware
			usageSituation
			background
			temporaryDecision
			temporaryManagerDesire
			temporaryRequirement
			temporaryBudgetStandard
			temporaryTotalAcceptability
			temporaryTotalRange
			temporaryBudget
			temporaryPriceDesire
			temporaryEstimatePrice
			temporaryManagersNumber
			temporaryWorkersNumber
			temporaryBeginTime
			temporaryEndTime
			temporaryBudgetEvaluation
			template
			currentTaskState
			currentProgress
			state
			stageId
			closeReason
			projectType
		}
	}`, // 项目看板列表(未完成)

		getAllProjectList: `query($beginTime: Long, $endTime: Long, $text: String, $products: [String], $state: [Int], $masterIds: [String], $pageIndex: Long, $pageSize: Long) {
		getAllProjectList(beginTime: $beginTime, endTime: $endTime, text: $text, products: $products, state: $state, masterIds: $masterIds, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				pid
				projectId
				treeType
				code
				name
				masters
					{
					userId
					userName
				}
				customer
				productType
					address
				description
				milepost
				builtArea
				totalCost
				builtType
				beginTime
				endTime
				constructionUnit
				constructionQualification
				partyaUnit
				unitQualification
				declarationAwards
				awardGrade
				buySoftware
				usageSituation
				background
				temporaryDecision
				temporaryManagerDesire
				temporaryRequirement
				temporaryBudgetStandard
				temporaryTotalAcceptability
				temporaryTotalRange
				temporaryBudget
				temporaryPriceDesire
				temporaryEstimatePrice
				temporaryManagersNumber
				temporaryWorkersNumber
				temporaryBeginTime
				temporaryEndTime
				temporaryBudgetEvaluation
				template
				currentTaskState
				currentProgress
				state
				stageId
				closeReason
				projectType
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // 全部项目明细列表  state 完成100，关闭200 阶段1-7

		getCurrentTaskList: `query($state: Int, $pageIndex: Long, $pageSize: Long) {
		getCurrentTaskList(state: $state, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				pid
				projectId
				treeType
				name
				masters
					{
					userId
					userName
				}
				userId
				endTime
				now
				rate
				delayType
				projectName
				projectType
				beginTime
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // 当前（state1延迟 2我的）任务列表(可以是主也可以是子任务 3 我的完成)

		getDeliverRate: `query {
		getDeliverRate
	}`, // 交付完成率

		getMoneyBackRate: `query {
		getMoneyBackRate
	}`, // 回款率

		getTopContractAmountList: `query {
		getTopContractAmountList
			{
			id
			name
			amount
		}
	}`, // 项目回款排行

		getProductTypeList: `query {
		getProductTypeList
			{
			id
			typeName
		}
	}`, // 获取产品类型

		getProductProportion: `query {
		getProductProportion
			{
			id
			name
			rate
		}
	}`, // 获取产品占比

		getStageTree: `query($projectId: String) {
		getStageTree(projectId: $projectId)
	}`, // 获取阶段 新增时用

		getMyTaskCount: `query {
		getMyTaskCount
	}`, // 获取我的任务条数

		getMasterList: `query {
		getMasterList
			{
			userId
			userName
		}
	}`, // 获取负责人

		saveNodes: `mutation($nodes: String) {
		saveNodes(nodes: $nodes)
	}`, // 保存节点信息

		getSts: `query {
		getSts
	}`, // 获取大文件上传sts

		saveNodesByArray: `mutation($nodes: String, $rootId: String) {
		saveNodesByArray(nodes: $nodes, rootId: $rootId)
	}`, // 保存节点信息

		getTreeByPid: `query($pid: String) {
		getTreeByPid(pid: $pid)
	}`, // 根据Pid获取树

		saveNode: `mutation($node: String) {
		saveNode(node: $node)
	}`, // 保存节点并返回节点信息

		delNodeByPid: `mutation($pid: String) {
		delNodeByPid(pid: $pid)
	}`, // 删除父节点下面所有节点 一层

		getStageTreeByTemId: `query($projectId: String, $temId: Int) {
		getStageTreeByTemId(projectId: $projectId, temId: $temId)
	}`, // 获取阶段新增的时候用

		getTempleteList: `query {
		getTempleteList
			{
			id
			name
			code
			url
			icon
			text
		}
	}`, // 获取模板列表

		getTaskattEditUrl: `query($id: String, $type: Int) {
		getTaskattEditUrl(id: $id, type: $type)
	}`, //

		saveAttachments: `mutation($attachments: [InputAttachment]) {
		saveAttachments(attachments: $attachments)
			{
			id
			pid
			projectId
			treeType
			fileId
			fileName
			fileType
			filePath
			createTime
			isDeleted
		}
	}`, //

		cancelTaskattFile: `mutation($id: String, $type: Int) {
		cancelTaskattFile(id: $id, type: $type)
	}`, //

		addStage: `mutation($oldStageId: String) {
		addStage(oldStageId: $oldStageId)
	}`, // 返回新stage树

		changeStage: `mutation($newStageId: String) {
		changeStage(newStageId: $newStageId)
	}`, // 返回新stage树

		getStageList: `query($currentStageId: String) {
		getStageList(currentStageId: $currentStageId)
			{
			id
			pid
			projectId
			treeType
			masters
			{
				userId
				userName
			}
			status
			rate
			stageName
			finishTime
			dictStage
			indexs
		}
	}`, // 获取可以切换选择的list列表，只限设计阶段

		delStage: `mutation($id: String) {
		delStage(id: $id)
	}`, // 删除多余的Stage阶段只限设计阶段，且设计阶段不止一个时

		getCalendarProjectList: `query {
		getCalendarProjectList
			{
			id
			pid
			projectId
			treeType
			code
			name
			masters
			{
				userId
				userName
			}
			customer
			productType
			address
			description
			milepost
			builtArea
			totalCost
			builtType
			beginTime
			endTime
			constructionUnit
			constructionQualification
			partyaUnit
			unitQualification
			declarationAwards
			awardGrade
			buySoftware
			usageSituation
			background
			temporaryDecision
			temporaryManagerDesire
			temporaryRequirement
			temporaryBudgetStandard
			temporaryTotalAcceptability
			temporaryTotalRange
			temporaryBudget
			temporaryPriceDesire
			temporaryEstimatePrice
			temporaryManagersNumber
			temporaryWorkersNumber
			temporaryBeginTime
			temporaryEndTime
			temporaryBudgetEvaluation
			template
			currentTaskState
			currentProgress
			state
			stageId
			closeReason
			projectType
		}
	}`, // 日历项目列表

		getProjectStagesByIds: `query($yearMonth: String, $projectIds: [String]) {
		getProjectStagesByIds(yearMonth: $yearMonth, projectIds: $projectIds)
	}`, // 获取项目全部状态信息通过ids

		getPersonMonthTaskState: `query($yearMonth: String, $userId: String) {
		getPersonMonthTaskState(yearMonth: $yearMonth, userId: $userId)
			{
			id
			pid
			projectId
			treeType
			name
			masters
			{
				userId
				userName
			}
			userId
			endTime
			now
			rate
			delayType
			projectName
			projectType
			beginTime
		}
	}`, // 获取个人的单月任务情况

		getPersonScheduleResources: `query($ids: [String], $beginTime: Long, $endTime: Long) {
		getPersonScheduleResources(ids: $ids, beginTime: $beginTime, endTime: $endTime)
	}`, // 人员日程排期

		saveProjectAndOrderInfo: `mutation($project: InputProject, $orderinfo: InputOrderInfo) {
		saveProjectAndOrderInfo(project: $project, orderinfo: $orderinfo)
	}`, // 保存项目和订单信息

		getProjectInfoById: `query($projectId: String) {
		getProjectInfoById(projectId: $projectId)
		{
			id
			pid
			projectId
			treeType
			code
			name
			masters
			{
				userId
				userName
			}
			customer
			productType
			address
			description
			milepost
			builtArea
			totalCost
			builtType
			beginTime
			endTime
			constructionUnit
			constructionQualification
			partyaUnit
			unitQualification
			declarationAwards
			awardGrade
			buySoftware
			usageSituation
			background
			temporaryDecision
			temporaryManagerDesire
			temporaryRequirement
			temporaryBudgetStandard
			temporaryTotalAcceptability
			temporaryTotalRange
			temporaryBudget
			temporaryPriceDesire
			temporaryEstimatePrice
			temporaryManagersNumber
			temporaryWorkersNumber
			temporaryBeginTime
			temporaryEndTime
			temporaryBudgetEvaluation
			template
			currentTaskState
			currentProgress
			state
			stageId
			closeReason
			projectType
		}
	}`, // 根据id获取项目基本信息

		getAllStages: `query {
		getAllStages
			{
			id
			pid
			projectId
			treeType
			masters
			{
				userId
				userName
			}
			status
			rate
			stageName
			finishTime
			dictStage
			indexs
		}
	}`, // 获取全部stage字典数据

	}
}
export default Config;
