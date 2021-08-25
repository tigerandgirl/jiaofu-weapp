/*
* 接口地址 统一入口
* dangw@glodon.com
* */
let serverUrl;
let requestHeader = '';
//serverUrl = 'https://www.bocspace.cn:8094';
if (process.env.NODE_ENV == 'development') {
    serverUrl = 'https://test.bocspace.cn:8094';          // 小程序阿里云测试
    // serverUrl = 'https://www.bocspace.cn:8094';          // 小程序阿里云
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
      updateDocuments: serverUrl + '/delivery/updateDocuments' + requestHeader, //
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
      uploadAutograph: serverUrl + '/delivery/uploadAutograph' + requestHeader, // 上传base64签名返回签名图片地址
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
      getStakeholderCompanyList: serverUrl + '/delivery/getStakeholderCompanyList' + requestHeader, // 获取干系人的公司下拉选择列表
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
