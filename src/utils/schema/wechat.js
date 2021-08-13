let Config = {
  // 微信
  wechat: {
    login: `mutation($openId: String, $identifier: String, $credential: String) {
		login(openId: $openId, identifier: $identifier, credential: $credential)
		{
			code
			userInfo
			{
				id
				nickname
				realname
				phone
				email
				gender
				avatar
				isActive
				auths
				station
				creadepartment
			}
			message
		}
	}`, // 用户登录

    autoLogin: `mutation($appid: String, $code: String) {
		autoLogin(appid: $appid, code: $code)
		{
			openId
			unionId
			sessionId
			userInfo
			{
				id
				nickname
				realname
				phone
				email
				gender
				avatar
				isActive
				auths
				station
				creadepartment
			}
			sessionKey
		}
	}`, // 默认登录 并返回微信OpenID 和用户信息

    sendVerificationCode: `mutation($openId: String, $identifier: String) {
		sendVerificationCode(openId: $openId, identifier: $identifier)
	}`, // 发送验证码

    codeLogin: `mutation($appId: String, $openId: String, $identifier: String, $code: String) {
		codeLogin(appId: $appId, openId: $openId, identifier: $identifier, code: $code)
		{
			code
			userInfo
			{
				id
				nickname
				realname
				phone
				email
				gender
				avatar
				isActive
				auths
				station
				creadepartment
			}
			message
		}
	}`, // 用户验证码登录

    getPhoneNumber: `mutation($appId: String, $sessionKey: String, $encryptedData: String, $iv: String) {
		getPhoneNumber(appId: $appId, sessionKey: $sessionKey, encryptedData: $encryptedData, iv: $iv)
	}`, // 获取小程序用户手机号

    logout: `mutation($appId: String, $identifier: String, $userId: String) {
		logout(appId: $appId, identifier: $identifier, userId: $userId)
	}`, // 小程序登出

    getVisitList: `query($text: String, $pageIndex: Long, $pageSize: Long) {
		getVisitList(text: $text, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				companyName
				projectName
				type
				visitName
				visitPhone
				visitJob
				userName
				userId
				follow
				updateTime
			}
			pageIndex
			pageSize
			totalCount
			pageCount
		}
	}`, // 客户调研列表

    getLastVisitByGroupId: `query($groupId: String) {
		getLastVisitByGroupId(groupId: $groupId)
		{
			id
			groupId
			userId
			userName
			isSave
			num
			values
			{
				metaName
				metaValue
				metaType
			}
			valuesJson
		}
	}`, // 获取拜访组最近一条拜访信息

    addAttachment: `mutation($attachment: InputAttachment) {
		addAttachment(attachment: $attachment)
	}`, // 图片上传成功 保存附件 文件类型1,图片 2语音

    getProjectList: `query($text: String) {
		getProjectList(text: $text)
			{
			id
			name
			code
			region
			address
			buildUnits
			supervisionUnits
			constructionUnits
			foreman
			isSave
			createTime
		}
	}`, // 根据输入查询10个项目

    getInformationList: `query($pageIndex: Long, $pageSize: Long) {
		getInformationList(pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				reportId
				projectName
				title
				time
				reportCode
				message
				reason
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // 代办列表

    getUserByProjectId: `query($projectId: String, $type: Int, $posotion: String) {
		getUserByProjectId(projectId: $projectId, type: $type, posotion: $posotion)
			{
			userId
			userName
			position
		}
	}`, // 查询用户 type1建设单位2监理单位3施工单位

    getAcceptanceReportList: `query($text: String, $status: String, $pageIndex: Long, $pageSize: Long) {
		getAcceptanceReportList(text: $text, status: $status, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				code
				checkTime
				userId
				userName
				category
				subCategory
				projectId
				projectName
				result
				reportUser
					{
					userId
					userName
					position
				}
				status
				isSave
				materials
					{
					id
					projectId
					name
					spec
					manufacturer
					certificateNumber
					num
					item
					result
					remark
					reportId
					totalNum
					deliveryTime
					units
					arrivalTime
					attachments
							{
						id
						fileName
						fileId
						fileType
						filePath
						reportId
					}
				}
				attachments
					{
					id
					fileName
					fileId
					fileType
					filePath
					reportId
				}
				flows
					{
					name
					step
					users
							{
						userName
						userId
						position
						isSign
						signature
						comment
						flowId
					}
				}
				isflow
				flowId
				exts
					{
					id
					reportId
					dateId
					name
					alias
					placeholder
					type
					defaultValue
					enums
					notNull
					inputValue
					readonly
				}
				items
					{
					id
					name
					type
					reports
							{
						id
						itemId
						reportId
						drs
						sample
						record
						result
					}
				}
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // 记录列表验收单

    getAcceptanceReport: `query($reportId: String) {
		getAcceptanceReport(reportId: $reportId)
		{
			id
			code
			checkTime
			userId
			userName
			category
			subCategory
			projectId
			projectName
			result
			reportUser
			{
				userId
				userName
				position
			}
			status
			isSave
			materials
			{
				id
				projectId
				name
				spec
				manufacturer
				certificateNumber
				num
				item
				result
				remark
				reportId
				totalNum
				deliveryTime
				units
				arrivalTime
				attachments
					{
					id
					fileName
					fileId
					fileType
					filePath
					reportId
				}
			}
			attachments
			{
				id
				fileName
				fileId
				fileType
				filePath
				reportId
			}
			flows
			{
				name
				step
				users
					{
					userName
					userId
					position
					isSign
					signature
					comment
					flowId
				}
			}
			isflow
			flowId
			exts
			{
				id
				reportId
				dateId
				name
				alias
				placeholder
				type
				defaultValue
				enums
				notNull
				inputValue
				readonly
			}
			items
			{
				id
				name
				type
				reports
					{
					id
					itemId
					reportId
					drs
					sample
					record
					result
				}
			}
		}
	}`, // 查询验收单

    delAcceptanceReport: `mutation($reportId: String) {
		delAcceptanceReport(reportId: $reportId)
	}`, // 删除验收单

    cancelAcceptanceReport: `mutation($reportId: String) {
		cancelAcceptanceReport(reportId: $reportId)
	}`, // 撤销验收单

    saveAcceptanceReport: `mutation($type: Int, $acceptanceReport: InputAcceptanceReport) {
		saveAcceptanceReport(type: $type, acceptanceReport: $acceptanceReport)
		{
			id
			code
			checkTime
			userId
			userName
			category
			subCategory
			projectId
			projectName
			result
			reportUser
			{
				userId
				userName
				position
			}
			status
			isSave
			materials
			{
				id
				projectId
				name
				spec
				manufacturer
				certificateNumber
				num
				item
				result
				remark
				reportId
				totalNum
				deliveryTime
				units
				arrivalTime
				attachments
					{
					id
					fileName
					fileId
					fileType
					filePath
					reportId
				}
			}
			attachments
			{
				id
				fileName
				fileId
				fileType
				filePath
				reportId
			}
			flows
			{
				name
				step
				users
					{
					userName
					userId
					position
					isSign
					signature
					comment
					flowId
				}
			}
			isflow
			flowId
			exts
			{
				id
				reportId
				dateId
				name
				alias
				placeholder
				type
				defaultValue
				enums
				notNull
				inputValue
				readonly
			}
			items
			{
				id
				name
				type
				reports
					{
					id
					itemId
					reportId
					drs
					sample
					record
					result
				}
			}
		}
	}`, // 保存并发起签名 草稿和保存

    backAcceptanceReport: `mutation($reportId: String, $flowId: String, $message: String) {
		backAcceptanceReport(reportId: $reportId, flowId: $flowId, message: $message)
	}`, // 退回

    agreeAcceptanceReport: `mutation($reportId: String, $flowId: String, $message: String, $signature: String) {
		agreeAcceptanceReport(reportId: $reportId, flowId: $flowId, message: $message, signature: $signature)
	}`, // 签字 同意

    addAcceptanceReport: `mutation($category: String) {
		addAcceptanceReport(category: $category)
		{
			id
			code
			checkTime
			userId
			userName
			category
			subCategory
			projectId
			projectName
			result
			reportUser
			{
				userId
				userName
				position
			}
			status
			isSave
			materials
			{
				id
				projectId
				name
				spec
				manufacturer
				certificateNumber
				num
				item
				result
				remark
				reportId
				totalNum
				deliveryTime
				units
				arrivalTime
				attachments
					{
					id
					fileName
					fileId
					fileType
					filePath
					reportId
				}
			}
			attachments
			{
				id
				fileName
				fileId
				fileType
				filePath
				reportId
			}
			flows
			{
				name
				step
				users
					{
					userName
					userId
					position
					isSign
					signature
					comment
					flowId
				}
			}
			isflow
			flowId
			exts
			{
				id
				reportId
				dateId
				name
				alias
				placeholder
				type
				defaultValue
				enums
				notNull
				inputValue
				readonly
			}
			items
			{
				id
				name
				type
				reports
					{
					id
					itemId
					reportId
					drs
					sample
					record
					result
				}
			}
		}
	}`, // 增加验收单

    signAcceptanceReport: `mutation($reportId: String) {
		signAcceptanceReport(reportId: $reportId)
	}`, // 签收验收单

    getMaterialByName: `query($projectId: String, $name: String) {
		getMaterialByName(projectId: $projectId, name: $name)
			{
			id
			projectId
			name
			spec
			manufacturer
			certificateNumber
			num
			item
			result
			remark
			reportId
			totalNum
			deliveryTime
			units
			arrivalTime
			attachments
			{
				id
				fileName
				fileId
				fileType
				filePath
				reportId
			}
		}
	}`, // 根据名称获取物料信息

    saveRequirementFromWeApp: `mutation($requirement: InputRequirement) {
		saveRequirementFromWeApp(requirement: $requirement)
		{
			id
			number
			seq
			title
			category
			level
			demandName
			demandPhone
			demandStation
			description
			status
			toUserName
			userName
			userId
			createTime
			isSave
			attachments
			{
				id
				fileName
				fileId
				type
				sourceId
				filePath
			}
			product
		}
	}`, // 小程序提交需求

    openDoor: `mutation($id: String) {
		openDoor(id: $id)
	}`, // 开id的门

    saveConstructionLog: `mutation($log: InputConstructionLog) {
		saveConstructionLog(log: $log)
	}`, // 保存施工日志

    getConstructionLog: `query($projectId: String, $date: String) {
		getConstructionLog(projectId: $projectId, date: $date)
		{
			project
			{
				id
				name
				code
				region
				address
				buildUnits
				supervisionUnits
				constructionUnits
				foreman
				isSave
				createTime
			}
			projectId
			date
			environment
			{
				id
				projectId
				date
				text
				remark
			}
			plan
			{
				id
				date
				goals
					{
					id
					projectId
					text
					rate
					date
				}
				goalsTomorrow
					{
					id
					projectId
					text
					rate
					date
				}
				text
				projectId
				attachments
					{
					id
					planId
					fileId
					fileName
					filePath
					createTime
					isDeleted
				}
			}
			persons
			{
				id
				projectId
				date
				count
				type
				averageHours
				remark
				dateEnd
			}
			qualities
			{
				id
				question
				type
				emergency
				createTime
				state
				solveTime
				handler
				reviewer
				remark
				projectId
				updateTime
				planSolveTime
			}
			machines
			{
				id
				projectId
				date
				count
				units
				type
				averageHours
				remark
				dateEnd
				name
			}
			materials
			{
				id
				projectId
				name
				spec
				manufacturer
				certificateNumber
				num
				item
				result
				remark
				reportId
				totalNum
				deliveryTime
				units
				arrivalTime
				attachments
					{
					id
					fileName
					fileId
					fileType
					filePath
					reportId
				}
			}
			isSendEmail
			workContent
			{
				id
				projectId
				date
				environment
				workdetails
					{
					id
					workContentId
					name
					date
					dateEnd
					peopleCount
					prepare
					constHour
					method
				}
				notifyStatus
				userId
			}
		}
	}`, // 获取施工日志

    getConstructionLogProjectList: `query($isManager: Boolean) {
		getConstructionLogProjectList(isManager: $isManager)
			{
			id
			name
			code
			region
			address
			buildUnits
			supervisionUnits
			constructionUnits
			foreman
			isSave
			createTime
		}
	}`, // 获取当前人对应下拉项目列表

    getPlan: `query($projectId: String, $date: Long) {
		getPlan(projectId: $projectId, date: $date)
		{
			id
			date
			goals
			{
				id
				projectId
				text
				rate
				date
			}
			goalsTomorrow
			{
				id
				projectId
				text
				rate
				date
			}
			text
			projectId
			attachments
			{
				id
				planId
				fileId
				fileName
				filePath
				createTime
				isDeleted
			}
		}
	}`, // 获取施工计划

    getEnvironment: `query($projectId: String, $date: Long) {
		getEnvironment(projectId: $projectId, date: $date)
		{
			id
			projectId
			date
			text
			remark
		}
	}`, // 获取环境

    getQualities: `query($projectId: String, $type: Int, $status: Int) {
		getQualities(projectId: $projectId, type: $type, status: $status)
			{
			id
			question
			type
			emergency
			createTime
			state
			solveTime
			handler
			reviewer
			remark
			projectId
			updateTime
			planSolveTime
		}
	}`, // 获取质量安全列表通过type和status过滤，type，status为0为全部

    delConstructionLog: `mutation($projectId: String, $date: String) {
		delConstructionLog(projectId: $projectId, date: $date)
	}`, // 清空施工日志

    sendEmail: `mutation($projectId: String, $date: String) {
		sendEmail(projectId: $projectId, date: $date)
		{
			project
			{
				id
				name
				code
				region
				address
				buildUnits
				supervisionUnits
				constructionUnits
				foreman
				isSave
				createTime
			}
			projectId
			date
			environment
			{
				id
				projectId
				date
				text
				remark
			}
			plan
			{
				id
				date
				goals
					{
					id
					projectId
					text
					rate
					date
				}
				goalsTomorrow
					{
					id
					projectId
					text
					rate
					date
				}
				text
				projectId
				attachments
					{
					id
					planId
					fileId
					fileName
					filePath
					createTime
					isDeleted
				}
			}
			persons
			{
				id
				projectId
				date
				count
				type
				averageHours
				remark
				dateEnd
			}
			qualities
			{
				id
				question
				type
				emergency
				createTime
				state
				solveTime
				handler
				reviewer
				remark
				projectId
				updateTime
				planSolveTime
			}
			machines
			{
				id
				projectId
				date
				count
				units
				type
				averageHours
				remark
				dateEnd
				name
			}
			materials
			{
				id
				projectId
				name
				spec
				manufacturer
				certificateNumber
				num
				item
				result
				remark
				reportId
				totalNum
				deliveryTime
				units
				arrivalTime
				attachments
					{
					id
					fileName
					fileId
					fileType
					filePath
					reportId
				}
			}
			isSendEmail
			workContent
			{
				id
				projectId
				date
				environment
				workdetails
					{
					id
					workContentId
					name
					date
					dateEnd
					peopleCount
					prepare
					constHour
					method
				}
				notifyStatus
				userId
			}
		}
	}`, // 发送日志

  }
}
export default Config;
