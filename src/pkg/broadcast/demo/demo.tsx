import { Button, Space } from 'antd'
import broadcast from '../broadcast'

const Demo = () => {
	broadcast.listen('BtnClick', (data: string) => {
		console.log(data)
		alert(`触发第1个监听器，值：${data}`)
	})

	broadcast.listen('BtnClick', (data: string, id: string) => {
		console.log(data)
		alert(`触发第2个监听器，值：${data}, 本次监听后，删除本监听器: ${id}`)
		broadcast.cancel(id)
	})

	const handleClick = (str: string) => {
		broadcast.trigger('BtnClick', str)
	}

	const handle2Click = (str: string) => {
		broadcast.trigger('BtnClick2', str)
	}

	const getAllChannels = () => {
		console.log(broadcast.getAllChannels())
	}

	const setDebug = () => {
		broadcast.setDebug(true)
	}

	return (
		<>
			<Space>
				<Button onClick={() => handleClick('Trigger 1')}>Trigger 1</Button>
				<Button onClick={() => handleClick('Trigger 2')} type="primary">Trigger 2</Button>
				<Button onClick={() => handle2Click('Trigger 3')} type="primary">无监听</Button>
				<Button onClick={getAllChannels} >获取所有监听频道</Button>
				<Button onClick={setDebug} >打开调试日志，请查看log日志</Button>
			</Space>
		</>
	)
}
export default Demo
