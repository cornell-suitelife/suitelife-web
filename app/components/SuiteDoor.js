import React from 'react';
import { Row, Col, Card, Select, Button, Timeline } from 'antd';

class SuiteDoor extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='suite-door' style={{ padding: '30px' }}>
				<Row type='flex' justify='space-around'>
					<Col span='8'>
						<Card title='Automatic Opener' bordered={false} loading={/*this.props.status !== 'connected'*/ false}>
							<p>The door is currently <b style={{ color: 'red' }}>CLOSED</b>.</p>
							<label>Open for</label>
							<Select defaultValue='5 seconds' style={{ width: 120, padding: 10 }} onChange={this.handleOpenTimeChange}>
								<Select.Option value='5 seconds'>5 seconds</Select.Option>
					      <Select.Option value='10 seconds'>10 seconds</Select.Option>
					      <Select.Option value='15 seconds'>15 seconds</Select.Option>
					      <Select.Option value='20 seconds'>20 seconds</Select.Option>
					      <Select.Option value='25 seconds'>25 seconds</Select.Option>
					    </Select>
					    <Button type='primary'>Open</Button>
						</Card>
					</Col>
					<Col span='8'>
						<Card title='Peephole Stream' bordered={false} bodyStyle={{ padding: 0 }}>
							<img src='/public/img/peephole.jpg' alt='peephole' width='100%'/>
						</Card>
					</Col>
				</Row>
				<Row>
					<Card title='History' bordered={false} width='100%'>
							<Timeline pending={<a href="#">See more</a>}>
								<Timeline.Item>Ambulance called at 9:06pm.</Timeline.Item>
						    <Timeline.Item>Sebastian opened the door for 20 seconds at 9:05pm.</Timeline.Item>
						    <Timeline.Item>Daniel took a peephole snapchat at 9:05pm.</Timeline.Item>
						    <Timeline.Item>Person detected at the door at 9:04pm.</Timeline.Item>
						  </Timeline>
						</Card>
				</Row>
			</div>
		);
	}
}

export default SuiteDoor;