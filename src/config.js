/*
* 接口地址 统一入口
* dangw@glodon.com
* */
let serverUrl;
let requestHeader = '';
//serverUrl = 'https://www.bocspace.cn:8094';
if (process.env.NODE_ENV == 'development') {
    // serverUrl = 'https://test.bocspace.cn:8094';          // 小程序阿里云测试
    serverUrl = 'https://www.bocspace.cn:8094';          // 小程序阿里云
} else {
    serverUrl = 'https://test.bocspace.cn:8094';           // 小程序生产
}
let Config = {
    baseUrl: serverUrl,
    multiUpload: serverUrl + '/file/multiUpload' + requestHeader, // 上传
    // 微信
    wechat: {
        login: serverUrl + '/wechatapp/login' + requestHeader, // 用户登录
        autoLogin: serverUrl + '/wechatapp/autoLogin' + requestHeader, // 默认登录 并返回微信OpenID 和用户信息
        sendVerificationCode: serverUrl + '/wechatapp/sendVerificationCode' + requestHeader, // 发送验证码
        codeLogin: serverUrl + '/wechatapp/codeLogin' + requestHeader, // 用户验证码登录
        getPhoneNumber: serverUrl + '/wechatapp/getPhoneNumber' + requestHeader, // 获取小程序用户手机号
        logout: serverUrl + '/wechatapp/logout' + requestHeader, // 小程序登出
        getVisitList: serverUrl + '/wechatapp/getVisitList' + requestHeader, // 客户调研列表
        getLastVisitByGroupId: serverUrl + '/wechatapp/getLastVisitByGroupId' + requestHeader, // 获取拜访组最近一条拜访信息
        addAttachment: serverUrl + '/wechatapp/addAttachment' + requestHeader, // 图片上传成功 保存附件 文件类型1,图片 2语音
        getProjectList: serverUrl + '/wechatapp/getProjectList' + requestHeader, // 根据输入查询10个项目
        getInformationList: serverUrl + '/wechatapp/getInformationList' + requestHeader, // 代办列表
        getUserByProjectId: serverUrl + '/wechatapp/getUserByProjectId' + requestHeader, // 查询用户 type1建设单位2监理单位3施工单位
        getAcceptanceReportList: serverUrl + '/wechatapp/getAcceptanceReportList' + requestHeader, // 记录列表验收单
        getAcceptanceReport: serverUrl + '/wechatapp/getAcceptanceReport' + requestHeader, // 查询验收单
        delAcceptanceReport: serverUrl + '/wechatapp/delAcceptanceReport' + requestHeader, // 删除验收单
        cancelAcceptanceReport: serverUrl + '/wechatapp/cancelAcceptanceReport' + requestHeader, // 撤销验收单
        saveAcceptanceReport: serverUrl + '/wechatapp/saveAcceptanceReport' + requestHeader, // 保存并发起签名 草稿和保存
        backAcceptanceReport: serverUrl + '/wechatapp/backAcceptanceReport' + requestHeader, // 退回
        agreeAcceptanceReport: serverUrl + '/wechatapp/agreeAcceptanceReport' + requestHeader, // 签字 同意
        addAcceptanceReport: serverUrl + '/wechatapp/addAcceptanceReport' + requestHeader, // 增加验收单
        signAcceptanceReport: serverUrl + '/wechatapp/signAcceptanceReport' + requestHeader, // 签收验收单
        getMaterialByName: serverUrl + '/wechatapp/getMaterialByName' + requestHeader, // 根据名称获取物料信息
        saveRequirementFromWeApp: serverUrl + '/wechatapp/saveRequirementFromWeApp' + requestHeader, // 小程序提交需求
        openDoor: serverUrl + '/wechatapp/openDoor' + requestHeader, // 开id的门
        saveConstructionLog: serverUrl + '/wechatapp/saveConstructionLog' + requestHeader, // 保存施工日志
        getConstructionLog: serverUrl + '/wechatapp/getConstructionLog' + requestHeader, // 获取施工日志
        getConstructionLogProjectList: serverUrl + '/wechatapp/getConstructionLogProjectList' + requestHeader, // 获取当前人对应下拉项目列表
        getPlan: serverUrl + '/wechatapp/getPlan' + requestHeader, // 获取施工计划
        getEnvironment: serverUrl + '/wechatapp/getEnvironment' + requestHeader, // 获取环境
        getQualities: serverUrl + '/wechatapp/getQualities' + requestHeader, // 获取质量安全列表通过type和status过滤，type，status为0为全部
        delConstructionLog: serverUrl + '/wechatapp/delConstructionLog' + requestHeader, // 清空施工日志
        sendEmail: serverUrl + '/wechatapp/sendEmail' + requestHeader, // 发送日志
    },
    // bocspace项目管理
    bpm: {
        saveProject: serverUrl + '/bpm/saveProject' + requestHeader, // 返回项目信息
        closeProject: serverUrl + '/bpm/closeProject' + requestHeader, // 关闭项目
        saveTask: serverUrl + '/bpm/saveTask' + requestHeader, // 返回任务
        saveSubTask: serverUrl + '/bpm/saveSubTask' + requestHeader, // 返回子任务
        saveProposal: serverUrl + '/bpm/saveProposal' + requestHeader, // 保存报价信息
        saveAttachment: serverUrl + '/bpm/saveAttachment' + requestHeader, // 保存附件
        saveStage: serverUrl + '/bpm/saveStage' + requestHeader, // 保存阶段
        saveStep: serverUrl + '/bpm/saveStep' + requestHeader, // 保存 步骤
        saveTasks: serverUrl + '/bpm/saveTasks' + requestHeader, // 返回任务
        saveSubTasks: serverUrl + '/bpm/saveSubTasks' + requestHeader, // 返回子任务
        delNode: serverUrl + '/bpm/delNode' + requestHeader, // 删除节点
        getTree: serverUrl + '/bpm/getTree' + requestHeader, // 获取树
        getProjectBoardList: serverUrl + '/bpm/getProjectBoardList' + requestHeader, // 项目看板列表(未完成)
        getAllProjectList: serverUrl + '/bpm/getAllProjectList' + requestHeader, // 全部项目明细列表  state 完成100，关闭200 阶段1-7
        getCurrentTaskList: serverUrl + '/bpm/getCurrentTaskList' + requestHeader, // 当前（state1延迟 2我的）任务列表(可以是主也可以是子任务 3 我的完成)
        getDeliverRate: serverUrl + '/bpm/getDeliverRate' + requestHeader, // 交付完成率
        getMoneyBackRate: serverUrl + '/bpm/getMoneyBackRate' + requestHeader, // 回款率
        getTopContractAmountList: serverUrl + '/bpm/getTopContractAmountList' + requestHeader, // 项目回款排行
        getProductTypeList: serverUrl + '/bpm/getProductTypeList' + requestHeader, // 获取产品类型
        getProductProportion: serverUrl + '/bpm/getProductProportion' + requestHeader, // 获取产品占比
        getStageTree: serverUrl + '/bpm/getStageTree' + requestHeader, // 获取阶段 新增时用
        getMyTaskCount: serverUrl + '/bpm/getMyTaskCount' + requestHeader, // 获取我的任务条数
        getMasterList: serverUrl + '/bpm/getMasterList' + requestHeader, // 获取负责人
        saveNodes: serverUrl + '/bpm/saveNodes' + requestHeader, // 保存节点信息
        getSts: serverUrl + '/bpm/getSts' + requestHeader, // 获取大文件上传sts
        saveNodesByArray: serverUrl + '/bpm/saveNodesByArray' + requestHeader, // 保存节点信息
        getTreeByPid: serverUrl + '/bpm/getTreeByPid' + requestHeader, // 根据Pid获取树
        saveNode: serverUrl + '/bpm/saveNode' + requestHeader, // 保存节点并返回节点信息
        delNodeByPid: serverUrl + '/bpm/delNodeByPid' + requestHeader, // 删除父节点下面所有节点 一层
        getStageTreeByTemId: serverUrl + '/bpm/getStageTreeByTemId' + requestHeader, // 获取阶段新增的时候用
        getTempleteList: serverUrl + '/bpm/getTempleteList' + requestHeader, // 获取模板列表
        getTaskattEditUrl: serverUrl + '/bpm/getTaskattEditUrl' + requestHeader, //
        saveAttachments: serverUrl + '/bpm/saveAttachments' + requestHeader, //
        cancelTaskattFile: serverUrl + '/bpm/cancelTaskattFile' + requestHeader, //
        addStage: serverUrl + '/bpm/addStage' + requestHeader, // 返回新stage树
        changeStage: serverUrl + '/bpm/changeStage' + requestHeader, // 返回新stage树
        getStageList: serverUrl + '/bpm/getStageList' + requestHeader, // 获取可以切换选择的list列表，只限设计阶段
        delStage: serverUrl + '/bpm/delStage' + requestHeader, // 删除多余的Stage阶段只限设计阶段，且设计阶段不止一个时
        getCalendarProjectList: serverUrl + '/bpm/getCalendarProjectList' + requestHeader, // 日历项目列表
        getProjectStagesByIds: serverUrl + '/bpm/getProjectStagesByIds' + requestHeader, // 获取项目全部状态信息通过ids
        getPersonMonthTaskState: serverUrl + '/bpm/getPersonMonthTaskState' + requestHeader, // 获取个人的单月任务情况
        getPersonScheduleResources: serverUrl + '/bpm/getPersonScheduleResources' + requestHeader, // 人员日程排期
        saveProjectAndOrderInfo: serverUrl + '/bpm/saveProjectAndOrderInfo' + requestHeader, // 保存项目和订单信息
        getProjectInfoById: serverUrl + '/bpm/getProjectInfoById' + requestHeader, // 根据id获取项目基本信息
        getAllStages: serverUrl + '/bpm/getAllStages' + requestHeader, // 获取全部stage字典数据
    },
    // 报维平台
    maintenance: {
        getQuestions: serverUrl + '/maintenance/getQuestions' + requestHeader, // 获取问题列表
        getItemList: serverUrl + '/maintenance/getItemList' + requestHeader, // 获取类别树
        getTagsByItemId: serverUrl + '/maintenance/getTagsByItemId' + requestHeader, // 根据类别获取标签列表
        saveRepairRequest: serverUrl + '/maintenance/saveRepairRequest' + requestHeader, // 保存维修记录
        getProductAndProjectByCode: serverUrl + '/maintenance/getProductAndProjectByCode' + requestHeader, // 获取产品和项目信息
        getMyRepairPageList: serverUrl + '/maintenance/getMyRepairPageList' + requestHeader, // 1 待受理，2 待分配 3 维修中 4 已完成
        getRepairDataById: serverUrl + '/maintenance/getRepairDataById' + requestHeader, // 通过id获取报修数据
        removeRepairById: serverUrl + '/maintenance/removeRepairById' + requestHeader, // 取消维修 业务删除
        getAllTotalCount: serverUrl + '/maintenance/getAllTotalCount' + requestHeader, // state=0是全部产品
        getProductList: serverUrl + '/maintenance/getProductList' + requestHeader, // orderType 1 正叙，2倒序
        getMaintenanceList: serverUrl + '/maintenance/getMaintenanceList' + requestHeader, // 获取报修状态列表
        getManagers: serverUrl + '/maintenance/getManagers' + requestHeader, // 获取全部的项目经理名单
        getProductMaintenanceInfo: serverUrl + '/maintenance/getProductMaintenanceInfo' + requestHeader, // 获取产品维修信息
        updateProject: serverUrl + '/maintenance/updateProject' + requestHeader, // 更新项目
        updateProduct: serverUrl + '/maintenance/updateProduct' + requestHeader, // 更新产品信息
        addOrUpdateRepairAcceptRecord: serverUrl + '/maintenance/addOrUpdateRepairAcceptRecord' + requestHeader, // 新增或更新报修和确认信息维修信息
        getProjectAndProductList: serverUrl + '/maintenance/getProjectAndProductList' + requestHeader, // 获取项目和产品信息用于显示主页面板，此接口后期可能要修改
        getYearMonthChart: serverUrl + '/maintenance/getYearMonthChart' + requestHeader, // 获取年度月份报修数量统计图
        getItemChart: serverUrl + '/maintenance/getItemChart' + requestHeader, // 获取类别图表统计
        getOperateTagsByItemId: serverUrl + '/maintenance/getOperateTagsByItemId' + requestHeader, // 根据类别获取标签列表
        getMyMaintenanceList: serverUrl + '/maintenance/getMyMaintenanceList' + requestHeader, // 获取我的维修列表 3 维修中 4 已完成
        getMaintenanceDataById: serverUrl + '/maintenance/getMaintenanceDataById' + requestHeader, // 报修信息
        saveMaintenanceRecord: serverUrl + '/maintenance/saveMaintenanceRecord' + requestHeader, // 保存维修信息
        saveSalesOrder: serverUrl + '/maintenance/saveSalesOrder' + requestHeader, // 保存销售订单
        savePurchasingOrder: serverUrl + '/maintenance/savePurchasingOrder' + requestHeader, // 保存采购订单
        getSalesOrderPageList: serverUrl + '/maintenance/getSalesOrderPageList' + requestHeader, // 销售订单列表，state默认10
        getPurchasingOrderPageList: serverUrl + '/maintenance/getPurchasingOrderPageList' + requestHeader, // 采购订单列表
        changeSalesOrderState: serverUrl + '/maintenance/changeSalesOrderState' + requestHeader, // 修改销售订单状态 state0编辑1下单2生产3运输4验收
        delSalesOrderState: serverUrl + '/maintenance/delSalesOrderState' + requestHeader, // 删除销售订单
        delPurchasingOrder: serverUrl + '/maintenance/delPurchasingOrder' + requestHeader, // 删除采购订单
        buildPurchasingOrder: serverUrl + '/maintenance/buildPurchasingOrder' + requestHeader, // 一键生成采购订单,下单
        saveAttsToSalesOrder: serverUrl + '/maintenance/saveAttsToSalesOrder' + requestHeader, // 上传附件到销售订单
        getSalesOrderById: serverUrl + '/maintenance/getSalesOrderById' + requestHeader, // 获取销售订单详情
        getPurchasingOrderById: serverUrl + '/maintenance/getPurchasingOrderById' + requestHeader, // 获取采购订单详情
        exportPurchasingOrderExcel: serverUrl + '/maintenance/exportPurchasingOrderExcel' + requestHeader, // 导出采购订单excel
        getDownlaodUrl: serverUrl + '/maintenance/getDownlaodUrl' + requestHeader, // 返回值为下载url
        newSalesOrder: serverUrl + '/maintenance/newSalesOrder' + requestHeader, // 新增按钮获取上次保存的草稿如果没有返回null
        buildDesignSketch: serverUrl + '/maintenance/buildDesignSketch' + requestHeader, // 返回效果图下载id
        delAttById: serverUrl + '/maintenance/delAttById' + requestHeader, // 删除附件
    },
    // 数字组织会议日志记录
    journal: {
        getJournalTypeList: serverUrl + '/journal/getJournalTypeList' + requestHeader, // 获取日志类型列表,任务表的事项来源列表
        getJournalTagList: serverUrl + '/journal/getJournalTagList' + requestHeader, // 获取日志标签列表
        getJournalMainPages: serverUrl + '/journal/getJournalMainPages' + requestHeader, // saveType = 1草稿箱 saveType=2是提交的日志, readType 0 全部 1未读
        getJournalMainPage: serverUrl + '/journal/getJournalMainPage' + requestHeader, // saveType = 1草稿箱 saveType=2是提交的日志
        getJournalMainPageList: serverUrl + '/journal/getJournalMainPageList' + requestHeader, // orderType 0 发布时间最新，1，实际时间最新2实际时间最新倒序3为最热数降序，4为最热升序
        getJournalById: serverUrl + '/journal/getJournalById' + requestHeader, // 获取日志全部信息
        saveJournal: serverUrl + '/journal/saveJournal' + requestHeader, // journalMainid空为新增，此接口废弃，请勿再用
        getTemplateByType: serverUrl + '/journal/getTemplateByType' + requestHeader, // 根据类型获取模板
        delJournal: serverUrl + '/journal/delJournal' + requestHeader, // 删除日志
        saveJournalByType: serverUrl + '/journal/saveJournalByType' + requestHeader, // 保存日志，type=0：自动保存 1是点击草稿，2是提交日志,3是提交追加任务
        saveAttachment: serverUrl + '/journal/saveAttachment' + requestHeader, // 保存附件
        saveAttachments: serverUrl + '/journal/saveAttachments' + requestHeader, // 保存附件集
        sendEmail: serverUrl + '/journal/sendEmail' + requestHeader, // 发送邮件 attType[0,1] 0word 1email
        cancelJournal: serverUrl + '/journal/cancelJournal' + requestHeader, // 取消本次编辑
        wordDownload: serverUrl + '/journal/wordDownload' + requestHeader, // 返回下载word的队列id
        pdfDownload: serverUrl + '/journal/pdfDownload' + requestHeader, // 返回下载pdf的队列id
        getDownloadUrl: serverUrl + '/journal/getDownloadUrl' + requestHeader, // 返回下载url
        delAttachment: serverUrl + '/journal/delAttachment' + requestHeader, // 删除附件
        getDocumentUrl: serverUrl + '/journal/getDocumentUrl' + requestHeader, // 获取预览url
        goBackJournal: serverUrl + '/journal/goBackJournal' + requestHeader, // 提交的日志回撤到草稿
        addComment: serverUrl + '/journal/addComment' + requestHeader, // 添加评论
        delComment: serverUrl + '/journal/delComment' + requestHeader, // 删除评论
        addOrDelLike: serverUrl + '/journal/addOrDelLike' + requestHeader, // 添加或者删除喜欢，也可以单独调用下面的添加或者删除接口
        addLike: serverUrl + '/journal/addLike' + requestHeader, // 添加喜欢
        delLike: serverUrl + '/journal/delLike' + requestHeader, // 删除喜欢
        getCommentsByJournalId: serverUrl + '/journal/getCommentsByJournalId' + requestHeader, // 获取日志评论列表
        getLikeUsersByJournalId: serverUrl + '/journal/getLikeUsersByJournalId' + requestHeader, // 获取日志点赞人列表
        getJournalIndicators: serverUrl + '/journal/getJournalIndicators' + requestHeader, // 获取日志浏览量等指标数据
        exportJournalDownload: serverUrl + '/journal/exportJournalDownload' + requestHeader, // 导出日志，type 1是日志记录2是日志内容，返回值为下载download对应id
        changeCanEdit: serverUrl + '/journal/changeCanEdit' + requestHeader, // 更改日志可编辑
        getNotReadCount: serverUrl + '/journal/getNotReadCount' + requestHeader, // 返回未读条数
        addOrDelCollection: serverUrl + '/journal/addOrDelCollection' + requestHeader, // 添加或者取消收藏
        getFileUploadInfo: serverUrl + '/journal/getFileUploadInfo' + requestHeader, // 返回oss上传的回调信息
        getSendUserEmails: serverUrl + '/journal/getSendUserEmails' + requestHeader, // 获取邮件输入人列表，type=0全部，type=1收件人，type=2抄送人
        getSharedEditingList: serverUrl + '/journal/getSharedEditingList' + requestHeader, // 获取日志的被共享人id列表
        saveSharedEditing: serverUrl + '/journal/saveSharedEditing' + requestHeader, // 保存编辑共享人
        getReleaseJournalById: serverUrl + '/journal/getReleaseJournalById' + requestHeader, // 获取发版后的日志
        doWeekExcelToImage: serverUrl + '/journal/doWeekExcelToImage' + requestHeader, // 返回下载任务id
        cancelUploadFileToAliyun: serverUrl + '/journal/cancelUploadFileToAliyun' + requestHeader, // 取消阿里云上传
        appendToAliyunData: serverUrl + '/journal/appendToAliyunData' + requestHeader, // 音频大文件追加上传
        getJournalMainPagesToWeChat: serverUrl + '/journal/getJournalMainPagesToWeChat' + requestHeader, // 微信日志列表
        getXzUrl: serverUrl + '/journal/getXzUrl' + requestHeader, // 返回协筑的链接，key为文档路径为空为文档主页
        getAssignmentPageList: serverUrl + '/journal/getAssignmentPageList' + requestHeader, // state 进展 0未开始 1进行中2已完成3已逾期 orderValue 0 任务id，1提出时间2完成时间 orderType 1是升序，0是降序
        getMyInfo: serverUrl + '/journal/getMyInfo' + requestHeader, // 获取个人信息
        syncAssignment: serverUrl + '/journal/syncAssignment' + requestHeader, // 同步到任务列表
        delAssignment: serverUrl + '/journal/delAssignment' + requestHeader, // 删除列表任务
        saveAssignment: serverUrl + '/journal/saveAssignment' + requestHeader, // 保存任务
        deletedAssignment: serverUrl + '/journal/deletedAssignment' + requestHeader, // 删除日志内任务
        getAssignmentUser: serverUrl + '/journal/getAssignmentUser' + requestHeader, // 获取分配任务的人列表
        saveAssignments: serverUrl + '/journal/saveAssignments' + requestHeader, // 保存日志的任务，追加任务可以调用此接口，注意任务type=1, mainId为日志id
        getNotifyPageList: serverUrl + '/journal/getNotifyPageList' + requestHeader, // type=0是未读1是已读，2 是全部
        setNotifyListRead: serverUrl + '/journal/setNotifyListRead' + requestHeader, //
        setNotifyRead: serverUrl + '/journal/setNotifyRead' + requestHeader, // id是消息的id
        delNotifyList: serverUrl + '/journal/delNotifyList' + requestHeader, // 删除列表选中消息
        delNotify: serverUrl + '/journal/delNotify' + requestHeader, // 删除消息
        getNewNotifyCount: serverUrl + '/journal/getNewNotifyCount' + requestHeader, // 获取新（未读）消息条数
        saveSchedules: serverUrl + '/journal/saveSchedules' + requestHeader, // 保存日程
        getSchedulesById: serverUrl + '/journal/getSchedulesById' + requestHeader, // 获取详细日程
        getSchedulesByWeek: serverUrl + '/journal/getSchedulesByWeek' + requestHeader, // 获取日程列表
        getUserList: serverUrl + '/journal/getUserList' + requestHeader, // 获取人员列表
        delSchedulesById: serverUrl + '/journal/delSchedulesById' + requestHeader, // 删除
        getWeekByTime: serverUrl + '/journal/getWeekByTime' + requestHeader, // 根据日期获取周信息
        delMyTopUser: serverUrl + '/journal/delMyTopUser' + requestHeader, // 删除置顶
        saveMyTopUser: serverUrl + '/journal/saveMyTopUser' + requestHeader, // 添加置顶
        addDocument: serverUrl + '/journal/addDocument' + requestHeader, // 添加单个文档
        addDocuments: serverUrl + '/journal/addDocuments' + requestHeader, // 添加多个文档
        changeDocument: serverUrl + '/journal/changeDocument' + requestHeader, // 修改单个文档
        delDocument: serverUrl + '/journal/delDocument' + requestHeader, // 删除文档
        getDocumentTypeList: serverUrl + '/journal/getDocumentTypeList' + requestHeader, // 文档类型列表
        getDocumentListByTypeId: serverUrl + '/journal/getDocumentListByTypeId' + requestHeader, // 根据typeId 过滤文档列表
    },
    // 交付流程
    delivery: {
        addProject: serverUrl + '/delivery/addProject' + requestHeader, // 返回的id为空为失败
        addChildProject: serverUrl + '/delivery/addChildProject' + requestHeader, // 返回子项目 id为空为失败
        updateProject: serverUrl + '/delivery/updateProject' + requestHeader, // 修改项目内容，如修改masterId，id为空为失败
        getProjectPageList: serverUrl + '/delivery/getProjectPageList' + requestHeader, // state 0 全部，1进行 中，5已暂停，10已完成 orderType 0时间倒序, 1是时间正序，2是状态正序，3状态倒序
        getProjectPageList2: serverUrl + '/delivery/getProjectPageList2' + requestHeader, // state 0 全部，1进行 中，5已暂停，10已完成 orderType 0时间倒序, 1是时间正序，2是状态正序，3状态倒序
        getProjectById: serverUrl + '/delivery/getProjectById' + requestHeader, // 
        getTaskById: serverUrl + '/delivery/getTaskById' + requestHeader, // 获取任务明细
        addDocument: serverUrl + '/delivery/addDocument' + requestHeader, // 
        addDictDocument: serverUrl + '/delivery/addDictDocument' + requestHeader, // 
        delProject: serverUrl + '/delivery/delProject' + requestHeader, // 
        delDocument: serverUrl + '/delivery/delDocument' + requestHeader, // 
        delDocumentByIds: serverUrl + '/delivery/delDocumentByIds' + requestHeader, // 
        delDictDocument: serverUrl + '/delivery/delDictDocument' + requestHeader, // 
        updateDocument: serverUrl + '/delivery/updateDocument' + requestHeader, // 
        updateDictDocument: serverUrl + '/delivery/updateDictDocument' + requestHeader, // 
        getProjectDetail: serverUrl + '/delivery/getProjectDetail' + requestHeader, // 
        getDocumentList: serverUrl + '/delivery/getDocumentList' + requestHeader, // 
        getDictDocumentList: serverUrl + '/delivery/getDictDocumentList' + requestHeader, // 
        getDictProjectList: serverUrl + '/delivery/getDictProjectList' + requestHeader, // 
        updateTask: serverUrl + '/delivery/updateTask' + requestHeader, // 
        getPageDocument: serverUrl + '/delivery/getPageDocument' + requestHeader, // category 0 全部1文件2照片3视频
        setDefaultProject: serverUrl + '/delivery/setDefaultProject' + requestHeader, // 设置默认项目
        getDefaultProjectId: serverUrl + '/delivery/getDefaultProjectId' + requestHeader, // 获取默认项目id
        changeProjectListState: serverUrl + '/delivery/changeProjectListState' + requestHeader, // 批量修改项目状态
        delProjectByIds: serverUrl + '/delivery/delProjectByIds' + requestHeader, // 批量删除项目
        reStartTaskStep: serverUrl + '/delivery/reStartTaskStep' + requestHeader, // 重新任务步骤
        overTaskStep: serverUrl + '/delivery/overTaskStep' + requestHeader, // index=1-5 5个步骤的完成
        changeTaskStepState: serverUrl + '/delivery/changeTaskStepState' + requestHeader, // 更新状态index=1-5 5个步骤
        getTaskStepState: serverUrl + '/delivery/getTaskStepState' + requestHeader, // 返回任务步骤状态
        getDictOption: serverUrl + '/delivery/getDictOption' + requestHeader, // 根据code返回字典列表
        getDocUrl: serverUrl + '/delivery/getDocUrl' + requestHeader, // 根据事务id，每5秒调用一下，返回值为文档doc
        getDefaultManagers: serverUrl + '/delivery/getDefaultManagers' + requestHeader, // 获取默认联系人
        getConstruction: serverUrl + '/delivery/getConstruction' + requestHeader, // 
        saveConstruction: serverUrl + '/delivery/saveConstruction' + requestHeader, // 保存construction
        sendConstrctionEmail: serverUrl + '/delivery/sendConstrctionEmail' + requestHeader, // 发邮件
        saveConstrctionFile: serverUrl + '/delivery/saveConstrctionFile' + requestHeader, // 下载
        getDocumentListByCategory: serverUrl + '/delivery/getDocumentListByCategory' + requestHeader, // 根据cateogry获取上传文件0全部，1文件，2照片，3视频， 10 照片和视频
        getDocumentListByProjectId: serverUrl + '/delivery/getDocumentListByProjectId' + requestHeader, // 项目id获取图片
        gerDefaultEmailUsers: serverUrl + '/delivery/gerDefaultEmailUsers' + requestHeader, // type=startmeeting, sendType 0是全部1是to2是抄送
        getProjectTypeList: serverUrl + '/delivery/getProjectTypeList' + requestHeader, // 获取项目类型列表
        getTempleteDocPageList: serverUrl + '/delivery/getTempleteDocPageList' + requestHeader, // 模板列表
        addTempleteDoc: serverUrl + '/delivery/addTempleteDoc' + requestHeader, // 
        delTempleteDoc: serverUrl + '/delivery/delTempleteDoc' + requestHeader, // 
        updateTempleteDoc: serverUrl + '/delivery/updateTempleteDoc' + requestHeader, // 
        addTempleteDocs: serverUrl + '/delivery/addTempleteDocs' + requestHeader, // 列表保存
        saveDaily: serverUrl + '/delivery/saveDaily' + requestHeader, // 返回daily
        getDailyListPage: serverUrl + '/delivery/getDailyListPage' + requestHeader, // 分页type=0正常type=1草稿箱
        addOrDelLike: serverUrl + '/delivery/addOrDelLike' + requestHeader, // 点赞取消点赞
        addDailyComment: serverUrl + '/delivery/addDailyComment' + requestHeader, // 评论
        delDaily: serverUrl + '/delivery/delDaily' + requestHeader, // 
        delDailyComment: serverUrl + '/delivery/delDailyComment' + requestHeader, // 
        getDailyById: serverUrl + '/delivery/getDailyById' + requestHeader, // 获取daily
        getDailyByProjectAndDate: serverUrl + '/delivery/getDailyByProjectAndDate' + requestHeader, // 获取daily通过项目id和日期
        getDailyObjList: serverUrl + '/delivery/getDailyObjList' + requestHeader, // 返回id,name对象, type=0 是部位，dailyId为projectId，1是产品类别，dailyId是positionId，2不要用这个接口
        getDailyContentDetailList: serverUrl + '/delivery/getDailyContentDetailList' + requestHeader, // 下拉获取明细，type=0，今日，type=1明日
        getDailyTomorrowMaterial: serverUrl + '/delivery/getDailyTomorrowMaterial' + requestHeader, // 获取明天进场材料列表
        getDailyMaterialList: serverUrl + '/delivery/getDailyMaterialList' + requestHeader, // 获取未进场的材料列表，根据dcs筛选
        delTomorrowMaterial: serverUrl + '/delivery/delTomorrowMaterial' + requestHeader, // 删除明日进场材料
        getDailyEmailSetting: serverUrl + '/delivery/getDailyEmailSetting' + requestHeader, // 获取日报邮件设置
        saveDailyEmailSetting: serverUrl + '/delivery/saveDailyEmailSetting' + requestHeader, // 保存日报邮件设置
        getDailyInfo: serverUrl + '/delivery/getDailyInfo' + requestHeader, // 新增时返回daily的顶部显示数据
        getDetailWorkByPostionId: serverUrl + '/delivery/getDetailWorkByPostionId' + requestHeader, // 根据部位返回施工明细下拉列表的任务id
        getTomorrowContents: serverUrl + '/delivery/getTomorrowContents' + requestHeader, // 根据今日计划完成情况，反算出明日施工计划进度
        reStartBuildTeam: serverUrl + '/delivery/reStartBuildTeam' + requestHeader, // 重新启动组建项目团队index=1-4 4个阶段
        overBuildTeamStep: serverUrl + '/delivery/overBuildTeamStep' + requestHeader, // index=1-4 4个阶段的完成
        changeBuildTeamStepState: serverUrl + '/delivery/changeBuildTeamStepState' + requestHeader, // 更新状态index=1-4 4个阶段
        saveBuildTeamOneItem: serverUrl + '/delivery/saveBuildTeamOneItem' + requestHeader, // 保存表1单条
        delBuildTeamItemOne: serverUrl + '/delivery/delBuildTeamItemOne' + requestHeader, // 删除表1明细
        delBuildTeamOneItemByIds: serverUrl + '/delivery/delBuildTeamOneItemByIds' + requestHeader, // 删除表1明细多列
        saveBuildTeamTwoMain: serverUrl + '/delivery/saveBuildTeamTwoMain' + requestHeader, // 保存表2主
        saveBuildTeamTwoItem: serverUrl + '/delivery/saveBuildTeamTwoItem' + requestHeader, // 保存表2明细
        delBuildTeamTwoItem: serverUrl + '/delivery/delBuildTeamTwoItem' + requestHeader, // 删除表2明细
        savePolicyDecision: serverUrl + '/delivery/savePolicyDecision' + requestHeader, // 保存决策人，taskid不能为空，应该不会用到此接口
        savePolicyDecisionByLevel: serverUrl + '/delivery/savePolicyDecisionByLevel' + requestHeader, // 保存某个等级的决策人
        delPolicyDecision: serverUrl + '/delivery/delPolicyDecision' + requestHeader, // 删除某个决策人，应该不会用到此接口
        saveBuildTeamThreeItem: serverUrl + '/delivery/saveBuildTeamThreeItem' + requestHeader, // 保存表3明细项
        delBuildTeamThreeItem: serverUrl + '/delivery/delBuildTeamThreeItem' + requestHeader, // 删除表3明细项
        saveBuildTeamFourItem: serverUrl + '/delivery/saveBuildTeamFourItem' + requestHeader, // 保存表4明细项
        getBuildTeamState: serverUrl + '/delivery/getBuildTeamState' + requestHeader, // 返回组建项目团队状态
        getBuildTeamOneItemList: serverUrl + '/delivery/getBuildTeamOneItemList' + requestHeader, // 获取表1明细列
        getBuildTeamTwoMain: serverUrl + '/delivery/getBuildTeamTwoMain' + requestHeader, // 获取表2主
        getBuildTeamTwoItemList: serverUrl + '/delivery/getBuildTeamTwoItemList' + requestHeader, // 获取表2明细列
        getBuildTeamThreeItemList: serverUrl + '/delivery/getBuildTeamThreeItemList' + requestHeader, // 获取表3明细列
        getBuildTeamFourItemList: serverUrl + '/delivery/getBuildTeamFourItemList' + requestHeader, // 获取表4明细列
        getPolicyDecisionList: serverUrl + '/delivery/getPolicyDecisionList' + requestHeader, // 获取责任人列表
        getBuildTeamOneItemListByProjectId: serverUrl + '/delivery/getBuildTeamOneItemListByProjectId' + requestHeader, // 根据项目id获取团队成员
        getBuildTeamFourItemListByProjectId: serverUrl + '/delivery/getBuildTeamFourItemListByProjectId' + requestHeader, // 根据项目id获取团队沟通机制
        getBuildTeamTwoMainByProjectId: serverUrl + '/delivery/getBuildTeamTwoMainByProjectId' + requestHeader, // 用于项目策划书2目标管理
        reStartHandover: serverUrl + '/delivery/reStartHandover' + requestHeader, // 重新启动组建项目团队
        overHandoverStep: serverUrl + '/delivery/overHandoverStep' + requestHeader, // index=1-3 3个阶段的完成
        changeHandoverStepState: serverUrl + '/delivery/changeHandoverStepState' + requestHeader, // 更新状态index=1-3 3个阶段
        saveHandoverOne: serverUrl + '/delivery/saveHandoverOne' + requestHeader, // 保存表1
        saveHandoverTwo: serverUrl + '/delivery/saveHandoverTwo' + requestHeader, // 保存表2
        saveHandoverThree: serverUrl + '/delivery/saveHandoverThree' + requestHeader, // 保存表3
        getHandoverOne: serverUrl + '/delivery/getHandoverOne' + requestHeader, // 获取表1
        getHandoverTwo: serverUrl + '/delivery/getHandoverTwo' + requestHeader, // 获取表2
        getHandoverThree: serverUrl + '/delivery/getHandoverThree' + requestHeader, // 获取表3
        getHandoverState: serverUrl + '/delivery/getHandoverState' + requestHeader, // 获取状态
        sendStartMeetingEmail: serverUrl + '/delivery/sendStartMeetingEmail' + requestHeader, // 启动会发送邮件
        saveStartMeetingFile: serverUrl + '/delivery/saveStartMeetingFile' + requestHeader, // 下载启动会ppt
        getSupplierContractListByProjectId: serverUrl + '/delivery/getSupplierContractListByProjectId' + requestHeader, // 根据id获取合同清单列表
        getEnclosureList: serverUrl + '/delivery/getEnclosureList' + requestHeader, // 获取新的附件列表
        saveEnclosureMain: serverUrl + '/delivery/saveEnclosureMain' + requestHeader, // 保存附件
        delEnclosureMain: serverUrl + '/delivery/delEnclosureMain' + requestHeader, // 删除附件
        saveEnclosureItem: serverUrl + '/delivery/saveEnclosureItem' + requestHeader, // 保存附件明细
        saveEnclosureItemList: serverUrl + '/delivery/saveEnclosureItemList' + requestHeader, // 保存列表明细
        delEnclosureItem: serverUrl + '/delivery/delEnclosureItem' + requestHeader, // 删除明细
        getEnclosureListByItemId: serverUrl + '/delivery/getEnclosureListByItemId' + requestHeader, // 带item的用此接口
        getOnlyShowEnclosureListByTaskIdAndIndex: serverUrl + '/delivery/getOnlyShowEnclosureListByTaskIdAndIndex' + requestHeader, // 获取只展示其他任务项的附件
        getDocumentDownloadUrl: serverUrl + '/delivery/getDocumentDownloadUrl' + requestHeader, // 下载通用接口
        getStakeholderList: serverUrl + '/delivery/getStakeholderList' + requestHeader, // 获取干系人列表
        getStakeholderById: serverUrl + '/delivery/getStakeholderById' + requestHeader, // 
        delStakeholder: serverUrl + '/delivery/delStakeholder' + requestHeader, // 
        saveStakeholder: serverUrl + '/delivery/saveStakeholder' + requestHeader, // 
        saveDeliveryTable: serverUrl + '/delivery/saveDeliveryTable' + requestHeader, // 
        getDeliveryTableByCode: serverUrl + '/delivery/getDeliveryTableByCode' + requestHeader, // 
        getDeliveryTableByTask: serverUrl + '/delivery/getDeliveryTableByTask' + requestHeader, // 
        reStartConfirmSupplier: serverUrl + '/delivery/reStartConfirmSupplier' + requestHeader, // 重新启动
        overConfirmSupplierStep: serverUrl + '/delivery/overConfirmSupplierStep' + requestHeader, // index=1-3 3个阶段的完成
        changeConfirmSupplierStepState: serverUrl + '/delivery/changeConfirmSupplierStepState' + requestHeader, // 更新状态index=1-3 3个阶段
        getConfirmSupplierState: serverUrl + '/delivery/getConfirmSupplierState' + requestHeader, // 返回状态
        saveConfirmSupplierOneItem: serverUrl + '/delivery/saveConfirmSupplierOneItem' + requestHeader, // 保存表1单条
        saveConfirmSupplierOneItemList: serverUrl + '/delivery/saveConfirmSupplierOneItemList' + requestHeader, // 保存表1列表
        delConfirmSupplierOneItem: serverUrl + '/delivery/delConfirmSupplierOneItem' + requestHeader, // 删除表1明细
        getConfirmSupplierOneItemList: serverUrl + '/delivery/getConfirmSupplierOneItemList' + requestHeader, // 获取表1明细列
        saveConfirmSupplierTwoItem: serverUrl + '/delivery/saveConfirmSupplierTwoItem' + requestHeader, // 保存表2单条
        saveConfirmSupplierTwoItemList: serverUrl + '/delivery/saveConfirmSupplierTwoItemList' + requestHeader, // 保存表2列表
        delConfirmSupplierTwoItem: serverUrl + '/delivery/delConfirmSupplierTwoItem' + requestHeader, // 删除表2明细
        getConfirmSupplierTwoItemList: serverUrl + '/delivery/getConfirmSupplierTwoItemList' + requestHeader, // 获取表2明细列
        saveConfirmSupplierThreeItem: serverUrl + '/delivery/saveConfirmSupplierThreeItem' + requestHeader, // 保存表3单条
        saveConfirmSupplierThreeItemList: serverUrl + '/delivery/saveConfirmSupplierThreeItemList' + requestHeader, // 保存表3列表
        delConfirmSupplierThreeItem: serverUrl + '/delivery/delConfirmSupplierThreeItem' + requestHeader, // 删除表3明细
        getConfirmSupplierThreeItemList: serverUrl + '/delivery/getConfirmSupplierThreeItemList' + requestHeader, // 获取表3明细列
        delConfirmSupplierThreeItemList: serverUrl + '/delivery/delConfirmSupplierThreeItemList' + requestHeader, // 删除表3明细多条
        buildContractDoc: serverUrl + '/delivery/buildContractDoc' + requestHeader, // 返回一个下载任务的Id
        getDownloadUrl: serverUrl + '/delivery/getDownloadUrl' + requestHeader, // 获取下载文档
        buildConfirmSupplierThreeExcel: serverUrl + '/delivery/buildConfirmSupplierThreeExcel' + requestHeader, // 返回一个下载任务的Id
        getCompanyList: serverUrl + '/delivery/getCompanyList' + requestHeader, // 公司列表
        getSupplierList: serverUrl + '/delivery/getSupplierList' + requestHeader, // 供应商列表
        getConfirmSupplierTwoItemById: serverUrl + '/delivery/getConfirmSupplierTwoItemById' + requestHeader, // 根据id获取明细2内容
        getProjectSupplierTwoItemListByProjectId: serverUrl + '/delivery/getProjectSupplierTwoItemListByProjectId' + requestHeader, // 项目id获取项目的供应商合同
        getConfirmSupplierSupplementByMainId: serverUrl + '/delivery/getConfirmSupplierSupplementByMainId' + requestHeader, // 返回补充协议列表
        saveConfirmSupplierSupplement: serverUrl + '/delivery/saveConfirmSupplierSupplement' + requestHeader, // 保存补充协议
        addConfirmSupplierSupplement: serverUrl + '/delivery/addConfirmSupplierSupplement' + requestHeader, // 添加补充协议
        delConfirmSupplierSupplementById: serverUrl + '/delivery/delConfirmSupplierSupplementById' + requestHeader, // 补充协议的id
        saveConstructionSchedule: serverUrl + '/delivery/saveConstructionSchedule' + requestHeader, // 保存定制施工计划单个
        saveConstructionScheduleList: serverUrl + '/delivery/saveConstructionScheduleList' + requestHeader, // 保存定制施工计划列表
        delConstructionSchedule: serverUrl + '/delivery/delConstructionSchedule' + requestHeader, // 删除定制施工计划
        getConstructionScheduleById: serverUrl + '/delivery/getConstructionScheduleById' + requestHeader, // 获取表1
        getConstructionScheduleList: serverUrl + '/delivery/getConstructionScheduleList' + requestHeader, // 获取表1明细列
        getDictWorkContentSelectList: serverUrl + '/delivery/getDictWorkContentSelectList' + requestHeader, // 获取要素选择列表
        getConstructionScheduleDetail: serverUrl + '/delivery/getConstructionScheduleDetail' + requestHeader, // 返回一个json格式的数据
        getPlanBeginTimeRange: serverUrl + '/delivery/getPlanBeginTimeRange' + requestHeader, // 返回一个数组，包含两个数据，开始和结束时间
        savePlanBeginTime: serverUrl + '/delivery/savePlanBeginTime' + requestHeader, // 返回一个json格式的数据
        getConstructionScheduleDetailList: serverUrl + '/delivery/getConstructionScheduleDetailList' + requestHeader, // 暂时不用此接口
        saveConstructionScheduleMaterial: serverUrl + '/delivery/saveConstructionScheduleMaterial' + requestHeader, // 保存材料任务
        getMaterialTimeRange: serverUrl + '/delivery/getMaterialTimeRange' + requestHeader, // 返回一个数组，包含两个数据，开始和结束时间
        buildScheduleDocument: serverUrl + '/delivery/buildScheduleDocument' + requestHeader, // 结束任务的时候需要调用此接口生成excel和图纸
        getShowConstructionScheduleDetail: serverUrl + '/delivery/getShowConstructionScheduleDetail' + requestHeader, // 只获取有日期的记录
        getScheduleResourcesByProjectId: serverUrl + '/delivery/getScheduleResourcesByProjectId' + requestHeader, // 根据项目id获取资源池
        saveScheduleResources: serverUrl + '/delivery/saveScheduleResources' + requestHeader, // 保存资源池
        getScheduleDetailListByTaskId: serverUrl + '/delivery/getScheduleDetailListByTaskId' + requestHeader, // taskid获取施工排序明细
        calculationSchedule: serverUrl + '/delivery/calculationSchedule' + requestHeader, // 计算排期不保存
        saveScheduleWorkContent: serverUrl + '/delivery/saveScheduleWorkContent' + requestHeader, // 保持排期 
        saveScheduleResourcesList: serverUrl + '/delivery/saveScheduleResourcesList' + requestHeader, // 新保存排期资源列表后结果type=0计划 1时时
        getScheduleResourcesListByTaskId: serverUrl + '/delivery/getScheduleResourcesListByTaskId' + requestHeader, // taskId获取资源列表
        getCurrentContents: serverUrl + '/delivery/getCurrentContents' + requestHeader, // 获取时时排期 
        getDetailWorkContentByProjectId: serverUrl + '/delivery/getDetailWorkContentByProjectId' + requestHeader, // 排期明细type=0是计划1是实时
        getConstructionMainByProjectId: serverUrl + '/delivery/getConstructionMainByProjectId' + requestHeader, // 获取排期主设置
        saveConstructionMain: serverUrl + '/delivery/saveConstructionMain' + requestHeader, // 保存排期主设置
        getMakePlot: serverUrl + '/delivery/getMakePlot' + requestHeader, // 根据项目id获取制定策划书
        saveMakePlotInfo: serverUrl + '/delivery/saveMakePlotInfo' + requestHeader, // 保存基本信息含图，备注等
        saveMakePlotCost: serverUrl + '/delivery/saveMakePlotCost' + requestHeader, // 保存成本信息
        saveMakePlotPeople: serverUrl + '/delivery/saveMakePlotPeople' + requestHeader, // 
        saveMakePlotPeopleList: serverUrl + '/delivery/saveMakePlotPeopleList' + requestHeader, // 列表保存
        delMakePlotPeople: serverUrl + '/delivery/delMakePlotPeople' + requestHeader, // 删除人
        saveMakePlotMachine: serverUrl + '/delivery/saveMakePlotMachine' + requestHeader, // 机具
        saveMakePlotMachineList: serverUrl + '/delivery/saveMakePlotMachineList' + requestHeader, // 列表机具保存
        delMakePlotMachine: serverUrl + '/delivery/delMakePlotMachine' + requestHeader, // 删除机具
        saveMakePlotMaterial: serverUrl + '/delivery/saveMakePlotMaterial' + requestHeader, // 材料
        saveMakePlotMaterialList: serverUrl + '/delivery/saveMakePlotMaterialList' + requestHeader, // 列表材料保存
        delMakePlotMaterial: serverUrl + '/delivery/delMakePlotMaterial' + requestHeader, // 删除材料
        saveMakeQualitySafe: serverUrl + '/delivery/saveMakeQualitySafe' + requestHeader, // 质量安全
        saveMakePlotQualitySafeList: serverUrl + '/delivery/saveMakePlotQualitySafeList' + requestHeader, // 列表质量安全保存
        delMakePlotQualitySafe: serverUrl + '/delivery/delMakePlotQualitySafe' + requestHeader, // 删除质量安全
        saveMakeRisk: serverUrl + '/delivery/saveMakeRisk' + requestHeader, // 风险
        saveMakePlotRiskList: serverUrl + '/delivery/saveMakePlotRiskList' + requestHeader, // 风险列表保存
        delMakePlotRisk: serverUrl + '/delivery/delMakePlotRisk' + requestHeader, // 删除风险
        buildMakePlotDoc: serverUrl + '/delivery/buildMakePlotDoc' + requestHeader, // 返回一个下载任务的Id
        getMakePlotDownloadUrl: serverUrl + '/delivery/getMakePlotDownloadUrl' + requestHeader, // 获取下载文档
        sendMakePlotEmail: serverUrl + '/delivery/sendMakePlotEmail' + requestHeader, // 发送邮件
        getConfirmEnterOneMain: serverUrl + '/delivery/getConfirmEnterOneMain' + requestHeader, // 获取进场条件，步骤1,2 都是这个
        saveConfirmEnterOneMain: serverUrl + '/delivery/saveConfirmEnterOneMain' + requestHeader, // 保存进场条件内容
        getConfirmEnterOneMainByProjectId: serverUrl + '/delivery/getConfirmEnterOneMainByProjectId' + requestHeader, // 根据项目id获取进场条件
        buildConfirmEnterDoc: serverUrl + '/delivery/buildConfirmEnterDoc' + requestHeader, // 返回一个下载任务的Id
        getConfirmEnterDownloadUrl: serverUrl + '/delivery/getConfirmEnterDownloadUrl' + requestHeader, // 获取下载文档
        getProjectDetailOpen: serverUrl + '/delivery/getProjectDetailOpen' + requestHeader, // 
        getDailyByIdOpen: serverUrl + '/delivery/getDailyByIdOpen' + requestHeader, // 
        syncBocdesignByIds: serverUrl + '/delivery/syncBocdesignByIds' + requestHeader, // 获取同步后的清单
        syncConstructionElements: serverUrl + '/delivery/syncConstructionElements' + requestHeader, // 同步方案的施工要素
        syncConstructionResources: serverUrl + '/delivery/syncConstructionResources' + requestHeader, // 同步资源数据
        getWeatherByProjectId: serverUrl + '/delivery/getWeatherByProjectId' + requestHeader, // 获取天气情况
        getSignboardInfo: serverUrl + '/delivery/getSignboardInfo' + requestHeader, // 返回项目看板信息
        getConstructionChart: serverUrl + '/delivery/getConstructionChart' + requestHeader, // 获取楼栋施工进度
      }

}


export default Config;
