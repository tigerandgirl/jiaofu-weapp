let Config = {
// 报维平台
  maintenance: {
    getQuestions: `query {
		getQuestions
			{
			id
			question
			answer
		}
	}`, // 获取问题列表

    getItemList: `query {
		getItemList
			{
			id
			itemName
			parentId
			ico
			chartName
		}
	}`, // 获取类别树

    getTagsByItemId: `query($itemId: String) {
		getTagsByItemId(itemId: $itemId)
			{
			id
			tagName
		}
	}`, // 根据类别获取标签列表

    saveRepairRequest: `mutation($repairData: InputRepairData) {
		saveRepairRequest(repairData: $repairData)
	}`, // 保存维修记录

    getProductAndProjectByCode: `query($code: String) {
		getProductAndProjectByCode(code: $code)
		{
			project
			{
				id
				name
				managers
				address
				usingTime
				channel
				information
				longitude
				latitude
			}
			product
			{
				id
				code
				producer
				productSystem
				modelNumber
				gateType
				edition
				channels
				projectId
				model
				recordCount
				state
			}
			isHaveProject
			isHaveProduct
			message
		}
	}`, // 获取产品和项目信息

    getMyRepairPageList: `query($type: Int, $pageIndex: Long, $pageSize: Long) {
		getMyRepairPageList(type: $type, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				itemName
				itemId
				projectId
				productId
				tags
				address
				applicantUserId
				applicantUser
				telephone
				description
				createTime
				attachment
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				accept
				{
					id
					maintenanceId
					acceptUserId
					acceptUserName
					telephone
					shelfLife
					description
					maintenanceType
					result
					contact
					cost
					unit
					unitTelephone
					costItem
							{
						id
						costName
						cost
						acceptId
					}
				}
				maintenanceRecord
				{
					id
					maintenanceId
					result
					description
					confirmation
					confirmationName
					confirmationTime
					attachment
							{
						id
						fileId
						fileName
						fileType
						filePath
						maintenanceId
						recordId
						createTime
					}
					signature
					{
						id
						fileId
						fileName
						fileType
						filePath
						maintenanceId
						recordId
						createTime
					}
					maintenancePeopleId
				}
				state
				project
				{
					id
					name
					managers
					address
					usingTime
					channel
					information
					longitude
					latitude
				}
				product
				{
					id
					code
					producer
					productSystem
					modelNumber
					gateType
					edition
					channels
					projectId
					model
					recordCount
					state
				}
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // 1 待受理，2 待分配 3 维修中 4 已完成

    getRepairDataById: `query($id: String) {
		getRepairDataById(id: $id)
		{
			id
			itemName
			itemId
			projectId
			productId
			tags
			address
			applicantUserId
			applicantUser
			telephone
			description
			createTime
			attachment
			{
				id
				fileId
				fileName
				fileType
				filePath
				maintenanceId
				recordId
				createTime
			}
			accept
			{
				id
				maintenanceId
				acceptUserId
				acceptUserName
				telephone
				shelfLife
				description
				maintenanceType
				result
				contact
				cost
				unit
				unitTelephone
				costItem
					{
					id
					costName
					cost
					acceptId
				}
			}
			maintenanceRecord
			{
				id
				maintenanceId
				result
				description
				confirmation
				confirmationName
				confirmationTime
				attachment
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				signature
				{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				maintenancePeopleId
			}
			state
			project
			{
				id
				name
				managers
				address
				usingTime
				channel
				information
				longitude
				latitude
			}
			product
			{
				id
				code
				producer
				productSystem
				modelNumber
				gateType
				edition
				channels
				projectId
				model
				recordCount
				state
			}
		}
	}`, // 通过id获取报修数据

    removeRepairById: `mutation($id: String) {
		removeRepairById(id: $id)
	}`, // 取消维修 业务删除

    getAllTotalCount: `query($state: Int) {
		getAllTotalCount(state: $state)
		{
			productCount
			state1Count
			state2Count
			state3Count
			state4Count
		}
	}`, // state=0是全部产品

    getProductList: `query($text: String, $managers: [String], $state: [Int], $orderType: Int, $pageIndex: Long, $pageSize: Long) {
		getProductList(text: $text, managers: $managers, state: $state, orderType: $orderType, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				project
				{
					id
					name
					managers
					address
					usingTime
					channel
					information
					longitude
					latitude
				}
				product
				{
					id
					code
					producer
					productSystem
					modelNumber
					gateType
					edition
					channels
					projectId
					model
					recordCount
					state
				}
				recordCount
				state
				repairTime
				telephone
				applicantUser
				itemName
				tags
				createTime
				address
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // orderType 1 正叙，2倒序

    getMaintenanceList: `query($text: String, $managers: [String], $state: [Int], $orderType: Int, $pageIndex: Long, $pageSize: Long) {
		getMaintenanceList(text: $text, managers: $managers, state: $state, orderType: $orderType, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				project
				{
					id
					name
					managers
					address
					usingTime
					channel
					information
					longitude
					latitude
				}
				product
				{
					id
					code
					producer
					productSystem
					modelNumber
					gateType
					edition
					channels
					projectId
					model
					recordCount
					state
				}
				recordCount
				state
				repairTime
				telephone
				applicantUser
				itemName
				tags
				createTime
				address
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // 获取报修状态列表

    getManagers: `query {
		getManagers
			{
			id
			name
		}
	}`, // 获取全部的项目经理名单

    getProductMaintenanceInfo: `query($code: String) {
		getProductMaintenanceInfo(code: $code)
		{
			product
			{
				id
				code
				producer
				productSystem
				modelNumber
				gateType
				edition
				channels
				projectId
				model
				recordCount
				state
			}
			project
			{
				id
				name
				managers
				address
				usingTime
				channel
				information
				longitude
				latitude
			}
			repairData
			{
				id
				itemName
				itemId
				projectId
				productId
				tags
				address
				applicantUserId
				applicantUser
				telephone
				description
				createTime
				attachment
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				accept
				{
					id
					maintenanceId
					acceptUserId
					acceptUserName
					telephone
					shelfLife
					description
					maintenanceType
					result
					contact
					cost
					unit
					unitTelephone
					costItem
							{
						id
						costName
						cost
						acceptId
					}
				}
				maintenanceRecord
				{
					id
					maintenanceId
					result
					description
					confirmation
					confirmationName
					confirmationTime
					attachment
							{
						id
						fileId
						fileName
						fileType
						filePath
						maintenanceId
						recordId
						createTime
					}
					signature
					{
						id
						fileId
						fileName
						fileType
						filePath
						maintenanceId
						recordId
						createTime
					}
					maintenancePeopleId
				}
				state
				project
				{
					id
					name
					managers
					address
					usingTime
					channel
					information
					longitude
					latitude
				}
				product
				{
					id
					code
					producer
					productSystem
					modelNumber
					gateType
					edition
					channels
					projectId
					model
					recordCount
					state
				}
			}
		}
	}`, // 获取产品维修信息

    updateProject: `mutation($project: InputProject) {
		updateProject(project: $project)
	}`, // 更新项目

    updateProduct: `mutation($product: InputProduct) {
		updateProduct(product: $product)
	}`, // 更新产品信息

    addOrUpdateRepairAcceptRecord: `mutation($repairData: InputRepairData) {
		addOrUpdateRepairAcceptRecord(repairData: $repairData)
	}`, // 新增或更新报修和确认信息维修信息

    getProjectAndProductList: `query {
		getProjectAndProductList
			{
			project
			{
				id
				name
				managers
				address
				usingTime
				channel
				information
				longitude
				latitude
			}
			product
			{
				id
				code
				producer
				productSystem
				modelNumber
				gateType
				edition
				channels
				projectId
				model
				recordCount
				state
			}
			isHaveProject
			isHaveProduct
			message
		}
	}`, // 获取项目和产品信息用于显示主页面板，此接口后期可能要修改

    getYearMonthChart: `query($year: Int) {
		getYearMonthChart(year: $year)
			{
			yearMonth
			count
		}
	}`, // 获取年度月份报修数量统计图

    getItemChart: `query {
		getItemChart
			{
			parent
			item
			count
		}
	}`, // 获取类别图表统计

    getOperateTagsByItemId: `query($itemId: String) {
		getOperateTagsByItemId(itemId: $itemId)
			{
			id
			tagName
		}
	}`, // 根据类别获取标签列表

    getMyMaintenanceList: `query($type: Int, $phone: String, $pageIndex: Long, $pageSize: Long) {
		getMyMaintenanceList(type: $type, phone: $phone, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				project
				{
					id
					name
					managers
					address
					usingTime
					channel
					information
					longitude
					latitude
				}
				product
				{
					id
					code
					producer
					productSystem
					modelNumber
					gateType
					edition
					channels
					projectId
					model
					recordCount
					state
				}
				recordCount
				state
				repairTime
				telephone
				applicantUser
				itemName
				tags
				createTime
				address
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // 获取我的维修列表 3 维修中 4 已完成

    getMaintenanceDataById: `query($id: String) {
		getMaintenanceDataById(id: $id)
		{
			id
			itemName
			itemId
			projectId
			productId
			tags
			address
			applicantUserId
			applicantUser
			telephone
			description
			createTime
			attachment
			{
				id
				fileId
				fileName
				fileType
				filePath
				maintenanceId
				recordId
				createTime
			}
			accept
			{
				id
				maintenanceId
				acceptUserId
				acceptUserName
				telephone
				shelfLife
				description
				maintenanceType
				result
				contact
				cost
				unit
				unitTelephone
				costItem
					{
					id
					costName
					cost
					acceptId
				}
			}
			maintenanceRecord
			{
				id
				maintenanceId
				result
				description
				confirmation
				confirmationName
				confirmationTime
				attachment
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				signature
				{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				maintenancePeopleId
			}
			state
			project
			{
				id
				name
				managers
				address
				usingTime
				channel
				information
				longitude
				latitude
			}
			product
			{
				id
				code
				producer
				productSystem
				modelNumber
				gateType
				edition
				channels
				projectId
				model
				recordCount
				state
			}
		}
	}`, // 报修信息

    saveMaintenanceRecord: `mutation($record: InputMaintenanceRecord) {
		saveMaintenanceRecord(record: $record)
	}`, // 保存维修信息

    saveSalesOrder: `mutation($order: InputSalesOrder, $saveType: Int) {
		saveSalesOrder(order: $order, saveType: $saveType)
		{
			id
			projectName
			deliveryAddress
			customerCompany
			channel
			customerPeople
			channelPeople
			customerPhone
			channelPhone
			number
			serial
			agreedTime
			logoUrl
			state
			placeOrderTime
			createUserId
			createUserName
			createTime
			saveType
			type
			orderLabor
			{
				id
				mainId
				size
				naked
				channelType
				lineEmbedded
				safetyDoor
				channelEmbedded
				roomPlace
				haveFurniture
				counts
				otherAsk
				rendering
				ncopModelId
				atts
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				number
			}
			atts
			{
				id
				fileId
				fileName
				fileType
				filePath
				maintenanceId
				recordId
				createTime
			}
			laborInfos
			{
				number
				count
			}
			constructionConditions
			{
				id
				mainId
				isokBasis
				isokRoad
				isokLifting
				isokElectricity
				atts
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
			}
			counts
		}
	}`, // 保存销售订单

    savePurchasingOrder: `mutation($order: InputPurchasingOrder, $saveType: Int) {
		savePurchasingOrder(order: $order, saveType: $saveType)
		{
			id
			serial
			orderingCompany
			address
			orderer
			dockingPeople
			dockingPhone
			ordererPhone
			supplyCompany
			orderTime
			supplier
			drawingVersion
			supplierTime
			instructions
			atts
			{
				id
				fileId
				fileName
				fileType
				filePath
				maintenanceId
				recordId
				createTime
			}
			saveType
			createTime
			createUserName
			createUserId
			salesId
			salesSerial
			supplierPhone
			counts
		}
	}`, // 保存采购订单

    getSalesOrderPageList: `query($serial: String, $company: String, $number: String, $state: Int, $beginTime: Long, $endTime: Long, $pageIndex: Long, $pageSize: Long) {
		getSalesOrderPageList(serial: $serial, company: $company, number: $number, state: $state, beginTime: $beginTime, endTime: $endTime, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				projectName
				deliveryAddress
				customerCompany
				channel
				customerPeople
				channelPeople
				customerPhone
				channelPhone
				number
				serial
				agreedTime
				logoUrl
				state
				placeOrderTime
				createUserId
				createUserName
				createTime
				saveType
				type
				orderLabor
					{
					id
					mainId
					size
					naked
					channelType
					lineEmbedded
					safetyDoor
					channelEmbedded
					roomPlace
					haveFurniture
					counts
					otherAsk
					rendering
					ncopModelId
					atts
							{
						id
						fileId
						fileName
						fileType
						filePath
						maintenanceId
						recordId
						createTime
					}
					number
				}
				atts
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				laborInfos
					{
					number
					count
				}
				constructionConditions
				{
					id
					mainId
					isokBasis
					isokRoad
					isokLifting
					isokElectricity
					atts
							{
						id
						fileId
						fileName
						fileType
						filePath
						maintenanceId
						recordId
						createTime
					}
				}
				counts
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // 销售订单列表，state默认10

    getPurchasingOrderPageList: `query($serial: String, $company: String, $address: String, $orderer: String, $beginTime: Long, $endTime: Long, $pageIndex: Long, $pageSize: Long) {
		getPurchasingOrderPageList(serial: $serial, company: $company, address: $address, orderer: $orderer, beginTime: $beginTime, endTime: $endTime, pageIndex: $pageIndex, pageSize: $pageSize)
		{
			body
			{
				id
				serial
				orderingCompany
				address
				orderer
				dockingPeople
				dockingPhone
				ordererPhone
				supplyCompany
				orderTime
				supplier
				drawingVersion
				supplierTime
				instructions
				atts
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				saveType
				createTime
				createUserName
				createUserId
				salesId
				salesSerial
				supplierPhone
				counts
			}
			pageIndex
			pageSize
			pageCount
			totalCount
		}
	}`, // 采购订单列表

    changeSalesOrderState: `mutation($id: String, $state: Int) {
		changeSalesOrderState(id: $id, state: $state)
	}`, // 修改销售订单状态 state0编辑1下单2生产3运输4验收

    delSalesOrderState: `mutation($id: String) {
		delSalesOrderState(id: $id)
	}`, // 删除销售订单

    delPurchasingOrder: `mutation($id: String) {
		delPurchasingOrder(id: $id)
	}`, // 删除采购订单

    buildPurchasingOrder: `mutation($salesOrderId: String) {
		buildPurchasingOrder(salesOrderId: $salesOrderId)
		{
			id
			serial
			orderingCompany
			address
			orderer
			dockingPeople
			dockingPhone
			ordererPhone
			supplyCompany
			orderTime
			supplier
			drawingVersion
			supplierTime
			instructions
			atts
			{
				id
				fileId
				fileName
				fileType
				filePath
				maintenanceId
				recordId
				createTime
			}
			saveType
			createTime
			createUserName
			createUserId
			salesId
			salesSerial
			supplierPhone
			counts
		}
	}`, // 一键生成采购订单,下单

    saveAttsToSalesOrder: `mutation($atts: [InputAttachment], $salesOrderId: String) {
		saveAttsToSalesOrder(atts: $atts, salesOrderId: $salesOrderId)
	}`, // 上传附件到销售订单

    getSalesOrderById: `query($id: String) {
		getSalesOrderById(id: $id)
		{
			id
			projectName
			deliveryAddress
			customerCompany
			channel
			customerPeople
			channelPeople
			customerPhone
			channelPhone
			number
			serial
			agreedTime
			logoUrl
			state
			placeOrderTime
			createUserId
			createUserName
			createTime
			saveType
			type
			orderLabor
			{
				id
				mainId
				size
				naked
				channelType
				lineEmbedded
				safetyDoor
				channelEmbedded
				roomPlace
				haveFurniture
				counts
				otherAsk
				rendering
				ncopModelId
				atts
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				number
			}
			atts
			{
				id
				fileId
				fileName
				fileType
				filePath
				maintenanceId
				recordId
				createTime
			}
			laborInfos
			{
				number
				count
			}
			constructionConditions
			{
				id
				mainId
				isokBasis
				isokRoad
				isokLifting
				isokElectricity
				atts
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
			}
			counts
		}
	}`, // 获取销售订单详情

    getPurchasingOrderById: `query($id: String) {
		getPurchasingOrderById(id: $id)
		{
			id
			serial
			orderingCompany
			address
			orderer
			dockingPeople
			dockingPhone
			ordererPhone
			supplyCompany
			orderTime
			supplier
			drawingVersion
			supplierTime
			instructions
			atts
			{
				id
				fileId
				fileName
				fileType
				filePath
				maintenanceId
				recordId
				createTime
			}
			saveType
			createTime
			createUserName
			createUserId
			salesId
			salesSerial
			supplierPhone
			counts
		}
	}`, // 获取采购订单详情

    exportPurchasingOrderExcel: `mutation($id: String) {
		exportPurchasingOrderExcel(id: $id)
	}`, // 导出采购订单excel

    getDownlaodUrl: `query($id: String) {
		getDownlaodUrl(id: $id)
	}`, // 返回值为下载url

    newSalesOrder: `query {
		newSalesOrder
		{
			id
			projectName
			deliveryAddress
			customerCompany
			channel
			customerPeople
			channelPeople
			customerPhone
			channelPhone
			number
			serial
			agreedTime
			logoUrl
			state
			placeOrderTime
			createUserId
			createUserName
			createTime
			saveType
			type
			orderLabor
			{
				id
				mainId
				size
				naked
				channelType
				lineEmbedded
				safetyDoor
				channelEmbedded
				roomPlace
				haveFurniture
				counts
				otherAsk
				rendering
				ncopModelId
				atts
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
				number
			}
			atts
			{
				id
				fileId
				fileName
				fileType
				filePath
				maintenanceId
				recordId
				createTime
			}
			laborInfos
			{
				number
				count
			}
			constructionConditions
			{
				id
				mainId
				isokBasis
				isokRoad
				isokLifting
				isokElectricity
				atts
					{
					id
					fileId
					fileName
					fileType
					filePath
					maintenanceId
					recordId
					createTime
				}
			}
			counts
		}
	}`, // 新增按钮获取上次保存的草稿如果没有返回null

    buildDesignSketch: `mutation($labor: InputOrderLabor) {
		buildDesignSketch(labor: $labor)
	}`, // 返回效果图下载id

    delAttById: `mutation($id: String) {
		delAttById(id: $id)
	}`, // 删除附件

  }
}
export default Config;
