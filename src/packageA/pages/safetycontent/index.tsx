/*
 * 安全交底
 * dangwei@bocspace.cn
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'

import './style.styl'

type PageStateProps = {
  dispatch: Function
  safetycontent: any
  project: any
}

type IProps = PageStateProps

interface Index {
  props: IProps
}
let timer
@connect(
  state => ({
    project: state.project,
    safetycontent: state.safetycontent,
  }),
  dispatch => ({
    dispatch,
  })
)
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 15,
    }
  }

  componentDidMount() {
    this.setState({
      seconds: 15,
    })

    timer = setInterval(() => {
      this.setState(
        preState => ({
          seconds: preState.seconds - 1,
        }),
        () => {
          if (this.state.seconds == 0) {
            clearInterval(timer)
          }
        }
      )
    }, 1000)

    const { dispatch, project } = this.props
    const { projectDetail } = project
    const { stages } = projectDetail
    const taskId =
      stages
        .filter(item => item.name == '执行阶段')[0]
        .tasks.filter(item => item.taskType == 'constructionContent')[0].id ||
      ''
    const params = { taskId: taskId }

    dispatch({
      type: 'safetycontent/getTaskStepState',
      payload: params,
    })
    dispatch({
      type: 'safetycontent/getDocumentList',
      payload: params,
    })
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  //签名
  handleNext = () => {
    Taro.navigateTo({
      url: '/packageA/pages/safetycontent/sign',
    })
  }

  render() {
    const { seconds } = this.state
    return (
      <View className="safety-content">
        <View>
          <View className="label">一、操作人员安全保护</View>
          <View className="content2">
            1、凡从事工程施工的操作人员，必须持证上岗，在进入施工现场前，必须经过三级安全教育，并经考试合格后方可上岗操作。
          </View>
          <View className="content2">
            2、操作人员应牢固树立安全第一、预防为主的思想，强化安全意识，撑握安全知识，严格执行施工操作安全规定。
          </View>
          <View className="content2">
            3、进入施工现场必须按要求戴好安全帽；严禁穿拖鞋或赤脚进入施工现场；严禁从高处抛扔物品、野蛮施工。
          </View>
          <View className="content2">
            4、上岗作业前，严禁喝洒；吸烟应到指定的吸烟室。
          </View>
          <View className="content2">
            5、施工操作应按要求正确配戴安全有效的个人保护用品，剔凿槽、洞应戴上防护眼镜和手套。
          </View>
          <View className="content2">
            6、高空作业必须按要求系好安全带，衣着灵便，不得穿硬底和带钉易滑的鞋；高空作业的架子超过2米时，应由专职安全员确认有良好的安全系数后，才能上人操作，（架子应由专业架子搭设），施工时预留的洞口要及时封堵。
          </View>
          <View className="content2">
            7、患有心脏病、高血压、晕病或有过突发性病症的人员，严禁蹬高作业，不得靠近楼梯口。
          </View>
          <View className="content2">
            8、使用切割机等带有转动齿轮和皮带轮的电动机具时，应戴上防护眼镜，防止铁渣弹入眼内；并禁止戴手套，防止手套入齿轮或皮带轮内造成伤残。手持电动工具，使用时要戴绝缘手套。
          </View>
        </View>
        <View>
          <View className="label">二、操作安全措施</View>
          <View className="content2">
            1、用锯弓、砂轮切割机切割管道时，要垫平，卡牢用力不得过猛，砂轮片应完好，操作时应站在侧面，禁止在砂轮切割机上打磨任何物品。
          </View>
          <View className="content2">
            2、用电锤或锤打透眼时，板下，墙后，不得有人靠近。
          </View>
          <View className="content2">
            3、使用砂轮锯时，严禁安装倒顺开关。旋转方向禁止正对通道及易燃物品，操作者应站在砂轮锯的侧面。操作时应戴好防护眼镜以防伤眼。
          </View>
          <View className="content2">
            4、使用人字梯子时，应先检查有无损缺，栓好防滑绳，禁止两人在同一梯子上作业，并不得让在最高一步操作，高空作业必须系好安全带。
          </View>
          <View className="content2">
            5、施工中搬运管道、设备和机具，应设专人指挥，同起同落，步调一致，防止因受力不均或不协调而造成伤人或损害机具设备。
          </View>
          <View className="content2">
            6、如工序交叉，应相互打好招呼，相互照应，并且有良好的防护措施。从下往上传递材料或工具。上下的人和物体不得在一垂直线上，严禁上下抛扔物件。
          </View>
          <View className="content2">
            7、雨季施工时，电气设备要有防雨防潮等措施，雨后及时检查电气设备，确认无隐患时方能使用。
          </View>
          <View className="content2">
            8、雨天、雨后施工时，要注意道路防滑，防止跌倒摔伤，雷雨天、五级以上大风天不在屋顶或室外作业。
          </View>
          <View className="content2">
            9、施工中不得随意翻越阳台、门窗洞口，防止堕落。施工过程中，不得将手、头伸出门窗外，以防坠落物打击。
          </View>
          <View className="content2">
            10、所使用的手动工具绝缘良好，操作人员必须佩带绝缘手套。禁止施工无“CCC”产品。
          </View>
          <View className="content2">
            11、使用砂轮机切割时，要在砂轮前面2米处采用阻燃材料进行围挡，防止火花四溅
          </View>
          <View className="content22">
            12、电焊机设置地点应防潮、防雨、防砸。电焊机电源线不能有接头，一次电源线不长于3米，二次线长度应不长于15米，要双线到位，严禁借用结构钢筋、钢管、金属件作回路地线。焊把线无破损、绝缘良好。操作时要清除周围的易燃、易爆物品、设专人看火，配备灭火器具。
          </View>
          <View className="content22">
            13、气焊作业时，氧气瓶、乙炔瓶间距不小于10米，距明火不小于10米。清除周围的易燃、易爆物品，设专人看火，配备灭火器具。
          </View>
          <View className="content22">
            14、桥架安装、电缆敷设、灯具安装、压接配电箱、柜时提前做好必要的安全防护工作，严禁违章指挥，违章作业。
          </View>
          <View className="content22">
            15、通电试运行时，要统一服从项目部的指挥，严禁私自通电试验。
          </View>
        </View>
        <View>
          <View className="label">三、材料及设备搬运安全注意事项</View>
          <View className="content22">
            1、用车辆或人力运输、材料、设备及大中型机具时要专人指挥，并绑扎固定牢固、可靠，所运物下不得有人。人力搬运材料，设备、大中型机具，起落要一致，用滚杠运输、要防止压脚，并不准用手直接调整滚杠，物体滚动前方不得有人。
          </View>
          <View className="content22">
            2、吊车吊运材料、设备时必须绑扎牢固、可靠，应高专人指挥；防止脱钩，任何人不得在高吊物下行走或施工。
          </View>
          <View className="content2">
            3、材料、设备、大中型机械，应放平，放稳，堆放在坚实的基础上，并码放整齐，牢固，可靠，防止倒塌。
          </View>
          <View className="content2">
            4、施工中，搬运、管材、箱柜、大中型机具等重材、设备、机具、应设专人指挥，应同起、同落、同时用力、防止受力不均或不协调而造成伤人。严禁负重跨越沟、槽、井口、障碍物等。
          </View>
        </View>
        <View>
          <View className="label">四、机械电器设备操作注意事项</View>
          <View className="content2">
            1．配电箱内的电器元器件必须齐全，漏电灵敏可靠有效，严禁私自乱接电源线。
          </View>
          <View className="content2">
            2．现场机械、电气设备、照明用电，必须有专业操作证的电工操作，非专业操作人员不得任意操作，机械、机具、电气设备必须按要求装漏电保护器，接地，接零，良好。
          </View>
          <View className="content2">
            3．套丝机，切割机，电焊机等带电机具，使用前必须先检查是否缺件，零件是否松动，绝缘是否良好，确保机械，设备完好，安全可靠。
          </View>
          <View className="content2">
            4．不属于自己或本工种所有的机具，不得好奇随意动用，以防意外。
          </View>
          <View className="content2">
            5．电焊机的外壳以及焊钳与把线必须绝缘良好。连接牢固，更换焊条应戴上绝缘手套，在空中电焊时，不得手持带电的把线，把钳。爬梯蹬高，在潮湿和有水地点作业应穿绝缘胶鞋或绝缘水鞋。焊把线、把钳不准放在水或泥浆内，电焊机电源的一次和二次接线应符合要求接地，接零线不准用钢筋，钢管等铁件代替。电焊机电源与闸箱应不大于三米，箱内应按规定设专用配件。
          </View>
          <View className="content2">
            6．各种带电设备，机具更换场地、移动前应先切断电源。
          </View>
          <View className="content2">
            7．施工用配电箱必须是铁制。并应按规定设置箱内配件，并应设置足够的插座，施工时不得两个以上电器机具、设备共用一个插座。
          </View>
        </View>
        <View>
          <View className="label">五、文明施工</View>
          <View className="content2">
            1、严格遵守施工现场的规章制度，服从项目部工作人员的管理。
          </View>
          <View className="content2">
            2、施工现场严禁吸烟，严禁发生打架、赌博及酗酒等违法行为。
          </View>
          <View className="content2">3、施工现场内严禁随处大小便。</View>
          <View className="content2">
            4、施工现场内严禁乱扔杂物及废料。将杂物及废料运到指定地点。
          </View>
          <View className="content2">
            5、严禁挪用和拆除安全设施、消防设施。
          </View>
          <View className="content2">6、严禁在机械吊物下穿行。</View>
        </View>
        <View>
          <View className="label">六、环境保护</View>
          <View className="content2">
            1、严格按施工方案进行施工，合理利用场地，安排好材料加工场，保证施工现场清洁整齐。
          </View>
          <View className="content2">
            2、作业时减小扬尘、污染及噪声，机具注意日常维护修理保养，以保证使用时运转正常，防止增加不必要的噪声。电动机具停用时，要随手切断电源，以节约用电。
          </View>
          <View className="content2">
            3、施工中各种废物弃物品均安排分类垃圾箱，分类收集丢弃，对于各类油漆桶，剩余油漆等污染性废弃物送到专门机构处理。油漆、烯料等化学原料方面，应尽量减少流损，用后封堵严密，防止有害气体挥发，盛具及被污染的用具应集中回收处理。
          </View>
          <View className="content2">
            4、施工人员在每一区施工段完毕后，各作业面垃圾随时清理，分类投放，保持现场的清洁和减少污染源。
          </View>
          <View className="content2">
            5、施工用水设施均采用节能型产品，节约用水。试压、冲洗试验时提前做好计划，专门连接排水，泻水管道引至周边市政排水管网可靠排走，以免浸泡周边环境，杜绝随意在施工现场排放。
          </View>
          <View className="content2">
            6、焊接作业时，周围设置围挡，避免火花飞溅。焊接后及时回收不再利用的焊药、焊剂
            、废弃的焊条、废渣等垃圾按照现场管理要求另类投放，集中回收。
          </View>
        </View>
        <View>
          <View className="label">七、其他要求</View>
          <View className="content2">
            1、除上述要求外，还应根据施工实际情况，执行现场主管单位和上级颁发的各有关安全技术规范和规章制度。
          </View>
          <View className="content2">
            2、凡与本交底未涉及，且存在不安全隐患，施工人员必须拒绝施工，及时报告，待有可靠的安全措施后，方可操作。
          </View>
          <View className="content2">3、严禁违章指挥、违章操作。</View>
          <View className="content2">
            4、电气防护用品要定期检查，合格后方能使用。
          </View>
          <View className="content2">
            5、工地食堂要搞好卫生，防止食物中毒。
          </View>
          <View className="content2">
            6、宿舍内要定期检查存在额不安全因素，严禁私接电源线。
          </View>
          <View className="content2">7、搞好定期教育及文明施工。</View>
          <View className="content2">
            8、施工过程中全体人员要发扬团结友爱的精神，互相帮助，互相监督，做到遵章守纪安全生产。
          </View>
        </View>
        <View>
          <View className="label">针对性交底：</View>
          <View className="content2">
            1、新进场工人必须经过三级教育，经考试合格后方可上岗操作，未经教育培训和考试不合格者，不得上岗作业；
          </View>
          <View className="content2">
            2、施工现场严禁吸烟，严禁酒后作业、严禁在作业时打闹、严禁违章作业、严禁违章指挥。
          </View>
        </View>

        <View className="safetycontent-fixed">
          {seconds == 0 ? (
            <AtButton
              onClick={this.handleNext}
              size="small"
              customStyle={{ width: '68px', fontSize: '13px' }}
              type="primary"
            >
              交底签字
            </AtButton>
          ) : (
            <AtButton
              size="small"
              customStyle={{
                color: '#FFF',
                backgroundColor: 'rgb(183, 183, 183)',
                width: '68px',
                borderColor: '#E6E6E6',
              }}
              type="secondary"
            >
              {seconds} s
            </AtButton>
          )}
        </View>
      </View>
    )
  }
}

export default Index
