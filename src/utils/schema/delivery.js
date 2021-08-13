let Config = {
	// 交付流程
	  delivery: {
		addProject: `mutation($dictId: String) {
			addProject(dictId: $dictId)
			{
				id
				name
				parentId
				masterId
				masterName
				dictProjectId
				address
				peopleCount
				beginTime
				endTime
				mainPhoto
				isVisible
				state
				updateTime
				createTime
				isDefault
				createUserId
				stages
				{
					id
					name
					projectId
					orders
					createTime
					dictStageId
					tasks
						{
						id
						name
						stageId
						orders
						createTime
						isActive
						dictTaskId
						operatorId
						operatorName
						state
						beginTime
						endTime
						goal
						flowChartUrl
						taskType
					}
					iconUrl
				}
				projectScale
				createUserName
				number
				region
				longitude
				latitude
				buildArea
				roomComposition
				nameplateUrl
				boxCount
				bocdesignId
				purpose
				tempBuildBeginTime
				tempBuildEndTime
				companyName
				namePartyAShort
				namePlace
				nameProjectShort
				nameType
			}
		}`, // 返回的id为空为失败
	
		addChildProject: `mutation($parent: String, $name: String, $masterId: String) {
			addChildProject(parent: $parent, name: $name, masterId: $masterId)
			{
				id
				name
				parentId
				masterId
				masterName
				dictProjectId
				address
				peopleCount
				beginTime
				endTime
				mainPhoto
				isVisible
				state
				updateTime
				createTime
				isDefault
				createUserId
				stages
				{
					id
					name
					projectId
					orders
					createTime
					dictStageId
					tasks
						{
						id
						name
						stageId
						orders
						createTime
						isActive
						dictTaskId
						operatorId
						operatorName
						state
						beginTime
						endTime
						goal
						flowChartUrl
						taskType
					}
					iconUrl
				}
				projectScale
				createUserName
				number
				region
				longitude
				latitude
				buildArea
				roomComposition
				nameplateUrl
				boxCount
				bocdesignId
				purpose
				tempBuildBeginTime
				tempBuildEndTime
				companyName
				namePartyAShort
				namePlace
				nameProjectShort
				nameType
			}
		}`, // 返回子项目 id为空为失败
	
		updateProject: `mutation($p: InputProject) {
			updateProject(p: $p)
			{
				id
				name
				parentId
				masterId
				masterName
				dictProjectId
				address
				peopleCount
				beginTime
				endTime
				mainPhoto
				isVisible
				state
				updateTime
				createTime
				isDefault
				createUserId
				stages
				{
					id
					name
					projectId
					orders
					createTime
					dictStageId
					tasks
						{
						id
						name
						stageId
						orders
						createTime
						isActive
						dictTaskId
						operatorId
						operatorName
						state
						beginTime
						endTime
						goal
						flowChartUrl
						taskType
					}
					iconUrl
				}
				projectScale
				createUserName
				number
				region
				longitude
				latitude
				buildArea
				roomComposition
				nameplateUrl
				boxCount
				bocdesignId
				purpose
				tempBuildBeginTime
				tempBuildEndTime
				companyName
				namePartyAShort
				namePlace
				nameProjectShort
				nameType
			}
		}`, // 修改项目内容，如修改masterId，id为空为失败
	
		getProjectPageList: `query($text: String, $state: Int, $orderType: Int, $parentId: String, $pageIndex: Long, $pageSize: Long) {
			getProjectPageList(text: $text, state: $state, orderType: $orderType, parentId: $parentId, pageIndex: $pageIndex, pageSize: $pageSize)
			{
				body
				{
					id
					name
					parentId
					masterId
					masterName
					dictProjectId
					address
					peopleCount
					beginTime
					endTime
					mainPhoto
					isVisible
					state
					updateTime
					createTime
					isDefault
					createUserId
					stages
						{
						id
						name
						projectId
						orders
						createTime
						dictStageId
						tasks
								{
							id
							name
							stageId
							orders
							createTime
							isActive
							dictTaskId
							operatorId
							operatorName
							state
							beginTime
							endTime
							goal
							flowChartUrl
							taskType
						}
						iconUrl
					}
					projectScale
					createUserName
					number
					region
						longitude
					latitude
					buildArea
					roomComposition
					nameplateUrl
					boxCount
					bocdesignId
					purpose
					tempBuildBeginTime
					tempBuildEndTime
					companyName
					namePartyAShort
					namePlace
					nameProjectShort
					nameType
				}
				pageIndex
				pageSize
				totalCount
				totalSize
			}
		}`, // state 0 全部，1进行 中，5已暂停，10已完成 orderType 0时间倒序, 1是时间正序，2是状态正序，3状态倒序
	
		getProjectPageList2: `query($userId: String, $text: String, $state: Int, $orderType: Int, $parentId: String, $pageIndex: Long, $pageSize: Long) {
			getProjectPageList2(userId: $userId, text: $text, state: $state, orderType: $orderType, parentId: $parentId, pageIndex: $pageIndex, pageSize: $pageSize)
			{
				body
				{
					id
					name
					parentId
					masterId
					masterName
					dictProjectId
					address
					peopleCount
					beginTime
					endTime
					mainPhoto
					isVisible
					state
					updateTime
					createTime
					isDefault
					createUserId
					stages
						{
						id
						name
						projectId
						orders
						createTime
						dictStageId
						tasks
								{
							id
							name
							stageId
							orders
							createTime
							isActive
							dictTaskId
							operatorId
							operatorName
							state
							beginTime
							endTime
							goal
							flowChartUrl
							taskType
						}
						iconUrl
					}
					projectScale
					createUserName
					number
					region
						longitude
					latitude
					buildArea
					roomComposition
					nameplateUrl
					boxCount
					bocdesignId
					purpose
					tempBuildBeginTime
					tempBuildEndTime
					companyName
					namePartyAShort
					namePlace
					nameProjectShort
					nameType
				}
				pageIndex
				pageSize
				totalCount
				totalSize
			}
		}`, // state 0 全部，1进行 中，5已暂停，10已完成 orderType 0时间倒序, 1是时间正序，2是状态正序，3状态倒序
	
		getProjectById: `query($id: String) {
			getProjectById(id: $id)
			{
				id
				name
				parentId
				masterId
				masterName
				dictProjectId
				address
				peopleCount
				beginTime
				endTime
				mainPhoto
				isVisible
				state
				updateTime
				createTime
				isDefault
				createUserId
				stages
				{
					id
					name
					projectId
					orders
					createTime
					dictStageId
					tasks
						{
						id
						name
						stageId
						orders
						createTime
						isActive
						dictTaskId
						operatorId
						operatorName
						state
						beginTime
						endTime
						goal
						flowChartUrl
						taskType
					}
					iconUrl
				}
				projectScale
				createUserName
				number
				region
				longitude
				latitude
				buildArea
				roomComposition
				nameplateUrl
				boxCount
				bocdesignId
				purpose
				tempBuildBeginTime
				tempBuildEndTime
				companyName
				namePartyAShort
				namePlace
				nameProjectShort
				nameType
			}
		}`, // 
	
		getTaskById: `query($id: String) {
			getTaskById(id: $id)
			{
				id
				name
				stageId
				orders
				createTime
				isActive
				dictTaskId
				operatorId
				operatorName
				state
				beginTime
				endTime
				goal
				flowChartUrl
				taskType
			}
		}`, // 获取任务明细
	
		addDocument: `mutation($d: InputDocument) {
			addDocument(d: $d)
			{
				id
				taskId
				name
				ownerId
				ownerName
				fileSize
				createTime
				orders
				isVisible
				downloadCount
				fileUrl
				fileType
				category
			}
		}`, // 
	
		addDictDocument: `mutation($dd: InputDictDocument) {
			addDictDocument(dd: $dd)
			{
				id
				dictTaskId
				name
				ownerId
				ownerName
				fileSize
				createTime
				orders
				isVisible
				downloadCount
				fileUrl
				fileType
				category
			}
		}`, // 
	
		delProject: `mutation($id: String) {
			delProject(id: $id)
		}`, // 
	
		delDocument: `mutation($id: String) {
			delDocument(id: $id)
		}`, // 
	
		delDocumentByIds: `mutation($ids: [String]) {
			delDocumentByIds(ids: $ids)
		}`, // 
	
		delDictDocument: `mutation($id: String) {
			delDictDocument(id: $id)
		}`, // 
	
		updateDocument: `mutation($d: InputDocument) {
			updateDocument(d: $d)
			{
				id
				taskId
				name
				ownerId
				ownerName
				fileSize
				createTime
				orders
				isVisible
				downloadCount
				fileUrl
				fileType
				category
			}
		}`, // 
	
		updateDictDocument: `mutation($dd: InputDictDocument) {
			updateDictDocument(dd: $dd)
			{
				id
				dictTaskId
				name
				ownerId
				ownerName
				fileSize
				createTime
				orders
				isVisible
				downloadCount
				fileUrl
				fileType
				category
			}
		}`, // 
	
		getProjectDetail: `query($id: String) {
			getProjectDetail(id: $id)
			{
				id
				name
				parentId
				masterId
				masterName
				dictProjectId
				address
				peopleCount
				beginTime
				endTime
				mainPhoto
				isVisible
				state
				updateTime
				createTime
				isDefault
				createUserId
				stages
				{
					id
					name
					projectId
					orders
					createTime
					dictStageId
					tasks
						{
						id
						name
						stageId
						orders
						createTime
						isActive
						dictTaskId
						operatorId
						operatorName
						state
						beginTime
						endTime
						goal
						flowChartUrl
						taskType
					}
					iconUrl
				}
				projectScale
				createUserName
				number
				region
				longitude
				latitude
				buildArea
				roomComposition
				nameplateUrl
				boxCount
				bocdesignId
				purpose
				tempBuildBeginTime
				tempBuildEndTime
				companyName
				namePartyAShort
				namePlace
				nameProjectShort
				nameType
			}
		}`, // 
	
		getDocumentList: `query($taskId: String) {
			getDocumentList(taskId: $taskId)
				{
				id
				taskId
				name
				ownerId
				ownerName
				fileSize
				createTime
				orders
				isVisible
				downloadCount
				fileUrl
				fileType
				category
			}
		}`, // 
	
		getDictDocumentList: `query($taskId: String) {
			getDictDocumentList(taskId: $taskId)
				{
				id
				dictTaskId
				name
				ownerId
				ownerName
				fileSize
				createTime
				orders
				isVisible
				downloadCount
				fileUrl
				fileType
				category
			}
		}`, // 
	
		getDictProjectList: `query {
			getDictProjectList
				{
				id
				name
				imgUlr
				isVisible
				ownerId
				ownerName
				createTime
				orders
				dictStages
				{
					id
					name
					dictProjectId
					orders
					createTime
					iconUrl
					dictTasks
						{
						id
						name
						dictStageId
						orders
						createTime
						isActive
						goal
						flowChartUrl
						taskType
					}
				}
			}
		}`, // 
	
		updateTask: `mutation($task: InputTask) {
			updateTask(task: $task)
			{
				id
				name
				stageId
				orders
				createTime
				isActive
				dictTaskId
				operatorId
				operatorName
				state
				beginTime
				endTime
				goal
				flowChartUrl
				taskType
			}
		}`, // 
	
		getPageDocument: `query($text: String, $projectId: String, $category: Int, $pageIndex: Long, $pageSize: Long) {
			getPageDocument(text: $text, projectId: $projectId, category: $category, pageIndex: $pageIndex, pageSize: $pageSize)
			{
				body
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				pageIndex
				pageSize
				totalCount
				totalSize
			}
		}`, // category 0 全部1文件2照片3视频
	
		setDefaultProject: `mutation($projectId: String) {
			setDefaultProject(projectId: $projectId)
		}`, // 设置默认项目
	
		getDefaultProjectId: `query {
			getDefaultProjectId
		}`, // 获取默认项目id
	
		changeProjectListState: `mutation($ids: [String], $state: Int) {
			changeProjectListState(ids: $ids, state: $state)
		}`, // 批量修改项目状态
	
		delProjectByIds: `mutation($ids: [String]) {
			delProjectByIds(ids: $ids)
		}`, // 批量删除项目
	
		reStartTaskStep: `mutation($taskId: String, $index: Int) {
			reStartTaskStep(taskId: $taskId, index: $index)
			{
				id
				taskId
				state1
				state2
				state3
				state4
				state5
			}
		}`, // 重新任务步骤
	
		overTaskStep: `mutation($taskId: String, $index: Int) {
			overTaskStep(taskId: $taskId, index: $index)
			{
				id
				taskId
				state1
				state2
				state3
				state4
				state5
			}
		}`, // index=1-5 5个步骤的完成
	
		changeTaskStepState: `mutation($taskId: String, $index: Int, $state: Int) {
			changeTaskStepState(taskId: $taskId, index: $index, state: $state)
			{
				id
				taskId
				state1
				state2
				state3
				state4
				state5
			}
		}`, // 更新状态index=1-5 5个步骤
	
		getTaskStepState: `query($taskId: String) {
			getTaskStepState(taskId: $taskId)
			{
				id
				taskId
				state1
				state2
				state3
				state4
				state5
			}
		}`, // 返回任务步骤状态
	
		getDictOption: `query($code: String) {
			getDictOption(code: $code)
				{
				id
				groups
				orders
				code
				name
				isVisible
			}
		}`, // 根据code返回字典列表
	
		getDocUrl: `query($id: String, $operateId: String) {
			getDocUrl(id: $id, operateId: $operateId)
		}`, // 根据事务id，每5秒调用一下，返回值为文档doc
	
		getDefaultManagers: `query($projectId: String) {
			getDefaultManagers(projectId: $projectId)
				{
				id
				name
				phone
				level
				orders
				station
				constructionId
				isSelected
				isEdit
			}
		}`, // 获取默认联系人
	
		getConstruction: `query($projectId: String) {
			getConstruction(projectId: $projectId)
			{
				id
				projectId
				taskId
				projectName
				projectType
				buildScale
				constructionPeriod
				constructionUnit
				planUrl
				createTime
				createUserId
				saveType
				constructionManagers
				{
					id
					name
					phone
					level
					orders
					station
					constructionId
					isSelected
					isEdit
				}
				buildUnit
				projectUrl
			}
		}`, // 
	
		saveConstruction: `mutation($c: InputConstruction) {
			saveConstruction(c: $c)
			{
				id
				projectId
				taskId
				projectName
				projectType
				buildScale
				constructionPeriod
				constructionUnit
				planUrl
				createTime
				createUserId
				saveType
				constructionManagers
				{
					id
					name
					phone
					level
					orders
					station
					constructionId
					isSelected
					isEdit
				}
				buildUnit
				projectUrl
			}
		}`, // 保存construction
	
		sendConstrctionEmail: `mutation($c: InputConstruction, $emails: [String], $operateId: String) {
			sendConstrctionEmail(c: $c, emails: $emails, operateId: $operateId)
		}`, // 发邮件
	
		saveConstrctionFile: `mutation($c: InputConstruction, $operateId: String) {
			saveConstrctionFile(c: $c, operateId: $operateId)
		}`, // 下载
	
		getDocumentListByCategory: `query($taskId: String, $category: Int) {
			getDocumentListByCategory(taskId: $taskId, category: $category)
				{
				id
				taskId
				name
				ownerId
				ownerName
				fileSize
				createTime
				orders
				isVisible
				downloadCount
				fileUrl
				fileType
				category
			}
		}`, // 根据cateogry获取上传文件0全部，1文件，2照片，3视频， 10 照片和视频
	
		getDocumentListByProjectId: `query($projectId: String, $pageIndex: Long, $pageSize: Long) {
			getDocumentListByProjectId(projectId: $projectId, pageIndex: $pageIndex, pageSize: $pageSize)
			{
				body
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				pageIndex
				pageSize
				totalCount
				totalSize
			}
		}`, // 项目id获取图片
	
		gerDefaultEmailUsers: `query($taskId: String, $type: String, $sendType: Int) {
			gerDefaultEmailUsers(taskId: $taskId, type: $type, sendType: $sendType)
				{
				id
				userName
				email
			}
		}`, // type=startmeeting, sendType 0是全部1是to2是抄送
	
		getProjectTypeList: `query {
			getProjectTypeList
				{
				id
				name
				orders
			}
		}`, // 获取项目类型列表
	
		getTempleteDocPageList: `query($text: String, $pageIndex: Long, $pageSize: Long) {
			getTempleteDocPageList(text: $text, pageIndex: $pageIndex, pageSize: $pageSize)
			{
				body
				{
					id
					name
					defaultImageUrl
					fileUrl
					fileSize
					downloadCount
					createTime
					ownerId
					ownerName
					type
					orders
					isVisible
				}
				pageIndex
				pageSize
				totalCount
				totalSize
			}
		}`, // 模板列表
	
		addTempleteDoc: `mutation($td: InputTempleteDoc) {
			addTempleteDoc(td: $td)
			{
				id
				name
				defaultImageUrl
				fileUrl
				fileSize
				downloadCount
				createTime
				ownerId
				ownerName
				type
				orders
				isVisible
			}
		}`, // 
	
		delTempleteDoc: `mutation($id: String) {
			delTempleteDoc(id: $id)
		}`, // 
	
		updateTempleteDoc: `mutation($td: InputTempleteDoc) {
			updateTempleteDoc(td: $td)
			{
				id
				name
				defaultImageUrl
				fileUrl
				fileSize
				downloadCount
				createTime
				ownerId
				ownerName
				type
				orders
				isVisible
			}
		}`, // 
	
		addTempleteDocs: `mutation($td: [InputTempleteDoc]) {
			addTempleteDocs(td: $td)
				{
				id
				name
				defaultImageUrl
				fileUrl
				fileSize
				downloadCount
				createTime
				ownerId
				ownerName
				type
				orders
				isVisible
			}
		}`, // 列表保存
	
		saveDaily: `mutation($d: InputDaily, $saveType: Int) {
			saveDaily(d: $d, saveType: $saveType)
			{
				id
				date
				title
				progressState
				weather
				windPower
				overallDescription
				contentRemarks
				workersCount
				material
				summary
				tomorrowPlanRemarks
				tomorrowWeather
				tomorrowWindPower
				tomorrowMaterial
				assistance
				saveType
				createTime
				likeCount
				commentCount
				readCount
				contents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				tomorrowContents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				projectId
				comments
				{
					id
					pid
					dailyId
					userId
					userName
					parentUserId
					parentUserName
					text
					createTime
				}
				likeUsers
				{
					id
					dailyId
					userId
					userName
					createTime
				}
				dailyDocuments
				{
					id
					dailyId
					name
					ownerId
					ownerName
					fileSize
					fileUrl
					createTime
					orders
					fileType
					category
					isVisible
				}
				createUser
				createUserName
				noArriveMaterials
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				materialInfluence
				tomorrowPlanArriveMaterial
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				summaryShare
				boxCount
				purpose
				planOverTime
				countdownDay
				dailyProjectPhotos
				{
					id
					projectId
					orders
					place
					imageDocs
						{
						id
						taskId
						name
						ownerId
						ownerName
						fileSize
						createTime
						orders
						isVisible
						downloadCount
						fileUrl
						fileType
						category
					}
					createTime
				}
				arrivalCount
				installCount
				onWayCount
				distributionJson
				driverName
				driverPhone
				arrivalMaterialText
				enterMaterial
				tomorrowEnterMaterial
			}
		}`, // 返回daily
	
		getDailyListPage: `query($text: String, $projectId: String, $type: Int, $pageIndex: Long, $pageSize: Long) {
			getDailyListPage(text: $text, projectId: $projectId, type: $type, pageIndex: $pageIndex, pageSize: $pageSize)
			{
				body
				{
					id
					date
					title
					progressState
					weather
					windPower
					overallDescription
					contentRemarks
					workersCount
					material
					summary
					tomorrowPlanRemarks
					tomorrowWeather
					tomorrowWindPower
					tomorrowMaterial
					assistance
					saveType
					createTime
					likeCount
					commentCount
					readCount
					contents
						{
						id
						number
						position
						productCategory
						productDetail
						specifications
						unit
						palnProgress
						actualProgress
						type
						positionId
						productCategoryId
						productDetailId
						actualBeginTime
						planBeginTime
						planEndTime
					}
					tomorrowContents
						{
						id
						number
						position
						productCategory
						productDetail
						specifications
						unit
						palnProgress
						actualProgress
						type
						positionId
						productCategoryId
						productDetailId
						actualBeginTime
						planBeginTime
						planEndTime
					}
					projectId
					comments
						{
						id
						pid
						dailyId
						userId
						userName
						parentUserId
						parentUserName
						text
						createTime
					}
					likeUsers
						{
						id
						dailyId
						userId
						userName
						createTime
					}
					dailyDocuments
						{
						id
						dailyId
						name
						ownerId
						ownerName
						fileSize
						fileUrl
						createTime
						orders
						fileType
						category
						isVisible
					}
					createUser
					createUserName
					noArriveMaterials
						{
						id
						dailyId
						projectId
						materialId
						planBeginTime
						planEndTime
						tomorrowProgress
						name
						showName
						number
						position
						productCategory
						productDetail
						positionId
						productCategoryId
						productDetailId
					}
					materialInfluence
					tomorrowPlanArriveMaterial
						{
						id
						dailyId
						projectId
						materialId
						planBeginTime
						planEndTime
						tomorrowProgress
						name
						showName
						number
						position
						productCategory
						productDetail
						positionId
						productCategoryId
						productDetailId
					}
					summaryShare
					boxCount
					purpose
					planOverTime
					countdownDay
					dailyProjectPhotos
						{
						id
						projectId
						orders
						place
						imageDocs
								{
							id
							taskId
							name
							ownerId
							ownerName
							fileSize
							createTime
							orders
							isVisible
							downloadCount
							fileUrl
							fileType
							category
						}
						createTime
					}
					arrivalCount
					installCount
					onWayCount
					distributionJson
					driverName
					driverPhone
					arrivalMaterialText
					enterMaterial
					tomorrowEnterMaterial
				}
				pageIndex
				pageSize
				totalCount
				totalSize
			}
		}`, // 分页type=0正常type=1草稿箱
	
		addOrDelLike: `mutation($dailyId: String) {
			addOrDelLike(dailyId: $dailyId)
		}`, // 点赞取消点赞
	
		addDailyComment: `mutation($dc: InputDailyComment) {
			addDailyComment(dc: $dc)
			{
				id
				pid
				dailyId
				userId
				userName
				parentUserId
				parentUserName
				text
				createTime
			}
		}`, // 评论
	
		delDaily: `mutation($id: String) {
			delDaily(id: $id)
		}`, // 
	
		delDailyComment: `mutation($id: String) {
			delDailyComment(id: $id)
		}`, // 
	
		getDailyById: `query($id: String) {
			getDailyById(id: $id)
			{
				id
				date
				title
				progressState
				weather
				windPower
				overallDescription
				contentRemarks
				workersCount
				material
				summary
				tomorrowPlanRemarks
				tomorrowWeather
				tomorrowWindPower
				tomorrowMaterial
				assistance
				saveType
				createTime
				likeCount
				commentCount
				readCount
				contents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				tomorrowContents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				projectId
				comments
				{
					id
					pid
					dailyId
					userId
					userName
					parentUserId
					parentUserName
					text
					createTime
				}
				likeUsers
				{
					id
					dailyId
					userId
					userName
					createTime
				}
				dailyDocuments
				{
					id
					dailyId
					name
					ownerId
					ownerName
					fileSize
					fileUrl
					createTime
					orders
					fileType
					category
					isVisible
				}
				createUser
				createUserName
				noArriveMaterials
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				materialInfluence
				tomorrowPlanArriveMaterial
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				summaryShare
				boxCount
				purpose
				planOverTime
				countdownDay
				dailyProjectPhotos
				{
					id
					projectId
					orders
					place
					imageDocs
						{
						id
						taskId
						name
						ownerId
						ownerName
						fileSize
						createTime
						orders
						isVisible
						downloadCount
						fileUrl
						fileType
						category
					}
					createTime
				}
				arrivalCount
				installCount
				onWayCount
				distributionJson
				driverName
				driverPhone
				arrivalMaterialText
				enterMaterial
				tomorrowEnterMaterial
			}
		}`, // 获取daily
	
		getDailyByProjectAndDate: `query($projectId: String, $date: Long) {
			getDailyByProjectAndDate(projectId: $projectId, date: $date)
			{
				id
				date
				title
				progressState
				weather
				windPower
				overallDescription
				contentRemarks
				workersCount
				material
				summary
				tomorrowPlanRemarks
				tomorrowWeather
				tomorrowWindPower
				tomorrowMaterial
				assistance
				saveType
				createTime
				likeCount
				commentCount
				readCount
				contents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				tomorrowContents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				projectId
				comments
				{
					id
					pid
					dailyId
					userId
					userName
					parentUserId
					parentUserName
					text
					createTime
				}
				likeUsers
				{
					id
					dailyId
					userId
					userName
					createTime
				}
				dailyDocuments
				{
					id
					dailyId
					name
					ownerId
					ownerName
					fileSize
					fileUrl
					createTime
					orders
					fileType
					category
					isVisible
				}
				createUser
				createUserName
				noArriveMaterials
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				materialInfluence
				tomorrowPlanArriveMaterial
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				summaryShare
				boxCount
				purpose
				planOverTime
				countdownDay
				dailyProjectPhotos
				{
					id
					projectId
					orders
					place
					imageDocs
						{
						id
						taskId
						name
						ownerId
						ownerName
						fileSize
						createTime
						orders
						isVisible
						downloadCount
						fileUrl
						fileType
						category
					}
					createTime
				}
				arrivalCount
				installCount
				onWayCount
				distributionJson
				driverName
				driverPhone
				arrivalMaterialText
				enterMaterial
				tomorrowEnterMaterial
			}
		}`, // 获取daily通过项目id和日期
	
		getDailyObjList: `query($dailyId: String, $type: Int) {
			getDailyObjList(dailyId: $dailyId, type: $type)
				{
				id
				name
			}
		}`, // 返回id,name对象, type=0 是部位，dailyId为projectId，1是产品类别，dailyId是positionId，2不要用这个接口
	
		getDailyContentDetailList: `query($dailyId: String, $type: Int) {
			getDailyContentDetailList(dailyId: $dailyId, type: $type)
				{
				id
				number
				position
				productCategory
				productDetail
				specifications
				unit
				palnProgress
				actualProgress
				type
				positionId
				productCategoryId
				productDetailId
				actualBeginTime
				planBeginTime
				planEndTime
			}
		}`, // 下拉获取明细，type=0，今日，type=1明日
	
		getDailyTomorrowMaterial: `query($categoryId: String) {
			getDailyTomorrowMaterial(categoryId: $categoryId)
				{
				id
				dailyId
				projectId
				materialId
				planBeginTime
				planEndTime
				tomorrowProgress
				name
				showName
				number
				position
				productCategory
				productDetail
				positionId
				productCategoryId
				productDetailId
			}
		}`, // 获取明天进场材料列表
	
		getDailyMaterialList: `mutation($dcs: [InputDailyContent], $dailyId: String) {
			getDailyMaterialList(dcs: $dcs, dailyId: $dailyId)
				{
				id
				dailyId
				projectId
				materialId
				planBeginTime
				planEndTime
				tomorrowProgress
				name
				showName
				number
				position
				productCategory
				productDetail
				positionId
				productCategoryId
				productDetailId
			}
		}`, // 获取未进场的材料列表，根据dcs筛选
	
		delTomorrowMaterial: `mutation($id: String) {
			delTomorrowMaterial(id: $id)
		}`, // 删除明日进场材料
	
		getDailyEmailSetting: `query($projectId: String) {
			getDailyEmailSetting(projectId: $projectId)
			{
				id
				projectId
				otherCompanyPeople
				{
					id
					userName
					email
				}
				customer
				{
					id
					userName
					email
				}
				teamPeople
				{
					id
					userName
					email
				}
				sendType
			}
		}`, // 获取日报邮件设置
	
		saveDailyEmailSetting: `mutation($des: InputDailyEmailSetting) {
			saveDailyEmailSetting(des: $des)
			{
				id
				projectId
				otherCompanyPeople
				{
					id
					userName
					email
				}
				customer
				{
					id
					userName
					email
				}
				teamPeople
				{
					id
					userName
					email
				}
				sendType
			}
		}`, // 保存日报邮件设置
	
		getDailyInfo: `mutation($projectId: String, $dateTime: Long) {
			getDailyInfo(projectId: $projectId, dateTime: $dateTime)
			{
				id
				date
				title
				progressState
				weather
				windPower
				overallDescription
				contentRemarks
				workersCount
				material
				summary
				tomorrowPlanRemarks
				tomorrowWeather
				tomorrowWindPower
				tomorrowMaterial
				assistance
				saveType
				createTime
				likeCount
				commentCount
				readCount
				contents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				tomorrowContents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				projectId
				comments
				{
					id
					pid
					dailyId
					userId
					userName
					parentUserId
					parentUserName
					text
					createTime
				}
				likeUsers
				{
					id
					dailyId
					userId
					userName
					createTime
				}
				dailyDocuments
				{
					id
					dailyId
					name
					ownerId
					ownerName
					fileSize
					fileUrl
					createTime
					orders
					fileType
					category
					isVisible
				}
				createUser
				createUserName
				noArriveMaterials
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				materialInfluence
				tomorrowPlanArriveMaterial
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				summaryShare
				boxCount
				purpose
				planOverTime
				countdownDay
				dailyProjectPhotos
				{
					id
					projectId
					orders
					place
					imageDocs
						{
						id
						taskId
						name
						ownerId
						ownerName
						fileSize
						createTime
						orders
						isVisible
						downloadCount
						fileUrl
						fileType
						category
					}
					createTime
				}
				arrivalCount
				installCount
				onWayCount
				distributionJson
				driverName
				driverPhone
				arrivalMaterialText
				enterMaterial
				tomorrowEnterMaterial
			}
		}`, // 新增时返回daily的顶部显示数据
	
		getDetailWorkByPostionId: `query($positionId: String, $dateTime: Long) {
			getDetailWorkByPostionId(positionId: $positionId, dateTime: $dateTime)
				{
				id
				number
				position
				productCategory
				productDetail
				specifications
				unit
				palnProgress
				actualProgress
				type
				positionId
				productCategoryId
				productDetailId
				actualBeginTime
				planBeginTime
				planEndTime
			}
		}`, // 根据部位返回施工明细下拉列表的任务id
	
		getTomorrowContents: `query($projectId: String, $contents: [InputDailyContent], $dateTime: Long) {
			getTomorrowContents(projectId: $projectId, contents: $contents, dateTime: $dateTime)
				{
				id
				number
				position
				productCategory
				productDetail
				specifications
				unit
				palnProgress
				actualProgress
				type
				positionId
				productCategoryId
				productDetailId
				actualBeginTime
				planBeginTime
				planEndTime
			}
		}`, // 根据今日计划完成情况，反算出明日施工计划进度
	
		reStartBuildTeam: `mutation($taskId: String, $index: Int) {
			reStartBuildTeam(taskId: $taskId, index: $index)
			{
				id
				taskId
				state1
				state2
				state3
				state4
			}
		}`, // 重新启动组建项目团队index=1-4 4个阶段
	
		overBuildTeamStep: `mutation($taskId: String, $index: Int) {
			overBuildTeamStep(taskId: $taskId, index: $index)
			{
				id
				taskId
				state1
				state2
				state3
				state4
			}
		}`, // index=1-4 4个阶段的完成
	
		changeBuildTeamStepState: `mutation($taskId: String, $index: Int, $state: Int) {
			changeBuildTeamStepState(taskId: $taskId, index: $index, state: $state)
			{
				id
				taskId
				state1
				state2
				state3
				state4
			}
		}`, // 更新状态index=1-4 4个阶段
	
		saveBuildTeamOneItem: `mutation($btoi: InputBuildTeamOneItem) {
			saveBuildTeamOneItem(btoi: $btoi)
			{
				id
				buildTeamOne
				orders
				canDel
				userName
				userId
				phone
				email
				position
				duty
				positionLevel
			}
		}`, // 保存表1单条
	
		delBuildTeamItemOne: `mutation($id: String) {
			delBuildTeamItemOne(id: $id)
		}`, // 删除表1明细
	
		delBuildTeamOneItemByIds: `mutation($ids: [String]) {
			delBuildTeamOneItemByIds(ids: $ids)
		}`, // 删除表1明细多列
	
		saveBuildTeamTwoMain: `mutation($bttm: InputBuildTeamTwoMain) {
			saveBuildTeamTwoMain(bttm: $bttm)
			{
				id
				buildTeamTwo
				progressTargetTimeSure
				progressTargetBaseTime
				progressTargetNostandardDay
				progressTargetOverDay
				progressPromiseTimeSure
				progressPromiseBaseTime
				progressPromiseNostandardDay
				progressPromiseOverDay
				qualityTargetCheckCount
				qualityPromiseAccidentCount
				profitTarget
				profitTargetRate
				costHave
				costTargetPayDay
				markingHave
				markingTargetStandard
				markingTargetSatisfied
				safeHave
				safeTargetAccidentCount
				safeTargetTreacherousCount
				safePromiseAccidentCount
				safePromiseTreacherousCount
				costTargetOne
				costTargetTwo
				costTargetThree
				costTargetFour
				costTargetThree2
				costTargetFour2
				progressTargetNostandardTime
				progressTargetOverTime
				progressPromiseNostandardTime
				progressPromiseOverTime
			}
		}`, // 保存表2主
	
		saveBuildTeamTwoItem: `mutation($btti: InputBuildTeamTwoItem) {
			saveBuildTeamTwoItem(btti: $btti)
			{
				id
				buildTeamTwo
				orders
				item
				targetValue
				promiseValue
			}
		}`, // 保存表2明细
	
		delBuildTeamTwoItem: `mutation($id: String) {
			delBuildTeamTwoItem(id: $id)
		}`, // 删除表2明细
	
		savePolicyDecision: `mutation($pd: InputPolicyDecision) {
			savePolicyDecision(pd: $pd)
			{
				id
				buildTeamThree
				level
				userId
				userName
			}
		}`, // 保存决策人，taskid不能为空，应该不会用到此接口
	
		savePolicyDecisionByLevel: `mutation($userInfos: [InputUserInfo], $taskId: String, $level: Int) {
			savePolicyDecisionByLevel(userInfos: $userInfos, taskId: $taskId, level: $level)
				{
				id
				buildTeamThree
				level
				userId
				userName
			}
		}`, // 保存某个等级的决策人
	
		delPolicyDecision: `mutation($id: String) {
			delPolicyDecision(id: $id)
		}`, // 删除某个决策人，应该不会用到此接口
	
		saveBuildTeamThreeItem: `mutation($btti: InputBuildTeamThreeItem) {
			saveBuildTeamThreeItem(btti: $btti)
			{
				id
				buildTeamThree
				orders
				item
				level
			}
		}`, // 保存表3明细项
	
		delBuildTeamThreeItem: `mutation($id: String) {
			delBuildTeamThreeItem(id: $id)
		}`, // 删除表3明细项
	
		saveBuildTeamFourItem: `mutation($btfi: InputBuildTeamFourItem) {
			saveBuildTeamFourItem(btfi: $btfi)
			{
				id
				buildTeamFour
				orders
				rule
				ruleExplain
				used
				frequency
				userTeamId
				userTeamName
				remark
			}
		}`, // 保存表4明细项
	
		getBuildTeamState: `query($taskId: String) {
			getBuildTeamState(taskId: $taskId)
			{
				id
				taskId
				state1
				state2
				state3
				state4
			}
		}`, // 返回组建项目团队状态
	
		getBuildTeamOneItemList: `query($taskId: String) {
			getBuildTeamOneItemList(taskId: $taskId)
				{
				id
				buildTeamOne
				orders
				canDel
				userName
				userId
				phone
				email
				position
				duty
				positionLevel
			}
		}`, // 获取表1明细列
	
		getBuildTeamTwoMain: `query($taskId: String) {
			getBuildTeamTwoMain(taskId: $taskId)
			{
				id
				buildTeamTwo
				progressTargetTimeSure
				progressTargetBaseTime
				progressTargetNostandardDay
				progressTargetOverDay
				progressPromiseTimeSure
				progressPromiseBaseTime
				progressPromiseNostandardDay
				progressPromiseOverDay
				qualityTargetCheckCount
				qualityPromiseAccidentCount
				profitTarget
				profitTargetRate
				costHave
				costTargetPayDay
				markingHave
				markingTargetStandard
				markingTargetSatisfied
				safeHave
				safeTargetAccidentCount
				safeTargetTreacherousCount
				safePromiseAccidentCount
				safePromiseTreacherousCount
				costTargetOne
				costTargetTwo
				costTargetThree
				costTargetFour
				costTargetThree2
				costTargetFour2
				progressTargetNostandardTime
				progressTargetOverTime
				progressPromiseNostandardTime
				progressPromiseOverTime
			}
		}`, // 获取表2主
	
		getBuildTeamTwoItemList: `query($taskId: String) {
			getBuildTeamTwoItemList(taskId: $taskId)
				{
				id
				buildTeamTwo
				orders
				item
				targetValue
				promiseValue
			}
		}`, // 获取表2明细列
	
		getBuildTeamThreeItemList: `query($taskId: String) {
			getBuildTeamThreeItemList(taskId: $taskId)
				{
				id
				buildTeamThree
				orders
				item
				level
			}
		}`, // 获取表3明细列
	
		getBuildTeamFourItemList: `query($taskId: String) {
			getBuildTeamFourItemList(taskId: $taskId)
				{
				id
				buildTeamFour
				orders
				rule
				ruleExplain
				used
				frequency
				userTeamId
				userTeamName
				remark
			}
		}`, // 获取表4明细列
	
		getPolicyDecisionList: `query($taskId: String, $level: Int) {
			getPolicyDecisionList(taskId: $taskId, level: $level)
				{
				id
				buildTeamThree
				level
				userId
				userName
			}
		}`, // 获取责任人列表
	
		getBuildTeamOneItemListByProjectId: `query($projectId: String) {
			getBuildTeamOneItemListByProjectId(projectId: $projectId)
				{
				id
				buildTeamOne
				orders
				canDel
				userName
				userId
				phone
				email
				position
				duty
				positionLevel
			}
		}`, // 根据项目id获取团队成员
	
		getBuildTeamFourItemListByProjectId: `query($projectId: String) {
			getBuildTeamFourItemListByProjectId(projectId: $projectId)
				{
				id
				buildTeamFour
				orders
				rule
				ruleExplain
				used
				frequency
				userTeamId
				userTeamName
				remark
			}
		}`, // 根据项目id获取团队沟通机制
	
		getBuildTeamTwoMainByProjectId: `query($projectId: String) {
			getBuildTeamTwoMainByProjectId(projectId: $projectId)
			{
				id
				buildTeamTwo
				progressTargetTimeSure
				progressTargetBaseTime
				progressTargetNostandardDay
				progressTargetOverDay
				progressPromiseTimeSure
				progressPromiseBaseTime
				progressPromiseNostandardDay
				progressPromiseOverDay
				qualityTargetCheckCount
				qualityPromiseAccidentCount
				profitTarget
				profitTargetRate
				costHave
				costTargetPayDay
				markingHave
				markingTargetStandard
				markingTargetSatisfied
				safeHave
				safeTargetAccidentCount
				safeTargetTreacherousCount
				safePromiseAccidentCount
				safePromiseTreacherousCount
				costTargetOne
				costTargetTwo
				costTargetThree
				costTargetFour
				costTargetThree2
				costTargetFour2
				progressTargetNostandardTime
				progressTargetOverTime
				progressPromiseNostandardTime
				progressPromiseOverTime
			}
		}`, // 用于项目策划书2目标管理
	
		reStartHandover: `mutation($taskId: String, $index: Int) {
			reStartHandover(taskId: $taskId, index: $index)
			{
				id
				taskId
				state1
				state2
				state3
			}
		}`, // 重新启动组建项目团队
	
		overHandoverStep: `mutation($taskId: String, $index: Int) {
			overHandoverStep(taskId: $taskId, index: $index)
			{
				id
				taskId
				state1
				state2
				state3
			}
		}`, // index=1-3 3个阶段的完成
	
		changeHandoverStepState: `mutation($taskId: String, $index: Int, $state: Int) {
			changeHandoverStepState(taskId: $taskId, index: $index, state: $state)
			{
				id
				taskId
				state1
				state2
				state3
			}
		}`, // 更新状态index=1-3 3个阶段
	
		saveHandoverOne: `mutation($ho: InputHandoverOne) {
			saveHandoverOne(ho: $ho)
			{
				id
				taskId
				background
				significance
				contractSigning
				designSigning
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
			}
		}`, // 保存表1
	
		saveHandoverTwo: `mutation($ho: InputHandoverTwo) {
			saveHandoverTwo(ho: $ho)
			{
				id
				taskId
				cooperations
				centralized
				centralizeCompany
				glodonRelationship
				bocspaceRelationship
				customerExpectations
				promise
				deliverRange
				deliverNode
				requirement
				riskAdvice
				remark
				companyName
				requirementBeginTime
				requirementEndTime
				contractMoney
				contractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
				purpose
				boxType
				boxMoney
				turnoverCount
				companyId
			}
		}`, // 保存表2
	
		saveHandoverThree: `mutation($ho: InputHandoverThree) {
			saveHandoverThree(ho: $ho)
			{
				id
				taskId
				productType
				priceSensitivity
				budget
				managerCount
				workerCount
				expectedDesignTime
				plannedArrivalTime
				basicCondition
				powerCondition
				remark
				bodyType
				developers
				prize
				areaRage
				boxCount
			}
		}`, // 保存表3
	
		getHandoverOne: `query($taskId: String) {
			getHandoverOne(taskId: $taskId)
			{
				id
				taskId
				background
				significance
				contractSigning
				designSigning
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
			}
		}`, // 获取表1
	
		getHandoverTwo: `query($taskId: String) {
			getHandoverTwo(taskId: $taskId)
			{
				id
				taskId
				cooperations
				centralized
				centralizeCompany
				glodonRelationship
				bocspaceRelationship
				customerExpectations
				promise
				deliverRange
				deliverNode
				requirement
				riskAdvice
				remark
				companyName
				requirementBeginTime
				requirementEndTime
				contractMoney
				contractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
				purpose
				boxType
				boxMoney
				turnoverCount
				companyId
			}
		}`, // 获取表2
	
		getHandoverThree: `query($taskId: String) {
			getHandoverThree(taskId: $taskId)
			{
				id
				taskId
				productType
				priceSensitivity
				budget
				managerCount
				workerCount
				expectedDesignTime
				plannedArrivalTime
				basicCondition
				powerCondition
				remark
				bodyType
				developers
				prize
				areaRage
				boxCount
			}
		}`, // 获取表3
	
		getHandoverState: `query($taskId: String) {
			getHandoverState(taskId: $taskId)
			{
				id
				taskId
				state1
				state2
				state3
			}
		}`, // 获取状态
	
		sendStartMeetingEmail: `query($ho: InputHandoverOne, $emails: [String], $userIds: [String], $ccEmails: [String], $ccUserIds: [String]) {
			sendStartMeetingEmail(ho: $ho, emails: $emails, userIds: $userIds, ccEmails: $ccEmails, ccUserIds: $ccUserIds)
		}`, // 启动会发送邮件
	
		saveStartMeetingFile: `query($ho: InputHandoverOne) {
			saveStartMeetingFile(ho: $ho)
		}`, // 下载启动会ppt
	
		getSupplierContractListByProjectId: `query($id: String) {
			getSupplierContractListByProjectId(id: $id)
				{
				id
				type
				taskId
				supplierId
				supplierTwoId
				position
				positionId
				categoryType
				categoryTypeId
				productDetail
				productDetailId
				units
				count
				prize
				total
				remarks
				specification
				bocdesignId
				bocdesignItemId
				parentId
				orders
			}
		}`, // 根据id获取合同清单列表
	
		getEnclosureList: `query($taskId: String, $indexs: Int) {
			getEnclosureList(taskId: $taskId, indexs: $indexs)
				{
				id
				taskId
				name
				indexs
				orders
				canDel
				enclosureItems
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				templates
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				cases
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				isMust
				itemId
			}
		}`, // 获取新的附件列表
	
		saveEnclosureMain: `mutation($em: InputEnclosureMain, $taskId: String, $indexs: Int) {
			saveEnclosureMain(em: $em, taskId: $taskId, indexs: $indexs)
			{
				id
				taskId
				name
				indexs
				orders
				canDel
				enclosureItems
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				templates
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				cases
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				isMust
				itemId
			}
		}`, // 保存附件
	
		delEnclosureMain: `mutation($id: String) {
			delEnclosureMain(id: $id)
		}`, // 删除附件
	
		saveEnclosureItem: `mutation($e: InputEnclosureItem, $mainId: String) {
			saveEnclosureItem(e: $e, mainId: $mainId)
			{
				id
				mainId
				name
				ownerId
				ownerName
				fileSize
				createTime
				orders
				isVisible
				downloadCount
				fileUrl
				fileType
				category
			}
		}`, // 保存附件明细
	
		saveEnclosureItemList: `mutation($es: [InputEnclosureItem], $mainId: String) {
			saveEnclosureItemList(es: $es, mainId: $mainId)
				{
				id
				mainId
				name
				ownerId
				ownerName
				fileSize
				createTime
				orders
				isVisible
				downloadCount
				fileUrl
				fileType
				category
			}
		}`, // 保存列表明细
	
		delEnclosureItem: `mutation($id: String) {
			delEnclosureItem(id: $id)
		}`, // 删除明细
	
		getEnclosureListByItemId: `query($taskId: String, $indexs: Int, $itemId: String) {
			getEnclosureListByItemId(taskId: $taskId, indexs: $indexs, itemId: $itemId)
				{
				id
				taskId
				name
				indexs
				orders
				canDel
				enclosureItems
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				templates
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				cases
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				isMust
				itemId
			}
		}`, // 带item的用此接口
	
		getOnlyShowEnclosureListByTaskIdAndIndex: `query($taskId: String, $index: Int) {
			getOnlyShowEnclosureListByTaskIdAndIndex(taskId: $taskId, index: $index)
				{
				id
				taskId
				name
				indexs
				orders
				canDel
				enclosureItems
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				templates
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				cases
				{
					id
					mainId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				isMust
				itemId
			}
		}`, // 获取只展示其他任务项的附件
	
		getDocumentDownloadUrl: `query($id: String) {
			getDocumentDownloadUrl(id: $id)
		}`, // 下载通用接口
	
		getStakeholderList: `query($taskId: String) {
			getStakeholderList(taskId: $taskId)
				{
				id
				name
				taskId
				copingStrategy
				phone
				position
				sex
				age
				appellation
				email
				maritalStatus
				monthlyIncome
				hobby
				profile
				photo
				communicatorId
				communicatorName
				communicationMode
				{
					id
					buildTeamFour
					orders
					rule
					ruleExplain
					used
					frequency
					userTeamId
					userTeamName
					remark
				}
				remark
				createUserName
				createTime
				wechat
			}
		}`, // 获取干系人列表
	
		getStakeholderById: `query($id: String) {
			getStakeholderById(id: $id)
			{
				id
				name
				taskId
				copingStrategy
				phone
				position
				sex
				age
				appellation
				email
				maritalStatus
				monthlyIncome
				hobby
				profile
				photo
				communicatorId
				communicatorName
				communicationMode
				{
					id
					buildTeamFour
					orders
					rule
					ruleExplain
					used
					frequency
					userTeamId
					userTeamName
					remark
				}
				remark
				createUserName
				createTime
				wechat
			}
		}`, // 
	
		delStakeholder: `mutation($id: String) {
			delStakeholder(id: $id)
		}`, // 
	
		saveStakeholder: `mutation($s: InputStakeholder) {
			saveStakeholder(s: $s)
			{
				id
				name
				taskId
				copingStrategy
				phone
				position
				sex
				age
				appellation
				email
				maritalStatus
				monthlyIncome
				hobby
				profile
				photo
				communicatorId
				communicatorName
				communicationMode
				{
					id
					buildTeamFour
					orders
					rule
					ruleExplain
					used
					frequency
					userTeamId
					userTeamName
					remark
				}
				remark
				createUserName
				createTime
				wechat
			}
		}`, // 
	
		saveDeliveryTable: `mutation($dt: InputDeliveryTable, $taskId: String) {
			saveDeliveryTable(dt: $dt, taskId: $taskId)
			{
				id
				taskId
				columns 
				data
				code
				events
			}
		}`, // 
	
		getDeliveryTableByCode: `query($code: String) {
			getDeliveryTableByCode(code: $code)
			{
				id
				taskId
				columns 
				data
				code
				events
			}
		}`, // 
	
		getDeliveryTableByTask: `query($taskId: String, $index: Int) {
			getDeliveryTableByTask(taskId: $taskId, index: $index)
			{
				id
				taskId
				columns 
				data
				code
				events
			}
		}`, // 
	
		reStartConfirmSupplier: `mutation($taskId: String, $index: Int) {
			reStartConfirmSupplier(taskId: $taskId, index: $index)
			{
				id
				taskId
				state1
				state2
				state3
			}
		}`, // 重新启动
	
		overConfirmSupplierStep: `mutation($taskId: String, $index: Int) {
			overConfirmSupplierStep(taskId: $taskId, index: $index)
			{
				id
				taskId
				state1
				state2
				state3
			}
		}`, // index=1-3 3个阶段的完成
	
		changeConfirmSupplierStepState: `mutation($taskId: String, $index: Int, $state: Int) {
			changeConfirmSupplierStepState(taskId: $taskId, index: $index, state: $state)
			{
				id
				taskId
				state1
				state2
				state3
			}
		}`, // 更新状态index=1-3 3个阶段
	
		getConfirmSupplierState: `query($taskId: String) {
			getConfirmSupplierState(taskId: $taskId)
			{
				id
				taskId
				state1
				state2
				state3
			}
		}`, // 返回状态
	
		saveConfirmSupplierOneItem: `mutation($csoi: InputConfirmSupplierOneItem) {
			saveConfirmSupplierOneItem(csoi: $csoi)
			{
				id
				taskId
				orders
				name
				supplierId
				selectReason
				otherReason
				createUserId
				cerateTime
				supplier
				{
					id
					orders
					name
					contacts
					phone
					type
					cases
					isVisible
				}
			}
		}`, // 保存表1单条
	
		saveConfirmSupplierOneItemList: `mutation($taskId: String, $csois: [InputConfirmSupplierOneItem]) {
			saveConfirmSupplierOneItemList(taskId: $taskId, csois: $csois)
				{
				id
				taskId
				orders
				name
				supplierId
				selectReason
				otherReason
				createUserId
				cerateTime
				supplier
				{
					id
					orders
					name
					contacts
					phone
					type
					cases
					isVisible
				}
			}
		}`, // 保存表1列表
	
		delConfirmSupplierOneItem: `mutation($id: String) {
			delConfirmSupplierOneItem(id: $id)
		}`, // 删除表1明细
	
		getConfirmSupplierOneItemList: `query($taskId: String) {
			getConfirmSupplierOneItemList(taskId: $taskId)
				{
				id
				taskId
				orders
				name
				supplierId
				selectReason
				otherReason
				createUserId
				cerateTime
				supplier
				{
					id
					orders
					name
					contacts
					phone
					type
					cases
					isVisible
				}
			}
		}`, // 获取表1明细列
	
		saveConfirmSupplierTwoItem: `mutation($csti: InputConfirmSupplierTwoItem) {
			saveConfirmSupplierTwoItem(csti: $csti)
			{
				id
				taskId
				confirmSupplierOneId
				code
				partySecond
				projectName
				projectAddress
				partyFirstManager
				partyFirstPhone
				partySecondManager
				partySecondPhone
				partySecondIdCard
				partySecondSafer
				contractMoney
				contractMoneyBig
				workBeginTime
				wordEndTime
				contractDays
				contractAwardTime
				createTime
				createUserId
				partySecondBankName
				partySecondBankNumber
				partySecondBank
				partyFirstCompanyId
				isSave
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				supplierName
				supplierType
				isActive
				supplierPayNode
				{
					dictId
					nodeName
					dateTime
					payRate
					remark
					id
					isSelected
				}
				isMain
				mainId
				state
				supplierContractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
			}
		}`, // 保存表2单条
	
		saveConfirmSupplierTwoItemList: `mutation($taskId: String, $cstis: [InputConfirmSupplierTwoItem]) {
			saveConfirmSupplierTwoItemList(taskId: $taskId, cstis: $cstis)
				{
				id
				taskId
				confirmSupplierOneId
				code
				partySecond
				projectName
				projectAddress
				partyFirstManager
				partyFirstPhone
				partySecondManager
				partySecondPhone
				partySecondIdCard
				partySecondSafer
				contractMoney
				contractMoneyBig
				workBeginTime
				wordEndTime
				contractDays
				contractAwardTime
				createTime
				createUserId
				partySecondBankName
				partySecondBankNumber
				partySecondBank
				partyFirstCompanyId
				isSave
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				supplierName
				supplierType
				isActive
				supplierPayNode
				{
					dictId
					nodeName
					dateTime
					payRate
					remark
					id
					isSelected
				}
				isMain
				mainId
				state
				supplierContractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
			}
		}`, // 保存表2列表
	
		delConfirmSupplierTwoItem: `mutation($id: String) {
			delConfirmSupplierTwoItem(id: $id)
		}`, // 删除表2明细
	
		getConfirmSupplierTwoItemList: `query($taskId: String) {
			getConfirmSupplierTwoItemList(taskId: $taskId)
				{
				id
				taskId
				confirmSupplierOneId
				code
				partySecond
				projectName
				projectAddress
				partyFirstManager
				partyFirstPhone
				partySecondManager
				partySecondPhone
				partySecondIdCard
				partySecondSafer
				contractMoney
				contractMoneyBig
				workBeginTime
				wordEndTime
				contractDays
				contractAwardTime
				createTime
				createUserId
				partySecondBankName
				partySecondBankNumber
				partySecondBank
				partyFirstCompanyId
				isSave
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				supplierName
				supplierType
				isActive
				supplierPayNode
				{
					dictId
					nodeName
					dateTime
					payRate
					remark
					id
					isSelected
				}
				isMain
				mainId
				state
				supplierContractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
			}
		}`, // 获取表2明细列
	
		saveConfirmSupplierThreeItem: `mutation($csti: InputConfirmSupplierThreeItem) {
			saveConfirmSupplierThreeItem(csti: $csti)
			{
				id
				taskId
				name
				idCard
				phone
				sex
				age
				workType
				supplierId
				orders
				createTime
				createUserId
				supplierName
			}
		}`, // 保存表3单条
	
		saveConfirmSupplierThreeItemList: `mutation($taskId: String, $cstis: [InputConfirmSupplierThreeItem]) {
			saveConfirmSupplierThreeItemList(taskId: $taskId, cstis: $cstis)
				{
				id
				taskId
				name
				idCard
				phone
				sex
				age
				workType
				supplierId
				orders
				createTime
				createUserId
				supplierName
			}
		}`, // 保存表3列表
	
		delConfirmSupplierThreeItem: `mutation($id: String) {
			delConfirmSupplierThreeItem(id: $id)
		}`, // 删除表3明细
	
		getConfirmSupplierThreeItemList: `query($taskId: String) {
			getConfirmSupplierThreeItemList(taskId: $taskId)
				{
				id
				taskId
				name
				idCard
				phone
				sex
				age
				workType
				supplierId
				orders
				createTime
				createUserId
				supplierName
			}
		}`, // 获取表3明细列
	
		delConfirmSupplierThreeItemList: `mutation($ids: [String]) {
			delConfirmSupplierThreeItemList(ids: $ids)
		}`, // 删除表3明细多条
	
		buildContractDoc: `mutation($csti: InputConfirmSupplierTwoItem) {
			buildContractDoc(csti: $csti)
		}`, // 返回一个下载任务的Id
	
		getDownloadUrl: `query($id: String) {
			getDownloadUrl(id: $id)
		}`, // 获取下载文档
	
		buildConfirmSupplierThreeExcel: `mutation($cstis: [InputConfirmSupplierThreeItem]) {
			buildConfirmSupplierThreeExcel(cstis: $cstis)
		}`, // 返回一个下载任务的Id
	
		getCompanyList: `query {
			getCompanyList
				{
				id
				orders
				name
				sh
				address
				companyPhone
				bank
				bankCard
				simpleName
			}
		}`, // 公司列表
	
		getSupplierList: `query($text: String) {
			getSupplierList(text: $text)
				{
				id
				orders
				name
				contacts
				phone
				type
				cases
				isVisible
			}
		}`, // 供应商列表
	
		getConfirmSupplierTwoItemById: `query($id: String) {
			getConfirmSupplierTwoItemById(id: $id)
			{
				id
				taskId
				confirmSupplierOneId
				code
				partySecond
				projectName
				projectAddress
				partyFirstManager
				partyFirstPhone
				partySecondManager
				partySecondPhone
				partySecondIdCard
				partySecondSafer
				contractMoney
				contractMoneyBig
				workBeginTime
				wordEndTime
				contractDays
				contractAwardTime
				createTime
				createUserId
				partySecondBankName
				partySecondBankNumber
				partySecondBank
				partyFirstCompanyId
				isSave
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				supplierName
				supplierType
				isActive
				supplierPayNode
				{
					dictId
					nodeName
					dateTime
					payRate
					remark
					id
					isSelected
				}
				isMain
				mainId
				state
				supplierContractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
			}
		}`, // 根据id获取明细2内容
	
		getProjectSupplierTwoItemListByProjectId: `query($projectId: String) {
			getProjectSupplierTwoItemListByProjectId(projectId: $projectId)
				{
				id
				taskId
				confirmSupplierOneId
				code
				partySecond
				projectName
				projectAddress
				partyFirstManager
				partyFirstPhone
				partySecondManager
				partySecondPhone
				partySecondIdCard
				partySecondSafer
				contractMoney
				contractMoneyBig
				workBeginTime
				wordEndTime
				contractDays
				contractAwardTime
				createTime
				createUserId
				partySecondBankName
				partySecondBankNumber
				partySecondBank
				partyFirstCompanyId
				isSave
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				supplierName
				supplierType
				isActive
				supplierPayNode
				{
					dictId
					nodeName
					dateTime
					payRate
					remark
					id
					isSelected
				}
				isMain
				mainId
				state
				supplierContractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
			}
		}`, // 项目id获取项目的供应商合同
	
		getConfirmSupplierSupplementByMainId: `query($mainId: String) {
			getConfirmSupplierSupplementByMainId(mainId: $mainId)
				{
				id
				taskId
				confirmSupplierOneId
				code
				partySecond
				projectName
				projectAddress
				partyFirstManager
				partyFirstPhone
				partySecondManager
				partySecondPhone
				partySecondIdCard
				partySecondSafer
				contractMoney
				contractMoneyBig
				workBeginTime
				wordEndTime
				contractDays
				contractAwardTime
				createTime
				createUserId
				partySecondBankName
				partySecondBankNumber
				partySecondBank
				partyFirstCompanyId
				isSave
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				supplierName
				supplierType
				isActive
				supplierPayNode
				{
					dictId
					nodeName
					dateTime
					payRate
					remark
					id
					isSelected
				}
				isMain
				mainId
				state
				supplierContractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
			}
		}`, // 返回补充协议列表
	
		saveConfirmSupplierSupplement: `mutation($supplement: InputConfirmSupplierTwoItem) {
			saveConfirmSupplierSupplement(supplement: $supplement)
			{
				id
				taskId
				confirmSupplierOneId
				code
				partySecond
				projectName
				projectAddress
				partyFirstManager
				partyFirstPhone
				partySecondManager
				partySecondPhone
				partySecondIdCard
				partySecondSafer
				contractMoney
				contractMoneyBig
				workBeginTime
				wordEndTime
				contractDays
				contractAwardTime
				createTime
				createUserId
				partySecondBankName
				partySecondBankNumber
				partySecondBank
				partyFirstCompanyId
				isSave
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				supplierName
				supplierType
				isActive
				supplierPayNode
				{
					dictId
					nodeName
					dateTime
					payRate
					remark
					id
					isSelected
				}
				isMain
				mainId
				state
				supplierContractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
			}
		}`, // 保存补充协议
	
		addConfirmSupplierSupplement: `mutation($mainId: String) {
			addConfirmSupplierSupplement(mainId: $mainId)
			{
				id
				taskId
				confirmSupplierOneId
				code
				partySecond
				projectName
				projectAddress
				partyFirstManager
				partyFirstPhone
				partySecondManager
				partySecondPhone
				partySecondIdCard
				partySecondSafer
				contractMoney
				contractMoneyBig
				workBeginTime
				wordEndTime
				contractDays
				contractAwardTime
				createTime
				createUserId
				partySecondBankName
				partySecondBankNumber
				partySecondBank
				partyFirstCompanyId
				isSave
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				supplierName
				supplierType
				isActive
				supplierPayNode
				{
					dictId
					nodeName
					dateTime
					payRate
					remark
					id
					isSelected
				}
				isMain
				mainId
				state
				supplierContractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
			}
		}`, // 添加补充协议
	
		delConfirmSupplierSupplementById: `mutation($id: String) {
			delConfirmSupplierSupplementById(id: $id)
		}`, // 补充协议的id
	
		saveConstructionSchedule: `mutation($cs: InputConstructionSchedule) {
			saveConstructionSchedule(cs: $cs)
			{
				id
				taskId
				name
				planBeginTime
				planEndTime
				constructionKey
				{
					id
					name
					showName
					isShow
					showOrders
					level
					parentId
					code
					orders
					workType
					remark
					needWorkTimeOne
					needWorkTimeTwo
					needWorkTimeThree
					prerequisite
					isShowMust
					allOrders
				}
				layers
				remark
				orders
				createTime
				bocdesignId
				multiple
				standardCount
				toiletCount
				haveGallery
				curtainType
				type
			}
		}`, // 保存定制施工计划单个
	
		saveConstructionScheduleList: `mutation($css: [InputConstructionSchedule], $taskId: String) {
			saveConstructionScheduleList(css: $css, taskId: $taskId)
				{
				id
				taskId
				name
				planBeginTime
				planEndTime
				constructionKey
				{
					id
					name
					showName
					isShow
					showOrders
					level
					parentId
					code
					orders
					workType
					remark
					needWorkTimeOne
					needWorkTimeTwo
					needWorkTimeThree
					prerequisite
					isShowMust
					allOrders
				}
				layers
				remark
				orders
				createTime
				bocdesignId
				multiple
				standardCount
				toiletCount
				haveGallery
				curtainType
				type
			}
		}`, // 保存定制施工计划列表
	
		delConstructionSchedule: `mutation($id: String) {
			delConstructionSchedule(id: $id)
		}`, // 删除定制施工计划
	
		getConstructionScheduleById: `query($id: String) {
			getConstructionScheduleById(id: $id)
			{
				id
				taskId
				name
				planBeginTime
				planEndTime
				constructionKey
				{
					id
					name
					showName
					isShow
					showOrders
					level
					parentId
					code
					orders
					workType
					remark
					needWorkTimeOne
					needWorkTimeTwo
					needWorkTimeThree
					prerequisite
					isShowMust
					allOrders
				}
				layers
				remark
				orders
				createTime
				bocdesignId
				multiple
				standardCount
				toiletCount
				haveGallery
				curtainType
				type
			}
		}`, // 获取表1
	
		getConstructionScheduleList: `query($taskId: String) {
			getConstructionScheduleList(taskId: $taskId)
				{
				id
				taskId
				name
				planBeginTime
				planEndTime
				constructionKey
				{
					id
					name
					showName
					isShow
					showOrders
					level
					parentId
					code
					orders
					workType
					remark
					needWorkTimeOne
					needWorkTimeTwo
					needWorkTimeThree
					prerequisite
					isShowMust
					allOrders
				}
				layers
				remark
				orders
				createTime
				bocdesignId
				multiple
				standardCount
				toiletCount
				haveGallery
				curtainType
				type
			}
		}`, // 获取表1明细列
	
		getDictWorkContentSelectList: `query {
			getDictWorkContentSelectList
				{
				id
				name
				showName
				isShow
				showOrders
				level
				parentId
				code
				orders
				workType
				remark
				needWorkTimeOne
				needWorkTimeTwo
				needWorkTimeThree
				prerequisite
				isShowMust
				allOrders
			}
		}`, // 获取要素选择列表
	
		getConstructionScheduleDetail: `query($taskId: String) {
			getConstructionScheduleDetail(taskId: $taskId)
		}`, // 返回一个json格式的数据
	
		getPlanBeginTimeRange: `query($detailId: String) {
			getPlanBeginTimeRange(detailId: $detailId)
		}`, // 返回一个数组，包含两个数据，开始和结束时间
	
		savePlanBeginTime: `mutation($id: String, $planBeginTime: Long) {
			savePlanBeginTime(id: $id, planBeginTime: $planBeginTime)
		}`, // 返回一个json格式的数据
	
		getConstructionScheduleDetailList: `query($taskId: String) {
			getConstructionScheduleDetailList(taskId: $taskId)
				{
				id
				taskId
				constructionScheduleId
				name
				level
				parentId
				code
				orders
				workType
				remark
				needWorkTime
				prerequisite
				earlyPlanBeginTime
				latePlanBeginTime
				planBeginTime
				planEndTime
				allOrders
				prerequisiteName
				detailId
				minute
				adjunction
				currentProgress
			}
		}`, // 暂时不用此接口
	
		saveConstructionScheduleMaterial: `mutation($csm: InputConstructionScheduleMaterial) {
			saveConstructionScheduleMaterial(csm: $csm)
			{
				id
				taskId
				constructionScheduleId
				workContentId
				name
				showName
				needWorkTime
				planBeginTime
				planEndTime
				beforeCondition
				remark
				orders
				createTime
				code
				level
				detailId
				prerequisiteName
			}
		}`, // 保存材料任务
	
		getMaterialTimeRange: `query($detailId: String) {
			getMaterialTimeRange(detailId: $detailId)
		}`, // 返回一个数组，包含两个数据，开始和结束时间
	
		buildScheduleDocument: `mutation($taskId: String) {
			buildScheduleDocument(taskId: $taskId)
		}`, // 结束任务的时候需要调用此接口生成excel和图纸
	
		getShowConstructionScheduleDetail: `query($taskId: String) {
			getShowConstructionScheduleDetail(taskId: $taskId)
		}`, // 只获取有日期的记录
	
		getScheduleResourcesByProjectId: `query($projectId: String) {
			getScheduleResourcesByProjectId(projectId: $projectId)
			{
				id
				projectId
				planUsePeople
				planUseMachine
				taskId
				omId
				name
				code
				count
			}
		}`, // 根据项目id获取资源池
	
		saveScheduleResources: `mutation($csr: InputConstructionScheduleResources) {
			saveScheduleResources(csr: $csr)
			{
				id
				projectId
				planUsePeople
				planUseMachine
				taskId
				omId
				name
				code
				count
			}
		}`, // 保存资源池
	
		getScheduleDetailListByTaskId: `query($taskId: String) {
			getScheduleDetailListByTaskId(taskId: $taskId)
				{
				id
				taskId
				constructionScheduleId
				name
				level
				parentId
				code
				orders
				workType
				remark
				needWorkTime
				prerequisite
				earlyPlanBeginTime
				latePlanBeginTime
				planBeginTime
				planEndTime
				allOrders
				prerequisiteName
				detailId
				minute
				adjunction
				currentProgress
			}
		}`, // taskid获取施工排序明细
	
		calculationSchedule: `mutation($projectId: String, $list: [InputConstructionScheduleWorkContent]) {
			calculationSchedule(projectId: $projectId, list: $list)
				{
				id
				taskId
				constructionScheduleId
				name
				level
				parentId
				code
				orders
				workType
				remark
				needWorkTime
				prerequisite
				earlyPlanBeginTime
				latePlanBeginTime
				planBeginTime
				planEndTime
				allOrders
				prerequisiteName
				detailId
				minute
				adjunction
				currentProgress
			}
		}`, // 计算排期不保存
	
		saveScheduleWorkContent: `mutation($contents: [InputConstructionScheduleWorkContent], $taskId: String) {
			saveScheduleWorkContent(contents: $contents, taskId: $taskId)
				{
				id
				taskId
				constructionScheduleId
				name
				level
				parentId
				code
				orders
				workType
				remark
				needWorkTime
				prerequisite
				earlyPlanBeginTime
				latePlanBeginTime
				planBeginTime
				planEndTime
				allOrders
				prerequisiteName
				detailId
				minute
				adjunction
				currentProgress
			}
		}`, // 保持排期 
	
		saveScheduleResourcesList: `mutation($list: [InputScheduleResources], $type: Int) {
			saveScheduleResourcesList(list: $list, type: $type)
				{
				id
				projectId
				taskId
				name
				code
				counts
				omId
				resType
			}
		}`, // 新保存排期资源列表后结果type=0计划 1时时
	
		getScheduleResourcesListByTaskId: `query($taskId: String, $type: Int) {
			getScheduleResourcesListByTaskId(taskId: $taskId, type: $type)
				{
				id
				projectId
				taskId
				name
				code
				counts
				omId
				resType
			}
		}`, // taskId获取资源列表
	
		getCurrentContents: `query($taskId: String, $projectId: String, $dateTime: Long) {
			getCurrentContents(taskId: $taskId, projectId: $projectId, dateTime: $dateTime)
				{
				id
				taskId
				constructionScheduleId
				name
				level
				parentId
				code
				orders
				workType
				remark
				needWorkTime
				prerequisite
				earlyPlanBeginTime
				latePlanBeginTime
				planBeginTime
				planEndTime
				allOrders
				prerequisiteName
				detailId
				minute
				adjunction
				currentProgress
			}
		}`, // 获取时时排期 
	
		getDetailWorkContentByProjectId: `query($projectId: String, $type: Int) {
			getDetailWorkContentByProjectId(projectId: $projectId, type: $type)
				{
				id
				taskId
				constructionScheduleId
				name
				level
				parentId
				code
				orders
				workType
				remark
				needWorkTime
				prerequisite
				earlyPlanBeginTime
				latePlanBeginTime
				planBeginTime
				planEndTime
				allOrders
				prerequisiteName
				detailId
				minute
				adjunction
				currentProgress
			}
		}`, // 排期明细type=0是计划1是实时
	
		getConstructionMainByProjectId: `query($projectId: String) {
			getConstructionMainByProjectId(projectId: $projectId)
			{
				id
				projectId
				efficiency
				currentEfficiency
			}
		}`, // 获取排期主设置
	
		saveConstructionMain: `mutation($cm: InputConstructionMain) {
			saveConstructionMain(cm: $cm)
			{
				id
				projectId
				efficiency
				currentEfficiency
			}
		}`, // 保存排期主设置
	
		getMakePlot: `query($projectId: String) {
			getMakePlot(projectId: $projectId)
			{
				makePlotInfo
				{
					id
					projectId
					taskId
					name
					region
						address
					partyUnits
					buildUnits
					supplier
						{
						id
						orders
						name
						contacts
						phone
						type
						cases
						isVisible
					}
					projectConstructionType
					buildArea
					roomComposition
					enterConditionDefault
					enterCondition
					productType
						organizationRemark
					planImageUrl
					planImageRemark
					orgImageUrl
					document
					{
						id
						taskId
						name
						ownerId
						ownerName
						fileSize
						createTime
						orders
						isVisible
						downloadCount
						fileUrl
						fileType
						category
					}
					companyName
				}
				buildTeamTwoMain
				{
					id
					buildTeamTwo
					progressTargetTimeSure
					progressTargetBaseTime
					progressTargetNostandardDay
					progressTargetOverDay
					progressPromiseTimeSure
					progressPromiseBaseTime
					progressPromiseNostandardDay
					progressPromiseOverDay
					qualityTargetCheckCount
					qualityPromiseAccidentCount
					profitTarget
					profitTargetRate
					costHave
					costTargetPayDay
					markingHave
					markingTargetStandard
					markingTargetSatisfied
					safeHave
					safeTargetAccidentCount
					safeTargetTreacherousCount
					safePromiseAccidentCount
					safePromiseTreacherousCount
					costTargetOne
					costTargetTwo
					costTargetThree
					costTargetFour
					costTargetThree2
					costTargetFour2
					progressTargetNostandardTime
					progressTargetOverTime
					progressPromiseNostandardTime
					progressPromiseOverTime
				}
				makePlotCost
				{
					id
					projectId
					taskId
					firstContractState
					civilizedConstructionState
					civilizedConstructionValue
					hospitalityState
					hospitalityValue
					additionalRiskState
					additionalRiskValue
					remark
					confirmSupplierTwoItems
						{
						id
						taskId
						confirmSupplierOneId
						code
						partySecond
						projectName
						projectAddress
						partyFirstManager
						partyFirstPhone
						partySecondManager
						partySecondPhone
						partySecondIdCard
						partySecondSafer
						contractMoney
						contractMoneyBig
						workBeginTime
						wordEndTime
						contractDays
						contractAwardTime
						createTime
						createUserId
						partySecondBankName
						partySecondBankNumber
						partySecondBank
						partyFirstCompanyId
						isSave
						document
						{
							id
							taskId
							name
							ownerId
							ownerName
							fileSize
							createTime
							orders
							isVisible
							downloadCount
							fileUrl
							fileType
							category
						}
						supplierName
						supplierType
						isActive
						supplierPayNode
								{
							dictId
							nodeName
							dateTime
							payRate
							remark
							id
							isSelected
						}
						isMain
						mainId
						state
						supplierContractList
								{
							id
							type
							taskId
							supplierId
							supplierTwoId
							position
							positionId
							categoryType
							categoryTypeId
							productDetail
							productDetailId
							units
							count
							prize
							total
							remarks
							specification
							bocdesignId
							bocdesignItemId
							parentId
							orders
						}
					}
					yields
					firstPartyTimeRange
					supplierTimeRange
					civilizedConstructionMaxValue
					hospitalityMaxValue
					additionalRiskMaxValue
					firstContractValue
				}
				makePlotPeople
				{
					id
					projectId
					taskId
					name
					count
					enterTime
					remark
					createTime
				}
				makePlotMachine
				{
					id
					projectId
					taskId
					name
					specs
					count
					remark
					createTime
				}
				makePlotMaterial
				{
					id
					projectId
					taskId
					name
					enterBeginTime
					enterEndTime
					remark
					createTime
				}
				makePlotQuality
				{
					id
					projectId
					taskId
					buildTeamOneId
					buildTeamName
					name
					remark
					type
					createTime
				}
				makePlotRisk
				{
					id
					projectId
					taskId
					type
					describe
					programme
					createTime
					describes
				}
				makePlotSafe
				{
					id
					projectId
					taskId
					buildTeamOneId
					buildTeamName
					name
					remark
					type
					createTime
				}
			}
		}`, // 根据项目id获取制定策划书
	
		saveMakePlotInfo: `mutation($info: InputMakePlotInfo) {
			saveMakePlotInfo(info: $info)
			{
				id
				projectId
				taskId
				name
				region
				address
				partyUnits
				buildUnits
				supplier
				{
					id
					orders
					name
					contacts
					phone
					type
					cases
					isVisible
				}
				projectConstructionType
				buildArea
				roomComposition
				enterConditionDefault
				enterCondition
				productType
				organizationRemark
				planImageUrl
				planImageRemark
				orgImageUrl
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				companyName
			}
		}`, // 保存基本信息含图，备注等
	
		saveMakePlotCost: `mutation($cost: InputMakePlotCost) {
			saveMakePlotCost(cost: $cost)
			{
				id
				projectId
				taskId
				firstContractState
				civilizedConstructionState
				civilizedConstructionValue
				hospitalityState
				hospitalityValue
				additionalRiskState
				additionalRiskValue
				remark
				confirmSupplierTwoItems
				{
					id
					taskId
					confirmSupplierOneId
					code
					partySecond
					projectName
					projectAddress
					partyFirstManager
					partyFirstPhone
					partySecondManager
					partySecondPhone
					partySecondIdCard
					partySecondSafer
					contractMoney
					contractMoneyBig
					workBeginTime
					wordEndTime
					contractDays
					contractAwardTime
					createTime
					createUserId
					partySecondBankName
					partySecondBankNumber
					partySecondBank
					partyFirstCompanyId
					isSave
					document
					{
						id
						taskId
						name
						ownerId
						ownerName
						fileSize
						createTime
						orders
						isVisible
						downloadCount
						fileUrl
						fileType
						category
					}
					supplierName
					supplierType
					isActive
					supplierPayNode
						{
						dictId
						nodeName
						dateTime
						payRate
						remark
						id
						isSelected
					}
					isMain
					mainId
					state
					supplierContractList
						{
						id
						type
						taskId
						supplierId
						supplierTwoId
						position
						positionId
						categoryType
						categoryTypeId
						productDetail
						productDetailId
						units
						count
						prize
						total
						remarks
						specification
						bocdesignId
						bocdesignItemId
						parentId
						orders
					}
				}
				yields
				firstPartyTimeRange
				supplierTimeRange
				civilizedConstructionMaxValue
				hospitalityMaxValue
				additionalRiskMaxValue
				firstContractValue
			}
		}`, // 保存成本信息
	
		saveMakePlotPeople: `mutation($people: InputMakePlotPeople) {
			saveMakePlotPeople(people: $people)
			{
				id
				projectId
				taskId
				name
				count
				enterTime
				remark
				createTime
			}
		}`, // 
	
		saveMakePlotPeopleList: `mutation($peopleList: [InputMakePlotPeople]) {
			saveMakePlotPeopleList(peopleList: $peopleList)
				{
				id
				projectId
				taskId
				name
				count
				enterTime
				remark
				createTime
			}
		}`, // 列表保存
	
		delMakePlotPeople: `mutation($id: String) {
			delMakePlotPeople(id: $id)
		}`, // 删除人
	
		saveMakePlotMachine: `mutation($item: InputMakePlotMachine) {
			saveMakePlotMachine(item: $item)
			{
				id
				projectId
				taskId
				name
				specs
				count
				remark
				createTime
			}
		}`, // 机具
	
		saveMakePlotMachineList: `mutation($list: [InputMakePlotMachine]) {
			saveMakePlotMachineList(list: $list)
				{
				id
				projectId
				taskId
				name
				specs
				count
				remark
				createTime
			}
		}`, // 列表机具保存
	
		delMakePlotMachine: `mutation($id: String) {
			delMakePlotMachine(id: $id)
		}`, // 删除机具
	
		saveMakePlotMaterial: `mutation($item: InputMakePlotMaterial) {
			saveMakePlotMaterial(item: $item)
			{
				id
				projectId
				taskId
				name
				enterBeginTime
				enterEndTime
				remark
				createTime
			}
		}`, // 材料
	
		saveMakePlotMaterialList: `mutation($list: [InputMakePlotMaterial]) {
			saveMakePlotMaterialList(list: $list)
				{
				id
				projectId
				taskId
				name
				enterBeginTime
				enterEndTime
				remark
				createTime
			}
		}`, // 列表材料保存
	
		delMakePlotMaterial: `mutation($id: String) {
			delMakePlotMaterial(id: $id)
		}`, // 删除材料
	
		saveMakeQualitySafe: `mutation($item: InputMakePlotQualitySafe) {
			saveMakeQualitySafe(item: $item)
			{
				id
				projectId
				taskId
				buildTeamOneId
				buildTeamName
				name
				remark
				type
				createTime
			}
		}`, // 质量安全
	
		saveMakePlotQualitySafeList: `mutation($list: [InputMakePlotQualitySafe]) {
			saveMakePlotQualitySafeList(list: $list)
				{
				id
				projectId
				taskId
				buildTeamOneId
				buildTeamName
				name
				remark
				type
				createTime
			}
		}`, // 列表质量安全保存
	
		delMakePlotQualitySafe: `mutation($id: String) {
			delMakePlotQualitySafe(id: $id)
		}`, // 删除质量安全
	
		saveMakeRisk: `mutation($item: InputMakePlotRisk) {
			saveMakeRisk(item: $item)
			{
				id
				projectId
				taskId
				type
				describe
				programme
				createTime
				describes
			}
		}`, // 风险
	
		saveMakePlotRiskList: `mutation($list: [InputMakePlotRisk]) {
			saveMakePlotRiskList(list: $list)
				{
				id
				projectId
				taskId
				type
				describe
				programme
				createTime
				describes
			}
		}`, // 风险列表保存
	
		delMakePlotRisk: `mutation($id: String) {
			delMakePlotRisk(id: $id)
		}`, // 删除风险
	
		buildMakePlotDoc: `mutation($makePlot: InputMakePlot) {
			buildMakePlotDoc(makePlot: $makePlot)
		}`, // 返回一个下载任务的Id
	
		getMakePlotDownloadUrl: `query($id: String) {
			getMakePlotDownloadUrl(id: $id)
		}`, // 获取下载文档
	
		sendMakePlotEmail: `query($makePlot: InputMakePlot, $emails: [String], $userIds: [String], $ccEmails: [String], $ccUserIds: [String]) {
			sendMakePlotEmail(makePlot: $makePlot, emails: $emails, userIds: $userIds, ccEmails: $ccEmails, ccUserIds: $ccUserIds)
		}`, // 发送邮件
	
		getConfirmEnterOneMain: `query($taskId: String) {
			getConfirmEnterOneMain(taskId: $taskId)
			{
				id
				projectId
				taskId
				planEnterTime
				optimalConfirmTime
				basicProvider
				basicStructureForm
				basicStructureFormResult
				basicStructureFormActual
				basicStrengthRequirement
				basicStrengthRequirementResult
				basicStrengthRequirementActual
				basicLongitudinal
				basicLongitudinalResult
				basicLongitudinalActual
				basicElevation
				basicElevationResult
				basicElevationActual
				basicSize
				basicSizeResult
				basicSizeActual
				basicPlanOverTime
				basicActualOverTime
				waterProvider
				waterStandard
				waterStandardResult
				waterStandardActual
				waterPlanOverTime
				waterActualOverTime
				powerProvider
				powerStandard
				powerStandardResult
				powerStandardActual
				powerPlanOverTime
				powerActualOverTime
				roadProvider
				roadStandard
				roadStandardResult
				roadStandardActual
				roadPlanOverTime
				roadActualOverTime
				materialFieldProvider
				materialFieldStandard
				materialFieldStandardResult
				materialFieldStandardActual
				materialFieldPlanOverTime
				materialFieldActualOverTime
				craneSitesProvider
				craneSitesStandard
				craneSitesStandardResult
				craneSitesStandardActual
				craneSitesPlanOverTime
				craneSitesActualOverTime
				remarkOne
				remarkTwo
				explorativeTime
				explorativePeople
				{
					id
					userName
					email
				}
				explorativeAddress
				firstPartySignature
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				entryConditionsJson
			}
		}`, // 获取进场条件，步骤1,2 都是这个
	
		saveConfirmEnterOneMain: `mutation($mian: InputConfirmEnterOneMain) {
			saveConfirmEnterOneMain(mian: $mian)
			{
				id
				projectId
				taskId
				planEnterTime
				optimalConfirmTime
				basicProvider
				basicStructureForm
				basicStructureFormResult
				basicStructureFormActual
				basicStrengthRequirement
				basicStrengthRequirementResult
				basicStrengthRequirementActual
				basicLongitudinal
				basicLongitudinalResult
				basicLongitudinalActual
				basicElevation
				basicElevationResult
				basicElevationActual
				basicSize
				basicSizeResult
				basicSizeActual
				basicPlanOverTime
				basicActualOverTime
				waterProvider
				waterStandard
				waterStandardResult
				waterStandardActual
				waterPlanOverTime
				waterActualOverTime
				powerProvider
				powerStandard
				powerStandardResult
				powerStandardActual
				powerPlanOverTime
				powerActualOverTime
				roadProvider
				roadStandard
				roadStandardResult
				roadStandardActual
				roadPlanOverTime
				roadActualOverTime
				materialFieldProvider
				materialFieldStandard
				materialFieldStandardResult
				materialFieldStandardActual
				materialFieldPlanOverTime
				materialFieldActualOverTime
				craneSitesProvider
				craneSitesStandard
				craneSitesStandardResult
				craneSitesStandardActual
				craneSitesPlanOverTime
				craneSitesActualOverTime
				remarkOne
				remarkTwo
				explorativeTime
				explorativePeople
				{
					id
					userName
					email
				}
				explorativeAddress
				firstPartySignature
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				entryConditionsJson
			}
		}`, // 保存进场条件内容
	
		getConfirmEnterOneMainByProjectId: `query($projectId: String) {
			getConfirmEnterOneMainByProjectId(projectId: $projectId)
			{
				id
				projectId
				taskId
				planEnterTime
				optimalConfirmTime
				basicProvider
				basicStructureForm
				basicStructureFormResult
				basicStructureFormActual
				basicStrengthRequirement
				basicStrengthRequirementResult
				basicStrengthRequirementActual
				basicLongitudinal
				basicLongitudinalResult
				basicLongitudinalActual
				basicElevation
				basicElevationResult
				basicElevationActual
				basicSize
				basicSizeResult
				basicSizeActual
				basicPlanOverTime
				basicActualOverTime
				waterProvider
				waterStandard
				waterStandardResult
				waterStandardActual
				waterPlanOverTime
				waterActualOverTime
				powerProvider
				powerStandard
				powerStandardResult
				powerStandardActual
				powerPlanOverTime
				powerActualOverTime
				roadProvider
				roadStandard
				roadStandardResult
				roadStandardActual
				roadPlanOverTime
				roadActualOverTime
				materialFieldProvider
				materialFieldStandard
				materialFieldStandardResult
				materialFieldStandardActual
				materialFieldPlanOverTime
				materialFieldActualOverTime
				craneSitesProvider
				craneSitesStandard
				craneSitesStandardResult
				craneSitesStandardActual
				craneSitesPlanOverTime
				craneSitesActualOverTime
				remarkOne
				remarkTwo
				explorativeTime
				explorativePeople
				{
					id
					userName
					email
				}
				explorativeAddress
				firstPartySignature
				document
				{
					id
					taskId
					name
					ownerId
					ownerName
					fileSize
					createTime
					orders
					isVisible
					downloadCount
					fileUrl
					fileType
					category
				}
				entryConditionsJson
			}
		}`, // 根据项目id获取进场条件
	
		buildConfirmEnterDoc: `mutation($main: InputConfirmEnterOneMain) {
			buildConfirmEnterDoc(main: $main)
		}`, // 返回一个下载任务的Id
	
		getConfirmEnterDownloadUrl: `query($id: String) {
			getConfirmEnterDownloadUrl(id: $id)
		}`, // 获取下载文档
	
		getProjectDetailOpen: `query($id: String) {
			getProjectDetailOpen(id: $id)
			{
				id
				name
				parentId
				masterId
				masterName
				dictProjectId
				address
				peopleCount
				beginTime
				endTime
				mainPhoto
				isVisible
				state
				updateTime
				createTime
				isDefault
				createUserId
				stages
				{
					id
					name
					projectId
					orders
					createTime
					dictStageId
					tasks
						{
						id
						name
						stageId
						orders
						createTime
						isActive
						dictTaskId
						operatorId
						operatorName
						state
						beginTime
						endTime
						goal
						flowChartUrl
						taskType
					}
					iconUrl
				}
				projectScale
				createUserName
				number
				region
				longitude
				latitude
				buildArea
				roomComposition
				nameplateUrl
				boxCount
				bocdesignId
				purpose
				tempBuildBeginTime
				tempBuildEndTime
				companyName
				namePartyAShort
				namePlace
				nameProjectShort
				nameType
			}
		}`, // 
	
		getDailyByIdOpen: `query($id: String) {
			getDailyByIdOpen(id: $id)
			{
				id
				date
				title
				progressState
				weather
				windPower
				overallDescription
				contentRemarks
				workersCount
				material
				summary
				tomorrowPlanRemarks
				tomorrowWeather
				tomorrowWindPower
				tomorrowMaterial
				assistance
				saveType
				createTime
				likeCount
				commentCount
				readCount
				contents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				tomorrowContents
				{
					id
					number
					position
					productCategory
					productDetail
					specifications
					unit
					palnProgress
					actualProgress
					type
					positionId
					productCategoryId
					productDetailId
					actualBeginTime
					planBeginTime
					planEndTime
				}
				projectId
				comments
				{
					id
					pid
					dailyId
					userId
					userName
					parentUserId
					parentUserName
					text
					createTime
				}
				likeUsers
				{
					id
					dailyId
					userId
					userName
					createTime
				}
				dailyDocuments
				{
					id
					dailyId
					name
					ownerId
					ownerName
					fileSize
					fileUrl
					createTime
					orders
					fileType
					category
					isVisible
				}
				createUser
				createUserName
				noArriveMaterials
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				materialInfluence
				tomorrowPlanArriveMaterial
				{
					id
					dailyId
					projectId
					materialId
					planBeginTime
					planEndTime
					tomorrowProgress
					name
					showName
					number
					position
					productCategory
					productDetail
					positionId
					productCategoryId
					productDetailId
				}
				summaryShare
				boxCount
				purpose
				planOverTime
				countdownDay
				dailyProjectPhotos
				{
					id
					projectId
					orders
					place
					imageDocs
						{
						id
						taskId
						name
						ownerId
						ownerName
						fileSize
						createTime
						orders
						isVisible
						downloadCount
						fileUrl
						fileType
						category
					}
					createTime
				}
				arrivalCount
				installCount
				onWayCount
				distributionJson
				driverName
				driverPhone
				arrivalMaterialText
				enterMaterial
				tomorrowEnterMaterial
			}
		}`, // 
	
		syncBocdesignByIds: `mutation($projectId: String, $ids: [String]) {
			syncBocdesignByIds(projectId: $projectId, ids: $ids)
			{
				id
				supplierContractList
				{
					id
					type
					taskId
					supplierId
					supplierTwoId
					position
					positionId
					categoryType
					categoryTypeId
					productDetail
					productDetailId
					units
					count
					prize
					total
					remarks
					specification
					bocdesignId
					bocdesignItemId
					parentId
					orders
				}
				code
			}
		}`, // 获取同步后的清单
	
		syncConstructionElements: `mutation($projectId: String) {
			syncConstructionElements(projectId: $projectId)
				{
				id
				taskId
				name
				planBeginTime
				planEndTime
				constructionKey
				{
					id
					name
					showName
					isShow
					showOrders
					level
					parentId
					code
					orders
					workType
					remark
					needWorkTimeOne
					needWorkTimeTwo
					needWorkTimeThree
					prerequisite
					isShowMust
					allOrders
				}
				layers
				remark
				orders
				createTime
				bocdesignId
				multiple
				standardCount
				toiletCount
				haveGallery
				curtainType
				type
			}
		}`, // 同步方案的施工要素
	
		syncConstructionResources: `mutation($projectId: String) {
			syncConstructionResources(projectId: $projectId)
				{
				id
				projectId
				taskId
				name
				code
				counts
				omId
				resType
			}
		}`, // 同步资源数据
	
		getWeatherByProjectId: `query($projectId: String) {
			getWeatherByProjectId(projectId: $projectId)
			{
				place
				weatherName
				maxTemp
				minTemp
				windPower
				windDirection
				projectUpdateTime
				projectName
				projectId
				msg
				tomorrowWeatherName
				tomorrowWindPower
				tomorrowDirection
			}
		}`, // 获取天气情况
	
		getSignboardInfo: `query($projectId: String) {
			getSignboardInfo(projectId: $projectId)
		}`, // 返回项目看板信息
	
		getConstructionChart: `query($projectId: String) {
			getConstructionChart(projectId: $projectId)
				{
				id
				taskId
				constructionScheduleId
				name
				level
				parentId
				code
				orders
				workType
				remark
				needWorkTime
				prerequisite
				earlyPlanBeginTime
				latePlanBeginTime
				planBeginTime
				planEndTime
				allOrders
				prerequisiteName
				detailId
				minute
				adjunction
				currentProgress
			}
		}`, // 获取楼栋施工进度
	
	  }
	}
	export default Config;