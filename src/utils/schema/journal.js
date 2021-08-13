let Config = {
// 数字组织会议日志记录
  journal: {
    getJournalTypeList: `query($category: Int) {
		getJournalTypeList(category: $category)
			{
			id
			type
			name
			canUse
		}
	}`, // 获取日志类型列表,任务表的事项来源列表

    getJournalTagList: `query {
		getJournalTagList
			{
			id
			name
		}
	}`, // 获取日志标签列表

    getJournalMainPages: `query($category: Int, $saveType: Int, $text: String, $tag: [String], $type: [String], $readType: Int, $orderType: Int, $pageIndex: Long, $pageSize: Long) {
		getJournalMainPages(category: $category, saveType: $saveType, text: $text, tag: $tag, type: $type, readType: $readType, orderType: $orderType, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				title
				userId
				userName
				createTime
				tags
					{
					id
					name
				}
				isRead
				type
				actualTime
				viewCount
				commentCount
				likeCount
				likeClick
				updateUser
				updateTime
				saveType
				userAvatar
				introductionText
				introductionImage
			}
			pageIndex
			pageSize
			totalCount
			totalSize
			notReadCount
		}
	}`, // saveType = 1草稿箱 saveType=2是提交的日志, readType 0 全部 1未读

    getJournalMainPage: `query($category: Int, $saveType: Int, $text: String, $tag: [String], $type: [String], $orderType: Int, $pageIndex: Long, $pageSize: Long) {
		getJournalMainPage(category: $category, saveType: $saveType, text: $text, tag: $tag, type: $type, orderType: $orderType, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				title
				userId
				userName
				createTime
				tags
					{
					id
					name
				}
				isRead
				type
				actualTime
				viewCount
				commentCount
				likeCount
				likeClick
				updateUser
				updateTime
				saveType
				userAvatar
				introductionText
				introductionImage
			}
			pageIndex
			pageSize
			totalCount
			totalSize
			notReadCount
		}
	}`, // saveType = 1草稿箱 saveType=2是提交的日志

    getJournalMainPageList: `query($text: String, $tag: [String], $type: [String], $orderType: Int, $pageIndex: Long, $pageSize: Long) {
		getJournalMainPageList(text: $text, tag: $tag, type: $type, orderType: $orderType, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				title
				userId
				userName
				createTime
				tags
					{
					id
					name
				}
				isRead
				type
				actualTime
				viewCount
				commentCount
				likeCount
				likeClick
				updateUser
				updateTime
				saveType
				userAvatar
				introductionText
				introductionImage
			}
			pageIndex
			pageSize
			totalCount
			totalSize
			notReadCount
		}
	}`, // orderType 0 发布时间最新，1，实际时间最新2实际时间最新倒序3为最热数降序，4为最热升序

    getJournalById: `query($journalMainId: String) {
		getJournalById(journalMainId: $journalMainId)
		{
			journalMain
			{
				id
				title
				userId
				userName
				createTime
				tags
					{
					id
					name
				}
				isRead
				type
				actualTime
				viewCount
				commentCount
				likeCount
				likeClick
				updateUser
				updateTime
				saveType
				userAvatar
				introductionText
				introductionImage
			}
			journalSub
			templateId
			assignments
			{
				id
				serial
				name
				userInformations
					{
					userId
					userName
					firstWord
					fullWord
					toped
					userAvatar
				}
				createTime
				relationId
				relationType
				remark
				isSync
				state
				progress
				progressUpdateTime
				beginTime
				relationName
				completeTime
				type
				orders
			}
			id
			audio
			{
				id
				fileId
				fileName
				mainId
				fileType
				type
				filePath
				createTime
				fileSize
				orders
			}
			atts
			{
				id
				fileId
				fileName
				mainId
				fileType
				type
				filePath
				createTime
				fileSize
				orders
			}
			addAssignments
			{
				id
				serial
				name
				userInformations
					{
					userId
					userName
					firstWord
					fullWord
					toped
					userAvatar
				}
				createTime
				relationId
				relationType
				remark
				isSync
				state
				progress
				progressUpdateTime
				beginTime
				relationName
				completeTime
				type
				orders
			}
			comments
			{
				id
				pid
				text
				userId
				userName
				parentUserId
				parentUserName
				createTime
				userAvatar
			}
			likeUsers
			{
				id
				userId
				userName
				userAvatar
			}
			canEdit
		}
	}`, // 获取日志全部信息

    saveJournal: `mutation($journal: InputJournal) {
		saveJournal(journal: $journal)
	}`, // journalMainid空为新增，此接口废弃，请勿再用

    getTemplateByType: `query($type: String) {
		getTemplateByType(type: $type)
		{
			id
			type
			useful
			value
		}
	}`, // 根据类型获取模板

    delJournal: `mutation($id: String) {
		delJournal(id: $id)
	}`, // 删除日志

    saveJournalByType: `mutation($journal: InputJournal, $saveType: Int) {
		saveJournalByType(journal: $journal, saveType: $saveType)
		{
			journalMain
			{
				id
				title
				userId
				userName
				createTime
				tags
					{
					id
					name
				}
				isRead
				type
				actualTime
				viewCount
				commentCount
				likeCount
				likeClick
				updateUser
				updateTime
				saveType
				userAvatar
				introductionText
				introductionImage
			}
			journalSub
			templateId
			assignments
			{
				id
				serial
				name
				userInformations
					{
					userId
					userName
					firstWord
					fullWord
					toped
					userAvatar
				}
				createTime
				relationId
				relationType
				remark
				isSync
				state
				progress
				progressUpdateTime
				beginTime
				relationName
				completeTime
				type
				orders
			}
			id
			audio
			{
				id
				fileId
				fileName
				mainId
				fileType
				type
				filePath
				createTime
				fileSize
				orders
			}
			atts
			{
				id
				fileId
				fileName
				mainId
				fileType
				type
				filePath
				createTime
				fileSize
				orders
			}
			addAssignments
			{
				id
				serial
				name
				userInformations
					{
					userId
					userName
					firstWord
					fullWord
					toped
					userAvatar
				}
				createTime
				relationId
				relationType
				remark
				isSync
				state
				progress
				progressUpdateTime
				beginTime
				relationName
				completeTime
				type
				orders
			}
			comments
			{
				id
				pid
				text
				userId
				userName
				parentUserId
				parentUserName
				createTime
				userAvatar
			}
			likeUsers
			{
				id
				userId
				userName
				userAvatar
			}
			canEdit
		}
	}`, // 保存日志，type=0：自动保存 1是点击草稿，2是提交日志,3是提交追加任务

    saveAttachment: `mutation($att: InputAttachment) {
		saveAttachment(att: $att)
	}`, // 保存附件

    saveAttachments: `mutation($atts: [InputAttachment]) {
		saveAttachments(atts: $atts)
	}`, // 保存附件集

    sendEmail: `query($journal: InputJournal, $emails: [String], $userIds: [String], $ccEmails: [String], $ccUserIds: [String], $attType: [Int]) {
		sendEmail(journal: $journal, emails: $emails, userIds: $userIds, ccEmails: $ccEmails, ccUserIds: $ccUserIds, attType: $attType)
	}`, // 发送邮件 attType[0,1] 0word 1email

    cancelJournal: `mutation($id: String) {
		cancelJournal(id: $id)
	}`, // 取消本次编辑

    wordDownload: `query($journal: InputJournal) {
		wordDownload(journal: $journal)
	}`, // 返回下载word的队列id

    pdfDownload: `query($journal: InputJournal) {
		pdfDownload(journal: $journal)
	}`, // 返回下载pdf的队列id

    getDownloadUrl: `query($id: String) {
		getDownloadUrl(id: $id)
		{
			id
			code
			url
			type
			name
			beginTime
		}
	}`, // 返回下载url

    delAttachment: `mutation($id: String) {
		delAttachment(id: $id)
	}`, // 删除附件

    getDocumentUrl: `query($url: String) {
		getDocumentUrl(url: $url)
	}`, // 获取预览url

    goBackJournal: `mutation($id: String) {
		goBackJournal(id: $id)
	}`, // 提交的日志回撤到草稿

    addComment: `mutation($text: String, $mainId: String, $pid: String, $pUserId: String) {
		addComment(text: $text, mainId: $mainId, pid: $pid, pUserId: $pUserId)
	}`, // 添加评论

    delComment: `mutation($id: String) {
		delComment(id: $id)
	}`, // 删除评论

    addOrDelLike: `mutation($mainId: String) {
		addOrDelLike(mainId: $mainId)
	}`, // 添加或者删除喜欢，也可以单独调用下面的添加或者删除接口

    addLike: `mutation($mainId: String) {
		addLike(mainId: $mainId)
	}`, // 添加喜欢

    delLike: `mutation($mainId: String) {
		delLike(mainId: $mainId)
	}`, // 删除喜欢

    getCommentsByJournalId: `query($mainId: String) {
		getCommentsByJournalId(mainId: $mainId)
			{
			id
			pid
			text
			userId
			userName
			parentUserId
			parentUserName
			createTime
			userAvatar
		}
	}`, // 获取日志评论列表

    getLikeUsersByJournalId: `query($mainId: String) {
		getLikeUsersByJournalId(mainId: $mainId)
			{
			id
			userId
			userName
			userAvatar
		}
	}`, // 获取日志点赞人列表

    getJournalIndicators: `query($mainId: String) {
		getJournalIndicators(mainId: $mainId)
		{
			id
			viewCount
			commentCount
			likeCount
			likeClick
			haveCollection
		}
	}`, // 获取日志浏览量等指标数据

    exportJournalDownload: `query($journalType: String, $userIds: [String], $type: Int, $beginTime: Long, $endTime: Long) {
		exportJournalDownload(journalType: $journalType, userIds: $userIds, type: $type, beginTime: $beginTime, endTime: $endTime)
	}`, // 导出日志，type 1是日志记录2是日志内容，返回值为下载download对应id

    changeCanEdit: `mutation($id: String) {
		changeCanEdit(id: $id)
	}`, // 更改日志可编辑

    getNotReadCount: `query($category: Int, $saveType: Int, $text: String, $tag: [String], $type: [String], $readType: Int, $orderType: Int, $pageIndex: Long, $pageSize: Long) {
		getNotReadCount(category: $category, saveType: $saveType, text: $text, tag: $tag, type: $type, readType: $readType, orderType: $orderType, pageIndex: $pageIndex, pageSize: $pageSize)
	}`, // 返回未读条数

    addOrDelCollection: `mutation($mainId: String) {
		addOrDelCollection(mainId: $mainId)
	}`, // 添加或者取消收藏

    getFileUploadInfo: `query($key: String) {
		getFileUploadInfo(key: $key)
	}`, // 返回oss上传的回调信息

    getSendUserEmails: `query($text: String, $type: Int) {
		getSendUserEmails(text: $text, type: $type)
		}`, // 获取邮件输入人列表，type=0全部，type=1收件人，type=2抄送人

    getSharedEditingList: `query($mainId: String) {
		getSharedEditingList(mainId: $mainId)
		}`, // 获取日志的被共享人id列表

    saveSharedEditing: `mutation($mainId: String, $userIds: [String]) {
		saveSharedEditing(mainId: $mainId, userIds: $userIds)
	}`, // 保存编辑共享人

    getReleaseJournalById: `query($id: String) {
		getReleaseJournalById(id: $id)
		{
			journalMain
			{
				id
				title
				userId
				userName
				createTime
				tags
					{
					id
					name
				}
				isRead
				type
				actualTime
				viewCount
				commentCount
				likeCount
				likeClick
				updateUser
				updateTime
				saveType
				userAvatar
				introductionText
				introductionImage
			}
			journalSub
			templateId
			assignments
			{
				id
				serial
				name
				userInformations
					{
					userId
					userName
					firstWord
					fullWord
					toped
					userAvatar
				}
				createTime
				relationId
				relationType
				remark
				isSync
				state
				progress
				progressUpdateTime
				beginTime
				relationName
				completeTime
				type
				orders
			}
			id
			audio
			{
				id
				fileId
				fileName
				mainId
				fileType
				type
				filePath
				createTime
				fileSize
				orders
			}
			atts
			{
				id
				fileId
				fileName
				mainId
				fileType
				type
				filePath
				createTime
				fileSize
				orders
			}
			addAssignments
			{
				id
				serial
				name
				userInformations
					{
					userId
					userName
					firstWord
					fullWord
					toped
					userAvatar
				}
				createTime
				relationId
				relationType
				remark
				isSync
				state
				progress
				progressUpdateTime
				beginTime
				relationName
				completeTime
				type
				orders
			}
			comments
			{
				id
				pid
				text
				userId
				userName
				parentUserId
				parentUserName
				createTime
				userAvatar
			}
			likeUsers
			{
				id
				userId
				userName
				userAvatar
			}
			canEdit
		}
	}`, // 获取发版后的日志

    doWeekExcelToImage: `query($url: String, $mainId: String) {
		doWeekExcelToImage(url: $url, mainId: $mainId)
	}`, // 返回下载任务id

    cancelUploadFileToAliyun: `mutation($uploadId: String, $key: String) {
		cancelUploadFileToAliyun(uploadId: $uploadId, key: $key)
	}`, // 取消阿里云上传

    appendToAliyunData: `mutation($base64Data: String, $key: String, $position: Long) {
		appendToAliyunData(base64Data: $base64Data, key: $key, position: $position)
		{
			id
			position
			nextPosition
			success
			key
		}
	}`, // 音频大文件追加上传

    getJournalMainPagesToWeChat: `query($category: Int, $saveType: Int, $text: String, $tag: [String], $type: [String], $readType: Int, $orderType: Int, $pageIndex: Long, $pageSize: Long) {
		getJournalMainPagesToWeChat(category: $category, saveType: $saveType, text: $text, tag: $tag, type: $type, readType: $readType, orderType: $orderType, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				title
				userId
				userName
				createTime
				tags
					{
					id
					name
				}
				isRead
				type
				actualTime
				viewCount
				commentCount
				likeCount
				likeClick
				updateUser
				updateTime
				saveType
				userAvatar
				introductionText
				introductionImage
			}
			pageIndex
			pageSize
			totalCount
			totalSize
			notReadCount
		}
	}`, // 微信日志列表

    getXzUrl: `query($key: String) {
		getXzUrl(key: $key)
	}`, // 返回协筑的链接，key为文档路径为空为文档主页

    getAssignmentPageList: `query($text: String, $userId: [String], $relationType: [String], $state: [String], $orderValue: Int, $orderType: Int, $pageIndex: Long, $pageSize: Long) {
		getAssignmentPageList(text: $text, userId: $userId, relationType: $relationType, state: $state, orderValue: $orderValue, orderType: $orderType, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				serial
				name
				userInformations
					{
					userId
					userName
					firstWord
					fullWord
					toped
					userAvatar
				}
				createTime
				relationId
				relationType
				remark
				isSync
				state
				progress
				progressUpdateTime
				beginTime
				relationName
				completeTime
				type
				orders
			}
			pageIndex
			pageSize
			totalCount
			totalSize
		}
	}`, // state 进展 0未开始 1进行中2已完成3已逾期 orderValue 0 任务id，1提出时间2完成时间 orderType 1是升序，0是降序

    getMyInfo: `query {
		getMyInfo
		{
			id
			name
			station
			department
			todoCount
			overCount
			journalCount
			gender
			avatar
		}
	}`, // 获取个人信息

    syncAssignment: `mutation($assignmentId: String) {
		syncAssignment(assignmentId: $assignmentId)
	}`, // 同步到任务列表

    delAssignment: `mutation($id: String) {
		delAssignment(id: $id)
	}`, // 删除列表任务

    saveAssignment: `mutation($a: InputAssignment) {
		saveAssignment(a: $a)
		{
			id
			serial
			name
			userInformations
			{
				userId
				userName
				firstWord
				fullWord
				toped
				userAvatar
			}
			createTime
			relationId
			relationType
			remark
			isSync
			state
			progress
			progressUpdateTime
			beginTime
			relationName
			completeTime
			type
			orders
		}
	}`, // 保存任务

    deletedAssignment: `mutation($id: String) {
		deletedAssignment(id: $id)
	}`, // 删除日志内任务

    getAssignmentUser: `query {
		getAssignmentUser
			{
			userId
			userName
			firstWord
			fullWord
			toped
			userAvatar
		}
	}`, // 获取分配任务的人列表

    saveAssignments: `mutation($as: [InputAssignment], $mainId: String) {
		saveAssignments(as: $as, mainId: $mainId)
	}`, // 保存日志的任务，追加任务可以调用此接口，注意任务type=1, mainId为日志id

    getNotifyPageList: `query($type: Int, $pageIndex: Long, $pageSize: Long) {
		getNotifyPageList(type: $type, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				haveRead
				msgId
				msgType
				mainId
				mainTitle
				fromUserName
				createTime
				userId
				msg
				mainType
				msgState
				canShow
				fromUserAvatar
				fromUserId
			}
			pageIndex
			pageSize
			totalCount
			totalSize
		}
	}`, // type=0是未读1是已读，2 是全部

    setNotifyListRead: `mutation($ids: [String]) {
		setNotifyListRead(ids: $ids)
	}`, // 

    setNotifyRead: `mutation($id: String) {
		setNotifyRead(id: $id)
	}`, // id是消息的id

    delNotifyList: `mutation($ids: [String]) {
		delNotifyList(ids: $ids)
	}`, // 删除列表选中消息

    delNotify: `mutation($id: String) {
		delNotify(id: $id)
	}`, // 删除消息

    getNewNotifyCount: `query {
		getNewNotifyCount
	}`, // 获取新（未读）消息条数

    saveSchedules: `mutation($s: InputSchedules) {
		saveSchedules(s: $s)
	}`, // 保存日程

    getSchedulesById: `query($id: String) {
		getSchedulesById(id: $id)
		{
			id
			userId
			userName
			dateTime
			weekDay
			beginTime
			endTime
			title
			address
			addressNumber
			fullday
			color
			defaultAddress
			region
			createTime
			fulldays
			scene
		}
	}`, // 获取详细日程

    getSchedulesByWeek: `query($dateTime: Long) {
		getSchedulesByWeek(dateTime: $dateTime)
			{
			id
			userId
			userName
			dateTime
			weekDay
			beginTime
			endTime
			title
			address
			addressNumber
			fullday
			color
			defaultAddress
			region
			createTime
			fulldays
			scene
		}
	}`, // 获取日程列表

    getUserList: `query($text: String) {
		getUserList(text: $text)
			{
			userId
			userName
			firstWord
			fullWord
			toped
			userAvatar
		}
	}`, // 获取人员列表

    delSchedulesById: `mutation($id: String) {
		delSchedulesById(id: $id)
	}`, // 删除

    getWeekByTime: `query($dateTime: Long) {
		getWeekByTime(dateTime: $dateTime)
			{
			name
			dateTime
		}
	}`, // 根据日期获取周信息

    delMyTopUser: `mutation($id: String) {
		delMyTopUser(id: $id)
	}`, // 删除置顶

    saveMyTopUser: `mutation($id: String) {
		saveMyTopUser(id: $id)
	}`, // 添加置顶

    addDocument: `query($d: InputDocument) {
		addDocument(d: $d)
		{
			id
			fileName
			typeId
			filePath
			createTime
			fileSize
			userId
			userName
		}
	}`, // 添加单个文档

    addDocuments: `query($ds: [InputDocument]) {
		addDocuments(ds: $ds)
	}`, // 添加多个文档

    changeDocument: `query($d: InputDocument) {
		changeDocument(d: $d)
		{
			id
			fileName
			typeId
			filePath
			createTime
			fileSize
			userId
			userName
		}
	}`, // 修改单个文档

    delDocument: `query($id: String) {
		delDocument(id: $id)
	}`, // 删除文档

    getDocumentTypeList: `query($text: String) {
		getDocumentTypeList(text: $text)
			{
			id
			name
		}
	}`, // 文档类型列表

    getDocumentListByTypeId: `query($text: String, $typeId: String, $pageIndex: Long, $pageSize: Long) {
		getDocumentListByTypeId(text: $text, typeId: $typeId, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				fileName
				typeId
				filePath
				createTime
				fileSize
				userId
				userName
			}
			pageIndex
			pageSize
			totalCount
			totalSize
		}
	}`, // 根据typeId 过滤文档列表

  }
}
export default Config;
